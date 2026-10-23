/**
 * Pre-generated comprehensive lessons for MODULE_18_LESSONS
 * Sources: Microsoft Learn Microservices, Docker Docs, OWASP Foundation.
 */

export const MODULE_18_LESSONS = {
  "topic-18-1": {
    "id": "topic-18-1",
    "title": "Docker Fundamentals for .NET",
    "category": "18. Docker & CI/CD",
    "description": "Images, containers, Dockerfile; multi-stage builds for .NET; Docker Compose for local dev",
    "objectives": [
      "Understand containerization: containers vs virtual machines",
      "Author optimized Multi-Stage Dockerfiles for .NET Web APIs",
      "Run and manage containers via the Docker CLI (docker build, docker run, docker ps, docker logs)",
      "Orchestrate multi-container environments (API + SQL Server + Angular) with Docker Compose"
    ],
    "prerequisites": ".NET CLI and Build Tools (Module 4).",
    "terminology": [
      {
        "term": "Docker Image",
        "definition": "A read-only blueprint containing the application code, libraries, and runtime dependencies needed to execute an application."
      },
      {
        "term": "Docker Container",
        "definition": "A runnable, isolated instance of a Docker image executing as a lightweight process on the host OS kernel."
      },
      {
        "term": "Multi-Stage Build",
        "definition": "A Dockerfile pattern that uses a heavy SDK image to build and publish the app, and copies only the compiled output into a tiny runtime image."
      }
    ],
    "concepts": [
      {
        "title": "Multi-Stage Dockerfile for .NET Web API",
        "explanation": "Multi-stage builds keep production image sizes tiny (~80MB instead of 900MB) by discarding the .NET SDK after compilation.",
        "codeSnippet": "# Stage 1: Build & Publish using heavy .NET SDK image\nFROM mcr.microsoft.com/dotnet/sdk:8.0 AS build\nWORKDIR /src\n\n# Copy csproj and restore layers (optimized for Docker layer caching!)\nCOPY [\"src/EnterpriseApp.Api/EnterpriseApp.Api.csproj\", \"EnterpriseApp.Api/\"]\nRUN dotnet restore \"EnterpriseApp.Api/EnterpriseApp.Api.csproj\"\n\n# Copy source and publish Release binaries\nCOPY src/ .\nWORKDIR \"/src/EnterpriseApp.Api\"\nRUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false\n\n# Stage 2: Final lean runtime image\nFROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final\nWORKDIR /app\nEXPOSE 8080\nENV ASPNETCORE_URLS=http://+:8080\n\n# Copy only compiled output from build stage\nCOPY --from=build /app/publish .\nENTRYPOINT [\"dotnet\", \"EnterpriseApp.Api.dll\"]",
        "language": "dockerfile",
        "output": "Builds production-hardened container image stripped of build tools and source code.",
        "lineExplanation": [
          "Line 2: Uses sdk:8.0 for compilation.",
          "Line 6-7: Restoring dependencies before copying source code leverages Docker caching to speed up subsequent builds.",
          "Line 15: Uses aspnet:8.0 runtime image, keeping the final container lightweight and secure.",
          "Line 21: 'COPY --from=build' extracts only compiled DLLs."
        ]
      }
    ],
    "diagram": "Multi-Stage Dockerfile Pipeline:\n[ SDK Image (900MB) ] ---> Compiles Code ---> Produces /app/publish DLLs (20MB)\n                                                        |\n                                            (Copies compiled binaries only)\n                                                        v\n                                        [ ASP.NET Runtime Image (85MB) ] ---> [ Final Container ]",
    "realWorldApplication": "Ensuring an application runs identically on developer MacBooks, Windows laptops, staging servers, and Kubernetes production pods.",
    "commonErrors": [
      {
        "error": "Copying all source files before calling 'dotnet restore'",
        "cause": "Invalidates Docker's layer cache on every minor code edit, forcing a slow NuGet restore on every build.",
        "fix": "Copy .csproj files and run 'dotnet restore' first, then copy the rest of the source."
      }
    ],
    "bestPractices": [
      "Always use multi-stage builds to keep production images minimal and secure.",
      "Add a .dockerignore file to exclude bin/, obj/, and node_modules/.",
      "Run container processes as non-root users for enterprise security compliance."
    ],
    "practiceQuestions": [
      {
        "question": "Why are Multi-Stage Builds recommended for .NET Dockerfiles?",
        "options": [
          "They allow running Windows containers on Linux.",
          "They use the large .NET SDK for compilation, but package only the small ASP.NET runtime and compiled binaries into the final image, reducing image size and attack surface.",
          "They eliminate the need for a database.",
          "They are required by Docker Compose."
        ],
        "answerIndex": 1,
        "explanation": "Multi-stage builds separate the build environment from the runtime environment, resulting in lean, secure production containers."
      }
    ],
    "revisionSummary": [
      "Containers provide isolated, reproducible execution environments.",
      "Multi-stage builds keep production image footprints minimal.",
      "Docker Compose coordinates local multi-container development."
    ],
    "references": [
      {
        "title": "Containerize a .NET app - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/dotnet/core/docker/build-container",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-18-2": {
    "id": "topic-18-2",
    "title": "CI/CD Concepts & GitHub Actions",
    "category": "18. Docker & CI/CD",
    "description": "Pipeline structure; build → test → scan → deploy; GitHub Actions basics (hands-on pipeline for .NET + Angular)",
    "objectives": [
      "Understand Continuous Integration (CI) and Continuous Deployment (CD)",
      "Structure automated pipelines: Build -> Test -> Security Scan -> Package -> Deploy",
      "Author GitHub Actions workflows using YAML (.github/workflows/ci.yml)",
      "Automate build verification and test reporting on every Pull Request"
    ],
    "prerequisites": "Git (Module 3) and Docker (Topic 18-1).",
    "terminology": [
      {
        "term": "Continuous Integration (CI)",
        "definition": "Automating the building, testing, and static analysis of code changes whenever a developer pushes to a repository branch."
      },
      {
        "term": "Continuous Deployment (CD)",
        "definition": "Automatically deploying tested code changes directly to staging or production environments without manual intervention."
      },
      {
        "term": "GitHub Actions",
        "definition": "A CI/CD and workflow automation platform integrated into GitHub that executes pipelines defined in YAML files."
      }
    ],
    "concepts": [
      {
        "title": "Automated .NET & Angular CI Pipeline with GitHub Actions",
        "explanation": "Automated GitHub Actions workflows run on cloud virtual machines on every pull request, preventing broken code from merging into main.",
        "codeSnippet": "name: Full-Stack CI Pipeline\n\non:\n  push:\n    branches: [ \"main\" ]\n  pull_request:\n    branches: [ \"main\" ]\n\njobs:\n  build-and-test:\n    runs-on: ubuntu-latest\n\n    steps:\n    - name: Checkout code\n      uses: actions/checkout@v4\n\n    # 1. Setup .NET 8 SDK\n    - name: Setup .NET\n      uses: actions/setup-dotnet@v4\n      with:\n        dotnet-version: '8.0.x'\n\n    - name: Restore .NET dependencies\n      run: dotnet restore\n\n    - name: Build .NET Solution\n      run: dotnet build --no-restore --configuration Release\n\n    - name: Run .NET Unit Tests\n      run: dotnet test --no-build --configuration Release --verbosity normal\n\n    # 2. Setup Node.js & Test Angular Frontend\n    - name: Setup Node.js\n      uses: actions/setup-node@v4\n      with:\n        node-version: '20'\n\n    - name: Install Frontend Dependencies\n      run: npm ci\n\n    - name: Build Angular Frontend\n      run: npm run build --if-present",
        "language": "yaml",
        "output": "Automatically executes full-stack build and test suite on Ubuntu runners on every PR.",
        "lineExplanation": [
          "Line 4-7: Triggers pipeline automatically on pushes and PRs to main.",
          "Line 18: 'actions/setup-dotnet@v4' provisions .NET 8 in seconds.",
          "Line 27: Executes all xUnit test suites; fails PR if any test fails."
        ]
      }
    ],
    "diagram": "CI/CD Automation Pipeline:\n[ Git Push PR ] ---> [ 1. Checkout ] ---> [ 2. Build Solution ] ---> [ 3. Run Tests ]\n                                                                             |\n                                                                        (All Green?)\n                                                                             v\n                                                                 [ 4. Deploy to Cloud ]",
    "realWorldApplication": "Protecting production codebases by verifying that all tests pass, security scans succeed, and builds compile before allowing merges.",
    "commonErrors": [
      {
        "error": "Pipeline fails due to 'npm install' changing lockfiles in CI",
        "cause": "Using 'npm install' instead of 'npm ci' on continuous integration runners.",
        "fix": "Always use 'npm ci' in CI/CD pipelines to guarantee deterministic, exact package installations."
      }
    ],
    "bestPractices": [
      "Always use 'npm ci' in automated pipelines rather than 'npm install'.",
      "Treat compiler warnings as errors in CI builds.",
      "Store deployment secrets in GitHub Repository Secrets, never in plain YAML."
    ],
    "practiceQuestions": [
      {
        "question": "Why should 'npm ci' be used instead of 'npm install' in automated CI/CD pipelines?",
        "options": [
          "npm install is deprecated.",
          "npm ci strictly adheres to package-lock.json and never modifies it, guaranteeing consistent, deterministic builds.",
          "npm ci only works on Linux.",
          "There is no difference."
        ],
        "answerIndex": 1,
        "explanation": "'npm ci' does a clean install based strictly on package-lock.json without modifying it, ensuring reproducible builds across CI servers."
      }
    ],
    "revisionSummary": [
      "CI builds and tests on every commit.",
      "CD automates deployments to staging and production.",
      "GitHub Actions workflows are defined in YAML files."
    ],
    "references": [
      {
        "title": "GitHub Actions Documentation",
        "url": "https://docs.github.com/en/actions",
        "source": "GitHub Docs"
      }
    ]
  },
  "topic-18-3": {
    "id": "topic-18-3",
    "title": "Kubernetes Awareness",
    "category": "18. Docker & CI/CD",
    "description": "What it is; pods, services, deployments — concepts only",
    "objectives": [
      "Understand why container orchestration is necessary at enterprise scale",
      "Master core Kubernetes primitives: Pods, Deployments, and Services",
      "Understand automated rolling updates, self-healing, and horizontal auto-scaling",
      "Learn declarative YAML manifests (kind: Deployment, kind: Service)"
    ],
    "prerequisites": "Docker fundamentals (Topic 18-1).",
    "terminology": [
      {
        "term": "Kubernetes (K8s)",
        "definition": "An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications."
      },
      {
        "term": "Pod",
        "definition": "The smallest deployable computing unit in Kubernetes, wrapping one or more tightly coupled containers sharing network and storage."
      },
      {
        "term": "Deployment",
        "definition": "A controller that declaratively manages the desired number of Pod replicas, self-healing, and rolling update strategies."
      },
      {
        "term": "Service",
        "definition": "An abstraction that defines a logical set of Pods and a persistent network IP policy to access them (ClusterIP, NodePort, LoadBalancer)."
      }
    ],
    "concepts": [
      {
        "title": "Kubernetes Primitives: Deployment and Service",
        "explanation": "Instead of running single Docker containers manually, Kubernetes maintains a desired state declared in YAML files.",
        "codeSnippet": "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api-deployment\nspec:\n  replicas: 3 # Self-healing: Kubernetes ensures 3 pods are ALWAYS running!\n  selector:\n    matchLabels:\n      app: web-api\n  template:\n    metadata:\n      labels:\n        app: web-api\n    spec:\n      containers:\n      - name: enterprise-api\n        image: myregistry.azurecr.io/enterprise-api:v1.2.0\n        ports:\n        - containerPort: 8080\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: api-service\nspec:\n  type: LoadBalancer # Balances incoming traffic across the 3 pods!\n  selector:\n    app: web-api\n  ports:\n  - port: 80\n    targetPort: 8080",
        "language": "yaml",
        "output": "Provisions 3 self-healing pods balanced behind a single stable IP service.",
        "lineExplanation": [
          "Line 5: 'replicas: 3' instructs Kubernetes to run 3 redundant instances.",
          "Line 17: In case of server hardware failure, Kubernetes restarts pods on healthy nodes automatically.",
          "Line 24: 'kind: Service' balances traffic evenly across the 3 pods."
        ]
      }
    ],
    "diagram": "Kubernetes Cluster Architecture:\n[ Incoming Traffic ] ---> [ K8s Service: api-service ]\n                                    |\n                    (Load balances across replicas)\n                                    |\n           +------------------------+------------------------+\n           |                        |                        |\n           v                        v                        v\n    [ Pod 1 (Replica) ]      [ Pod 2 (Replica) ]      [ Pod 3 (Replica) ]",
    "realWorldApplication": "Running resilient cloud-native applications on Azure Kubernetes Service (AKS), AWS EKS, or Google GKE.",
    "commonErrors": [
      {
        "error": "Hardcoding Pod IP addresses in frontend configurations",
        "cause": "Pods are ephemeral; their IP addresses change every time they restart or update.",
        "fix": "Always communicate with Pods through a stable Kubernetes Service name."
      }
    ],
    "bestPractices": [
      "Always define resource requests and limits (CPU and Memory) for every container in a pod.",
      "Configure liveness and readiness probes so Kubernetes knows when to restart unhealthy containers.",
      "Use ConfigMaps and Secrets to inject configuration into pods."
    ],
    "practiceQuestions": [
      {
        "question": "What is the smallest deployable execution unit in a Kubernetes cluster?",
        "options": [
          "A Virtual Machine",
          "A Pod",
          "A Service",
          "A Node"
        ],
        "answerIndex": 1,
        "explanation": "A Pod is the smallest deployable unit in Kubernetes, encapsulating one or more containers."
      }
    ],
    "revisionSummary": [
      "Kubernetes orchestrates containers at scale.",
      "Pods are the smallest execution units; Deployments manage replicas.",
      "Services provide persistent network addresses and load balancing."
    ],
    "references": [
      {
        "title": "Kubernetes Basics - Official Documentation",
        "url": "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
        "source": "Kubernetes.io"
      }
    ]
  }
};
