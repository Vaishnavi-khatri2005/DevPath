import fs from 'fs';

// Helper to write module file
function writeModule(filename, varName, lessons) {
  const content = `/**
 * Pre-generated comprehensive lessons for ${varName}
 * Sources: Microsoft Learn, official documentation, practical industry patterns.
 */

export const ${varName} = ${JSON.stringify(lessons, null, 2)};
`;
  fs.writeFileSync(`src/data/lessons/${filename}`, content);
  console.log(`Generated src/data/lessons/${filename} (${Object.keys(lessons).length} topics)`);
}

// (Import Module 1 as previously written or redefine cleanly)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// -------------------------------------------------------------
// MODULE 2: Modern C# & .NET (8 topics)
// -------------------------------------------------------------
const m2 = {
  "topic-2-1": {
    id: "topic-2-1",
    title: "LINQ (Language Integrated Query)",
    category: "2. Modern C# & .NET",
    description: "Query syntax & method syntax; filtering, projection, aggregation; deferred execution; LINQ to Objects",
    objectives: [
      "Master LINQ method syntax (Select, Where, OrderBy, GroupBy) and query syntax",
      "Understand deferred execution vs immediate execution (.ToList(), .ToArray())",
      "Perform aggregation calculations with Count, Sum, Average, Min, and Max",
      "Avoid the double-enumeration performance hazard"
    ],
    prerequisites: "Delegates, lambdas, and IEnumerable<T> (Topics 1-8 and 1-10).",
    terminology: [
      { term: "LINQ", definition: "Language Integrated Query; a declarative syntax built into C# for querying collections, databases, and XML." },
      { term: "Deferred Execution", definition: "The query evaluation is delayed until the collection is actually enumerated (e.g. inside a foreach loop or .ToList())." },
      { term: "Projection (Select)", definition: "Transforming elements of a collection into a new shape or type (e.g. mapping an Entity to a DTO)." }
    ],
    concepts: [
      {
        title: "Method Syntax and Deferred Execution",
        explanation: "LINQ operations are divided into non-terminal operations (Where, Select) which are deferred, and terminal operations (ToList, Count, FirstOrDefault) which immediately execute.",
        codeSnippet: `var employees = new List<Employee>
{
    new(1, "Sarah", "Engineering", 115000),
    new(2, "David", "Marketing", 85000),
    new(3, "Alex", "Engineering", 125000),
    new(4, "Maria", "Finance", 95000)
};

// Method syntax with filtering, ordering, and projection
var topEngineers = employees
    .Where(e => e.Department == "Engineering")
    .OrderByDescending(e => e.Salary)
    .Select(e => new { e.Name, e.Salary })
    .ToList(); // Immediate execution happens here!

foreach (var eng in topEngineers)
{
    Console.WriteLine($"{eng.Name}: {eng.Salary:C}");
}

// Aggregation: Average salary in Engineering
var avgEngSalary = employees
    .Where(e => e.Department == "Engineering")
    .Average(e => e.Salary);

Console.WriteLine($"Average Engineering Salary: {avgEngSalary:C}");

record Employee(int Id, string Name, string Department, decimal Salary);`,
        language: "csharp",
        output: "Alex: $125,000.00\nSarah: $115,000.00\nAverage Engineering Salary: $120,000.00",
        lineExplanation: [
          "Line 11: Where filters the stream by Department == 'Engineering'.",
          "Line 13: Select projects each Employee object into an anonymous type containing only Name and Salary.",
          "Line 14: .ToList() triggers immediate execution of the query and allocates the memory list."
        ]
      }
    ],
    diagram: `Deferred vs Immediate Execution:
var query = list.Where(...) // Query constructed, ZERO processing done yet!
        |
        +---> foreach (var x in query) ---> Iterates item by item as needed
        |
        +---> query.ToList() -------------> Executes completely right now into List<T>`,
    realWorldApplication: "Filtering and sorting customer databases, computing reporting metrics, and projecting database tables directly into API response models in Entity Framework.",
    commonErrors: [
      {
        error: "Multiple enumeration of IEnumerable (double-enumeration warning)",
        cause: "Calling .Count() on an IEnumerable and then calling foreach on the same query causes the underlying database or filter logic to re-run twice.",
        fix: "Materialize the query using .ToList() before checking count and iterating."
      }
    ],
    bestPractices: [
      "Prefer method syntax (.Where(), .Select()) over SQL-like query syntax as it aligns with standard C# method chaining.",
      "Use FirstOrDefault() instead of First() when an item might not exist to prevent InvalidOperationException.",
      "Materialize queries with .ToList() before returning from service methods to avoid deferred database query leaks."
    ],
    practiceQuestions: [
      {
        question: "Which of the following LINQ methods forces immediate execution?",
        options: ["Where()", "Select()", "OrderBy()", "ToList()"],
        answerIndex: 3,
        explanation: "ToList() is a terminal method that immediately enumerates the query and stores results in a List."
      }
    ],
    revisionSummary: [
      "LINQ brings declarative, SQL-like querying directly into C#.",
      "Deferred execution saves resources by executing only when enumerated.",
      "Use terminal operators (.ToList(), .First()) to materialize data."
    ],
    references: [
      { title: "LINQ Overview - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/linq/", source: "Microsoft Learn" }
    ]
  },

  "topic-2-2": {
    id: "topic-2-2",
    title: "Asynchronous Programming",
    category: "2. Modern C# & .NET",
    description: "async/await; Task & Task<T>; when to use async; common pitfalls (deadlocks, fire-and-forget)",
    objectives: [
      "Master the async and await keywords for non-blocking I/O operations",
      "Understand Task and Task<TResult> as promises of future completion",
      "Avoid thread pool starvation, deadlocks (.Result / .Wait()), and fire-and-forget traps",
      "Apply cancellation tokens (CancellationToken) for responsive request termination"
    ],
    prerequisites: "Methods, delegates, and threading concepts.",
    terminology: [
      { term: "async/await", definition: "Language keywords that transform a method into a state machine, yielding control back to the thread pool while awaiting asynchronous I/O." },
      { term: "Thread Pool Starvation", definition: "A condition where all worker threads are blocked synchronously waiting for async tasks, freezing application throughput." },
      { term: "CancellationToken", definition: "A struct passed through async call stacks to signal that an operation should be cancelled before completing." }
    ],
    concepts: [
      {
        title: "Writing Scalable Async Code with async/await",
        explanation: "In web servers (ASP.NET Core), asynchronous programming does not make a single request run faster; instead, it prevents blocking threads, allowing one server to handle thousands of concurrent requests.",
        codeSnippet: `using System.Net.Http.Json;

public class WeatherService
{
    private readonly HttpClient _httpClient;

    public WeatherService(HttpClient httpClient) => _httpClient = httpClient;

    // Asynchronous method returning Task<T>
    public async Task<WeatherForecast?> GetForecastAsync(string city, CancellationToken ct = default)
    {
        string url = $"https://api.weather.com/v1/{city}";
        
        // Non-blocking await yields thread to pool while awaiting socket response
        var response = await _httpClient.GetFromJsonAsync<WeatherForecast>(url, ct);
        return response;
    }
}

public record WeatherForecast(string City, int TemperatureC, string Summary);`,
        language: "csharp",
        output: "Yields thread pool worker during socket transmission, returning upon packet arrival.",
        lineExplanation: [
          "Line 8: 'async Task<WeatherForecast?>' declares an asynchronous method.",
          "Line 13: 'await _httpClient.GetFromJsonAsync' pauses execution without blocking the OS thread.",
          "Line 13: Passing 'CancellationToken ct' ensures the network call terminates immediately if the user cancels or closes their browser."
        ]
      }
    ],
    diagram: `Synchronous (Blocking) vs Asynchronous:
Sync:  [Thread 1] === Waiting for Database (Idle, Locked) ===> Resume
Async: [Thread 1] --- Dispatches I/O ---> [Thread 1 free for other users!]
                                          ... I/O completes ...
                                          [Any Free Thread] Resumes Execution`,
    realWorldApplication: "All web API database queries, external payment gateway calls, and cloud blob uploads must be async to sustain high traffic without crashing the server.",
    commonErrors: [
      {
        error: "Calling .Result or .Wait() on an asynchronous Task (Sync-over-Async)",
        cause: "Blocks the current thread until the task completes, causing deadlocks in synchronization contexts and starvation in ASP.NET Core.",
        fix: "Always use 'await' all the way up the call stack."
      },
      {
        error: "Writing 'async void' methods (except for GUI event handlers)",
        cause: "Exceptions thrown inside an 'async void' method cannot be caught by callers and will crash the process.",
        fix: "Always return 'Task' or 'Task<T>' from async methods."
      }
    ],
    bestPractices: [
      "Always append 'Async' to asynchronous method names (e.g. SaveChangesAsync).",
      "Pass CancellationToken down through all asynchronous I/O methods.",
      "Never use .Result or .Wait(); await all the way."
    ],
    practiceQuestions: [
      {
        question: "Why is 'async void' dangerous in C# backend applications?",
        options: [
          "It allocates extra heap memory.",
          "Exceptions cannot be caught by callers and can terminate the entire application process.",
          "It forces code to run on a single thread.",
          "It is not allowed by the compiler."
        ],
        answerIndex: 1,
        explanation: "Exceptions in 'async void' methods bypass caller catch blocks and crash the process. Always return Task instead."
      }
    ],
    revisionSummary: [
      "async/await frees threads during I/O for massive scalability.",
      "Never block with .Result or .Wait().",
      "Pass CancellationToken to support clean, prompt cancellations."
    ],
    references: [
      { title: "Asynchronous programming with async and await - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/", source: "Microsoft Learn" }
    ]
  },

  "topic-2-3": {
    id: "topic-2-3",
    title: "Extension Methods",
    category: "2. Modern C# & .NET",
    description: "Creating & using extension methods; method chaining patterns",
    objectives: [
      "Define static classes and static methods using the 'this' parameter modifier",
      "Extend existing types (string, DateTime, collections) without inheritance or modifying source code",
      "Build fluent method chaining APIs (Fluent Interfaces)",
      "Understand namespace discovery rules for extension methods"
    ],
    prerequisites: "Static classes and methods (Topics 1-3 and 1-4).",
    terminology: [
      { term: "Extension Method", definition: "A static method that can be called as though it were an instance method on the extended type using fluent dot-syntax." },
      { term: "this Parameter Modifier", definition: "The first parameter of an extension method marked with 'this', designating the type being extended." }
    ],
    concepts: [
      {
        title: "Authoring Practical Extension Methods",
        explanation: "Extension methods allow adding methods to classes you do not own (like System.String or IEnumerable<T>).",
        codeSnippet: `// Must be inside a static class
public static class StringExtensions
{
    // First parameter has 'this' modifier
    public static bool IsValidEmail(this string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        return email.Contains('@') && email.Contains('.');
    }

    public static string ToSlug(this string text)
    {
        return text.Trim().ToLower().Replace(" ", "-");
    }
}

// Usage at call site:
string userEmail = "dev@fullstack.org";
if (userEmail.IsValidEmail()) // Invoked as if it were a native method of string!
{
    Console.WriteLine("Valid email.");
}

string postTitle = "Learn Modern C Sharp 12";
Console.WriteLine($"URL Slug: {postTitle.ToSlug()}");`,
        language: "csharp",
        output: "Valid email.\nURL Slug: learn-modern-c-sharp-12",
        lineExplanation: [
          "Line 2: The containing class must be 'public static class'.",
          "Line 5: 'this string email' makes IsValidEmail available on any string instance in files that import this namespace.",
          "Line 17: Called via standard dot syntax: userEmail.IsValidEmail()."
        ]
      }
    ],
    diagram: `Extension Method Resolution:
Source Code: userEmail.IsValidEmail()
                    |
Compiler rewrites to: StringExtensions.IsValidEmail(userEmail)`,
    realWorldApplication: "LINQ is entirely built upon extension methods on IEnumerable<T>. ASP.NET Core middleware registration (app.UseSwagger(), app.UseAuthentication()) uses extension methods on IApplicationBuilder.",
    commonErrors: [
      {
        error: "Extension method not appearing in IntelliSense",
        cause: "The namespace containing the static extension class has not been imported via a 'using' statement.",
        fix: "Add the 'using YourNamespace;' directive at the top of the file."
      }
    ],
    bestPractices: [
      "Do not pollute universal types like System.Object with broad extension methods.",
      "Check for null arguments inside extension methods defensively.",
      "Group related extension methods in a dedicated 'Extensions' namespace."
    ],
    practiceQuestions: [
      {
        question: "Where must an extension method be declared in C#?",
        options: [
          "Inside an abstract class.",
          "Inside a static class.",
          "Inside an interface.",
          "Directly in the Program.cs main method."
        ],
        answerIndex: 1,
        explanation: "Extension methods must be static methods declared inside a non-nested, non-generic static class."
      }
    ],
    revisionSummary: [
      "Extension methods augment existing types using 'this' on the first parameter.",
      "Enables fluent chaining and is the backbone of LINQ and ASP.NET Core builder APIs."
    ],
    references: [
      { title: "Extension Methods - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods", source: "Microsoft Learn" }
    ]
  },

  "topic-2-4": {
    id: "topic-2-4",
    title: ".NET Platform & Ecosystem",
    category: "2. Modern C# & .NET",
    description: ".NET 6/7/8 evolution; runtime, SDK, CLR; project structure; dotnet CLI",
    objectives: [
      "Understand the modern cross-platform .NET ecosystem (.NET 6, 7, 8 LTS)",
      "Distinguish between the .NET SDK (compiler, tools) and the .NET Runtime (CLR, JIT)",
      "Navigate standard .NET solution and .csproj project architectures",
      "Master essential dotnet CLI commands: new, build, run, test, publish"
    ],
    prerequisites: "Basic command line knowledge.",
    terminology: [
      { term: "Common Language Runtime (CLR)", definition: "The execution engine of .NET that handles JIT compilation, garbage collection, and exception management." },
      { term: "Just-In-Time (JIT) Compiler", definition: "Compiles platform-agnostic Intermediate Language (IL) bytecode into native CPU machine instructions at runtime." },
      { term: "Long Term Support (LTS)", definition: "Even-numbered .NET versions (.NET 6, .NET 8) that receive 3 years of official enterprise support and patches." }
    ],
    concepts: [
      {
        title: "The Modern .NET Architecture",
        explanation: ".NET is a unified, open-source, high-performance platform running on Windows, Linux, and macOS. C# source code compiles into Common Intermediate Language (CIL), packaged into DLL assemblies, and executed by the CLR.",
        codeSnippet: `# Essential dotnet CLI commands
# 1. Create a new multi-project solution
dotnet new sln -n EnterpriseApp

# 2. Create Web API and Class Library projects
dotnet new webapi -n EnterpriseApp.Api
dotnet new classlib -n EnterpriseApp.Core

# 3. Add projects to solution
dotnet sln add EnterpriseApp.Api
dotnet sln add EnterpriseApp.Core

# 4. Reference Core library in Web API
dotnet add EnterpriseApp.Api reference EnterpriseApp.Core

# 5. Build and Run
dotnet build
dotnet run --project EnterpriseApp.Api`,
        language: "bash",
        output: "Building... Successfully linked dependencies and started server on http://localhost:5000",
        lineExplanation: [
          "Line 3: Creates a top-level .sln file linking multiple projects together.",
          "Line 6-7: Uses official templates (webapi, classlib) to scaffold standardized folder structures.",
          "Line 14: Adds project-to-project reference in the .csproj XML file automatically."
        ]
      }
    ],
    diagram: `Compilation & Execution Pipeline:
[ C# Source Code (.cs) ]
           |
     (Roslyn Compiler)
           v
[ Intermediate Language (IL) Assembly (.dll) ]
           |
     (CLR + JIT Compiler at Runtime)
           v
[ Native Machine Code (x64 / ARM64) ]`,
    realWorldApplication: "Architecting clean multi-tier solutions: Web API presentation layer, Core Domain class library, and Infrastructure database layer.",
    commonErrors: [
      {
        error: "The specified SDK version could not be found",
        cause: "A global.json file specifies a .NET SDK version not installed on the machine.",
        fix: "Check installed SDKs with 'dotnet --info' and update global.json accordingly."
      }
    ],
    bestPractices: [
      "Target Long Term Support (LTS) releases like .NET 8 for production enterprise systems.",
      "Structure solutions using the Clean Architecture pattern (Domain, Application, Infrastructure, Presentation).",
      "Use 'dotnet format' to enforce consistent formatting across teams."
    ],
    practiceQuestions: [
      {
        question: "What is an LTS release in the .NET support lifecycle?",
        options: ["Limited Test Support", "Long Term Support (supported for 3 years)", "Legacy Tech Support", "Linux-only Technology Standard"],
        answerIndex: 1,
        explanation: "LTS stands for Long Term Support, providing 3 full years of guaranteed security patches and support."
      }
    ],
    revisionSummary: [
      ".NET is cross-platform and modular.",
      "The SDK builds code; the Runtime executes IL bytecode via JIT compilation.",
      "The dotnet CLI provides cross-platform build automation."
    ],
    references: [
      { title: ".NET Architectural Overview - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/core/introduction", source: "Microsoft Learn" }
    ]
  },

  "topic-2-5": {
    id: "topic-2-5",
    title: "NuGet & Assemblies",
    category: "2. Modern C# & .NET",
    description: "Package management; csproj & dependencies; assemblies; libraries",
    objectives: [
      "Manage external libraries using NuGet CLI and package manager",
      "Understand project dependencies in modern SDK-style .csproj files",
      "Distinguish between compile-time assemblies and runtime deployment outputs",
      "Detect and resolve package vulnerability warnings and version conflicts"
    ],
    prerequisites: ".NET platform basics and CLI.",
    terminology: [
      { term: "NuGet", definition: "The official package manager for .NET that hosts hundreds of thousands of open-source and enterprise libraries." },
      { term: "Assembly", definition: "A compiled code library (.dll or .exe) containing CIL bytecode and metadata describing types and versioning." },
      { term: "PackageReference", definition: "XML tag in .csproj defining third-party package dependencies and their exact versions." }
    ],
    concepts: [
      {
        title: "Managing Dependencies in .csproj",
        explanation: "Modern .NET uses lean SDK-style .csproj files where dependencies and target frameworks are specified cleanly.",
        codeSnippet: `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>

  <!-- NuGet Third-Party Dependencies -->
  <ItemGroup>
    <PackageReference Include="FluentValidation" Version="11.9.0" />
    <PackageReference Include="Serilog.AspNetCore" Version="8.0.1" />
  </ItemGroup>

  <!-- Project-to-Project References -->
  <ItemGroup>
    <ProjectReference Include="..\EnterpriseApp.Core\EnterpriseApp.Core.csproj" />
  </ItemGroup>

</Project>`,
        language: "xml",
        output: "Configures compiler to net8.0 with null safety enabled and NuGet packages linked.",
        lineExplanation: [
          "Line 4: TargetFramework net8.0 sets the runtime platform.",
          "Line 6: Nullable enable enforces C# nullable reference type compiler warnings.",
          "Line 12: PackageReference pulls third-party packages from nuget.org automatically during 'dotnet restore'."
        ]
      }
    ],
    diagram: `NuGet Dependency Flow:
[ NuGet Gallery (nuget.org) ]
             |
       (dotnet restore)
             v
[ Global NuGet Cache (~/.nuget/packages) ]
             |
             v
[ Project Build Output (bin/Debug/net8.0/) ]`,
    realWorldApplication: "Integrating industry standards such as AutoMapper, Serilog, Entity Framework Core, and Moq into production software.",
    commonErrors: [
      {
        error: "NU1107: Version conflict detected for package",
        cause: "Two referenced libraries depend on conflicting, incompatible versions of a shared package.",
        fix: "Explicitly reference the higher compatible package version in your main .csproj to resolve the dependency graph."
      }
    ],
    bestPractices: [
      "Enable <Nullable>enable</Nullable> across all projects to catch null reference bugs at compile time.",
      "Run 'dotnet list package --vulnerable' regularly in CI/CD pipelines to audit security CVEs.",
      "Pin major package versions to prevent breaking changes during automated builds."
    ],
    practiceQuestions: [
      {
        question: "Where are third-party NuGet package references declared in modern .NET projects?",
        options: ["packages.config", "In the project .csproj file inside <PackageReference> tags", "In appsettings.json", "In Program.cs"],
        answerIndex: 1,
        explanation: "Modern SDK-style projects declare dependencies directly in the .csproj file using <PackageReference> items."
      }
    ],
    revisionSummary: [
      "NuGet is the .NET package ecosystem.",
      ".csproj files cleanly organize project references and target frameworks.",
      "Auditing packages prevents security CVE vulnerabilities."
    ],
    references: [
      { title: "NuGet Package Manager Guide - Microsoft Learn", url: "https://learn.microsoft.com/en-us/nuget/", source: "Microsoft Learn" }
    ]
  },

  "topic-2-6": {
    id: "topic-2-6",
    title: "File Handling & Serialization",
    category: "2. Modern C# & .NET",
    description: "File I/O; streams; JSON serialization (System.Text.Json); XML awareness",
    objectives: [
      "Perform high-performance asynchronous file reading and writing using File and FileStream",
      "Serialize and deserialize C# objects to and from JSON using modern System.Text.Json",
      "Configure JsonSerializerOptions for camelCase naming, indentation, and enum converters",
      "Understand memory allocation overhead of streams vs buffered strings"
    ],
    prerequisites: "IDisposable (Topic 1-11) and async/await (Topic 2-2).",
    terminology: [
      { term: "Serialization", definition: "Converting an in-memory C# object into a transportable format (such as a UTF-8 JSON string or byte array)." },
      { term: "Deserialization", definition: "Reconstructing a C# object graph from a JSON string or byte stream." },
      { term: "System.Text.Json", definition: "The built-in, high-performance, low-allocation JSON library in modern .NET, replacing legacy Newtonsoft.Json." }
    ],
    concepts: [
      {
        title: "High-Performance JSON Serialization with System.Text.Json",
        explanation: "System.Text.Json is optimized for high-throughput cloud services, working directly with UTF-8 byte spans to minimize Garbage Collection overhead.",
        codeSnippet: `using System.Text.Json;
using System.Text.Json.Serialization;

public class ConfigurationService
{
    private static readonly JsonSerializerOptions Options = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase, // Outputs "userEmail" instead of "UserEmail"
        WriteIndented = true, // Pretty print
        Converters = { new JsonStringEnumConverter() } // Writes enums as strings ("Admin") instead of integers (0)
    };

    public static async Task SaveSettingsAsync(AppSettings settings, string filePath)
    {
        using var stream = File.Create(filePath);
        // Streams directly to disk without allocating huge intermediate strings!
        await JsonSerializer.SerializeAsync(stream, settings, Options);
    }

    public static async Task<AppSettings?> LoadSettingsAsync(string filePath)
    {
        if (!File.Exists(filePath)) return null;
        using var stream = File.OpenRead(filePath);
        return await JsonSerializer.DeserializeAsync<AppSettings>(stream, Options);
    }
}

public record AppSettings(string AppName, int TimeoutSeconds, AppEnvironment Environment);
public enum AppEnvironment { Development, Staging, Production }`,
        language: "csharp",
        output: "Directly reads/writes formatted JSON stream to disk with zero redundant string allocations.",
        lineExplanation: [
          "Line 5: Cache 'JsonSerializerOptions' in a static field; creating options repeatedly causes performance degradation.",
          "Line 17: 'SerializeAsync' streams bytes directly to disk rather than building a massive string in memory.",
          "Line 24: 'DeserializeAsync' safely parses JSON directly from the input stream."
        ]
      }
    ],
    diagram: `Stream-Based Serialization Pipeline:
[ In-Memory C# Object ]
          |
  (JsonSerializer.SerializeAsync)
          |
[ UTF-8 Byte Stream ] ====> Directly flushed to [ Disk File (appsettings.json) ]`,
    realWorldApplication: "All ASP.NET Core HTTP controllers use System.Text.Json to serialize incoming and outgoing REST API request and response bodies.",
    commonErrors: [
      {
        error: "Instantiating 'new JsonSerializerOptions()' on every request",
        cause: "Rebuilding serializer metadata repeatedly creates severe CPU spikes and memory allocations.",
        fix: "Reuse a single static readonly JsonSerializerOptions instance across the application."
      }
    ],
    bestPractices: [
      "Always stream large files (>1MB) using FileStream and async APIs instead of File.ReadAllText().",
      "Reuse JsonSerializerOptions instances across the entire application.",
      "Prefer System.Text.Json over third-party serializers for new .NET projects."
    ],
    practiceQuestions: [
      {
        question: "Why should JsonSerializerOptions instances be stored in a static readonly variable rather than created per-operation?",
        options: [
          "System.Text.Json will throw an exception if created more than once.",
          "Creating options creates an internal metadata cache; recreating it on every call causes CPU and memory churn.",
          "It makes private properties accessible.",
          "Static options are required by Linux."
        ],
        answerIndex: 1,
        explanation: "JsonSerializerOptions caches type reflection metadata. Recreating it on every call wastes CPU and allocations."
      }
    ],
    revisionSummary: [
      "System.Text.Json is the built-in, low-allocation standard for JSON.",
      "Stream large files with FileStream to avoid high memory spikes.",
      "Use JsonNamingPolicy.CamelCase to match web frontend conventions."
    ],
    references: [
      { title: "JSON serialization in .NET - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/overview", source: "Microsoft Learn" }
    ]
  },

  "topic-2-7": {
    id: "topic-2-7",
    title: "Configuration & Options Pattern",
    category: "2. Modern C# & .NET",
    description: "appsettings.json; environment-based config; options pattern; user secrets",
    objectives: [
      "Structure multi-environment configuration (Development, Staging, Production)",
      "Manage developer credentials securely using .NET User Secrets (Secret Manager)",
      "Implement strongly-typed configuration using the IOptions<T> pattern",
      "Understand configuration cascading priority (appsettings.json < Environment Variables < Command Line)"
    ],
    prerequisites: "JSON Serialization (Topic 2-6) and Dependency Injection basics.",
    terminology: [
      { term: "Options Pattern", definition: "A .NET pattern that binds configuration sections to strongly-typed C# classes via Dependency Injection (IOptions<T>, IOptionsSnapshot<T>)." },
      { term: "User Secrets", definition: "A developer tool that stores connection strings and API keys outside the project directory, preventing accidental Git commits." },
      { term: "Configuration Hierarchy", definition: "The order in which configuration providers override values (e.g. environment variables override appsettings.json)." }
    ],
    concepts: [
      {
        title: "The Strongly-Typed Options Pattern",
        explanation: "Instead of querying raw configuration strings throughout your codebase, the Options pattern maps JSON sections into validated POCO classes.",
        codeSnippet: `// 1. appsettings.json:
// {
//   "SmtpSettings": {
//     "Host": "smtp.mailgun.org",
//     "Port": 587,
//     "EnableSsl": true
//   }
// }

// 2. Strongly-Typed Class
public class SmtpSettings
{
    public const string SectionName = "SmtpSettings";
    public string Host { get; set; } = string.Empty;
    public int Port { get; set; }
    public bool EnableSsl { get; set; }
}

// 3. Registering in Program.cs:
// builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection(SmtpSettings.SectionName));

// 4. Injecting into a service
public class EmailNotificationSender
{
    private readonly SmtpSettings _settings;

    public EmailNotificationSender(Microsoft.Extensions.Options.IOptions<SmtpSettings> options)
    {
        _settings = options.Value;
    }

    public void Send()
    {
        Console.WriteLine($"Connected to SMTP Host {_settings.Host}:{_settings.Port} (SSL: {_settings.EnableSsl})");
    }
}`,
        language: "csharp",
        output: "Connected to SMTP Host smtp.mailgun.org:587 (SSL: True)",
        lineExplanation: [
          "Line 11: POCO class mirrors the JSON schema cleanly.",
          "Line 24: IOptions<SmtpSettings> is injected via the built-in DI container.",
          "Line 26: options.Value provides strongly-typed, compile-time verified configuration."
        ]
      }
    ],
    diagram: `Configuration Priority (Lowest to Highest):
[ appsettings.json ]
        v (Overridden by)
[ appsettings.{Environment}.json ]
        v (Overridden by)
[ User Secrets (Local Dev only) ]
        v (Overridden by)
[ Environment Variables (Production Container) ]
        v (Overridden by)
[ Command-Line Arguments ]`,
    realWorldApplication: "Storing database connection strings, JWT signing keys, and external payment tokens safely across local developer laptops and cloud deployment containers.",
    commonErrors: [
      {
        error: "Committing database passwords or API keys to GitHub in appsettings.json",
        cause: "Hardcoding sensitive credentials in source-controlled files.",
        fix: "Use 'dotnet user-secrets' locally and Environment Variables in cloud production."
      }
    ],
    bestPractices: [
      "Never commit secrets to source control. Add appsettings.Development.json passwords to .gitignore or use User Secrets.",
      "Use IOptionsSnapshot<T> if you need configuration reloaded dynamically when files change without restarting the server.",
      "Validate options on startup with .ValidateDataAnnotations()."
    ],
    practiceQuestions: [
      {
        question: "Where are .NET User Secrets stored on a developer's machine?",
        options: [
          "In the bin folder of the project.",
          "Outside the repository in the user's OS profile folder, completely detached from Git.",
          "In appsettings.Production.json.",
          "In a hidden branch in Git."
        ],
        answerIndex: 1,
        explanation: "User Secrets are stored in the local user profile folder (e.g. %APPDATA%/Microsoft/UserSecrets/) so they can never be accidentally committed to Git."
      }
    ],
    revisionSummary: [
      "The Options pattern maps configuration sections to strongly-typed classes.",
      "Environment variables override appsettings.json for flexible cloud deployments.",
      "Use User Secrets for secure local development."
    ],
    references: [
      { title: "Configuration in ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/", source: "Microsoft Learn" },
      { title: "Options pattern in .NET - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/core/extensions/options", source: "Microsoft Learn" }
    ]
  },

  "topic-2-8": {
    id: "topic-2-8",
    title: "AI Integration in Modern C# & .NET",
    category: "2. Modern C# & .NET",
    description: "Generating LINQ queries and async code with Copilot; validating AI-generated async patterns for correctness",
    objectives: [
      "Direct AI to generate complex multi-table LINQ queries, projections, and grouping",
      "Critically detect AI async antipatterns (sync-over-async, missing CancellationTokens)",
      "Audit generated System.Text.Json converters and Options pattern bindings",
      "Formulate precise prompts for testing asynchronous edge cases"
    ],
    prerequisites: "LINQ (Topic 2-1), Async/Await (Topic 2-2), and AI Prompting (Topic 1-12).",
    terminology: [
      { term: "Sync-over-Async Hazard", definition: "When AI generates code calling .Result or .Wait() inside an async method, creating severe deadlock potential." }
    ],
    concepts: [
      {
        title: "Auditing AI-Generated Async and LINQ Code",
        explanation: "AI often produces syntactically valid async code that contains hidden concurrency or double-enumeration traps.",
        codeSnippet: `// FLAWED AI OUTPUT:
// public async Task<int> GetCount() {
//     var data = await _service.GetDataAsync();
//     return data.Count(); // FLAW: If data is IEnumerable, may trigger double-enumeration!
// }

// CORRECTED BY ENGINEER:
public async Task<int> GetCountAsync(CancellationToken ct = default)
{
    // Pass cancellation token through and materialize once
    IReadOnlyList<Record> items = await _service.GetDataAsync(ct);
    return items.Count; // Instant O(1) property check without re-enumeration
}`,
        language: "csharp",
        output: "Engineered code with proper naming, token propagation, and zero double-enumeration.",
        lineExplanation: [
          "Line 8: Appended 'Async' to follow .NET conventions.",
          "Line 11: Propagates CancellationToken and operates on IReadOnlyList rather than raw IEnumerable."
        ]
      }
    ],
    diagram: `AI Review Checklist for Modern C#:
1. Are async methods named with 'Async' suffix?
2. Is CancellationToken accepted and passed to all I/O calls?
3. Are there any .Result or .Wait() calls? (ELIMINATE THEM)
4. Does LINQ double-enumerate? (Use .ToList() once)
5. Is JsonSerializerOptions cached statically?`,
    realWorldApplication: "Validating high-speed microservice pipelines and ensuring background queue processors do not leak database connections.",
    commonErrors: [
      {
        error: "Accepting AI code that omits CancellationToken parameters",
        cause: "If a client disconnects, the server continues wasting CPU and database resources on abandoned queries.",
        fix: "Instruct AI: 'Include CancellationToken on all async methods and pass it down'."
      }
    ],
    bestPractices: [
      "Always inspect generated LINQ queries for N+1 database hazards.",
      "Check that AI-generated async code does not mix .Result or .GetAwaiter().GetResult().",
      "Benchmark AI-suggested algorithms with BenchmarkDotNet for mission-critical hot paths."
    ],
    practiceQuestions: [
      {
        question: "When AI suggests calling 'Task.Run(() => LongRunningIO())' inside an ASP.NET Core API controller, why is this an antipattern?",
        options: [
          "Task.Run is deprecated.",
          "It takes a thread from the web server thread pool to do nothing but wait for I/O, reducing web server request throughput.",
          "It causes compilation errors on Linux.",
          "Controllers cannot use Task.Run."
        ],
        answerIndex: 1,
        explanation: "In ASP.NET Core, offloading I/O to Task.Run wastes a thread pool worker for no benefit. Pure async/await should be used instead."
      }
    ],
    revisionSummary: [
      "AI accelerates complex LINQ queries and async methods.",
      "Always verify that CancellationTokens are forwarded and .Result is never called.",
      "Avoid double enumeration on generated LINQ pipelines."
    ],
    references: [
      { title: "Async Guidance in .NET - David Fowler", url: "https://github.com/davidfowl/AspNetCoreDiagnosticScenarios/blob/master/AsyncGuidance.md", source: "GitHub / Microsoft" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 3: Version Control – Git (2 topics)
// -------------------------------------------------------------
const m3 = {
  "topic-3-1": {
    id: "topic-3-1",
    title: "Git Fundamentals",
    category: "3. Version Control – Git",
    description: "Init, clone, add, commit, push, pull; .gitignore; SSH setup; branch strategy (feature branches, main/develop)",
    objectives: [
      "Master the three-stage architecture of Git (Working Directory, Staging Area, Repository)",
      "Execute standard workflows: init, clone, add, commit, push, and pull",
      "Configure a bulletproof .gitignore for .NET and Angular projects",
      "Adopt professional branching strategies (Trunk-based development and GitHub Flow)"
    ],
    prerequisites: "Terminal and file system navigation.",
    terminology: [
      { term: "Staging Area (Index)", definition: "An intermediate buffer where changes are formatted and reviewed before being permanently recorded into a commit." },
      { term: "Commit", definition: "A cryptographic snapshot (SHA-1 hash) of the repository at a specific point in time containing author, timestamp, and message." },
      { term: "Trunk-Based Development", definition: "A branching model where developers merge small, frequent updates into a core 'main' branch, minimizing merge drift." }
    ],
    concepts: [
      {
        title: "The Standard Git Workflow",
        explanation: "Git tracks snapshots, not file diffs. Files transition from Working Tree -> Staged (Index) -> Committed (HEAD).",
        codeSnippet: `# 1. Initialize or Clone
git init
git clone git@github.com:myorg/fullstack-app.git

# 2. Check status and stage modified files
git status
git add src/EnterpriseApp.Api/Controllers/WeatherController.cs

# 3. Commit with semantic message
git commit -m "feat(api): implement weather forecast endpoint with caching"

# 4. Push branch to remote
git checkout -b feature/weather-api
git push -u origin feature/weather-api`,
        language: "bash",
        output: "Switched to a new branch 'feature/weather-api'\nBranch 'feature/weather-api' set up to track remote branch.",
        lineExplanation: [
          "Line 7: 'git add' stages the specific file for inclusion in the upcoming commit.",
          "Line 10: Conventional Commit format ('feat(api): ...') standardizes change logs.",
          "Line 14: '-u origin' links the local branch to the remote upstream repository."
        ]
      },
      {
        title: "Essential .gitignore for .NET & Modern Web",
        explanation: "Never commit build artifacts (bin/, obj/), node_modules/, IDE configurations (.vs/, .vscode/), or local environment secrets.",
        codeSnippet: `# Build outputs
[Bb]in/
[Oo]bj/
dist/
out/

# Node modules & frontend artifacts
node_modules/
.angular/cache/

# User secrets & environment files
.env
.env.local
appsettings.Development.json`,
        language: "gitignore",
        output: "Prevents temporary binaries, gigabytes of node modules, and secrets from polluting Git.",
        lineExplanation: [
          "Line 2-3: Excludes compiled .NET binaries and intermediate symbol files.",
          "Line 8: Excludes npm packages (which should be reinstalled via package-lock.json)."
        ]
      }
    ],
    diagram: `The Three States of Git:
[ Working Directory ] --(git add)--> [ Staging Area (Index) ] --(git commit)--> [ Local Repository (HEAD) ]
                                                                                       |
                                                                                  (git push)
                                                                                       v
                                                                            [ Remote (GitHub / Azure) ]`,
    realWorldApplication: "Enforcing atomic commits, linking pull requests to Jira issues, and triggering automated CI/CD builds upon pushing feature branches.",
    commonErrors: [
      {
        error: "Accidentally committing bin/ and obj/ folders to GitHub",
        cause: "Creating the Git repository before adding a proper .gitignore file.",
        fix: "Run 'git rm -r --cached .' followed by adding the .gitignore and committing."
      }
    ],
    bestPractices: [
      "Write semantic commit messages following Conventional Commits (feat, fix, refactor, docs).",
      "Keep commits atomic: one logical change or bugfix per commit.",
      "Pull with rebase ('git pull --rebase') to maintain a clean, linear commit history."
    ],
    practiceQuestions: [
      {
        question: "What command removes a tracked file from Git without deleting it from your local disk?",
        options: ["git rm file.txt", "git rm --cached file.txt", "git delete file.txt", "git ignore file.txt"],
        answerIndex: 1,
        explanation: "'git rm --cached <file>' untracks the file from the repository while leaving the physical file untouched on disk."
      }
    ],
    revisionSummary: [
      "Git uses Working Directory -> Staging Area -> Repository.",
      "A comprehensive .gitignore protects against committing binaries and secrets.",
      "Use feature branches and pull requests for collaborative code review."
    ],
    references: [
      { title: "Git Documentation", url: "https://git-scm.com/doc", source: "Official Git Docs" }
    ]
  },

  "topic-3-2": {
    id: "topic-3-2",
    title: "Branching & Merging",
    category: "3. Version Control – Git",
    description: "Branches, merge, rebase; resolving conflicts; pull requests; stash; cherry-pick; git log & diff",
    objectives: [
      "Master branch creation, switching, and fast-forward vs three-way merges",
      "Understand the difference between git merge and git rebase",
      "Resolve merge conflicts systematically using VS Code diff editors",
      "Use advanced Git tools: git stash, git cherry-pick, and interactive rebase (rebase -i)"
    ],
    prerequisites: "Git fundamentals (Topic 3-1).",
    terminology: [
      { term: "Fast-Forward Merge", definition: "A merge that simply moves the branch pointer forward because no diverging commits occurred on the target branch." },
      { term: "Rebase", definition: "Reapplying commits from one branch on top of another base tip, creating a clean linear history." },
      { term: "Cherry-Pick", definition: "Applying a specific commit from one branch onto another branch by its SHA hash." }
    ],
    concepts: [
      {
        title: "Merge vs Rebase and Conflict Resolution",
        explanation: "Merge preserves the complete historical timeline with a merge commit. Rebase rewrites history to place your feature branch directly atop the latest main branch.",
        codeSnippet: `# 1. Rebase feature branch on latest main
git checkout feature/auth
git fetch origin
git rebase origin/main

# If conflict occurs:
# Fix conflicts in VS Code, then:
git add .
git rebase --continue

# 2. Stashing uncommitted work to switch branches quickly
git stash save "WIP: payment service integration"
git checkout main
# ...do urgent hotfix...
git checkout feature/auth
git stash pop

# 3. Cherry-pick a specific hotfix commit onto main
git checkout main
git cherry-pick a8f3b21`,
        language: "bash",
        output: "Successfully rebased and resolved conflicts without ugly tangled merge commits.",
        lineExplanation: [
          "Line 4: Moves feature commits so they originate cleanly from the latest commit on origin/main.",
          "Line 12: 'git stash' saves uncommitted dirty work to a temporary shelf.",
          "Line 18: 'cherry-pick' isolates and applies a single commit by hash."
        ]
      }
    ],
    diagram: `Merge vs Rebase Comparison:
MERGE:
Main:    ---o---o---o-------M (Merge commit created)
                     \\     /
Feature:              ---o---o

REBASE (Linear history):
Main:    ---o---o---o
                     \\
Feature:              ---o'---o' (Commits replayed linearly)` ,
    realWorldApplication: "Maintaining a clean Git history in enterprise engineering teams so automated release notes and git bisect debugging remain readable and functional.",
    commonErrors: [
      {
        error: "Rebasing a public shared branch that teammates are actively working on",
        cause: "Rebasing rewrites commit SHA hashes, causing divergence for everyone else on the branch.",
        fix: "The Golden Rule of Rebase: Never rebase a public shared branch; only rebase your private local feature branches."
      }
    ],
    bestPractices: [
      "Rebase local feature branches on 'main' before opening a Pull Request.",
      "Use 'git stash --include-untracked' to stash newly created files.",
      "Never force-push (git push -f) to main or develop; use --force-with-lease on personal branches."
    ],
    practiceQuestions: [
      {
        question: "What is the primary danger of rebasing a shared branch used by multiple developers?",
        options: [
          "It permanently deletes all files in the repository.",
          "It rewrites commit history and hashes, desynchronizing everyone else's local copies.",
          "It breaks git clone for new users.",
          "Rebase only works on Windows."
        ],
        answerIndex: 1,
        explanation: "Rebasing rewrites commit hashes. Doing this on a shared branch creates conflicting duplicate commits for other collaborators."
      }
    ],
    revisionSummary: [
      "Merge preserves true history with merge commits; rebase creates a linear history.",
      "Stash temporary changes to switch contexts cleanly.",
      "Resolve conflicts early by keeping branches updated with main."
    ],
    references: [
      { title: "Git Branching and Rebasing - Atlassian", url: "https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase", source: "Atlassian Git Tutorial" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 4: Build Tools, IDE & Debugging (4 topics)
// -------------------------------------------------------------
const m4 = {
  "topic-4-1": {
    id: "topic-4-1",
    title: "VS Code & Visual Studio Tooling",
    category: "4. Build Tools, IDE & Debugging",
    description: "Setup, extensions (C# Dev Kit), key shortcuts; project navigation; settings",
    objectives: [
      "Configure VS Code with the official C# Dev Kit extension and Omnisharp",
      "Master productivity shortcuts: Go to Definition (F12), Find References (Shift+F12), Quick Actions (Ctrl+.)",
      "Manage multi-root workspaces and launch.json / tasks.json debugging profiles",
      "Adopt consistent editor configuration using .editorconfig"
    ],
    prerequisites: "General computer literacy and IDE installation.",
    terminology: [
      { term: "C# Dev Kit", definition: "Microsoft's official VS Code extension providing Solution Explorer, test discovery, and language server capabilities." },
      { term: ".editorconfig", definition: "A standard configuration file that enforces uniform indentation, whitespace, and formatting conventions across different editors." }
    ],
    concepts: [
      {
        title: "Developer Productivity and .editorconfig",
        explanation: "Teams use .editorconfig to eliminate code formatting debates by enforcing rules directly inside the editor and compiler.",
        codeSnippet: `# .editorconfig - Root configuration for .NET Fullstack
root = true

[*]
indent_style = space
indent_size = 4
end_of_line = crlf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.cs]
# C# Coding Conventions
csharp_using_directive_placement = outside_namespace:warning
csharp_style_var_for_built_in_types = true:suggestion
dotnet_style_qualification_for_field = false:suggestion
dotnet_naming_rule.interface_should_be_prefixed_with_i.severity = warning`,
        language: "ini",
        output: "Enforces 4-space indentation and 'I' interface prefixes across VS Code, Visual Studio, and Rider.",
        lineExplanation: [
          "Line 4-10: Standardizes file encoding and whitespace across all operating systems.",
          "Line 13-17: Configures Roslyn compiler analyzers to warn developers if code violates style guidelines."
        ]
      }
    ],
    diagram: `Development Tooling Stack:
[ VS Code / Visual Studio ]
            |
  (C# Dev Kit + Roslyn Analyzer)
            |
  (Reads .editorconfig & launch.json)
            |
[ Guaranteed Uniform Code Style Across All Team Members ]`,
    realWorldApplication: "Standardizing development environments in distributed remote teams across Windows, macOS, and Linux.",
    commonErrors: [
      {
        error: "C# Dev Kit fails to resolve dependencies or IntelliSense shows red squiggly lines everywhere",
        cause: "OmniSharp / Dev Kit language server failed to restore NuGet packages or selected the wrong target framework.",
        fix: "Open Command Palette (Ctrl+Shift+P) and execute 'C# Dev Kit: Rebuild Solution' or run 'dotnet restore' in terminal."
      }
    ],
    bestPractices: [
      "Memorize key shortcuts: Ctrl+. (Quick Actions/Refactoring), F12 (Go to Definition), Alt+F12 (Peek Definition).",
      "Commit a clean .editorconfig in every repository root.",
      "Use launch.json profiles to debug multiple projects (API + Frontend) simultaneously."
    ],
    practiceQuestions: [
      {
        question: "What is the purpose of an .editorconfig file in a C# project?",
        options: [
          "It compiles the code to machine code.",
          "It defines and enforces consistent code formatting and style rules across all team members' editors.",
          "It stores production passwords.",
          "It installs npm packages."
        ],
        answerIndex: 1,
        explanation: ".editorconfig maintains consistent coding styles for multiple developers working on the same project across various editors."
      }
    ],
    revisionSummary: [
      "C# Dev Kit turns VS Code into a lightweight .NET IDE.",
      "Use .editorconfig to enforce code formatting universally.",
      "Master keyboard shortcuts (Ctrl+., F12) to double development speed."
    ],
    references: [
      { title: "C# Dev Kit for Visual Studio Code", url: "https://code.visualstudio.com/docs/csharp/get-started", source: "Visual Studio Code Docs" }
    ]
  },

  "topic-4-2": {
    id: "topic-4-2",
    title: "Debugging Techniques",
    category: "4. Build Tools, IDE & Debugging",
    description: "Breakpoints, watch windows, call stack, immediate window; debugging async code; conditional breakpoints",
    objectives: [
      "Master interactive debugging: conditional breakpoints, hit counts, and logpoints",
      "Inspect runtime state using the Watch Window, Locals Window, and Immediate Window",
      "Navigate the Call Stack to trace execution flow across assemblies",
      "Diagnose asynchronous deadlocks and trace Tasks in flight"
    ],
    prerequisites: "Control flow, exceptions, and async/await.",
    terminology: [
      { term: "Conditional Breakpoint", definition: "A breakpoint that only halts execution when a specified boolean condition evaluates to true (e.g. userId == 42)." },
      { term: "Logpoint", definition: "Logs a message to the debug console without stopping execution, ideal for debugging production issues without disrupting running threads." },
      { term: "Immediate Window", definition: "An interactive command prompt inside the debugger that allows evaluating expressions, executing methods, and modifying variables on the fly." }
    ],
    concepts: [
      {
        title: "Conditional Breakpoints and Debugger Display",
        explanation: "Instead of stepping through thousands of loop cycles, use conditional breakpoints to pause execution only when abnormal conditions occur.",
        codeSnippet: `// Adding [DebuggerDisplay] to enrich debugger inspection windows
[System.Diagnostics.DebuggerDisplay("Order #{Id} - Customer: {CustomerName}, Total: {TotalAmount:C}")]
public class Order
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = "";
    public decimal TotalAmount { get; set; }
}

public class OrderProcessor
{
    public void ProcessBatch(List<Order> orders)
    {
        foreach (var order in orders)
        {
            // Set Conditional Breakpoint here:
            // Condition: order.TotalAmount > 10000 || order.CustomerName == null
            ValidateOrder(order);
        }
    }

    private void ValidateOrder(Order order) { /* Validation */ }
}`,
        language: "csharp",
        output: "Debugger stops exclusively on the high-value order or corrupted customer record.",
        lineExplanation: [
          "Line 2: [DebuggerDisplay] formats how objects appear in the Locals and Watch windows, speeding up debugging.",
          "Line 17: Setting a conditional breakpoint avoids manually pressing F5 thousands of times in large batch loops."
        ]
      }
    ],
    diagram: `Debugging Workspace:
+-----------------------------------+------------------------------------+
| Source Code with Breakpoints (●)  | Call Stack Window                  |
| > int total = CalculateTax();     | -> CalculateTax() Line 45          |
|                                   |    ProcessOrder() Line 12          |
+-----------------------------------+------------------------------------+
| Watch / Locals Window             | Immediate Window                   |
| order.Id: 104                     | > order.TotalAmount = 50.0m        |
| order.TotalAmount: $12,500.00     | Result: 50.0m (Updated live!)      |
+-----------------------------------+------------------------------------+`,
    realWorldApplication: "Isolating race conditions, memory spikes, and faulty algorithmic calculations in live development and staging servers.",
    commonErrors: [
      {
        error: "Modifying variables in the Immediate Window causing unintended side effects",
        cause: "Evaluating methods with side effects (e.g. repo.DeleteOrder()) in the Immediate Window mutates actual database state while paused in debugger.",
        fix: "Only evaluate pure getters or calculation functions without side effects."
      }
    ],
    bestPractices: [
      "Use Logpoints instead of adding Console.WriteLine() statements and recompiling.",
      "Annotate domain entities with [DebuggerDisplay] for clean inspection.",
      "Use the Parallel Stacks window to debug async deadlocks and see which tasks are awaiting."
    ],
    practiceQuestions: [
      {
        question: "What is the difference between a traditional breakpoint and a logpoint?",
        options: [
          "Logpoints crash the server if an error occurs.",
          "A breakpoint halts execution; a logpoint prints a diagnostic message and continues execution without pausing.",
          "Logpoints can only be used in C++.",
          "There is no difference."
        ],
        answerIndex: 1,
        explanation: "Logpoints print diagnostic output to the debug console without pausing thread execution, preventing disruption to active connections."
      }
    ],
    revisionSummary: [
      "Conditional breakpoints halt only when specific criteria are satisfied.",
      "The Immediate Window allows live code execution at pause points.",
      "Use the Call Stack to trace execution across method hierarchies."
    ],
    references: [
      { title: "First look at the Visual Studio Debugger - Microsoft Learn", url: "https://learn.microsoft.com/en-us/visualstudio/debugger/debugger-feature-tour", source: "Microsoft Learn" }
    ]
  },

  "topic-4-3": {
    id: "topic-4-3",
    title: "MSBuild & dotnet CLI",
    category: "4. Build Tools, IDE & Debugging",
    description: "CLI commands (build, run, test, publish, restore); build configurations (Debug/Release); msbuild properties",
    objectives: [
      "Understand MSBuild compilation targets, item groups, and build properties",
      "Differentiate between Debug (symbols, unoptimized) and Release (JIT optimizations, stripped) builds",
      "Automate testing and publishing with dotnet test and dotnet publish",
      "Produce self-contained and trimmed executable deployments"
    ],
    prerequisites: ".NET platform basics (Topic 2-4).",
    terminology: [
      { term: "MSBuild", definition: "The XML-based build engine underlying Visual Studio and the dotnet CLI that orchestrates compilation, packaging, and deployment." },
      { term: "Release Configuration", definition: "A build mode that strips debug symbols, enables IL and JIT compiler optimizations, and maximizes execution speed." },
      { term: "Self-Contained Deployment", definition: "Publishing a .NET application bundled with its own runtime so the host machine does not need .NET installed." }
    ],
    concepts: [
      {
        title: "Release Compilation and Publishing for Production",
        explanation: "Never deploy a Debug build to production. Release builds invoke aggressive compiler inlining and optimizations.",
        codeSnippet: `# 1. Restore packages and clean build
dotnet clean
dotnet restore

# 2. Run automated tests with logger
dotnet test --configuration Release --logger "console;verbosity=normal"

# 3. Publish self-contained, optimized single-file binary for Linux container
dotnet publish src/EnterpriseApp.Api/EnterpriseApp.Api.csproj \\
    --configuration Release \\
    --runtime linux-x64 \\
    --self-contained true \\
    -p:PublishSingleFile=true \\
    -p:PublishTrimmed=true \\
    --output ./publish/api`,
        language: "bash",
        output: "Produced optimized single-file binary (~65MB) with unused assemblies trimmed.",
        lineExplanation: [
          "Line 6: Runs all unit and integration tests in Release mode before publishing.",
          "Line 11: '--runtime linux-x64 --self-contained true' packages the entire .NET runtime for containerization.",
          "Line 13: '-p:PublishTrimmed=true' strips unused framework types, reducing container footprint."
        ]
      }
    ],
    diagram: `Build Pipeline:
[ Source Code + NuGet Packages ]
               |
         (dotnet restore)
               v
         (dotnet build -c Release)
               v
         (dotnet test)
               v
         (dotnet publish -c Release) ===> [ Production Deployment Artifacts ]`,
    realWorldApplication: "Writing Docker multi-stage builds and GitHub Actions CI/CD workflows that build, test, and containerize .NET microservices.",
    commonErrors: [
      {
        error: "Deploying Debug builds to production",
        cause: "Omitting '-c Release' defaults to Debug, disabling JIT optimization and leaving security-sensitive symbol files exposed.",
        fix: "Always specify '--configuration Release' in production publish scripts."
      }
    ],
    bestPractices: [
      "Always execute 'dotnet test' before 'dotnet publish' in automated build pipelines.",
      "Use Directory.Build.props to share common build properties (TargetFramework, Version, Authors) across all projects in a solution.",
      "Enable trimming cautiously and test thoroughly to ensure reflection calls do not break."
    ],
    practiceQuestions: [
      {
        question: "Why should production web services always be compiled with the 'Release' configuration?",
        options: [
          "Debug builds do not run on Linux.",
          "Release mode enables compiler optimizations, inlining, and strips debug overhead for maximum performance.",
          "Release mode automatically creates a SQL database.",
          "There is no difference."
        ],
        answerIndex: 1,
        explanation: "Release mode enables aggressive compiler and JIT optimizations, making code run substantially faster with less memory overhead."
      }
    ],
    revisionSummary: [
      "MSBuild orchestrates compilation via the dotnet CLI.",
      "Always publish with '--configuration Release' for production.",
      "Self-contained and single-file options simplify Docker and cloud deployment."
    ],
    references: [
      { title: ".NET CLI Overview - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/core/tools/", source: "Microsoft Learn" }
    ]
  },

  "topic-4-4": {
    id: "topic-4-4",
    title: "Assessment 2: Tooling & Git Checkpoint",
    category: "4. Build Tools, IDE & Debugging",
    description: "Set up repo, create multi-project solution, implement small feature, debug an intentional bug, submit PR",
    objectives: [
      "Create a multi-project .NET solution with a Web API and Class Library using the dotnet CLI",
      "Configure Git, write a .gitignore, and implement feature branch workflows",
      "Identify and debug an intentional logic error using breakpoints and the Watch Window",
      "Produce a clean, reviewed Pull Request with conventional commit messages"
    ],
    prerequisites: "Modules 1, 2, 3, and Topics 4-1 to 4-3.",
    terminology: [
      { term: "Multi-Project Solution", definition: "A .sln file coordinating multiple independent .csproj projects (e.g. Domain, API, Tests)." }
    ],
    concepts: [
      {
        title: "Hands-on Practical Checkpoint Execution",
        explanation: "Step-by-step terminal and code execution establishing an enterprise project repository from scratch.",
        codeSnippet: `# Step 1: Initialize git repository and add standard .gitignore
git init
dotnet new gitignore

# Step 2: Create solution and projects
dotnet new sln -n BankingPlatform
dotnet new webapi -n BankingPlatform.Api
dotnet new classlib -n BankingPlatform.Core
dotnet new xunit -n BankingPlatform.Tests

# Step 3: Link projects to solution
dotnet sln add BankingPlatform.Api BankingPlatform.Core BankingPlatform.Tests

# Step 4: Add references
dotnet add BankingPlatform.Api reference BankingPlatform.Core
dotnet add BankingPlatform.Tests reference BankingPlatform.Core

# Step 5: Build and verify zero errors
dotnet build
dotnet test`,
        language: "bash",
        output: "Passed! 3 projects compiled and linked into BankingPlatform.sln with zero errors.",
        lineExplanation: [
          "Creates a professional multi-tier architecture following industry domain separation standards."
        ]
      }
    ],
    diagram: `Multi-Project Solution Structure:
BankingPlatform.sln
   |-- BankingPlatform.Core (Classlib: Entities, Business Logic)
   |-- BankingPlatform.Api  (Web API: Controllers, Endpoints) ---> references Core
   +-- BankingPlatform.Tests(xUnit: Automated Unit Tests)   ---> references Core`,
    realWorldApplication: "The exact bootstrapping pattern required when starting any new commercial .NET backend application.",
    commonErrors: [
      {
        error: "Circular dependency: Project A references Project B, and Project B references Project A",
        cause: "Violates architectural layer boundaries.",
        fix: "Ensure references flow in one direction: Presentation -> Core, Tests -> Core."
      }
    ],
    bestPractices: [
      "Keep domain logic in a Class Library completely decoupled from ASP.NET Core web controllers.",
      "Verify that tests pass locally before pushing feature branches.",
      "Write clear Pull Request descriptions outlining changes and testing evidence."
    ],
    practiceQuestions: [
      {
        question: "Why should business logic reside in a Class Library rather than inside Web API controllers?",
        options: [
          "Controllers cannot run if-statements.",
          "To allow the business logic to be tested independently and reused across APIs, background workers, or CLI tools.",
          "Class libraries run twice as fast.",
          "It is required by MSBuild."
        ],
        answerIndex: 1,
        explanation: "Placing logic in class libraries decouples core domain rules from the web delivery mechanism, maximizing reusability and testability."
      }
    ],
    revisionSummary: [
      "Multi-project solutions enforce clean layer boundaries.",
      "The dotnet CLI automates solution creation, references, and tests.",
      "Demonstrates mastery of professional development workflows."
    ],
    references: [
      { title: "Organizing and testing projects with the .NET CLI - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/core/testing/selective-unit-tests", source: "Microsoft Learn" }
    ]
  }
};

writeModule('module02_modern_csharp.js', 'MODULE_02_LESSONS', m2);
writeModule('module03_git.js', 'MODULE_03_LESSONS', m3);
writeModule('module04_build_tools.js', 'MODULE_04_LESSONS', m4);
console.log('Batch 1 (Modules 1-4) complete!');
