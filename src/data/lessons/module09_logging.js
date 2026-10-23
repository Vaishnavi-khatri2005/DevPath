/**
 * Pre-generated comprehensive lessons for MODULE_09_LESSONS
 * Sources: Microsoft Learn, xUnit Docs, Clean Code Architecture.
 */

export const MODULE_09_LESSONS = {
  "topic-9-1": {
    "id": "topic-9-1",
    "title": "Logging in .NET & Serilog",
    "category": "9. Logging",
    "description": "ILogger<T>; log levels (Trace → Critical); structured logging; Serilog / NLog; sinks (Console, File, Seq); correlation IDs",
    "objectives": [
      "Master the Microsoft.Extensions.Logging abstraction (ILogger<T>)",
      "Understand the six standard log levels: Trace, Debug, Information, Warning, Error, Critical",
      "Implement Structured Logging with message templates and semantic properties",
      "Configure Serilog with sinks (Console, File, Seq) and Correlation IDs for distributed tracing"
    ],
    "prerequisites": "Dependency Injection and Web API architecture.",
    "terminology": [
      {
        "term": "Structured Logging",
        "definition": "Logging data as key-value pairs (JSON) rather than formatted strings, enabling querying, filtering, and indexing in log aggregators."
      },
      {
        "term": "Log Sink",
        "definition": "The destination where log events are written (e.g. Console, File, Elasticsearch, Seq, Datadog)."
      },
      {
        "term": "Correlation ID",
        "definition": "A unique GUID passed in HTTP headers (X-Correlation-ID) that traces a single request across multiple microservices."
      }
    ],
    "concepts": [
      {
        "title": "Structured Logging with Serilog and ILogger<T>",
        "explanation": "Never use string interpolation in logging. Structured logging preserves parameters as searchable JSON fields in log management tools.",
        "codeSnippet": "// BAD: String interpolation (Destroys queryability, wastes CPU)\n// _logger.LogInformation($\"Order {orderId} processed for {amount}\");\n\n// GOOD: Structured Logging (Message template with named properties)\n_logger.LogInformation(\"Order {OrderId} processed for customer {CustomerId} with total {TotalAmount:C}\", \n    orderId, customerId, totalAmount);\n\n// Configuring Serilog in Program.cs:\nusing Serilog;\n\nvar builder = WebApplication.CreateBuilder(args);\n\n// Configure Serilog as the primary logging provider\nbuilder.Host.UseSerilog((context, configuration) => configuration\n    .ReadFrom.Configuration(context.Configuration)\n    .Enrich.FromLogContext()\n    .Enrich.WithMachineName()\n    .WriteTo.Console()\n    .WriteTo.File(\"logs/app-.log\", rollingInterval: RollingInterval.Day)\n    .WriteTo.Seq(\"http://localhost:5341\")); // Real-time structured log search engine!\n\nvar app = builder.Build();",
        "language": "csharp",
        "output": "Emits searchable structured JSON events with timestamps, log levels, and enriched metadata.",
        "lineExplanation": [
          "Line 4: Named placeholders like {OrderId} are stored as queryable JSON fields in Elasticsearch or Seq.",
          "Line 12: Integrates Serilog seamlessly into the ASP.NET Core host pipeline.",
          "Line 17: Writes logs to Console, daily rolling Files, and a Seq server simultaneously."
        ]
      }
    ],
    "diagram": "Structured Logging Pipeline:\n_logger.LogInformation(\"Payment {Amount} by {User}\", amount, user)\n                         |\n                 (Serilog Pipeline)\n                         |\n           +-------------+-------------+\n           |             |             |\n           v             v             v\n       [ Console ]   [ File Sink ]  [ Seq / Elastic (JSON Search) ]\n                                    { \"Amount\": 99.0, \"User\": \"Jane\" }",
    "realWorldApplication": "Investigating customer issues and production outages in distributed cloud microservices in seconds by filtering on CorrelationId.",
    "commonErrors": [
      {
        "error": "Using string interpolation inside logger methods (e.g. _logger.LogInformation($\"User {id}\"))",
        "cause": "Converts data into a plain flat string, preventing search engines from indexing the parameter as a queryable field.",
        "fix": "Always use message templates: _logger.LogInformation(\"User {UserId}\", id)."
      }
    ],
    "bestPractices": [
      "Always use structured message templates ({PropertyName}), never string interpolation.",
      "Attach a Correlation ID middleware to track requests across distributed service boundaries.",
      "Log at Information or Warning in production; reserve Debug and Trace for local development."
    ],
    "practiceQuestions": [
      {
        "question": "Why is structured logging (_logger.LogInformation(\"Order {Id}\", id)) preferred over string interpolation ($) in modern .NET?",
        "options": [
          "String interpolation is not supported by C#.",
          "Structured logging captures named parameters as discrete JSON properties, allowing log aggregators (Seq, Elastic) to search and filter by that exact field.",
          "Structured logging requires less disk space.",
          "It automatically encrypts the log file."
        ],
        "answerIndex": 1,
        "explanation": "Structured logging preserves individual parameters as queryable metadata attributes in centralized log systems."
      }
    ],
    "revisionSummary": [
      "Use ILogger<T> with structured message templates.",
      "Serilog routes logs to multiple sinks (Console, File, Seq).",
      "Correlation IDs enable end-to-end distributed tracing."
    ],
    "references": [
      {
        "title": "Logging in .NET and ASP.NET Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging/",
        "source": "Microsoft Learn"
      },
      {
        "title": "Serilog Documentation",
        "url": "https://serilog.net/",
        "source": "Serilog.net"
      }
    ]
  }
};
