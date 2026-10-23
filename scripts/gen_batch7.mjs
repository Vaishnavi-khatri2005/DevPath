import fs from 'fs';

function writeModule(filename, varName, lessons) {
  const content = `/**
 * Pre-generated comprehensive lessons for ${varName}
 * Sources: Industry Best Practices, Agile Alliance, Full-Stack Architecture Guides.
 */

export const ${varName} = ${JSON.stringify(lessons, null, 2)};
`;
  fs.writeFileSync(`src/data/lessons/${filename}`, content);
  console.log(`Generated src/data/lessons/${filename} (${Object.keys(lessons).length} topics)`);
}

// -------------------------------------------------------------
// MODULE 21: AI-Augmented Development (3 topics)
// -------------------------------------------------------------
const m21 = {
  "topic-21-1": {
    id: "topic-21-1",
    title: "GenAI Fundamentals & Ethics in Software",
    category: "21. AI-Augmented Development",
    description: "GenAI Fundamentals & Ethics : LLMs, NLP basics; GenAI in SDLC; AI vs Agents vs Agentic AI; responsible AI; secure prompting",
    objectives: [
      "Understand Large Language Model (LLM) architectures, tokens, and probabilistic text generation",
      "Differentiate between standalone AI models, tool-calling agents, and autonomous multi-agent systems",
      "Apply Responsible AI practices: data privacy, zero-data-retention, and copyright compliance",
      "Implement Secure Prompting techniques to prevent prompt injection and data exfiltration"
    ],
    prerequisites: "General software development experience.",
    terminology: [
      { term: "LLM (Large Language Model)", definition: "A deep learning neural network trained on vast text corpora to predict tokens and generate natural language or source code." },
      { term: "Agentic AI", definition: "An AI system that exhibits agency: reasoning through multi-step plans, using external tools (terminals, web search, compilers), and verifying its own output iteratively." },
      { term: "Prompt Injection", definition: "A security attack where untrusted user input manipulates the LLM into ignoring previous system instructions and performing unauthorized actions." }
    ],
    concepts: [
      {
        title: "Agentic AI Workflows and Secure Prompting",
        explanation: "Agentic AI systems go beyond simple autocomplete by combining reasoning loops with tool access to execute complex end-to-end coding tasks.",
        codeSnippet: `// Agentic Loop Conceptual Flow:
// 1. Goal: "Add input validation to the Customer Registration endpoint."
// 2. Think: "I need to inspect CustomerDto.cs and register a FluentValidator."
// 3. Tool Call: view_file("src/Core/DTOs/CustomerDto.cs")
// 4. Tool Call: write_to_file("src/Core/Validators/CustomerValidator.cs")
// 5. Tool Call: run_command("dotnet test")
// 6. Verify: Tests pass with 0 warnings -> Present completed diff to user!`,
        language: "csharp",
        output: "Autonomous agent cycles through Think -> Act -> Verify until goal is achieved.",
        lineExplanation: [
          "Demonstrates the agentic cycle combining reasoning with compiler and tool feedback."
        ]
      }
    ],
    diagram: `Evolution of AI in Development:
1. Autocomplete (GitHub Copilot tab-completion)
         |
         v
2. Conversational Chat (Asking questions, generating code snippets)
         |
         v
3. Agentic AI (Multi-file refactoring, running terminal commands, self-debugging)`,
    realWorldApplication: "Leveraging agentic coding workflows to automate migrations, refactor legacy codebases, and generate integration test suites.",
    commonErrors: [
      {
        error: "Pasting production customer data or corporate API keys into public AI prompts",
        cause: "Leads to severe data privacy breaches (GDPR, HIPAA) and exposed credentials.",
        fix: "Never feed sensitive production secrets or PII into public LLM interfaces."
      }
    ],
    bestPractices: [
      "Use enterprise LLM tiers with explicit Zero Data Retention (ZDR) agreements.",
      "Sanitize inputs before passing user-generated strings to LLM agents.",
      "Always have human engineers review and approve agent-authored code commits."
    ],
    practiceQuestions: [
      {
        question: "What differentiates an Agentic AI system from basic LLM autocomplete?",
        options: [
          "Agentic AI only speaks English.",
          "Agentic AI possesses agency: it can formulate multi-step plans, invoke tools (compilers, file readers, shells), and verify its own results in a feedback loop.",
          "Agentic AI does not use neural networks.",
          "There is no difference."
        ],
        answerIndex: 1,
        explanation: "Agentic AI combines reasoning with tool execution (reading files, executing tests) to accomplish complex goals autonomously."
      }
    ],
    revisionSummary: [
      "LLMs generate code probabilistically.",
      "Agentic AI combines reasoning with tool calling.",
      "Practice responsible AI with secure prompting and privacy protection."
    ],
    references: [
      { title: "Responsible AI Principles - Microsoft", url: "https://www.microsoft.com/en-us/ai/principles-and-approach", source: "Microsoft AI" }
    ]
  },

  "topic-21-2": {
    id: "topic-21-2",
    title: "Prompt Engineering for Developers",
    category: "21. AI-Augmented Development",
    description: "Prompt Engineering : Techniques (few-shot, persona, chain-of-thought); being specific; iterative refinement; context management",
    objectives: [
      "Master foundational prompting patterns: Persona, Few-Shot, and Chain-of-Thought (CoT)",
      "Manage LLM context windows efficiently by providing relevant code snippets and schemas",
      "Employ iterative refinement to evolve rough drafts into production-ready software",
      "Prevent hallucinations by constraining output formats and version standards"
    ],
    prerequisites: "General programming experience.",
    terminology: [
      { term: "Few-Shot Prompting", definition: "Providing one or more explicit examples of inputs and desired outputs in the prompt to guide the model's pattern matching." },
      { term: "Chain-of-Thought (CoT)", definition: "Directing the model to break down complex reasoning step-by-step before producing final code." },
      { term: "Context Window Management", definition: "Curating only the most relevant files, interfaces, and constraints to stay within the model's optimal attention span." }
    ],
    concepts: [
      {
        title: "The PERFECT Prompting Framework for Engineers",
        explanation: "High-quality engineering prompts provide Persona, Context, Task, Constraints, Examples, and Expected Output Format.",
        codeSnippet: `/* PROFESSIONAL PROMPT TEMPLATE:
[PERSONA]: You are a Principal .NET 8 and Angular architect.
[CONTEXT]: I have an ASP.NET Core Web API with EF Core using SQL Server.
[TASK]: Write an xUnit integration test for POST /api/orders.
[CONSTRAINTS]:
- Use WebApplicationFactory<Program>
- Use FluentAssertions
- Test must verify that 400 ValidationProblemDetails is returned when TotalAmount is negative.
- Do NOT use Moq; use the in-memory test server directly.
[FORMAT]: Provide clean C# code without placeholder comments.
*/`,
        language: "csharp",
        output: "Produces exact, production-ready xUnit test matching architectural constraints on the first attempt.",
        lineExplanation: [
          "Defining persona, exact framework versions, and explicit negative constraints eliminates 95% of common AI hallucinations."
        ]
      }
    ],
    diagram: `Prompt Engineering Pipeline:
[ Vague Prompt: "Write an API" ] ---> Returns generic, outdated, or buggy code
                 vs
[ Persona + Version (.NET 8) + Constraints + Examples ] ---> Produces production-ready, clean code!`,
    realWorldApplication: "Dramatically increasing development velocity by generating accurate code on the first prompt rather than wasting time on repeated iterations.",
    commonErrors: [
      {
        error: "Writing brief, underspecified prompts (e.g. 'Fix my code')",
        cause: "Forces the model to guess your language version, libraries, and architectural conventions.",
        fix: "Provide context: include compiler error messages, relevant interfaces, and target framework versions."
      }
    ],
    bestPractices: [
      "Always state the exact target framework version (e.g. '.NET 8', 'Angular 17').",
      "Use Chain-of-Thought: ask the model to 'Explain your plan first before writing code'.",
      "Provide few-shot input/output examples when formatting JSON or regular expressions."
    ],
    practiceQuestions: [
      {
        question: "What is Few-Shot prompting in AI engineering?",
        options: [
          "Asking the AI multiple questions at once.",
          "Supplying one or more representative examples of input and expected output directly inside the prompt.",
          "Running the prompt on a GPU.",
          "Using short prompts under 5 words."
        ],
        answerIndex: 1,
        explanation: "Few-shot prompting provides sample input-output pairs in the prompt to condition the model on the exact pattern desired."
      }
    ],
    revisionSummary: [
      "Specify Persona, Context, Constraints, and Target Versions.",
      "Use Chain-of-Thought for complex architectural problems.",
      "Few-shot examples guide output formatting and regexes."
    ],
    references: [
      { title: "Prompt Engineering Guide - DAIR.AI", url: "https://www.promptingguide.ai/", source: "PromptingGuide.ai" }
    ]
  },

  "topic-21-3": {
    id: "topic-21-3",
    title: "GitHub Copilot Advanced Techniques",
    category: "21. AI-Augmented Development",
    description: "GitHub Copilot — Advanced : Copilot Chat modes; coding agents; Copilot code review",
    objectives: [
      "Master Copilot Chat modes (Inline Chat Ctrl+I, Chat Panel Ctrl+Alt+I, Quick Chat)",
      "Direct Copilot for automated Pull Request summaries and code reviews",
      "Configure project-level custom instructions using .github/copilot-instructions.md",
      "Leverage terminal integration to construct shell scripts and Docker commands"
    ],
    prerequisites: "VS Code Tooling and Git.",
    terminology: [
      { term: "copilot-instructions.md", definition: "A project-level markdown file in .github/ that instructs Copilot on team coding standards, architectures, and naming conventions." },
      { term: "Inline Chat", definition: "Invoking Copilot directly at the editor cursor (Ctrl+I) to refactor, document, or generate code in place." }
    ],
    concepts: [
      {
        title: "Custom Repository Instructions for Copilot",
        explanation: "You can permanently train Copilot on your team's engineering standards by adding a .github/copilot-instructions.md file to your repository.",
        codeSnippet: `# .github/copilot-instructions.md
# Team Engineering Guidelines for Copilot

- Always use .NET 8 and C# 12 features (Primary constructors, collection expressions).
- Always use Angular 17+ standalone components and modern control flow (@if, @for).
- Always wrap database read queries with .AsNoTracking().
- For API responses, always use RFC 7807 ProblemDetails format.
- In unit tests, use xUnit with FluentAssertions and follow the AAA pattern.`,
        language: "markdown",
        output: "Copilot automatically adopts these conventions for all team members opening the repository.",
        lineExplanation: [
          "Eliminates repetitive prompting by permanently conditioning Copilot on team architectural conventions."
        ]
      }
    ],
    diagram: `Copilot Workspace Integration:
[ Developer in VS Code ]
           |
  (Invokes Copilot Chat / Inline)
           |
  [ Reads .github/copilot-instructions.md ]
           |
  [ Adheres to Team Conventions (.NET 8, OnPush, ProblemDetails) ]`,
    realWorldApplication: "Enforcing uniform coding standards and architectural consistency across engineering teams.",
    commonErrors: [
      {
        error: "Accepting multi-line inline suggestions without reading them line by line",
        cause: "Leads to subtle logical bugs or deprecated library calls slipping into code.",
        fix: "Treat every tab completion as a draft to be verified before committing."
      }
    ],
    bestPractices: [
      "Commit a .github/copilot-instructions.md in every repository root.",
      "Use Inline Chat (Ctrl+I) for targeted single-method refactoring.",
      "Use Copilot to generate initial Pull Request descriptions on GitHub."
    ],
    practiceQuestions: [
      {
        question: "Where can you place a configuration file to permanently enforce team coding standards for GitHub Copilot across a repository?",
        options: [
          "In the Windows registry.",
          "In .github/copilot-instructions.md",
          "In package.json",
          "In a private git branch."
        ],
        answerIndex: 1,
        explanation: ".github/copilot-instructions.md automatically instructs GitHub Copilot Chat on project-specific patterns, frameworks, and rules."
      }
    ],
    revisionSummary: [
      "Use inline chat (Ctrl+I) and chat panels (Ctrl+Alt+I).",
      ".github/copilot-instructions.md sets team-wide standards.",
      "Use Copilot to accelerate PR reviews and test generation."
    ],
    references: [
      { title: "Configuring GitHub Copilot in your repository", url: "https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot", source: "GitHub Docs" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 22: Agile & Project Readiness (4 topics)
// -------------------------------------------------------------
const m22 = {
  "topic-22-1": {
    id: "topic-22-1",
    title: "Agile & Scrum Fundamentals",
    category: "22. Agile & Project Readiness",
    description: "Agile/Scrum Basics : Sprints, standups, retrospectives; user stories; estimation; Definition of Done",
    objectives: [
      "Understand the Agile Manifesto values and principles",
      "Navigate Scrum ceremonies: Sprint Planning, Daily Standup, Sprint Review, and Retrospective",
      "Author clear User Stories using the standard format: As a [user], I want [feature], so that [benefit]",
      "Define and enforce an objective Definition of Done (DoD)"
    ],
    prerequisites: "General software development teamwork concepts.",
    terminology: [
      { term: "Sprint", definition: "A time-boxed iteration (typically 2 weeks) during which a development team creates a potentially releasable product increment." },
      { term: "Definition of Done (DoD)", definition: "An agreed checklist of criteria (code written, unit tests pass, PR reviewed, deployed to staging) that must be met before a story is marked complete." },
      { term: "Story Points", definition: "An abstract relative unit of measure used by agile teams to estimate the effort, complexity, and risk of implementing a user story." }
    ],
    concepts: [
      {
        title: "User Stories and the Definition of Done",
        explanation: "Clear user stories with explicit acceptance criteria eliminate ambiguity between product managers and engineers.",
        codeSnippet: `/* USER STORY: Order History Export
As a Store Customer,
I want to download a PDF receipt of my past orders,
So that I can file expense reports with my accounting team.

ACCEPTANCE CRITERIA (Gherkin syntax):
Scenario: Successfully downloading an existing order receipt
  Given I am logged in as a verified customer
  When I navigate to /orders and click "Download PDF" on Order #104
  Then the system generates a signed PDF receipt within 2 seconds
  And the download begins automatically.

DEFINITION OF DONE (DoD) CHECKLIST:
[x] Unit tests written with >80% code coverage
[x] Integration test verifies endpoint returns application/pdf
[x] Accessibility checked: button reachable via keyboard
[x] Code reviewed and approved by at least 1 peer engineer
[x] Deployed and validated in Staging environment
*/`,
        language: "markdown",
        output: "Eliminates scope creep and provides objective verification criteria.",
        lineExplanation: [
          "Follows industry standard Agile story structure with verifiable Gherkin acceptance criteria."
        ]
      }
    ],
    diagram: `Scrum Sprint Lifecycle (2 Weeks):
[ Sprint Planning ] ---> [ Daily Standup (15m sync) ] ---> [ Sprint Review (Demo) ] ---> [ Retrospective ]
         ^                                                                                       |
         +-------------------------------- Next Sprint ------------------------------------------+`,
    realWorldApplication: "Coordinating cross-functional engineering teams in enterprise software organizations.",
    commonErrors: [
      {
        error: "Marking a story as 'Done' when code is written but untested and undeployed",
        cause: "Lacking a shared, enforced Definition of Done.",
        fix: "Never move a ticket to Done until all items in the DoD checklist are satisfied."
      }
    ],
    bestPractices: [
      "Keep daily standups short (under 15 minutes) focusing on: What I did, What I'm doing, Any blockers.",
      "Use Retrospectives to discuss constructive team improvements (Start, Stop, Continue).",
      "Break large user stories down into small tasks deliverable within 1-2 days."
    ],
    practiceQuestions: [
      {
        question: "What is the primary purpose of a Definition of Done (DoD) in Scrum?",
        options: [
          "To assign blame for bugs.",
          "To provide a transparent, shared agreement on the exact quality and completion criteria required before a user story can be considered finished.",
          "To calculate developer salaries.",
          "To schedule holidays."
        ],
        answerIndex: 1,
        explanation: "The Definition of Done establishes an agreed quality checklist (testing, reviews, deployment) ensuring work meets release standards."
      }
    ],
    revisionSummary: [
      "Scrum operates in time-boxed Sprints.",
      "User stories capture user needs with Gherkin acceptance criteria.",
      "The Definition of Done guarantees consistent delivery quality."
    ],
    references: [
      { title: "The Scrum Guide - Ken Schwaber and Jeff Sutherland", url: "https://scrumguides.org/scrum-guide.html", source: "ScrumGuides.org" }
    ]
  },

  "topic-22-2": {
    id: "topic-22-2",
    title: "Project Communication & Issue Tracking",
    category: "22. Agile & Project Readiness",
    description: "Project Communication : Status updates; raising blockers; PR descriptions; Jira/ticket management",
    objectives: [
      "Communicate progress and technical blockers proactively in engineering standups",
      "Manage work items effectively in Jira / GitHub Projects (Backlog, In Progress, Review, Done)",
      "Write comprehensive Pull Request descriptions with testing verification steps",
      "Adopt constructive asynchronous communication habits"
    ],
    prerequisites: "Git workflows and Scrum basics.",
    terminology: [
      { term: "Blocker (Impediment)", definition: "Any technical obstacle, missing credential, or external dependency that halts a developer's progress on an assigned task." },
      { term: "PR Description Template", definition: "A standardized markdown form outlining what a pull request changes, why the change was made, and how reviewers can test it." }
    ],
    concepts: [
      {
        title: "Writing Exceptional Pull Request Descriptions",
        explanation: "A high-quality pull request description respects your reviewers' time, speeds up review turnaround, and creates permanent architectural documentation.",
        codeSnippet: `## Summary of Changes
- Implemented JWT token refresh endpoint in \`AuthController\`.
- Added \`RefreshToken\` entity and database migration in EF Core.
- Created Angular \`authInterceptor\` to catch 401s and trigger silent token refresh.

## Closes Issue
Closes #JIRA-482

## Testing Steps
1. Run \`dotnet test\` (all 14 integration tests pass).
2. Open Angular app, log in, and wait 15 minutes for access token expiry.
3. Perform an API action: verify network tab displays silent POST to \`/api/auth/refresh\` followed by successful original request.

## Screenshots / Video
[Screenshot attached showing network tab with 200 OK refresh]`,
        language: "markdown",
        output: "Provides clear context, verifiable testing steps, and traceability to Jira tickets.",
        lineExplanation: [
          "Outlines changes concisely.",
          "Provides exact step-by-step verification commands for peer reviewers."
        ]
      }
    ],
    diagram: `Ticket State Progression:
[ Product Backlog ] ---> [ Sprint Backlog ] ---> [ In Progress ] ---> [ Code Review (PR) ] ---> [ Done ]`,
    realWorldApplication: "Professional communication standards required in all commercial software engineering environments.",
    commonErrors: [
      {
        error: "Staying silent on a technical blocker for three days until the sprint ends",
        cause: "Hesitation to ask for help or raise impediments early.",
        fix: "If blocked for more than 1-2 hours after attempting to troubleshoot, raise the blocker immediately in Slack or at daily standup."
      }
    ],
    bestPractices: [
      "Raise blockers immediately; never wait for the next standup if it stalls delivery.",
      "Link Jira ticket numbers directly in your Git branch names and PR titles (e.g. feature/PROJ-101-auth).",
      "Include screenshots or video recordings for frontend UI changes."
    ],
    practiceQuestions: [
      {
        question: "When should a software engineer raise a technical blocker to their team or lead?",
        options: [
          "At the end of the month.",
          "Immediately after exhausting standard troubleshooting (typically within 1-2 hours), rather than waiting silently.",
          "Only during performance reviews.",
          "Never."
        ],
        answerIndex: 1,
        explanation: "Raising blockers promptly allows leads and teammates to assist, preventing sprint delays."
      }
    ],
    revisionSummary: [
      "Communicate blockers proactively.",
      "Write thorough PR descriptions with testing verification steps.",
      "Link commits and PRs to issue tracking tickets."
    ],
    references: [
      { title: "Writing Great Pull Requests - GitHub Blog", url: "https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/", source: "GitHub Blog" }
    ]
  },

  "topic-22-3": {
    id: "topic-22-3",
    title: "Code Review Culture & Best Practices",
    category: "22. Agile & Project Readiness",
    description: "Code Review Culture : Reviewing others' code; receiving feedback; common review comments",
    objectives: [
      "Conduct thorough, empathetic peer code reviews",
      "Identify common code review issues (security vulnerabilities, missing error handling, untested branches)",
      "Distinguish between blocking issues and non-blocking nitpicks (using conventional comments)",
      "Receive constructive review feedback professionally without defensiveness"
    ],
    prerequisites: "Clean code principles and Git.",
    terminology: [
      { term: "Conventional Comments", definition: "A standard prefixing convention for review remarks (e.g. 'suggestion:', 'issue:', 'nitpick:', 'question:') that clarifies intent and severity." },
      { term: "Ego-less Programming", definition: "A mindset where developers separate their personal identity from the code they write, welcoming constructive critique." }
    ],
    concepts: [
      {
        title: "Constructive Code Reviewing with Conventional Comments",
        explanation: "Using structured comment prefixes prevents misunderstandings and differentiates mandatory fixes from optional stylistic suggestions.",
        codeSnippet: `// Conventional Code Review Comment Examples:

// 1. Mandatory Bug / Security (Blocking):
// "issue (security): This SQL query concatenates user input directly.
// Please parameterize this using command.Parameters.AddWithValue() to prevent SQL injection."

// 2. Performance Suggestion (Non-blocking):
// "suggestion (performance): Since this is a read-only query in a GET endpoint, 
// adding .AsNoTracking() would avoid change tracker overhead."

// 3. Minor Style (Nitpick - completely optional):
// "nitpick: Consider renaming 'c' to 'customer' for clearer readability."

// 4. Compliment:
// "praise: Beautiful use of the modern switch expression here! Very clean."`,
        language: "csharp",
        output: "Builds a psychologically safe, high-quality engineering review culture.",
        lineExplanation: [
          "Prefixed comments immediately communicate severity so authors know what is required vs optional."
        ]
      }
    ],
    diagram: `Code Review Feedback Loop:
[ Author opens PR ] ---> [ Reviewer inspects diff with Conventional Comments ]
                                   |
                     +-------------+-------------+
                     |                           |
            (Blocking Issue)             (Approved / LGTM)
                     |                           |
            [ Author updates PR ]       [ Merged into main! ]`,
    realWorldApplication: "The primary quality gate and knowledge-sharing mechanism in professional software engineering teams.",
    commonErrors: [
      {
        error: "Taking code review feedback as a personal attack",
        cause: "Conflating code critiques with personal competency.",
        fix: "Remember: reviews evaluate the code, not the person. Treat feedback as an opportunity to learn and improve."
      }
    ],
    bestPractices: [
      "Use conventional comment prefixes (issue, suggestion, nitpick, praise).",
      "Review pull requests within 24 hours to avoid blocking teammates.",
      "Praise great solutions; code review is for mentorship as well as verification."
    ],
    practiceQuestions: [
      {
        question: "What is the benefit of prefixing code review comments with labels like 'suggestion:' or 'nitpick:'?",
        options: [
          "It confuses the author.",
          "It explicitly clarifies the intent and severity, letting the author know whether a comment is a mandatory fix or an optional suggestion.",
          "It deletes the code.",
          "It compiles the PR."
        ],
        answerIndex: 1,
        explanation: "Labeling comments clarifies whether feedback is a mandatory blocking issue or an optional stylistic preference, preventing review frustration."
      }
    ],
    revisionSummary: [
      "Code reviews preserve quality and share knowledge.",
      "Use conventional comments to clarify severity.",
      "Embrace ego-less programming and celebrate clean solutions."
    ],
    references: [
      { title: "Conventional Comments Specification", url: "https://conventionalcomments.org/", source: "ConventionalComments.org" }
    ]
  },

  "topic-22-4": {
    id: "topic-22-4",
    title: "Assessment 5: Final Comprehensive Assessment",
    category: "22. Agile & Project Readiness",
    description: "Assessment 5: Final Assessment : All topics included comprehensive assessment",
    objectives: [
      "Synthesize all 22 modules into a comprehensive full-stack engineering review",
      "Demonstrate end-to-end fluency from database modeling to cloud deployment",
      "Evaluate readiness for commercial full-stack enterprise development",
      "Complete the comprehensive multi-topic diagnostic evaluation"
    ],
    prerequisites: "Modules 1 through 22.",
    terminology: [
      { term: "Comprehensive Final Assessment", definition: "A multi-disciplinary examination validating complete end-to-end technical mastery across the entire .NET Full Stack curriculum." }
    ],
    concepts: [
      {
        title: "Full-Stack System Architecture Blueprint",
        explanation: "A complete mental model demonstrating how all curriculum technologies integrate into a production enterprise application.",
        codeSnippet: `/* FULL-STACK ENTERPRISE ARCHITECTURE:
- Database: SQL Server normalized schema with clustered & covering indexes (Module 5)
- Backend: ASP.NET Core 8 Web API with EF Core, FluentValidation, ProblemDetails (Module 6)
- Security: JWT Authentication with refresh tokens and policy authorization (Module 7)
- Quality: xUnit unit tests with Moq and WebApplicationFactory integration tests (Module 8)
- Observability: Serilog structured logging with Correlation IDs (Module 9)
- Architecture: Clean Architecture with SOLID, Repository, and MediatR (Module 10)
- Frontend: Angular 17+ standalone components, Signals, Reactive Forms (Module 14)
- Full-Stack Sync: Functional HTTP interceptor, proxy, and error mapping (Module 16)
- Deployment: Multi-stage Docker container, GitHub Actions CI/CD, and Kubernetes (Module 18)
*/`,
        language: "csharp",
        output: "Production-ready full-stack enterprise development blueprint.",
        lineExplanation: [
          "Represents the holistic integration of all 22 course modules into a unified engineering skill set."
        ]
      }
    ],
    diagram: `Complete Full-Stack Architecture:
[ Angular Frontend ] ---> [ YARP API Gateway ] ---> [ ASP.NET Core Web API ]
                                                               |
                                          +--------------------+--------------------+
                                          |                                         |
                                          v                                         v
                             [ SQL Server Database ]                   [ RabbitMQ Message Bus ]`,
    realWorldApplication: "Architecting, building, and deploying commercial enterprise web applications from scratch.",
    commonErrors: [
      {
        error: "Treating frontend and backend as isolated silos",
        cause: "Failing to coordinate error contracts, validation formats, and security tokens.",
        fix: "Always design from the data contract (API DTO) outwards."
      }
    ],
    bestPractices: [
      "Design data models carefully before writing UI or backend code.",
      "Automate testing at every layer (unit, integration, frontend).",
      "Enforce security at the database, API, and network layers."
    ],
    practiceQuestions: [
      {
        question: "In a production .NET Full Stack application, which layer is responsible for being the ultimate authority on business rules and data validation?",
        options: [
          "The Angular frontend form.",
          "The backend domain services and database constraints.",
          "The browser localStorage.",
          "The DNS server."
        ],
        answerIndex: 1,
        explanation: "Frontend validation exists for user experience, but the backend domain and database are the ultimate security authority."
      }
    ],
    revisionSummary: [
      "Integrates C#, .NET, SQL, Angular, Docker, and Cloud architectures.",
      "Validates full-stack development readiness."
    ],
    references: [
      { title: "Microsoft .NET Application Architecture Guides", url: "https://dotnet.microsoft.com/en-us/learn/dotnet/architecture-guides", source: "Microsoft Learn" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 23: Full-Stack Capstone Project (3 topics)
// -------------------------------------------------------------
const m23 = {
  "topic-23-1": {
    id: "topic-23-1",
    title: "Capstone Project Specifications",
    category: "23. Full-Stack Capstone Project",
    description: "Project : At the end of the training, complete the assigned capstone project by applying all learned concepts to build and demonstrate a working solution",
    objectives: [
      "Review the comprehensive capstone project requirements and business scenario",
      "Design a complete multi-tier enterprise solution (Angular SPA + ASP.NET Core Web API + SQL Server)",
      "Establish milestone deliverables across sprint iterations",
      "Configure project repository, solution structure, and development environments"
    ],
    prerequisites: "Modules 1 through 22.",
    terminology: [
      { term: "Capstone Project", definition: "A comprehensive real-world project that demonstrates mastery by building an end-to-end commercial software solution from scratch." }
    ],
    concepts: [
      {
        title: "Enterprise Capstone Business Scenario",
        explanation: "Build a production-grade full-stack platform (e.g. Healthcare Appointment Portal, Logistics Tracker, or Corporate LMS) implementing every layer of the curriculum.",
        codeSnippet: `/* CAPSTONE TECHNICAL SPECIFICATIONS:
1. BACKEND (.NET 8 Web API):
   - Secure REST API with JWT Auth and Role Authorization (Admin, User)
   - Entity Framework Core with SQL Server (1:N and N:M relationships)
   - FluentValidation and global RFC 7807 ProblemDetails
   - Serilog structured logging with Correlation ID tracking
   - Automated xUnit test suite (Unit + Integration tests)

2. FRONTEND (Angular 17+):
   - Standalone components with modern control flow (@if, @for)
   - Angular Signals for reactive UI state
   - Reactive Forms with live validation feedback
   - Functional HTTP Interceptor for automatic JWT token injection
   - Responsive dark/light theme stylesheet

3. DEVOPS & INFRASTRUCTURE:
   - Multi-stage Dockerfile for containerization
   - GitHub Actions CI pipeline executing tests on PR
   - Docker Compose for local multi-container development
*/`,
        language: "csharp",
        output: "Complete architectural blueprint for production-grade full-stack capstone delivery.",
        lineExplanation: [
          "Defines explicit, measurable deliverables across backend, frontend, database, and DevOps."
        ]
      }
    ],
    diagram: `Capstone System Delivery:
[ Angular Frontend ] <--- HTTPS / JWT ---> [ ASP.NET Core API ] <--- EF Core ---> [ SQL Database ]
         ^                                           ^
         |                                           |
   [ Jasmine Tests ]                           [ xUnit Tests ]
         \\                                           /
          +-----> [ GitHub Actions CI Pipeline ] <---+`,
    realWorldApplication: "Demonstrates job-ready full-stack software engineering capability for commercial enterprise roles.",
    commonErrors: [
      {
        error: "Starting UI development before designing the database schema and API contracts",
        cause: "Leads to frequent rework and mismatched data models.",
        fix: "Design the database schema and API DTO contracts first, then build out backend and frontend."
      }
    ],
    bestPractices: [
      "Plan in two-week sprint increments with clear milestone goals.",
      "Commit code daily with semantic commit messages.",
      "Keep automated tests running green throughout development."
    ],
    practiceQuestions: [
      {
        question: "What is the recommended first step when starting a large full-stack capstone project?",
        options: [
          "Write HTML animations.",
          "Design the domain models, database schema, and API contracts.",
          "Deploy to Kubernetes immediately.",
          "Configure production billing."
        ],
        answerIndex: 1,
        explanation: "Establishing clean domain models and API contracts first creates a solid foundation, preventing costly rewrites later."
      }
    ],
    revisionSummary: [
      "The Capstone project integrates all 23 course modules.",
      "Delivers a working Angular + ASP.NET Core + SQL Server system.",
      "Follows professional enterprise engineering standards."
    ],
    references: [
      { title: "Enterprise Full Stack Architecture - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/", source: "Microsoft Learn" }
    ]
  },

  "topic-23-2": {
    id: "topic-23-2",
    title: "Evaluation Rubric & Quality Gates",
    category: "23. Full-Stack Capstone Project",
    description: "Evaluation criteria : The project will be evaluated using defined rubrics covering input validation, exception handling, logging, security, and adherence to coding best practices",
    objectives: [
      "Understand the five evaluation dimensions: Architecture, Security, Quality, Performance, and UX",
      "Satisfy input validation requirements across both frontend and backend layers",
      "Verify robust exception handling and structured logging integration",
      "Audit code for adherence to C# and Angular clean code standards"
    ],
    prerequisites: "Topic 23-1.",
    terminology: [
      { term: "Evaluation Rubric", definition: "A scoring framework establishing objective performance levels (Distinction, Pass, Needs Revision) across defined engineering criteria." }
    ],
    concepts: [
      {
        title: "The Five Evaluation Dimensions",
        explanation: "Projects are graded according to rigorous industry standards across all architectural layers.",
        codeSnippet: `/* CAPSTONE GRADING RUBRIC:
Dimension 1: Architecture & SOLID (25%)
- Clean separation of concerns (Core, API, Frontend)
- Effective use of DI, DTOs, and Repository patterns

Dimension 2: Security & Authentication (25%)
- Robust JWT authentication with expiration and role authorization
- Zero SQL injection or XSS vulnerabilities; ownership checks (BOLA) enforced

Dimension 3: Code Quality & Testing (20%)
- Unit and integration tests passing with meaningful assertions
- Zero compiler warnings; clean code adhering to naming conventions

Dimension 4: Error Handling & Observability (15%)
- RFC 7807 ProblemDetails returned on failures
- Serilog structured logging with Correlation IDs

Dimension 5: UI/UX & Reactivity (15%)
- Responsive design with comfortable spacing and clear hover states
- Fast feedback with Signals/RxJS and proper error alerts
*/`,
        language: "markdown",
        output: "Clear, transparent scoring matrix covering all enterprise engineering requirements.",
        lineExplanation: [
          "Defines the exact criteria required to achieve a top evaluation score."
        ]
      }
    ],
    diagram: `Capstone Evaluation Score Weighting:
[ Security: 25% ] + [ Architecture: 25% ] + [ Testing: 20% ] + [ Observability: 15% ] + [ UI/UX: 15% ] = 100%`,
    realWorldApplication: "Mirrors technical hiring interviews, senior architect code reviews, and enterprise release audits.",
    commonErrors: [
      {
        error: "Submitting projects with hardcoded secrets or failing unit tests",
        cause: "Neglecting pre-submission checks.",
        fix: "Run 'dotnet test' and check git status to ensure zero secrets are present."
      }
    ],
    bestPractices: [
      "Conduct a self-audit against the rubric before final submission.",
      "Verify that all test suites pass in the GitHub Actions CI pipeline.",
      "Ensure the README provides clear step-by-step setup and execution instructions."
    ],
    practiceQuestions: [
      {
        question: "In the capstone evaluation rubric, why is backend validation required even when frontend reactive forms already validate inputs?",
        options: [
          "It is a duplicate check for fun.",
          "Frontend validation is purely for user experience; attackers can bypass the browser and send malicious payloads directly to the API via Postman or curl.",
          "Browsers disable JavaScript automatically.",
          "It is required by CSS."
        ],
        answerIndex: 1,
        explanation: "Frontend validation can be bypassed easily. The backend must independently enforce all validation rules as the authoritative security boundary."
      }
    ],
    revisionSummary: [
      "Projects are evaluated on Architecture, Security, Quality, Logging, and UX.",
      "Both frontend and backend validation are mandatory.",
      "Automated tests and zero compiler warnings are required."
    ],
    references: [
      { title: "Microsoft Code Quality Standards", url: "https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/", source: "Microsoft Learn" }
    ]
  },

  "topic-23-3": {
    id: "topic-23-3",
    title: "Presentation & Peer Review",
    category: "23. Full-Stack Capstone Project",
    description: "Presentation & Review : Demo to panel; code walkthrough; Q&A; peer review",
    objectives: [
      "Structure an impactful technical demo and project presentation",
      "Conduct a professional code walkthrough explaining architectural decisions",
      "Defend technical choices (e.g. why SQL vs NoSQL, why Signals vs NgRx) during Q&A",
      "Engage in constructive peer review exchanges"
    ],
    prerequisites: "Topics 23-1 and 23-2.",
    terminology: [
      { term: "Technical Code Walkthrough", definition: "A live guided tour of an application's architecture, key classes, and data flows presented to technical peers or stakeholders." }
    ],
    concepts: [
      {
        title: "Structuring a Winning Technical Presentation",
        explanation: "A great technical presentation focuses 20% on the problem, 50% on live demonstration of the solution, and 30% on architectural highlights and engineering lessons learned.",
        codeSnippet: `/* RECOMMENDED DEMO AGENDA (15-20 Minutes):
1. Introduction (2 mins): Problem statement and target persona
2. Live Solution Demo (8 mins):
   - User Registration & JWT Login
   - Happy path: creating an order, real-time reactive UI update
   - Unhappy path: triggering validation errors, observing ProblemDetails
3. Code Architecture Walkthrough (5 mins):
   - DbContext and EF Core query optimization (.AsNoTracking)
   - Angular Signals / Reactive Forms implementation
   - Serilog structured logging and Correlation ID pipeline
4. Challenges & Lessons Learned (2 mins): What broke, how it was fixed
5. Q&A & Technical Defense (5 mins)
*/`,
        language: "markdown",
        output: "Engaging, professional presentation structure proven in corporate engineering demos.",
        lineExplanation: [
          "Balances functional user demonstration with deep technical walkthrough."
        ]
      }
    ],
    diagram: `Presentation Flow:
[ Problem & Context (2m) ] ---> [ Live Working Demo (8m) ] ---> [ Code Architecture (5m) ] ---> [ Q&A Defense (5m) ]`,
    realWorldApplication: "Demonstrating sprint deliveries to executive stakeholders, presenting architectural proposals, and succeeding in technical job interviews.",
    commonErrors: [
      {
        error: "Spending 15 minutes reading slides and only 1 minute showing the real application",
        cause: "Audiences want to see the working software and architecture.",
        fix: "Prioritize the live demo and code walkthrough over theoretical slides."
      }
    ],
    bestPractices: [
      "Rehearse the live demo beforehand to ensure local databases and Docker containers are pre-seeded.",
      "Show how the system handles error cases (unhappy path), not just happy paths.",
      "Clearly articulate the trade-offs behind your architectural decisions."
    ],
    practiceQuestions: [
      {
        question: "When demonstrating your capstone project, why is it valuable to deliberately showcase how the system handles error cases (unhappy paths)?",
        options: [
          "To show that the system can crash.",
          "It demonstrates resilience, proper exception handling, user-friendly feedback, and deep architectural rigor.",
          "It takes less time.",
          "Errors are mandatory in demos."
        ],
        answerIndex: 1,
        explanation: "Demonstrating graceful error handling proves the system is production-hardened rather than just a fragile prototype."
      }
    ],
    revisionSummary: [
      "Focus demos on working software and code architecture.",
      "Show both happy paths and resilient error handling.",
      "Articulate trade-offs clearly during technical Q&A."
    ],
    references: [
      { title: "Delivering Effective Technical Presentations - IEEE", url: "https://www.ieee.org/", source: "IEEE Professional Guide" }
    ]
  }
};

writeModule('module21_ai_augmented_dev.js', 'MODULE_21_LESSONS', m21);
writeModule('module22_agile_readiness.js', 'MODULE_22_LESSONS', m22);
writeModule('module23_capstone_project.js', 'MODULE_23_LESSONS', m23);
console.log('Batch 7 (Modules 21, 22, 23) complete!');
