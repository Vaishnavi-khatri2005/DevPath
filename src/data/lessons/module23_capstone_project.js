/**
 * Pre-generated comprehensive lessons for MODULE_23_LESSONS
 * Sources: Industry Best Practices, Agile Alliance, Full-Stack Architecture Guides.
 */

export const MODULE_23_LESSONS = {
  "topic-23-1": {
    "id": "topic-23-1",
    "title": "Capstone Project Specifications",
    "category": "23. Full-Stack Capstone Project",
    "description": "Project : At the end of the training, complete the assigned capstone project by applying all learned concepts to build and demonstrate a working solution",
    "objectives": [
      "Review the comprehensive capstone project requirements and business scenario",
      "Design a complete multi-tier enterprise solution (Angular SPA + ASP.NET Core Web API + SQL Server)",
      "Establish milestone deliverables across sprint iterations",
      "Configure project repository, solution structure, and development environments"
    ],
    "prerequisites": "Modules 1 through 22.",
    "terminology": [
      {
        "term": "Capstone Project",
        "definition": "A comprehensive real-world project that demonstrates mastery by building an end-to-end commercial software solution from scratch."
      }
    ],
    "concepts": [
      {
        "title": "Enterprise Capstone Business Scenario",
        "explanation": "Build a production-grade full-stack platform (e.g. Healthcare Appointment Portal, Logistics Tracker, or Corporate LMS) implementing every layer of the curriculum.",
        "codeSnippet": "/* CAPSTONE TECHNICAL SPECIFICATIONS:\n1. BACKEND (.NET 8 Web API):\n   - Secure REST API with JWT Auth and Role Authorization (Admin, User)\n   - Entity Framework Core with SQL Server (1:N and N:M relationships)\n   - FluentValidation and global RFC 7807 ProblemDetails\n   - Serilog structured logging with Correlation ID tracking\n   - Automated xUnit test suite (Unit + Integration tests)\n\n2. FRONTEND (Angular 17+):\n   - Standalone components with modern control flow (@if, @for)\n   - Angular Signals for reactive UI state\n   - Reactive Forms with live validation feedback\n   - Functional HTTP Interceptor for automatic JWT token injection\n   - Responsive dark/light theme stylesheet\n\n3. DEVOPS & INFRASTRUCTURE:\n   - Multi-stage Dockerfile for containerization\n   - GitHub Actions CI pipeline executing tests on PR\n   - Docker Compose for local multi-container development\n*/",
        "language": "csharp",
        "output": "Complete architectural blueprint for production-grade full-stack capstone delivery.",
        "lineExplanation": [
          "Defines explicit, measurable deliverables across backend, frontend, database, and DevOps."
        ]
      }
    ],
    "diagram": "Capstone System Delivery:\n[ Angular Frontend ] <--- HTTPS / JWT ---> [ ASP.NET Core API ] <--- EF Core ---> [ SQL Database ]\n         ^                                           ^\n         |                                           |\n   [ Jasmine Tests ]                           [ xUnit Tests ]\n         \\                                           /\n          +-----> [ GitHub Actions CI Pipeline ] <---+",
    "realWorldApplication": "Demonstrates job-ready full-stack software engineering capability for commercial enterprise roles.",
    "commonErrors": [
      {
        "error": "Starting UI development before designing the database schema and API contracts",
        "cause": "Leads to frequent rework and mismatched data models.",
        "fix": "Design the database schema and API DTO contracts first, then build out backend and frontend."
      }
    ],
    "bestPractices": [
      "Plan in two-week sprint increments with clear milestone goals.",
      "Commit code daily with semantic commit messages.",
      "Keep automated tests running green throughout development."
    ],
    "practiceQuestions": [
      {
        "question": "What is the recommended first step when starting a large full-stack capstone project?",
        "options": [
          "Write HTML animations.",
          "Design the domain models, database schema, and API contracts.",
          "Deploy to Kubernetes immediately.",
          "Configure production billing."
        ],
        "answerIndex": 1,
        "explanation": "Establishing clean domain models and API contracts first creates a solid foundation, preventing costly rewrites later."
      }
    ],
    "revisionSummary": [
      "The Capstone project integrates all 23 course modules.",
      "Delivers a working Angular + ASP.NET Core + SQL Server system.",
      "Follows professional enterprise engineering standards."
    ],
    "references": [
      {
        "title": "Enterprise Full Stack Architecture - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-23-2": {
    "id": "topic-23-2",
    "title": "Evaluation Rubric & Quality Gates",
    "category": "23. Full-Stack Capstone Project",
    "description": "Evaluation criteria : The project will be evaluated using defined rubrics covering input validation, exception handling, logging, security, and adherence to coding best practices",
    "objectives": [
      "Understand the five evaluation dimensions: Architecture, Security, Quality, Performance, and UX",
      "Satisfy input validation requirements across both frontend and backend layers",
      "Verify robust exception handling and structured logging integration",
      "Audit code for adherence to C# and Angular clean code standards"
    ],
    "prerequisites": "Topic 23-1.",
    "terminology": [
      {
        "term": "Evaluation Rubric",
        "definition": "A scoring framework establishing objective performance levels (Distinction, Pass, Needs Revision) across defined engineering criteria."
      }
    ],
    "concepts": [
      {
        "title": "The Five Evaluation Dimensions",
        "explanation": "Projects are graded according to rigorous industry standards across all architectural layers.",
        "codeSnippet": "/* CAPSTONE GRADING RUBRIC:\nDimension 1: Architecture & SOLID (25%)\n- Clean separation of concerns (Core, API, Frontend)\n- Effective use of DI, DTOs, and Repository patterns\n\nDimension 2: Security & Authentication (25%)\n- Robust JWT authentication with expiration and role authorization\n- Zero SQL injection or XSS vulnerabilities; ownership checks (BOLA) enforced\n\nDimension 3: Code Quality & Testing (20%)\n- Unit and integration tests passing with meaningful assertions\n- Zero compiler warnings; clean code adhering to naming conventions\n\nDimension 4: Error Handling & Observability (15%)\n- RFC 7807 ProblemDetails returned on failures\n- Serilog structured logging with Correlation IDs\n\nDimension 5: UI/UX & Reactivity (15%)\n- Responsive design with comfortable spacing and clear hover states\n- Fast feedback with Signals/RxJS and proper error alerts\n*/",
        "language": "markdown",
        "output": "Clear, transparent scoring matrix covering all enterprise engineering requirements.",
        "lineExplanation": [
          "Defines the exact criteria required to achieve a top evaluation score."
        ]
      }
    ],
    "diagram": "Capstone Evaluation Score Weighting:\n[ Security: 25% ] + [ Architecture: 25% ] + [ Testing: 20% ] + [ Observability: 15% ] + [ UI/UX: 15% ] = 100%",
    "realWorldApplication": "Mirrors technical hiring interviews, senior architect code reviews, and enterprise release audits.",
    "commonErrors": [
      {
        "error": "Submitting projects with hardcoded secrets or failing unit tests",
        "cause": "Neglecting pre-submission checks.",
        "fix": "Run 'dotnet test' and check git status to ensure zero secrets are present."
      }
    ],
    "bestPractices": [
      "Conduct a self-audit against the rubric before final submission.",
      "Verify that all test suites pass in the GitHub Actions CI pipeline.",
      "Ensure the README provides clear step-by-step setup and execution instructions."
    ],
    "practiceQuestions": [
      {
        "question": "In the capstone evaluation rubric, why is backend validation required even when frontend reactive forms already validate inputs?",
        "options": [
          "It is a duplicate check for fun.",
          "Frontend validation is purely for user experience; attackers can bypass the browser and send malicious payloads directly to the API via Postman or curl.",
          "Browsers disable JavaScript automatically.",
          "It is required by CSS."
        ],
        "answerIndex": 1,
        "explanation": "Frontend validation can be bypassed easily. The backend must independently enforce all validation rules as the authoritative security boundary."
      }
    ],
    "revisionSummary": [
      "Projects are evaluated on Architecture, Security, Quality, Logging, and UX.",
      "Both frontend and backend validation are mandatory.",
      "Automated tests and zero compiler warnings are required."
    ],
    "references": [
      {
        "title": "Microsoft Code Quality Standards",
        "url": "https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-23-3": {
    "id": "topic-23-3",
    "title": "Presentation & Peer Review",
    "category": "23. Full-Stack Capstone Project",
    "description": "Presentation & Review : Demo to panel; code walkthrough; Q&A; peer review",
    "objectives": [
      "Structure an impactful technical demo and project presentation",
      "Conduct a professional code walkthrough explaining architectural decisions",
      "Defend technical choices (e.g. why SQL vs NoSQL, why Signals vs NgRx) during Q&A",
      "Engage in constructive peer review exchanges"
    ],
    "prerequisites": "Topics 23-1 and 23-2.",
    "terminology": [
      {
        "term": "Technical Code Walkthrough",
        "definition": "A live guided tour of an application's architecture, key classes, and data flows presented to technical peers or stakeholders."
      }
    ],
    "concepts": [
      {
        "title": "Structuring a Winning Technical Presentation",
        "explanation": "A great technical presentation focuses 20% on the problem, 50% on live demonstration of the solution, and 30% on architectural highlights and engineering lessons learned.",
        "codeSnippet": "/* RECOMMENDED DEMO AGENDA (15-20 Minutes):\n1. Introduction (2 mins): Problem statement and target persona\n2. Live Solution Demo (8 mins):\n   - User Registration & JWT Login\n   - Happy path: creating an order, real-time reactive UI update\n   - Unhappy path: triggering validation errors, observing ProblemDetails\n3. Code Architecture Walkthrough (5 mins):\n   - DbContext and EF Core query optimization (.AsNoTracking)\n   - Angular Signals / Reactive Forms implementation\n   - Serilog structured logging and Correlation ID pipeline\n4. Challenges & Lessons Learned (2 mins): What broke, how it was fixed\n5. Q&A & Technical Defense (5 mins)\n*/",
        "language": "markdown",
        "output": "Engaging, professional presentation structure proven in corporate engineering demos.",
        "lineExplanation": [
          "Balances functional user demonstration with deep technical walkthrough."
        ]
      }
    ],
    "diagram": "Presentation Flow:\n[ Problem & Context (2m) ] ---> [ Live Working Demo (8m) ] ---> [ Code Architecture (5m) ] ---> [ Q&A Defense (5m) ]",
    "realWorldApplication": "Demonstrating sprint deliveries to executive stakeholders, presenting architectural proposals, and succeeding in technical job interviews.",
    "commonErrors": [
      {
        "error": "Spending 15 minutes reading slides and only 1 minute showing the real application",
        "cause": "Audiences want to see the working software and architecture.",
        "fix": "Prioritize the live demo and code walkthrough over theoretical slides."
      }
    ],
    "bestPractices": [
      "Rehearse the live demo beforehand to ensure local databases and Docker containers are pre-seeded.",
      "Show how the system handles error cases (unhappy path), not just happy paths.",
      "Clearly articulate the trade-offs behind your architectural decisions."
    ],
    "practiceQuestions": [
      {
        "question": "When demonstrating your capstone project, why is it valuable to deliberately showcase how the system handles error cases (unhappy paths)?",
        "options": [
          "To show that the system can crash.",
          "It demonstrates resilience, proper exception handling, user-friendly feedback, and deep architectural rigor.",
          "It takes less time.",
          "Errors are mandatory in demos."
        ],
        "answerIndex": 1,
        "explanation": "Demonstrating graceful error handling proves the system is production-hardened rather than just a fragile prototype."
      }
    ],
    "revisionSummary": [
      "Focus demos on working software and code architecture.",
      "Show both happy paths and resilient error handling.",
      "Articulate trade-offs clearly during technical Q&A."
    ],
    "references": [
      {
        "title": "Delivering Effective Technical Presentations - IEEE",
        "url": "https://www.ieee.org/",
        "source": "IEEE Professional Guide"
      }
    ]
  }
};
