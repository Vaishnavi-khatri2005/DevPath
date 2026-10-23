/**
 * Sensible starter syllabus used ONLY when no Excel file has been imported yet.
 * As requested, this is clearly flagged as sample data and easily replaced.
 */

export const SAMPLE_SYLLABUS = {
  id: 'sample-fullstack-starter',
  name: 'Sample Full Stack Starter Syllabus (Preview)',
  isSample: true,
  importedAt: new Date().toISOString(),
  totalCategories: 6,
  totalTopics: 24,
  categories: [
    {
      id: 'cat-html-css',
      name: 'HTML5 & Modern CSS',
      order: 1,
      topics: [
        {
          id: 'topic-html-1',
          title: 'Semantic HTML & Document Structure',
          description: 'Document anatomy, semantic tags (header, nav, main, article, section, footer), SEO basics, and accessibility fundamentals (a11y, ARIA landmarks).',
          categoryId: 'cat-html-css',
          categoryName: 'HTML5 & Modern CSS',
          order: 1,
          hours: { total: '4 hrs' }
        },
        {
          id: 'topic-html-2',
          title: 'Modern CSS Layouts (Flexbox & CSS Grid)',
          description: 'Flex container properties, alignment, justification, Grid template areas, responsive design without media queries, and container queries.',
          categoryId: 'cat-html-css',
          categoryName: 'HTML5 & Modern CSS',
          order: 2,
          hours: { total: '6 hrs' }
        },
        {
          id: 'topic-html-3',
          title: 'CSS Custom Properties & Responsive Styling',
          description: 'Variables, fluid typography with clamp(), modern color spaces, media queries, and dark mode theming.',
          categoryId: 'cat-html-css',
          categoryName: 'HTML5 & Modern CSS',
          order: 3,
          hours: { total: '4 hrs' }
        },
        {
          id: 'topic-html-4',
          title: 'HTML Forms & Client-Side Validation',
          description: 'Form controls, accessible labeling, input types, constraint validation API, and custom validation states.',
          categoryId: 'cat-html-css',
          categoryName: 'HTML5 & Modern CSS',
          order: 4,
          hours: { total: '3 hrs' }
        }
      ]
    },
    {
      id: 'cat-js',
      name: 'JavaScript Core & ES6+',
      order: 2,
      topics: [
        {
          id: 'topic-js-1',
          title: 'Data Types, Scope & Closures',
          description: 'Primitive vs Reference types, block scope, lexical environment, closures in practice, and execution context.',
          categoryId: 'cat-js',
          categoryName: 'JavaScript Core & ES6+',
          order: 5,
          hours: { total: '6 hrs' }
        },
        {
          id: 'topic-js-2',
          title: 'Asynchronous JavaScript & Event Loop',
          description: 'Call stack, event loop, microtasks vs macrotasks, Promises, async/await, and error handling with try/catch.',
          categoryId: 'cat-js',
          categoryName: 'JavaScript Core & ES6+',
          order: 6,
          hours: { total: '8 hrs' }
        },
        {
          id: 'topic-js-3',
          title: 'DOM Manipulation & Event Handling',
          description: 'DOM tree querying, element manipulation, event bubbling, event delegation, and performance optimizations.',
          categoryId: 'cat-js',
          categoryName: 'JavaScript Core & ES6+',
          order: 7,
          hours: { total: '5 hrs' }
        },
        {
          id: 'topic-js-4',
          title: 'Modern ES6+ Features & Modules',
          description: 'Destructuring, spread/rest operators, optional chaining, nullish coalescing, and ES modules (import/export).',
          categoryId: 'cat-js',
          categoryName: 'JavaScript Core & ES6+',
          order: 8,
          hours: { total: '4 hrs' }
        }
      ]
    },
    {
      id: 'cat-react',
      name: 'React & Component Architecture',
      order: 3,
      topics: [
        {
          id: 'topic-react-1',
          title: 'JSX & Component Anatomy',
          description: 'Declarative UI with JSX, component props, conditional rendering, list rendering with keys, and component composition.',
          categoryId: 'cat-react',
          categoryName: 'React & Component Architecture',
          order: 9,
          hours: { total: '5 hrs' }
        },
        {
          id: 'topic-react-2',
          title: 'State & Core Hooks (useState, useEffect)',
          description: 'State preservation, state updater functions, dependency array in useEffect, cleanup functions, and lifecycle patterns.',
          categoryId: 'cat-react',
          categoryName: 'React & Component Architecture',
          order: 10,
          hours: { total: '8 hrs' }
        },
        {
          id: 'topic-react-3',
          title: 'Forms, Controlled Components & Validation',
          description: 'Single-source-of-truth form state, multi-input handling, validation patterns, and custom input components.',
          categoryId: 'cat-react',
          categoryName: 'React & Component Architecture',
          order: 11,
          hours: { total: '4 hrs' }
        },
        {
          id: 'topic-react-4',
          title: 'Context API & Global State Management',
          description: 'Avoiding prop drilling, createContext, useContext, provider pattern, and state management trade-offs.',
          categoryId: 'cat-react',
          categoryName: 'React & Component Architecture',
          order: 12,
          hours: { total: '6 hrs' }
        }
      ]
    },
    {
      id: 'cat-backend',
      name: 'Backend & REST API Architecture',
      order: 4,
      topics: [
        {
          id: 'topic-be-1',
          title: 'Node.js Runtime & Express.js Setup',
          description: 'Event-driven architecture, middleware pipeline, routing, request/response cycle, and environment variables.',
          categoryId: 'cat-backend',
          categoryName: 'Backend & REST API Architecture',
          order: 13,
          hours: { total: '6 hrs' }
        },
        {
          id: 'topic-be-2',
          title: 'RESTful API Design & Best Practices',
          description: 'HTTP verbs, status codes, standard JSON payloads, error formatting, versioning, and URL conventions.',
          categoryId: 'cat-backend',
          categoryName: 'Backend & REST API Architecture',
          order: 14,
          hours: { total: '5 hrs' }
        },
        {
          id: 'topic-be-3',
          title: 'Authentication & Authorization (JWT)',
          description: 'Password hashing with bcrypt, JWT token creation, token verification middleware, and role-based access control.',
          categoryId: 'cat-backend',
          categoryName: 'Backend & REST API Architecture',
          order: 15,
          hours: { total: '7 hrs' }
        },
        {
          id: 'topic-be-4',
          title: 'API Security & Error Handling',
          description: 'CORS configuration, rate limiting, helmet headers, input sanitization, and centralized error handling middleware.',
          categoryId: 'cat-backend',
          categoryName: 'Backend & REST API Architecture',
          order: 16,
          hours: { total: '4 hrs' }
        }
      ]
    },
    {
      id: 'cat-database',
      name: 'Databases & Data Modeling',
      order: 5,
      topics: [
        {
          id: 'topic-db-1',
          title: 'Relational Database Fundamentals (SQL)',
          description: 'Relational schemas, primary/foreign keys, normalization (1NF-3NF), and basic SELECT queries.',
          categoryId: 'cat-database',
          categoryName: 'Databases & Data Modeling',
          order: 17,
          hours: { total: '6 hrs' }
        },
        {
          id: 'topic-db-2',
          title: 'Advanced SQL: Joins, Grouping & Indexing',
          description: 'INNER/LEFT/RIGHT JOINs, GROUP BY, HAVING, subqueries, transactions (ACID), and query performance indexes.',
          categoryId: 'cat-database',
          categoryName: 'Databases & Data Modeling',
          order: 18,
          hours: { total: '8 hrs' }
        },
        {
          id: 'topic-db-3',
          title: 'Document Databases (MongoDB & Mongoose)',
          description: 'JSON/BSON documents, collections, schemas, validation, embedding vs referencing, and indexing.',
          categoryId: 'cat-database',
          categoryName: 'Databases & Data Modeling',
          order: 19,
          hours: { total: '6 hrs' }
        },
        {
          id: 'topic-db-4',
          title: 'Database Migrations & ORMs',
          description: 'Schema version control, migration strategies, ORM/ODM integration, and connection pooling.',
          categoryId: 'cat-database',
          categoryName: 'Databases & Data Modeling',
          order: 20,
          hours: { total: '5 hrs' }
        }
      ]
    },
    {
      id: 'cat-devops',
      name: 'Git, DevOps & Deployment',
      order: 6,
      topics: [
        {
          id: 'topic-devops-1',
          title: 'Git Version Control & Branching Workflows',
          description: 'Commits, interactive rebasing, merge conflicts resolution, GitHub Pull Requests, and feature branching.',
          categoryId: 'cat-devops',
          categoryName: 'Git, DevOps & Deployment',
          order: 21,
          hours: { total: '4 hrs' }
        },
        {
          id: 'topic-devops-2',
          title: 'Containerization Basics with Docker',
          description: 'Containers vs VMs, writing Dockerfiles, multi-stage builds, and Docker Compose for local full-stack environments.',
          categoryId: 'cat-devops',
          categoryName: 'Git, DevOps & Deployment',
          order: 22,
          hours: { total: '6 hrs' }
        },
        {
          id: 'topic-devops-3',
          title: 'CI/CD Pipelines (GitHub Actions)',
          description: 'Automated test runners, build pipelines, linting checks, and automated continuous deployment workflows.',
          categoryId: 'cat-devops',
          categoryName: 'Git, DevOps & Deployment',
          order: 23,
          hours: { total: '5 hrs' }
        },
        {
          id: 'topic-devops-4',
          title: 'Full Stack Production Deployment & Monitoring',
          description: 'Environment variables in cloud hosting, frontend CDN deployment, backend server hosting, and basic health checks.',
          categoryId: 'cat-devops',
          categoryName: 'Git, DevOps & Deployment',
          order: 24,
          hours: { total: '5 hrs' }
        }
      ]
    }
  ]
};
