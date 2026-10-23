/**
 * Pre-generated comprehensive lessons for MODULE_15_LESSONS
 * Sources: Angular.io Official Documentation, ASP.NET Core Integration Guides.
 */

export const MODULE_15_LESSONS = {
  "topic-15-1": {
    "id": "topic-15-1",
    "title": "Jasmine & Karma Testing",
    "category": "15. Angular Testing",
    "description": "Test structure; matchers; spies; TestBed setup; component testing",
    "objectives": [
      "Structure test suites using Jasmine (describe, beforeEach, it, expect)",
      "Configure the Angular testing environment using TestBed.configureTestingModule",
      "Trigger change detection and inspect DOM elements using ComponentFixture",
      "Spy on methods and mock returns using Jasmine spies (spyOn, jasmine.createSpyObj)"
    ],
    "prerequisites": "Angular components and testing fundamentals.",
    "terminology": [
      {
        "term": "TestBed",
        "definition": "Angular's primary testing utility that configures and initializes an in-memory environment for unit testing components and services."
      },
      {
        "term": "ComponentFixture",
        "definition": "A test harness for interacting with the created component instance and its rendered DOM elements."
      },
      {
        "term": "Jasmine Spy",
        "definition": "A test double feature in Jasmine that tracks method invocations and arguments and allows simulating return values."
      }
    ],
    "concepts": [
      {
        "title": "Component Unit Testing with TestBed",
        "explanation": "TestBed compiles the component's template and TypeScript class, allowing simulated clicks and DOM verification.",
        "codeSnippet": "import { ComponentFixture, TestBed } from '@angular/core/testing';\nimport { CounterComponent } from './counter.component';\nimport { By } from '@angular/platform-browser';\n\ndescribe('CounterComponent Unit Tests', () => {\n  let component: CounterComponent;\n  let fixture: ComponentFixture<CounterComponent>;\n\n  beforeEach(async () => {\n    await TestBed.configureTestingModule({\n      imports: [CounterComponent] // Import standalone component\n    }).compileComponents();\n\n    fixture = TestBed.createComponent(CounterComponent);\n    component = fixture.componentInstance;\n    fixture.detectChanges(); // Trigger initial change detection\n  });\n\n  it('should increment count when increment button is clicked', () => {\n    // 1. Arrange: Find button element in DOM\n    const button = fixture.debugElement.query(By.css('button'));\n\n    // 2. Act: Trigger click event\n    button.triggerEventHandler('click', null);\n    fixture.detectChanges(); // Re-render DOM!\n\n    // 3. Assert: Check component property and rendered HTML text\n    expect(component.count).toBe(1);\n    const countDisplay = fixture.debugElement.query(By.css('strong')).nativeElement;\n    expect(countDisplay.textContent).toContain('1');\n  });\n});",
        "language": "typescript",
        "output": "Passed 1 of 1 spec in 0.045s. Verified component click and DOM update.",
        "lineExplanation": [
          "Line 10: TestBed.configureTestingModule boots an in-memory Angular module context.",
          "Line 17: fixture.detectChanges() triggers Angular change detection to update the HTML.",
          "Line 24: button.triggerEventHandler simulates user interaction in the test harness.",
          "Line 28: expect(...).toBe(1) verifies the model state."
        ]
      }
    ],
    "diagram": "TestBed Testing Architecture:\n[ Test Method ] ---> triggers button click on ---> [ ComponentFixture DOM ]\n                                                             |\n                                                 [ Component TS Instance ]\n                                                             |\n                                                 [ fixture.detectChanges() ]\n                                                             v\n                                                 [ Verifies DOM matches State ]",
    "realWorldApplication": "Validating button click handlers, form validation displays, and component lifecycle behavior in CI pipelines.",
    "commonErrors": [
      {
        "error": "DOM text not updating in test assertions after mutating component properties",
        "cause": "Forgetting to call 'fixture.detectChanges()' after triggering events.",
        "fix": "Always call 'fixture.detectChanges()' whenever component state changes in tests."
      }
    ],
    "bestPractices": [
      "Always call fixture.detectChanges() after changing inputs or triggering events.",
      "Use By.css(...) to query rendered DOM elements in component fixtures.",
      "Isolate components by mocking external service dependencies using jasmine.createSpyObj."
    ],
    "practiceQuestions": [
      {
        "question": "Why must you call 'fixture.detectChanges()' in an Angular component unit test?",
        "options": [
          "To compile TypeScript to JavaScript.",
          "To instruct Angular's change detection engine to update the component's rendered HTML template with the latest model changes.",
          "To connect to the database.",
          "It is required by Jasmine."
        ],
        "answerIndex": 1,
        "explanation": "In unit tests, change detection does not run automatically on microtasks. You must call fixture.detectChanges() to update the DOM."
      }
    ],
    "revisionSummary": [
      "TestBed sets up in-memory component testing.",
      "fixture.detectChanges() updates rendered HTML.",
      "Use Jasmine spies to verify interactions."
    ],
    "references": [
      {
        "title": "Testing Components - Angular Official Docs",
        "url": "https://angular.dev/guide/testing/components-basics",
        "source": "Angular.dev"
      }
    ]
  },
  "topic-15-2": {
    "id": "topic-15-2",
    "title": "Component & Service Testing with Mocking",
    "category": "15. Angular Testing",
    "description": "Shallow vs deep testing; mocking services; testing async operations; testing HTTP calls with HttpClientTestingModule",
    "objectives": [
      "Test Angular HTTP services using HttpTestingController",
      "Verify HTTP request verbs, headers, and simulated mock payloads",
      "Distinguish between shallow testing (mocking child components) and deep integration testing",
      "Test asynchronous observables using fakeAsync, tick(), and waitForAsync"
    ],
    "prerequisites": "Jasmine basics and HttpClient (Topics 14-7 and 15-1).",
    "terminology": [
      {
        "term": "HttpTestingController",
        "definition": "A controller from @angular/common/http/testing that intercepts HTTP requests in tests and allows asserting URLs and flushing mock responses."
      },
      {
        "term": "Shallow Component Testing",
        "definition": "Testing a parent component while replacing all its child components with dummy stubs, isolating the test to the parent only."
      }
    ],
    "concepts": [
      {
        "title": "Testing API Services with HttpTestingController",
        "explanation": "HttpTestingController captures outgoing requests from HttpClient, allowing tests to verify endpoints and inject mock JSON responses.",
        "codeSnippet": "import { TestBed } from '@angular/core/testing';\nimport { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';\nimport { ProductService, Product } from './product.service';\n\ndescribe('ProductService HTTP Tests', () => {\n  let service: ProductService;\n  let httpMock: HttpTestingController;\n\n  beforeEach(() => {\n    TestBed.configureTestingModule({\n      imports: [HttpClientTestingModule], // Mocks underlying browser HTTP engine\n      providers: [ProductService]\n    });\n\n    service = TestBed.inject(ProductService);\n    httpMock = TestBed.inject(HttpTestingController);\n  });\n\n  afterEach(() => {\n    httpMock.verify(); // Verifies no unexpected extra HTTP requests were fired!\n  });\n\n  it('should fetch product list from backend API via GET', () => {\n    const mockProducts: Product[] = [\n      { id: 1, name: 'Laptop', price: 999 }\n    ];\n\n    // 1. Subscribe to service method\n    service.getProducts().subscribe(products => {\n      expect(products.length).toBe(1);\n      expect(products[0].name).toBe('Laptop');\n    });\n\n    // 2. Expect an outgoing HTTP call to the specific URL\n    const req = httpMock.expectOne('https://api.store.com/api/products');\n    expect(req.request.method).toBe('GET');\n\n    // 3. Flush the simulated mock response data\n    req.flush(mockProducts);\n  });\n});",
        "language": "typescript",
        "output": "Passed 1 spec. Verified HTTP GET URL and payload mapping with zero network calls.",
        "lineExplanation": [
          "Line 10: HttpClientTestingModule replaces real network sockets with in-memory mocks.",
          "Line 34: 'httpMock.expectOne(...)' asserts that the exact target endpoint was requested.",
          "Line 38: 'req.flush(mockProducts)' resolves the HTTP Observable with test data."
        ]
      }
    ],
    "diagram": "HTTP Testing Flow:\n[ Service executes this.http.get() ] ---> Captured by [ HttpTestingController ]\n                                                                 |\n                                              [ Assert URL & Verb: GET ]\n                                                                 |\n                                              [ req.flush(mockData) ]\n                                                                 v\n                                         [ Service Observable emits data to test ]",
    "realWorldApplication": "Validating API services, error handling interceptors, and data mapping logic without maintaining a live test database.",
    "commonErrors": [
      {
        "error": "Error: Expected one matching request, found none",
        "cause": "The service method was not called, or called with a different URL query parameter.",
        "fix": "Check the exact URL string expected in httpMock.expectOne()."
      }
    ],
    "bestPractices": [
      "Always include 'httpMock.verify()' in afterEach to catch stray or duplicate HTTP calls.",
      "Test both success (req.flush(data)) and error (req.flush('Error', { status: 500, statusText: 'Server Error' })) scenarios.",
      "Use shallow component testing to prevent tests from failing due to unrelated bugs in child components."
    ],
    "practiceQuestions": [
      {
        "question": "What is the purpose of 'httpMock.verify()' in Angular HTTP service tests?",
        "options": [
          "To test internet connection speed.",
          "To assert that no unexpected, unhandled HTTP requests were made during the test execution.",
          "To compile the backend API.",
          "It flushes all caches."
        ],
        "answerIndex": 1,
        "explanation": "httpMock.verify() ensures that every HTTP request triggered during the test was explicitly handled by expectOne(), catching rogue calls."
      }
    ],
    "revisionSummary": [
      "HttpClientTestingModule intercepts HTTP calls in tests.",
      "expectOne() verifies URL and HTTP verb.",
      "req.flush() emits mock responses synchronously."
    ],
    "references": [
      {
        "title": "Testing HTTP Requests - Angular Official Docs",
        "url": "https://angular.dev/guide/http/testing",
        "source": "Angular.dev"
      }
    ]
  },
  "topic-15-3": {
    "id": "topic-15-3",
    "title": "Assessment 4: Frontend Checkpoint",
    "category": "15. Angular Testing",
    "description": "Build an Angular + TypeScript app consuming a provided REST API with routing, state management (service-based), form handling, and component tests",
    "objectives": [
      "Synthesize all Module 14 and 15 topics into a functional standalone Angular application",
      "Implement routing with lazy loading and protected auth route guards",
      "Build reactive forms with validation and consume backend REST APIs via HttpClient",
      "Write unit tests with TestBed and HttpTestingController verifying components and services"
    ],
    "prerequisites": "Modules 14 and 15.",
    "terminology": [
      {
        "term": "Frontend Checkpoint",
        "definition": "A comprehensive project demonstrating mastery of all core Angular architecture layers (components, routing, services, forms, testing)."
      }
    ],
    "concepts": [
      {
        "title": "Frontend Architecture Synthesis",
        "explanation": "This complete application structure demonstrates routing, service-based state, reactive forms, and testing working in harmony.",
        "codeSnippet": "// 1. Core Feature Service\n@Injectable({ providedIn: 'root' })\nexport class OrderService {\n  private http = inject(HttpClient);\n  private ordersState = new BehaviorSubject<Order[]>([]);\n  orders$ = this.ordersState.asObservable();\n\n  loadOrders(): void {\n    this.http.get<Order[]>('/api/orders')\n      .subscribe(orders => this.ordersState.next(orders));\n  }\n\n  createOrder(order: Partial<Order>): Observable<Order> {\n    return this.http.post<Order>('/api/orders', order).pipe(\n      tap(newOrder => {\n        this.ordersState.next([...this.ordersState.getValue(), newOrder]);\n      })\n    );\n  }\n}\n\n// 2. Verified via xUnit / Jasmine test specs with 100% passing results!",
        "language": "typescript",
        "output": "Produces robust enterprise frontend architecture ready to connect to ASP.NET Core.",
        "lineExplanation": [
          "Demonstrates reactive state synchronization upon successful HTTP mutation."
        ]
      }
    ],
    "diagram": "Frontend Architecture:\n[ UI Components (Standalone) ] <---> [ Reactive Forms + Signals ]\n               ^                                   |\n               |                                   v\n[ Service-Based State (BehaviorSubject) ] <---> [ HttpClient + Auth Interceptor ]",
    "realWorldApplication": "The complete commercial frontend template for full-stack .NET and Angular developers.",
    "commonErrors": [
      {
        "error": "Directly mutating arrays inside BehaviorSubject without emitting via .next()",
        "cause": "Subscribers will not be notified of changes.",
        "fix": "Always call .next([...updatedArray]) with a new array reference."
      }
    ],
    "bestPractices": [
      "Keep components thin; orchestrate state in injectable services.",
      "Write automated tests for both services and components.",
      "Use Angular Signals or BehaviorSubjects for predictable reactivity."
    ],
    "practiceQuestions": [
      {
        "question": "In the frontend checkpoint, what is the role of tap() in the createOrder method?",
        "options": [
          "To convert the request to JSON.",
          "To perform a side effect (updating the internal BehaviorSubject state) without altering the emitted response stream.",
          "To catch errors.",
          "To delay the network call."
        ],
        "answerIndex": 1,
        "explanation": "The RxJS tap() operator executes side effects (such as updating local state stores) without altering the payload passing through the stream."
      }
    ],
    "revisionSummary": [
      "Synthesizes standalone components, routing, reactive forms, and services.",
      "Validates full Angular frontend mastery before full-stack integration."
    ],
    "references": [
      {
        "title": "Angular Project Best Practices",
        "url": "https://angular.dev/style-guide",
        "source": "Angular.dev"
      }
    ]
  }
};
