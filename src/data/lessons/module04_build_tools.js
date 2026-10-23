/**
 * Pre-generated comprehensive lessons for MODULE_04_LESSONS
 * Sources: Microsoft Learn, official documentation, practical industry patterns.
 */

export const MODULE_04_LESSONS = {
  "topic-4-1": {
    "id": "topic-4-1",
    "title": "VS Code & Visual Studio Tooling",
    "category": "4. Build Tools, IDE & Debugging",
    "description": "Setup, extensions (C# Dev Kit), key shortcuts; project navigation; settings",
    "objectives": [
      "Configure VS Code with the official C# Dev Kit extension and Omnisharp",
      "Master productivity shortcuts: Go to Definition (F12), Find References (Shift+F12), Quick Actions (Ctrl+.)",
      "Manage multi-root workspaces and launch.json / tasks.json debugging profiles",
      "Adopt consistent editor configuration using .editorconfig"
    ],
    "prerequisites": "General computer literacy and IDE installation.",
    "terminology": [
      {
        "term": "C# Dev Kit",
        "definition": "Microsoft's official VS Code extension providing Solution Explorer, test discovery, and language server capabilities."
      },
      {
        "term": ".editorconfig",
        "definition": "A standard configuration file that enforces uniform indentation, whitespace, and formatting conventions across different editors."
      }
    ],
    "concepts": [
      {
        "title": "Developer Productivity and .editorconfig",
        "explanation": "Teams use .editorconfig to eliminate code formatting debates by enforcing rules directly inside the editor and compiler.",
        "codeSnippet": "# .editorconfig - Root configuration for .NET Fullstack\nroot = true\n\n[*]\nindent_style = space\nindent_size = 4\nend_of_line = crlf\ncharset = utf-8\ntrim_trailing_whitespace = true\ninsert_final_newline = true\n\n[*.cs]\n# C# Coding Conventions\ncsharp_using_directive_placement = outside_namespace:warning\ncsharp_style_var_for_built_in_types = true:suggestion\ndotnet_style_qualification_for_field = false:suggestion\ndotnet_naming_rule.interface_should_be_prefixed_with_i.severity = warning",
        "language": "ini",
        "output": "Enforces 4-space indentation and 'I' interface prefixes across VS Code, Visual Studio, and Rider.",
        "lineExplanation": [
          "Line 4-10: Standardizes file encoding and whitespace across all operating systems.",
          "Line 13-17: Configures Roslyn compiler analyzers to warn developers if code violates style guidelines."
        ]
      }
    ],
    "diagram": "Development Tooling Stack:\n[ VS Code / Visual Studio ]\n            |\n  (C# Dev Kit + Roslyn Analyzer)\n            |\n  (Reads .editorconfig & launch.json)\n            |\n[ Guaranteed Uniform Code Style Across All Team Members ]",
    "realWorldApplication": "Standardizing development environments in distributed remote teams across Windows, macOS, and Linux.",
    "commonErrors": [
      {
        "error": "C# Dev Kit fails to resolve dependencies or IntelliSense shows red squiggly lines everywhere",
        "cause": "OmniSharp / Dev Kit language server failed to restore NuGet packages or selected the wrong target framework.",
        "fix": "Open Command Palette (Ctrl+Shift+P) and execute 'C# Dev Kit: Rebuild Solution' or run 'dotnet restore' in terminal."
      }
    ],
    "bestPractices": [
      "Memorize key shortcuts: Ctrl+. (Quick Actions/Refactoring), F12 (Go to Definition), Alt+F12 (Peek Definition).",
      "Commit a clean .editorconfig in every repository root.",
      "Use launch.json profiles to debug multiple projects (API + Frontend) simultaneously."
    ],
    "practiceQuestions": [
      {
        "question": "What is the purpose of an .editorconfig file in a C# project?",
        "options": [
          "It compiles the code to machine code.",
          "It defines and enforces consistent code formatting and style rules across all team members' editors.",
          "It stores production passwords.",
          "It installs npm packages."
        ],
        "answerIndex": 1,
        "explanation": ".editorconfig maintains consistent coding styles for multiple developers working on the same project across various editors."
      }
    ],
    "revisionSummary": [
      "C# Dev Kit turns VS Code into a lightweight .NET IDE.",
      "Use .editorconfig to enforce code formatting universally.",
      "Master keyboard shortcuts (Ctrl+., F12) to double development speed."
    ],
    "references": [
      {
        "title": "C# Dev Kit for Visual Studio Code",
        "url": "https://code.visualstudio.com/docs/csharp/get-started",
        "source": "Visual Studio Code Docs"
      }
    ]
  },
  "topic-4-2": {
    "id": "topic-4-2",
    "title": "Debugging Techniques",
    "category": "4. Build Tools, IDE & Debugging",
    "description": "Breakpoints, watch windows, call stack, immediate window; debugging async code; conditional breakpoints",
    "objectives": [
      "Master interactive debugging: conditional breakpoints, hit counts, and logpoints",
      "Inspect runtime state using the Watch Window, Locals Window, and Immediate Window",
      "Navigate the Call Stack to trace execution flow across assemblies",
      "Diagnose asynchronous deadlocks and trace Tasks in flight"
    ],
    "prerequisites": "Control flow, exceptions, and async/await.",
    "terminology": [
      {
        "term": "Conditional Breakpoint",
        "definition": "A breakpoint that only halts execution when a specified boolean condition evaluates to true (e.g. userId == 42)."
      },
      {
        "term": "Logpoint",
        "definition": "Logs a message to the debug console without stopping execution, ideal for debugging production issues without disrupting running threads."
      },
      {
        "term": "Immediate Window",
        "definition": "An interactive command prompt inside the debugger that allows evaluating expressions, executing methods, and modifying variables on the fly."
      }
    ],
    "concepts": [
      {
        "title": "Conditional Breakpoints and Debugger Display",
        "explanation": "Instead of stepping through thousands of loop cycles, use conditional breakpoints to pause execution only when abnormal conditions occur.",
        "codeSnippet": "// Adding [DebuggerDisplay] to enrich debugger inspection windows\n[System.Diagnostics.DebuggerDisplay(\"Order #{Id} - Customer: {CustomerName}, Total: {TotalAmount:C}\")]\npublic class Order\n{\n    public int Id { get; set; }\n    public string CustomerName { get; set; } = \"\";\n    public decimal TotalAmount { get; set; }\n}\n\npublic class OrderProcessor\n{\n    public void ProcessBatch(List<Order> orders)\n    {\n        foreach (var order in orders)\n        {\n            // Set Conditional Breakpoint here:\n            // Condition: order.TotalAmount > 10000 || order.CustomerName == null\n            ValidateOrder(order);\n        }\n    }\n\n    private void ValidateOrder(Order order) { /* Validation */ }\n}",
        "language": "csharp",
        "output": "Debugger stops exclusively on the high-value order or corrupted customer record.",
        "lineExplanation": [
          "Line 2: [DebuggerDisplay] formats how objects appear in the Locals and Watch windows, speeding up debugging.",
          "Line 17: Setting a conditional breakpoint avoids manually pressing F5 thousands of times in large batch loops."
        ]
      }
    ],
    "diagram": "Debugging Workspace:\n+-----------------------------------+------------------------------------+\n| Source Code with Breakpoints (●)  | Call Stack Window                  |\n| > int total = CalculateTax();     | -> CalculateTax() Line 45          |\n|                                   |    ProcessOrder() Line 12          |\n+-----------------------------------+------------------------------------+\n| Watch / Locals Window             | Immediate Window                   |\n| order.Id: 104                     | > order.TotalAmount = 50.0m        |\n| order.TotalAmount: $12,500.00     | Result: 50.0m (Updated live!)      |\n+-----------------------------------+------------------------------------+",
    "realWorldApplication": "Isolating race conditions, memory spikes, and faulty algorithmic calculations in live development and staging servers.",
    "commonErrors": [
      {
        "error": "Modifying variables in the Immediate Window causing unintended side effects",
        "cause": "Evaluating methods with side effects (e.g. repo.DeleteOrder()) in the Immediate Window mutates actual database state while paused in debugger.",
        "fix": "Only evaluate pure getters or calculation functions without side effects."
      }
    ],
    "bestPractices": [
      "Use Logpoints instead of adding Console.WriteLine() statements and recompiling.",
      "Annotate domain entities with [DebuggerDisplay] for clean inspection.",
      "Use the Parallel Stacks window to debug async deadlocks and see which tasks are awaiting."
    ],
    "practiceQuestions": [
      {
        "question": "What is the difference between a traditional breakpoint and a logpoint?",
        "options": [
          "Logpoints crash the server if an error occurs.",
          "A breakpoint halts execution; a logpoint prints a diagnostic message and continues execution without pausing.",
          "Logpoints can only be used in C++.",
          "There is no difference."
        ],
        "answerIndex": 1,
        "explanation": "Logpoints print diagnostic output to the debug console without pausing thread execution, preventing disruption to active connections."
      }
    ],
    "revisionSummary": [
      "Conditional breakpoints halt only when specific criteria are satisfied.",
      "The Immediate Window allows live code execution at pause points.",
      "Use the Call Stack to trace execution across method hierarchies."
    ],
    "references": [
      {
        "title": "First look at the Visual Studio Debugger - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/visualstudio/debugger/debugger-feature-tour",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-4-3": {
    "id": "topic-4-3",
    "title": "MSBuild & dotnet CLI",
    "category": "4. Build Tools, IDE & Debugging",
    "description": "CLI commands (build, run, test, publish, restore); build configurations (Debug/Release); msbuild properties",
    "objectives": [
      "Understand MSBuild compilation targets, item groups, and build properties",
      "Differentiate between Debug (symbols, unoptimized) and Release (JIT optimizations, stripped) builds",
      "Automate testing and publishing with dotnet test and dotnet publish",
      "Produce self-contained and trimmed executable deployments"
    ],
    "prerequisites": ".NET platform basics (Topic 2-4).",
    "terminology": [
      {
        "term": "MSBuild",
        "definition": "The XML-based build engine underlying Visual Studio and the dotnet CLI that orchestrates compilation, packaging, and deployment."
      },
      {
        "term": "Release Configuration",
        "definition": "A build mode that strips debug symbols, enables IL and JIT compiler optimizations, and maximizes execution speed."
      },
      {
        "term": "Self-Contained Deployment",
        "definition": "Publishing a .NET application bundled with its own runtime so the host machine does not need .NET installed."
      }
    ],
    "concepts": [
      {
        "title": "Release Compilation and Publishing for Production",
        "explanation": "Never deploy a Debug build to production. Release builds invoke aggressive compiler inlining and optimizations.",
        "codeSnippet": "# 1. Restore packages and clean build\ndotnet clean\ndotnet restore\n\n# 2. Run automated tests with logger\ndotnet test --configuration Release --logger \"console;verbosity=normal\"\n\n# 3. Publish self-contained, optimized single-file binary for Linux container\ndotnet publish src/EnterpriseApp.Api/EnterpriseApp.Api.csproj \\\n    --configuration Release \\\n    --runtime linux-x64 \\\n    --self-contained true \\\n    -p:PublishSingleFile=true \\\n    -p:PublishTrimmed=true \\\n    --output ./publish/api",
        "language": "bash",
        "output": "Produced optimized single-file binary (~65MB) with unused assemblies trimmed.",
        "lineExplanation": [
          "Line 6: Runs all unit and integration tests in Release mode before publishing.",
          "Line 11: '--runtime linux-x64 --self-contained true' packages the entire .NET runtime for containerization.",
          "Line 13: '-p:PublishTrimmed=true' strips unused framework types, reducing container footprint."
        ]
      }
    ],
    "diagram": "Build Pipeline:\n[ Source Code + NuGet Packages ]\n               |\n         (dotnet restore)\n               v\n         (dotnet build -c Release)\n               v\n         (dotnet test)\n               v\n         (dotnet publish -c Release) ===> [ Production Deployment Artifacts ]",
    "realWorldApplication": "Writing Docker multi-stage builds and GitHub Actions CI/CD workflows that build, test, and containerize .NET microservices.",
    "commonErrors": [
      {
        "error": "Deploying Debug builds to production",
        "cause": "Omitting '-c Release' defaults to Debug, disabling JIT optimization and leaving security-sensitive symbol files exposed.",
        "fix": "Always specify '--configuration Release' in production publish scripts."
      }
    ],
    "bestPractices": [
      "Always execute 'dotnet test' before 'dotnet publish' in automated build pipelines.",
      "Use Directory.Build.props to share common build properties (TargetFramework, Version, Authors) across all projects in a solution.",
      "Enable trimming cautiously and test thoroughly to ensure reflection calls do not break."
    ],
    "practiceQuestions": [
      {
        "question": "Why should production web services always be compiled with the 'Release' configuration?",
        "options": [
          "Debug builds do not run on Linux.",
          "Release mode enables compiler optimizations, inlining, and strips debug overhead for maximum performance.",
          "Release mode automatically creates a SQL database.",
          "There is no difference."
        ],
        "answerIndex": 1,
        "explanation": "Release mode enables aggressive compiler and JIT optimizations, making code run substantially faster with less memory overhead."
      }
    ],
    "revisionSummary": [
      "MSBuild orchestrates compilation via the dotnet CLI.",
      "Always publish with '--configuration Release' for production.",
      "Self-contained and single-file options simplify Docker and cloud deployment."
    ],
    "references": [
      {
        "title": ".NET CLI Overview - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/tools/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-4-4": {
    "id": "topic-4-4",
    "title": "Assessment 2: Tooling & Git Checkpoint",
    "category": "4. Build Tools, IDE & Debugging",
    "description": "Set up repo, create multi-project solution, implement small feature, debug an intentional bug, submit PR",
    "objectives": [
      "Create a multi-project .NET solution with a Web API and Class Library using the dotnet CLI",
      "Configure Git, write a .gitignore, and implement feature branch workflows",
      "Identify and debug an intentional logic error using breakpoints and the Watch Window",
      "Produce a clean, reviewed Pull Request with conventional commit messages"
    ],
    "prerequisites": "Modules 1, 2, 3, and Topics 4-1 to 4-3.",
    "terminology": [
      {
        "term": "Multi-Project Solution",
        "definition": "A .sln file coordinating multiple independent .csproj projects (e.g. Domain, API, Tests)."
      }
    ],
    "concepts": [
      {
        "title": "Hands-on Practical Checkpoint Execution",
        "explanation": "Step-by-step terminal and code execution establishing an enterprise project repository from scratch.",
        "codeSnippet": "# Step 1: Initialize git repository and add standard .gitignore\ngit init\ndotnet new gitignore\n\n# Step 2: Create solution and projects\ndotnet new sln -n BankingPlatform\ndotnet new webapi -n BankingPlatform.Api\ndotnet new classlib -n BankingPlatform.Core\ndotnet new xunit -n BankingPlatform.Tests\n\n# Step 3: Link projects to solution\ndotnet sln add BankingPlatform.Api BankingPlatform.Core BankingPlatform.Tests\n\n# Step 4: Add references\ndotnet add BankingPlatform.Api reference BankingPlatform.Core\ndotnet add BankingPlatform.Tests reference BankingPlatform.Core\n\n# Step 5: Build and verify zero errors\ndotnet build\ndotnet test",
        "language": "bash",
        "output": "Passed! 3 projects compiled and linked into BankingPlatform.sln with zero errors.",
        "lineExplanation": [
          "Creates a professional multi-tier architecture following industry domain separation standards."
        ]
      }
    ],
    "diagram": "Multi-Project Solution Structure:\nBankingPlatform.sln\n   |-- BankingPlatform.Core (Classlib: Entities, Business Logic)\n   |-- BankingPlatform.Api  (Web API: Controllers, Endpoints) ---> references Core\n   +-- BankingPlatform.Tests(xUnit: Automated Unit Tests)   ---> references Core",
    "realWorldApplication": "The exact bootstrapping pattern required when starting any new commercial .NET backend application.",
    "commonErrors": [
      {
        "error": "Circular dependency: Project A references Project B, and Project B references Project A",
        "cause": "Violates architectural layer boundaries.",
        "fix": "Ensure references flow in one direction: Presentation -> Core, Tests -> Core."
      }
    ],
    "bestPractices": [
      "Keep domain logic in a Class Library completely decoupled from ASP.NET Core web controllers.",
      "Verify that tests pass locally before pushing feature branches.",
      "Write clear Pull Request descriptions outlining changes and testing evidence."
    ],
    "practiceQuestions": [
      {
        "question": "Why should business logic reside in a Class Library rather than inside Web API controllers?",
        "options": [
          "Controllers cannot run if-statements.",
          "To allow the business logic to be tested independently and reused across APIs, background workers, or CLI tools.",
          "Class libraries run twice as fast.",
          "It is required by MSBuild."
        ],
        "answerIndex": 1,
        "explanation": "Placing logic in class libraries decouples core domain rules from the web delivery mechanism, maximizing reusability and testability."
      }
    ],
    "revisionSummary": [
      "Multi-project solutions enforce clean layer boundaries.",
      "The dotnet CLI automates solution creation, references, and tests.",
      "Demonstrates mastery of professional development workflows."
    ],
    "references": [
      {
        "title": "Organizing and testing projects with the .NET CLI - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/testing/selective-unit-tests",
        "source": "Microsoft Learn"
      }
    ]
  }
};
