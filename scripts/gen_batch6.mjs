import fs from 'fs';

function writeModule(filename, varName, lessons) {
  const content = `/**
 * Pre-generated comprehensive lessons for ${varName}
 * Sources: Microsoft Learn Microservices, Docker Docs, OWASP Foundation.
 */

export const ${varName} = ${JSON.stringify(lessons, null, 2)};
`;
  fs.writeFileSync(`src/data/lessons/${filename}`, content);
  console.log(`Generated src/data/lessons/${filename} (${Object.keys(lessons).length} topics)`);
}

// -------------------------------------------------------------
// MODULE 17: Microservices Concepts (3 topics)
// -------------------------------------------------------------
const m17 = {
  "topic-17-1": {
    id: "topic-17-1",
    title: "Microservices Architecture Patterns",
    category: "17. Microservices Concepts",
    description: "Monolithic vs microservices; when to use each; trade-offs; domain-driven design awareness",
    objectives: [
      "Compare monolithic architectures with distributed microservices architectures",
      "Evaluate trade-offs: independent deployment and scaling vs distributed complexity and network latency",
      "Apply Domain-Driven Design (DDD) concepts (Bounded Contexts, Ubiquitous Language, Aggregate Roots)",
      "Determine when a team should remain on a Modular Monolith vs migrate to Microservices"
    ],
    prerequisites: "Web API architecture and design patterns.",
    terminology: [
      { term: "Monolith", definition: "A software application in which all functional modules (ordering, billing, inventory, auth) are packaged and deployed as a single unified executable." },
      { term: "Microservices", definition: "An architectural style structuring an application as a collection of independently deployable, loosely coupled services organized around business domains." },
      { term: "Bounded Context", definition: "A central DDD pattern defining explicit boundaries within which a domain model applies and has specific meaning." }
    ],
    concepts: [
      {
        title: "Monolith vs Microservices Trade-offs",
        explanation: "Microservices solve organizational scaling problems, not performance problems. For small teams, a well-architected Modular Monolith is almost always superior.",
        codeSnippet: `// Domain-Driven Design (DDD) Bounded Context Separation:
// Context 1: Order Processing Domain
namespace Store.Ordering.Domain
{
    public class Order { public int Id { get; set; } public decimal Total { get; set; } }
}

// Context 2: Fulfillment & Shipping Domain (Completely separate model!)
namespace Store.Shipping.Domain
{
    public class Shipment { public string TrackingNumber { get; set; } = ""; public double WeightKg { get; set; } }
}`,
        language: "csharp",
        output: "Each bounded context manages its own data models and database independently.",
        lineExplanation: [
          "In microservices, services do NOT share database tables; each service owns its own private data store."
        ]
      }
    ],
    diagram: `Monolith vs Microservices Architecture:
Monolith:
[ Client ] ---> [ Single Large App (Ordering + Billing + Catalog) ] ---> [ Shared DB ]

Microservices:
               +---> [ Order Service ] ------> [ Orders DB ]
[ Client ] --->|---> [ Billing Service ] ----> [ Billing DB ]
(via Gateway)  +---> [ Catalog Service ] ----> [ Catalog DB ]`,
    realWorldApplication: "Architecting large enterprise systems (Netflix, Amazon, Uber) where hundreds of cross-functional teams build and deploy independently.",
    commonErrors: [
      {
        error: "Creating a 'Distributed Monolith' (Microservices sharing a single central database)",
        cause: "Services are physically separate but still tightly coupled at the database level, combining the worst of both worlds.",
        fix: "Enforce Database-Per-Service: each microservice owns its private database."
      }
    ],
    bestPractices: [
      "Start with a well-structured Modular Monolith; split into microservices only when independent team scaling requires it.",
      "Never share database tables directly between microservices.",
      "Design service boundaries around Domain-Driven Design (DDD) Bounded Contexts."
    ],
    practiceQuestions: [
      {
        question: "What is the primary anti-pattern to avoid when transitioning to a microservices architecture?",
        options: [
          "Using Linux containers.",
          "Building a Distributed Monolith where multiple microservices query and mutate the exact same shared database.",
          "Using asynchronous messaging.",
          "Using REST APIs."
        ],
        answerIndex: 1,
        explanation: "Sharing a single database between services creates tight coupling and eliminates independent deployment benefits (Distributed Monolith)."
      }
    ],
    revisionSummary: [
      "Monoliths are simpler to develop, test, and deploy.",
      "Microservices allow independent deployment and team scaling.",
      "Enforce Database-Per-Service and DDD Bounded Contexts."
    ],
    references: [
      { title: ".NET Microservices Architecture Guide - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/architecture/microservices/", source: "Microsoft Learn" }
    ]
  },

  "topic-17-2": {
    id: "topic-17-2",
    title: "API Gateways & Service Discovery",
    category: "17. Microservices Concepts",
    description: "Service discovery; API gateway (Ocelot/YARP awareness); load balancing — concepts with .NET examples",
    objectives: [
      "Understand the role of an API Gateway as the single reverse proxy entry point for client applications",
      "Configure YARP (Yet Another Reverse Proxy) in ASP.NET Core for routing and load balancing",
      "Explore Ocelot gateway capabilities for request aggregation and rate limiting",
      "Understand dynamic Service Discovery mechanics (Consul, Kubernetes DNS)"
    ],
    prerequisites: "Web API architecture and Routing.",
    terminology: [
      { term: "API Gateway", definition: "A server that acts as a single API front door, intercepting requests to perform routing, rate limiting, SSL termination, and token validation." },
      { term: "YARP (Yet Another Reverse Proxy)", definition: "Microsoft's high-performance, customizable reverse proxy toolkit for building gateways in .NET." },
      { term: "Service Discovery", definition: "The automatic detection of network locations (IP and port) for microservice instances as they scale dynamically." }
    ],
    concepts: [
      {
        title: "YARP (Yet Another Reverse Proxy) Configuration",
        explanation: "YARP provides Microsoft's modern, highly optimized reverse proxy directly in ASP.NET Core with minimal configuration.",
        codeSnippet: `// 1. Program.cs for YARP Gateway
var builder = WebApplication.CreateBuilder(args);

// Add YARP services and read routes from appsettings.json
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();
app.MapReverseProxy();
app.Run();

// 2. appsettings.json Route Mapping:
// {
//   "ReverseProxy": {
//     "Routes": {
//       "orders-route": {
//         "ClusterId": "orders-cluster",
//         "Match": { "Path": "/api/orders/{**catch-all}" }
//       }
//     },
//     "Clusters": {
//       "orders-cluster": {
//         "Destinations": {
//           "order-service-1": { "Address": "https://orders-service:5001" },
//           "order-service-2": { "Address": "https://orders-service:5002" }
//         },
//         "LoadBalancingPolicy": "RoundRobin"
//       }
//     }
//   }
// }`,
        language: "csharp",
        output: "Routes incoming /api/orders traffic across multiple backend instances using RoundRobin load balancing.",
        lineExplanation: [
          "YARP matches URL paths and balances requests across registered backend clusters.",
          "Clients interact only with the Gateway URL; backend microservices remain unexposed."
        ]
      }
    ],
    diagram: `API Gateway Architecture:
[ Mobile / Angular Client ]
             |
   (Single Entrypoint)
             v
+--------------------------+
|  YARP / Ocelot Gateway   | (Handles Auth, SSL, Throttling)
+--------------------------+
      /              \\
  (Route 1)       (Route 2)
     v               v
[ Order Microservice ]  [ Inventory Microservice ]`,
    realWorldApplication: "Shielding internal microservices from public internet access while providing unified routing and authentication for web and mobile clients.",
    commonErrors: [
      {
        error: "Exposing internal microservices directly to the public internet",
        cause: "Forces clients to track dozens of microservice URLs and handle complex cross-cutting auth logic.",
        fix: "Route all public traffic through a centralized API Gateway."
      }
    ],
    bestPractices: [
      "Use YARP for high-performance .NET reverse proxy scenarios.",
      "Implement SSL termination and JWT validation at the gateway level.",
      "Configure health checks and round-robin load balancing across replicas."
    ],
    practiceQuestions: [
      {
        question: "What is the primary role of an API Gateway in a microservices system?",
        options: [
          "To act as a central database.",
          "To provide a single entry point for clients, routing traffic, load balancing, and handling cross-cutting concerns like auth and rate limiting.",
          "To replace Docker.",
          "To write CSS files."
        ],
        answerIndex: 1,
        explanation: "An API gateway decouples clients from internal microservices, managing routing, security, and load balancing centrally."
      }
    ],
    revisionSummary: [
      "API Gateways route, load-balance, and secure microservices.",
      "YARP is Microsoft's high-speed .NET reverse proxy.",
      "Service discovery resolves dynamic container IP addresses."
    ],
    references: [
      { title: "YARP: Yet Another Reverse Proxy - Official Guide", url: "https://microsoft.github.io/reverse-proxy/", source: "Microsoft GitHub" }
    ]
  },

  "topic-17-3": {
    id: "topic-17-3",
    title: "Inter-Service Communication",
    category: "17. Microservices Concepts",
    description: "REST sync; messaging async (RabbitMQ/Azure Service Bus awareness); event-driven basics",
    objectives: [
      "Compare synchronous HTTP/REST communication with asynchronous message-driven communication",
      "Understand Event-Driven Architecture (EDA) and the Publish-Subscribe pattern",
      "Explore Message Brokers: RabbitMQ and Azure Service Bus (Queues vs Topics)",
      "Avoid cascading system failures using the Outbox Pattern"
    ],
    prerequisites: "Microservices architecture patterns (Topic 17-1).",
    terminology: [
      { term: "Synchronous REST", definition: "A blocking request-response pattern where the caller waits for the receiver to respond before proceeding." },
      { term: "Message Broker", definition: "An intermediary software infrastructure (RabbitMQ, Azure Service Bus, Kafka) that queues and distributes messages asynchronously." },
      { term: "Event-Driven Architecture", definition: "A design pattern where state changes (events) are published to a broker, allowing decoupled services to react asynchronously." },
      { term: "Outbox Pattern", definition: "A reliability pattern that saves messages to a database table within the local transaction before publishing to prevent message loss during crashes." }
    ],
    concepts: [
      {
        title: "Asynchronous Messaging with RabbitMQ / Service Bus",
        explanation: "Synchronous HTTP between microservices creates temporal coupling: if Service B is down, Service A fails. Message brokers decouple services in time.",
        codeSnippet: `// 1. Defining an Integration Event
public record OrderPlacedIntegrationEvent(
    Guid OrderId, 
    int CustomerId, 
    decimal TotalAmount, 
    DateTime CreatedAtUtc);

// 2. Publishing to Message Bus (e.g. MassTransit with RabbitMQ)
public class CheckoutController(IPublishEndpoint publishEndpoint) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> PlaceOrder([FromBody] OrderRequest request)
    {
        // 1. Save order to local database...
        var orderId = Guid.NewGuid();

        // 2. Publish event asynchronously to message broker
        await publishEndpoint.Publish(new OrderPlacedIntegrationEvent(
            orderId, request.CustomerId, request.TotalAmount, DateTime.UtcNow));

        // Returns immediately without waiting for billing or shipping!
        return Accepted(new { OrderId = orderId });
    }
}

// 3. Consumer in separate Billing Microservice:
public class OrderPlacedConsumer : IConsumer<OrderPlacedIntegrationEvent>
{
    public async Task Consume(ConsumeContext<OrderPlacedIntegrationEvent> context)
    {
        Console.WriteLine($"Charging credit card for order: {context.Message.OrderId}");
    }
}`,
        language: "csharp",
        output: "Publishes event to RabbitMQ queue. Decoupled consumers process work in the background.",
        lineExplanation: [
          "Line 2: Integration Event represents a past business fact (OrderPlaced).",
          "Line 16: publishEndpoint sends message to RabbitMQ without blocking on downstream services.",
          "Line 24: Consumer runs independently in a separate background container."
        ]
      }
    ],
    diagram: `Synchronous Coupling vs Asynchronous Decoupling:
Sync (Fragile):
[ Order Service ] === HTTP POST ===> [ Billing Service (DOWN!) ] ---> Fails entire user checkout!

Async (Resilient):
[ Order Service ] ---> [ RabbitMQ Queue ] (Saves message safely)
                             | (Buffered until service recovers)
                             v
                       [ Billing Service ] (Processes message when online!)`,
    realWorldApplication: "Processing payments, sending welcome emails, and reserving warehouse inventory without slowing down the user's checkout experience.",
    commonErrors: [
      {
        error: "Chaining synchronous HTTP calls through multiple microservices (Service A -> B -> C -> D)",
        cause: "If any service in the chain lags or fails, the entire transaction fails, creating compounding latency.",
        fix: "Use asynchronous message queues for operations that do not require immediate synchronous return values."
      }
    ],
    bestPractices: [
      "Use asynchronous messaging (RabbitMQ, Service Bus) for inter-service communication.",
      "Implement the Outbox Pattern to guarantee at-least-once message delivery.",
      "Use MassTransit in .NET to abstract message broker implementation details."
    ],
    practiceQuestions: [
      {
        question: "Why is asynchronous messaging via a message broker preferred over synchronous HTTP calls between microservices?",
        options: [
          "HTTP is deprecated.",
          "It decouples services in time, preventing cascading failures and buffering workloads during traffic spikes.",
          "Message brokers don't use memory.",
          "It eliminates the need for unit tests."
        ],
        answerIndex: 1,
        explanation: "Asynchronous messaging buffers requests and decouples services, so if a downstream service is temporarily offline, messages are held safely until it recovers."
      }
    ],
    revisionSummary: [
      "Synchronous REST creates temporal coupling.",
      "Asynchronous messaging (RabbitMQ, Service Bus) delivers resilience and scalability.",
      "Use the Outbox Pattern to guarantee message persistence."
    ],
    references: [
      { title: "Asynchronous message-based communication - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/asynchronous-message-based-communication", source: "Microsoft Learn" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 18: Docker & CI/CD (3 topics)
// -------------------------------------------------------------
const m18 = {
  "topic-18-1": {
    id: "topic-18-1",
    title: "Docker Fundamentals for .NET",
    category: "18. Docker & CI/CD",
    description: "Images, containers, Dockerfile; multi-stage builds for .NET; Docker Compose for local dev",
    objectives: [
      "Understand containerization: containers vs virtual machines",
      "Author optimized Multi-Stage Dockerfiles for .NET Web APIs",
      "Run and manage containers via the Docker CLI (docker build, docker run, docker ps, docker logs)",
      "Orchestrate multi-container environments (API + SQL Server + Angular) with Docker Compose"
    ],
    prerequisites: ".NET CLI and Build Tools (Module 4).",
    terminology: [
      { term: "Docker Image", definition: "A read-only blueprint containing the application code, libraries, and runtime dependencies needed to execute an application." },
      { term: "Docker Container", definition: "A runnable, isolated instance of a Docker image executing as a lightweight process on the host OS kernel." },
      { term: "Multi-Stage Build", definition: "A Dockerfile pattern that uses a heavy SDK image to build and publish the app, and copies only the compiled output into a tiny runtime image." }
    ],
    concepts: [
      {
        title: "Multi-Stage Dockerfile for .NET Web API",
        explanation: "Multi-stage builds keep production image sizes tiny (~80MB instead of 900MB) by discarding the .NET SDK after compilation.",
        codeSnippet: `# Stage 1: Build & Publish using heavy .NET SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore layers (optimized for Docker layer caching!)
COPY ["src/EnterpriseApp.Api/EnterpriseApp.Api.csproj", "EnterpriseApp.Api/"]
RUN dotnet restore "EnterpriseApp.Api/EnterpriseApp.Api.csproj"

# Copy source and publish Release binaries
COPY src/ .
WORKDIR "/src/EnterpriseApp.Api"
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Final lean runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Copy only compiled output from build stage
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "EnterpriseApp.Api.dll"]`,
        language: "dockerfile",
        output: "Builds production-hardened container image stripped of build tools and source code.",
        lineExplanation: [
          "Line 2: Uses sdk:8.0 for compilation.",
          "Line 6-7: Restoring dependencies before copying source code leverages Docker caching to speed up subsequent builds.",
          "Line 15: Uses aspnet:8.0 runtime image, keeping the final container lightweight and secure.",
          "Line 21: 'COPY --from=build' extracts only compiled DLLs."
        ]
      }
    ],
    diagram: `Multi-Stage Dockerfile Pipeline:
[ SDK Image (900MB) ] ---> Compiles Code ---> Produces /app/publish DLLs (20MB)
                                                        |
                                            (Copies compiled binaries only)
                                                        v
                                        [ ASP.NET Runtime Image (85MB) ] ---> [ Final Container ]`,
    realWorldApplication: "Ensuring an application runs identically on developer MacBooks, Windows laptops, staging servers, and Kubernetes production pods.",
    commonErrors: [
      {
        error: "Copying all source files before calling 'dotnet restore'",
        cause: "Invalidates Docker's layer cache on every minor code edit, forcing a slow NuGet restore on every build.",
        fix: "Copy .csproj files and run 'dotnet restore' first, then copy the rest of the source."
      }
    ],
    bestPractices: [
      "Always use multi-stage builds to keep production images minimal and secure.",
      "Add a .dockerignore file to exclude bin/, obj/, and node_modules/.",
      "Run container processes as non-root users for enterprise security compliance."
    ],
    practiceQuestions: [
      {
        question: "Why are Multi-Stage Builds recommended for .NET Dockerfiles?",
        options: [
          "They allow running Windows containers on Linux.",
          "They use the large .NET SDK for compilation, but package only the small ASP.NET runtime and compiled binaries into the final image, reducing image size and attack surface.",
          "They eliminate the need for a database.",
          "They are required by Docker Compose."
        ],
        answerIndex: 1,
        explanation: "Multi-stage builds separate the build environment from the runtime environment, resulting in lean, secure production containers."
      }
    ],
    revisionSummary: [
      "Containers provide isolated, reproducible execution environments.",
      "Multi-stage builds keep production image footprints minimal.",
      "Docker Compose coordinates local multi-container development."
    ],
    references: [
      { title: "Containerize a .NET app - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/core/docker/build-container", source: "Microsoft Learn" }
    ]
  },

  "topic-18-2": {
    id: "topic-18-2",
    title: "CI/CD Concepts & GitHub Actions",
    category: "18. Docker & CI/CD",
    description: "Pipeline structure; build → test → scan → deploy; GitHub Actions basics (hands-on pipeline for .NET + Angular)",
    objectives: [
      "Understand Continuous Integration (CI) and Continuous Deployment (CD)",
      "Structure automated pipelines: Build -> Test -> Security Scan -> Package -> Deploy",
      "Author GitHub Actions workflows using YAML (.github/workflows/ci.yml)",
      "Automate build verification and test reporting on every Pull Request"
    ],
    prerequisites: "Git (Module 3) and Docker (Topic 18-1).",
    terminology: [
      { term: "Continuous Integration (CI)", definition: "Automating the building, testing, and static analysis of code changes whenever a developer pushes to a repository branch." },
      { term: "Continuous Deployment (CD)", definition: "Automatically deploying tested code changes directly to staging or production environments without manual intervention." },
      { term: "GitHub Actions", definition: "A CI/CD and workflow automation platform integrated into GitHub that executes pipelines defined in YAML files." }
    ],
    concepts: [
      {
        title: "Automated .NET & Angular CI Pipeline with GitHub Actions",
        explanation: "Automated GitHub Actions workflows run on cloud virtual machines on every pull request, preventing broken code from merging into main.",
        codeSnippet: `name: Full-Stack CI Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    # 1. Setup .NET 8 SDK
    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: '8.0.x'

    - name: Restore .NET dependencies
      run: dotnet restore

    - name: Build .NET Solution
      run: dotnet build --no-restore --configuration Release

    - name: Run .NET Unit Tests
      run: dotnet test --no-build --configuration Release --verbosity normal

    # 2. Setup Node.js & Test Angular Frontend
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'

    - name: Install Frontend Dependencies
      run: npm ci

    - name: Build Angular Frontend
      run: npm run build --if-present`,
        language: "yaml",
        output: "Automatically executes full-stack build and test suite on Ubuntu runners on every PR.",
        lineExplanation: [
          "Line 4-7: Triggers pipeline automatically on pushes and PRs to main.",
          "Line 18: 'actions/setup-dotnet@v4' provisions .NET 8 in seconds.",
          "Line 27: Executes all xUnit test suites; fails PR if any test fails."
        ]
      }
    ],
    diagram: `CI/CD Automation Pipeline:
[ Git Push PR ] ---> [ 1. Checkout ] ---> [ 2. Build Solution ] ---> [ 3. Run Tests ]
                                                                             |
                                                                        (All Green?)
                                                                             v
                                                                 [ 4. Deploy to Cloud ]`,
    realWorldApplication: "Protecting production codebases by verifying that all tests pass, security scans succeed, and builds compile before allowing merges.",
    commonErrors: [
      {
        error: "Pipeline fails due to 'npm install' changing lockfiles in CI",
        cause: "Using 'npm install' instead of 'npm ci' on continuous integration runners.",
        fix: "Always use 'npm ci' in CI/CD pipelines to guarantee deterministic, exact package installations."
      }
    ],
    bestPractices: [
      "Always use 'npm ci' in automated pipelines rather than 'npm install'.",
      "Treat compiler warnings as errors in CI builds.",
      "Store deployment secrets in GitHub Repository Secrets, never in plain YAML."
    ],
    practiceQuestions: [
      {
        question: "Why should 'npm ci' be used instead of 'npm install' in automated CI/CD pipelines?",
        options: [
          "npm install is deprecated.",
          "npm ci strictly adheres to package-lock.json and never modifies it, guaranteeing consistent, deterministic builds.",
          "npm ci only works on Linux.",
          "There is no difference."
        ],
        answerIndex: 1,
        explanation: "'npm ci' does a clean install based strictly on package-lock.json without modifying it, ensuring reproducible builds across CI servers."
      }
    ],
    revisionSummary: [
      "CI builds and tests on every commit.",
      "CD automates deployments to staging and production.",
      "GitHub Actions workflows are defined in YAML files."
    ],
    references: [
      { title: "GitHub Actions Documentation", url: "https://docs.github.com/en/actions", source: "GitHub Docs" }
    ]
  },

  "topic-18-3": {
    id: "topic-18-3",
    title: "Kubernetes Awareness",
    category: "18. Docker & CI/CD",
    description: "What it is; pods, services, deployments — concepts only",
    objectives: [
      "Understand why container orchestration is necessary at enterprise scale",
      "Master core Kubernetes primitives: Pods, Deployments, and Services",
      "Understand automated rolling updates, self-healing, and horizontal auto-scaling",
      "Learn declarative YAML manifests (kind: Deployment, kind: Service)"
    ],
    prerequisites: "Docker fundamentals (Topic 18-1).",
    terminology: [
      { term: "Kubernetes (K8s)", definition: "An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications." },
      { term: "Pod", definition: "The smallest deployable computing unit in Kubernetes, wrapping one or more tightly coupled containers sharing network and storage." },
      { term: "Deployment", definition: "A controller that declaratively manages the desired number of Pod replicas, self-healing, and rolling update strategies." },
      { term: "Service", definition: "An abstraction that defines a logical set of Pods and a persistent network IP policy to access them (ClusterIP, NodePort, LoadBalancer)." }
    ],
    concepts: [
      {
        title: "Kubernetes Primitives: Deployment and Service",
        explanation: "Instead of running single Docker containers manually, Kubernetes maintains a desired state declared in YAML files.",
        codeSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 3 # Self-healing: Kubernetes ensures 3 pods are ALWAYS running!
  selector:
    matchLabels:
      app: web-api
  template:
    metadata:
      labels:
        app: web-api
    spec:
      containers:
      - name: enterprise-api
        image: myregistry.azurecr.io/enterprise-api:v1.2.0
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  type: LoadBalancer # Balances incoming traffic across the 3 pods!
  selector:
    app: web-api
  ports:
  - port: 80
    targetPort: 8080`,
        language: "yaml",
        output: "Provisions 3 self-healing pods balanced behind a single stable IP service.",
        lineExplanation: [
          "Line 5: 'replicas: 3' instructs Kubernetes to run 3 redundant instances.",
          "Line 17: In case of server hardware failure, Kubernetes restarts pods on healthy nodes automatically.",
          "Line 24: 'kind: Service' balances traffic evenly across the 3 pods."
        ]
      }
    ],
    diagram: `Kubernetes Cluster Architecture:
[ Incoming Traffic ] ---> [ K8s Service: api-service ]
                                    |
                    (Load balances across replicas)
                                    |
           +------------------------+------------------------+
           |                        |                        |
           v                        v                        v
    [ Pod 1 (Replica) ]      [ Pod 2 (Replica) ]      [ Pod 3 (Replica) ]`,
    realWorldApplication: "Running resilient cloud-native applications on Azure Kubernetes Service (AKS), AWS EKS, or Google GKE.",
    commonErrors: [
      {
        error: "Hardcoding Pod IP addresses in frontend configurations",
        cause: "Pods are ephemeral; their IP addresses change every time they restart or update.",
        fix: "Always communicate with Pods through a stable Kubernetes Service name."
      }
    ],
    bestPractices: [
      "Always define resource requests and limits (CPU and Memory) for every container in a pod.",
      "Configure liveness and readiness probes so Kubernetes knows when to restart unhealthy containers.",
      "Use ConfigMaps and Secrets to inject configuration into pods."
    ],
    practiceQuestions: [
      {
        question: "What is the smallest deployable execution unit in a Kubernetes cluster?",
        options: ["A Virtual Machine", "A Pod", "A Service", "A Node"],
        answerIndex: 1,
        explanation: "A Pod is the smallest deployable unit in Kubernetes, encapsulating one or more containers."
      }
    ],
    revisionSummary: [
      "Kubernetes orchestrates containers at scale.",
      "Pods are the smallest execution units; Deployments manage replicas.",
      "Services provide persistent network addresses and load balancing."
    ],
    references: [
      { title: "Kubernetes Basics - Official Documentation", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/", source: "Kubernetes.io" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 19: Cloud Awareness (1 topic)
// -------------------------------------------------------------
const m19 = {
  "topic-19-1": {
    id: "topic-19-1",
    title: "Cloud Computing Fundamentals",
    category: "19. Cloud Awareness",
    description: "Cloud Fundamentals : IaaS, PaaS, SaaS; major providers (AWS/Azure/GCP); key services — compute, storage, RDS, API gateway, serverless",
    objectives: [
      "Understand cloud service models: IaaS (Infrastructure), PaaS (Platform), SaaS (Software)",
      "Compare the major cloud hyperscalers: Microsoft Azure, AWS, and Google Cloud",
      "Explore core cloud services: Compute (App Services, VMs), Storage (Blob/S3), Managed SQL, and Serverless Functions",
      "Evaluate cost optimization, elasticity, and cloud high availability"
    ],
    prerequisites: "General web architecture.",
    terminology: [
      { term: "IaaS", definition: "Infrastructure as a Service (e.g. Azure VMs, AWS EC2); renting virtual hardware where you manage OS and software." },
      { term: "PaaS", definition: "Platform as a Service (e.g. Azure App Service, AWS Elastic Beanstalk); cloud provider manages OS and servers; you deploy only code." },
      { term: "Serverless (FaaS)", definition: "Functions as a Service (Azure Functions, AWS Lambda); event-driven execution with zero server management that scales to zero when idle." }
    ],
    concepts: [
      {
        title: "IaaS vs PaaS vs Serverless Comparison",
        explanation: "Modern .NET full-stack developers prioritize PaaS (Azure App Service) and Serverless to minimize infrastructure management.",
        codeSnippet: `// Azure Serverless Function (.NET 8 Isolated Worker)
public class CloudOrderFunction(ILogger<CloudOrderFunction> logger)
{
    [Function("ProcessOrderQueue")]
    public void Run([QueueTrigger("orders-queue", Connection = "AzureWebJobsStorage")] string orderMessage)
    {
        // Executes serverlessly ONLY when a message enters the cloud queue!
        // Costs $0.00 when queue is idle!
        logger.LogInformation("Processing cloud queue message: {Message}", orderMessage);
    }
}`,
        language: "csharp",
        output: "Executes in cloud on demand with sub-second scaling and zero idle billing.",
        lineExplanation: [
          "Demonstrates event-driven serverless computing scaling dynamically based on queue depth."
        ]
      }
    ],
    diagram: `Shared Responsibility Model:
Model       You Manage                  Cloud Provider Manages
IaaS        App, Data, OS, Runtime      Virtualization, Hardware, Datacenter
PaaS        Application Code & Data     OS, Patching, Runtime, Hardware
Serverless  Application Functions Only  Scaling, OS, Runtime, Hardware
SaaS        Nothing (End User)          Everything (e.g. Office 365, Salesforce)`,
    realWorldApplication: "Deploying enterprise .NET Web APIs to Azure App Service and Angular frontends to Azure Static Web Apps or AWS S3/CloudFront.",
    commonErrors: [
      {
        error: "Choosing IaaS virtual machines when a managed PaaS service would cost 70% less in maintenance",
        cause: "Assuming cloud is just 'other people's computers' instead of leveraging managed platform offerings.",
        fix: "Default to PaaS (Azure App Service / Container Apps) unless custom OS drivers are required."
      }
    ],
    bestPractices: [
      "Use PaaS (Azure App Service, Azure Container Apps) for Web APIs to eliminate server patching.",
      "Host Angular static assets on low-cost CDNs (Azure Static Web Apps, AWS CloudFront).",
      "Use managed databases (Azure SQL Database, AWS Aurora) for automated backups and failover."
    ],
    practiceQuestions: [
      {
        question: "Which cloud service model relieves developers from managing the operating system, security patching, and server maintenance while allowing them to deploy code directly?",
        options: ["IaaS", "PaaS (Platform as a Service)", "SaaS", "On-Premises"],
        answerIndex: 1,
        explanation: "PaaS providers manage the OS, runtime, and server infrastructure, allowing developers to focus solely on application code and configuration."
      }
    ],
    revisionSummary: [
      "IaaS = virtual machines; PaaS = managed application platforms; Serverless = event-driven functions.",
      "Azure, AWS, and GCP offer equivalent managed building blocks.",
      "Leverage PaaS to minimize operations overhead."
    ],
    references: [
      { title: "Microsoft Azure Fundamentals - Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/", source: "Microsoft Learn" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 20: Security Practices (1 topic)
// -------------------------------------------------------------
const m20 = {
  "topic-20-1": {
    id: "topic-20-1",
    title: "OWASP Top 10 & Application Security",
    category: "20. Security Practices",
    description: "OWASP Top 10 : Top vulnerabilities with C# and JavaScript/TypeScript examples; what AI tools commonly get wrong",
    objectives: [
      "Master the OWASP Top 10 Web Application Security Risks",
      "Mitigate Injection attacks (SQLi), Broken Access Control, and Cryptographic Failures",
      "Prevent Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF)",
      "Audit AI-generated code for common security anti-patterns"
    ],
    prerequisites: "Web APIs, Security, and JavaScript.",
    terminology: [
      { term: "OWASP", definition: "Open Worldwide Application Security Project; an online community providing free articles, methodologies, and standards for web security." },
      { term: "Broken Access Control", definition: "The #1 OWASP vulnerability where users can act outside their intended permissions (e.g. accessing another customer's invoice by changing the URL ID)." },
      { term: "XSS (Cross-Site Scripting)", definition: "Injecting malicious client-side scripts into web pages viewed by other users." }
    ],
    concepts: [
      {
        title: "Mitigating Broken Access Control (BOLA/IDOR)",
        explanation: "Broken Object Level Authorization (IDOR) happens when an API accepts an ID from a client without verifying that the currently logged-in user owns that record.",
        codeSnippet: `// VULNERABLE CODE (IDOR / Broken Access Control):
// [HttpGet("invoices/{invoiceId}")]
// public async Task<IActionResult> GetInvoice(int invoiceId) {
//     return Ok(await _db.Invoices.FindAsync(invoiceId)); // Flaw: Any user can read ANY invoice!
// }

// SECURE CODE: Enforces Resource-Based Ownership Validation
[Authorize]
[HttpGet("invoices/{invoiceId}")]
public async Task<IActionResult> GetInvoice(int invoiceId)
{
    var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

    // Verify both the invoice ID AND ownership by the active user!
    var invoice = await _db.Invoices
        .FirstOrDefaultAsync(i => i.Id == invoiceId && i.UserId == currentUserId);

    if (invoice == null)
        return NotFound(); // Return 404 to avoid leaking invoice existence

    return Ok(invoice);
}`,
        language: "csharp",
        output: "Protects against IDOR/BOLA attacks by enforcing ownership checks at query time.",
        lineExplanation: [
          "Line 15: Scopes the database query to the current authenticated user ID.",
          "Line 18: Returns 404 rather than 403 to prevent attackers from discovering valid invoice IDs through probing."
        ]
      }
    ],
    diagram: `Broken Object Level Authorization (BOLA) Attack:
Attacker logs in as User A (Id: 101)
Attacker requests: GET /api/invoices/9999 (Belongs to User B!)
Vulnerable API: Returns User B's private invoice!
Secure API: Checks (InvoiceId == 9999 AND UserId == 101) -> Returns 404 NotFound!`,
    realWorldApplication: "Protecting medical records, financial balances, and personally identifiable information (PII) against unauthorized data breaches.",
    commonErrors: [
      {
        error: "Assuming authentication equals authorization",
        cause: "Checking only that the user is logged in ([Authorize]), but failing to verify whether they have rights to the specific record requested.",
        fix: "Always verify tenant/user ownership in database query predicates."
      }
    ],
    bestPractices: [
      "Enforce authorization checks on every single state-modifying and data-retrieval endpoint.",
      "Sanitize and encode all dynamic user data rendered in HTML to prevent XSS.",
      "Store passwords using modern salted adaptive hashing (ASP.NET Core Identity PBKDF2/Argon2)."
    ],
    practiceQuestions: [
      {
        question: "What is currently ranked as the #1 most critical web application security risk in the OWASP Top 10?",
        options: ["SQL Injection", "Broken Access Control", "Security Misconfiguration", "Cryptographic Failures"],
        answerIndex: 1,
        explanation: "Broken Access Control (including IDOR and privilege escalation) is the #1 security risk in the OWASP Top 10."
      }
    ],
    revisionSummary: [
      "Broken Access Control is the most prevalent web vulnerability.",
      "Always verify that the active user owns the requested entity.",
      "Sanitize inputs to stop injection and XSS."
    ],
    references: [
      { title: "OWASP Top 10:2021 Overview", url: "https://owasp.org/Top10/", source: "OWASP Foundation" }
    ]
  }
};

writeModule('module17_microservices.js', 'MODULE_17_LESSONS', m17);
writeModule('module18_docker_cicd.js', 'MODULE_18_LESSONS', m18);
writeModule('module19_cloud_awareness.js', 'MODULE_19_LESSONS', m19);
writeModule('module20_security_practices.js', 'MODULE_20_LESSONS', m20);
console.log('Batch 6 (Modules 17, 18, 19, 20) complete!');
