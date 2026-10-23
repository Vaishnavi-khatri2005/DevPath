/**
 * Pre-generated comprehensive lessons for MODULE_02_LESSONS
 * Sources: Microsoft Learn, official documentation, practical industry patterns.
 */

export const MODULE_02_LESSONS = {
  "topic-2-1": {
    "id": "topic-2-1",
    "title": "LINQ (Language Integrated Query)",
    "category": "2. Modern C# & .NET",
    "description": "Query syntax & method syntax; filtering, projection, aggregation; deferred execution; LINQ to Objects",
    "objectives": [
      "Master LINQ method syntax (Select, Where, OrderBy, GroupBy) and query syntax",
      "Understand deferred execution vs immediate execution (.ToList(), .ToArray())",
      "Perform aggregation calculations with Count, Sum, Average, Min, and Max",
      "Avoid the double-enumeration performance hazard"
    ],
    "prerequisites": "Delegates, lambdas, and IEnumerable<T> (Topics 1-8 and 1-10).",
    "terminology": [
      {
        "term": "LINQ",
        "definition": "Language Integrated Query; a declarative syntax built into C# for querying collections, databases, and XML."
      },
      {
        "term": "Deferred Execution",
        "definition": "The query evaluation is delayed until the collection is actually enumerated (e.g. inside a foreach loop or .ToList())."
      },
      {
        "term": "Projection (Select)",
        "definition": "Transforming elements of a collection into a new shape or type (e.g. mapping an Entity to a DTO)."
      }
    ],
    "concepts": [
      {
        "title": "Method Syntax and Deferred Execution",
        "explanation": "LINQ operations are divided into non-terminal operations (Where, Select) which are deferred, and terminal operations (ToList, Count, FirstOrDefault) which immediately execute.",
        "codeSnippet": "var employees = new List<Employee>\n{\n    new(1, \"Sarah\", \"Engineering\", 115000),\n    new(2, \"David\", \"Marketing\", 85000),\n    new(3, \"Alex\", \"Engineering\", 125000),\n    new(4, \"Maria\", \"Finance\", 95000)\n};\n\n// Method syntax with filtering, ordering, and projection\nvar topEngineers = employees\n    .Where(e => e.Department == \"Engineering\")\n    .OrderByDescending(e => e.Salary)\n    .Select(e => new { e.Name, e.Salary })\n    .ToList(); // Immediate execution happens here!\n\nforeach (var eng in topEngineers)\n{\n    Console.WriteLine($\"{eng.Name}: {eng.Salary:C}\");\n}\n\n// Aggregation: Average salary in Engineering\nvar avgEngSalary = employees\n    .Where(e => e.Department == \"Engineering\")\n    .Average(e => e.Salary);\n\nConsole.WriteLine($\"Average Engineering Salary: {avgEngSalary:C}\");\n\nrecord Employee(int Id, string Name, string Department, decimal Salary);",
        "language": "csharp",
        "output": "Alex: $125,000.00\nSarah: $115,000.00\nAverage Engineering Salary: $120,000.00",
        "lineExplanation": [
          "Line 11: Where filters the stream by Department == 'Engineering'.",
          "Line 13: Select projects each Employee object into an anonymous type containing only Name and Salary.",
          "Line 14: .ToList() triggers immediate execution of the query and allocates the memory list."
        ]
      }
    ],
    "diagram": "Deferred vs Immediate Execution:\nvar query = list.Where(...) // Query constructed, ZERO processing done yet!\n        |\n        +---> foreach (var x in query) ---> Iterates item by item as needed\n        |\n        +---> query.ToList() -------------> Executes completely right now into List<T>",
    "realWorldApplication": "Filtering and sorting customer databases, computing reporting metrics, and projecting database tables directly into API response models in Entity Framework.",
    "commonErrors": [
      {
        "error": "Multiple enumeration of IEnumerable (double-enumeration warning)",
        "cause": "Calling .Count() on an IEnumerable and then calling foreach on the same query causes the underlying database or filter logic to re-run twice.",
        "fix": "Materialize the query using .ToList() before checking count and iterating."
      }
    ],
    "bestPractices": [
      "Prefer method syntax (.Where(), .Select()) over SQL-like query syntax as it aligns with standard C# method chaining.",
      "Use FirstOrDefault() instead of First() when an item might not exist to prevent InvalidOperationException.",
      "Materialize queries with .ToList() before returning from service methods to avoid deferred database query leaks."
    ],
    "practiceQuestions": [
      {
        "question": "Which of the following LINQ methods forces immediate execution?",
        "options": [
          "Where()",
          "Select()",
          "OrderBy()",
          "ToList()"
        ],
        "answerIndex": 3,
        "explanation": "ToList() is a terminal method that immediately enumerates the query and stores results in a List."
      }
    ],
    "revisionSummary": [
      "LINQ brings declarative, SQL-like querying directly into C#.",
      "Deferred execution saves resources by executing only when enumerated.",
      "Use terminal operators (.ToList(), .First()) to materialize data."
    ],
    "references": [
      {
        "title": "LINQ Overview - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/linq/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-2-2": {
    "id": "topic-2-2",
    "title": "Asynchronous Programming",
    "category": "2. Modern C# & .NET",
    "description": "async/await; Task & Task<T>; when to use async; common pitfalls (deadlocks, fire-and-forget)",
    "objectives": [
      "Master the async and await keywords for non-blocking I/O operations",
      "Understand Task and Task<TResult> as promises of future completion",
      "Avoid thread pool starvation, deadlocks (.Result / .Wait()), and fire-and-forget traps",
      "Apply cancellation tokens (CancellationToken) for responsive request termination"
    ],
    "prerequisites": "Methods, delegates, and threading concepts.",
    "terminology": [
      {
        "term": "async/await",
        "definition": "Language keywords that transform a method into a state machine, yielding control back to the thread pool while awaiting asynchronous I/O."
      },
      {
        "term": "Thread Pool Starvation",
        "definition": "A condition where all worker threads are blocked synchronously waiting for async tasks, freezing application throughput."
      },
      {
        "term": "CancellationToken",
        "definition": "A struct passed through async call stacks to signal that an operation should be cancelled before completing."
      }
    ],
    "concepts": [
      {
        "title": "Writing Scalable Async Code with async/await",
        "explanation": "In web servers (ASP.NET Core), asynchronous programming does not make a single request run faster; instead, it prevents blocking threads, allowing one server to handle thousands of concurrent requests.",
        "codeSnippet": "using System.Net.Http.Json;\n\npublic class WeatherService\n{\n    private readonly HttpClient _httpClient;\n\n    public WeatherService(HttpClient httpClient) => _httpClient = httpClient;\n\n    // Asynchronous method returning Task<T>\n    public async Task<WeatherForecast?> GetForecastAsync(string city, CancellationToken ct = default)\n    {\n        string url = $\"https://api.weather.com/v1/{city}\";\n        \n        // Non-blocking await yields thread to pool while awaiting socket response\n        var response = await _httpClient.GetFromJsonAsync<WeatherForecast>(url, ct);\n        return response;\n    }\n}\n\npublic record WeatherForecast(string City, int TemperatureC, string Summary);",
        "language": "csharp",
        "output": "Yields thread pool worker during socket transmission, returning upon packet arrival.",
        "lineExplanation": [
          "Line 8: 'async Task<WeatherForecast?>' declares an asynchronous method.",
          "Line 13: 'await _httpClient.GetFromJsonAsync' pauses execution without blocking the OS thread.",
          "Line 13: Passing 'CancellationToken ct' ensures the network call terminates immediately if the user cancels or closes their browser."
        ]
      }
    ],
    "diagram": "Synchronous (Blocking) vs Asynchronous:\nSync:  [Thread 1] === Waiting for Database (Idle, Locked) ===> Resume\nAsync: [Thread 1] --- Dispatches I/O ---> [Thread 1 free for other users!]\n                                          ... I/O completes ...\n                                          [Any Free Thread] Resumes Execution",
    "realWorldApplication": "All web API database queries, external payment gateway calls, and cloud blob uploads must be async to sustain high traffic without crashing the server.",
    "commonErrors": [
      {
        "error": "Calling .Result or .Wait() on an asynchronous Task (Sync-over-Async)",
        "cause": "Blocks the current thread until the task completes, causing deadlocks in synchronization contexts and starvation in ASP.NET Core.",
        "fix": "Always use 'await' all the way up the call stack."
      },
      {
        "error": "Writing 'async void' methods (except for GUI event handlers)",
        "cause": "Exceptions thrown inside an 'async void' method cannot be caught by callers and will crash the process.",
        "fix": "Always return 'Task' or 'Task<T>' from async methods."
      }
    ],
    "bestPractices": [
      "Always append 'Async' to asynchronous method names (e.g. SaveChangesAsync).",
      "Pass CancellationToken down through all asynchronous I/O methods.",
      "Never use .Result or .Wait(); await all the way."
    ],
    "practiceQuestions": [
      {
        "question": "Why is 'async void' dangerous in C# backend applications?",
        "options": [
          "It allocates extra heap memory.",
          "Exceptions cannot be caught by callers and can terminate the entire application process.",
          "It forces code to run on a single thread.",
          "It is not allowed by the compiler."
        ],
        "answerIndex": 1,
        "explanation": "Exceptions in 'async void' methods bypass caller catch blocks and crash the process. Always return Task instead."
      }
    ],
    "revisionSummary": [
      "async/await frees threads during I/O for massive scalability.",
      "Never block with .Result or .Wait().",
      "Pass CancellationToken to support clean, prompt cancellations."
    ],
    "references": [
      {
        "title": "Asynchronous programming with async and await - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-2-3": {
    "id": "topic-2-3",
    "title": "Extension Methods",
    "category": "2. Modern C# & .NET",
    "description": "Creating & using extension methods; method chaining patterns",
    "objectives": [
      "Define static classes and static methods using the 'this' parameter modifier",
      "Extend existing types (string, DateTime, collections) without inheritance or modifying source code",
      "Build fluent method chaining APIs (Fluent Interfaces)",
      "Understand namespace discovery rules for extension methods"
    ],
    "prerequisites": "Static classes and methods (Topics 1-3 and 1-4).",
    "terminology": [
      {
        "term": "Extension Method",
        "definition": "A static method that can be called as though it were an instance method on the extended type using fluent dot-syntax."
      },
      {
        "term": "this Parameter Modifier",
        "definition": "The first parameter of an extension method marked with 'this', designating the type being extended."
      }
    ],
    "concepts": [
      {
        "title": "Authoring Practical Extension Methods",
        "explanation": "Extension methods allow adding methods to classes you do not own (like System.String or IEnumerable<T>).",
        "codeSnippet": "// Must be inside a static class\npublic static class StringExtensions\n{\n    // First parameter has 'this' modifier\n    public static bool IsValidEmail(this string email)\n    {\n        if (string.IsNullOrWhiteSpace(email)) return false;\n        return email.Contains('@') && email.Contains('.');\n    }\n\n    public static string ToSlug(this string text)\n    {\n        return text.Trim().ToLower().Replace(\" \", \"-\");\n    }\n}\n\n// Usage at call site:\nstring userEmail = \"dev@fullstack.org\";\nif (userEmail.IsValidEmail()) // Invoked as if it were a native method of string!\n{\n    Console.WriteLine(\"Valid email.\");\n}\n\nstring postTitle = \"Learn Modern C Sharp 12\";\nConsole.WriteLine($\"URL Slug: {postTitle.ToSlug()}\");",
        "language": "csharp",
        "output": "Valid email.\nURL Slug: learn-modern-c-sharp-12",
        "lineExplanation": [
          "Line 2: The containing class must be 'public static class'.",
          "Line 5: 'this string email' makes IsValidEmail available on any string instance in files that import this namespace.",
          "Line 17: Called via standard dot syntax: userEmail.IsValidEmail()."
        ]
      }
    ],
    "diagram": "Extension Method Resolution:\nSource Code: userEmail.IsValidEmail()\n                    |\nCompiler rewrites to: StringExtensions.IsValidEmail(userEmail)",
    "realWorldApplication": "LINQ is entirely built upon extension methods on IEnumerable<T>. ASP.NET Core middleware registration (app.UseSwagger(), app.UseAuthentication()) uses extension methods on IApplicationBuilder.",
    "commonErrors": [
      {
        "error": "Extension method not appearing in IntelliSense",
        "cause": "The namespace containing the static extension class has not been imported via a 'using' statement.",
        "fix": "Add the 'using YourNamespace;' directive at the top of the file."
      }
    ],
    "bestPractices": [
      "Do not pollute universal types like System.Object with broad extension methods.",
      "Check for null arguments inside extension methods defensively.",
      "Group related extension methods in a dedicated 'Extensions' namespace."
    ],
    "practiceQuestions": [
      {
        "question": "Where must an extension method be declared in C#?",
        "options": [
          "Inside an abstract class.",
          "Inside a static class.",
          "Inside an interface.",
          "Directly in the Program.cs main method."
        ],
        "answerIndex": 1,
        "explanation": "Extension methods must be static methods declared inside a non-nested, non-generic static class."
      }
    ],
    "revisionSummary": [
      "Extension methods augment existing types using 'this' on the first parameter.",
      "Enables fluent chaining and is the backbone of LINQ and ASP.NET Core builder APIs."
    ],
    "references": [
      {
        "title": "Extension Methods - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-2-4": {
    "id": "topic-2-4",
    "title": ".NET Platform & Ecosystem",
    "category": "2. Modern C# & .NET",
    "description": ".NET 6/7/8 evolution; runtime, SDK, CLR; project structure; dotnet CLI",
    "objectives": [
      "Understand the modern cross-platform .NET ecosystem (.NET 6, 7, 8 LTS)",
      "Distinguish between the .NET SDK (compiler, tools) and the .NET Runtime (CLR, JIT)",
      "Navigate standard .NET solution and .csproj project architectures",
      "Master essential dotnet CLI commands: new, build, run, test, publish"
    ],
    "prerequisites": "Basic command line knowledge.",
    "terminology": [
      {
        "term": "Common Language Runtime (CLR)",
        "definition": "The execution engine of .NET that handles JIT compilation, garbage collection, and exception management."
      },
      {
        "term": "Just-In-Time (JIT) Compiler",
        "definition": "Compiles platform-agnostic Intermediate Language (IL) bytecode into native CPU machine instructions at runtime."
      },
      {
        "term": "Long Term Support (LTS)",
        "definition": "Even-numbered .NET versions (.NET 6, .NET 8) that receive 3 years of official enterprise support and patches."
      }
    ],
    "concepts": [
      {
        "title": "The Modern .NET Architecture",
        "explanation": ".NET is a unified, open-source, high-performance platform running on Windows, Linux, and macOS. C# source code compiles into Common Intermediate Language (CIL), packaged into DLL assemblies, and executed by the CLR.",
        "codeSnippet": "# Essential dotnet CLI commands\n# 1. Create a new multi-project solution\ndotnet new sln -n EnterpriseApp\n\n# 2. Create Web API and Class Library projects\ndotnet new webapi -n EnterpriseApp.Api\ndotnet new classlib -n EnterpriseApp.Core\n\n# 3. Add projects to solution\ndotnet sln add EnterpriseApp.Api\ndotnet sln add EnterpriseApp.Core\n\n# 4. Reference Core library in Web API\ndotnet add EnterpriseApp.Api reference EnterpriseApp.Core\n\n# 5. Build and Run\ndotnet build\ndotnet run --project EnterpriseApp.Api",
        "language": "bash",
        "output": "Building... Successfully linked dependencies and started server on http://localhost:5000",
        "lineExplanation": [
          "Line 3: Creates a top-level .sln file linking multiple projects together.",
          "Line 6-7: Uses official templates (webapi, classlib) to scaffold standardized folder structures.",
          "Line 14: Adds project-to-project reference in the .csproj XML file automatically."
        ]
      }
    ],
    "diagram": "Compilation & Execution Pipeline:\n[ C# Source Code (.cs) ]\n           |\n     (Roslyn Compiler)\n           v\n[ Intermediate Language (IL) Assembly (.dll) ]\n           |\n     (CLR + JIT Compiler at Runtime)\n           v\n[ Native Machine Code (x64 / ARM64) ]",
    "realWorldApplication": "Architecting clean multi-tier solutions: Web API presentation layer, Core Domain class library, and Infrastructure database layer.",
    "commonErrors": [
      {
        "error": "The specified SDK version could not be found",
        "cause": "A global.json file specifies a .NET SDK version not installed on the machine.",
        "fix": "Check installed SDKs with 'dotnet --info' and update global.json accordingly."
      }
    ],
    "bestPractices": [
      "Target Long Term Support (LTS) releases like .NET 8 for production enterprise systems.",
      "Structure solutions using the Clean Architecture pattern (Domain, Application, Infrastructure, Presentation).",
      "Use 'dotnet format' to enforce consistent formatting across teams."
    ],
    "practiceQuestions": [
      {
        "question": "What is an LTS release in the .NET support lifecycle?",
        "options": [
          "Limited Test Support",
          "Long Term Support (supported for 3 years)",
          "Legacy Tech Support",
          "Linux-only Technology Standard"
        ],
        "answerIndex": 1,
        "explanation": "LTS stands for Long Term Support, providing 3 full years of guaranteed security patches and support."
      }
    ],
    "revisionSummary": [
      ".NET is cross-platform and modular.",
      "The SDK builds code; the Runtime executes IL bytecode via JIT compilation.",
      "The dotnet CLI provides cross-platform build automation."
    ],
    "references": [
      {
        "title": ".NET Architectural Overview - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/introduction",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-2-5": {
    "id": "topic-2-5",
    "title": "NuGet & Assemblies",
    "category": "2. Modern C# & .NET",
    "description": "Package management; csproj & dependencies; assemblies; libraries",
    "objectives": [
      "Manage external libraries using NuGet CLI and package manager",
      "Understand project dependencies in modern SDK-style .csproj files",
      "Distinguish between compile-time assemblies and runtime deployment outputs",
      "Detect and resolve package vulnerability warnings and version conflicts"
    ],
    "prerequisites": ".NET platform basics and CLI.",
    "terminology": [
      {
        "term": "NuGet",
        "definition": "The official package manager for .NET that hosts hundreds of thousands of open-source and enterprise libraries."
      },
      {
        "term": "Assembly",
        "definition": "A compiled code library (.dll or .exe) containing CIL bytecode and metadata describing types and versioning."
      },
      {
        "term": "PackageReference",
        "definition": "XML tag in .csproj defining third-party package dependencies and their exact versions."
      }
    ],
    "concepts": [
      {
        "title": "Managing Dependencies in .csproj",
        "explanation": "Modern .NET uses lean SDK-style .csproj files where dependencies and target frameworks are specified cleanly.",
        "codeSnippet": "<Project Sdk=\"Microsoft.NET.Sdk\">\n\n  <PropertyGroup>\n    <TargetFramework>net8.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>\n  </PropertyGroup>\n\n  <!-- NuGet Third-Party Dependencies -->\n  <ItemGroup>\n    <PackageReference Include=\"FluentValidation\" Version=\"11.9.0\" />\n    <PackageReference Include=\"Serilog.AspNetCore\" Version=\"8.0.1\" />\n  </ItemGroup>\n\n  <!-- Project-to-Project References -->\n  <ItemGroup>\n    <ProjectReference Include=\"..EnterpriseApp.CoreEnterpriseApp.Core.csproj\" />\n  </ItemGroup>\n\n</Project>",
        "language": "xml",
        "output": "Configures compiler to net8.0 with null safety enabled and NuGet packages linked.",
        "lineExplanation": [
          "Line 4: TargetFramework net8.0 sets the runtime platform.",
          "Line 6: Nullable enable enforces C# nullable reference type compiler warnings.",
          "Line 12: PackageReference pulls third-party packages from nuget.org automatically during 'dotnet restore'."
        ]
      }
    ],
    "diagram": "NuGet Dependency Flow:\n[ NuGet Gallery (nuget.org) ]\n             |\n       (dotnet restore)\n             v\n[ Global NuGet Cache (~/.nuget/packages) ]\n             |\n             v\n[ Project Build Output (bin/Debug/net8.0/) ]",
    "realWorldApplication": "Integrating industry standards such as AutoMapper, Serilog, Entity Framework Core, and Moq into production software.",
    "commonErrors": [
      {
        "error": "NU1107: Version conflict detected for package",
        "cause": "Two referenced libraries depend on conflicting, incompatible versions of a shared package.",
        "fix": "Explicitly reference the higher compatible package version in your main .csproj to resolve the dependency graph."
      }
    ],
    "bestPractices": [
      "Enable <Nullable>enable</Nullable> across all projects to catch null reference bugs at compile time.",
      "Run 'dotnet list package --vulnerable' regularly in CI/CD pipelines to audit security CVEs.",
      "Pin major package versions to prevent breaking changes during automated builds."
    ],
    "practiceQuestions": [
      {
        "question": "Where are third-party NuGet package references declared in modern .NET projects?",
        "options": [
          "packages.config",
          "In the project .csproj file inside <PackageReference> tags",
          "In appsettings.json",
          "In Program.cs"
        ],
        "answerIndex": 1,
        "explanation": "Modern SDK-style projects declare dependencies directly in the .csproj file using <PackageReference> items."
      }
    ],
    "revisionSummary": [
      "NuGet is the .NET package ecosystem.",
      ".csproj files cleanly organize project references and target frameworks.",
      "Auditing packages prevents security CVE vulnerabilities."
    ],
    "references": [
      {
        "title": "NuGet Package Manager Guide - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/nuget/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-2-6": {
    "id": "topic-2-6",
    "title": "File Handling & Serialization",
    "category": "2. Modern C# & .NET",
    "description": "File I/O; streams; JSON serialization (System.Text.Json); XML awareness",
    "objectives": [
      "Perform high-performance asynchronous file reading and writing using File and FileStream",
      "Serialize and deserialize C# objects to and from JSON using modern System.Text.Json",
      "Configure JsonSerializerOptions for camelCase naming, indentation, and enum converters",
      "Understand memory allocation overhead of streams vs buffered strings"
    ],
    "prerequisites": "IDisposable (Topic 1-11) and async/await (Topic 2-2).",
    "terminology": [
      {
        "term": "Serialization",
        "definition": "Converting an in-memory C# object into a transportable format (such as a UTF-8 JSON string or byte array)."
      },
      {
        "term": "Deserialization",
        "definition": "Reconstructing a C# object graph from a JSON string or byte stream."
      },
      {
        "term": "System.Text.Json",
        "definition": "The built-in, high-performance, low-allocation JSON library in modern .NET, replacing legacy Newtonsoft.Json."
      }
    ],
    "concepts": [
      {
        "title": "High-Performance JSON Serialization with System.Text.Json",
        "explanation": "System.Text.Json is optimized for high-throughput cloud services, working directly with UTF-8 byte spans to minimize Garbage Collection overhead.",
        "codeSnippet": "using System.Text.Json;\nusing System.Text.Json.Serialization;\n\npublic class ConfigurationService\n{\n    private static readonly JsonSerializerOptions Options = new()\n    {\n        PropertyNamingPolicy = JsonNamingPolicy.CamelCase, // Outputs \"userEmail\" instead of \"UserEmail\"\n        WriteIndented = true, // Pretty print\n        Converters = { new JsonStringEnumConverter() } // Writes enums as strings (\"Admin\") instead of integers (0)\n    };\n\n    public static async Task SaveSettingsAsync(AppSettings settings, string filePath)\n    {\n        using var stream = File.Create(filePath);\n        // Streams directly to disk without allocating huge intermediate strings!\n        await JsonSerializer.SerializeAsync(stream, settings, Options);\n    }\n\n    public static async Task<AppSettings?> LoadSettingsAsync(string filePath)\n    {\n        if (!File.Exists(filePath)) return null;\n        using var stream = File.OpenRead(filePath);\n        return await JsonSerializer.DeserializeAsync<AppSettings>(stream, Options);\n    }\n}\n\npublic record AppSettings(string AppName, int TimeoutSeconds, AppEnvironment Environment);\npublic enum AppEnvironment { Development, Staging, Production }",
        "language": "csharp",
        "output": "Directly reads/writes formatted JSON stream to disk with zero redundant string allocations.",
        "lineExplanation": [
          "Line 5: Cache 'JsonSerializerOptions' in a static field; creating options repeatedly causes performance degradation.",
          "Line 17: 'SerializeAsync' streams bytes directly to disk rather than building a massive string in memory.",
          "Line 24: 'DeserializeAsync' safely parses JSON directly from the input stream."
        ]
      }
    ],
    "diagram": "Stream-Based Serialization Pipeline:\n[ In-Memory C# Object ]\n          |\n  (JsonSerializer.SerializeAsync)\n          |\n[ UTF-8 Byte Stream ] ====> Directly flushed to [ Disk File (appsettings.json) ]",
    "realWorldApplication": "All ASP.NET Core HTTP controllers use System.Text.Json to serialize incoming and outgoing REST API request and response bodies.",
    "commonErrors": [
      {
        "error": "Instantiating 'new JsonSerializerOptions()' on every request",
        "cause": "Rebuilding serializer metadata repeatedly creates severe CPU spikes and memory allocations.",
        "fix": "Reuse a single static readonly JsonSerializerOptions instance across the application."
      }
    ],
    "bestPractices": [
      "Always stream large files (>1MB) using FileStream and async APIs instead of File.ReadAllText().",
      "Reuse JsonSerializerOptions instances across the entire application.",
      "Prefer System.Text.Json over third-party serializers for new .NET projects."
    ],
    "practiceQuestions": [
      {
        "question": "Why should JsonSerializerOptions instances be stored in a static readonly variable rather than created per-operation?",
        "options": [
          "System.Text.Json will throw an exception if created more than once.",
          "Creating options creates an internal metadata cache; recreating it on every call causes CPU and memory churn.",
          "It makes private properties accessible.",
          "Static options are required by Linux."
        ],
        "answerIndex": 1,
        "explanation": "JsonSerializerOptions caches type reflection metadata. Recreating it on every call wastes CPU and allocations."
      }
    ],
    "revisionSummary": [
      "System.Text.Json is the built-in, low-allocation standard for JSON.",
      "Stream large files with FileStream to avoid high memory spikes.",
      "Use JsonNamingPolicy.CamelCase to match web frontend conventions."
    ],
    "references": [
      {
        "title": "JSON serialization in .NET - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/overview",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-2-7": {
    "id": "topic-2-7",
    "title": "Configuration & Options Pattern",
    "category": "2. Modern C# & .NET",
    "description": "appsettings.json; environment-based config; options pattern; user secrets",
    "objectives": [
      "Structure multi-environment configuration (Development, Staging, Production)",
      "Manage developer credentials securely using .NET User Secrets (Secret Manager)",
      "Implement strongly-typed configuration using the IOptions<T> pattern",
      "Understand configuration cascading priority (appsettings.json < Environment Variables < Command Line)"
    ],
    "prerequisites": "JSON Serialization (Topic 2-6) and Dependency Injection basics.",
    "terminology": [
      {
        "term": "Options Pattern",
        "definition": "A .NET pattern that binds configuration sections to strongly-typed C# classes via Dependency Injection (IOptions<T>, IOptionsSnapshot<T>)."
      },
      {
        "term": "User Secrets",
        "definition": "A developer tool that stores connection strings and API keys outside the project directory, preventing accidental Git commits."
      },
      {
        "term": "Configuration Hierarchy",
        "definition": "The order in which configuration providers override values (e.g. environment variables override appsettings.json)."
      }
    ],
    "concepts": [
      {
        "title": "The Strongly-Typed Options Pattern",
        "explanation": "Instead of querying raw configuration strings throughout your codebase, the Options pattern maps JSON sections into validated POCO classes.",
        "codeSnippet": "// 1. appsettings.json:\n// {\n//   \"SmtpSettings\": {\n//     \"Host\": \"smtp.mailgun.org\",\n//     \"Port\": 587,\n//     \"EnableSsl\": true\n//   }\n// }\n\n// 2. Strongly-Typed Class\npublic class SmtpSettings\n{\n    public const string SectionName = \"SmtpSettings\";\n    public string Host { get; set; } = string.Empty;\n    public int Port { get; set; }\n    public bool EnableSsl { get; set; }\n}\n\n// 3. Registering in Program.cs:\n// builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection(SmtpSettings.SectionName));\n\n// 4. Injecting into a service\npublic class EmailNotificationSender\n{\n    private readonly SmtpSettings _settings;\n\n    public EmailNotificationSender(Microsoft.Extensions.Options.IOptions<SmtpSettings> options)\n    {\n        _settings = options.Value;\n    }\n\n    public void Send()\n    {\n        Console.WriteLine($\"Connected to SMTP Host {_settings.Host}:{_settings.Port} (SSL: {_settings.EnableSsl})\");\n    }\n}",
        "language": "csharp",
        "output": "Connected to SMTP Host smtp.mailgun.org:587 (SSL: True)",
        "lineExplanation": [
          "Line 11: POCO class mirrors the JSON schema cleanly.",
          "Line 24: IOptions<SmtpSettings> is injected via the built-in DI container.",
          "Line 26: options.Value provides strongly-typed, compile-time verified configuration."
        ]
      }
    ],
    "diagram": "Configuration Priority (Lowest to Highest):\n[ appsettings.json ]\n        v (Overridden by)\n[ appsettings.{Environment}.json ]\n        v (Overridden by)\n[ User Secrets (Local Dev only) ]\n        v (Overridden by)\n[ Environment Variables (Production Container) ]\n        v (Overridden by)\n[ Command-Line Arguments ]",
    "realWorldApplication": "Storing database connection strings, JWT signing keys, and external payment tokens safely across local developer laptops and cloud deployment containers.",
    "commonErrors": [
      {
        "error": "Committing database passwords or API keys to GitHub in appsettings.json",
        "cause": "Hardcoding sensitive credentials in source-controlled files.",
        "fix": "Use 'dotnet user-secrets' locally and Environment Variables in cloud production."
      }
    ],
    "bestPractices": [
      "Never commit secrets to source control. Add appsettings.Development.json passwords to .gitignore or use User Secrets.",
      "Use IOptionsSnapshot<T> if you need configuration reloaded dynamically when files change without restarting the server.",
      "Validate options on startup with .ValidateDataAnnotations()."
    ],
    "practiceQuestions": [
      {
        "question": "Where are .NET User Secrets stored on a developer's machine?",
        "options": [
          "In the bin folder of the project.",
          "Outside the repository in the user's OS profile folder, completely detached from Git.",
          "In appsettings.Production.json.",
          "In a hidden branch in Git."
        ],
        "answerIndex": 1,
        "explanation": "User Secrets are stored in the local user profile folder (e.g. %APPDATA%/Microsoft/UserSecrets/) so they can never be accidentally committed to Git."
      }
    ],
    "revisionSummary": [
      "The Options pattern maps configuration sections to strongly-typed classes.",
      "Environment variables override appsettings.json for flexible cloud deployments.",
      "Use User Secrets for secure local development."
    ],
    "references": [
      {
        "title": "Configuration in ASP.NET Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/",
        "source": "Microsoft Learn"
      },
      {
        "title": "Options pattern in .NET - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/extensions/options",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-2-8": {
    "id": "topic-2-8",
    "title": "AI Integration in Modern C# & .NET",
    "category": "2. Modern C# & .NET",
    "description": "Generating LINQ queries and async code with Copilot; validating AI-generated async patterns for correctness",
    "objectives": [
      "Direct AI to generate complex multi-table LINQ queries, projections, and grouping",
      "Critically detect AI async antipatterns (sync-over-async, missing CancellationTokens)",
      "Audit generated System.Text.Json converters and Options pattern bindings",
      "Formulate precise prompts for testing asynchronous edge cases"
    ],
    "prerequisites": "LINQ (Topic 2-1), Async/Await (Topic 2-2), and AI Prompting (Topic 1-12).",
    "terminology": [
      {
        "term": "Sync-over-Async Hazard",
        "definition": "When AI generates code calling .Result or .Wait() inside an async method, creating severe deadlock potential."
      }
    ],
    "concepts": [
      {
        "title": "Auditing AI-Generated Async and LINQ Code",
        "explanation": "AI often produces syntactically valid async code that contains hidden concurrency or double-enumeration traps.",
        "codeSnippet": "// FLAWED AI OUTPUT:\n// public async Task<int> GetCount() {\n//     var data = await _service.GetDataAsync();\n//     return data.Count(); // FLAW: If data is IEnumerable, may trigger double-enumeration!\n// }\n\n// CORRECTED BY ENGINEER:\npublic async Task<int> GetCountAsync(CancellationToken ct = default)\n{\n    // Pass cancellation token through and materialize once\n    IReadOnlyList<Record> items = await _service.GetDataAsync(ct);\n    return items.Count; // Instant O(1) property check without re-enumeration\n}",
        "language": "csharp",
        "output": "Engineered code with proper naming, token propagation, and zero double-enumeration.",
        "lineExplanation": [
          "Line 8: Appended 'Async' to follow .NET conventions.",
          "Line 11: Propagates CancellationToken and operates on IReadOnlyList rather than raw IEnumerable."
        ]
      }
    ],
    "diagram": "AI Review Checklist for Modern C#:\n1. Are async methods named with 'Async' suffix?\n2. Is CancellationToken accepted and passed to all I/O calls?\n3. Are there any .Result or .Wait() calls? (ELIMINATE THEM)\n4. Does LINQ double-enumerate? (Use .ToList() once)\n5. Is JsonSerializerOptions cached statically?",
    "realWorldApplication": "Validating high-speed microservice pipelines and ensuring background queue processors do not leak database connections.",
    "commonErrors": [
      {
        "error": "Accepting AI code that omits CancellationToken parameters",
        "cause": "If a client disconnects, the server continues wasting CPU and database resources on abandoned queries.",
        "fix": "Instruct AI: 'Include CancellationToken on all async methods and pass it down'."
      }
    ],
    "bestPractices": [
      "Always inspect generated LINQ queries for N+1 database hazards.",
      "Check that AI-generated async code does not mix .Result or .GetAwaiter().GetResult().",
      "Benchmark AI-suggested algorithms with BenchmarkDotNet for mission-critical hot paths."
    ],
    "practiceQuestions": [
      {
        "question": "When AI suggests calling 'Task.Run(() => LongRunningIO())' inside an ASP.NET Core API controller, why is this an antipattern?",
        "options": [
          "Task.Run is deprecated.",
          "It takes a thread from the web server thread pool to do nothing but wait for I/O, reducing web server request throughput.",
          "It causes compilation errors on Linux.",
          "Controllers cannot use Task.Run."
        ],
        "answerIndex": 1,
        "explanation": "In ASP.NET Core, offloading I/O to Task.Run wastes a thread pool worker for no benefit. Pure async/await should be used instead."
      }
    ],
    "revisionSummary": [
      "AI accelerates complex LINQ queries and async methods.",
      "Always verify that CancellationTokens are forwarded and .Result is never called.",
      "Avoid double enumeration on generated LINQ pipelines."
    ],
    "references": [
      {
        "title": "Async Guidance in .NET - David Fowler",
        "url": "https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AsyncGuidance.md",
        "source": "GitHub / Microsoft"
      }
    ]
  }
};
