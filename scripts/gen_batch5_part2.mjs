import fs from 'fs';

function writeModule(filename, varName, lessons) {
  const content = `/**
 * Pre-generated comprehensive lessons for ${varName}
 * Sources: Angular.io Official Documentation, ASP.NET Core Integration Guides.
 */

export const ${varName} = ${JSON.stringify(lessons, null, 2)};
`;
  fs.writeFileSync(`src/data/lessons/${filename}`, content);
  console.log(`Generated src/data/lessons/${filename} (${Object.keys(lessons).length} topics)`);
}

// -------------------------------------------------------------
// MODULE 15: Angular Testing (3 topics)
// -------------------------------------------------------------
const m15 = {
  "topic-15-1": {
    id: "topic-15-1",
    title: "Jasmine & Karma Testing",
    category: "15. Angular Testing",
    description: "Test structure; matchers; spies; TestBed setup; component testing",
    objectives: [
      "Structure test suites using Jasmine (describe, beforeEach, it, expect)",
      "Configure the Angular testing environment using TestBed.configureTestingModule",
      "Trigger change detection and inspect DOM elements using ComponentFixture",
      "Spy on methods and mock returns using Jasmine spies (spyOn, jasmine.createSpyObj)"
    ],
    prerequisites: "Angular components and testing fundamentals.",
    terminology: [
      { term: "TestBed", definition: "Angular's primary testing utility that configures and initializes an in-memory environment for unit testing components and services." },
      { term: "ComponentFixture", definition: "A test harness for interacting with the created component instance and its rendered DOM elements." },
      { term: "Jasmine Spy", definition: "A test double feature in Jasmine that tracks method invocations and arguments and allows simulating return values." }
    ],
    concepts: [
      {
        title: "Component Unit Testing with TestBed",
        explanation: "TestBed compiles the component's template and TypeScript class, allowing simulated clicks and DOM verification.",
        codeSnippet: `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';

describe('CounterComponent Unit Tests', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent] // Import standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial change detection
  });

  it('should increment count when increment button is clicked', () => {
    // 1. Arrange: Find button element in DOM
    const button = fixture.debugElement.query(By.css('button'));

    // 2. Act: Trigger click event
    button.triggerEventHandler('click', null);
    fixture.detectChanges(); // Re-render DOM!

    // 3. Assert: Check component property and rendered HTML text
    expect(component.count).toBe(1);
    const countDisplay = fixture.debugElement.query(By.css('strong')).nativeElement;
    expect(countDisplay.textContent).toContain('1');
  });
});`,
        language: "typescript",
        output: "Passed 1 of 1 spec in 0.045s. Verified component click and DOM update.",
        lineExplanation: [
          "Line 10: TestBed.configureTestingModule boots an in-memory Angular module context.",
          "Line 17: fixture.detectChanges() triggers Angular change detection to update the HTML.",
          "Line 24: button.triggerEventHandler simulates user interaction in the test harness.",
          "Line 28: expect(...).toBe(1) verifies the model state."
        ]
      }
    ],
    diagram: `TestBed Testing Architecture:
[ Test Method ] ---> triggers button click on ---> [ ComponentFixture DOM ]
                                                             |
                                                 [ Component TS Instance ]
                                                             |
                                                 [ fixture.detectChanges() ]
                                                             v
                                                 [ Verifies DOM matches State ]`,
    realWorldApplication: "Validating button click handlers, form validation displays, and component lifecycle behavior in CI pipelines.",
    commonErrors: [
      {
        error: "DOM text not updating in test assertions after mutating component properties",
        cause: "Forgetting to call 'fixture.detectChanges()' after triggering events.",
        fix: "Always call 'fixture.detectChanges()' whenever component state changes in tests."
      }
    ],
    bestPractices: [
      "Always call fixture.detectChanges() after changing inputs or triggering events.",
      "Use By.css(...) to query rendered DOM elements in component fixtures.",
      "Isolate components by mocking external service dependencies using jasmine.createSpyObj."
    ],
    practiceQuestions: [
      {
        question: "Why must you call 'fixture.detectChanges()' in an Angular component unit test?",
        options: [
          "To compile TypeScript to JavaScript.",
          "To instruct Angular's change detection engine to update the component's rendered HTML template with the latest model changes.",
          "To connect to the database.",
          "It is required by Jasmine."
        ],
        answerIndex: 1,
        explanation: "In unit tests, change detection does not run automatically on microtasks. You must call fixture.detectChanges() to update the DOM."
      }
    ],
    revisionSummary: [
      "TestBed sets up in-memory component testing.",
      "fixture.detectChanges() updates rendered HTML.",
      "Use Jasmine spies to verify interactions."
    ],
    references: [
      { title: "Testing Components - Angular Official Docs", url: "https://angular.dev/guide/testing/components-basics", source: "Angular.dev" }
    ]
  },

  "topic-15-2": {
    id: "topic-15-2",
    title: "Component & Service Testing with Mocking",
    category: "15. Angular Testing",
    description: "Shallow vs deep testing; mocking services; testing async operations; testing HTTP calls with HttpClientTestingModule",
    objectives: [
      "Test Angular HTTP services using HttpTestingController",
      "Verify HTTP request verbs, headers, and simulated mock payloads",
      "Distinguish between shallow testing (mocking child components) and deep integration testing",
      "Test asynchronous observables using fakeAsync, tick(), and waitForAsync"
    ],
    prerequisites: "Jasmine basics and HttpClient (Topics 14-7 and 15-1).",
    terminology: [
      { term: "HttpTestingController", definition: "A controller from @angular/common/http/testing that intercepts HTTP requests in tests and allows asserting URLs and flushing mock responses." },
      { term: "Shallow Component Testing", definition: "Testing a parent component while replacing all its child components with dummy stubs, isolating the test to the parent only." }
    ],
    concepts: [
      {
        title: "Testing API Services with HttpTestingController",
        explanation: "HttpTestingController captures outgoing requests from HttpClient, allowing tests to verify endpoints and inject mock JSON responses.",
        codeSnippet: `import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService, Product } from './product.service';

describe('ProductService HTTP Tests', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Mocks underlying browser HTTP engine
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies no unexpected extra HTTP requests were fired!
  });

  it('should fetch product list from backend API via GET', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Laptop', price: 999 }
    ];

    // 1. Subscribe to service method
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].name).toBe('Laptop');
    });

    // 2. Expect an outgoing HTTP call to the specific URL
    const req = httpMock.expectOne('https://api.store.com/api/products');
    expect(req.request.method).toBe('GET');

    // 3. Flush the simulated mock response data
    req.flush(mockProducts);
  });
});`,
        language: "typescript",
        output: "Passed 1 spec. Verified HTTP GET URL and payload mapping with zero network calls.",
        lineExplanation: [
          "Line 10: HttpClientTestingModule replaces real network sockets with in-memory mocks.",
          "Line 34: 'httpMock.expectOne(...)' asserts that the exact target endpoint was requested.",
          "Line 38: 'req.flush(mockProducts)' resolves the HTTP Observable with test data."
        ]
      }
    ],
    diagram: `HTTP Testing Flow:
[ Service executes this.http.get() ] ---> Captured by [ HttpTestingController ]
                                                                 |
                                              [ Assert URL & Verb: GET ]
                                                                 |
                                              [ req.flush(mockData) ]
                                                                 v
                                         [ Service Observable emits data to test ]`,
    realWorldApplication: "Validating API services, error handling interceptors, and data mapping logic without maintaining a live test database.",
    commonErrors: [
      {
        error: "Error: Expected one matching request, found none",
        cause: "The service method was not called, or called with a different URL query parameter.",
        fix: "Check the exact URL string expected in httpMock.expectOne()."
      }
    ],
    bestPractices: [
      "Always include 'httpMock.verify()' in afterEach to catch stray or duplicate HTTP calls.",
      "Test both success (req.flush(data)) and error (req.flush('Error', { status: 500, statusText: 'Server Error' })) scenarios.",
      "Use shallow component testing to prevent tests from failing due to unrelated bugs in child components."
    ],
    practiceQuestions: [
      {
        question: "What is the purpose of 'httpMock.verify()' in Angular HTTP service tests?",
        options: [
          "To test internet connection speed.",
          "To assert that no unexpected, unhandled HTTP requests were made during the test execution.",
          "To compile the backend API.",
          "It flushes all caches."
        ],
        answerIndex: 1,
        explanation: "httpMock.verify() ensures that every HTTP request triggered during the test was explicitly handled by expectOne(), catching rogue calls."
      }
    ],
    revisionSummary: [
      "HttpClientTestingModule intercepts HTTP calls in tests.",
      "expectOne() verifies URL and HTTP verb.",
      "req.flush() emits mock responses synchronously."
    ],
    references: [
      { title: "Testing HTTP Requests - Angular Official Docs", url: "https://angular.dev/guide/http/testing", source: "Angular.dev" }
    ]
  },

  "topic-15-3": {
    id: "topic-15-3",
    title: "Assessment 4: Frontend Checkpoint",
    category: "15. Angular Testing",
    description: "Build an Angular + TypeScript app consuming a provided REST API with routing, state management (service-based), form handling, and component tests",
    objectives: [
      "Synthesize all Module 14 and 15 topics into a functional standalone Angular application",
      "Implement routing with lazy loading and protected auth route guards",
      "Build reactive forms with validation and consume backend REST APIs via HttpClient",
      "Write unit tests with TestBed and HttpTestingController verifying components and services"
    ],
    prerequisites: "Modules 14 and 15.",
    terminology: [
      { term: "Frontend Checkpoint", definition: "A comprehensive project demonstrating mastery of all core Angular architecture layers (components, routing, services, forms, testing)." }
    ],
    concepts: [
      {
        title: "Frontend Architecture Synthesis",
        explanation: "This complete application structure demonstrates routing, service-based state, reactive forms, and testing working in harmony.",
        codeSnippet: `// 1. Core Feature Service
@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private ordersState = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersState.asObservable();

  loadOrders(): void {
    this.http.get<Order[]>('/api/orders')
      .subscribe(orders => this.ordersState.next(orders));
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>('/api/orders', order).pipe(
      tap(newOrder => {
        this.ordersState.next([...this.ordersState.getValue(), newOrder]);
      })
    );
  }
}

// 2. Verified via xUnit / Jasmine test specs with 100% passing results!`,
        language: "typescript",
        output: "Produces robust enterprise frontend architecture ready to connect to ASP.NET Core.",
        lineExplanation: [
          "Demonstrates reactive state synchronization upon successful HTTP mutation."
        ]
      }
    ],
    diagram: `Frontend Architecture:
[ UI Components (Standalone) ] <---> [ Reactive Forms + Signals ]
               ^                                   |
               |                                   v
[ Service-Based State (BehaviorSubject) ] <---> [ HttpClient + Auth Interceptor ]`,
    realWorldApplication: "The complete commercial frontend template for full-stack .NET and Angular developers.",
    commonErrors: [
      {
        error: "Directly mutating arrays inside BehaviorSubject without emitting via .next()",
        cause: "Subscribers will not be notified of changes.",
        fix: "Always call .next([...updatedArray]) with a new array reference."
      }
    ],
    bestPractices: [
      "Keep components thin; orchestrate state in injectable services.",
      "Write automated tests for both services and components.",
      "Use Angular Signals or BehaviorSubjects for predictable reactivity."
    ],
    practiceQuestions: [
      {
        question: "In the frontend checkpoint, what is the role of tap() in the createOrder method?",
        options: [
          "To convert the request to JSON.",
          "To perform a side effect (updating the internal BehaviorSubject state) without altering the emitted response stream.",
          "To catch errors.",
          "To delay the network call."
        ],
        answerIndex: 1,
        explanation: "The RxJS tap() operator executes side effects (such as updating local state stores) without altering the payload passing through the stream."
      }
    ],
    revisionSummary: [
      "Synthesizes standalone components, routing, reactive forms, and services.",
      "Validates full Angular frontend mastery before full-stack integration."
    ],
    references: [
      { title: "Angular Project Best Practices", url: "https://angular.dev/style-guide", source: "Angular.dev" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 16: Full-Stack Integration (6 topics)
// -------------------------------------------------------------
const m16 = {
  "topic-16-1": {
    id: "topic-16-1",
    title: "Connecting Angular to ASP.NET Core",
    category: "16. Full-Stack Integration",
    description: "CORS configuration; proxy setup (proxy.conf.json); environment-based API URLs; environment.ts management",
    objectives: [
      "Eliminate Cross-Origin Resource Sharing (CORS) development friction using proxy.conf.json",
      "Configure production CORS policies on the ASP.NET Core backend",
      "Manage environment-based API URLs in Angular (environment.ts vs environment.prod.ts)",
      "Resolve localhost SSL and self-signed certificate challenges during development"
    ],
    prerequisites: "ASP.NET Core Web APIs (Module 6) and Angular HttpClient (Topic 14-7).",
    terminology: [
      { term: "Development Proxy", definition: "A configuration in Angular CLI that routes API calls (e.g. /api/*) through the local development server to avoid CORS during development." },
      { term: "Environment Files", definition: "Angular configuration files (environment.development.ts and environment.ts) that swap API base URLs during builds." }
    ],
    concepts: [
      {
        title: "Development Proxy and Environment Management",
        explanation: "Using an Angular development proxy eliminates CORS issues in development by making API calls appear as same-origin requests.",
        codeSnippet: `// 1. proxy.conf.json (in Angular root directory):
{
  "/api": {
    "target": "https://localhost:7142", // ASP.NET Core backend port
    "secure": false, // Accepts self-signed dev certificates
    "changeOrigin": true,
    "logLevel": "debug"
  }
}

// 2. Add to angular.json under serve options:
// "options": { "proxyConfig": "proxy.conf.json" }

// 3. Angular environment.development.ts:
export const environment = {
  production: false,
  apiUrl: '/api' // Uses relative URL thanks to proxy!
};

// 4. Angular environment.ts (Production):
export const environment = {
  production: true,
  apiUrl: 'https://api.myproductiondomain.com/api' // Direct cloud endpoint
};`,
        language: "typescript",
        output: "Transparently routes /api requests from localhost:4200 to backend on localhost:7142.",
        lineExplanation: [
          "Line 3: Any call to /api/* is proxied to the backend port.",
          "Line 5: 'secure: false' bypasses local ASP.NET Core development SSL certificate warnings.",
          "Line 17: In development, services call relative '/api' endpoints, eliminating CORS entirely."
        ]
      }
    ],
    diagram: `Development Proxy Routing:
[ Browser on http://localhost:4200 ]
               |
        (Calls: /api/orders)
               v
[ Angular Dev Server (Port 4200) ] --- Proxies to ---> [ ASP.NET Core Backend (Port 7142) ]
(Zero CORS errors because browser sees same-origin localhost:4200!)`,
    realWorldApplication: "The standard cross-stack setup used by commercial engineering teams to develop frontend and backend services in tandem.",
    commonErrors: [
      {
        error: "CORS error in development: 'No Access-Control-Allow-Origin header is present on the requested resource'",
        cause: "Calling http://localhost:7142 directly from localhost:4200 without backend CORS or Angular proxy.",
        fix: "Configure proxy.conf.json in Angular or enable app.UseCors() on the ASP.NET Core backend."
      }
    ],
    bestPractices: [
      "Use proxy.conf.json during local development to avoid browser CORS friction.",
      "Never hardcode 'https://localhost:7000' inside Angular services; always inject environment.apiUrl.",
      "Ensure production CORS headers explicitly list allowed domains."
    ],
    practiceQuestions: [
      {
        question: "Why is an Angular development proxy (proxy.conf.json) beneficial during local development?",
        options: [
          "It compiles C# code.",
          "It routes API requests through the Angular dev server to the backend, bypassing browser cross-origin restrictions (CORS) completely.",
          "It encrypts the database.",
          "It replaces npm."
        ],
        answerIndex: 1,
        explanation: "The development proxy forwards requests from the frontend port to the backend, appearing as a same-origin request to the browser."
      }
    ],
    revisionSummary: [
      "Use proxy.conf.json to bypass CORS locally.",
      "Store API endpoints in environment files.",
      "Enforce explicit CORS whitelists in production."
    ],
    references: [
      { title: "Proxying to a backend server - Angular Official Docs", url: "https://angular.dev/tools/cli/proxy", source: "Angular.dev" }
    ]
  },

  "topic-16-2": {
    id: "topic-16-2",
    title: "End-to-End Data Flow",
    category: "16. Full-Stack Integration",
    description: "End-to-End Data Flow : Form → HTTP service → Controller → Service → EF Core → DB → Response → Observable → UI update",
    objectives: [
      "Trace the entire life cycle of a data packet across the full-stack architecture",
      "Follow data from Angular Reactive Form through HTTP transmission, Model Binding, and Domain Validation",
      "Trace Entity Framework persistence to SQL Server and back",
      "Observe reactive UI reconciliation upon receiving the HTTP response payload"
    ],
    prerequisites: "Modules 5, 6, 14, and Topic 16-1.",
    terminology: [
      { term: "End-to-End (E2E) Flow", definition: "The complete journey of user data from browser DOM interaction, through frontend and backend layers, into physical database disk storage and back." }
    ],
    concepts: [
      {
        title: "Full-Stack Data Lifecycle Walkthrough",
        explanation: "Understanding every layer of the full-stack pipeline ensures rapid debugging and architectural clarity.",
        codeSnippet: `// 1. FRONTEND: User submits Reactive Form in Angular
// Form -> OrderService -> http.post('/api/orders', payload)

// 2. NETWORK: HTTP POST with JSON body transmitted over HTTPS

// 3. BACKEND CONTROLLER: ASP.NET Core Model Binding & Validation
[HttpPost]
public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderDto dto)
{
    // 4. BACKEND DOMAIN SERVICE: Business rules applied
    var order = await _orderDomainService.ProcessOrderAsync(dto);

    // 5. EF CORE PERSISTENCE: Translated to SQL INSERT
    // _db.Orders.Add(order);
    // await _db.SaveChangesAsync();

    // 6. HTTP 201 RESPONSE: Serialized to JSON
    return CreatedAtAction(nameof(GetById), new { id = order.Id }, new OrderDto(order));
}

// 7. FRONTEND RECEPTION: Observable emits -> Signal updates -> DOM updates in 12ms!`,
        language: "csharp",
        output: "Full lifecycle execution: Browser Form -> C# Web API -> SQL Server -> Reactive UI update.",
        lineExplanation: [
          "Demonstrates the complete 8-stage data pipeline linking frontend Angular to backend .NET and SQL."
        ]
      }
    ],
    diagram: `The Full-Stack 8-Stage Pipeline:
[ 1. Angular Form ] ---> [ 2. HttpClient ] ---> [ 3. ASP.NET Controller ] ---> [ 4. Domain Service ]
                                                                                           |
[ 8. UI Re-renders ] <--- [ 7. Observable ] <--- [ 6. JSON 201 Response ] <--- [ 5. EF Core -> SQL DB ]`,
    realWorldApplication: "The universal architecture linking modern web single-page apps to cloud enterprise databases.",
    commonErrors: [
      {
        error: "Property name mismatch (e.g. backend expects CustomerName, frontend sends customer_name)",
        cause: "Inconsistent casing conventions between JavaScript camelCase and C# PascalCase.",
        fix: "Rely on ASP.NET Core's default camelCase System.Text.Json serialization, and use TypeScript DTO interfaces."
      }
    ],
    bestPractices: [
      "Share data models by generating TypeScript interfaces from C# DTOs automatically.",
      "Keep transformations pure: DTO -> Domain Entity -> Database Model.",
      "Log correlation IDs at both frontend and backend boundaries."
    ],
    practiceQuestions: [
      {
        question: "In modern full-stack development, what casing convention is standard for JSON properties sent over the wire?",
        options: ["PASCAL_CASE", "camelCase", "snake_case", "kebab-case"],
        answerIndex: 1,
        explanation: "camelCase (e.g. customerName) is the universal industry standard for JSON payloads between Angular/React and ASP.NET Core."
      }
    ],
    revisionSummary: [
      "Data flows through 8 predictable stages from UI form to database.",
      "DTOs decouple frontend requirements from database schemas.",
      "camelCase is standard across JSON payloads."
    ],
    references: [
      { title: "ASP.NET Core and Angular Architecture - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/angular", source: "Microsoft Learn" }
    ]
  },

  "topic-16-3": {
    id: "topic-16-3",
    title: "Error Handling Across the Stack",
    category: "16. Full-Stack Integration",
    description: "Backend validation errors → Angular error interceptor → component display; global error handling patterns",
    objectives: [
      "Bridge backend RFC 7807 ProblemDetails with Angular UI notifications",
      "Intercept HTTP 400 validation error responses in an Angular HttpInterceptor",
      "Map field-specific validation errors directly onto Angular Reactive Form controls",
      "Display toast notifications for 500 server errors and redirect on 401/403"
    ],
    prerequisites: "ProblemDetails (Topic 6-10) and Angular Interceptors (Topic 14-7).",
    terminology: [
      { term: "ValidationProblemDetails", definition: "A standardized RFC 7807 error format returned by ASP.NET Core that groups validation errors by field name (e.g. errors.email: ['Invalid email'])." }
    ],
    concepts: [
      {
        title: "Translating Backend Validation to Frontend Form Errors",
        explanation: "When an ASP.NET Core API returns a 400 ValidationProblemDetails, an Angular error interceptor or service maps the errors directly to input fields.",
        codeSnippet: `// 1. Angular Centralized Error Interceptor
export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 400 && error.error?.errors) {
        // Backend Validation Problem Details: Pass dictionary to form
        console.warn("Backend validation failed:", error.error.errors);
      } else if (error.status === 401) {
        router.navigate(['/login']);
      } else if (error.status >= 500) {
        toastService.showError("A temporary server error occurred. Please try again later.");
      }
      return throwError(() => error);
    })
  );
};`,
        language: "typescript",
        output: "Catches HTTP errors globally and surfaces actionable feedback without page crashes.",
        lineExplanation: [
          "Line 8: Catches structured field validation errors emitted by ASP.NET Core FluentValidation.",
          "Line 12: Centralized toast notification informs user of 500 internal server failures."
        ]
      }
    ],
    diagram: `Cross-Stack Error Handling:
[ FluentValidation in C# fails ] ---> [ Returns 400 ValidationProblemDetails ]
                                                       |
                                        [ Angular HttpInterceptor intercepts ]
                                                       |
                                        [ Maps error to formControl.setErrors() ]
                                                       |
                                        [ Form highlights input in red with message! ]`,
    realWorldApplication: "Providing instantaneous, field-specific feedback on complex enterprise registration, tax, and loan application forms.",
    commonErrors: [
      {
        error: "Showing generic 'An error occurred' alert when backend provided specific field errors",
        cause: "Failing to inspect error.error.errors dictionary in the HTTP response.",
        fix: "Inspect the errors map in ProblemDetails and attach messages to corresponding form controls."
      }
    ],
    bestPractices: [
      "Use RFC 7807 ProblemDetails consistently across all backend API endpoints.",
      "Map field errors directly to Angular form controls with control.setErrors({ serverError: msg }).",
      "Never show raw technical database error messages to end users."
    ],
    practiceQuestions: [
      {
        question: "When ASP.NET Core returns a 400 Bad Request with ValidationProblemDetails, how are field errors structured?",
        options: [
          "As an XML string.",
          "As a dictionary/map where each key is a property name and the value is an array of error messages.",
          "As a binary stream.",
          "In plain HTML."
        ],
        answerIndex: 1,
        explanation: "ValidationProblemDetails provides an 'errors' object containing property names mapped to arrays of error strings."
      }
    ],
    revisionSummary: [
      "Backend emits RFC 7807 ProblemDetails.",
      "Angular interceptors catch and classify errors globally.",
      "Map server errors onto matching client form controls."
    ],
    references: [
      { title: "Problem Details for HTTP APIs - IETF RFC 7807", url: "https://datatracker.ietf.org/doc/html/rfc7807", source: "IETF Standards" }
    ]
  },

  "topic-16-4": {
    id: "topic-16-4",
    title: "End-to-End Authentication Flow",
    category: "16. Full-Stack Integration",
    description: "JWT login → token storage → HTTP interceptor for auth headers → route guards (frontend) → secured endpoints (backend)",
    objectives: [
      "Implement the complete full-stack JWT authentication cycle",
      "Authenticate credentials on ASP.NET Core and return signed JWT + Refresh Token",
      "Store tokens securely on the client and attach them to requests via HttpInterceptor",
      "Protect Angular routes using canActivate and backend controllers with [Authorize]"
    ],
    prerequisites: "JWT (Topic 7-2) and Angular Auth Interceptors (Topic 14-7).",
    terminology: [
      { term: "Auth Cycle", definition: "Login -> Token Generated -> Token Stored -> Interceptor Attaches Token -> Server Validates -> Route Guard Protects." }
    ],
    concepts: [
      {
        title: "The Complete Full-Stack Authentication Lifecycle",
        explanation: "A seamless authentication system coordinates frontend storage, interceptor header injection, and backend token signature verification.",
        codeSnippet: `// 1. Angular Login Service
login(credentials: LoginDto): Observable<AuthResponse> {
  return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
    tap(response => {
      // Store token securely
      localStorage.setItem('auth_token', response.token);
      this.currentUserSubject.next(response.user);
    })
  );
}

// 2. Angular HttpInterceptor attaches token to every outgoing request
// req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } })

// 3. ASP.NET Core Backend Controller verifies signature and claims
[Authorize(Roles = "Admin")]
[HttpGet("secure-data")]
public IActionResult GetAdminData()
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    return Ok(new { Secret = "42", AccessedBy = userId });
}`,
        language: "csharp",
        output: "End-to-end authenticated session established and verified across both stacks.",
        lineExplanation: [
          "Frontend stores token and notifies subscribers.",
          "Interceptor decorates all API calls with the Bearer token.",
          "Backend validates signature cryptographically and populates HttpContext.User."
        ]
      }
    ],
    diagram: `Full-Stack Authentication Flow:
1. User enters email/password in Angular Form
2. POST /api/auth/login ---> Validated by ASP.NET Core Identity
3. Server returns { token: "eyJ..." }
4. Angular saves token in localStorage/memory
5. Outgoing API calls automatically get: Authorization: Bearer eyJ...
6. Backend [Authorize] grants access based on validated claims!`,
    realWorldApplication: "Securing commercial enterprise portals, SaaS backends, and multi-tenant applications.",
    commonErrors: [
      {
        error: "Infinite redirect loop on 401 errors",
        cause: "The login request itself returns 401, causing the interceptor to redirect to /login again repeatedly.",
        fix: "Do not redirect on 401 if the request URL is already '/api/auth/login'."
      }
    ],
    bestPractices: [
      "Keep access token lifespans short (10-15 minutes).",
      "Implement silent token refresh via refresh tokens.",
      "Clear stored tokens on user logout or upon receiving a 401."
    ],
    practiceQuestions: [
      {
        question: "Where should the JWT token be attached in HTTP requests sent from Angular to ASP.NET Core?",
        options: [
          "In the URL query string.",
          "In the Authorization header formatted as 'Bearer <token>'.",
          "In the HTML title tag.",
          "Inside a cookie named 'password'."
        ],
        answerIndex: 1,
        explanation: "Standard REST authentication passes JWT tokens in the Authorization header using the 'Bearer ' scheme."
      }
    ],
    revisionSummary: [
      "Frontend logs in and stores JWT.",
      "HTTP interceptor injects Bearer token header.",
      "Backend [Authorize] validates signature and enforces claims."
    ],
    references: [
      { title: "Authenticate a Single Page Application - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization", source: "Microsoft Learn" }
    ]
  },

  "topic-16-5": {
    id: "topic-16-5",
    title: "Environment Management Across the Stack",
    category: "16. Full-Stack Integration",
    description: "ASP.NET Core environments (Development/Staging/Production); Angular environment.ts files; config across environments",
    objectives: [
      "Coordinate environment configurations between ASP.NET Core and Angular",
      "Manage ASP.NET Core environments using ASPNETCORE_ENVIRONMENT variable",
      "Configure Angular file replacements in angular.json for production builds",
      "Protect production databases from accidental local developer migrations"
    ],
    prerequisites: "Configuration (Topic 2-7) and Angular CLI.",
    terminology: [
      { term: "ASPNETCORE_ENVIRONMENT", definition: "The environment variable that dictates which appsettings file (e.g. appsettings.Production.json) is loaded." },
      { term: "File Replacement", definition: "An Angular build mechanism that replaces environment.ts with environment.prod.ts during 'ng build --configuration production'." }
    ],
    concepts: [
      {
        title: "Cross-Stack Environment Alignment",
        explanation: "Synchronizing environment configuration ensures that local dev points to local SQLite/mock services, while production builds target cloud databases and CDN assets.",
        codeSnippet: `// 1. Angular angular.json fileReplacements configuration:
// "configurations": {
//   "production": {
//     "fileReplacements": [
//       { "replace": "src/environments/environment.ts", "with": "src/environments/environment.prod.ts" }
//     ]
//   }
// }

// 2. ASP.NET Core Program.cs environment branching:
if (app.Environment.IsDevelopment())
{
    // Enable Swagger and detailed developer diagnostics
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // Production: Enforce HSTS and secure error handling
    app.UseHsts();
    app.UseExceptionHandler();
}`,
        language: "csharp",
        output: "Ensures debug tools and verbose errors are isolated strictly to development environments.",
        lineExplanation: [
          "Angular swaps environment.ts for environment.prod.ts during production builds.",
          "ASP.NET Core switches off Swagger in production and enforces strict security headers."
        ]
      }
    ],
    diagram: `Cross-Stack Environment Parity:
Environment     ASP.NET Core Config                 Angular Config
Development     appsettings.Development.json        environment.development.ts (proxy)
Staging         appsettings.Staging.json            environment.staging.ts
Production      appsettings.Production.json (EnvVar) environment.prod.ts (CDN API URL)`,
    realWorldApplication: "Deploying multi-stage cloud infrastructure (Dev, QA, UAT, Production) without manual code edits.",
    commonErrors: [
      {
        error: "Exposing Swagger UI in production environments",
        cause: "Removing 'if (app.Environment.IsDevelopment())' around app.UseSwagger().",
        fix: "Only enable Swagger in Development or behind strict administrative authorization."
      }
    ],
    bestPractices: [
      "Never check production passwords into environment files.",
      "Use environment variables in Docker containers and cloud app services.",
      "Automate build configurations using CI/CD pipelines."
    ],
    practiceQuestions: [
      {
        question: "How does Angular swap development API URLs for production endpoints during a production build?",
        options: [
          "It prompts the user.",
          "Using 'fileReplacements' configured in angular.json, which replaces environment.ts with environment.prod.ts during compilation.",
          "It searches Google.",
          "It queries the browser."
        ],
        answerIndex: 1,
        explanation: "Angular CLI uses the fileReplacements configuration in angular.json to swap environment files at build time."
      }
    ],
    revisionSummary: [
      "ASPNETCORE_ENVIRONMENT controls backend settings.",
      "Angular uses fileReplacements for environment switching.",
      "Never expose developer tools like Swagger in production."
    ],
    references: [
      { title: "Use multiple environments in ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/environments", source: "Microsoft Learn" }
    ]
  },

  "topic-16-6": {
    id: "topic-16-6",
    title: "AI Integration in Full-Stack Integration",
    category: "16. Full-Stack Integration",
    description: "Using Copilot to wire full-stack features end-to-end; debugging integration issues with AI",
    objectives: [
      "Use AI to generate synchronized C# DTOs and TypeScript interfaces",
      "Diagnose complex cross-stack bugs (CORS errors, serialization casing mismatches) with AI assistance",
      "Prompt AI to generate end-to-end integration test scenarios",
      "Audit generated integration glue code for error handling and memory leaks"
    ],
    prerequisites: "Modules 14, 15, and 16.",
    terminology: [
      { term: "Contract Synchronization", definition: "Ensuring that frontend TypeScript types exactly match backend C# DTO properties and types." }
    ],
    concepts: [
      {
        title: "Prompting AI for Full-Stack Feature Wiring",
        explanation: "Supplying both the C# backend model and Angular frontend component in the AI prompt ensures synchronized contracts and error handling.",
        codeSnippet: `// PROMPT PATTERN FOR FULL-STACK INTEGRATION:
// "Given this C# DTO:
// public record CreateProductDto(string Name, decimal Price, int CategoryId);
//
// 1. Generate the matching TypeScript interface.
// 2. Generate the Angular ProductService method using HttpClient.
// 3. Generate the Angular Reactive Form with validation."

// RESULTING TYPESCRIPT INTERFACE:
export interface CreateProductDto {
  name: string;
  price: number;
  categoryId: number;
}`,
        language: "typescript",
        output: "Generates synchronized frontend contracts directly from backend C# records.",
        lineExplanation: [
          "Ensures property names and types match between C# (decimal -> number) and TypeScript."
        ]
      }
    ],
    diagram: `Cross-Stack AI Sync:
[ C# DTO Record ] ---> Prompt Copilot ---> [ TypeScript Interface + Angular Service ]
                                                   |
                                     (Guarantees zero field mismatches!)`,
    realWorldApplication: "Eliminating tedious manual contract synchronization when developing full-stack features.",
    commonErrors: [
      {
        error: "Type mismatch between C# decimal/long and TypeScript number",
        cause: "JavaScript numbers are 64-bit floating point; very large 64-bit integers (Int64) can lose precision.",
        fix: "Serialize large 64-bit IDs as strings in C# when transferring to JavaScript."
      }
    ],
    bestPractices: [
      "Feed the C# DTO definition directly into the AI prompt when requesting frontend components.",
      "Ask AI to generate both the frontend error handler and backend ProblemDetails mapping.",
      "Verify that decimal and date formats match between the two stacks."
    ],
    practiceQuestions: [
      {
        question: "When mapping a C# 'decimal' property to TypeScript with AI assistance, what is the corresponding TypeScript type?",
        options: ["decimal", "number", "float", "BigDecimal"],
        answerIndex: 1,
        explanation: "TypeScript does not have a native decimal type; numbers with decimals are represented using the primitive 'number' type."
      }
    ],
    revisionSummary: [
      "AI synchronizes C# DTOs with TypeScript interfaces.",
      "Prompts should provide both backend and frontend context.",
      "Verify casing and precision between C# and JavaScript."
    ],
    references: [
      { title: "Building full-stack apps with .NET and Angular - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/client-side/spa/angular", source: "Microsoft Learn" }
    ]
  }
};

writeModule('module15_angular_testing.js', 'MODULE_15_LESSONS', m15);
writeModule('module16_fullstack_integration.js', 'MODULE_16_LESSONS', m16);
console.log('Batch 5 part 2 (Modules 15 & 16) complete!');
