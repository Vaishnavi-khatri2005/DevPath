/**
 * Pre-generated comprehensive lessons for MODULE_22_LESSONS
 * Sources: Industry Best Practices, Agile Alliance, Full-Stack Architecture Guides.
 */

export const MODULE_22_LESSONS = {
  "topic-22-1": {
    "id": "topic-22-1",
    "title": "Agile & Scrum Fundamentals",
    "category": "22. Agile & Project Readiness",
    "description": "Agile/Scrum Basics : Sprints, standups, retrospectives; user stories; estimation; Definition of Done",
    "objectives": [
      "Understand the Agile Manifesto values and principles",
      "Navigate Scrum ceremonies: Sprint Planning, Daily Standup, Sprint Review, and Retrospective",
      "Author clear User Stories using the standard format: As a [user], I want [feature], so that [benefit]",
      "Define and enforce an objective Definition of Done (DoD)"
    ],
    "prerequisites": "General software development teamwork concepts.",
    "terminology": [
      {
        "term": "Sprint",
        "definition": "A time-boxed iteration (typically 2 weeks) during which a development team creates a potentially releasable product increment."
      },
      {
        "term": "Definition of Done (DoD)",
        "definition": "An agreed checklist of criteria (code written, unit tests pass, PR reviewed, deployed to staging) that must be met before a story is marked complete."
      },
      {
        "term": "Story Points",
        "definition": "An abstract relative unit of measure used by agile teams to estimate the effort, complexity, and risk of implementing a user story."
      }
    ],
    "concepts": [
      {
        "title": "User Stories and the Definition of Done",
        "explanation": "Clear user stories with explicit acceptance criteria eliminate ambiguity between product managers and engineers.",
        "codeSnippet": "/* USER STORY: Order History Export\nAs a Store Customer,\nI want to download a PDF receipt of my past orders,\nSo that I can file expense reports with my accounting team.\n\nACCEPTANCE CRITERIA (Gherkin syntax):\nScenario: Successfully downloading an existing order receipt\n  Given I am logged in as a verified customer\n  When I navigate to /orders and click \"Download PDF\" on Order #104\n  Then the system generates a signed PDF receipt within 2 seconds\n  And the download begins automatically.\n\nDEFINITION OF DONE (DoD) CHECKLIST:\n[x] Unit tests written with >80% code coverage\n[x] Integration test verifies endpoint returns application/pdf\n[x] Accessibility checked: button reachable via keyboard\n[x] Code reviewed and approved by at least 1 peer engineer\n[x] Deployed and validated in Staging environment\n*/",
        "language": "markdown",
        "output": "Eliminates scope creep and provides objective verification criteria.",
        "lineExplanation": [
          "Follows industry standard Agile story structure with verifiable Gherkin acceptance criteria."
        ]
      }
    ],
    "diagram": "Scrum Sprint Lifecycle (2 Weeks):\n[ Sprint Planning ] ---> [ Daily Standup (15m sync) ] ---> [ Sprint Review (Demo) ] ---> [ Retrospective ]\n         ^                                                                                       |\n         +-------------------------------- Next Sprint ------------------------------------------+",
    "realWorldApplication": "Coordinating cross-functional engineering teams in enterprise software organizations.",
    "commonErrors": [
      {
        "error": "Marking a story as 'Done' when code is written but untested and undeployed",
        "cause": "Lacking a shared, enforced Definition of Done.",
        "fix": "Never move a ticket to Done until all items in the DoD checklist are satisfied."
      }
    ],
    "bestPractices": [
      "Keep daily standups short (under 15 minutes) focusing on: What I did, What I'm doing, Any blockers.",
      "Use Retrospectives to discuss constructive team improvements (Start, Stop, Continue).",
      "Break large user stories down into small tasks deliverable within 1-2 days."
    ],
    "practiceQuestions": [
      {
        "question": "What is the primary purpose of a Definition of Done (DoD) in Scrum?",
        "options": [
          "To assign blame for bugs.",
          "To provide a transparent, shared agreement on the exact quality and completion criteria required before a user story can be considered finished.",
          "To calculate developer salaries.",
          "To schedule holidays."
        ],
        "answerIndex": 1,
        "explanation": "The Definition of Done establishes an agreed quality checklist (testing, reviews, deployment) ensuring work meets release standards."
      }
    ],
    "revisionSummary": [
      "Scrum operates in time-boxed Sprints.",
      "User stories capture user needs with Gherkin acceptance criteria.",
      "The Definition of Done guarantees consistent delivery quality."
    ],
    "references": [
      {
        "title": "The Scrum Guide - Ken Schwaber and Jeff Sutherland",
        "url": "https://scrumguides.org/scrum-guide.html",
        "source": "ScrumGuides.org"
      }
    ]
  },
  "topic-22-2": {
    "id": "topic-22-2",
    "title": "Project Communication & Issue Tracking",
    "category": "22. Agile & Project Readiness",
    "description": "Project Communication : Status updates; raising blockers; PR descriptions; Jira/ticket management",
    "objectives": [
      "Communicate progress and technical blockers proactively in engineering standups",
      "Manage work items effectively in Jira / GitHub Projects (Backlog, In Progress, Review, Done)",
      "Write comprehensive Pull Request descriptions with testing verification steps",
      "Adopt constructive asynchronous communication habits"
    ],
    "prerequisites": "Git workflows and Scrum basics.",
    "terminology": [
      {
        "term": "Blocker (Impediment)",
        "definition": "Any technical obstacle, missing credential, or external dependency that halts a developer's progress on an assigned task."
      },
      {
        "term": "PR Description Template",
        "definition": "A standardized markdown form outlining what a pull request changes, why the change was made, and how reviewers can test it."
      }
    ],
    "concepts": [
      {
        "title": "Writing Exceptional Pull Request Descriptions",
        "explanation": "A high-quality pull request description respects your reviewers' time, speeds up review turnaround, and creates permanent architectural documentation.",
        "codeSnippet": "## Summary of Changes\n- Implemented JWT token refresh endpoint in `AuthController`.\n- Added `RefreshToken` entity and database migration in EF Core.\n- Created Angular `authInterceptor` to catch 401s and trigger silent token refresh.\n\n## Closes Issue\nCloses #JIRA-482\n\n## Testing Steps\n1. Run `dotnet test` (all 14 integration tests pass).\n2. Open Angular app, log in, and wait 15 minutes for access token expiry.\n3. Perform an API action: verify network tab displays silent POST to `/api/auth/refresh` followed by successful original request.\n\n## Screenshots / Video\n[Screenshot attached showing network tab with 200 OK refresh]",
        "language": "markdown",
        "output": "Provides clear context, verifiable testing steps, and traceability to Jira tickets.",
        "lineExplanation": [
          "Outlines changes concisely.",
          "Provides exact step-by-step verification commands for peer reviewers."
        ]
      }
    ],
    "diagram": "Ticket State Progression:\n[ Product Backlog ] ---> [ Sprint Backlog ] ---> [ In Progress ] ---> [ Code Review (PR) ] ---> [ Done ]",
    "realWorldApplication": "Professional communication standards required in all commercial software engineering environments.",
    "commonErrors": [
      {
        "error": "Staying silent on a technical blocker for three days until the sprint ends",
        "cause": "Hesitation to ask for help or raise impediments early.",
        "fix": "If blocked for more than 1-2 hours after attempting to troubleshoot, raise the blocker immediately in Slack or at daily standup."
      }
    ],
    "bestPractices": [
      "Raise blockers immediately; never wait for the next standup if it stalls delivery.",
      "Link Jira ticket numbers directly in your Git branch names and PR titles (e.g. feature/PROJ-101-auth).",
      "Include screenshots or video recordings for frontend UI changes."
    ],
    "practiceQuestions": [
      {
        "question": "When should a software engineer raise a technical blocker to their team or lead?",
        "options": [
          "At the end of the month.",
          "Immediately after exhausting standard troubleshooting (typically within 1-2 hours), rather than waiting silently.",
          "Only during performance reviews.",
          "Never."
        ],
        "answerIndex": 1,
        "explanation": "Raising blockers promptly allows leads and teammates to assist, preventing sprint delays."
      }
    ],
    "revisionSummary": [
      "Communicate blockers proactively.",
      "Write thorough PR descriptions with testing verification steps.",
      "Link commits and PRs to issue tracking tickets."
    ],
    "references": [
      {
        "title": "Writing Great Pull Requests - GitHub Blog",
        "url": "https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/",
        "source": "GitHub Blog"
      }
    ]
  },
  "topic-22-3": {
    "id": "topic-22-3",
    "title": "Code Review Culture & Best Practices",
    "category": "22. Agile & Project Readiness",
    "description": "Code Review Culture : Reviewing others' code; receiving feedback; common review comments",
    "objectives": [
      "Conduct thorough, empathetic peer code reviews",
      "Identify common code review issues (security vulnerabilities, missing error handling, untested branches)",
      "Distinguish between blocking issues and non-blocking nitpicks (using conventional comments)",
      "Receive constructive review feedback professionally without defensiveness"
    ],
    "prerequisites": "Clean code principles and Git.",
    "terminology": [
      {
        "term": "Conventional Comments",
        "definition": "A standard prefixing convention for review remarks (e.g. 'suggestion:', 'issue:', 'nitpick:', 'question:') that clarifies intent and severity."
      },
      {
        "term": "Ego-less Programming",
        "definition": "A mindset where developers separate their personal identity from the code they write, welcoming constructive critique."
      }
    ],
    "concepts": [
      {
        "title": "Constructive Code Reviewing with Conventional Comments",
        "explanation": "Using structured comment prefixes prevents misunderstandings and differentiates mandatory fixes from optional stylistic suggestions.",
        "codeSnippet": "// Conventional Code Review Comment Examples:\n\n// 1. Mandatory Bug / Security (Blocking):\n// \"issue (security): This SQL query concatenates user input directly.\n// Please parameterize this using command.Parameters.AddWithValue() to prevent SQL injection.\"\n\n// 2. Performance Suggestion (Non-blocking):\n// \"suggestion (performance): Since this is a read-only query in a GET endpoint, \n// adding .AsNoTracking() would avoid change tracker overhead.\"\n\n// 3. Minor Style (Nitpick - completely optional):\n// \"nitpick: Consider renaming 'c' to 'customer' for clearer readability.\"\n\n// 4. Compliment:\n// \"praise: Beautiful use of the modern switch expression here! Very clean.\"",
        "language": "csharp",
        "output": "Builds a psychologically safe, high-quality engineering review culture.",
        "lineExplanation": [
          "Prefixed comments immediately communicate severity so authors know what is required vs optional."
        ]
      }
    ],
    "diagram": "Code Review Feedback Loop:\n[ Author opens PR ] ---> [ Reviewer inspects diff with Conventional Comments ]\n                                   |\n                     +-------------+-------------+\n                     |                           |\n            (Blocking Issue)             (Approved / LGTM)\n                     |                           |\n            [ Author updates PR ]       [ Merged into main! ]",
    "realWorldApplication": "The primary quality gate and knowledge-sharing mechanism in professional software engineering teams.",
    "commonErrors": [
      {
        "error": "Taking code review feedback as a personal attack",
        "cause": "Conflating code critiques with personal competency.",
        "fix": "Remember: reviews evaluate the code, not the person. Treat feedback as an opportunity to learn and improve."
      }
    ],
    "bestPractices": [
      "Use conventional comment prefixes (issue, suggestion, nitpick, praise).",
      "Review pull requests within 24 hours to avoid blocking teammates.",
      "Praise great solutions; code review is for mentorship as well as verification."
    ],
    "practiceQuestions": [
      {
        "question": "What is the benefit of prefixing code review comments with labels like 'suggestion:' or 'nitpick:'?",
        "options": [
          "It confuses the author.",
          "It explicitly clarifies the intent and severity, letting the author know whether a comment is a mandatory fix or an optional suggestion.",
          "It deletes the code.",
          "It compiles the PR."
        ],
        "answerIndex": 1,
        "explanation": "Labeling comments clarifies whether feedback is a mandatory blocking issue or an optional stylistic preference, preventing review frustration."
      }
    ],
    "revisionSummary": [
      "Code reviews preserve quality and share knowledge.",
      "Use conventional comments to clarify severity.",
      "Embrace ego-less programming and celebrate clean solutions."
    ],
    "references": [
      {
        "title": "Conventional Comments Specification",
        "url": "https://conventionalcomments.org/",
        "source": "ConventionalComments.org"
      }
    ]
  },
  "topic-22-4": {
    "id": "topic-22-4",
    "title": "Assessment 5: Final Comprehensive Assessment",
    "category": "22. Agile & Project Readiness",
    "description": "Assessment 5: Final Assessment : All topics included comprehensive assessment",
    "objectives": [
      "Synthesize all 22 modules into a comprehensive full-stack engineering review",
      "Demonstrate end-to-end fluency from database modeling to cloud deployment",
      "Evaluate readiness for commercial full-stack enterprise development",
      "Complete the comprehensive multi-topic diagnostic evaluation"
    ],
    "prerequisites": "Modules 1 through 22.",
    "terminology": [
      {
        "term": "Comprehensive Final Assessment",
        "definition": "A multi-disciplinary examination validating complete end-to-end technical mastery across the entire .NET Full Stack curriculum."
      }
    ],
    "concepts": [
      {
        "title": "Full-Stack System Architecture Blueprint",
        "explanation": "A complete mental model demonstrating how all curriculum technologies integrate into a production enterprise application.",
        "codeSnippet": "/* FULL-STACK ENTERPRISE ARCHITECTURE:\n- Database: SQL Server normalized schema with clustered & covering indexes (Module 5)\n- Backend: ASP.NET Core 8 Web API with EF Core, FluentValidation, ProblemDetails (Module 6)\n- Security: JWT Authentication with refresh tokens and policy authorization (Module 7)\n- Quality: xUnit unit tests with Moq and WebApplicationFactory integration tests (Module 8)\n- Observability: Serilog structured logging with Correlation IDs (Module 9)\n- Architecture: Clean Architecture with SOLID, Repository, and MediatR (Module 10)\n- Frontend: Angular 17+ standalone components, Signals, Reactive Forms (Module 14)\n- Full-Stack Sync: Functional HTTP interceptor, proxy, and error mapping (Module 16)\n- Deployment: Multi-stage Docker container, GitHub Actions CI/CD, and Kubernetes (Module 18)\n*/",
        "language": "csharp",
        "output": "Production-ready full-stack enterprise development blueprint.",
        "lineExplanation": [
          "Represents the holistic integration of all 22 course modules into a unified engineering skill set."
        ]
      }
    ],
    "diagram": "Complete Full-Stack Architecture:\n[ Angular Frontend ] ---> [ YARP API Gateway ] ---> [ ASP.NET Core Web API ]\n                                                               |\n                                          +--------------------+--------------------+\n                                          |                                         |\n                                          v                                         v\n                             [ SQL Server Database ]                   [ RabbitMQ Message Bus ]",
    "realWorldApplication": "Architecting, building, and deploying commercial enterprise web applications from scratch.",
    "commonErrors": [
      {
        "error": "Treating frontend and backend as isolated silos",
        "cause": "Failing to coordinate error contracts, validation formats, and security tokens.",
        "fix": "Always design from the data contract (API DTO) outwards."
      }
    ],
    "bestPractices": [
      "Design data models carefully before writing UI or backend code.",
      "Automate testing at every layer (unit, integration, frontend).",
      "Enforce security at the database, API, and network layers."
    ],
    "practiceQuestions": [
      {
        "question": "In a production .NET Full Stack application, which layer is responsible for being the ultimate authority on business rules and data validation?",
        "options": [
          "The Angular frontend form.",
          "The backend domain services and database constraints.",
          "The browser localStorage.",
          "The DNS server."
        ],
        "answerIndex": 1,
        "explanation": "Frontend validation exists for user experience, but the backend domain and database are the ultimate security authority."
      }
    ],
    "revisionSummary": [
      "Integrates C#, .NET, SQL, Angular, Docker, and Cloud architectures.",
      "Validates full-stack development readiness."
    ],
    "references": [
      {
        "title": "Microsoft .NET Application Architecture Guides",
        "url": "https://dotnet.microsoft.com/en-us/learn/dotnet/architecture-guides",
        "source": "Microsoft Learn"
      }
    ]
  }
};
