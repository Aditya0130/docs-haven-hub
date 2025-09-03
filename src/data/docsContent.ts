export interface DocsContent {
  title: string;
  sections: DocsSection[];
}

export interface DocsSection {
  type: 'heading' | 'paragraph' | 'list' | 'code' | 'table' | 'callout' | 'interactive';
  level?: number; // for headings
  content: string | string[] | TableData | CalloutData | InteractiveData;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface CalloutData {
  type: 'tip' | 'warning' | 'info' | 'error';
  title: string;
  content: string;
}

export interface InteractiveData {
  type: 'form' | 'progress' | 'tabs' | 'embed';
  data: any;
}

export const docsContent: Record<string, DocsContent> = {
  introduction: {
    title: "Welcome to DocuApp",
    sections: [
      {
        type: 'paragraph',
        content: "DocuApp is a comprehensive documentation platform designed to help you build, maintain, and share beautiful documentation for your projects. Whether you're documenting APIs, writing guides, or creating knowledge bases, DocuApp provides all the tools you need."
      },
      {
        type: 'heading',
        level: 2,
        content: "What is DocuApp?"
      },
      {
        type: 'paragraph',
        content: "DocuApp combines the power of modern web technologies with an intuitive interface to create documentation that's both beautiful and functional. Our platform supports:"
      },
      {
        type: 'list',
        content: [
          "Rich text editing with Markdown support",
          "Interactive code examples and syntax highlighting",
          "Collaborative editing and real-time updates",
          "Custom themes and branding options",
          "Advanced search and navigation",
          "Analytics and user engagement tracking"
        ]
      },
      {
        type: 'heading',
        level: 2,
        content: "Key Features"
      },
      {
        type: 'heading',
        level: 3,
        content: "Modern Interface"
      },
      {
        type: 'paragraph',
        content: "Built with React and TypeScript, DocuApp offers a fast, responsive interface that works seamlessly across all devices. The clean design ensures your content remains the focus while providing powerful organizational tools."
      },
      {
        type: 'heading',
        level: 3,
        content: "Developer-Friendly"
      },
      {
        type: 'paragraph',
        content: "DocuApp integrates with your existing workflow. Import content from Git repositories, sync with your CI/CD pipeline, and use our API to automate documentation updates."
      },
      {
        type: 'callout',
        content: {
          type: 'info',
          title: 'Customer Testimonial',
          content: '"DocuApp has transformed how we approach documentation. The combination of ease-of-use and powerful features makes it perfect for both technical and non-technical team members." - Sarah Chen, Engineering Lead'
        }
      },
      {
        type: 'heading',
        level: 2,
        content: "Getting Started"
      },
      {
        type: 'paragraph',
        content: "Ready to dive in? Check out our Quick Start guide to get your first documentation site up and running in minutes. Or explore our comprehensive API Reference if you're looking to integrate DocuApp into your existing systems."
      },
      {
        type: 'callout',
        content: {
          type: 'tip',
          title: '💡 Pro Tip',
          content: 'Start with our templates to quickly create professional documentation. You can always customize the design and structure later to match your needs.'
        }
      }
    ]
  },
  
  quickStart: {
    title: "Quick Start Guide",
    sections: [
      {
        type: 'paragraph',
        content: "Get up and running with DocuApp in less than 5 minutes. This guide will walk you through creating your first documentation project and publishing your content."
      },
      {
        type: 'heading',
        level: 2,
        content: "Prerequisites"
      },
      {
        type: 'paragraph',
        content: "Before you begin, make sure you have:"
      },
      {
        type: 'list',
        content: [
          "A modern web browser (Chrome, Firefox, Safari, or Edge)",
          "A DocuApp account (sign up for free at docuapp.com)",
          "Basic familiarity with Markdown (optional but helpful)"
        ]
      },
      {
        type: 'heading',
        level: 2,
        content: "Step 1: Create Your First Project"
      },
      {
        type: 'paragraph',
        content: "Once you've logged into your DocuApp dashboard, follow these steps:"
      },
      {
        type: 'list',
        content: [
          'Click the "New Project" button in the top-right corner',
          'Choose a template or start from scratch',
          'Give your project a name and description',
          'Select your preferred theme and color scheme',
          'Click "Create Project"'
        ]
      },
      {
        type: 'heading',
        level: 2,
        content: "Step 2: Add Your First Document"
      },
      {
        type: 'paragraph',
        content: "Now let's create your first documentation page:"
      },
      {
        type: 'code',
        content: `# My First Document

Welcome to my documentation! This is written in **Markdown**.

## Features

- Easy to write
- Easy to read  
- Converts to beautiful HTML

## Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, DocuApp!");
}
\`\`\``
      },
      {
        type: 'heading',
        level: 2,
        content: "Step 3: Organize Your Content"
      },
      {
        type: 'paragraph',
        content: "Use the sidebar navigation to organize your documents into logical sections:"
      },
      {
        type: 'list',
        content: [
          "Getting Started - Introduction and setup guides",
          "API Reference - Technical documentation",
          "Tutorials - Step-by-step guides",
          "FAQ - Common questions and answers"
        ]
      },
      {
        type: 'heading',
        level: 2,
        content: "Step 4: Customize Your Site"
      },
      {
        type: 'paragraph',
        content: "Make your documentation site unique by customizing:"
      },
      {
        type: 'list',
        content: [
          "Logo and branding",
          "Color themes",
          "Navigation structure",
          "Custom CSS"
        ]
      },
      {
        type: 'callout',
        content: {
          type: 'info',
          title: '🚀 Next Steps',
          content: 'Explore our advanced features like team collaboration, custom integrations, and analytics. Check out the Components section to learn about interactive elements you can add to your docs.'
        }
      },
      {
        type: 'heading',
        level: 2,
        content: "Publishing Your Documentation"
      },
      {
        type: 'paragraph',
        content: "When you're ready to share your documentation with the world:"
      },
      {
        type: 'list',
        content: [
          'Click "Publish" in the top navigation',
          'Choose your publishing options (public, private, or team-only)',
          'Configure your custom domain (optional)',
          'Click "Go Live"'
        ]
      },
      {
        type: 'paragraph',
        content: "Your documentation is now live and accessible to your audience. You can continue editing and your changes will be reflected immediately."
      }
    ]
  },

  installation: {
    title: "Installation Guide",
    sections: [
      {
        type: 'paragraph',
        content: "DocuApp can be installed and deployed in multiple ways depending on your needs. This guide covers all available installation methods from cloud hosting to self-hosted solutions."
      },
      {
        type: 'heading',
        level: 2,
        content: "Cloud Hosting (Recommended)"
      },
      {
        type: 'paragraph',
        content: "The easiest way to get started with DocuApp is through our cloud platform. No installation required - just sign up and start building."
      },
      {
        type: 'callout',
        content: {
          type: 'tip',
          title: '✨ Benefits of Cloud Hosting',
          content: 'Automatic updates and security patches • Global CDN for fast content delivery • Built-in backup and disaster recovery • 24/7 monitoring and support'
        }
      },
      {
        type: 'heading',
        level: 2,
        content: "Self-Hosted Installation"
      },
      {
        type: 'paragraph',
        content: "For organizations requiring full control over their documentation infrastructure, DocuApp can be self-hosted."
      },
      {
        type: 'heading',
        level: 3,
        content: "System Requirements"
      },
      {
        type: 'list',
        content: [
          "Operating System: Linux (Ubuntu 20.04+, CentOS 8+) or Docker",
          "Memory: Minimum 4GB RAM (8GB recommended)",
          "Storage: 20GB available disk space",
          "Network: HTTPS-capable reverse proxy"
        ]
      },
      {
        type: 'heading',
        level: 3,
        content: "Docker Installation"
      },
      {
        type: 'paragraph',
        content: "The fastest way to self-host DocuApp is using Docker:"
      },
      {
        type: 'code',
        content: `# Pull the latest DocuApp image
docker pull docuapp/docuapp:latest

# Create a docker-compose.yml file
version: '3.8'
services:
  docuapp:
    image: docuapp/docuapp:latest
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/docuapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
      
  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=docuapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
  redis:
    image: redis:6-alpine
    
volumes:
  postgres_data:`
      },
      {
        type: 'heading',
        level: 3,
        content: "Manual Installation"
      },
      {
        type: 'paragraph',
        content: "For custom deployments, you can install DocuApp manually:"
      },
      {
        type: 'code',
        content: `# Install Node.js 18+ and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone the repository
git clone https://github.com/docuapp/docuapp.git
cd docuapp

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Build the application
npm run build

# Start the server
npm start`
      },
      {
        type: 'heading',
        level: 2,
        content: "Configuration"
      },
      {
        type: 'paragraph',
        content: "DocuApp can be configured through environment variables:"
      },
      {
        type: 'table',
        content: {
          headers: ["Variable", "Description", "Default"],
          rows: [
            ["PORT", "Server port", "3000"],
            ["DATABASE_URL", "PostgreSQL connection string", "Required"],
            ["REDIS_URL", "Redis connection string", "Optional"]
          ]
        }
      },
      {
        type: 'heading',
        level: 2,
        content: "SSL/TLS Setup"
      },
      {
        type: 'paragraph',
        content: "For production deployments, always use HTTPS. DocuApp works with any reverse proxy that can terminate SSL/TLS connections."
      },
      {
        type: 'heading',
        level: 3,
        content: "Nginx Configuration"
      },
      {
        type: 'code',
        content: `server {
    listen 443 ssl http2;
    server_name docs.yourdomain.com;
    
    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`
      },
      {
        type: 'callout',
        content: {
          type: 'warning',
          title: '⚠️ Security Note',
          content: 'Always use strong passwords and keep your DocuApp installation updated. Consider using a web application firewall (WAF) for additional protection.'
        }
      }
    ]
  },

  apiReference: {
    title: "API Reference",
    sections: [
      {
        type: 'paragraph',
        content: "The DocuApp REST API provides programmatic access to all platform features. Use our API to automate documentation workflows, integrate with your existing tools, and build custom applications on top of DocuApp."
      },
      {
        type: 'heading',
        level: 2,
        content: "Authentication"
      },
      {
        type: 'paragraph',
        content: "All API requests require authentication using API keys. You can generate API keys from your account dashboard."
      },
      {
        type: 'code',
        content: `# Include your API key in the Authorization header
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.docuapp.com/v1/projects`
      },
      {
        type: 'heading',
        level: 2,
        content: "Base URL"
      },
      {
        type: 'paragraph',
        content: "All API requests should be made to:"
      },
      {
        type: 'code',
        content: "https://api.docuapp.com/v1"
      },
      {
        type: 'heading',
        level: 2,
        content: "Projects"
      },
      {
        type: 'paragraph',
        content: "Manage your documentation projects programmatically."
      },
      {
        type: 'heading',
        level: 3,
        content: "List Projects"
      },
      {
        type: 'paragraph',
        content: "Retrieve a list of all projects in your account."
      },
      {
        type: 'code',
        content: "GET /projects"
      },
      {
        type: 'code',
        content: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.docuapp.com/v1/projects`
      },
      {
        type: 'paragraph',
        content: "Response:"
      },
      {
        type: 'code',
        content: `{
  "projects": [
    {
      "id": "proj_123",
      "name": "My Documentation",
      "description": "Product documentation",
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-20T15:30:00Z",
      "status": "published",
      "url": "https://my-docs.docuapp.com"
    }
  ],
  "total": 1,
  "page": 1,
  "per_page": 20
}`
      },
      {
        type: 'heading',
        level: 3,
        content: "Create Project"
      },
      {
        type: 'paragraph',
        content: "Create a new documentation project."
      },
      {
        type: 'code',
        content: "POST /projects"
      },
      {
        type: 'code',
        content: `curl -X POST \\
     -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     -d '{
       "name": "New Project",
       "description": "A new documentation project",
       "template": "default"
     }' \\
     https://api.docuapp.com/v1/projects`
      },
      {
        type: 'heading',
        level: 2,
        content: "Documents"
      },
      {
        type: 'paragraph',
        content: "Create, update, and manage individual documentation pages."
      },
      {
        type: 'heading',
        level: 3,
        content: "Create Document"
      },
      {
        type: 'code',
        content: "POST /projects/{project_id}/documents"
      },
      {
        type: 'code',
        content: `curl -X POST \\
     -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     -d '{
       "title": "Getting Started",
       "content": "# Getting Started\\n\\nWelcome to our docs!",
       "slug": "getting-started",
       "status": "published"
     }' \\
     https://api.docuapp.com/v1/projects/proj_123/documents`
      },
      {
        type: 'heading',
        level: 2,
        content: "Rate Limits"
      },
      {
        type: 'paragraph',
        content: "API requests are limited to 1,000 requests per hour per API key. Rate limit information is included in response headers:"
      },
      {
        type: 'list',
        content: [
          "X-RateLimit-Limit - Total requests allowed per hour",
          "X-RateLimit-Remaining - Requests remaining in current window",
          "X-RateLimit-Reset - Time when the rate limit resets"
        ]
      },
      {
        type: 'heading',
        level: 2,
        content: "Error Handling"
      },
      {
        type: 'paragraph',
        content: "The API uses standard HTTP status codes to indicate success or failure:"
      },
      {
        type: 'list',
        content: [
          "200 - Success",
          "201 - Created",
          "400 - Bad Request",
          "401 - Unauthorized",
          "404 - Not Found",
          "429 - Rate Limited",
          "500 - Internal Server Error"
        ]
      },
      {
        type: 'paragraph',
        content: "Error responses include a JSON object with details:"
      },
      {
        type: 'code',
        content: `{
  "error": {
    "code": "invalid_request",
    "message": "The request is missing required parameters"
  }
}`
      }
    ]
  },

  components: {
    title: "Components Library",
    sections: [
      {
        type: 'paragraph',
        content: "DocuApp provides a rich set of interactive components to enhance your documentation. These components help you create engaging, interactive content that goes beyond static text."
      },
      {
        type: 'heading',
        level: 2,
        content: "Code Blocks"
      },
      {
        type: 'paragraph',
        content: "Syntax-highlighted code blocks with copy functionality and language detection."
      },
      {
        type: 'heading',
        level: 3,
        content: "Basic Code Block"
      },
      {
        type: 'code',
        content: `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message); // "Hello, World!"`
      },
      {
        type: 'heading',
        level: 2,
        content: "Callout Boxes"
      },
      {
        type: 'paragraph',
        content: "Draw attention to important information with styled callout boxes."
      },
      {
        type: 'callout',
        content: {
          type: 'tip',
          title: '💡 Pro Tip',
          content: 'Use callout boxes sparingly to maintain their impact. They work best for highlighting key insights or important warnings.'
        }
      },
      {
        type: 'callout',
        content: {
          type: 'warning',
          title: '⚠️ Warning',
          content: 'This operation cannot be undone. Make sure you have backups before proceeding.'
        }
      },
      {
        type: 'callout',
        content: {
          type: 'info',
          title: 'ℹ️ Information',
          content: 'This feature requires a Pro subscription. Upgrade your account to access advanced analytics and reporting features.'
        }
      },
      {
        type: 'heading',
        level: 2,
        content: "Tables"
      },
      {
        type: 'paragraph',
        content: "Create responsive, well-formatted tables for structured data."
      },
      {
        type: 'table',
        content: {
          headers: ["Method", "Endpoint", "Description", "Auth Required"],
          rows: [
            ["GET", "/api/users", "List all users", "✅ Yes"],
            ["POST", "/api/users", "Create new user", "✅ Yes"],
            ["PUT", "/api/users/{id}", "Update user", "✅ Yes"],
            ["DELETE", "/api/users/{id}", "Delete user", "✅ Yes"]
          ]
        }
      },
      {
        type: 'heading',
        level: 2,
        content: "Best Practices"
      },
      {
        type: 'list',
        content: [
          "Use components consistently throughout your documentation",
          "Don't overuse callouts - they lose impact when used too frequently",
          "Test interactive examples to ensure they work as expected",
          "Keep tables simple and mobile-friendly",
          "Use progress indicators for complex, multi-step processes"
        ]
      }
    ]
  },

  database: {
    title: "Database Integration",
    sections: [
      {
        type: 'paragraph',
        content: "DocuApp supports multiple database integrations to help you create dynamic documentation that stays in sync with your data sources."
      },
      {
        type: 'heading',
        level: 2,
        content: "Supported Databases"
      },
      {
        type: 'paragraph',
        content: "DocuApp works with these popular database systems:"
      },
      {
        type: 'list',
        content: [
          "PostgreSQL - Full-featured relational database with advanced querying capabilities",
          "MySQL - Popular open-source relational database management system", 
          "MongoDB - Document-based NoSQL database for flexible schema designs",
          "Redis - In-memory data structure store for caching and real-time analytics"
        ]
      },
      {
        type: 'heading',
        level: 2,
        content: "Connection Setup"
      },
      {
        type: 'paragraph',
        content: "Configure your database connections through environment variables:"
      },
      {
        type: 'code',
        content: `# PostgreSQL
DATABASE_URL=postgresql://username:password@localhost:5432/docuapp

# MySQL
MYSQL_URL=mysql://username:password@localhost:3306/docuapp

# MongoDB
MONGODB_URL=mongodb://username:password@localhost:27017/docuapp

# Redis
REDIS_URL=redis://localhost:6379`
      },
      {
        type: 'heading',
        level: 2,
        content: "Schema Management"
      },
      {
        type: 'paragraph',
        content: "DocuApp includes built-in schema management tools to keep your database structure up to date."
      },
      {
        type: 'heading',
        level: 3,
        content: "Migrations"
      },
      {
        type: 'paragraph',
        content: "Run database migrations to update your schema:"
      },
      {
        type: 'code',
        content: `# Run pending migrations
npm run migrate

# Create a new migration
npm run migrate:create add_user_preferences

# Rollback the last migration
npm run migrate:rollback`
      },
      {
        type: 'heading',
        level: 3,
        content: "Core Tables"
      },
      {
        type: 'paragraph',
        content: "DocuApp creates and manages these core tables:"
      },
      {
        type: 'table',
        content: {
          headers: ["Table", "Description", "Key Fields"],
          rows: [
            ["users", "User accounts and authentication", "id, email, name, role"],
            ["projects", "Documentation projects", "id, name, slug, owner_id"],
            ["documents", "Individual documentation pages", "id, title, content, project_id"],
            ["versions", "Document version history", "id, document_id, content, created_at"]
          ]
        }
      },
      {
        type: 'heading',
        level: 2,
        content: "Dynamic Content"
      },
      {
        type: 'paragraph',
        content: "Connect your documentation to live data sources for always up-to-date content."
      },
      {
        type: 'heading',
        level: 3,
        content: "Database Queries"
      },
      {
        type: 'paragraph',
        content: "Embed live database queries in your documentation:"
      },
      {
        type: 'code',
        content: `{{< database-query >}}
SELECT 
  name, 
  version, 
  downloads 
FROM packages 
WHERE category = 'documentation'
ORDER BY downloads DESC
LIMIT 10
{{< /database-query >}}`
      },
      {
        type: 'heading',
        level: 2,
        content: "Performance Monitoring"
      },
      {
        type: 'paragraph',
        content: "Monitor database performance to ensure optimal documentation loading times."
      },
      {
        type: 'heading',
        level: 3,
        content: "Key Metrics"
      },
      {
        type: 'list',
        content: [
          "Query execution time",
          "Database connection pool usage",
          "Cache hit/miss ratios",
          "Slow query identification",
          "Database storage utilization"
        ]
      },
      {
        type: 'callout',
        content: {
          type: 'tip',
          title: '💾 Backup Best Practices',
          content: 'Schedule regular automated backups • Test restore procedures monthly • Store backups in multiple locations • Encrypt sensitive backup data • Monitor backup success/failure'
        }
      }
    ]
  }
};