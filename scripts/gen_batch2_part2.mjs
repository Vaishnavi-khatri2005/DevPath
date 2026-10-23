import fs from 'fs';

function writeModule(filename, varName, lessons) {
  const content = `/**
 * Pre-generated comprehensive lessons for ${varName}
 * Sources: Microsoft Learn, ASP.NET Core Guides, EF Core Docs.
 */

export const ${varName} = ${JSON.stringify(lessons, null, 2)};
`;
  fs.writeFileSync(`src/data/lessons/${filename}`, content);
  console.log(`Generated src/data/lessons/${filename} (${Object.keys(lessons).length} topics)`);
}

// -------------------------------------------------------------
// MODULE 6: ASP.NET Core & REST API Development (12 topics)
// -------------------------------------------------------------
const m6 = {
  "topic-6-1": {
    id: "topic-6-1",
    title: "Web API Architecture",
    category: "6. ASP.NET Core & REST API Development",
    description: "Controller-based vs Minimal APIs; Program.cs structure; middleware pipeline; HTTP request lifecycle",
    objectives: [
      "Understand the HTTP request lifecycle through the ASP.NET Core middleware pipeline",
      "Compare Controller-based APIs with modern .NET Minimal APIs",
      "Master the structure of Program.cs (WebApplicationBuilder vs WebApplication)",
      "Configure order-dependent middleware components correctly"
    ],
    prerequisites: "C# Fundamentals and Dependency Injection concepts.",
    terminology: [
      { term: "Middleware", definition: "Software assembled into an application pipeline to handle requests and responses in a bidirectional Russian-doll model." },
      { term: "Minimal API", definition: "A lightweight approach in ASP.NET Core to create HTTP endpoints with minimal code and configuration using lambda mappers." },
      { term: "WebApplicationBuilder", definition: "The builder object in Program.cs used to configure services, logging, and environment configuration." }
    ],
    concepts: [
      {
        title: "Modern Program.cs and Middleware Pipeline",
        explanation: "ASP.NET Core processes requests through a bidirectional pipeline of middleware components. Order is critical: authentication must precede authorization.",
        codeSnippet: `var builder = WebApplication.CreateBuilder(args);

// 1. Configure Services (Dependency Injection Container)
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 2. Configure Middleware Pipeline (Order matters!)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularApp");

app.UseAuthentication(); // 1st: Who are you?
app.UseAuthorization();  // 2nd: Are you allowed in?

app.MapControllers(); // Maps controller endpoints

app.Run();`,
        language: "csharp",
        output: "Configures and starts the ASP.NET Core web server listening on configured ports.",
        lineExplanation: [
          "Line 1: WebApplication.CreateBuilder bootstraps configuration, logging, and DI container.",
          "Line 18-19: Authentication MUST precede Authorization in the middleware pipeline order.",
          "Line 21: MapControllers routes incoming requests to [ApiController] classes."
        ]
      }
    ],
    diagram: `Middleware Pipeline (Bidirectional):
Request ---> [ Logging ] ---> [ Exception Handler ] ---> [ Auth ] ---> [ Controller / Minimal API ]
                                                                                   |
Response <--- [ Logging ] <--- [ Exception Handler ] <--- [ Auth ] <--- [ HTTP Status Code / JSON ]`,
    realWorldApplication: "Architecting microservices and enterprise backends that service web, mobile, and third-party integrations.",
    commonErrors: [
      {
        error: "401/403 Errors even with valid tokens due to misplaced middleware",
        cause: "Placing app.UseAuthorization() before app.UseAuthentication().",
        fix: "Always call app.UseAuthentication() before app.UseAuthorization()."
      }
    ],
    bestPractices: [
      "Follow the standard middleware order: ExceptionHandler -> HttpsRedirection -> StaticFiles -> Routing -> CORS -> Authentication -> Authorization -> Endpoints.",
      "Use Minimal APIs for microservices and small services; use Controllers for large, feature-rich domain APIs."
    ],
    practiceQuestions: [
      {
        question: "In ASP.NET Core, what happens if app.UseAuthorization() is placed before app.UseAuthentication() in Program.cs?",
        options: [
          "The application crashes on startup.",
          "Authorization fails because user identity has not yet been authenticated and populated into HttpContext.User.",
          "CORS errors are thrown.",
          "There is no difference."
        ],
        answerIndex: 1,
        explanation: "Authentication must run first to identify the user and populate claims before authorization can evaluate permissions."
      }
    ],
    revisionSummary: [
      "Middleware executes bidirectionally.",
      "Order is strictly significant.",
      "Minimal APIs provide low-overhead endpoints; controllers suit complex domains."
    ],
    references: [
      { title: "ASP.NET Core Middleware - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/", source: "Microsoft Learn" }
    ]
  },

  "topic-6-2": {
    id: "topic-6-2",
    title: "Routing & Endpoints",
    category: "6. ASP.NET Core & REST API Development",
    description: "Route attributes, route templates, route constraints; query params vs route params vs body; Minimal API MapGet/MapPost",
    objectives: [
      "Design clean RESTful route templates using [Route(\"api/[controller]\")]",
      "Apply route constraints (e.g. {id:int:min(1)}) for automatic validation",
      "Distinguish between Route Parameters, Query String Parameters, and Request Bodies",
      "Implement Minimal API endpoints with MapGet, MapPost, MapPut, and MapDelete"
    ],
    prerequisites: "Web API architecture basics.",
    terminology: [
      { term: "Route Template", definition: "A URL pattern with parameter placeholders (e.g. \"api/products/{id:int}\") used by the routing engine to match incoming HTTP requests." },
      { term: "Route Constraint", definition: "A rule appended to a route parameter that restricts matches based on type or range (e.g. :int, :guid, :min(1))." }
    ],
    concepts: [
      {
        title: "Route Templates and Minimal APIs",
        explanation: "Modern ASP.NET Core supports expressive route constraints and high-speed Minimal API mapping.",
        codeSnippet: `// 1. Controller Route Template:
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    // Matches GET /api/products/42
    [HttpGet("{id:int:min(1)}")]
    public IActionResult GetById(int id) => Ok(new { Id = id, Name = "Keyboard" });

    // Matches GET /api/products?category=tech&page=2
    [HttpGet]
    public IActionResult Search([FromQuery] string category, [FromQuery] int page = 1)
        => Ok(new { Category = category, Page = page });
}

// 2. Minimal API Alternative:
// app.MapGet("/api/v2/products/{id:int}", (int id) => Results.Ok(new { Id = id }));`,
        language: "csharp",
        output: "Handles GET /api/products/42 and validates that id is a positive integer.",
        lineExplanation: [
          "Line 6: '{id:int:min(1)}' restricts routing to integers >= 1, automatically rejecting invalid requests with 404.",
          "Line 11: '[FromQuery]' binds parameters from the URL query string."
        ]
      }
    ],
    diagram: `URL Routing Anatomy:
https://api.mycorp.com/api/orders/104?expand=details
|                       |          |         |
Protocol & Host         Route Base Route Param Query Param`,
    realWorldApplication: "Building intuitive, self-documenting REST APIs that conform to Richardson Maturity Model standards.",
    commonErrors: [
      {
        error: "Route parameter ambiguity (AmbiguousMatchException)",
        cause: "Two endpoints have matching route patterns (e.g. api/orders/{id} and api/orders/{name}).",
        fix: "Apply route constraints (e.g. {id:int}) or introduce distinct route segments."
      }
    ],
    bestPractices: [
      "Use lowercase plural nouns for resource URLs (e.g. /api/customers, not /api/GetCustomer).",
      "Apply route constraints to prevent invalid string IDs from reaching controller code.",
      "Use query parameters for optional filtering, pagination, and sorting."
    ],
    practiceQuestions: [
      {
        question: "What HTTP status code does ASP.NET Core automatically return if a request fails a route constraint like {id:int}?",
        options: ["400 Bad Request", "404 Not Found", "500 Server Error", "405 Method Not Allowed"],
        answerIndex: 1,
        explanation: "Route constraint failures mean no route matched the URL pattern, causing the router to return a 404 Not Found."
      }
    ],
    revisionSummary: [
      "Use route constraints to filter input before reaching controller logic.",
      "Route parameters identify specific resources; query parameters filter and paginate.",
      "Follow RESTful naming conventions."
    ],
    references: [
      { title: "Routing in ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/routing", source: "Microsoft Learn" }
    ]
  },

  "topic-6-3": {
    id: "topic-6-3",
    title: "Controllers & Actions",
    category: "6. ASP.NET Core & REST API Development",
    description: "ControllerBase; ActionResult<T>; model binding; HTTP verbs (GET, POST, PUT, DELETE, PATCH); status codes",
    objectives: [
      "Extend ControllerBase for lightweight Web API controllers",
      "Return strongly-typed ActionResult<T> for clear OpenAPI schemas",
      "Master HTTP verbs: GET (read), POST (create), PUT (replace), DELETE (remove), PATCH (partial update)",
      "Leverage model binding sources: [FromBody], [FromRoute], [FromQuery], [FromHeader]"
    ],
    prerequisites: "OOP and Routing concepts.",
    terminology: [
      { term: "ControllerBase", definition: "The base class for ASP.NET Core Web APIs that provides HTTP helper methods (Ok(), NotFound(), CreatedAtAction()) without MVC view overhead." },
      { term: "ActionResult<T>", definition: "A return type enabling either an HTTP status result (NotFound()) or a strongly-typed model (T) to be returned." }
    ],
    concepts: [
      {
        title: "RESTful Controller with ActionResult<T>",
        explanation: "Using ControllerBase and ActionResult<T> ensures compile-time type safety while preserving standard HTTP status responses.",
        codeSnippet: `[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<OrderDto> GetOrder(int id)
    {
        var order = FindOrder(id);
        if (order == null)
            return NotFound($"Order #{id} not found."); // 404

        return Ok(order); // 200 with JSON payload
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public ActionResult<OrderDto> CreateOrder([FromBody] CreateOrderDto dto)
    {
        var newOrder = new OrderDto(101, dto.CustomerName, dto.Amount);
        
        // Returns 201 Created with Location header pointing to GetOrder!
        return CreatedAtAction(nameof(GetOrder), new { id = newOrder.Id }, newOrder);
    }
}

public record OrderDto(int Id, string CustomerName, decimal Amount);
public record CreateOrderDto(string CustomerName, decimal Amount);`,
        language: "csharp",
        output: "Handles GET and POST returning standard 200 OK, 404 NotFound, and 201 Created responses.",
        lineExplanation: [
          "Line 1: '[ApiController]' enables automatic model validation and inference of binding sources.",
          "Line 10: 'NotFound()' returns a 404 status code.",
          "Line 21: 'CreatedAtAction' produces standard 201 Created with a Location header containing the URL to fetch the new resource."
        ]
      }
    ],
    diagram: `HTTP Verb Mapping:
GET    /api/orders/{id} ---> Read resource (200 OK / 404 NotFound)
POST   /api/orders      ---> Create resource (201 Created + Location header)
PUT    /api/orders/{id} ---> Replace resource completely (200 OK / 204 NoContent)
DELETE /api/orders/{id} ---> Remove resource (204 NoContent)
PATCH  /api/orders/{id} ---> Partial modification of fields`,
    realWorldApplication: "Standard industry controller implementation for enterprise REST APIs consumed by Angular, React, and mobile apps.",
    commonErrors: [
      {
        error: "Inheriting from 'Controller' instead of 'ControllerBase' in Web APIs",
        cause: "'Controller' adds overhead for Razor Views (HTML pages) which are not used in REST APIs.",
        fix: "Inherit API controllers from 'ControllerBase'."
      }
    ],
    bestPractices: [
      "Always return 201 Created with a Location header for successful POST creation requests.",
      "Use ActionResult<T> so Swagger can automatically detect the return schema.",
      "Add [ApiController] attribute to every controller class."
    ],
    practiceQuestions: [
      {
        question: "Which HTTP status helper method should be returned after successfully creating a resource via a POST request?",
        options: ["Ok()", "CreatedAtAction() or Created()", "Accepted()", "NoContent()"],
        answerIndex: 1,
        explanation: "REST standards specify returning 201 Created with the Location header pointing to the newly created entity via CreatedAtAction()."
      }
    ],
    revisionSummary: [
      "Inherit from ControllerBase for API controllers.",
      "Use ActionResult<T> for type safety and automatic OpenAPI schema generation.",
      "Return proper HTTP status codes: 200, 201, 204, 400, 404, 409."
    ],
    references: [
      { title: "Create web APIs with ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/web-api/", source: "Microsoft Learn" }
    ]
  },

  "topic-6-4": {
    id: "topic-6-4",
    title: "Dependency Injection",
    category: "6. ASP.NET Core & REST API Development",
    description: "Service lifetimes (Transient, Scoped, Singleton); built-in DI container; constructor injection; keyed services (.NET 8)",
    objectives: [
      "Understand Inversion of Control (IoC) and constructor injection",
      "Differentiate the three service lifetimes: Transient, Scoped, and Singleton",
      "Avoid the captive dependency architectural flaw",
      "Utilize Keyed Services (.NET 8) to inject multiple implementations of the same interface"
    ],
    prerequisites: "Interfaces and OOP (Topics 1-4 and 1-5).",
    terminology: [
      { term: "Transient", definition: "A new service instance is created every time it is requested from the container." },
      { term: "Scoped", definition: "A single service instance is created once per client HTTP request and shared across all components in that request." },
      { term: "Singleton", definition: "A single service instance is created once on application startup and shared across all requests throughout the application lifetime." },
      { term: "Captive Dependency", definition: "When a service with a longer lifetime holds a reference to a service with a shorter lifetime (e.g. a Singleton holding a Scoped DbContext)." }
    ],
    concepts: [
      {
        title: "Service Lifetimes and Keyed Services in .NET 8",
        explanation: "ASP.NET Core has a built-in high-performance Dependency Injection container that manages object creation and disposal.",
        codeSnippet: `var builder = WebApplication.CreateBuilder(args);

// Registering service lifetimes:
builder.Services.AddTransient<IEmailSender, SmtpEmailSender>();      // New instance every time
builder.Services.AddScoped<IOrderRepository, SqlOrderRepository>();   // One instance per HTTP request (ideal for DbContext)
builder.Services.AddSingleton<ICacheManager, InversionMemoryCache>(); // One instance for entire app

// .NET 8 Keyed Services: Registering multiple implementations by key
builder.Services.AddKeyedScoped<IPaymentGateway, StripeGateway>("stripe");
builder.Services.AddKeyedScoped<IPaymentGateway, PaypalGateway>("paypal");

var app = builder.Build();

// Consuming Keyed Services via constructor injection
public class CheckoutService(
    [FromKeyedServices("stripe")] IPaymentGateway paymentGateway,
    IOrderRepository orderRepo)
{
    public async Task ProcessAsync(decimal amount) => await paymentGateway.ChargeAsync(amount);
}`,
        language: "csharp",
        output: "Injects dependencies automatically with controlled lifecycles and clean decoupling.",
        lineExplanation: [
          "Line 4: AddTransient creates fresh instances on every injection.",
          "Line 5: AddScoped is used for DbContext and repositories (tied to HTTP request).",
          "Line 6: AddSingleton shares state application-wide (caches, single connection pools).",
          "Line 9: C# 12 primary constructor with [FromKeyedServices] resolves the specified implementation."
        ]
      }
    ],
    diagram: `Service Lifetime Comparison:
HTTP Request 1:
  -> Scoped Instance A (Shared across Request 1)
  -> Transient Instance 1
  -> Transient Instance 2 (New!)
  -> Singleton Instance X (Shared universally)

HTTP Request 2:
  -> Scoped Instance B (Brand new instance for Request 2!)
  -> Transient Instance 3
  -> Singleton Instance X (Exact same instance!)`,
    realWorldApplication: "Injecting database repositories, telemetry loggers, and HTTP clients into controllers without hardcoded dependencies.",
    commonErrors: [
      {
        error: "Cannot resolve scoped service from singleton (Captive Dependency)",
        cause: "Injecting a Scoped service (like DbContext) into a Singleton service.",
        fix: "Inject IServiceScopeFactory into the singleton and create a scope manually when needed, or change lifetimes."
      }
    ],
    bestPractices: [
      "Always use Scoped lifetime for Entity Framework DbContext instances.",
      "Keep services stateless wherever possible.",
      "Prefer constructor injection over manual service locator (IServiceProvider.GetService) calls."
    ],
    practiceQuestions: [
      {
        question: "Which service lifetime creates a single instance per HTTP request in ASP.NET Core?",
        options: ["Transient", "Scoped", "Singleton", "ThreadStatic"],
        answerIndex: 1,
        explanation: "Scoped services are created once per client HTTP request and disposed when the request finishes."
      }
    ],
    revisionSummary: [
      "Transient: new instance every request.",
      "Scoped: one per HTTP request (use for DbContext).",
      "Singleton: one for the entire application life.",
      "Keyed services (.NET 8) allow multiple named implementations."
    ],
    references: [
      { title: "Dependency Injection in ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection", source: "Microsoft Learn" }
    ]
  },

  "topic-6-5": {
    id: "topic-6-5",
    title: "Model Validation & DTOs",
    category: "6. ASP.NET Core & REST API Development",
    description: "Data annotations; FluentValidation; DTO pattern; AutoMapper / Mapster awareness; validation filters",
    objectives: [
      "Separate domain entities from external contracts using Data Transfer Objects (DTOs)",
      "Enforce validation rules using Data Annotations ([Required], [StringLength], [EmailAddress])",
      "Author clean, decoupled validation pipelines using FluentValidation",
      "Understand mapping libraries (Mapster, AutoMapper) vs explicit manual mapping"
    ],
    prerequisites: "Records, DTOs, and Controllers.",
    terminology: [
      { term: "DTO (Data Transfer Object)", definition: "An object that carries data between processes (client and server) without containing business logic." },
      { term: "FluentValidation", definition: "A popular open-source .NET library for building strongly-typed, testable validation rules separated from model classes." }
    ],
    concepts: [
      {
        title: "Clean Validation with FluentValidation",
        explanation: "Data annotations can clutter DTOs. FluentValidation keeps DTOs clean by separating validation rules into dedicated classes.",
        codeSnippet: `// 1. Clean DTO
public record RegisterUserDto(string Email, string Password, int Age);

// 2. FluentValidator Class
public class RegisterUserValidator : FluentValidation.AbstractValidator<RegisterUserDto>
{
    public RegisterUserValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("A valid email address is required.");

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
            .Matches("[A-Z]").WithMessage("Password must contain an uppercase letter.")
            .Matches("[0-9]").WithMessage("Password must contain a number.");

        RuleFor(x => x.Age)
            .InclusiveBetween(18, 120).WithMessage("Must be at least 18 years old.");
    }
}`,
        language: "csharp",
        output: "Produces structured 400 Bad Request ProblemDetails validation error responses.",
        lineExplanation: [
          "Line 2: DTO remains an immutable, lightweight record.",
          "Line 5: Validator encapsulates complex business rules and custom messages.",
          "Line 13: Regex matching guarantees password complexity."
        ]
      }
    ],
    diagram: `Validation Pipeline:
[ Incoming JSON Request ]
           |
  (Model Binding to DTO)
           |
  (FluentValidation Pipeline)
      /             \\
 (Valid)           (Invalid)
    |                  |
[ To Controller ]   [ 400 Bad Request (RFC 7807 ProblemDetails) ]`,
    realWorldApplication: "Validating user registrations, order checkout payloads, and payment card inputs prior to hitting domain logic.",
    commonErrors: [
      {
        error: "Exposing Entity Framework database models directly as Web API inputs",
        cause: "Exposes sensitive fields (password hashes, internal IDs) and invites Over-Posting security attacks.",
        fix: "Never accept raw database entities in controller actions; always use DTOs."
      }
    ],
    bestPractices: [
      "Always use DTOs for API requests and responses.",
      "Prefer FluentValidation over Data Annotations for complex, conditional, or database-dependent validation.",
      "Perform mapping explicitly in small apps, or use Mapster for high-speed automated mapping."
    ],
    practiceQuestions: [
      {
        question: "Why should Entity Framework models never be exposed directly as input parameters in public API controllers?",
        options: [
          "They compile slower.",
          "It exposes the application to Mass Assignment / Over-Posting vulnerabilities where clients send unintended properties (e.g. IsAdmin = true).",
          "EF Core forbids it.",
          "They cannot be converted to JSON."
        ],
        answerIndex: 1,
        explanation: "Directly binding database entities allows attackers to manipulate fields like IsAdmin or Role via over-posting."
      }
    ],
    revisionSummary: [
      "DTOs protect internal domain models.",
      "FluentValidation enables clean, testable validation separated from data classes.",
      "Return RFC 7807 ProblemDetails on validation failure."
    ],
    references: [
      { title: "Model validation in ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation", source: "Microsoft Learn" }
    ]
  },

  "topic-6-6": {
    id: "topic-6-6",
    title: "EF Core Fundamentals",
    category: "6. ASP.NET Core & REST API Development",
    description: "DbContext; DbSet; code-first vs database-first; connection strings; migrations (add, update, rollback)",
    objectives: [
      "Configure DbContext and DbSet collections in ASP.NET Core",
      "Master the Code-First development workflow using EF Core Migrations",
      "Manage database connection strings safely across environments",
      "Execute CLI commands: dotnet ef migrations add, dotnet ef database update, and script generation"
    ],
    prerequisites: "C# Classes, SQL basics, and Dependency Injection.",
    terminology: [
      { term: "DbContext", definition: "The primary class in EF Core responsible for managing database connections, querying, change tracking, and persisting data." },
      { term: "DbSet<T>", definition: "Represents a collection of entities that can be queried and saved in a specific database table." },
      { term: "Code-First Migration", definition: "A workflow where C# classes define the schema, and EF generates C# migration files to evolve the database schema over time." }
    ],
    concepts: [
      {
        title: "Configuring DbContext and Migrations",
        explanation: "Entity Framework Core is Microsoft's modern Object-Relational Mapper (ORM) for .NET.",
        codeSnippet: `using Microsoft.EntityFrameworkCore;

// 1. Domain Entity
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
}

// 2. Application DbContext
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
}

// 3. Registration in Program.cs:
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 4. CLI Migrations workflow in terminal:
// dotnet ef migrations add InitialCreate
// dotnet ef database update`,
        language: "csharp",
        output: "Builds schema migration and generates SQL CREATE TABLE Products in database.",
        lineExplanation: [
          "Line 11: DbContext constructor takes DbContextOptions to configure SQL Server provider and connection strings.",
          "Line 13: DbSet<Product> maps to the 'Products' table in SQL Server."
        ]
      }
    ],
    diagram: `Code-First Workflow:
[ C# Entity Classes ] ---> (dotnet ef migrations add) ---> [ C# Migration Files ]
                                                                   |
                                                        (dotnet ef database update)
                                                                   v
                                                        [ Live SQL Database Table ]`,
    realWorldApplication: "Standard ORM backing almost all modern enterprise .NET applications for seamless data access.",
    commonErrors: [
      {
        error: "No database provider has been configured for this DbContext",
        cause: "Forgetting to call options.UseSqlServer() or passing empty options.",
        fix: "Register DbContext in Program.cs with AddDbContext and configure the provider."
      }
    ],
    bestPractices: [
      "Always generate SQL migration scripts ('dotnet ef migrations script') for production deployments rather than running database.Migrate() on web startup.",
      "Store connection strings in User Secrets locally and Environment Variables in cloud production."
    ],
    practiceQuestions: [
      {
        question: "What dotnet CLI command applies pending migrations to the target database in EF Core?",
        options: ["dotnet ef migrations add", "dotnet ef database update", "dotnet ef build", "dotnet ef schema push"],
        answerIndex: 1,
        explanation: "'dotnet ef database update' applies all unapplied migration files to the database."
      }
    ],
    revisionSummary: [
      "DbContext manages connections, change tracking, and queries.",
      "DbSet represents tables.",
      "Use migrations to version-control your database schema alongside application code."
    ],
    references: [
      { title: "Entity Framework Core Overview - Microsoft Learn", url: "https://learn.microsoft.com/en-us/ef/core/", source: "Microsoft Learn" }
    ]
  },

  "topic-6-7": {
    id: "topic-6-7",
    title: "EF Core Relationships & Queries",
    category: "6. ASP.NET Core & REST API Development",
    description: "One-to-one, one-to-many, many-to-many; Fluent API vs data annotations; eager, lazy & explicit loading; AsNoTracking",
    objectives: [
      "Model 1:1, 1:N, and N:M relationships using EF Core navigation properties",
      "Configure complex constraints and relationships using Fluent API (OnModelCreating)",
      "Master Eager Loading with .Include() and .ThenInclude()",
      "Maximize read query performance using .AsNoTracking()"
    ],
    prerequisites: "EF Core fundamentals (Topic 6-6) and SQL Joins (Topic 5-4).",
    terminology: [
      { term: "Navigation Property", definition: "A property on an entity that references related entities (e.g. Order.Items or OrderItem.Order)." },
      { term: "Eager Loading", definition: "Loading related data alongside the main entity in a single SQL query using the .Include() method." },
      { term: "AsNoTracking()", definition: "Disables EF Core's change tracker for read-only queries, drastically reducing memory and CPU overhead." }
    ],
    concepts: [
      {
        title: "Fluent API Relationships and High-Speed Queries",
        explanation: "Fluent API provides full control over database schema generation, cascading deletes, and many-to-many relationships.",
        codeSnippet: `public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public List<Order> Orders { get; set; } = new(); // 1-to-Many
}

public class Order
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;
}

// Fluent API Configuration in DbContext
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Customer>()
        .HasMany(c => c.Orders)
        .WithOne(o => o.Customer)
        .HasForeignKey(o => o.CustomerId)
        .OnDelete(DeleteBehavior.Cascade);
}

// Optimized Read Query with Eager Loading & No Tracking
public async Task<List<Customer>> GetCustomersWithOrdersAsync(AppDbContext db)
{
    return await db.Customers
        .AsNoTracking() // Disables change tracker for fast read performance!
        .Include(c => c.Orders) // Eagerly joins Orders table
        .ToListAsync();
}`,
        language: "csharp",
        output: "Generates clean SQL LEFT JOIN reading customers and orders in one round-trip with zero change tracker overhead.",
        lineExplanation: [
          "Line 17: Fluent API explicitly configures the 1-to-Many relationship and cascade behavior.",
          "Line 27: .AsNoTracking() tells EF Core not to store object snapshots in memory.",
          "Line 28: .Include(c => c.Orders) eagerly loads related child orders."
        ]
      }
    ],
    diagram: `Loading Strategies:
Eager Loading:   db.Customers.Include(c => c.Orders) ---> 1 SQL Query (LEFT JOIN)
Lazy Loading:    customer.Orders (accessed later)    ---> Triggers hidden N+1 queries!
AsNoTracking:    Fastest read; memory snapshots omitted.`,
    realWorldApplication: "Powering read-heavy customer dashboards and reports where maximum throughput and minimum memory footprints are critical.",
    commonErrors: [
      {
        error: "Forgetting .Include() and getting NullReferenceException on child collections",
        cause: "EF Core does not load related tables by default unless lazy loading proxies are enabled or .Include() is called.",
        fix: "Always call .Include(x => x.ChildProperty) when related data is needed."
      }
    ],
    bestPractices: [
      "Always append .AsNoTracking() to read-only queries in Web API GET endpoints.",
      "Prefer Eager Loading (.Include()) over Lazy Loading in Web APIs to prevent N+1 query performance disasters.",
      "Configure entity relationships using Fluent API rather than cluttered Data Annotations."
    ],
    practiceQuestions: [
      {
        question: "Why should you use .AsNoTracking() on read-only queries in ASP.NET Core Web APIs?",
        options: [
          "It makes the database read from cache.",
          "It instructs EF Core not to track entity modifications, saving significant CPU and memory.",
          "It enables lazy loading.",
          "It forces the query to use an index."
        ],
        answerIndex: 1,
        explanation: ".AsNoTracking() skips snapshot generation in the change tracker, providing faster query execution and lower memory allocation for read-only operations."
      }
    ],
    revisionSummary: [
      "Fluent API in OnModelCreating defines relationships cleanly.",
      "Use .Include() for eager loading.",
      "Always use .AsNoTracking() on read-only queries."
    ],
    references: [
      { title: "Relationships in EF Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/ef/core/modeling/relationships", source: "Microsoft Learn" }
    ]
  },

  "topic-6-8": {
    id: "topic-6-8",
    title: "EF Core Advanced & Performance",
    category: "6. ASP.NET Core & REST API Development",
    description: "Raw SQL queries; transactions in EF; N+1 query problem & prevention; split queries; interceptors",
    objectives: [
      "Detect and eliminate the N+1 query performance antipattern",
      "Use Split Queries (.AsSplitQuery()) to prevent Cartesian explosion on multi-collection joins",
      "Execute raw SQL safely via FromSqlInterpolated and ExecuteUpdateAsync (.NET 7+)",
      "Implement EF Core interceptors for automated audit logging"
    ],
    prerequisites: "EF Core queries and SQL Performance.",
    terminology: [
      { term: "N+1 Query Problem", definition: "A catastrophic performance trap where 1 query fetches parent rows, and then N separate SQL queries execute inside a loop to fetch children." },
      { term: "Cartesian Explosion", definition: "When multiple .Include() calls generate massive duplicate row payloads due to multiple SQL joins." },
      { term: "AsSplitQuery()", definition: "Tells EF Core to generate separate SQL queries for each collection include rather than a single massive join." }
    ],
    concepts: [
      {
        title: "Solving Cartesian Explosion with Split Queries",
        explanation: "When including multiple collections (e.g. Order.Items and Order.Shipments), a single join duplicates parent data exponentially. .AsSplitQuery() resolves this cleanly.",
        codeSnippet: `// 1. Solving Cartesian Explosion with Split Queries
var order = await db.Orders
    .AsNoTracking()
    .Include(o => o.Items)
    .Include(o => o.Shipments)
    .AsSplitQuery() // Generates 3 clean, independent queries instead of 1 massive join!
    .FirstOrDefaultAsync(o => o.Id == orderId);

// 2. High-Speed Bulk Updates in .NET 7+ without loading entities into memory!
await db.Products
    .Where(p => p.CategoryId == 5)
    .ExecuteUpdateAsync(setters => setters
        .SetProperty(p => p.Price, p => p.Price * 1.10m)); // 10% inflation adjustment directly on SQL server!`,
        language: "csharp",
        output: "Executes targeted split queries and direct database updates with zero entity loading overhead.",
        lineExplanation: [
          "Line 6: .AsSplitQuery() splits the query into separate SELECT statements, avoiding Cartesian row multiplication.",
          "Line 11: ExecuteUpdateAsync runs directly on SQL Server without loading entities into memory."
        ]
      }
    ],
    diagram: `Cartesian Explosion vs Split Query:
Single Query Join:  Order (1) x Items (10) x Shipments (5) = 50 large duplicate rows transferred!
Split Queries:      Query 1: 1 Order + Query 2: 10 Items + Query 3: 5 Shipments = 16 rows total!`,
    realWorldApplication: "Optimizing high-traffic checkout flows and batch-updating tens of thousands of catalog prices instantaneously.",
    commonErrors: [
      {
        error: "Iterating a collection and calling db.RelatedItems.Where() inside the foreach loop",
        cause: "Classic N+1 query problem; executes 1,000 queries for 1,000 items, freezing the server.",
        fix: "Eager load with .Include(), project via LINQ, or use a single batch query with an IN clause."
      }
    ],
    bestPractices: [
      "Use .AsSplitQuery() whenever including two or more sibling collections.",
      "Use ExecuteUpdateAsync and ExecuteDeleteAsync for bulk operations instead of loading and looping.",
      "Inspect generated SQL in development by configuring logging with LogTo(Console.WriteLine)."
    ],
    practiceQuestions: [
      {
        question: "What is the primary benefit of .AsSplitQuery() when including multiple collections in EF Core?",
        options: [
          "It forces the query to use in-memory collections.",
          "It prevents Cartesian explosion and duplicate data transfer by generating separate SQL queries for each collection.",
          "It disables the database connection.",
          "It runs the query on a background thread."
        ],
        answerIndex: 1,
        explanation: ".AsSplitQuery() generates separate SQL statements for each included collection, preventing the massive data multiplication of multi-join Cartesian products."
      }
    ],
    revisionSummary: [
      "Eliminate N+1 queries using .Include().",
      "Use .AsSplitQuery() to prevent Cartesian explosion on multi-collection joins.",
      "Use ExecuteUpdateAsync/ExecuteDeleteAsync for zero-allocation bulk operations."
    ],
    references: [
      { title: "Single vs Split Queries - Microsoft Learn", url: "https://learn.microsoft.com/en-us/ef/core/querying/single-split-queries", source: "Microsoft Learn" }
    ]
  },

  "topic-6-9": {
    id: "topic-6-9",
    title: "API Documentation (OpenAPI / Swagger)",
    category: "6. ASP.NET Core & REST API Development",
    description: "Swagger/OpenAPI; Swashbuckle / Microsoft.AspNetCore.OpenApi; XML documentation; Postman for API testing",
    objectives: [
      "Generate OpenAPI specifications automatically using Swashbuckle and Microsoft.AspNetCore.OpenApi",
      "Enable XML code comments in .csproj to populate Swagger documentation headers",
      "Annotate controllers with [ProducesResponseType] and operation descriptions",
      "Export OpenAPI JSON schemas into Postman or frontend client code generators"
    ],
    prerequisites: "Controllers and DTOs.",
    terminology: [
      { term: "OpenAPI Specification", definition: "A standard, language-agnostic interface description for REST APIs that enables both humans and computers to discover capabilities." },
      { term: "Swagger UI", definition: "An interactive, browser-based web page that renders OpenAPI definitions and allows testing endpoints directly." }
    ],
    concepts: [
      {
        title: "Enriching OpenAPI Documentation with XML Comments",
        explanation: "Enabling XML comments produces clear, interactive Swagger documentation directly from your C# code docstrings.",
        codeSnippet: `/// <summary>
/// Retrieves detailed order metadata and line items.
/// </summary>
/// <param name="id">The unique integer identifier of the order.</param>
/// <response code="200">Returns the requested order.</response>
/// <response code="404">If the order does not exist.</response>
[HttpGet("{id:int}")]
[ProducesResponseType(typeof(OrderDto), StatusCodes.Status200OK)]
[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
public async Task<ActionResult<OrderDto>> GetOrder(int id)
{
    var order = await _orderService.GetByIdAsync(id);
    return order != null ? Ok(order) : NotFound();
}`,
        language: "csharp",
        output: "Renders clean documentation and parameter descriptions directly on the /swagger UI page.",
        lineExplanation: [
          "Line 1-5: Standard triple-slash XML documentation is compiled into Swagger summaries.",
          "Line 8-9: [ProducesResponseType] informs Swagger of possible HTTP return codes and schemas."
        ]
      }
    ],
    diagram: `API Documentation Flow:
[ C# Controllers + XML Comments ] ---> (Swashbuckle / OpenAPI Generator)
                                                    |
                                    +---------------+---------------+
                                    |                               |
                                    v                               v
                            [ Swagger UI Browser ]         [ Postman / Client SDKs ]`,
    realWorldApplication: "Providing live interactive API documentation to frontend teams and external business integration partners.",
    commonErrors: [
      {
        error: "XML comments missing from Swagger UI",
        cause: "<GenerateDocumentationFile>true</GenerateDocumentationFile> was not added to the .csproj file.",
        fix: "Enable documentation generation in .csproj and register the XML file in builder.Services.AddSwaggerGen()."
      }
    ],
    bestPractices: [
      "Annotate all endpoints with [ProducesResponseType] for all expected status codes (200, 400, 401, 404).",
      "Restrict Swagger UI to the Development environment in Program.cs to avoid exposing internal endpoints publicly.",
      "Export OpenAPI definitions to generate TypeScript client services automatically."
    ],
    practiceQuestions: [
      {
        question: "What is the primary function of OpenAPI/Swagger in ASP.NET Core?",
        options: [
          "To speed up database queries.",
          "To provide a standard specification and interactive UI for discovering and testing API endpoints.",
          "To compile C# to JavaScript.",
          "To encrypt HTTP traffic."
        ],
        answerIndex: 1,
        explanation: "OpenAPI provides standardized, interactive documentation enabling developers to inspect and test API endpoints."
      }
    ],
    revisionSummary: [
      "Swagger UI renders interactive OpenAPI schemas.",
      "XML docstrings enrich endpoint and parameter descriptions.",
      "ProducesResponseType defines expected return types and errors."
    ],
    references: [
      { title: "ASP.NET Core web API documentation with Swagger - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger", source: "Microsoft Learn" }
    ]
  },

  "topic-6-10": {
    id: "topic-6-10",
    title: "Global Error Handling & ProblemDetails",
    category: "6. ASP.NET Core & REST API Development",
    description: "Global exception handling; ExceptionHandlerMiddleware / IExceptionHandler (.NET 8); ProblemDetails (RFC 7807)",
    objectives: [
      "Implement centralized global exception handling without repetitive try-catch blocks in controllers",
      "Use modern .NET 8 IExceptionHandler interface for clean error dispatching",
      "Produce standardized RFC 7807 ProblemDetails JSON error responses",
      "Prevent sensitive server stack traces from leaking to public API clients"
    ],
    prerequisites: "Middleware (Topic 6-1) and Exceptions (Topic 1-7).",
    terminology: [
      { term: "ProblemDetails (RFC 7807)", definition: "An industry standard HTTP specification for machine-readable error responses containing title, status, detail, and instance URI." },
      { term: "IExceptionHandler", definition: "A .NET 8 interface that provides an elegant, centralized mechanism to intercept and format unhandled exceptions." }
    ],
    concepts: [
      {
        title: "Modern Global Exception Handling with IExceptionHandler (.NET 8)",
        explanation: "Instead of writing try-catch in every controller action, register a global exception handler that translates domain exceptions into standard ProblemDetails.",
        codeSnippet: `using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        logger.LogError(exception, "Unhandled exception occurred: {Message}", exception.Message);

        // Map domain exceptions to appropriate HTTP status codes
        var (statusCode, title) = exception switch
        {
            KeyNotFoundException => (StatusCodes.Status404NotFound, "Resource Not Found"),
            ArgumentException => (StatusCodes.Status400BadRequest, "Invalid Request Data"),
            UnauthorizedAccessException => (StatusCodes.Status401Unauthorized, "Unauthorized"),
            _ => (StatusCodes.Status500InternalServerError, "Server Error")
        };

        var problemDetails = new ProblemDetails
        {
            Status = statusCode,
            Title = title,
            Detail = exception.Message,
            Instance = httpContext.Request.Path
        };

        httpContext.Response.StatusCode = statusCode;
        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
        return true; // Exception handled successfully!
    }
}

// In Program.cs:
// builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
// builder.Services.AddProblemDetails();
// ...
// app.UseExceptionHandler();`,
        language: "csharp",
        output: "Returns RFC 7807 compliant JSON error response without exposing internal server crash logs.",
        lineExplanation: [
          "Line 4: Implements .NET 8 IExceptionHandler interface.",
          "Line 14: Pattern matching maps exception types to appropriate HTTP status codes.",
          "Line 22: ProblemDetails provides standard fields: status, title, detail, instance."
        ]
      }
    ],
    diagram: `Global Exception Pipeline:
[ Controller throws KeyNotFoundException ]
                   |
     (Bubble up to Middleware)
                   |
[ IExceptionHandler intercepts error ]
                   |
[ Converts to RFC 7807 ProblemDetails ] ====> [ Client receives 404 JSON ]`,
    realWorldApplication: "Standard error architecture across all professional microservices, ensuring frontend clients receive predictable JSON payloads on failure.",
    commonErrors: [
      {
        error: "Returning raw exception.ToString() in production",
        cause: "Leaks database connection strings, file paths, and internal server architecture to potential attackers.",
        fix: "Return generic error details in production and log full details to a secure server sink."
      }
    ],
    bestPractices: [
      "Always use RFC 7807 ProblemDetails for all error responses (4xx and 5xx).",
      "Log full exception details and stack traces with ILogger before sanitizing the response.",
      "Use .NET 8's IExceptionHandler for clean, decoupled error management."
    ],
    practiceQuestions: [
      {
        question: "What is RFC 7807 in the context of REST APIs?",
        options: [
          "A routing protocol.",
          "An industry standard specification defining the ProblemDetails format for HTTP API error responses.",
          "A JSON encryption format.",
          "A database indexing standard."
        ],
        answerIndex: 1,
        explanation: "RFC 7807 establishes ProblemDetails as the standardized format for reporting errors in HTTP APIs."
      }
    ],
    revisionSummary: [
      "Never write manual try-catch blocks in every controller.",
      "Use .NET 8 IExceptionHandler to centralize error mapping.",
      "Return RFC 7807 ProblemDetails for consistent API error responses."
    ],
    references: [
      { title: "Handle errors in ASP.NET Core web APIs - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/web-api/handle-errors", source: "Microsoft Learn" }
    ]
  },

  "topic-6-11": {
    id: "topic-6-11",
    title: "AI Integration in ASP.NET Core & REST APIs",
    category: "6. ASP.NET Core & REST API Development",
    description: "Scaffolding controllers and CRUD operations with Copilot; generating EF Core migrations and queries with AI",
    objectives: [
      "Prompt AI to scaffold complete CRUD controllers with DTOs and validation",
      "Audit AI-generated EF Core queries for tracking issues and missing indexes",
      "Direct AI to generate database migrations and verify generated SQL scripts",
      "Identify security gaps in AI-generated endpoint authorization attributes"
    ],
    prerequisites: "Modules 5 and 6.",
    terminology: [
      { term: "CRUD Scaffolding", definition: "Automatically generating Create, Read, Update, Delete endpoints and service methods from entity models." }
    ],
    concepts: [
      {
        title: "Auditing AI-Generated REST Endpoints",
        explanation: "AI often scaffolds CRUD controllers that look functional but miss critical security attributes and performance options.",
        codeSnippet: `// PROMPT: "Generate an ASP.NET Core controller for Products with EF Core."

// AUDIT CHECKLIST FOR AI OUTPUT:
[ApiController]
[Route("api/[controller]")]
[Authorize] // 1. AI often OMITS authorization! Always verify!
public class ProductsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()
    {
        // 2. AI often forgets .AsNoTracking() and projects entity directly instead of DTO!
        return await db.Products
            .AsNoTracking()
            .Select(p => new ProductDto(p.Id, p.Name, p.Price))
            .ToListAsync();
    }
}`,
        language: "csharp",
        output: "Audited, secure, high-performance controller adhering to clean architecture standards.",
        lineExplanation: [
          "Line 5: Engineer adds [Authorize] to secure the endpoint.",
          "Line 12: Adds .AsNoTracking() and projects directly to DTO to prevent over-posting."
        ]
      }
    ],
    diagram: `AI CRUD Code Audit:
1. Is [Authorize] present on sensitive endpoints?
2. Are DTOs used instead of exposing database entities?
3. Is .AsNoTracking() used on read queries?
4. Are inputs validated with FluentValidation?`,
    realWorldApplication: "Rapidly scaffolding boilerplate CRUD endpoints while maintaining enterprise security and performance standards.",
    commonErrors: [
      {
        error: "Accepting AI controllers that accept raw DbContext entities in [HttpPost]",
        cause: "Exposes database models to over-posting attacks and breaks architectural boundaries.",
        fix: "Force AI to generate dedicated DTO records for requests and responses."
      }
    ],
    bestPractices: [
      "Include explicit constraints in prompts: 'Use DTOs, .AsNoTracking(), and CancellationToken'.",
      "Always inspect generated migration code before running database update.",
      "Verify that all endpoints have proper HTTP verb attributes."
    ],
    practiceQuestions: [
      {
        question: "What critical security oversight does AI commonly make when scaffolding basic REST API controllers?",
        options: [
          "Using camelCase names.",
          "Omitting authentication and authorization attributes ([Authorize]), leaving endpoints publicly accessible.",
          "Using async methods.",
          "Generating DTOs."
        ],
        answerIndex: 1,
        explanation: "AI frequently generates open, unauthenticated endpoints by default. Engineers must ensure [Authorize] is applied."
      }
    ],
    revisionSummary: [
      "AI accelerates CRUD controller scaffolding.",
      "Always add [Authorize], DTO projections, and .AsNoTracking().",
      "Review generated migrations prior to execution."
    ],
    references: [
      { title: "Secure ASP.NET Core Web APIs - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/security/", source: "Microsoft Learn" }
    ]
  },

  "topic-6-12": {
    id: "topic-6-12",
    title: "Assessment 3: REST API Checkpoint",
    category: "6. ASP.NET Core & REST API Development",
    description: "Build a complete CRUD REST API with EF Core, validation, DTOs, global error handling, and Swagger docs",
    objectives: [
      "Synthesize all Module 6 concepts into a production-grade Web API project",
      "Implement full CRUD operations with EF Core and SQL Server/SQLite",
      "Incorporate FluentValidation, DTO mapping, and global exception handling with ProblemDetails",
      "Verify endpoints interactively via Swagger UI"
    ],
    prerequisites: "Completion of Modules 5 and 6.",
    terminology: [
      { term: "Capstone REST API", definition: "A fully functional, multi-tier Web API demonstrating mastery of modern backend architecture." }
    ],
    concepts: [
      {
        title: "Hands-on Checkpoint Project Architecture",
        explanation: "This complete project ties together DbContext, DTOs, FluentValidation, Global Exception Handling, and Swagger documentation.",
        codeSnippet: `// Complete production-ready REST API skeleton in Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

builder.Services.AddDbContext<StoreDbContext>(opt => 
    opt.UseInMemoryDatabase("StoreDb"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();`,
        language: "csharp",
        output: "Starts fully functional REST API with Swagger UI accessible at /swagger.",
        lineExplanation: [
          "Demonstrates clean configuration of all modern .NET 8 API infrastructure services."
        ]
      }
    ],
    diagram: `Checkpoint Solution Architecture:
[ HTTP Request ] ---> [ Middleware (Swagger, Exception Handler, Auth) ]
                                   |
                       [ Controller / Endpoints ]
                                   |
                       [ DTOs + FluentValidation ]
                                   |
                       [ EF Core DbContext ] ---> [ Database ]`,
    realWorldApplication: "Serves as the commercial backend architecture template for full-stack enterprise web applications.",
    commonErrors: [
      {
        error: "Failing to test error paths in Swagger",
        cause: "Only testing happy-path 200 responses.",
        fix: "Test invalid payloads to verify 400 ProblemDetails and non-existent IDs for 404 responses."
      }
    ],
    bestPractices: [
      "Validate all inputs before hitting the database.",
      "Keep controllers thin by delegating business logic to service classes.",
      "Ensure all endpoints have descriptive Swagger documentation."
    ],
    practiceQuestions: [
      {
        question: "What is the primary role of DTOs in a production Web API checkpoint project?",
        options: [
          "To replace database tables.",
          "To decouple the API contract from the internal database schema, preventing over-posting and data leaks.",
          "To speed up compilation.",
          "To manage threads."
        ],
        answerIndex: 1,
        explanation: "DTOs act as clean data contracts between clients and servers, isolating database changes from external consumers."
      }
    ],
    revisionSummary: [
      "Integrates EF Core, DTOs, FluentValidation, and Global Error Handling.",
      "Validates full backend competency before proceeding to security and frontend."
    ],
    references: [
      { title: "Tutorial: Create a web API with ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api", source: "Microsoft Learn" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 7: ASP.NET Core Security (4 topics)
// -------------------------------------------------------------
const m7 = {
  "topic-7-1": {
    id: "topic-7-1",
    title: "Authentication Concepts",
    category: "7. ASP.NET Core Security",
    description: "AuthN vs AuthZ; cookie vs token auth; ASP.NET Core Identity overview",
    objectives: [
      "Distinguish between Authentication (Who are you?) and Authorization (What are you allowed to do?)",
      "Compare Cookie-based authentication (stateful web apps) with Token-based authentication (stateless APIs)",
      "Understand ASP.NET Core Identity (UserManager, SignInManager, IdentityUser)",
      "Evaluate password hashing security (PBKDF2, bcrypt, Argon2)"
    ],
    prerequisites: "Web API architecture and controllers.",
    terminology: [
      { term: "Authentication (AuthN)", definition: "The process of verifying the identity of a user or system (e.g. verifying a password or certificate)." },
      { term: "Authorization (AuthZ)", definition: "The process of verifying whether an authenticated user has permission to perform an action or access a resource." },
      { term: "Bearer Token", definition: "A security token that grants access to whoever bears (possesses) it, typically passed in the Authorization HTTP header." }
    ],
    concepts: [
      {
        title: "AuthN vs AuthZ and Token-Based Security",
        explanation: "REST APIs use stateless token-based authentication (JWT), while traditional server-rendered websites use stateful cookies.",
        codeSnippet: `// Comparing Token vs Cookie Headers in HTTP
// Token Authentication (APIs):
// GET /api/orders HTTP/1.1
// Host: api.store.com
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Cookie Authentication (Traditional Web):
// GET /dashboard HTTP/1.1
// Host: www.store.com
// Cookie: .AspNetCore.Identity.Application=CfDJ8N...`,
        language: "http",
        output: "Bearer tokens transmit stateless identity proofs directly in the Authorization header.",
        lineExplanation: [
          "Bearer tokens allow mobile and single-page apps (Angular/React) to access cross-domain APIs without CSRF vulnerabilities."
        ]
      }
    ],
    diagram: `AuthN vs AuthZ:
[ Credentials: user + pass ] ---> (Authentication) ---> [ Identity Verified (Token Issued) ]
                                                                   |
                                                         (Access /api/admin)
                                                                   v
                                                         (Authorization)
                                                          /           \\
                                                   (Has Admin Role)   (Lacks Admin Role)
                                                          |                   |
                                                      [ 200 OK ]        [ 403 Forbidden ]`,
    realWorldApplication: "Securing web portals, mobile banking backends, and multi-tenant SaaS platforms.",
    commonErrors: [
      {
        error: "Confusing 401 Unauthorized with 403 Forbidden",
        cause: "401 means unauthenticated (missing or invalid token). 403 means authenticated, but lacking required permissions.",
        fix: "Return 401 when the user needs to log in; return 403 when the user is logged in but denied access."
      }
    ],
    bestPractices: [
      "Use token-based authentication (JWT) for APIs consumed by mobile and single-page applications.",
      "Never store plaintext passwords; use ASP.NET Core Identity's built-in PBKDF2 hashing.",
      "Return 401 for unauthenticated requests and 403 for unauthorized requests."
    ],
    practiceQuestions: [
      {
        question: "What is the difference between a 401 and 403 HTTP response status code?",
        options: [
          "401 means server crash; 403 means page not found.",
          "401 means Unauthenticated (who are you?); 403 means Forbidden (authenticated, but lacking permissions).",
          "There is no difference.",
          "401 is used for cookies; 403 is used for tokens."
        ],
        answerIndex: 1,
        explanation: "401 Unauthorized signals missing or invalid credentials. 403 Forbidden signals that identity is known, but access is denied."
      }
    ],
    revisionSummary: [
      "AuthN verifies identity; AuthZ verifies permissions.",
      "Token authentication is stateless and cross-domain friendly.",
      "ASP.NET Core Identity provides secure password hashing."
    ],
    references: [
      { title: "Overview of ASP.NET Core Security - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/security/", source: "Microsoft Learn" }
    ]
  },

  "topic-7-2": {
    id: "topic-7-2",
    title: "JWT Authentication",
    category: "7. ASP.NET Core Security",
    description: "Token structure (header, payload, signature); issuing tokens; validating tokens; symmetric vs asymmetric keys; refresh tokens",
    objectives: [
      "Understand the three parts of a JSON Web Token: Header, Payload (Claims), and Signature",
      "Issue signed JWT tokens upon successful login using System.IdentityModel.Tokens.Jwt",
      "Configure JwtBearer authentication in Program.cs with TokenValidationParameters",
      "Implement refresh tokens to maintain long-lived sessions securely without prolonged token lifespans"
    ],
    prerequisites: "Authentication concepts (Topic 7-1).",
    terminology: [
      { term: "JWT (JSON Web Token)", definition: "A compact, URL-safe means of representing claims to be transferred between two parties, signed with a cryptographic key." },
      { term: "Claims", definition: "Name-value statements about a subject (e.g. email, user ID, roles) embedded inside the JWT payload." },
      { term: "Refresh Token", definition: "A secure, opaque token stored in the database used to obtain a new short-lived JWT without re-prompting the user for passwords." }
    ],
    concepts: [
      {
        title: "Generating and Validating JWTs in ASP.NET Core",
        explanation: "A JWT is composed of three Base64URL-encoded strings separated by dots: header.payload.signature. The signature guarantees the payload was not tampered with.",
        codeSnippet: `// 1. Issuing a JWT in AuthService
public string GenerateJwtToken(string userId, string email, string role, IConfiguration config)
{
    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(JwtRegisteredClaimNames.Sub, userId),
        new Claim(JwtRegisteredClaimNames.Email, email),
        new Claim(ClaimTypes.Role, role),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

    var token = new JwtSecurityToken(
        issuer: config["Jwt:Issuer"],
        audience: config["Jwt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(15), // Short lifespan!
        signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(token);
}

// 2. Validating JWT in Program.cs:
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options => {
//         options.TokenValidationParameters = new TokenValidationParameters {
//             ValidateIssuer = true,
//             ValidateAudience = true,
//             ValidateLifetime = true,
//             ValidateIssuerSigningKey = true,
//             ValidIssuer = builder.Configuration["Jwt:Issuer"],
//             ValidAudience = builder.Configuration["Jwt:Audience"],
//             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
//         };
//     });`,
        language: "csharp",
        output: "Produces cryptographically signed JWT token: eyJhbGciOi...eyJzdWIiOi...",
        lineExplanation: [
          "Line 4: SymmetricSecurityKey holds the secret key used to sign the token with HMAC-SHA256.",
          "Line 7: Claims embed user identity and role directly in the payload.",
          "Line 17: Expiration is kept short (15 minutes); refresh tokens extend the session."
        ]
      }
    ],
    diagram: `JWT Structure:
[ HEADER ] (Algorithm & Type)
    .
[ PAYLOAD ] (Claims: Sub, Email, Role, Exp)
    .
[ SIGNATURE ] (HMAC-SHA256(Header + Payload, SecretKey))`,
    realWorldApplication: "Authenticating single-page web applications (Angular) and mobile clients across microservice clusters without server-side session state.",
    commonErrors: [
      {
        error: "Setting JWT expiration to 30 days because handling token refresh is inconvenient",
        cause: "If a 30-day token is stolen, an attacker has unrestricted access for an entire month with no revocation mechanism.",
        fix: "Keep JWT access tokens short-lived (10-15 minutes) and implement secure refresh tokens stored in the database."
      }
    ],
    bestPractices: [
      "Never store sensitive secrets (credit card numbers, passwords) inside the JWT payload (it is Base64 readable, not encrypted).",
      "Use strong signing keys (at least 256 bits / 32 characters).",
      "Validate issuer, audience, signature key, and lifetime on every request."
    ],
    practiceQuestions: [
      {
        question: "Is the payload of a standard JWT encrypted or encoded?",
        options: [
          "It is encrypted with military-grade AES-256 and cannot be read.",
          "It is only Base64URL encoded; anyone who intercepts it can read its claims, though they cannot modify it without breaking the signature.",
          "It is hashed.",
          "It is plain text XML."
        ],
        answerIndex: 1,
        explanation: "Standard JWTs are signed, not encrypted. The payload is readable by anyone using Base64 decoding; the signature merely prevents tampering."
      }
    ],
    revisionSummary: [
      "JWT consists of Header, Payload, and Signature.",
      "The signature prevents payload tampering.",
      "Keep access tokens short-lived and use refresh tokens for continuous sessions."
    ],
    references: [
      { title: "JWT Bearer authentication in ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/security/authentication/", source: "Microsoft Learn" }
    ]
  },

  "topic-7-3": {
    id: "topic-7-3",
    title: "Authorization",
    category: "7. ASP.NET Core Security",
    description: "Role-based [Authorize(Roles = \"...\")]; claims-based authorization; policy-based authorization; custom authorization requirements",
    objectives: [
      "Secure controllers and actions using [Authorize]",
      "Implement Role-Based Access Control (RBAC) with [Authorize(Roles = \"Admin\")]",
      "Build modern Policy-Based Authorization evaluating fine-grained claims",
      "Author custom AuthorizationHandler and IAuthorizationRequirement classes"
    ],
    prerequisites: "Authentication and JWT (Topics 7-1 and 7-2).",
    terminology: [
      { term: "RBAC (Role-Based Access Control)", definition: "Restricting system access based on the roles assigned to users (e.g. Admin, Manager, User)." },
      { term: "Policy-Based Authorization", definition: "A rich, decoupled model where named policies evaluate claims, roles, or custom business rules." }
    ],
    concepts: [
      {
        title: "Role and Policy-Based Authorization",
        explanation: "Policy-based authorization decouples security rules from controller code, allowing complex rules (e.g. MinimumAge or Department membership) to be reused cleanly.",
        codeSnippet: `// 1. Defining Policies in Program.cs
builder.Services.AddAuthorization(options =>
{
    // Role-based policy
    options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));

    // Claims-based custom policy
    options.AddPolicy("MustBeSeniorEngineer", policy =>
        policy.RequireClaim("Department", "Engineering")
              .RequireClaim("Seniority", "Senior", "Lead"));
});

// 2. Applying policies to Controllers
[ApiController]
[Route("api/[controller]")]
public class AdminSettingsController : ControllerBase
{
    [HttpGet("system-health")]
    [Authorize(Policy = "RequireAdminRole")] // Requires Admin
    public IActionResult GetHealth() => Ok("Healthy");

    [HttpPost("deploy-microservice")]
    [Authorize(Policy = "MustBeSeniorEngineer")] // Requires Department=Engineering AND Seniority=Senior
    public IActionResult DeployService() => Ok("Deployed");
}`,
        language: "csharp",
        output: "Protects endpoints based on declarative role and claims policies.",
        lineExplanation: [
          "Line 5: 'RequireRole(\"Admin\")' validates the user's role claim.",
          "Line 9: Multi-claim policy enforces both Department and Seniority requirements.",
          "Line 21: Clean declarative attribute on controller actions."
        ]
      }
    ],
    diagram: `Policy Authorization Evaluation:
[ Incoming Request with JWT ] ---> [ Extract Claims from Token ]
                                                |
                                   [ Evaluate Policy Requirements ]
                                      /                   \\
                              (All Claims Satisfied)    (Missing Claim)
                                      |                       |
                               [ 200 OK / Execute ]      [ 403 Forbidden ]`,
    realWorldApplication: "Enforcing tier-based SaaS features (e.g. only 'Enterprise' tier users can access advanced reporting exports).",
    commonErrors: [
      {
        error: "Hardcoding role checks inside action bodies with if (!User.IsInRole(\"Admin\"))",
        cause: "Scatters security logic, violates DRY, and makes testing cumbersome.",
        fix: "Use declarative [Authorize(Policy = \"...\")] attributes."
      }
    ],
    bestPractices: [
      "Prefer Policy-based authorization over raw Role strings for maintainability.",
      "Apply [Authorize] at the controller level and [AllowAnonymous] on specific public endpoints if needed.",
      "Combine claims into cohesive permission scopes (e.g. 'orders:read', 'orders:write')."
    ],
    practiceQuestions: [
      {
        question: "Why is policy-based authorization preferred over simple role-based authorization in enterprise applications?",
        options: [
          "Roles are deprecated in .NET 8.",
          "Policies decouple security rules from controllers and allow combining multiple claims, age checks, and custom business requirements into reusable names.",
          "Policies do not require authentication.",
          "Policies compile faster."
        ],
        answerIndex: 1,
        explanation: "Policy-based authorization allows combining roles, claims, and complex custom logic into reusable, testable policies."
      }
    ],
    revisionSummary: [
      "Role-based authorization checks user roles.",
      "Policy-based authorization provides flexible, multi-claim rule evaluation.",
      "Use [Authorize(Policy = \"...\")] for clean declarative protection."
    ],
    references: [
      { title: "Policy-based authorization in ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/security/authorization/policies", source: "Microsoft Learn" }
    ]
  },

  "topic-7-4": {
    id: "topic-7-4",
    title: "API Security Best Practices",
    category: "7. ASP.NET Core Security",
    description: "CORS configuration; rate limiting (.NET 7+); input sanitization; HTTPS enforcement; secrets management",
    objectives: [
      "Configure Cross-Origin Resource Sharing (CORS) securely for frontend clients (Angular)",
      "Implement built-in Rate Limiting (.NET 7+) to prevent denial-of-service and brute-force attacks",
      "Enforce HTTPS redirection and HTTP Strict Transport Security (HSTS)",
      "Protect sensitive credentials in cloud environments using Azure Key Vault or AWS Secrets Manager"
    ],
    prerequisites: "Web API architecture and JWT authentication.",
    terminology: [
      { term: "CORS (Cross-Origin Resource Sharing)", definition: "A browser security mechanism that restricts web applications from making HTTP requests to a different domain/origin than the one serving the frontend." },
      { term: "Rate Limiting", definition: "Restricting the number of requests a client can make within a specified timeframe (e.g. 100 requests per minute)." },
      { term: "HSTS", definition: "HTTP Strict Transport Security; a header informing browsers to communicate exclusively over encrypted HTTPS." }
    ],
    concepts: [
      {
        title: "Secure CORS and Built-In Rate Limiting",
        explanation: "Never use AllowAnyOrigin() in production with credentials. In .NET 7+, built-in rate limiting protects against API abuse without third-party packages.",
        codeSnippet: `using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// 1. Secure CORS Policy for Angular Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://app.mycompany.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Required when sending auth cookies or credentials
    });
});

// 2. Built-in Rate Limiting (.NET 7+)
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("PublicApiLimiter", opt =>
    {
        opt.PermitLimit = 100; // 100 requests
        opt.Window = TimeSpan.FromMinutes(1); // per minute
        opt.QueueLimit = 2;
    });
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("AllowAngularDev");
app.UseRateLimiter(); // Apply rate limiter middleware

app.MapControllers().RequireRateLimiting("PublicApiLimiter");`,
        language: "csharp",
        output: "Configures secure origin restrictions and throttles abusive traffic with 429 Too Many Requests.",
        lineExplanation: [
          "Line 10: Explicitly lists trusted origins rather than using dangerous wildcards ('*').",
          "Line 21: Fixed window rate limiter limits users to 100 requests per minute.",
          "Line 34: Middleware throttles excessive traffic and returns HTTP 429."
        ]
      }
    ],
    diagram: `Defense-in-Depth API Security:
[ Client Request ]
       |
  (HTTPS / HSTS)
       |
  (Rate Limiter: <100 req/min?) ---> Exceeded? ---> [ 429 Too Many Requests ]
       |
  (CORS: Trusted Origin?)        ---> Untrusted? --> [ CORS Browser Block ]
       |
  (Authentication & Authorization)
       |
[ Protected API Logic Executed ]`,
    realWorldApplication: "Shielding production payment endpoints, login forms, and customer databases from scraping, brute-force attacks, and credential stuffing.",
    commonErrors: [
      {
        error: "Configuring CORS with .AllowAnyOrigin() alongside .AllowCredentials()",
        cause: "Browsers reject this combination as a severe security vulnerability.",
        fix: "Explicitly name trusted origins with .WithOrigins(...) when using .AllowCredentials()."
      }
    ],
    bestPractices: [
      "Always restrict CORS to explicit, whitelisted origins in production.",
      "Apply rate limiting to all public authentication endpoints (login, register, forgot-password).",
      "Enforce HTTPS and enable HSTS in non-development environments."
    ],
    practiceQuestions: [
      {
        question: "What HTTP status code is returned when a client exceeds an API rate limit?",
        options: ["401 Unauthorized", "403 Forbidden", "429 Too Many Requests", "503 Service Unavailable"],
        answerIndex: 2,
        explanation: "HTTP 429 Too Many Requests is the standard response when an API client exceeds configured rate limits."
      }
    ],
    revisionSummary: [
      "Whitelist specific origins in CORS.",
      "Use built-in rate limiting (.NET 7+) to stop brute force attacks.",
      "Enforce HTTPS and use managed cloud secret stores."
    ],
    references: [
      { title: "Enable Cross-Origin Requests (CORS) in ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/security/cors", source: "Microsoft Learn" },
      { title: "Rate limiting middleware in ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/performance/rate-limit", source: "Microsoft Learn" }
    ]
  }
};

writeModule('module06_aspnet_core.js', 'MODULE_06_LESSONS', m6);
writeModule('module07_aspnet_security.js', 'MODULE_07_LESSONS', m7);
console.log('Batch 2 part 2 (Modules 6 & 7) complete!');
