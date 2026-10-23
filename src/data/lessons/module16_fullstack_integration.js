/**
 * Pre-generated comprehensive lessons for MODULE_16_LESSONS
 * Sources: Angular.io Official Documentation, ASP.NET Core Integration Guides.
 */

export const MODULE_16_LESSONS = {
  "topic-16-1": {
    "id": "topic-16-1",
    "title": "Connecting Angular to ASP.NET Core",
    "category": "16. Full-Stack Integration",
    "description": "CORS configuration; proxy setup (proxy.conf.json); environment-based API URLs; environment.ts management",
    "objectives": [
      "Eliminate Cross-Origin Resource Sharing (CORS) development friction using proxy.conf.json",
      "Configure production CORS policies on the ASP.NET Core backend",
      "Manage environment-based API URLs in Angular (environment.ts vs environment.prod.ts)",
      "Resolve localhost SSL and self-signed certificate challenges during development"
    ],
    "prerequisites": "ASP.NET Core Web APIs (Module 6) and Angular HttpClient (Topic 14-7).",
    "terminology": [
      {
        "term": "Development Proxy",
        "definition": "A configuration in Angular CLI that routes API calls (e.g. /api/*) through the local development server to avoid CORS during development."
      },
      {
        "term": "Environment Files",
        "definition": "Angular configuration files (environment.development.ts and environment.ts) that swap API base URLs during builds."
      }
    ],
    "concepts": [
      {
        "title": "Development Proxy and Environment Management",
        "explanation": "Using an Angular development proxy eliminates CORS issues in development by making API calls appear as same-origin requests.",
        "codeSnippet": "// 1. proxy.conf.json (in Angular root directory):\n{\n  \"/api\": {\n    \"target\": \"https://localhost:7142\", // ASP.NET Core backend port\n    \"secure\": false, // Accepts self-signed dev certificates\n    \"changeOrigin\": true,\n    \"logLevel\": \"debug\"\n  }\n}\n\n// 2. Add to angular.json under serve options:\n// \"options\": { \"proxyConfig\": \"proxy.conf.json\" }\n\n// 3. Angular environment.development.ts:\nexport const environment = {\n  production: false,\n  apiUrl: '/api' // Uses relative URL thanks to proxy!\n};\n\n// 4. Angular environment.ts (Production):\nexport const environment = {\n  production: true,\n  apiUrl: 'https://api.myproductiondomain.com/api' // Direct cloud endpoint\n};",
        "language": "typescript",
        "output": "Transparently routes /api requests from localhost:4200 to backend on localhost:7142.",
        "lineExplanation": [
          "Line 3: Any call to /api/* is proxied to the backend port.",
          "Line 5: 'secure: false' bypasses local ASP.NET Core development SSL certificate warnings.",
          "Line 17: In development, services call relative '/api' endpoints, eliminating CORS entirely."
        ]
      }
    ],
    "diagram": "Development Proxy Routing:\n[ Browser on http://localhost:4200 ]\n               |\n        (Calls: /api/orders)\n               v\n[ Angular Dev Server (Port 4200) ] --- Proxies to ---> [ ASP.NET Core Backend (Port 7142) ]\n(Zero CORS errors because browser sees same-origin localhost:4200!)",
    "realWorldApplication": "The standard cross-stack setup used by commercial engineering teams to develop frontend and backend services in tandem.",
    "commonErrors": [
      {
        "error": "CORS error in development: 'No Access-Control-Allow-Origin header is present on the requested resource'",
        "cause": "Calling http://localhost:7142 directly from localhost:4200 without backend CORS or Angular proxy.",
        "fix": "Configure proxy.conf.json in Angular or enable app.UseCors() on the ASP.NET Core backend."
      }
    ],
    "bestPractices": [
      "Use proxy.conf.json during local development to avoid browser CORS friction.",
      "Never hardcode 'https://localhost:7000' inside Angular services; always inject environment.apiUrl.",
      "Ensure production CORS headers explicitly list allowed domains."
    ],
    "practiceQuestions": [
      {
        "question": "Why is an Angular development proxy (proxy.conf.json) beneficial during local development?",
        "options": [
          "It compiles C# code.",
          "It routes API requests through the Angular dev server to the backend, bypassing browser cross-origin restrictions (CORS) completely.",
          "It encrypts the database.",
          "It replaces npm."
        ],
        "answerIndex": 1,
        "explanation": "The development proxy forwards requests from the frontend port to the backend, appearing as a same-origin request to the browser."
      }
    ],
    "revisionSummary": [
      "Use proxy.conf.json to bypass CORS locally.",
      "Store API endpoints in environment files.",
      "Enforce explicit CORS whitelists in production."
    ],
    "references": [
      {
        "title": "Proxying to a backend server - Angular Official Docs",
        "url": "https://angular.dev/tools/cli/proxy",
        "source": "Angular.dev"
      }
    ]
  },
  "topic-16-2": {
    "id": "topic-16-2",
    "title": "End-to-End Data Flow",
    "category": "16. Full-Stack Integration",
    "description": "End-to-End Data Flow : Form → HTTP service → Controller → Service → EF Core → DB → Response → Observable → UI update",
    "objectives": [
      "Trace the entire life cycle of a data packet across the full-stack architecture",
      "Follow data from Angular Reactive Form through HTTP transmission, Model Binding, and Domain Validation",
      "Trace Entity Framework persistence to SQL Server and back",
      "Observe reactive UI reconciliation upon receiving the HTTP response payload"
    ],
    "prerequisites": "Modules 5, 6, 14, and Topic 16-1.",
    "terminology": [
      {
        "term": "End-to-End (E2E) Flow",
        "definition": "The complete journey of user data from browser DOM interaction, through frontend and backend layers, into physical database disk storage and back."
      }
    ],
    "concepts": [
      {
        "title": "Full-Stack Data Lifecycle Walkthrough",
        "explanation": "Understanding every layer of the full-stack pipeline ensures rapid debugging and architectural clarity.",
        "codeSnippet": "// 1. FRONTEND: User submits Reactive Form in Angular\n// Form -> OrderService -> http.post('/api/orders', payload)\n\n// 2. NETWORK: HTTP POST with JSON body transmitted over HTTPS\n\n// 3. BACKEND CONTROLLER: ASP.NET Core Model Binding & Validation\n[HttpPost]\npublic async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderDto dto)\n{\n    // 4. BACKEND DOMAIN SERVICE: Business rules applied\n    var order = await _orderDomainService.ProcessOrderAsync(dto);\n\n    // 5. EF CORE PERSISTENCE: Translated to SQL INSERT\n    // _db.Orders.Add(order);\n    // await _db.SaveChangesAsync();\n\n    // 6. HTTP 201 RESPONSE: Serialized to JSON\n    return CreatedAtAction(nameof(GetById), new { id = order.Id }, new OrderDto(order));\n}\n\n// 7. FRONTEND RECEPTION: Observable emits -> Signal updates -> DOM updates in 12ms!",
        "language": "csharp",
        "output": "Full lifecycle execution: Browser Form -> C# Web API -> SQL Server -> Reactive UI update.",
        "lineExplanation": [
          "Demonstrates the complete 8-stage data pipeline linking frontend Angular to backend .NET and SQL."
        ]
      }
    ],
    "diagram": "The Full-Stack 8-Stage Pipeline:\n[ 1. Angular Form ] ---> [ 2. HttpClient ] ---> [ 3. ASP.NET Controller ] ---> [ 4. Domain Service ]\n                                                                                           |\n[ 8. UI Re-renders ] <--- [ 7. Observable ] <--- [ 6. JSON 201 Response ] <--- [ 5. EF Core -> SQL DB ]",
    "realWorldApplication": "The universal architecture linking modern web single-page apps to cloud enterprise databases.",
    "commonErrors": [
      {
        "error": "Property name mismatch (e.g. backend expects CustomerName, frontend sends customer_name)",
        "cause": "Inconsistent casing conventions between JavaScript camelCase and C# PascalCase.",
        "fix": "Rely on ASP.NET Core's default camelCase System.Text.Json serialization, and use TypeScript DTO interfaces."
      }
    ],
    "bestPractices": [
      "Share data models by generating TypeScript interfaces from C# DTOs automatically.",
      "Keep transformations pure: DTO -> Domain Entity -> Database Model.",
      "Log correlation IDs at both frontend and backend boundaries."
    ],
    "practiceQuestions": [
      {
        "question": "In modern full-stack development, what casing convention is standard for JSON properties sent over the wire?",
        "options": [
          "PASCAL_CASE",
          "camelCase",
          "snake_case",
          "kebab-case"
        ],
        "answerIndex": 1,
        "explanation": "camelCase (e.g. customerName) is the universal industry standard for JSON payloads between Angular/React and ASP.NET Core."
      }
    ],
    "revisionSummary": [
      "Data flows through 8 predictable stages from UI form to database.",
      "DTOs decouple frontend requirements from database schemas.",
      "camelCase is standard across JSON payloads."
    ],
    "references": [
      {
        "title": "ASP.NET Core and Angular Architecture - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/angular",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-16-3": {
    "id": "topic-16-3",
    "title": "Error Handling Across the Stack",
    "category": "16. Full-Stack Integration",
    "description": "Backend validation errors → Angular error interceptor → component display; global error handling patterns",
    "objectives": [
      "Bridge backend RFC 7807 ProblemDetails with Angular UI notifications",
      "Intercept HTTP 400 validation error responses in an Angular HttpInterceptor",
      "Map field-specific validation errors directly onto Angular Reactive Form controls",
      "Display toast notifications for 500 server errors and redirect on 401/403"
    ],
    "prerequisites": "ProblemDetails (Topic 6-10) and Angular Interceptors (Topic 14-7).",
    "terminology": [
      {
        "term": "ValidationProblemDetails",
        "definition": "A standardized RFC 7807 error format returned by ASP.NET Core that groups validation errors by field name (e.g. errors.email: ['Invalid email'])."
      }
    ],
    "concepts": [
      {
        "title": "Translating Backend Validation to Frontend Form Errors",
        "explanation": "When an ASP.NET Core API returns a 400 ValidationProblemDetails, an Angular error interceptor or service maps the errors directly to input fields.",
        "codeSnippet": "// 1. Angular Centralized Error Interceptor\nexport const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {\n  const toastService = inject(ToastService);\n  const router = inject(Router);\n\n  return next(req).pipe(\n    catchError((error: HttpErrorResponse) => {\n      if (error.status === 400 && error.error?.errors) {\n        // Backend Validation Problem Details: Pass dictionary to form\n        console.warn(\"Backend validation failed:\", error.error.errors);\n      } else if (error.status === 401) {\n        router.navigate(['/login']);\n      } else if (error.status >= 500) {\n        toastService.showError(\"A temporary server error occurred. Please try again later.\");\n      }\n      return throwError(() => error);\n    })\n  );\n};",
        "language": "typescript",
        "output": "Catches HTTP errors globally and surfaces actionable feedback without page crashes.",
        "lineExplanation": [
          "Line 8: Catches structured field validation errors emitted by ASP.NET Core FluentValidation.",
          "Line 12: Centralized toast notification informs user of 500 internal server failures."
        ]
      }
    ],
    "diagram": "Cross-Stack Error Handling:\n[ FluentValidation in C# fails ] ---> [ Returns 400 ValidationProblemDetails ]\n                                                       |\n                                        [ Angular HttpInterceptor intercepts ]\n                                                       |\n                                        [ Maps error to formControl.setErrors() ]\n                                                       |\n                                        [ Form highlights input in red with message! ]",
    "realWorldApplication": "Providing instantaneous, field-specific feedback on complex enterprise registration, tax, and loan application forms.",
    "commonErrors": [
      {
        "error": "Showing generic 'An error occurred' alert when backend provided specific field errors",
        "cause": "Failing to inspect error.error.errors dictionary in the HTTP response.",
        "fix": "Inspect the errors map in ProblemDetails and attach messages to corresponding form controls."
      }
    ],
    "bestPractices": [
      "Use RFC 7807 ProblemDetails consistently across all backend API endpoints.",
      "Map field errors directly to Angular form controls with control.setErrors({ serverError: msg }).",
      "Never show raw technical database error messages to end users."
    ],
    "practiceQuestions": [
      {
        "question": "When ASP.NET Core returns a 400 Bad Request with ValidationProblemDetails, how are field errors structured?",
        "options": [
          "As an XML string.",
          "As a dictionary/map where each key is a property name and the value is an array of error messages.",
          "As a binary stream.",
          "In plain HTML."
        ],
        "answerIndex": 1,
        "explanation": "ValidationProblemDetails provides an 'errors' object containing property names mapped to arrays of error strings."
      }
    ],
    "revisionSummary": [
      "Backend emits RFC 7807 ProblemDetails.",
      "Angular interceptors catch and classify errors globally.",
      "Map server errors onto matching client form controls."
    ],
    "references": [
      {
        "title": "Problem Details for HTTP APIs - IETF RFC 7807",
        "url": "https://datatracker.ietf.org/doc/html/rfc7807",
        "source": "IETF Standards"
      }
    ]
  },
  "topic-16-4": {
    "id": "topic-16-4",
    "title": "End-to-End Authentication Flow",
    "category": "16. Full-Stack Integration",
    "description": "JWT login → token storage → HTTP interceptor for auth headers → route guards (frontend) → secured endpoints (backend)",
    "objectives": [
      "Implement the complete full-stack JWT authentication cycle",
      "Authenticate credentials on ASP.NET Core and return signed JWT + Refresh Token",
      "Store tokens securely on the client and attach them to requests via HttpInterceptor",
      "Protect Angular routes using canActivate and backend controllers with [Authorize]"
    ],
    "prerequisites": "JWT (Topic 7-2) and Angular Auth Interceptors (Topic 14-7).",
    "terminology": [
      {
        "term": "Auth Cycle",
        "definition": "Login -> Token Generated -> Token Stored -> Interceptor Attaches Token -> Server Validates -> Route Guard Protects."
      }
    ],
    "concepts": [
      {
        "title": "The Complete Full-Stack Authentication Lifecycle",
        "explanation": "A seamless authentication system coordinates frontend storage, interceptor header injection, and backend token signature verification.",
        "codeSnippet": "// 1. Angular Login Service\nlogin(credentials: LoginDto): Observable<AuthResponse> {\n  return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(\n    tap(response => {\n      // Store token securely\n      localStorage.setItem('auth_token', response.token);\n      this.currentUserSubject.next(response.user);\n    })\n  );\n}\n\n// 2. Angular HttpInterceptor attaches token to every outgoing request\n// req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })\n\n// 3. ASP.NET Core Backend Controller verifies signature and claims\n[Authorize(Roles = \"Admin\")]\n[HttpGet(\"secure-data\")]\npublic IActionResult GetAdminData()\n{\n    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);\n    return Ok(new { Secret = \"42\", AccessedBy = userId });\n}",
        "language": "csharp",
        "output": "End-to-end authenticated session established and verified across both stacks.",
        "lineExplanation": [
          "Frontend stores token and notifies subscribers.",
          "Interceptor decorates all API calls with the Bearer token.",
          "Backend validates signature cryptographically and populates HttpContext.User."
        ]
      }
    ],
    "diagram": "Full-Stack Authentication Flow:\n1. User enters email/password in Angular Form\n2. POST /api/auth/login ---> Validated by ASP.NET Core Identity\n3. Server returns { token: \"eyJ...\" }\n4. Angular saves token in localStorage/memory\n5. Outgoing API calls automatically get: Authorization: Bearer eyJ...\n6. Backend [Authorize] grants access based on validated claims!",
    "realWorldApplication": "Securing commercial enterprise portals, SaaS backends, and multi-tenant applications.",
    "commonErrors": [
      {
        "error": "Infinite redirect loop on 401 errors",
        "cause": "The login request itself returns 401, causing the interceptor to redirect to /login again repeatedly.",
        "fix": "Do not redirect on 401 if the request URL is already '/api/auth/login'."
      }
    ],
    "bestPractices": [
      "Keep access token lifespans short (10-15 minutes).",
      "Implement silent token refresh via refresh tokens.",
      "Clear stored tokens on user logout or upon receiving a 401."
    ],
    "practiceQuestions": [
      {
        "question": "Where should the JWT token be attached in HTTP requests sent from Angular to ASP.NET Core?",
        "options": [
          "In the URL query string.",
          "In the Authorization header formatted as 'Bearer <token>'.",
          "In the HTML title tag.",
          "Inside a cookie named 'password'."
        ],
        "answerIndex": 1,
        "explanation": "Standard REST authentication passes JWT tokens in the Authorization header using the 'Bearer ' scheme."
      }
    ],
    "revisionSummary": [
      "Frontend logs in and stores JWT.",
      "HTTP interceptor injects Bearer token header.",
      "Backend [Authorize] validates signature and enforces claims."
    ],
    "references": [
      {
        "title": "Authenticate a Single Page Application - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-16-5": {
    "id": "topic-16-5",
    "title": "Environment Management Across the Stack",
    "category": "16. Full-Stack Integration",
    "description": "ASP.NET Core environments (Development/Staging/Production); Angular environment.ts files; config across environments",
    "objectives": [
      "Coordinate environment configurations between ASP.NET Core and Angular",
      "Manage ASP.NET Core environments using ASPNETCORE_ENVIRONMENT variable",
      "Configure Angular file replacements in angular.json for production builds",
      "Protect production databases from accidental local developer migrations"
    ],
    "prerequisites": "Configuration (Topic 2-7) and Angular CLI.",
    "terminology": [
      {
        "term": "ASPNETCORE_ENVIRONMENT",
        "definition": "The environment variable that dictates which appsettings file (e.g. appsettings.Production.json) is loaded."
      },
      {
        "term": "File Replacement",
        "definition": "An Angular build mechanism that replaces environment.ts with environment.prod.ts during 'ng build --configuration production'."
      }
    ],
    "concepts": [
      {
        "title": "Cross-Stack Environment Alignment",
        "explanation": "Synchronizing environment configuration ensures that local dev points to local SQLite/mock services, while production builds target cloud databases and CDN assets.",
        "codeSnippet": "// 1. Angular angular.json fileReplacements configuration:\n// \"configurations\": {\n//   \"production\": {\n//     \"fileReplacements\": [\n//       { \"replace\": \"src/environments/environment.ts\", \"with\": \"src/environments/environment.prod.ts\" }\n//     ]\n//   }\n// }\n\n// 2. ASP.NET Core Program.cs environment branching:\nif (app.Environment.IsDevelopment())\n{\n    // Enable Swagger and detailed developer diagnostics\n    app.UseSwagger();\n    app.UseSwaggerUI();\n}\nelse\n{\n    // Production: Enforce HSTS and secure error handling\n    app.UseHsts();\n    app.UseExceptionHandler();\n}",
        "language": "csharp",
        "output": "Ensures debug tools and verbose errors are isolated strictly to development environments.",
        "lineExplanation": [
          "Angular swaps environment.ts for environment.prod.ts during production builds.",
          "ASP.NET Core switches off Swagger in production and enforces strict security headers."
        ]
      }
    ],
    "diagram": "Cross-Stack Environment Parity:\nEnvironment     ASP.NET Core Config                 Angular Config\nDevelopment     appsettings.Development.json        environment.development.ts (proxy)\nStaging         appsettings.Staging.json            environment.staging.ts\nProduction      appsettings.Production.json (EnvVar) environment.prod.ts (CDN API URL)",
    "realWorldApplication": "Deploying multi-stage cloud infrastructure (Dev, QA, UAT, Production) without manual code edits.",
    "commonErrors": [
      {
        "error": "Exposing Swagger UI in production environments",
        "cause": "Removing 'if (app.Environment.IsDevelopment())' around app.UseSwagger().",
        "fix": "Only enable Swagger in Development or behind strict administrative authorization."
      }
    ],
    "bestPractices": [
      "Never check production passwords into environment files.",
      "Use environment variables in Docker containers and cloud app services.",
      "Automate build configurations using CI/CD pipelines."
    ],
    "practiceQuestions": [
      {
        "question": "How does Angular swap development API URLs for production endpoints during a production build?",
        "options": [
          "It prompts the user.",
          "Using 'fileReplacements' configured in angular.json, which replaces environment.ts with environment.prod.ts during compilation.",
          "It searches Google.",
          "It queries the browser."
        ],
        "answerIndex": 1,
        "explanation": "Angular CLI uses the fileReplacements configuration in angular.json to swap environment files at build time."
      }
    ],
    "revisionSummary": [
      "ASPNETCORE_ENVIRONMENT controls backend settings.",
      "Angular uses fileReplacements for environment switching.",
      "Never expose developer tools like Swagger in production."
    ],
    "references": [
      {
        "title": "Use multiple environments in ASP.NET Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/environments",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-16-6": {
    "id": "topic-16-6",
    "title": "AI Integration in Full-Stack Integration",
    "category": "16. Full-Stack Integration",
    "description": "Using Copilot to wire full-stack features end-to-end; debugging integration issues with AI",
    "objectives": [
      "Use AI to generate synchronized C# DTOs and TypeScript interfaces",
      "Diagnose complex cross-stack bugs (CORS errors, serialization casing mismatches) with AI assistance",
      "Prompt AI to generate end-to-end integration test scenarios",
      "Audit generated integration glue code for error handling and memory leaks"
    ],
    "prerequisites": "Modules 14, 15, and 16.",
    "terminology": [
      {
        "term": "Contract Synchronization",
        "definition": "Ensuring that frontend TypeScript types exactly match backend C# DTO properties and types."
      }
    ],
    "concepts": [
      {
        "title": "Prompting AI for Full-Stack Feature Wiring",
        "explanation": "Supplying both the C# backend model and Angular frontend component in the AI prompt ensures synchronized contracts and error handling.",
        "codeSnippet": "// PROMPT PATTERN FOR FULL-STACK INTEGRATION:\n// \"Given this C# DTO:\n// public record CreateProductDto(string Name, decimal Price, int CategoryId);\n//\n// 1. Generate the matching TypeScript interface.\n// 2. Generate the Angular ProductService method using HttpClient.\n// 3. Generate the Angular Reactive Form with validation.\"\n\n// RESULTING TYPESCRIPT INTERFACE:\nexport interface CreateProductDto {\n  name: string;\n  price: number;\n  categoryId: number;\n}",
        "language": "typescript",
        "output": "Generates synchronized frontend contracts directly from backend C# records.",
        "lineExplanation": [
          "Ensures property names and types match between C# (decimal -> number) and TypeScript."
        ]
      }
    ],
    "diagram": "Cross-Stack AI Sync:\n[ C# DTO Record ] ---> Prompt Copilot ---> [ TypeScript Interface + Angular Service ]\n                                                   |\n                                     (Guarantees zero field mismatches!)",
    "realWorldApplication": "Eliminating tedious manual contract synchronization when developing full-stack features.",
    "commonErrors": [
      {
        "error": "Type mismatch between C# decimal/long and TypeScript number",
        "cause": "JavaScript numbers are 64-bit floating point; very large 64-bit integers (Int64) can lose precision.",
        "fix": "Serialize large 64-bit IDs as strings in C# when transferring to JavaScript."
      }
    ],
    "bestPractices": [
      "Feed the C# DTO definition directly into the AI prompt when requesting frontend components.",
      "Ask AI to generate both the frontend error handler and backend ProblemDetails mapping.",
      "Verify that decimal and date formats match between the two stacks."
    ],
    "practiceQuestions": [
      {
        "question": "When mapping a C# 'decimal' property to TypeScript with AI assistance, what is the corresponding TypeScript type?",
        "options": [
          "decimal",
          "number",
          "float",
          "BigDecimal"
        ],
        "answerIndex": 1,
        "explanation": "TypeScript does not have a native decimal type; numbers with decimals are represented using the primitive 'number' type."
      }
    ],
    "revisionSummary": [
      "AI synchronizes C# DTOs with TypeScript interfaces.",
      "Prompts should provide both backend and frontend context.",
      "Verify casing and precision between C# and JavaScript."
    ],
    "references": [
      {
        "title": "Building full-stack apps with .NET and Angular - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/angular",
        "source": "Microsoft Learn"
      }
    ]
  }
};
