/**
 * Pre-generated comprehensive lessons for MODULE_17_LESSONS
 * Sources: Microsoft Learn Microservices, Docker Docs, OWASP Foundation.
 */

export const MODULE_17_LESSONS = {
  "topic-17-1": {
    "id": "topic-17-1",
    "title": "Microservices Architecture Patterns",
    "category": "17. Microservices Concepts",
    "description": "Monolithic vs microservices; when to use each; trade-offs; domain-driven design awareness",
    "objectives": [
      "Compare monolithic architectures with distributed microservices architectures",
      "Evaluate trade-offs: independent deployment and scaling vs distributed complexity and network latency",
      "Apply Domain-Driven Design (DDD) concepts (Bounded Contexts, Ubiquitous Language, Aggregate Roots)",
      "Determine when a team should remain on a Modular Monolith vs migrate to Microservices"
    ],
    "prerequisites": "Web API architecture and design patterns.",
    "terminology": [
      {
        "term": "Monolith",
        "definition": "A software application in which all functional modules (ordering, billing, inventory, auth) are packaged and deployed as a single unified executable."
      },
      {
        "term": "Microservices",
        "definition": "An architectural style structuring an application as a collection of independently deployable, loosely coupled services organized around business domains."
      },
      {
        "term": "Bounded Context",
        "definition": "A central DDD pattern defining explicit boundaries within which a domain model applies and has specific meaning."
      }
    ],
    "concepts": [
      {
        "title": "Monolith vs Microservices Trade-offs",
        "explanation": "Microservices solve organizational scaling problems, not performance problems. For small teams, a well-architected Modular Monolith is almost always superior.",
        "codeSnippet": "// Domain-Driven Design (DDD) Bounded Context Separation:\n// Context 1: Order Processing Domain\nnamespace Store.Ordering.Domain\n{\n    public class Order { public int Id { get; set; } public decimal Total { get; set; } }\n}\n\n// Context 2: Fulfillment & Shipping Domain (Completely separate model!)\nnamespace Store.Shipping.Domain\n{\n    public class Shipment { public string TrackingNumber { get; set; } = \"\"; public double WeightKg { get; set; } }\n}",
        "language": "csharp",
        "output": "Each bounded context manages its own data models and database independently.",
        "lineExplanation": [
          "In microservices, services do NOT share database tables; each service owns its own private data store."
        ]
      }
    ],
    "diagram": "Monolith vs Microservices Architecture:\nMonolith:\n[ Client ] ---> [ Single Large App (Ordering + Billing + Catalog) ] ---> [ Shared DB ]\n\nMicroservices:\n               +---> [ Order Service ] ------> [ Orders DB ]\n[ Client ] --->|---> [ Billing Service ] ----> [ Billing DB ]\n(via Gateway)  +---> [ Catalog Service ] ----> [ Catalog DB ]",
    "realWorldApplication": "Architecting large enterprise systems (Netflix, Amazon, Uber) where hundreds of cross-functional teams build and deploy independently.",
    "commonErrors": [
      {
        "error": "Creating a 'Distributed Monolith' (Microservices sharing a single central database)",
        "cause": "Services are physically separate but still tightly coupled at the database level, combining the worst of both worlds.",
        "fix": "Enforce Database-Per-Service: each microservice owns its private database."
      }
    ],
    "bestPractices": [
      "Start with a well-structured Modular Monolith; split into microservices only when independent team scaling requires it.",
      "Never share database tables directly between microservices.",
      "Design service boundaries around Domain-Driven Design (DDD) Bounded Contexts."
    ],
    "practiceQuestions": [
      {
        "question": "What is the primary anti-pattern to avoid when transitioning to a microservices architecture?",
        "options": [
          "Using Linux containers.",
          "Building a Distributed Monolith where multiple microservices query and mutate the exact same shared database.",
          "Using asynchronous messaging.",
          "Using REST APIs."
        ],
        "answerIndex": 1,
        "explanation": "Sharing a single database between services creates tight coupling and eliminates independent deployment benefits (Distributed Monolith)."
      }
    ],
    "revisionSummary": [
      "Monoliths are simpler to develop, test, and deploy.",
      "Microservices allow independent deployment and team scaling.",
      "Enforce Database-Per-Service and DDD Bounded Contexts."
    ],
    "references": [
      {
        "title": ".NET Microservices Architecture Guide - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dotnet/architecture/microservices/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-17-2": {
    "id": "topic-17-2",
    "title": "API Gateways & Service Discovery",
    "category": "17. Microservices Concepts",
    "description": "Service discovery; API gateway (Ocelot/YARP awareness); load balancing — concepts with .NET examples",
    "objectives": [
      "Understand the role of an API Gateway as the single reverse proxy entry point for client applications",
      "Configure YARP (Yet Another Reverse Proxy) in ASP.NET Core for routing and load balancing",
      "Explore Ocelot gateway capabilities for request aggregation and rate limiting",
      "Understand dynamic Service Discovery mechanics (Consul, Kubernetes DNS)"
    ],
    "prerequisites": "Web API architecture and Routing.",
    "terminology": [
      {
        "term": "API Gateway",
        "definition": "A server that acts as a single API front door, intercepting requests to perform routing, rate limiting, SSL termination, and token validation."
      },
      {
        "term": "YARP (Yet Another Reverse Proxy)",
        "definition": "Microsoft's high-performance, customizable reverse proxy toolkit for building gateways in .NET."
      },
      {
        "term": "Service Discovery",
        "definition": "The automatic detection of network locations (IP and port) for microservice instances as they scale dynamically."
      }
    ],
    "concepts": [
      {
        "title": "YARP (Yet Another Reverse Proxy) Configuration",
        "explanation": "YARP provides Microsoft's modern, highly optimized reverse proxy directly in ASP.NET Core with minimal configuration.",
        "codeSnippet": "// 1. Program.cs for YARP Gateway\nvar builder = WebApplication.CreateBuilder(args);\n\n// Add YARP services and read routes from appsettings.json\nbuilder.Services.AddReverseProxy()\n    .LoadFromConfig(builder.Configuration.GetSection(\"ReverseProxy\"));\n\nvar app = builder.Build();\napp.MapReverseProxy();\napp.Run();\n\n// 2. appsettings.json Route Mapping:\n// {\n//   \"ReverseProxy\": {\n//     \"Routes\": {\n//       \"orders-route\": {\n//         \"ClusterId\": \"orders-cluster\",\n//         \"Match\": { \"Path\": \"/api/orders/{**catch-all}\" }\n//       }\n//     },\n//     \"Clusters\": {\n//       \"orders-cluster\": {\n//         \"Destinations\": {\n//           \"order-service-1\": { \"Address\": \"https://orders-service:5001\" },\n//           \"order-service-2\": { \"Address\": \"https://orders-service:5002\" }\n//         },\n//         \"LoadBalancingPolicy\": \"RoundRobin\"\n//       }\n//     }\n//   }\n// }",
        "language": "csharp",
        "output": "Routes incoming /api/orders traffic across multiple backend instances using RoundRobin load balancing.",
        "lineExplanation": [
          "YARP matches URL paths and balances requests across registered backend clusters.",
          "Clients interact only with the Gateway URL; backend microservices remain unexposed."
        ]
      }
    ],
    "diagram": "API Gateway Architecture:\n[ Mobile / Angular Client ]\n             |\n   (Single Entrypoint)\n             v\n+--------------------------+\n|  YARP / Ocelot Gateway   | (Handles Auth, SSL, Throttling)\n+--------------------------+\n      /              \\\n  (Route 1)       (Route 2)\n     v               v\n[ Order Microservice ]  [ Inventory Microservice ]",
    "realWorldApplication": "Shielding internal microservices from public internet access while providing unified routing and authentication for web and mobile clients.",
    "commonErrors": [
      {
        "error": "Exposing internal microservices directly to the public internet",
        "cause": "Forces clients to track dozens of microservice URLs and handle complex cross-cutting auth logic.",
        "fix": "Route all public traffic through a centralized API Gateway."
      }
    ],
    "bestPractices": [
      "Use YARP for high-performance .NET reverse proxy scenarios.",
      "Implement SSL termination and JWT validation at the gateway level.",
      "Configure health checks and round-robin load balancing across replicas."
    ],
    "practiceQuestions": [
      {
        "question": "What is the primary role of an API Gateway in a microservices system?",
        "options": [
          "To act as a central database.",
          "To provide a single entry point for clients, routing traffic, load balancing, and handling cross-cutting concerns like auth and rate limiting.",
          "To replace Docker.",
          "To write CSS files."
        ],
        "answerIndex": 1,
        "explanation": "An API gateway decouples clients from internal microservices, managing routing, security, and load balancing centrally."
      }
    ],
    "revisionSummary": [
      "API Gateways route, load-balance, and secure microservices.",
      "YARP is Microsoft's high-speed .NET reverse proxy.",
      "Service discovery resolves dynamic container IP addresses."
    ],
    "references": [
      {
        "title": "YARP: Yet Another Reverse Proxy - Official Guide",
        "url": "https://microsoft.github.io/reverse-proxy/",
        "source": "Microsoft GitHub"
      }
    ]
  },
  "topic-17-3": {
    "id": "topic-17-3",
    "title": "Inter-Service Communication",
    "category": "17. Microservices Concepts",
    "description": "REST sync; messaging async (RabbitMQ/Azure Service Bus awareness); event-driven basics",
    "objectives": [
      "Compare synchronous HTTP/REST communication with asynchronous message-driven communication",
      "Understand Event-Driven Architecture (EDA) and the Publish-Subscribe pattern",
      "Explore Message Brokers: RabbitMQ and Azure Service Bus (Queues vs Topics)",
      "Avoid cascading system failures using the Outbox Pattern"
    ],
    "prerequisites": "Microservices architecture patterns (Topic 17-1).",
    "terminology": [
      {
        "term": "Synchronous REST",
        "definition": "A blocking request-response pattern where the caller waits for the receiver to respond before proceeding."
      },
      {
        "term": "Message Broker",
        "definition": "An intermediary software infrastructure (RabbitMQ, Azure Service Bus, Kafka) that queues and distributes messages asynchronously."
      },
      {
        "term": "Event-Driven Architecture",
        "definition": "A design pattern where state changes (events) are published to a broker, allowing decoupled services to react asynchronously."
      },
      {
        "term": "Outbox Pattern",
        "definition": "A reliability pattern that saves messages to a database table within the local transaction before publishing to prevent message loss during crashes."
      }
    ],
    "concepts": [
      {
        "title": "Asynchronous Messaging with RabbitMQ / Service Bus",
        "explanation": "Synchronous HTTP between microservices creates temporal coupling: if Service B is down, Service A fails. Message brokers decouple services in time.",
        "codeSnippet": "// 1. Defining an Integration Event\npublic record OrderPlacedIntegrationEvent(\n    Guid OrderId, \n    int CustomerId, \n    decimal TotalAmount, \n    DateTime CreatedAtUtc);\n\n// 2. Publishing to Message Bus (e.g. MassTransit with RabbitMQ)\npublic class CheckoutController(IPublishEndpoint publishEndpoint) : ControllerBase\n{\n    [HttpPost]\n    public async Task<IActionResult> PlaceOrder([FromBody] OrderRequest request)\n    {\n        // 1. Save order to local database...\n        var orderId = Guid.NewGuid();\n\n        // 2. Publish event asynchronously to message broker\n        await publishEndpoint.Publish(new OrderPlacedIntegrationEvent(\n            orderId, request.CustomerId, request.TotalAmount, DateTime.UtcNow));\n\n        // Returns immediately without waiting for billing or shipping!\n        return Accepted(new { OrderId = orderId });\n    }\n}\n\n// 3. Consumer in separate Billing Microservice:\npublic class OrderPlacedConsumer : IConsumer<OrderPlacedIntegrationEvent>\n{\n    public async Task Consume(ConsumeContext<OrderPlacedIntegrationEvent> context)\n    {\n        Console.WriteLine($\"Charging credit card for order: {context.Message.OrderId}\");\n    }\n}",
        "language": "csharp",
        "output": "Publishes event to RabbitMQ queue. Decoupled consumers process work in the background.",
        "lineExplanation": [
          "Line 2: Integration Event represents a past business fact (OrderPlaced).",
          "Line 16: publishEndpoint sends message to RabbitMQ without blocking on downstream services.",
          "Line 24: Consumer runs independently in a separate background container."
        ]
      }
    ],
    "diagram": "Synchronous Coupling vs Asynchronous Decoupling:\nSync (Fragile):\n[ Order Service ] === HTTP POST ===> [ Billing Service (DOWN!) ] ---> Fails entire user checkout!\n\nAsync (Resilient):\n[ Order Service ] ---> [ RabbitMQ Queue ] (Saves message safely)\n                             | (Buffered until service recovers)\n                             v\n                       [ Billing Service ] (Processes message when online!)",
    "realWorldApplication": "Processing payments, sending welcome emails, and reserving warehouse inventory without slowing down the user's checkout experience.",
    "commonErrors": [
      {
        "error": "Chaining synchronous HTTP calls through multiple microservices (Service A -> B -> C -> D)",
        "cause": "If any service in the chain lags or fails, the entire transaction fails, creating compounding latency.",
        "fix": "Use asynchronous message queues for operations that do not require immediate synchronous return values."
      }
    ],
    "bestPractices": [
      "Use asynchronous messaging (RabbitMQ, Service Bus) for inter-service communication.",
      "Implement the Outbox Pattern to guarantee at-least-once message delivery.",
      "Use MassTransit in .NET to abstract message broker implementation details."
    ],
    "practiceQuestions": [
      {
        "question": "Why is asynchronous messaging via a message broker preferred over synchronous HTTP calls between microservices?",
        "options": [
          "HTTP is deprecated.",
          "It decouples services in time, preventing cascading failures and buffering workloads during traffic spikes.",
          "Message brokers don't use memory.",
          "It eliminates the need for unit tests."
        ],
        "answerIndex": 1,
        "explanation": "Asynchronous messaging buffers requests and decouples services, so if a downstream service is temporarily offline, messages are held safely until it recovers."
      }
    ],
    "revisionSummary": [
      "Synchronous REST creates temporal coupling.",
      "Asynchronous messaging (RabbitMQ, Service Bus) delivers resilience and scalability.",
      "Use the Outbox Pattern to guarantee message persistence."
    ],
    "references": [
      {
        "title": "Asynchronous message-based communication - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/asynchronous-message-based-communication",
        "source": "Microsoft Learn"
      }
    ]
  }
};
