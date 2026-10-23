/**
 * Pre-generated comprehensive lessons for MODULE_06_LESSONS
 * Sources: Microsoft Learn, ASP.NET Core Guides, EF Core Docs.
 */

export const MODULE_06_LESSONS = {
  "topic-6-1": {
    "id": "topic-6-1",
    "title": "Web API Architecture",
    "category": "6. ASP.NET Core & REST API Development",
    "description": "Controller-based vs Minimal APIs; Program.cs structure; middleware pipeline; HTTP request lifecycle",
    "objectives": [
      "Understand the HTTP request lifecycle through the ASP.NET Core middleware pipeline",
      "Compare Controller-based APIs with modern .NET Minimal APIs",
      "Master the structure of Program.cs (WebApplicationBuilder vs WebApplication)",
      "Configure order-dependent middleware components correctly"
    ],
    "prerequisites": "C# Fundamentals and Dependency Injection concepts.",
    "terminology": [
      {
        "term": "Middleware",
        "definition": "Software assembled into an application pipeline to handle requests and responses in a bidirectional Russian-doll model."
      },
      {
        "term": "Minimal API",
        "definition": "A lightweight approach in ASP.NET Core to create HTTP endpoints with minimal code and configuration using lambda mappers."
      },
      {
        "term": "WebApplicationBuilder",
        "definition": "The builder object in Program.cs used to configure services, logging, and environment configuration."
      }
    ],
    "concepts": [
      {
        "title": "Modern Program.cs and Middleware Pipeline",
        "explanation": "ASP.NET Core processes requests through a bidirectional pipeline of middleware components. Order is critical: authentication must precede authorization.",
        "codeSnippet": "var builder = WebApplication.CreateBuilder(args);\n\n// 1. Configure Services (Dependency Injection Container)\nbuilder.Services.AddControllers();\nbuilder.Services.AddEndpointsApiExplorer();\nbuilder.Services.AddSwaggerGen();\n\nvar app = builder.Build();\n\n// 2. Configure Middleware Pipeline (Order matters!)\nif (app.Environment.IsDevelopment())\n{\n    app.UseSwagger();\n    app.UseSwaggerUI();\n}\n\napp.UseHttpsRedirection();\napp.UseCors(\"AllowAngularApp\");\n\napp.UseAuthentication(); // 1st: Who are you?\napp.UseAuthorization();  // 2nd: Are you allowed in?\n\napp.MapControllers(); // Maps controller endpoints\n\napp.Run();",
        "language": "csharp",
        "output": "Configures and starts the ASP.NET Core web server listening on configured ports.",
        "lineExplanation": [
          "Line 1: WebApplication.CreateBuilder bootstraps configuration, logging, and DI container.",
          "Line 18-19: Authentication MUST precede Authorization in the middleware pipeline order.",
          "Line 21: MapControllers routes incoming requests to [ApiController] classes."
        ]
      }
    ],
    "diagram": "Middleware Pipeline (Bidirectional):\nRequest ---> [ Logging ] ---> [ Exception Handler ] ---> [ Auth ] ---> [ Controller / Minimal API ]\n                                                                                   |\nResponse <--- [ Logging ] <--- [ Exception Handler ] <--- [ Auth ] <--- [ HTTP Status Code / JSON ]",
    "realWorldApplication": "Architecting microservices and enterprise backends that service web, mobile, and third-party integrations.",
    "commonErrors": [
      {
        "error": "401/403 Errors even with valid tokens due to misplaced middleware",
        "cause": "Placing app.UseAuthorization() before app.UseAuthentication().",
        "fix": "Always call app.UseAuthentication() before app.UseAuthorization()."
      }
    ],
    "bestPractices": [
      "Follow the standard middleware order: ExceptionHandler -> HttpsRedirection -> StaticFiles -> Routing -> CORS -> Authentication -> Authorization -> Endpoints.",
      "Use Minimal APIs for microservices and small services; use Controllers for large, feature-rich domain APIs."
    ],
    "practiceQuestions": [
      {
        "question": "In ASP.NET Core, what happens if app.UseAuthorization() is placed before app.UseAuthentication() in Program.cs?",
        "options": [
          "The application crashes on startup.",
          "Authorization fails because user identity has not yet been authenticated and populated into HttpContext.User.",
          "CORS errors are thrown.",
          "There is no difference."
        ],
        "answerIndex": 1,
        "explanation": "Authentication must run first to identify the user and populate claims before authorization can evaluate permissions."
      }
    ],
    "revisionSummary": [
      "Middleware executes bidirectionally.",
      "Order is strictly significant.",
      "Minimal APIs provide low-overhead endpoints; controllers suit complex domains."
    ],
    "references": [
      {
        "title": "ASP.NET Core Middleware - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-6-2": {
    "id": "topic-6-2",
    "title": "Routing & Endpoints",
    "category": "6. ASP.NET Core & REST API Development",
    "description": "Route attributes, route templates, route constraints; query params vs route params vs body; Minimal API MapGet/MapPost",
    "objectives": [
      "Design clean RESTful route templates using [Route(\"api/[controller]\")]",
      "Apply route constraints (e.g. {id:int:min(1)}) for automatic validation",
      "Distinguish between Route Parameters, Query String Parameters, and Request Bodies",
      "Implement Minimal API endpoints with MapGet, MapPost, MapPut, and MapDelete"
    ],
    "prerequisites": "Web API architecture basics.",
    "terminology": [
      {
        "term": "Route Template",
        "definition": "A URL pattern with parameter placeholders (e.g. \"api/products/{id:int}\") used by the routing engine to match incoming HTTP requests."
      },
      {
        "term": "Route Constraint",
        "definition": "A rule appended to a route parameter that restricts matches based on type or range (e.g. :int, :guid, :min(1))."
      }
    ],
    "concepts": [
      {
        "title": "Route Templates and Minimal APIs",
        "explanation": "Modern ASP.NET Core supports expressive route constraints and high-speed Minimal API mapping.",
        "codeSnippet": "// 1. Controller Route Template:\n[ApiController]\n[Route(\"api/[controller]\")]\npublic class ProductsController : ControllerBase\n{\n    // Matches GET /api/products/42\n    [HttpGet(\"{id:int:min(1)}\")]\n    public IActionResult GetById(int id) => Ok(new { Id = id, Name = \"Keyboard\" });\n\n    // Matches GET /api/products?category=tech&page=2\n    [HttpGet]\n    public IActionResult Search([FromQuery] string category, [FromQuery] int page = 1)\n        => Ok(new { Category = category, Page = page });\n}\n\n// 2. Minimal API Alternative:\n// app.MapGet(\"/api/v2/products/{id:int}\", (int id) => Results.Ok(new { Id = id }));",
        "language": "csharp",
        "output": "Handles GET /api/products/42 and validates that id is a positive integer.",
        "lineExplanation": [
          "Line 6: '{id:int:min(1)}' restricts routing to integers >= 1, automatically rejecting invalid requests with 404.",
          "Line 11: '[FromQuery]' binds parameters from the URL query string."
        ]
      }
    ],
    "diagram": "URL Routing Anatomy:\nhttps://api.mycorp.com/api/orders/104?expand=details\n|                       |          |         |\nProtocol & Host         Route Base Route Param Query Param",
    "realWorldApplication": "Building intuitive, self-documenting REST APIs that conform to Richardson Maturity Model standards.",
    "commonErrors": [
      {
        "error": "Route parameter ambiguity (AmbiguousMatchException)",
        "cause": "Two endpoints have matching route patterns (e.g. api/orders/{id} and api/orders/{name}).",
        "fix": "Apply route constraints (e.g. {id:int}) or introduce distinct route segments."
      }
    ],
    "bestPractices": [
      "Use lowercase plural nouns for resource URLs (e.g. /api/customers, not /api/GetCustomer).",
      "Apply route constraints to prevent invalid string IDs from reaching controller code.",
      "Use query parameters for optional filtering, pagination, and sorting."
    ],
    "practiceQuestions": [
      {
        "question": "What HTTP status code does ASP.NET Core automatically return if a request fails a route constraint like {id:int}?",
        "options": [
          "400 Bad Request",
          "404 Not Found",
          "500 Server Error",
          "405 Method Not Allowed"
        ],
        "answerIndex": 1,
        "explanation": "Route constraint failures mean no route matched the URL pattern, causing the router to return a 404 Not Found."
      }
    ],
    "revisionSummary": [
      "Use route constraints to filter input before reaching controller logic.",
      "Route parameters identify specific resources; query parameters filter and paginate.",
      "Follow RESTful naming conventions."
    ],
    "references": [
      {
        "title": "Routing in ASP.NET Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/routing",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-6-3": {
    "id": "topic-6-3",
    "title": "Controllers & Actions",
    "category": "6. ASP.NET Core & REST API Development",
    "description": "ControllerBase; ActionResult<T>; model binding; HTTP verbs (GET, POST, PUT, DELETE, PATCH); status codes",
    "objectives": [
      "Extend ControllerBase for lightweight Web API controllers",
      "Return strongly-typed ActionResult<T> for clear OpenAPI schemas",
      "Master HTTP verbs: GET (read), POST (create), PUT (replace), DELETE (remove), PATCH (partial update)",
      "Leverage model binding sources: [FromBody], [FromRoute], [FromQuery], [FromHeader]"
    ],
    "prerequisites": "OOP and Routing concepts.",
    "terminology": [
      {
        "term": "ControllerBase",
        "definition": "The base class for ASP.NET Core Web APIs that provides HTTP helper methods (Ok(), NotFound(), CreatedAtAction()) without MVC view overhead."
      },
      {
        "term": "ActionResult<T>",
        "definition": "A return type enabling either an HTTP status result (NotFound()) or a strongly-typed model (T) to be returned."
      }
    ],
    "concepts": [
      {
        "title": "RESTful Controller with ActionResult<T>",
        "explanation": "Using ControllerBase and ActionResult<T> ensures compile-time type safety while preserving standard HTTP status responses.",
        "codeSnippet": "[ApiController]\n[Route(\"api/[controller]\")]\npublic class OrdersController : ControllerBase\n{\n    [HttpGet(\"{id:int}\")]\n    [ProducesResponseType(StatusCodes.Status200OK)]\n    [ProducesResponseType(StatusCodes.Status404NotFound)]\n    public ActionResult<OrderDto> GetOrder(int id)\n    {\n        var order = FindOrder(id);\n        if (order == null)\n            return NotFound($\"Order #{id} not found.\"); // 404\n\n        return Ok(order); // 200 with JSON payload\n    }\n\n    [HttpPost]\n    [ProducesResponseType(StatusCodes.Status201Created)]\n    public ActionResult<OrderDto> CreateOrder([FromBody] CreateOrderDto dto)\n    {\n        var newOrder = new OrderDto(101, dto.CustomerName, dto.Amount);\n        \n        // Returns 201 Created with Location header pointing to GetOrder!\n        return CreatedAtAction(nameof(GetOrder), new { id = newOrder.Id }, newOrder);\n    }\n}\n\npublic record OrderDto(int Id, string CustomerName, decimal Amount);\npublic record CreateOrderDto(string CustomerName, decimal Amount);",
        "language": "csharp",
        "output": "Handles GET and POST returning standard 200 OK, 404 NotFound, and 201 Created responses.",
        "lineExplanation": [
          "Line 1: '[ApiController]' enables automatic model validation and inference of binding sources.",
          "Line 10: 'NotFound()' returns a 404 status code.",
          "Line 21: 'CreatedAtAction' produces standard 201 Created with a Location header containing the URL to fetch the new resource."
        ]
      }
    ],
    "diagram": "HTTP Verb Mapping:\nGET    /api/orders/{id} ---> Read resource (200 OK / 404 NotFound)\nPOST   /api/orders      ---> Create resource (201 Created + Location header)\nPUT    /api/orders/{id} ---> Replace resource completely (200 OK / 204 NoContent)\nDELETE /api/orders/{id} ---> Remove resource (204 NoContent)\nPATCH  /api/orders/{id} ---> Partial modification of fields",
    "realWorldApplication": "Standard industry controller implementation for enterprise REST APIs consumed by Angular, React, and mobile apps.",
    "commonErrors": [
      {
        "error": "Inheriting from 'Controller' instead of 'ControllerBase' in Web APIs",
        "cause": "'Controller' adds overhead for Razor Views (HTML pages) which are not used in REST APIs.",
        "fix": "Inherit API controllers from 'ControllerBase'."
      }
    ],
    "bestPractices": [
      "Always return 201 Created with a Location header for successful POST creation requests.",
      "Use ActionResult<T> so Swagger can automatically detect the return schema.",
      "Add [ApiController] attribute to every controller class."
    ],
    "practiceQuestions": [
      {
        "question": "Which HTTP status helper method should be returned after successfully creating a resource via a POST request?",
        "options": [
          "Ok()",
          "CreatedAtAction() or Created()",
          "Accepted()",
          "NoContent()"
        ],
        "answerIndex": 1,
        "explanation": "REST standards specify returning 201 Created with the Location header pointing to the newly created entity via CreatedAtAction()."
      }
    ],
    "revisionSummary": [
      "Inherit from ControllerBase for API controllers.",
      "Use ActionResult<T> for type safety and automatic OpenAPI schema generation.",
      "Return proper HTTP status codes: 200, 201, 204, 400, 404, 409."
    ],
    "references": [
      {
        "title": "Create web APIs with ASP.NET Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/web-api/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-6-4": {
    "id": "topic-6-4",
    "title": "Dependency Injection",
    "category": "6. ASP.NET Core & REST API Development",
    "description": "Service lifetimes (Transient, Scoped, Singleton); built-in DI container; constructor injection; keyed services (.NET 8)",
    "objectives": [
      "Understand Inversion of Control (IoC) and constructor injection",
      "Differentiate the three service lifetimes: Transient, Scoped, and Singleton",
      "Avoid the captive dependency architectural flaw",
      "Utilize Keyed Services (.NET 8) to inject multiple implementations of the same interface"
    ],
    "prerequisites": "Interfaces and OOP (Topics 1-4 and 1-5).",
    "terminology": [
      {
        "term": "Transient",
        "definition": "A new service instance is created every time it is requested from the container."
      },
      {
        "term": "Scoped",
        "definition": "A single service instance is created once per client HTTP request and shared across all components in that request."
      },
      {
        "term": "Singleton",
        "definition": "A single service instance is created once on application startup and shared across all requests throughout the application lifetime."
      },
      {
        "term": "Captive Dependency",
        "definition": "When a service with a longer lifetime holds a reference to a service with a shorter lifetime (e.g. a Singleton holding a Scoped DbContext)."
      }
    ],
    "concepts": [
      {
        "title": "Service Lifetimes and Keyed Services in .NET 8",
        "explanation": "ASP.NET Core has a built-in high-performance Dependency Injection container that manages object creation and disposal.",
        "codeSnippet": "var builder = WebApplication.CreateBuilder(args);\n\n// Registering service lifetimes:\nbuilder.Services.AddTransient<IEmailSender, SmtpEmailSender>();      // New instance every time\nbuilder.Services.AddScoped<IOrderRepository, SqlOrderRepository>();   // One instance per HTTP request (ideal for DbContext)\nbuilder.Services.AddSingleton<ICacheManager, InversionMemoryCache>(); // One instance for entire app\n\n// .NET 8 Keyed Services: Registering multiple implementations by key\nbuilder.Services.AddKeyedScoped<IPaymentGateway, StripeGateway>(\"stripe\");\nbuilder.Services.AddKeyedScoped<IPaymentGateway, PaypalGateway>(\"paypal\");\n\nvar app = builder.Build();\n\n// Consuming Keyed Services via constructor injection\npublic class CheckoutService(\n    [FromKeyedServices(\"stripe\")] IPaymentGateway paymentGateway,\n    IOrderRepository orderRepo)\n{\n    public async Task ProcessAsync(decimal amount) => await paymentGateway.ChargeAsync(amount);\n}",
        "language": "csharp",
        "output": "Injects dependencies automatically with controlled lifecycles and clean decoupling.",
        "lineExplanation": [
          "Line 4: AddTransient creates fresh instances on every injection.",
          "Line 5: AddScoped is used for DbContext and repositories (tied to HTTP request).",
          "Line 6: AddSingleton shares state application-wide (caches, single connection pools).",
          "Line 9: C# 12 primary constructor with [FromKeyedServices] resolves the specified implementation."
        ]
      }
    ],
    "diagram": "Service Lifetime Comparison:\nHTTP Request 1:\n  -> Scoped Instance A (Shared across Request 1)\n  -> Transient Instance 1\n  -> Transient Instance 2 (New!)\n  -> Singleton Instance X (Shared universally)\n\nHTTP Request 2:\n  -> Scoped Instance B (Brand new instance for Request 2!)\n  -> Transient Instance 3\n  -> Singleton Instance X (Exact same instance!)",
    "realWorldApplication": "Injecting database repositories, telemetry loggers, and HTTP clients into controllers without hardcoded dependencies.",
    "commonErrors": [
      {
        "error": "Cannot resolve scoped service from singleton (Captive Dependency)",
        "cause": "Injecting a Scoped service (like DbContext) into a Singleton service.",
        "fix": "Inject IServiceScopeFactory into the singleton and create a scope manually when needed, or change lifetimes."
      }
    ],
    "bestPractices": [
      "Always use Scoped lifetime for Entity Framework DbContext instances.",
      "Keep services stateless wherever possible.",
      "Prefer constructor injection over manual service locator (IServiceProvider.GetService) calls."
    ],
    "practiceQuestions": [
      {
        "question": "Which service lifetime creates a single instance per HTTP request in ASP.NET Core?",
        "options": [
          "Transient",
          "Scoped",
          "Singleton",
          "ThreadStatic"
        ],
        "answerIndex": 1,
        "explanation": "Scoped services are created once per client HTTP request and disposed when the request finishes."
      }
    ],
    "revisionSummary": [
      "Transient: new instance every request.",
      "Scoped: one per HTTP request (use for DbContext).",
      "Singleton: one for the entire application life.",
      "Keyed services (.NET 8) allow multiple named implementations."
    ],
    "references": [
      {
        "title": "Dependency Injection in ASP.NET Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-6-5": {
    "id": "topic-6-5",
    "title": "Model Validation & DTOs",
    "category": "6. ASP.NET Core & REST API Development",
    "description": "Data annotations; FluentValidation; DTO pattern; AutoMapper / Mapster awareness; validation filters",
    "objectives": [
      "Separate domain entities from external contracts using Data Transfer Objects (DTOs)",
      "Enforce validation rules using Data Annotations ([Required], [StringLength], [EmailAddress])",
      "Author clean, decoupled validation pipelines using FluentValidation",
      "Understand mapping libraries (Mapster, AutoMapper) vs explicit manual mapping"
    ],
    "prerequisites": "Records, DTOs, and Controllers.",
    "terminology": [
      {
        "term": "DTO (Data Transfer Object)",
        "definition": "An object that carries data between processes (client and server) without containing business logic."
      },
      {
        "term": "FluentValidation",
        "definition": "A popular open-source .NET library for building strongly-typed, testable validation rules separated from model classes."
      }
    ],
    "concepts": [
      {
        "title": "Clean Validation with FluentValidation",
        "explanation": "Data annotations can clutter DTOs. FluentValidation keeps DTOs clean by separating validation rules into dedicated classes.",
        "codeSnippet": "// 1. Clean DTO\npublic record RegisterUserDto(string Email, string Password, int Age);\n\n// 2. FluentValidator Class\npublic class RegisterUserValidator : FluentValidation.AbstractValidator<RegisterUserDto>\n{\n    public RegisterUserValidator()\n    {\n        RuleFor(x => x.Email)\n            .NotEmpty().WithMessage(\"Email is required.\")\n            .EmailAddress().WithMessage(\"A valid email address is required.\");\n\n        RuleFor(x => x.Password)\n            .NotEmpty()\n            .MinimumLength(8).WithMessage(\"Password must be at least 8 characters long.\")\n            .Matches(\"[A-Z]\").WithMessage(\"Password must contain an uppercase letter.\")\n            .Matches(\"[0-9]\").WithMessage(\"Password must contain a number.\");\n\n        RuleFor(x => x.Age)\n            .InclusiveBetween(18, 120).WithMessage(\"Must be at least 18 years old.\");\n    }\n}",
        "language": "csharp",
        "output": "Produces structured 400 Bad Request ProblemDetails validation error responses.",
        "lineExplanation": [
          "Line 2: DTO remains an immutable, lightweight record.",
          "Line 5: Validator encapsulates complex business rules and custom messages.",
          "Line 13: Regex matching guarantees password complexity."
        ]
      }
    ],
    "diagram": "Validation Pipeline:\n[ Incoming JSON Request ]\n           |\n  (Model Binding to DTO)\n           |\n  (FluentValidation Pipeline)\n      /             \\\n (Valid)           (Invalid)\n    |                  |\n[ To Controller ]   [ 400 Bad Request (RFC 7807 ProblemDetails) ]",
    "realWorldApplication": "Validating user registrations, order checkout payloads, and payment card inputs prior to hitting domain logic.",
    "commonErrors": [
      {
        "error": "Exposing Entity Framework database models directly as Web API inputs",
        "cause": "Exposes sensitive fields (password hashes, internal IDs) and invites Over-Posting security attacks.",
        "fix": "Never accept raw database entities in controller actions; always use DTOs."
      }
    ],
    "bestPractices": [
      "Always use DTOs for API requests and responses.",
      "Prefer FluentValidation over Data Annotations for complex, conditional, or database-dependent validation.",
      "Perform mapping explicitly in small apps, or use Mapster for high-speed automated mapping."
    ],
    "practiceQuestions": [
      {
        "question": "Why should Entity Framework models never be exposed directly as input parameters in public API controllers?",
        "options": [
          "They compile slower.",
          "It exposes the application to Mass Assignment / Over-Posting vulnerabilities where clients send unintended properties (e.g. IsAdmin = true).",
          "EF Core forbids it.",
          "They cannot be converted to JSON."
        ],
        "answerIndex": 1,
        "explanation": "Directly binding database entities allows attackers to manipulate fields like IsAdmin or Role via over-posting."
      }
    ],
    "revisionSummary": [
      "DTOs protect internal domain models.",
      "FluentValidation enables clean, testable validation separated from data classes.",
      "Return RFC 7807 ProblemDetails on validation failure."
    ],
    "references": [
      {
        "title": "Model validation in ASP.NET Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-6-6": {
    "id": "topic-6-6",
    "title": "EF Core Fundamentals",
    "category": "6. ASP.NET Core & REST API Development",
    "description": "DbContext; DbSet; code-first vs database-first; connection strings; migrations (add, update, rollback)",
    "objectives": [
      "Configure DbContext and DbSet collections in ASP.NET Core",
      "Master the Code-First development workflow using EF Core Migrations",
      "Manage database connection strings safely across environments",
      "Execute CLI commands: dotnet ef migrations add, dotnet ef database update, and script generation"
    ],
    "prerequisites": "C# Classes, SQL basics, and Dependency Injection.",
    "terminology": [
      {
        "term": "DbContext",
        "definition": "The primary class in EF Core responsible for managing database connections, querying, change tracking, and persisting data."
      },
      {
        "term": "DbSet<T>",
        "definition": "Represents a collection of entities that can be queried and saved in a specific database table."
      },
      {
        "term": "Code-First Migration",
        "definition": "A workflow where C# classes define the schema, and EF generates C# migration files to evolve the database schema over time."
      }
    ],
    "concepts": [
      {
        "title": "Configuring DbContext and Migrations",
        "explanation": "Entity Framework Core is Microsoft's modern Object-Relational Mapper (ORM) for .NET.",
        "codeSnippet": "using Microsoft.EntityFrameworkCore;\n\n// 1. Domain Entity\npublic class Product\n{\n    public int Id { get; set; }\n    public string Name { get; set; } = string.Empty;\n    public decimal Price { get; set; }\n}\n\n// 2. Application DbContext\npublic class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)\n{\n    public DbSet<Product> Products => Set<Product>();\n}\n\n// 3. Registration in Program.cs:\n// builder.Services.AddDbContext<AppDbContext>(options =>\n//     options.UseSqlServer(builder.Configuration.GetConnectionString(\"DefaultConnection\")));\n\n// 4. CLI Migrations workflow in terminal:\n// dotnet ef migrations add InitialCreate\n// dotnet ef database update",
        "language": "csharp",
        "output": "Builds schema migration and generates SQL CREATE TABLE Products in database.",
        "lineExplanation": [
          "Line 11: DbContext constructor takes DbContextOptions to configure SQL Server provider and connection strings.",
          "Line 13: DbSet<Product> maps to the 'Products' table in SQL Server."
        ]
      }
    ],
    "diagram": "Code-First Workflow:\n[ C# Entity Classes ] ---> (dotnet ef migrations add) ---> [ C# Migration Files ]\n                                                                   |\n                                                        (dotnet ef database update)\n                                                                   v\n                                                        [ Live SQL Database Table ]",
    "realWorldApplication": "Standard ORM backing almost all modern enterprise .NET applications for seamless data access.",
    "commonErrors": [
      {
        "error": "No database provider has been configured for this DbContext",
        "cause": "Forgetting to call options.UseSqlServer() or passing empty options.",
        "fix": "Register DbContext in Program.cs with AddDbContext and configure the provider."
      }
    ],
    "bestPractices": [
      "Always generate SQL migration scripts ('dotnet ef migrations script') for production deployments rather than running database.Migrate() on web startup.",
      "Store connection strings in User Secrets locally and Environment Variables in cloud production."
    ],
    "practiceQuestions": [
      {
        "question": "What dotnet CLI command applies pending migrations to the target database in EF Core?",
        "options": [
          "dotnet ef migrations add",
          "dotnet ef database update",
          "dotnet ef build",
          "dotnet ef schema push"
        ],
        "answerIndex": 1,
        "explanation": "'dotnet ef database update' applies all unapplied migration files to the database."
      }
    ],
    "revisionSummary": [
      "DbContext manages connections, change tracking, and queries.",
      "DbSet represents tables.",
      "Use migrations to version-control your database schema alongside application code."
    ],
    "references": [
      {
        "title": "Entity Framework Core Overview - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/ef/core/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-6-7": {
    "id": "topic-6-7",
    "title": "EF Core Relationships & Queries",
    "category": "6. ASP.NET Core & REST API Development",
    "description": "One-to-one, one-to-many, many-to-many; Fluent API vs data annotations; eager, lazy & explicit loading; AsNoTracking",
    "objectives": [
      "Model 1:1, 1:N, and N:M relationships using EF Core navigation properties",
      "Configure complex constraints and relationships using Fluent API (OnModelCreating)",
      "Master Eager Loading with .Include() and .ThenInclude()",
      "Maximize read query performance using .AsNoTracking()"
    ],
    "prerequisites": "EF Core fundamentals (Topic 6-6) and SQL Joins (Topic 5-4).",
    "terminology": [
      {
        "term": "Navigation Property",
        "definition": "A property on an entity that references related entities (e.g. Order.Items or OrderItem.Order)."
      },
      {
        "term": "Eager Loading",
        "definition": "Loading related data alongside the main entity in a single SQL query using the .Include() method."
      },
      {
        "term": "AsNoTracking()",
        "definition": "Disables EF Core's change tracker for read-only queries, drastically reducing memory and CPU overhead."
      }
    ],
    "concepts": [
      {
        "title": "Fluent API Relationships and High-Speed Queries",
        "explanation": "Fluent API provides full control over database schema generation, cascading deletes, and many-to-many relationships.",
        "codeSnippet": "public class Customer\n{\n    public int Id { get; set; }\n    public string Name { get; set; } = \"\";\n    public List<Order> Orders { get; set; } = new(); // 1-to-Many\n}\n\npublic class Order\n{\n    public int Id { get; set; }\n    public int CustomerId { get; set; }\n    public Customer Customer { get; set; } = null!;\n}\n\n// Fluent API Configuration in DbContext\nprotected override void OnModelCreating(ModelBuilder modelBuilder)\n{\n    modelBuilder.Entity<Customer>()\n        .HasMany(c => c.Orders)\n        .WithOne(o => o.Customer)\n        .HasForeignKey(o => o.CustomerId)\n        .OnDelete(DeleteBehavior.Cascade);\n}\n\n// Optimized Read Query with Eager Loading & No Tracking\npublic async Task<List<Customer>> GetCustomersWithOrdersAsync(AppDbContext db)\n{\n    return await db.Customers\n        .AsNoTracking() // Disables change tracker for fast read performance!\n        .Include(c => c.Orders) // Eagerly joins Orders table\n        .ToListAsync();\n}",
        "language": "csharp",
        "output": "Generates clean SQL LEFT JOIN reading customers and orders in one round-trip with zero change tracker overhead.",
        "lineExplanation": [
          "Line 17: Fluent API explicitly configures the 1-to-Many relationship and cascade behavior.",
          "Line 27: .AsNoTracking() tells EF Core not to store object snapshots in memory.",
          "Line 28: .Include(c => c.Orders) eagerly loads related child orders."
        ]
      }
    ],
    "diagram": "Loading Strategies:\nEager Loading:   db.Customers.Include(c => c.Orders) ---> 1 SQL Query (LEFT JOIN)\nLazy Loading:    customer.Orders (accessed later)    ---> Triggers hidden N+1 queries!\nAsNoTracking:    Fastest read; memory snapshots omitted.",
    "realWorldApplication": "Powering read-heavy customer dashboards and reports where maximum throughput and minimum memory footprints are critical.",
    "commonErrors": [
      {
        "error": "Forgetting .Include() and getting NullReferenceException on child collections",
        "cause": "EF Core does not load related tables by default unless lazy loading proxies are enabled or .Include() is called.",
        "fix": "Always call .Include(x => x.ChildProperty) when related data is needed."
      }
    ],
    "bestPractices": [
      "Always append .AsNoTracking() to read-only queries in Web API GET endpoints.",
      "Prefer Eager Loading (.Include()) over Lazy Loading in Web APIs to prevent N+1 query performance disasters.",
      "Configure entity relationships using Fluent API rather than cluttered Data Annotations."
    ],
    "practiceQuestions": [
      {
        "question": "Why should you use .AsNoTracking() on read-only queries in ASP.NET Core Web APIs?",
        "options": [
          "It makes the database read from cache.",
          "It instructs EF Core not to track entity modifications, saving significant CPU and memory.",
          "It enables lazy loading.",
          "It forces the query to use an index."
        ],
        "answerIndex": 1,
        "explanation": ".AsNoTracking() skips snapshot generation in the change tracker, providing faster query execution and lower memory allocation for read-only operations."
      }
    ],
    "revisionSummary": [
      "Fluent API in OnModelCreating defines relationships cleanly.",
      "Use .Include() for eager loading.",
      "Always use .AsNoTracking() on read-only queries."
    ],
    "references": [
      {
        "title": "Relationships in EF Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/ef/core/modeling/relationships",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-6-8": {
    "id": "topic-6-8",
    "title": "EF Core Advanced & Performance",
    "category": "6. ASP.NET Core & REST API Development",
    "description": "Raw SQL queries; transactions in EF; N+1 query problem & prevention; split queries; interceptors",
    "objectives": [
      "Detect and eliminate the N+1 query performance antipattern",
      "Use Split Queries (.AsSplitQuery()) to prevent Cartesian explosion on multi-collection joins",
      "Execute raw SQL safely via FromSqlInterpolated and ExecuteUpdateAsync (.NET 7+)",
      "Implement EF Core interceptors for automated audit logging"
    ],
    "prerequisites": "EF Core queries and SQL Performance.",
    "terminology": [
      {
        "term": "N+1 Query Problem",
        "definition": "A catastrophic performance trap where 1 query fetches parent rows, and then N separate SQL queries execute inside a loop to fetch children."
      },
      {
        "term": "Cartesian Explosion",
        "definition": "When multiple .Include() calls generate massive duplicate row payloads due to multiple SQL joins."
      },
      {
        "term": "AsSplitQuery()",
        "definition": "Tells EF Core to generate separate SQL queries for each collection include rather than a single massive join."
      }
    ],
    "concepts": [
      {
        "title": "Solving Cartesian Explosion with Split Queries",
        "explanation": "When including multiple collections (e.g. Order.Items and Order.Shipments), a single join duplicates parent data exponentially. .AsSplitQuery() resolves this cleanly.",
        "codeSnippet": "// 1. Solving Cartesian Explosion with Split Queries\nvar order = await db.Orders\n    .AsNoTracking()\n    .Include(o => o.Items)\n    .Include(o => o.Shipments)\n    .AsSplitQuery() // Generates 3 clean, independent queries instead of 1 massive join!\n    .FirstOrDefaultAsync(o => o.Id == orderId);\n\n// 2. High-Speed Bulk Updates in .NET 7+ without loading entities into memory!\nawait db.Products\n    .Where(p => p.CategoryId == 5)\n    .ExecuteUpdateAsync(setters => setters\n        .SetProperty(p => p.Price, p => p.Price * 1.10m)); // 10% inflation adjustment directly on SQL server!",
        "language": "csharp",
        "output": "Executes targeted split queries and direct database updates with zero entity loading overhead.",
        "lineExplanation": [
          "Line 6: .AsSplitQuery() splits the query into separate SELECT statements, avoiding Cartesian row multiplication.",
          "Line 11: ExecuteUpdateAsync runs directly on SQL Server without loading entities into memory."
        ]
      }
    ],
    "diagram": "Cartesian Explosion vs Split Query:\nSingle Query Join:  Order (1) x Items (10) x Shipments (5) = 50 large duplicate rows transferred!\nSplit Queries:      Query 1: 1 Order + Query 2: 10 Items + Query 3: 5 Shipments = 16 rows total!",
    "realWorldApplication": "Optimizing high-traffic checkout flows and batch-updating tens of thousands of catalog prices instantaneously.",
    "commonErrors": [
      {
        "error": "Iterating a collection and calling db.RelatedItems.Where() inside the foreach loop",
        "cause": "Classic N+1 query problem; executes 1,000 queries for 1,000 items, freezing the server.",
        "fix": "Eager load with .Include(), project via LINQ, or use a single batch query with an IN clause."
      }
    ],
    "bestPractices": [
      "Use .AsSplitQuery() whenever including two or more sibling collections.",
      "Use ExecuteUpdateAsync and ExecuteDeleteAsync for bulk operations instead of loading and looping.",
      "Inspect generated SQL in development by configuring logging with LogTo(Console.WriteLine)."
    ],
    "practiceQuestions": [
      {
        "question": "What is the primary benefit of .AsSplitQuery() when including multiple collections in EF Core?",
        "options": [
          "It forces the query to use in-memory collections.",
          "It prevents Cartesian explosion and duplicate data transfer by generating separate SQL queries for each collection.",
          "It disables the database connection.",
          "It runs the query on a background thread."
        ],
        "answerIndex": 1,
        "explanation": ".AsSplitQuery() generates separate SQL statements for each included collection, preventing the massive data multiplication of multi-join Cartesian products."
      }
    ],
    "revisionSummary": [
      "Eliminate N+1 queries using .Include().",
      "Use .AsSplitQuery() to prevent Cartesian explosion on multi-collection joins.",
      "Use ExecuteUpdateAsync/ExecuteDeleteAsync for zero-allocation bulk operations."
    ],
    "references": [
      {
        "title": "Single vs Split Queries - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/ef/core/querying/single-split-queries",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-6-9": {
    "id": "topic-6-9",
    "title": "API Documentation (OpenAPI / Swagger)",
    "category": "6. ASP.NET Core & REST API Development",
    "description": "Swagger/OpenAPI; Swashbuckle / Microsoft.AspNetCore.OpenApi; XML documentation; Postman for API testing",
    "objectives": [
      "Generate OpenAPI specifications automatically using Swashbuckle and Microsoft.AspNetCore.OpenApi",
      "Enable XML code comments in .csproj to populate Swagger documentation headers",
      "Annotate controllers with [ProducesResponseType] and operation descriptions",
      "Export OpenAPI JSON schemas into Postman or frontend client code generators"
    ],
    "prerequisites": "Controllers and DTOs.",
    "terminology": [
      {
        "term": "OpenAPI Specification",
        "definition": "A standard, language-agnostic interface description for REST APIs that enables both humans and computers to discover capabilities."
      },
      {
        "term": "Swagger UI",
        "definition": "An interactive, browser-based web page that renders OpenAPI definitions and allows testing endpoints directly."
      }
    ],
    "concepts": [
      {
        "title": "Enriching OpenAPI Documentation with XML Comments",
        "explanation": "Enabling XML comments produces clear, interactive Swagger documentation directly from your C# code docstrings.",
        "codeSnippet": "/// <summary>\n/// Retrieves detailed order metadata and line items.\n/// </summary>\n/// <param name=\"id\">The unique integer identifier of the order.</param>\n/// <response code=\"200\">Returns the requested order.</response>\n/// <response code=\"404\">If the order does not exist.</response>\n[HttpGet(\"{id:int}\")]\n[ProducesResponseType(typeof(OrderDto), StatusCodes.Status200OK)]\n[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]\npublic async Task<ActionResult<OrderDto>> GetOrder(int id)\n{\n    var order = await _orderService.GetByIdAsync(id);\n    return order != null ? Ok(order) : NotFound();\n}",
        "language": "csharp",
        "output": "Renders clean documentation and parameter descriptions directly on the /swagger UI page.",
        "lineExplanation": [
          "Line 1-5: Standard triple-slash XML documentation is compiled into Swagger summaries.",
          "Line 8-9: [ProducesResponseType] informs Swagger of possible HTTP return codes and schemas."
        ]
      }
    ],
    "diagram": "API Documentation Flow:\n[ C# Controllers + XML Comments ] ---> (Swashbuckle / OpenAPI Generator)\n                                                    |\n                                    +---------------+---------------+\n                                    |                               |\n                                    v                               v\n                            [ Swagger UI Browser ]         [ Postman / Client SDKs ]",
    "realWorldApplication": "Providing live interactive API documentation to frontend teams and external business integration partners.",
    "commonErrors": [
      {
        "error": "XML comments missing from Swagger UI",
        "cause": "<GenerateDocumentationFile>true</GenerateDocumentationFile> was not added to the .csproj file.",
        "fix": "Enable documentation generation in .csproj and register the XML file in builder.Services.AddSwaggerGen()."
      }
    ],
    "bestPractices": [
      "Annotate all endpoints with [ProducesResponseType] for all expected status codes (200, 400, 401, 404).",
      "Restrict Swagger UI to the Development environment in Program.cs to avoid exposing internal endpoints publicly.",
      "Export OpenAPI definitions to generate TypeScript client services automatically."
    ],
    "practiceQuestions": [
      {
        "question": "What is the primary function of OpenAPI/Swagger in ASP.NET Core?",
        "options": [
          "To speed up database queries.",
          "To provide a standard specification and interactive UI for discovering and testing API endpoints.",
          "To compile C# to JavaScript.",
          "To encrypt HTTP traffic."
        ],
        "answerIndex": 1,
        "explanation": "OpenAPI provides standardized, interactive documentation enabling developers to inspect and test API endpoints."
      }
    ],
    "revisionSummary": [
      "Swagger UI renders interactive OpenAPI schemas.",
      "XML docstrings enrich endpoint and parameter descriptions.",
      "ProducesResponseType defines expected return types and errors."
    ],
    "references": [
      {
        "title": "ASP.NET Core web API documentation with Swagger - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-6-10": {
    "id": "topic-6-10",
    "title": "Global Error Handling & ProblemDetails",
    "category": "6. ASP.NET Core & REST API Development",
    "description": "Global exception handling; ExceptionHandlerMiddleware / IExceptionHandler (.NET 8); ProblemDetails (RFC 7807)",
    "objectives": [
      "Implement centralized global exception handling without repetitive try-catch blocks in controllers",
      "Use modern .NET 8 IExceptionHandler interface for clean error dispatching",
      "Produce standardized RFC 7807 ProblemDetails JSON error responses",
      "Prevent sensitive server stack traces from leaking to public API clients"
    ],
    "prerequisites": "Middleware (Topic 6-1) and Exceptions (Topic 1-7).",
    "terminology": [
      {
        "term": "ProblemDetails (RFC 7807)",
        "definition": "An industry standard HTTP specification for machine-readable error responses containing title, status, detail, and instance URI."
      },
      {
        "term": "IExceptionHandler",
        "definition": "A .NET 8 interface that provides an elegant, centralized mechanism to intercept and format unhandled exceptions."
      }
    ],
    "concepts": [
      {
        "title": "Modern Global Exception Handling with IExceptionHandler (.NET 8)",
        "explanation": "Instead of writing try-catch in every controller action, register a global exception handler that translates domain exceptions into standard ProblemDetails.",
        "codeSnippet": "using Microsoft.AspNetCore.Diagnostics;\nusing Microsoft.AspNetCore.Mvc;\n\npublic class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler\n{\n    public async ValueTask<bool> TryHandleAsync(\n        HttpContext httpContext,\n        Exception exception,\n        CancellationToken cancellationToken)\n    {\n        logger.LogError(exception, \"Unhandled exception occurred: {Message}\", exception.Message);\n\n        // Map domain exceptions to appropriate HTTP status codes\n        var (statusCode, title) = exception switch\n        {\n            KeyNotFoundException => (StatusCodes.Status404NotFound, \"Resource Not Found\"),\n            ArgumentException => (StatusCodes.Status400BadRequest, \"Invalid Request Data\"),\n            UnauthorizedAccessException => (StatusCodes.Status401Unauthorized, \"Unauthorized\"),\n            _ => (StatusCodes.Status500InternalServerError, \"Server Error\")\n        };\n\n        var problemDetails = new ProblemDetails\n        {\n            Status = statusCode,\n            Title = title,\n            Detail = exception.Message,\n            Instance = httpContext.Request.Path\n        };\n\n        httpContext.Response.StatusCode = statusCode;\n        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);\n        return true; // Exception handled successfully!\n    }\n}\n\n// In Program.cs:\n// builder.Services.AddExceptionHandler<GlobalExceptionHandler>();\n// builder.Services.AddProblemDetails();\n// ...\n// app.UseExceptionHandler();",
        "language": "csharp",
        "output": "Returns RFC 7807 compliant JSON error response without exposing internal server crash logs.",
        "lineExplanation": [
          "Line 4: Implements .NET 8 IExceptionHandler interface.",
          "Line 14: Pattern matching maps exception types to appropriate HTTP status codes.",
          "Line 22: ProblemDetails provides standard fields: status, title, detail, instance."
        ]
      }
    ],
    "diagram": "Global Exception Pipeline:\n[ Controller throws KeyNotFoundException ]\n                   |\n     (Bubble up to Middleware)\n                   |\n[ IExceptionHandler intercepts error ]\n                   |\n[ Converts to RFC 7807 ProblemDetails ] ====> [ Client receives 404 JSON ]",
    "realWorldApplication": "Standard error architecture across all professional microservices, ensuring frontend clients receive predictable JSON payloads on failure.",
    "commonErrors": [
      {
        "error": "Returning raw exception.ToString() in production",
        "cause": "Leaks database connection strings, file paths, and internal server architecture to potential attackers.",
        "fix": "Return generic error details in production and log full details to a secure server sink."
      }
    ],
    "bestPractices": [
      "Always use RFC 7807 ProblemDetails for all error responses (4xx and 5xx).",
      "Log full exception details and stack traces with ILogger before sanitizing the response.",
      "Use .NET 8's IExceptionHandler for clean, decoupled error management."
    ],
    "practiceQuestions": [
      {
        "question": "What is RFC 7807 in the context of REST APIs?",
        "options": [
          "A routing protocol.",
          "An industry standard specification defining the ProblemDetails format for HTTP API error responses.",
          "A JSON encryption format.",
          "A database indexing standard."
        ],
        "answerIndex": 1,
        "explanation": "RFC 7807 establishes ProblemDetails as the standardized format for reporting errors in HTTP APIs."
      }
    ],
    "revisionSummary": [
      "Never write manual try-catch blocks in every controller.",
      "Use .NET 8 IExceptionHandler to centralize error mapping.",
      "Return RFC 7807 ProblemDetails for consistent API error responses."
    ],
    "references": [
      {
        "title": "Handle errors in ASP.NET Core web APIs - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/web-api/handle-errors",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-6-11": {
    "id": "topic-6-11",
    "title": "AI Integration in ASP.NET Core & REST APIs",
    "category": "6. ASP.NET Core & REST API Development",
    "description": "Scaffolding controllers and CRUD operations with Copilot; generating EF Core migrations and queries with AI",
    "objectives": [
      "Prompt AI to scaffold complete CRUD controllers with DTOs and validation",
      "Audit AI-generated EF Core queries for tracking issues and missing indexes",
      "Direct AI to generate database migrations and verify generated SQL scripts",
      "Identify security gaps in AI-generated endpoint authorization attributes"
    ],
    "prerequisites": "Modules 5 and 6.",
    "terminology": [
      {
        "term": "CRUD Scaffolding",
        "definition": "Automatically generating Create, Read, Update, Delete endpoints and service methods from entity models."
      }
    ],
    "concepts": [
      {
        "title": "Auditing AI-Generated REST Endpoints",
        "explanation": "AI often scaffolds CRUD controllers that look functional but miss critical security attributes and performance options.",
        "codeSnippet": "// PROMPT: \"Generate an ASP.NET Core controller for Products with EF Core.\"\n\n// AUDIT CHECKLIST FOR AI OUTPUT:\n[ApiController]\n[Route(\"api/[controller]\")]\n[Authorize] // 1. AI often OMITS authorization! Always verify!\npublic class ProductsController(AppDbContext db) : ControllerBase\n{\n    [HttpGet]\n    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()\n    {\n        // 2. AI often forgets .AsNoTracking() and projects entity directly instead of DTO!\n        return await db.Products\n            .AsNoTracking()\n            .Select(p => new ProductDto(p.Id, p.Name, p.Price))\n            .ToListAsync();\n    }\n}",
        "language": "csharp",
        "output": "Audited, secure, high-performance controller adhering to clean architecture standards.",
        "lineExplanation": [
          "Line 5: Engineer adds [Authorize] to secure the endpoint.",
          "Line 12: Adds .AsNoTracking() and projects directly to DTO to prevent over-posting."
        ]
      }
    ],
    "diagram": "AI CRUD Code Audit:\n1. Is [Authorize] present on sensitive endpoints?\n2. Are DTOs used instead of exposing database entities?\n3. Is .AsNoTracking() used on read queries?\n4. Are inputs validated with FluentValidation?",
    "realWorldApplication": "Rapidly scaffolding boilerplate CRUD endpoints while maintaining enterprise security and performance standards.",
    "commonErrors": [
      {
        "error": "Accepting AI controllers that accept raw DbContext entities in [HttpPost]",
        "cause": "Exposes database models to over-posting attacks and breaks architectural boundaries.",
        "fix": "Force AI to generate dedicated DTO records for requests and responses."
      }
    ],
    "bestPractices": [
      "Include explicit constraints in prompts: 'Use DTOs, .AsNoTracking(), and CancellationToken'.",
      "Always inspect generated migration code before running database update.",
      "Verify that all endpoints have proper HTTP verb attributes."
    ],
    "practiceQuestions": [
      {
        "question": "What critical security oversight does AI commonly make when scaffolding basic REST API controllers?",
        "options": [
          "Using camelCase names.",
          "Omitting authentication and authorization attributes ([Authorize]), leaving endpoints publicly accessible.",
          "Using async methods.",
          "Generating DTOs."
        ],
        "answerIndex": 1,
        "explanation": "AI frequently generates open, unauthenticated endpoints by default. Engineers must ensure [Authorize] is applied."
      }
    ],
    "revisionSummary": [
      "AI accelerates CRUD controller scaffolding.",
      "Always add [Authorize], DTO projections, and .AsNoTracking().",
      "Review generated migrations prior to execution."
    ],
    "references": [
      {
        "title": "Secure ASP.NET Core Web APIs - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/security/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-6-12": {
    "id": "topic-6-12",
    "title": "Assessment 3: REST API Checkpoint",
    "category": "6. ASP.NET Core & REST API Development",
    "description": "Build a complete CRUD REST API with EF Core, validation, DTOs, global error handling, and Swagger docs",
    "objectives": [
      "Synthesize all Module 6 concepts into a production-grade Web API project",
      "Implement full CRUD operations with EF Core and SQL Server/SQLite",
      "Incorporate FluentValidation, DTO mapping, and global exception handling with ProblemDetails",
      "Verify endpoints interactively via Swagger UI"
    ],
    "prerequisites": "Completion of Modules 5 and 6.",
    "terminology": [
      {
        "term": "Capstone REST API",
        "definition": "A fully functional, multi-tier Web API demonstrating mastery of modern backend architecture."
      }
    ],
    "concepts": [
      {
        "title": "Hands-on Checkpoint Project Architecture",
        "explanation": "This complete project ties together DbContext, DTOs, FluentValidation, Global Exception Handling, and Swagger documentation.",
        "codeSnippet": "// Complete production-ready REST API skeleton in Program.cs\nvar builder = WebApplication.CreateBuilder(args);\n\nbuilder.Services.AddControllers();\nbuilder.Services.AddEndpointsApiExplorer();\nbuilder.Services.AddSwaggerGen();\nbuilder.Services.AddProblemDetails();\nbuilder.Services.AddExceptionHandler<GlobalExceptionHandler>();\n\nbuilder.Services.AddDbContext<StoreDbContext>(opt => \n    opt.UseInMemoryDatabase(\"StoreDb\"));\n\nvar app = builder.Build();\n\nif (app.Environment.IsDevelopment())\n{\n    app.UseSwagger();\n    app.UseSwaggerUI();\n}\n\napp.UseExceptionHandler();\napp.UseHttpsRedirection();\napp.UseAuthorization();\napp.MapControllers();\n\napp.Run();",
        "language": "csharp",
        "output": "Starts fully functional REST API with Swagger UI accessible at /swagger.",
        "lineExplanation": [
          "Demonstrates clean configuration of all modern .NET 8 API infrastructure services."
        ]
      }
    ],
    "diagram": "Checkpoint Solution Architecture:\n[ HTTP Request ] ---> [ Middleware (Swagger, Exception Handler, Auth) ]\n                                   |\n                       [ Controller / Endpoints ]\n                                   |\n                       [ DTOs + FluentValidation ]\n                                   |\n                       [ EF Core DbContext ] ---> [ Database ]",
    "realWorldApplication": "Serves as the commercial backend architecture template for full-stack enterprise web applications.",
    "commonErrors": [
      {
        "error": "Failing to test error paths in Swagger",
        "cause": "Only testing happy-path 200 responses.",
        "fix": "Test invalid payloads to verify 400 ProblemDetails and non-existent IDs for 404 responses."
      }
    ],
    "bestPractices": [
      "Validate all inputs before hitting the database.",
      "Keep controllers thin by delegating business logic to service classes.",
      "Ensure all endpoints have descriptive Swagger documentation."
    ],
    "practiceQuestions": [
      {
        "question": "What is the primary role of DTOs in a production Web API checkpoint project?",
        "options": [
          "To replace database tables.",
          "To decouple the API contract from the internal database schema, preventing over-posting and data leaks.",
          "To speed up compilation.",
          "To manage threads."
        ],
        "answerIndex": 1,
        "explanation": "DTOs act as clean data contracts between clients and servers, isolating database changes from external consumers."
      }
    ],
    "revisionSummary": [
      "Integrates EF Core, DTOs, FluentValidation, and Global Error Handling.",
      "Validates full backend competency before proceeding to security and frontend."
    ],
    "references": [
      {
        "title": "Tutorial: Create a web API with ASP.NET Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api",
        "source": "Microsoft Learn"
      }
    ]
  }
};
