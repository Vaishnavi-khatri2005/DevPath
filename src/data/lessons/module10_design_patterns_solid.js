/**
 * Pre-generated comprehensive lessons for MODULE_10_LESSONS
 * Sources: Microsoft Learn, xUnit Docs, Clean Code Architecture.
 */

export const MODULE_10_LESSONS = {
  "topic-10-1": {
    "id": "topic-10-1",
    "title": "SOLID Principles in C#",
    "category": "10. Design Patterns & SOLID",
    "description": "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion — with C# examples",
    "objectives": [
      "Master all five SOLID design principles with concrete C# implementations",
      "Single Responsibility (SRP): One reason to change",
      "Open/Closed (OCP): Open for extension, closed for modification",
      "Liskov Substitution (LSP): Subtypes must be substitutable for base types",
      "Interface Segregation (ISP): Fine-grained client-specific interfaces",
      "Dependency Inversion (DIP): Depend on abstractions, not concretions"
    ],
    "prerequisites": "OOP, Interfaces, and Polymorphism.",
    "terminology": [
      {
        "term": "SOLID",
        "definition": "A mnemonic acronym for five design principles intended to make software designs more understandable, flexible, and maintainable."
      },
      {
        "term": "Dependency Inversion (DIP)",
        "definition": "High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces)."
      }
    ],
    "concepts": [
      {
        "title": "SOLID in Practice",
        "explanation": "SOLID transforms rigid, fragile codebases into extensible, testable software architectures.",
        "codeSnippet": "// 1. Single Responsibility: Only handles invoice calculations\npublic class InvoiceCalculator\n{\n    public decimal CalculateTotal(Invoice inv) => inv.Subtotal * (1 + inv.TaxRate);\n}\n\n// 2. Open/Closed & Dependency Inversion: Extensible discount rules without modifying core engine\npublic interface IDiscountStrategy\n{\n    decimal ApplyDiscount(decimal total);\n}\n\npublic class VipDiscount : IDiscountStrategy\n{\n    public decimal ApplyDiscount(decimal total) => total * 0.85m;\n}\n\n// High-level service depends on abstraction (IDiscountStrategy), not concrete class!\npublic class CheckoutService(IDiscountStrategy discountStrategy)\n{\n    public decimal Checkout(decimal total) => discountStrategy.ApplyDiscount(total);\n}",
        "language": "csharp",
        "output": "Demonstrates SRP, OCP, and DIP working together cleanly.",
        "lineExplanation": [
          "InvoiceCalculator has a single responsibility.",
          "IDiscountStrategy enables new discount strategies without changing existing code (OCP).",
          "CheckoutService depends on the interface abstraction (DIP)."
        ]
      }
    ],
    "diagram": "SOLID Overview:\nS - Single Responsibility   -> One class, one job\nO - Open/Closed             -> Extend behavior via interfaces without altering tested code\nL - Liskov Substitution     -> Subclasses honor base class contracts\nI - Interface Segregation   -> Small, focused interfaces instead of bloated God-interfaces\nD - Dependency Inversion    -> Depend on abstractions (interfaces), not concrete implementations",
    "realWorldApplication": "Architecting enterprise .NET applications where features can be swapped, extended, or tested without cascading breaking changes.",
    "commonErrors": [
      {
        "error": "Violating ISP with massive 'fat' interfaces (e.g. IRepository with 40 methods)",
        "cause": "Forces implementing classes to implement methods they do not need (throwing NotImplementedException).",
        "fix": "Break large interfaces into small, cohesive contracts (IReadRepository, IWriteRepository)."
      }
    ],
    "bestPractices": [
      "Inject interfaces into service constructors to satisfy Dependency Inversion.",
      "Keep interfaces focused and small (often 2-4 methods).",
      "Apply Open/Closed principle by using strategy and decorator patterns."
    ],
    "practiceQuestions": [
      {
        "question": "What does the Dependency Inversion Principle (DIP) state?",
        "options": [
          "Classes should inherit from as many base classes as possible.",
          "High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces).",
          "Methods should not accept parameters.",
          "All classes should be static."
        ],
        "answerIndex": 1,
        "explanation": "DIP dictates that software components should decouple by depending on interface abstractions rather than direct concrete implementations."
      }
    ],
    "revisionSummary": [
      "SOLID ensures maintainable, decoupled object-oriented architecture.",
      "SRP = single responsibility; OCP = extend with interfaces.",
      "DIP = depend on abstractions via Dependency Injection."
    ],
    "references": [
      {
        "title": "SOLID Principles in C# - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/archive/msdn-magazine/2014/may/csharp-best-practices-dangers-of-violating-solid-principles-in-csharp",
        "source": "MSDN / Microsoft Learn"
      }
    ]
  },
  "topic-10-2": {
    "id": "topic-10-2",
    "title": "Common Design Patterns",
    "category": "10. Design Patterns & SOLID",
    "description": "Repository & Unit of Work; Factory; Strategy; Decorator; Mediator (MediatR awareness)",
    "objectives": [
      "Master the Repository and Unit of Work patterns for clean data access abstraction",
      "Implement the Strategy pattern for interchangeable algorithms",
      "Use the Decorator pattern to add caching or logging without modifying core code",
      "Understand the Mediator pattern with MediatR for CQRS command/query decoupling"
    ],
    "prerequisites": "OOP, Interfaces, and SOLID Principles.",
    "terminology": [
      {
        "term": "Repository Pattern",
        "definition": "Mediates between the domain and data mapping layers, acting like an in-memory collection of domain objects."
      },
      {
        "term": "Unit of Work",
        "definition": "Maintains a list of business objects affected by a transaction and coordinates the writing out of changes."
      },
      {
        "term": "Mediator Pattern (MediatR)",
        "definition": "Encapsulates how sets of objects interact, decoupling senders of requests from their handlers (CQRS)."
      }
    ],
    "concepts": [
      {
        "title": "Repository, Strategy, and Mediator Patterns",
        "explanation": "Design patterns provide battle-tested solutions to recurring software engineering challenges.",
        "codeSnippet": "// 1. Repository Pattern Interface\npublic interface ICustomerRepository\n{\n    Task<Customer?> GetByIdAsync(int id);\n    Task AddAsync(Customer customer);\n}\n\n// 2. Mediator Pattern (MediatR CQRS pattern)\n// Command representation\npublic record RegisterCustomerCommand(string Name, string Email) : MediatR.IRequest<int>;\n\n// Command Handler: Decoupled handler executing business logic\npublic class RegisterCustomerHandler(ICustomerRepository repository) \n    : MediatR.IRequestHandler<RegisterCustomerCommand, int>\n{\n    public async Task<int> Handle(RegisterCustomerCommand request, CancellationToken ct)\n    {\n        var customer = new Customer { Name = request.Name, Email = request.Email };\n        await repository.AddAsync(customer);\n        return customer.Id;\n    }\n}",
        "language": "csharp",
        "output": "Decouples Web API controllers from business logic via mediator messaging.",
        "lineExplanation": [
          "Line 2: Repository encapsulates database querying and persistence.",
          "Line 9: Command encapsulates data intent.",
          "Line 12: Handler encapsulates the business workflow, keeping controllers to a single line of code: await _mediator.Send(command)."
        ]
      }
    ],
    "diagram": "Mediator Pattern Flow:\n[ API Controller ] ---> calls: _mediator.Send(command)\n                                 |\n                         [ MediatR Bus ]\n                                 |\n                 (Dispatches to registered handler)\n                                 v\n                 [ RegisterCustomerHandler ] ---> [ Repository ] ---> [ DB ]",
    "realWorldApplication": "Architecting enterprise CQRS (Command Query Responsibility Segregation) microservices and clean architecture solutions.",
    "commonErrors": [
      {
        "error": "Re-implementing a generic repository over EF Core that hides LINQ capabilities",
        "cause": "DbSet<T> is already an implementation of the Repository pattern, and DbContext is already a Unit of Work.",
        "fix": "Keep repositories focused on domain-specific queries rather than generic wrappers that reinvent IQueryable."
      }
    ],
    "bestPractices": [
      "Use MediatR to keep API controllers thin and decouple requests from business handlers.",
      "Use the Strategy pattern when algorithmic logic must change dynamically at runtime.",
      "Use the Decorator pattern for cross-cutting concerns like caching and logging."
    ],
    "practiceQuestions": [
      {
        "question": "What is the primary architectural benefit of the Mediator pattern (such as MediatR) in ASP.NET Core?",
        "options": [
          "It forces queries to run synchronously.",
          "It completely decouples the sender of a request from the handler that executes it, promoting single-responsibility and clean CQRS architecture.",
          "It replaces the database.",
          "It creates CSS stylesheets."
        ],
        "answerIndex": 1,
        "explanation": "MediatR decouples controllers from business handlers, ensuring controllers merely dispatch requests and handlers execute business logic independently."
      }
    ],
    "revisionSummary": [
      "Repository abstracts data access; Unit of Work manages transactions.",
      "Strategy swaps algorithms dynamically.",
      "MediatR decouples controllers from business handlers in CQRS."
    ],
    "references": [
      {
        "title": "Design Patterns in C# - Refactoring Guru",
        "url": "https://refactoring.guru/design-patterns/csharp",
        "source": "Refactoring Guru"
      },
      {
        "title": "MediatR Documentation",
        "url": "https://github.com/jbogard/MediatR",
        "source": "GitHub / MediatR"
      }
    ]
  }
};
