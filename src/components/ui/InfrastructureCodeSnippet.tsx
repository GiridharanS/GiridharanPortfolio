import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Register languages
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('bash', bash);

interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  description: string;
  category: 'database' | 'cloud' | 'server';
}

const infrastructureSnippets: CodeSnippet[] = [
  {
    title: 'PostgreSQL Database Optimization',
    language: 'sql',
    category: 'database',
    code: `-- Create optimized indexes
CREATE INDEX CONCURRENTLY idx_products_category
ON products USING BTREE (category_id)
WHERE active = true;

-- Partition large tables
CREATE TABLE orders (
    id SERIAL,
    created_at TIMESTAMP NOT NULL,
    customer_id INTEGER,
    status VARCHAR(50),
    total DECIMAL(10,2)
) PARTITION BY RANGE (created_at);

-- Create partitions
CREATE TABLE orders_2023 PARTITION OF orders
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

-- Optimize query with materialized view
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT 
    date_trunc('month', o.created_at) as month,
    p.category_id,
    SUM(oi.quantity) as total_quantity,
    SUM(oi.quantity * oi.unit_price) as total_revenue
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
GROUP BY 1, 2
WITH DATA;

-- Create refresh function
CREATE FUNCTION refresh_monthly_sales()
RETURNS trigger AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;`,
    description: 'PostgreSQL performance optimization with indexes, partitioning, and materialized views'
  },
  {
    title: 'MongoDB Schema & Aggregation',
    language: 'javascript',
    category: 'database',
    code: `// Define schema with validation
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "category"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        price: {
          bsonType: "decimal",
          minimum: 0,
          description: "must be a positive decimal and is required"
        },
        category: {
          bsonType: "objectId",
          description: "must be an objectId and is required"
        }
      }
    }
  }
});

// Complex aggregation pipeline
db.orders.aggregate([
  // Match recent orders
  { $match: { 
    created_at: { 
      $gte: new Date(Date.now() - 30*24*60*60*1000)
    }
  }},
  // Lookup product details
  { $lookup: {
    from: "products",
    localField: "product_id",
    foreignField: "_id",
    as: "product"
  }},
  // Unwind product array
  { $unwind: "$product" },
  // Group by category
  { $group: {
    _id: "$product.category",
    total_sales: { $sum: "$quantity" },
    revenue: { 
      $sum: { 
        $multiply: ["$quantity", "$product.price"] 
      }
    }
  }},
  // Sort by revenue
  { $sort: { revenue: -1 }}
]);`,
    description: 'MongoDB schema validation and complex aggregation pipeline'
  },
  {
    title: 'AWS Infrastructure as Code',
    language: 'yaml',
    category: 'cloud',
    code: `AWSTemplateFormatVersion: '2010-09-09'
Description: 'Rails application infrastructure'

Parameters:
  Environment:
    Type: String
    Default: production
    AllowedValues: [development, staging, production]

Resources:
  # VPC Configuration
  ApplicationVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: !Sub \${Environment}-vpc

  # ECS Cluster
  ApplicationCluster:
    Type: AWS::ECS::Cluster
    Properties:
      ClusterName: !Sub \${Environment}-cluster
      CapacityProviders:
        - FARGATE
        - FARGATE_SPOT

  # RDS Instance
  DatabaseInstance:
    Type: AWS::RDS::DBInstance
    Properties:
      Engine: postgres
      DBInstanceClass: db.t3.medium
      AllocatedStorage: 100
      MultiAZ: !Equals [!Ref Environment, production]
      BackupRetentionPeriod: 7
      AutoMinorVersionUpgrade: true

  # ElastiCache Redis
  RedisCluster:
    Type: AWS::ElastiCache::CacheCluster
    Properties:
      Engine: redis
      CacheNodeType: cache.t3.medium
      NumCacheNodes: 1
      AutoMinorVersionUpgrade: true

  # Application Load Balancer
  ApplicationLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Type: application
      Scheme: internet-facing
      SecurityGroups:
        - !Ref ALBSecurityGroup
      Subnets: !Ref PublicSubnets`,
    description: 'AWS CloudFormation template for Rails application infrastructure'
  },
  {
    title: 'Docker Compose Configuration',
    language: 'yaml',
    category: 'server',
    code: `version: '3.8'

services:
  web:
    build: 
      context: .
      dockerfile: Dockerfile.web
    image: myapp-web
    command: bundle exec puma -C config/puma.rb
    environment:
      RAILS_ENV: production
      DATABASE_URL: postgres://postgres:password@db:5432/myapp
      REDIS_URL: redis://redis:6379/1
    depends_on:
      - db
      - redis
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - bundle_cache:/usr/local/bundle
    deploy:
      replicas: 2
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure

  sidekiq:
    build: 
      context: .
      dockerfile: Dockerfile.worker
    command: bundle exec sidekiq
    environment:
      RAILS_ENV: production
      REDIS_URL: redis://redis:6379/1
    depends_on:
      - redis
    deploy:
      replicas: 2

  db:
    image: postgres:14-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"

  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"

volumes:
  postgres_data:
  redis_data:
  bundle_cache:`,
    description: 'Docker Compose setup for Rails application with PostgreSQL and Redis'
  },
  {
    title: 'Nginx Server Configuration',
    language: 'bash',
    category: 'server',
    code: `# /etc/nginx/conf.d/rails_app.conf
upstream rails_app {
    server unix:///var/run/puma.sock fail_timeout=0;
    # Additional app servers
    server 10.0.0.2:3000 backup;
}

# HTTP server
server {
    listen 80;
    listen [::]:80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # Modern configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;

    # Root directory
    root /var/www/rails_app/current/public;

    # Asset caching
    location ^~ /assets/ {
        gzip_static on;
        expires max;
        add_header Cache-Control public;
    }

    # App proxy
    location / {
        try_files $uri @rails_app;
    }

    location @rails_app {
        proxy_pass http://rails_app;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
        proxy_buffer_size 16k;
        proxy_buffers 8 16k;
    }
}`,
    description: 'Nginx configuration with SSL, HTTP/2, and load balancing'
  }
];

export const InfrastructureCodeSnippet = () => {
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
      (prevIndex + newDirection + infrastructureSnippets.length) % infrastructureSnippets.length
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
                {infrastructureSnippets[currentIndex].title}
              </h3>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                {infrastructureSnippets[currentIndex].category}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {infrastructureSnippets[currentIndex].description}
            </p>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-inner">
              {renderCode(
                infrastructureSnippets[currentIndex].code,
                infrastructureSnippets[currentIndex].language
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {infrastructureSnippets.map((_, index) => (
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