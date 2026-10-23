/**
 * Pre-generated comprehensive lessons for MODULE_21_LESSONS
 * Sources: Industry Best Practices, Agile Alliance, Full-Stack Architecture Guides.
 */

export const MODULE_21_LESSONS = {
  "topic-21-1": {
    "id": "topic-21-1",
    "title": "GenAI Fundamentals & Ethics in Software",
    "category": "21. AI-Augmented Development",
    "description": "GenAI Fundamentals & Ethics : LLMs, NLP basics; GenAI in SDLC; AI vs Agents vs Agentic AI; responsible AI; secure prompting",
    "objectives": [
      "Understand Large Language Model (LLM) architectures, tokens, and probabilistic text generation",
      "Differentiate between standalone AI models, tool-calling agents, and autonomous multi-agent systems",
      "Apply Responsible AI practices: data privacy, zero-data-retention, and copyright compliance",
      "Implement Secure Prompting techniques to prevent prompt injection and data exfiltration"
    ],
    "prerequisites": "General software development experience.",
    "terminology": [
      {
        "term": "LLM (Large Language Model)",
        "definition": "A deep learning neural network trained on vast text corpora to predict tokens and generate natural language or source code."
      },
      {
        "term": "Agentic AI",
        "definition": "An AI system that exhibits agency: reasoning through multi-step plans, using external tools (terminals, web search, compilers), and verifying its own output iteratively."
      },
      {
        "term": "Prompt Injection",
        "definition": "A security attack where untrusted user input manipulates the LLM into ignoring previous system instructions and performing unauthorized actions."
      }
    ],
    "concepts": [
      {
        "title": "Agentic AI Workflows and Secure Prompting",
        "explanation": "Agentic AI systems go beyond simple autocomplete by combining reasoning loops with tool access to execute complex end-to-end coding tasks.",
        "codeSnippet": "// Agentic Loop Conceptual Flow:\n// 1. Goal: \"Add input validation to the Customer Registration endpoint.\"\n// 2. Think: \"I need to inspect CustomerDto.cs and register a FluentValidator.\"\n// 3. Tool Call: view_file(\"src/Core/DTOs/CustomerDto.cs\")\n// 4. Tool Call: write_to_file(\"src/Core/Validators/CustomerValidator.cs\")\n// 5. Tool Call: run_command(\"dotnet test\")\n// 6. Verify: Tests pass with 0 warnings -> Present completed diff to user!",
        "language": "csharp",
        "output": "Autonomous agent cycles through Think -> Act -> Verify until goal is achieved.",
        "lineExplanation": [
          "Demonstrates the agentic cycle combining reasoning with compiler and tool feedback."
        ]
      }
    ],
    "diagram": "Evolution of AI in Development:\n1. Autocomplete (GitHub Copilot tab-completion)\n         |\n         v\n2. Conversational Chat (Asking questions, generating code snippets)\n         |\n         v\n3. Agentic AI (Multi-file refactoring, running terminal commands, self-debugging)",
    "realWorldApplication": "Leveraging agentic coding workflows to automate migrations, refactor legacy codebases, and generate integration test suites.",
    "commonErrors": [
      {
        "error": "Pasting production customer data or corporate API keys into public AI prompts",
        "cause": "Leads to severe data privacy breaches (GDPR, HIPAA) and exposed credentials.",
        "fix": "Never feed sensitive production secrets or PII into public LLM interfaces."
      }
    ],
    "bestPractices": [
      "Use enterprise LLM tiers with explicit Zero Data Retention (ZDR) agreements.",
      "Sanitize inputs before passing user-generated strings to LLM agents.",
      "Always have human engineers review and approve agent-authored code commits."
    ],
    "practiceQuestions": [
      {
        "question": "What differentiates an Agentic AI system from basic LLM autocomplete?",
        "options": [
          "Agentic AI only speaks English.",
          "Agentic AI possesses agency: it can formulate multi-step plans, invoke tools (compilers, file readers, shells), and verify its own results in a feedback loop.",
          "Agentic AI does not use neural networks.",
          "There is no difference."
        ],
        "answerIndex": 1,
        "explanation": "Agentic AI combines reasoning with tool execution (reading files, executing tests) to accomplish complex goals autonomously."
      }
    ],
    "revisionSummary": [
      "LLMs generate code probabilistically.",
      "Agentic AI combines reasoning with tool calling.",
      "Practice responsible AI with secure prompting and privacy protection."
    ],
    "references": [
      {
        "title": "Responsible AI Principles - Microsoft",
        "url": "https://www.microsoft.com/en-us/ai/principles-and-approach",
        "source": "Microsoft AI"
      }
    ]
  },
  "topic-21-2": {
    "id": "topic-21-2",
    "title": "Prompt Engineering for Developers",
    "category": "21. AI-Augmented Development",
    "description": "Prompt Engineering : Techniques (few-shot, persona, chain-of-thought); being specific; iterative refinement; context management",
    "objectives": [
      "Master foundational prompting patterns: Persona, Few-Shot, and Chain-of-Thought (CoT)",
      "Manage LLM context windows efficiently by providing relevant code snippets and schemas",
      "Employ iterative refinement to evolve rough drafts into production-ready software",
      "Prevent hallucinations by constraining output formats and version standards"
    ],
    "prerequisites": "General programming experience.",
    "terminology": [
      {
        "term": "Few-Shot Prompting",
        "definition": "Providing one or more explicit examples of inputs and desired outputs in the prompt to guide the model's pattern matching."
      },
      {
        "term": "Chain-of-Thought (CoT)",
        "definition": "Directing the model to break down complex reasoning step-by-step before producing final code."
      },
      {
        "term": "Context Window Management",
        "definition": "Curating only the most relevant files, interfaces, and constraints to stay within the model's optimal attention span."
      }
    ],
    "concepts": [
      {
        "title": "The PERFECT Prompting Framework for Engineers",
        "explanation": "High-quality engineering prompts provide Persona, Context, Task, Constraints, Examples, and Expected Output Format.",
        "codeSnippet": "/* PROFESSIONAL PROMPT TEMPLATE:\n[PERSONA]: You are a Principal .NET 8 and Angular architect.\n[CONTEXT]: I have an ASP.NET Core Web API with EF Core using SQL Server.\n[TASK]: Write an xUnit integration test for POST /api/orders.\n[CONSTRAINTS]:\n- Use WebApplicationFactory<Program>\n- Use FluentAssertions\n- Test must verify that 400 ValidationProblemDetails is returned when TotalAmount is negative.\n- Do NOT use Moq; use the in-memory test server directly.\n[FORMAT]: Provide clean C# code without placeholder comments.\n*/",
        "language": "csharp",
        "output": "Produces exact, production-ready xUnit test matching architectural constraints on the first attempt.",
        "lineExplanation": [
          "Defining persona, exact framework versions, and explicit negative constraints eliminates 95% of common AI hallucinations."
        ]
      }
    ],
    "diagram": "Prompt Engineering Pipeline:\n[ Vague Prompt: \"Write an API\" ] ---> Returns generic, outdated, or buggy code\n                 vs\n[ Persona + Version (.NET 8) + Constraints + Examples ] ---> Produces production-ready, clean code!",
    "realWorldApplication": "Dramatically increasing development velocity by generating accurate code on the first prompt rather than wasting time on repeated iterations.",
    "commonErrors": [
      {
        "error": "Writing brief, underspecified prompts (e.g. 'Fix my code')",
        "cause": "Forces the model to guess your language version, libraries, and architectural conventions.",
        "fix": "Provide context: include compiler error messages, relevant interfaces, and target framework versions."
      }
    ],
    "bestPractices": [
      "Always state the exact target framework version (e.g. '.NET 8', 'Angular 17').",
      "Use Chain-of-Thought: ask the model to 'Explain your plan first before writing code'.",
      "Provide few-shot input/output examples when formatting JSON or regular expressions."
    ],
    "practiceQuestions": [
      {
        "question": "What is Few-Shot prompting in AI engineering?",
        "options": [
          "Asking the AI multiple questions at once.",
          "Supplying one or more representative examples of input and expected output directly inside the prompt.",
          "Running the prompt on a GPU.",
          "Using short prompts under 5 words."
        ],
        "answerIndex": 1,
        "explanation": "Few-shot prompting provides sample input-output pairs in the prompt to condition the model on the exact pattern desired."
      }
    ],
    "revisionSummary": [
      "Specify Persona, Context, Constraints, and Target Versions.",
      "Use Chain-of-Thought for complex architectural problems.",
      "Few-shot examples guide output formatting and regexes."
    ],
    "references": [
      {
        "title": "Prompt Engineering Guide - DAIR.AI",
        "url": "https://www.promptingguide.ai/",
        "source": "PromptingGuide.ai"
      }
    ]
  },
  "topic-21-3": {
    "id": "topic-21-3",
    "title": "GitHub Copilot Advanced Techniques",
    "category": "21. AI-Augmented Development",
    "description": "GitHub Copilot — Advanced : Copilot Chat modes; coding agents; Copilot code review",
    "objectives": [
      "Master Copilot Chat modes (Inline Chat Ctrl+I, Chat Panel Ctrl+Alt+I, Quick Chat)",
      "Direct Copilot for automated Pull Request summaries and code reviews",
      "Configure project-level custom instructions using .github/copilot-instructions.md",
      "Leverage terminal integration to construct shell scripts and Docker commands"
    ],
    "prerequisites": "VS Code Tooling and Git.",
    "terminology": [
      {
        "term": "copilot-instructions.md",
        "definition": "A project-level markdown file in .github/ that instructs Copilot on team coding standards, architectures, and naming conventions."
      },
      {
        "term": "Inline Chat",
        "definition": "Invoking Copilot directly at the editor cursor (Ctrl+I) to refactor, document, or generate code in place."
      }
    ],
    "concepts": [
      {
        "title": "Custom Repository Instructions for Copilot",
        "explanation": "You can permanently train Copilot on your team's engineering standards by adding a .github/copilot-instructions.md file to your repository.",
        "codeSnippet": "# .github/copilot-instructions.md\n# Team Engineering Guidelines for Copilot\n\n- Always use .NET 8 and C# 12 features (Primary constructors, collection expressions).\n- Always use Angular 17+ standalone components and modern control flow (@if, @for).\n- Always wrap database read queries with .AsNoTracking().\n- For API responses, always use RFC 7807 ProblemDetails format.\n- In unit tests, use xUnit with FluentAssertions and follow the AAA pattern.",
        "language": "markdown",
        "output": "Copilot automatically adopts these conventions for all team members opening the repository.",
        "lineExplanation": [
          "Eliminates repetitive prompting by permanently conditioning Copilot on team architectural conventions."
        ]
      }
    ],
    "diagram": "Copilot Workspace Integration:\n[ Developer in VS Code ]\n           |\n  (Invokes Copilot Chat / Inline)\n           |\n  [ Reads .github/copilot-instructions.md ]\n           |\n  [ Adheres to Team Conventions (.NET 8, OnPush, ProblemDetails) ]",
    "realWorldApplication": "Enforcing uniform coding standards and architectural consistency across engineering teams.",
    "commonErrors": [
      {
        "error": "Accepting multi-line inline suggestions without reading them line by line",
        "cause": "Leads to subtle logical bugs or deprecated library calls slipping into code.",
        "fix": "Treat every tab completion as a draft to be verified before committing."
      }
    ],
    "bestPractices": [
      "Commit a .github/copilot-instructions.md in every repository root.",
      "Use Inline Chat (Ctrl+I) for targeted single-method refactoring.",
      "Use Copilot to generate initial Pull Request descriptions on GitHub."
    ],
    "practiceQuestions": [
      {
        "question": "Where can you place a configuration file to permanently enforce team coding standards for GitHub Copilot across a repository?",
        "options": [
          "In the Windows registry.",
          "In .github/copilot-instructions.md",
          "In package.json",
          "In a private git branch."
        ],
        "answerIndex": 1,
        "explanation": ".github/copilot-instructions.md automatically instructs GitHub Copilot Chat on project-specific patterns, frameworks, and rules."
      }
    ],
    "revisionSummary": [
      "Use inline chat (Ctrl+I) and chat panels (Ctrl+Alt+I).",
      ".github/copilot-instructions.md sets team-wide standards.",
      "Use Copilot to accelerate PR reviews and test generation."
    ],
    "references": [
      {
        "title": "Configuring GitHub Copilot in your repository",
        "url": "https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot",
        "source": "GitHub Docs"
      }
    ]
  }
};
