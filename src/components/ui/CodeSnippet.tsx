import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Highlight, themes, type Language, type Token } from 'prism-react-renderer';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import ruby from 'react-syntax-highlighter/dist/esm/languages/prism/ruby';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Register languages
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('html', markup);

interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  description: string;
}

const codeSnippets: CodeSnippet[] = [
  {
    title: 'Ruby on Rails API Endpoint',
    language: 'ruby',
    code: `class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  def index
    @products = Product.includes(:category)
                      .where(active: true)
                      .order(created_at: :desc)
    
    render json: @products, 
           each_serializer: ProductSerializer,
           status: :ok
  end

  def create
    @product = Product.new(product_params)
    
    if @product.save
      render json: @product, 
             serializer: ProductSerializer,
             status: :created
    else
      render json: { errors: @product.errors }, 
             status: :unprocessable_entity
    end
  end

  private

  def product_params
    params.require(:product)
          .permit(:name, :price, :category_id)
  end
end`,
    description: 'RESTful API endpoint with proper serialization and error handling'
  },
  {
    title: 'GraphQL Query Resolution',
    language: 'ruby',
    code: `module Types
  class QueryType < Types::BaseObject
    field :products, [Types::ProductType],
          null: false,
          description: "Returns a list of products"

    def products
      Product.includes(:category)
            .with_attached_images
            .order(created_at: :desc)
    end

    field :product, Types::ProductType,
          null: true,
          description: "Find a product by ID" do
      argument :id, ID, required: true
    end

    def product(id:)
      Product.find_by(id: id)
    end
  end
end`,
    description: 'GraphQL query implementation with efficient database queries'
  },
  {
    title: 'Background Job Processing',
    language: 'ruby',
    code: `class ProductAnalyticsJob < ApplicationJob
  queue_as :analytics

  def perform(product_id)
    product = Product.find(product_id)
    
    Analytics.transaction do
      update_view_count(product)
      calculate_trending_score(product)
      notify_if_trending(product)
    end
  rescue => e
    Rails.logger.error("Analytics failed: #{e.message}")
    notify_admin_of_failure(product_id, e)
  end

  private

  def calculate_trending_score(product)
    score = TrendingScoreService.new(product).calculate
    product.update!(trending_score: score)
  end
end`,
    description: 'Sidekiq background job with error handling and transaction management'
  },
  {
    title: 'React Component with TypeScript',
    language: 'typescript',
    code: `interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  onAddToCart: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart(product.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg shadow-lg p-4">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <h3 className="text-lg font-bold mt-2">
        {product.name}
      </h3>
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className="btn-primary mt-4"
      >
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};`,
    description: 'React component with TypeScript and state management'
  },
  {
    title: 'Modern JavaScript with Ajax',
    language: 'javascript',
    code: `class ProductService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchProducts(category) {
    try {
      const response = await fetch(
        \`\${this.baseUrl}/api/products?\${new URLSearchParams({
          category,
          active: true
        })}\`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async updateProduct(id, updates) {
    try {
      const response = await fetch(
        \`\${this.baseUrl}/api/products/\${id}\`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
}`,
    description: 'Modern JavaScript service with async/await and error handling'
  },
  {
    title: 'Backbone.js Model & Collection',
    language: 'javascript',
    code: `// Product Model
const Product = Backbone.Model.extend({
  defaults: {
    name: '',
    price: 0,
    category: null,
    active: true
  },

  validate: function(attrs) {
    if (!attrs.name) {
      return 'Name is required';
    }
    if (attrs.price < 0) {
      return 'Price must be positive';
    }
  },

  initialize: function() {
    this.on('invalid', function(model, error) {
      console.error('Validation Error:', error);
    });
  }
});

// Products Collection
const ProductCollection = Backbone.Collection.extend({
  model: Product,
  url: '/api/products',

  initialize: function() {
    this.on('add', this.validateModel);
  },

  validateModel: function(model) {
    if (!model.isValid()) {
      this.remove(model);
    }
  },

  activeProducts: function() {
    return this.where({ active: true });
  },

  byCategory: function(category) {
    return this.filter(function(product) {
      return product.get('category') === category;
    });
  }
});`,
    description: 'Backbone.js model and collection with validation and filtering'
  },
  {
    title: 'Responsive HTML Template',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Dashboard</title>
  <link href="bootstrap.min.css" rel="stylesheet">
  <link href="custom.css" rel="stylesheet">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Dashboard</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" href="#products">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#categories">Categories</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <main class="container mt-4">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Product List</h5>
            <div id="productGrid" class="row g-4">
              <!-- Products will be dynamically inserted here -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Filters</h5>
            <form id="filterForm">
              <!-- Filter options will go here -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script src="bootstrap.bundle.min.js"></script>
  <script src="app.js"></script>
</body>
</html>`,
    description: 'Responsive HTML template with Bootstrap 5'
  },
  {
    title: 'Modern CSS Styling',
    language: 'css',
    code: `.product-card {
  position: relative;
  border-radius: 0.5rem;
  background: var(--card-bg, #fff);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem 0.5rem 0 0;
}

.product-info {
  padding: 1rem;
}

.product-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary, #1a1a1a);
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1rem;
  color: var(--text-secondary, #666);
  margin-bottom: 1rem;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid var(--border-color, #e5e5e5);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: var(--primary-color, #3b82f6);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark, #2563eb);
}

@media (max-width: 768px) {
  .product-card {
    margin-bottom: 1rem;
  }

  .product-image {
    height: 150px;
  }

  .product-actions {
    flex-direction: column;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --card-bg: #1f2937;
    --text-primary: #f3f4f6;
    --text-secondary: #9ca3af;
    --border-color: #374151;
    --primary-color: #60a5fa;
    --primary-dark: #3b82f6;
  }
}`,
    description: 'Modern CSS with variables, dark mode, and responsive design'
  }
];

interface LineProps {
  line: Token[];
  className?: string;
  style?: React.CSSProperties;
}

interface TokenProps {
  token: Token;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const CodeSnippet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
      (prevIndex + newDirection + codeSnippets.length) % codeSnippets.length
    ));
  };

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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {codeSnippets[currentIndex].title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {codeSnippets[currentIndex].description}
            </p>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-inner">
              {renderCode(codeSnippets[currentIndex].code, codeSnippets[currentIndex].language)}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {codeSnippets.map((_, index) => (
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