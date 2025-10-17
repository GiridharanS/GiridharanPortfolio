import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import ruby from 'react-syntax-highlighter/dist/esm/languages/prism/ruby';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Register languages
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('javascript', javascript);

interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  description: string;
  category: 'payment' | 'communication' | 'cloud' | 'ai';
}

const integrationSnippets: CodeSnippet[] = [
  {
    title: 'Advanced Payment Gateway Integration',
    language: 'ruby',
    category: 'payment',
    code: `# app/services/payment/base_gateway.rb
module Payment
  class BaseGateway
    include ActiveSupport::Configurable
    include Dry::Monads[:result]

    Error = Class.new(StandardError)
    
    private
    
    def handle_response
      yield
        .fmap(&method(:process_successful_response))
        .or(&method(:handle_error))
    rescue => e
      Honeybadger.notify(e, context: context)
      Failure(Error.new("Payment processing failed: #{e.message}"))
    end
  end
end

# app/services/payment/stripe_gateway.rb
module Payment
  class StripeGateway < BaseGateway
    include Dry::Monads[:result]
    include Dry::Validation

    RETRY_OPTIONS = {
      max_attempts: 3,
      base_delay: 0.5,
      max_delay: 2
    }.freeze

    PaymentSchema = Dry::Schema.Params do
      required(:amount).filled(:integer, gt?: 0)
      required(:currency).filled(:string, size?: 3)
      required(:customer_id).filled(:string)
      optional(:metadata).hash do
        optional(:order_id).filled(:string)
        optional(:product_ids).array(:string)
      end
    end

    def initialize(api_key: nil)
      @client = Stripe::Client.new(
        api_key: api_key || Rails.application.credentials.stripe[:secret_key],
        max_network_retries: 2
      )
      @mutex = Mutex.new
    end

    def create_payment_intent(params)
      with_validation(params) do |validated|
        handle_response do
          with_retries do
            Success(
              client.payment_intents.create(
                prepare_payment_params(validated)
              )
            )
          end
        end
      end
    end

    def create_subscription(params)
      with_validation(SubscriptionSchema, params) do |validated|
        handle_response do
          @mutex.synchronize do
            ActiveRecord::Base.transaction do
              customer = ensure_customer(validated[:email])
              subscription = create_stripe_subscription(customer, validated)
              record_subscription_history(customer, subscription)
              Success(subscription)
            end
          end
        end
      end
    end

    private

    def with_validation(schema, params)
      result = schema.call(params)
      return Failure(result.errors) if result.failure?
      
      yield(result.to_h)
    end

    def with_retries
      Retriable.retriable(**RETRY_OPTIONS) do
        yield
      end
    end

    def prepare_payment_params(validated)
      {
        amount: validated[:amount],
        currency: validated[:currency],
        customer: validated[:customer_id],
        metadata: validated[:metadata],
        automatic_payment_methods: { enabled: true },
        statement_descriptor: generate_descriptor(validated)
      }
    end

    def handle_error(error)
      case error
      when Stripe::CardError
        Failure([:card_declined, error.message])
      when Stripe::RateLimitError
        raise Error, "Rate limit exceeded"
      else
        Failure([:unknown, "Unknown error occurred"])
      end
    end

    def process_successful_response(response)
      Success(
        PaymentResponse.new(
          id: response.id,
          status: response.status,
          amount: response.amount,
          currency: response.currency
        )
      )
    end
  end
end

# app/services/payment/paypal_gateway.rb
module Payment
  class PaypalGateway < BaseGateway
    include Dry::Monads[:result]
    
    def initialize(config = {})
      @config = default_config.merge(config)
      @client = PayPal::REST::Client.new(
        mode: Rails.env.production? ? 'live' : 'sandbox',
        client_id: Rails.application.credentials.paypal[:client_id],
        client_secret: Rails.application.credentials.paypal[:secret]
      )
      @cache = ActiveSupport::Cache::RedisCacheStore.new
    end

    def create_order(items:, total:, currency: 'USD')
      with_validation(OrderSchema, items: items, total: total) do |validated|
        handle_response do
          cached_order = fetch_cached_order(validated)
          return Success(cached_order) if cached_order

          order = create_paypal_order(validated)
          cache_order(order)
          Success(order)
        end
      end
    end

    private

    def create_paypal_order(validated)
      PayPal::SDK::REST::Order.new({
        intent: 'CAPTURE',
        purchase_units: build_purchase_units(validated),
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
              brand_name: @config[:brand_name],
              locale: 'en-US',
              landing_page: 'LOGIN',
              user_action: 'PAY_NOW'
            }
          }
        }
      }).create
    end

    def build_purchase_units(validated)
      [{
        amount: {
          currency_code: validated[:currency],
          value: validated[:total].to_s,
          breakdown: calculate_price_breakdown(validated)
        },
        items: validated[:items].map { |item| format_line_item(item) }
      }]
    end

    def calculate_price_breakdown(validated)
      tax = TaxCalculator.new(validated[:items]).calculate
      shipping = ShippingCalculator.new(validated[:items]).calculate
      
      {
        item_total: { value: validated[:total], currency_code: validated[:currency] },
        tax_total: { value: tax, currency_code: validated[:currency] },
        shipping: { value: shipping, currency_code: validated[:currency] }
      }
    end

    def fetch_cached_order(validated)
      cache_key = "paypal_order:#{validated[:items].hash}:#{validated[:total]}"
      @cache.read(cache_key)
    end

    def cache_order(order)
      cache_key = "paypal_order:#{order.id}"
      @cache.write(cache_key, order, expires_in: 15.minutes)
    end
  end
end`,
    description: 'Advanced payment gateway implementation with validation, error handling, retries, and caching'
  },
  {
    title: 'Event-Driven Communication Service',
    language: 'ruby',
    category: 'communication',
    code: `# app/services/communication/notification_orchestrator.rb
module Communication
  class NotificationOrchestrator
    include Dry::Monads[:result]
    include Dry::Events::Publisher[:notifications]
    include Wisper::Publisher

    register_event "notification.sent"
    register_event "notification.failed"

    def initialize(providers: {})
      @providers = {
        email: EmailProvider.new,
        sms: SMSProvider.new,
        push: PushNotificationProvider.new
      }.merge(providers)
      
      @rate_limiter = RateLimiter.new
      @circuit_breaker = CircuitBreaker.new
    end

    def dispatch(notification)
      return Failure("Rate limit exceeded") unless @rate_limiter.allowed?(notification)
      return Failure("Circuit breaker open") unless @circuit_breaker.allow_request?

      result = with_fallback do
        dispatch_to_providers(notification)
      end

      publish_result(result, notification)
      result
    end

    private

    def dispatch_to_providers(notification)
      notification.channels.map do |channel|
        provider = @providers[channel]
        next Failure("No provider for channel: #{channel}") unless provider

        AsyncNotificationJob.perform_async(
          provider.class.name,
          notification.to_h,
          retry: true
        )
      end.all?(&:success?) ? Success(true) : Failure("Some notifications failed")
    end

    def with_fallback
      yield
    rescue StandardError => e
      Failure(e)
    ensure
      cleanup_resources
    end

    def publish_result(result, notification)
      event_name = result.success? ? "notification.sent" : "notification.failed"
      publish(event_name, notification: notification)
      broadcast(:notification_processed, notification, result)
    end
  end

  # app/services/communication/providers/email_provider.rb
  module Providers
    class EmailProvider
      include Dry::Monads[:result]
      
      def initialize
        @client = SendGrid::API.new(api_key: credentials.sendgrid[:api_key])
        @template_renderer = TemplateRenderer.new
      end

      def deliver(message)
        template = @template_renderer.render(
          message.template_name,
          message.template_data
        )

        response = send_via_sendgrid(
          to: message.recipient,
          subject: message.subject,
          content: template
        )

        handle_response(response)
      end

      private

      def send_via_sendgrid(to:, subject:, content:)
        mail = build_mail(to, subject, content)
        @client.client.mail._('send').post(request_body: mail.to_json)
      end

      def build_mail(to, subject, content)
        SendGrid::Mail.new.tap do |mail|
          mail.from = SendGrid::Email.new(email: default_from_email)
          mail.subject = subject
          
          personalization = SendGrid::Personalization.new
          personalization.add_to(SendGrid::Email.new(email: to))
          mail.add_personalization(personalization)
          
          mail.add_content(
            SendGrid::Content.new(
              type: 'text/html',
              value: content
            )
          )
        end
      end

      def handle_response(response)
        case response.status_code
        when '202'
          Success(response)
        else
          Failure(response.body)
        end
      end
    end
  end

  # app/services/communication/providers/sms_provider.rb
  module Providers
    class SMSProvider
      include Dry::Monads[:result]

      def initialize
        @client = Twilio::REST::Client.new(
          credentials.twilio[:account_sid],
          credentials.twilio[:auth_token]
        )
        @phone_validator = PhoneNumberValidator.new
      end

      def send_message(message)
        return Failure("Invalid phone number") unless @phone_validator.valid?(message.to)

        handle_response do
          @client.messages.create(
            from: default_phone_number,
            to: message.to,
            body: message.body,
            status_callback: status_callback_url
          )
        end
      end

      private

      def handle_response
        yield
          .fmap(&method(:process_successful_response))
          .or(&method(:handle_error))
      rescue Twilio::REST::TwilioError => e
        Failure(e)
      end
    end
  end
end`,
    description: 'Sophisticated event-driven notification system with multiple providers and fallbacks'
  },
  {
    title: 'Advanced Cloud Infrastructure',
    language: 'javascript',
    category: 'cloud',
    code: `// services/cloud/infrastructure-manager.ts
import { CloudFormation, ECS, AutoScaling } from 'aws-sdk';
import { Observable, Subject, from } from 'rxjs';
import { retryWhen, delay, take, catchError } from 'rxjs/operators';
import { injectable, inject } from 'inversify';
import { Logger } from '../logging/logger';
import { MetricsCollector } from '../monitoring/metrics-collector';
import { ConfigService } from '../config/config-service';

@injectable()
export class InfrastructureManager {
  private readonly stackUpdateSubject = new Subject<CloudFormation.StackEvent>();
  private readonly metricsCollector: MetricsCollector;
  private readonly logger: Logger;

  constructor(
    @inject('CloudFormation') private readonly cf: CloudFormation,
    @inject('ECS') private readonly ecs: ECS,
    @inject('AutoScaling') private readonly asg: AutoScaling,
    @inject('ConfigService') private readonly config: ConfigService,
    @inject('Logger') logger: Logger,
    @inject('MetricsCollector') metricsCollector: MetricsCollector
  ) {
    this.logger = logger;
    this.metricsCollector = metricsCollector;
  }

  public async deployStack(
    stackName: string,
    template: CloudFormation.Template,
    parameters: CloudFormation.Parameter[]
  ): Promise<Observable<CloudFormation.StackEvent>> {
    try {
      const stackId = await this.createOrUpdateStack(stackName, template, parameters);
      return this.monitorStackUpdates(stackId);
    } catch (error) {
      this.logger.error('Stack deployment failed', { error, stackName });
      throw error;
    }
  }

  public async scaleService(
    cluster: string,
    service: string,
    desiredCount: number
  ): Promise<void> {
    const params = {
      cluster,
      service,
      desiredCount
    };

    try {
      await this.ecs.updateService(params).promise();
      
      await this.waitForServiceStable(cluster, service);
      
      this.metricsCollector.recordMetric('service.scale', {
        cluster,
        service,
        desiredCount
      });
    } catch (error) {
      this.logger.error('Service scaling failed', { error, cluster, service });
      throw error;
    }
  }

  private async createOrUpdateStack(
    stackName: string,
    template: CloudFormation.Template,
    parameters: CloudFormation.Parameter[]
  ): Promise<string> {
    const stackExists = await this.doesStackExist(stackName);
    
    const params = {
      StackName: stackName,
      TemplateBody: JSON.stringify(template),
      Parameters: parameters,
      Capabilities: ['CAPABILITY_IAM', 'CAPABILITY_NAMED_IAM'],
      Tags: this.getDefaultTags()
    };

    try {
      if (stackExists) {
        const response = await this.cf.updateStack(params).promise();
        return response.StackId!;
      } else {
        const response = await this.cf.createStack(params).promise();
        return response.StackId!;
      }
    } catch (error) {
      if (error.message.includes('No updates are to be performed')) {
        return stackName;
      }
      throw error;
    }
  }

  private monitorStackUpdates(stackId: string): Observable<CloudFormation.StackEvent> {
    return new Observable<CloudFormation.StackEvent>(observer => {
      const checkStackEvents = async () => {
        try {
          const events = await this.getStackEvents(stackId);
          events.forEach(event => observer.next(event));

          const stack = await this.getStack(stackId);
          if (this.isStackComplete(stack.StackStatus!)) {
            observer.complete();
          }
        } catch (error) {
          observer.error(error);
        }
      };

      const interval = setInterval(checkStackEvents, 10000);
      return () => clearInterval(interval);
    }).pipe(
      retryWhen(errors =>
        errors.pipe(
          delay(1000),
          take(3)
        )
      ),
      catchError(error => {
        this.logger.error('Stack monitoring failed', { error, stackId });
        throw error;
      })
    );
  }

  private async waitForServiceStable(cluster: string, service: string): Promise<void> {
    const waiter = this.ecs.waitFor('servicesStable', {
      Cluster: cluster,
      Services: [service]
    });

    try {
      await waiter.promise();
    } catch (error) {
      this.logger.error('Service failed to stabilize', { error, cluster, service });
      throw error;
    }
  }

  private getDefaultTags(): CloudFormation.Tags {
    return [
      {
        Key: 'Environment',
        Value: this.config.get('environment')
      },
      {
        Key: 'ManagedBy',
        Value: 'InfrastructureManager'
      },
      {
        Key: 'LastUpdated',
        Value: new Date().toISOString()
      }
    ];
  }
}`,
    description: 'Enterprise-grade cloud infrastructure management with observability and error handling'
  },
  {
    title: 'AI Service Integration Hub',
    language: 'ruby',
    category: 'ai',
    code: `# app/services/ai/service_hub.rb
module AI
  class ServiceHub
    include Dry::Monads[:result]
    include Dry::Container::Mixin
    include Dry::Events::Publisher[:ai_events]

    Error = Class.new(StandardError)
    
    register_event "completion.generated"
    register_event "image.generated"
    register_event "embedding.created"

    def initialize(config = {})
      @config = default_config.merge(config)
      @cache = CacheStore.new
      @rate_limiter = RateLimiter.new
      
      register_services
      setup_fallbacks
      initialize_monitoring
    end

    def generate_content(prompt, options = {})
      with_service(:language_model) do |service|
        result = service.generate(
          prompt,
          validate_and_prepare_options(options)
        )

        handle_result(result) do |content|
          publish("completion.generated", 
            prompt: prompt,
            content: content,
            model: options[:model]
          )
          
          Success(content)
        end
      end
    end

    def generate_image(prompt, options = {})
      with_service(:image_generator) do |service|
        cached_result = @cache.fetch_image(prompt, options)
        return Success(cached_result) if cached_result

        result = service.generate(prompt, options)
        
        handle_result(result) do |image_data|
          @cache.store_image(prompt, options, image_data)
          
          publish("image.generated",
            prompt: prompt,
            image_url: image_data[:url]
          )
          
          Success(image_data)
        end
      end
    end

    def create_embedding(text, options = {})
      with_service(:embedding) do |service|
        return Failure("Text too long") if text.length > @config[:max_text_length]

        result = service.embed(text, options)
        
        handle_result(result) do |embedding|
          publish("embedding.created",
            text_length: text.length,
            dimensions: embedding.size
          )
          
          Success(embedding)
        end
      end
    end

    private

    def register_services
      register(:language_model) do
        case @config[:language_model_provider]
        when :openai
          OpenAIService.new(@config[:openai])
        when :anthropic
          AnthropicService.new(@config[:anthropic])
        else
          raise Error, "Unknown language model provider"
        end
      end

      register(:image_generator) do
        case @config[:image_generator_provider]
        when :dalle
          DallEService.new(@config[:dalle])
        when :stable_diffusion
          StableDiffusionService.new(@config[:stable_diffusion])
        else
          raise Error, "Unknown image generator provider"
        end
      end

      register(:embedding) do
        case @config[:embedding_provider]
        when :openai
          OpenAIEmbeddingService.new(@config[:openai])
        when :cohere
          CohereEmbeddingService.new(@config[:cohere])
        else
          raise Error, "Unknown embedding provider"
        end
      end
    end

    def setup_fallbacks
      @fallbacks = {
        language_model: ->(error) {
          case error
          when RateLimitError
            switch_provider(:language_model)
          when TokenLimitError
            truncate_and_retry
          else
            Failure(error)
          end
        },
        image_generator: ->(error) {
          case error
          when QuotaExceededError
            switch_provider(:image_generator)
          else
            Failure(error)
          end
        }
      }
    end

    def with_service(service_type)
      return Failure("Rate limit exceeded") unless @rate_limiter.allowed?(service_type)

      service = resolve(service_type)
      yield(service)
    rescue => e
      handle_error(service_type, e)
    end

    def handle_error(service_type, error)
      if (fallback = @fallbacks[service_type])
        fallback.call(error)
      else
        Failure(error)
      end
    end

    def handle_result(result)
      case result
      when Success
        yield result.value!
      when Failure
        handle_error(result.failure)
      else
        raise Error, "Unknown result type: #{result.class}"
      end
    end

    def switch_provider(service_type)
      current_provider = @config["#{service_type}_provider".to_sym]
      alternate_provider = alternate_providers[service_type].find { |p| p != current_provider }
      
      if alternate_provider
        @config["#{service_type}_provider".to_sym] = alternate_provider
        register_services
        Success(:provider_switched)
      else
        Failure("No alternate providers available")
      end
    end

    def initialize_monitoring
      subscribe("completion.generated") do |event|
        MetricsCollector.record_completion(event)
      end

      subscribe("image.generated") do |event|
        MetricsCollector.record_image_generation(event)
      end

      subscribe("embedding.created") do |event|
        MetricsCollector.record_embedding(event)
      end
    end
  end
end`,
    description: 'Enterprise AI service hub with multiple providers, fallbacks, and monitoring'
  }
];

export const IntegrationCodeSnippet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkModeQuery.addEventListener('change', handleDarkModeChange);
    return () => darkModeQuery.removeEventListener('change', handleDarkModeChange);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (
      (prevIndex + newDirection + integrationSnippets.length) % integrationSnippets.length
    ));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(timer);
  }, []);

  const renderCode = (code: string, language: string) => (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      showLineNumbers
      customStyle={{
        margin: 0,
        padding: '1rem',
        backgroundColor: 'transparent',
        fontSize: '0.875rem',
      }}
      codeTagProps={{
        className: 'font-mono',
      }}
      lineNumberStyle={{
        minWidth: '2.5em',
        paddingRight: '1em',
        textAlign: 'right',
        userSelect: 'none',
        opacity: 0.5,
        fontSize: '0.75rem',
      }}
      wrapLines
      wrapLongLines
    >
      {code.trim()}
    </SyntaxHighlighter>
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => paginate(-1)}
          className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-700/50 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
        >
          <ChevronLeft className="text-gray-600 dark:text-gray-400" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-700/50 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
        >
          <ChevronRight className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full"
        >
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {integrationSnippets[currentIndex].title}
              </h3>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                {integrationSnippets[currentIndex].category}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {integrationSnippets[currentIndex].description}
            </p>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-inner">
              {renderCode(
                integrationSnippets[currentIndex].code,
                integrationSnippets[currentIndex].language
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {integrationSnippets.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-purple-600 dark:bg-purple-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}; 