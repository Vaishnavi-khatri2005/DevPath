/**
 * Pre-generated comprehensive lessons for MODULE_14_LESSONS
 * Sources: Angular.io Official Documentation, RxJS Official Docs.
 */

export const MODULE_14_LESSONS = {
  "topic-14-1": {
    "id": "topic-14-1",
    "title": "Angular Fundamentals",
    "category": "14. Angular",
    "description": "Angular CLI; project structure; modules; components; templates; data binding (interpolation, property, event, two-way)",
    "objectives": [
      "Understand the Angular architecture and CLI commands (ng new, ng serve, ng generate)",
      "Explore the modern Standalone Component model and project folder layout",
      "Master all 4 forms of Data Binding: Interpolation ({{}}), Property Binding ([]), Event Binding (()), Two-Way Binding ([(ngModel)])",
      "Build modular, reusable UI components with TypeScript classes and HTML templates"
    ],
    "prerequisites": "TypeScript (Module 13) and HTML/CSS (Module 11).",
    "terminology": [
      {
        "term": "Angular CLI",
        "definition": "The command-line interface tool used to initialize, develop, scaffold, test, and maintain Angular applications."
      },
      {
        "term": "Data Binding",
        "definition": "The automatic synchronization of data between the TypeScript component model and the HTML template view."
      },
      {
        "term": "Standalone Component",
        "definition": "The modern Angular standard where components manage their own dependencies directly via the 'imports' array, removing NgModule overhead."
      }
    ],
    "concepts": [
      {
        "title": "Standalone Component and Four-Way Data Binding",
        "explanation": "Modern Angular components bind TypeScript state to HTML views using intuitive punctuation conventions: [] for data in, () for events out, and [()] for two-way sync.",
        "codeSnippet": "import { Component } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { FormsModule } from '@angular/forms';\n\n@Component({\n  selector: 'app-counter',\n  standalone: true, // Modern Angular standard!\n  imports: [CommonModule, FormsModule],\n  template: `\n    <div class=\"counter-card\">\n      <!-- 1. Interpolation: One-way from TS to HTML -->\n      <h2>{{ title }}</h2>\n\n      <!-- 2. Property Binding: Bind TS property to HTML attribute -->\n      <button [disabled]=\"count >= maxLimit\" (click)=\"increment()\">\n        Increment Count\n      </button>\n\n      <!-- 3. Event Binding: HTML event triggers TS method -->\n      <p>Current Count: <strong>{{ count }}</strong></p>\n\n      <!-- 4. Two-Way Binding with [(ngModel)] -->\n      <label>User Note: </label>\n      <input [(ngModel)]=\"userNote\" placeholder=\"Type a note...\">\n      <p>Live Note: {{ userNote }}</p>\n    </div>\n  `\n})\nexport class CounterComponent {\n  title: string = \"Interactive Counter Widget\";\n  count: number = 0;\n  maxLimit: number = 10;\n  userNote: string = \"\";\n\n  increment(): void {\n    if (this.count < this.maxLimit) {\n      this.count++;\n    }\n  }\n}",
        "language": "typescript",
        "output": "Renders interactive widget with two-way input synchronization and disabled button state binding.",
        "lineExplanation": [
          "Line 7: 'standalone: true' defines a modern Angular standalone component.",
          "Line 12: {{ title }} evaluates the TypeScript string in HTML.",
          "Line 15: [disabled] binds the HTML button disabled attribute to a boolean condition.",
          "Line 15: (click) handles the browser click event, calling the increment() method.",
          "Line 22: [(ngModel)] provides bidirectional two-way binding."
        ]
      }
    ],
    "diagram": "Angular Data Binding Syntax:\nDirection      Syntax         Example\nModel -> View  Interpolation  {{ data }}\nModel -> View  Property []    [src]=\"imageUrl\"\nView -> Model  Event ()       (click)=\"save()\"\nTwo-Way        Banana-in-Box  [(ngModel)]=\"name\"",
    "realWorldApplication": "Developing enterprise single-page application (SPA) frontends that connect to ASP.NET Core REST backends.",
    "commonErrors": [
      {
        "error": "Can't bind to 'ngModel' since it isn't a known property of 'input'",
        "cause": "FormsModule is missing from the component or module imports array.",
        "fix": "Add 'FormsModule' to the 'imports: [FormsModule]' list of the component."
      }
    ],
    "bestPractices": [
      "Use modern standalone components ('standalone: true') for all new Angular development.",
      "Prefer one-way data binding and events over two-way [(ngModel)] in complex forms.",
      "Keep component TypeScript files lean by delegating API calls to injectable services."
    ],
    "practiceQuestions": [
      {
        "question": "In Angular template syntax, what do square brackets '[]' and parentheses '()' signify?",
        "options": [
          "[] is for comments; () is for styles.",
          "[] represents Property Binding (data into the element); () represents Event Binding (events out of the element).",
          "Both represent two-way binding.",
          "[] is deprecated in Angular 17+."
        ],
        "answerIndex": 1,
        "explanation": "Square brackets [property] pass data from the component into the DOM; parentheses (event) send user interactions from the DOM to component methods."
      }
    ],
    "revisionSummary": [
      "Standalone components eliminate NgModule boilerplate.",
      "{{}} for text, [] for properties, () for events, [()] for two-way.",
      "Import FormsModule when using ngModel."
    ],
    "references": [
      {
        "title": "Angular Component Overview - Official Docs",
        "url": "https://angular.dev/overview",
        "source": "Angular.dev"
      }
    ]
  },
  "topic-14-2": {
    "id": "topic-14-2",
    "title": "Components & Communication",
    "category": "14. Angular",
    "description": "Input/Output decorators; component lifecycle hooks; ViewChild; content projection",
    "objectives": [
      "Pass data from parent to child components using @Input()",
      "Emit custom events from child to parent using @Output() and EventEmitter",
      "Master essential lifecycle hooks: ngOnInit, ngOnChanges, and ngOnDestroy",
      "Access child elements with ViewChild and project flexible markup with <ng-content>"
    ],
    "prerequisites": "Angular fundamentals (Topic 14-1).",
    "terminology": [
      {
        "term": "@Input()",
        "definition": "A decorator that marks a component property as an input that a parent component can bind to."
      },
      {
        "term": "@Output()",
        "definition": "A decorator that allows a child component to raise custom events to its parent via an EventEmitter."
      },
      {
        "term": "ngOnInit",
        "definition": "A lifecycle hook called once after data-bound properties are initialized, used for API data loading."
      },
      {
        "term": "ngOnDestroy",
        "definition": "A lifecycle hook called immediately before Angular destroys the component, critical for cleaning up subscriptions."
      }
    ],
    "concepts": [
      {
        "title": "Parent-Child Communication and Lifecycle",
        "explanation": "Components communicate downward via @Input properties and upward via @Output event emitters.",
        "codeSnippet": "import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';\n\n@Component({\n  selector: 'app-product-card',\n  standalone: true,\n  template: `\n    <div class=\"card\">\n      <h3>{{ product.name }}</h3>\n      <p>Price: ${{ product.price }}</p>\n      <button (click)=\"onSelect()\">Select Product</button>\n    </div>\n  `\n})\nexport class ProductCardComponent implements OnInit, OnDestroy {\n  // Receives data from parent\n  @Input({ required: true }) product!: { id: number; name: string; price: number };\n\n  // Emits custom event to parent\n  @Output() productSelected = new EventEmitter<number>();\n\n  ngOnInit(): void {\n    console.log(`ProductCard initialized for ${this.product.name}`);\n  }\n\n  onSelect(): void {\n    // Notify parent with the selected product ID\n    this.productSelected.emit(this.product.id);\n  }\n\n  ngOnDestroy(): void {\n    console.log(\"ProductCard unmounted - cleaning up listeners.\");\n  }\n}",
        "language": "typescript",
        "output": "Child renders product and emits custom event to parent upon user selection.",
        "lineExplanation": [
          "Line 17: '@Input({ required: true })' enforces that the parent must supply a product object.",
          "Line 20: '@Output() productSelected' creates an event channel.",
          "Line 28: 'this.productSelected.emit(id)' transmits the ID upward to the parent component."
        ]
      }
    ],
    "diagram": "Component Communication Hierarchy:\n[ Parent Component (e.g. ProductListComponent) ]\n      |\n      |--- [product]=\"selectedItem\" ---> (@Input: Data down)\n      |                                        |\n      |                                        v\n      |                              [ Child: ProductCardComponent ]\n      |                                        |\n      |<--- (productSelected)=\"handle($event)\"- (EventEmitter: Event up)\n      +----------------------------------------+",
    "realWorldApplication": "Reusable product catalogs, interactive dashboard widgets, and modular modal dialogs in Angular.",
    "commonErrors": [
      {
        "error": "Unsubscribing from RxJS Observables in ngOnInit instead of ngOnDestroy",
        "cause": "Leads to memory leaks because subscriptions continue running after components are navigated away from.",
        "fix": "Always unsubscribe or use takeUntilDestroyed() in ngOnDestroy."
      }
    ],
    "bestPractices": [
      "Use '@Input({ required: true })' in Angular 16+ for mandatory component inputs.",
      "Always clean up timers and RxJS subscriptions inside ngOnDestroy.",
      "Use <ng-content> (Content Projection) for building flexible wrapper cards and modal components."
    ],
    "practiceQuestions": [
      {
        "question": "Which Angular lifecycle hook is the best place to make initial HTTP calls to load component data?",
        "options": [
          "constructor",
          "ngOnInit",
          "ngAfterViewInit",
          "ngOnDestroy"
        ],
        "answerIndex": 1,
        "explanation": "ngOnInit executes once after inputs are bound and the component is initialized, making it the standard hook for HTTP data loading."
      }
    ],
    "revisionSummary": [
      "@Input receives data; @Output emits events.",
      "ngOnInit loads data; ngOnDestroy releases resources.",
      "<ng-content> projects markup into components."
    ],
    "references": [
      {
        "title": "Lifecycle Hooks - Angular Official Guide",
        "url": "https://angular.dev/guide/components/lifecycle",
        "source": "Angular.dev"
      }
    ]
  },
  "topic-14-3": {
    "id": "topic-14-3",
    "title": "Directives & Modern Control Flow",
    "category": "14. Angular",
    "description": "Structural directives (*ngIf, *ngFor, @if, @for); attribute directives; built-in & custom pipes",
    "objectives": [
      "Master modern Angular 17+ built-in control flow (@if, @else, @for, @switch)",
      "Compare modern control flow with legacy structural directives (*ngIf, *ngFor)",
      "Transform display data using built-in pipes (date, currency, uppercase, json, async)",
      "Build custom pipes for domain formatting and attribute directives for DOM styling"
    ],
    "prerequisites": "Angular components and templates.",
    "terminology": [
      {
        "term": "Control Flow (@if, @for)",
        "definition": "Angular 17's native template syntax providing faster, cleaner conditional rendering and iteration with mandatory tracking."
      },
      {
        "term": "Pipe (|)",
        "definition": "A template operator that transforms input data into a desired display format without modifying the underlying model."
      }
    ],
    "concepts": [
      {
        "title": "Modern Control Flow (@if, @for) and Pipes",
        "explanation": "Angular 17 introduced built-in control flow syntax (@if, @for) replacing legacy *ngIf and *ngFor with cleaner syntax and superior performance.",
        "codeSnippet": "import { Component } from '@angular/core';\nimport { CommonModule } from '@angular/common';\n\n@Component({\n  selector: 'app-user-list',\n  standalone: true,\n  imports: [CommonModule],\n  template: `\n    <!-- Modern Conditional Control Flow -->\n    @if (isLoading) {\n      <div class=\"spinner\">Loading users...</div>\n    } @else if (users.length === 0) {\n      <p class=\"empty-state\">No users found.</p>\n    } @else {\n      <!-- Modern Loop with mandatory @for (track) -->\n      <ul>\n        @for (user of users; track user.id) {\n          <li>\n            <!-- Pipes: uppercase, currency, date -->\n            <strong>{{ user.name | uppercase }}</strong>\n            <span>Balance: {{ user.balance | currency:'USD' }}</span>\n            <span>Member since: {{ user.joinedDate | date:'mediumDate' }}</span>\n          </li>\n        } @empty {\n          <li>No records available.</li>\n        }\n      </ul>\n    }\n  `\n})\nexport class UserListComponent {\n  isLoading = false;\n  users = [\n    { id: 1, name: \"Alice Smith\", balance: 450.75, joinedDate: new Date(2024, 0, 15) },\n    { id: 2, name: \"Bob Jones\", balance: 120.00, joinedDate: new Date(2025, 5, 20) }\n  ];\n}",
        "language": "typescript",
        "output": "ALICE SMITH Balance: $450.75 Member since: Jan 15, 2024",
        "lineExplanation": [
          "Line 10: '@if / @else' provides native branching without importing CommonModule.",
          "Line 17: '@for (user of users; track user.id)' provides high-performance diffing using the unique user ID.",
          "Line 21: Pipes (| uppercase, | currency) format raw values on the fly."
        ]
      }
    ],
    "diagram": "Modern Control Flow vs Legacy:\nLegacy: <div *ngFor=\"let item of items; trackBy: trackFn\">\nModern: @for (item of items; track item.id) { ... } @empty { ... }\nBenefits: 30-80% faster diffing, zero imports required, mandatory tracking!",
    "realWorldApplication": "Formatting prices, currency symbols, UTC timestamps, and rendering data tables across enterprise portals.",
    "commonErrors": [
      {
        "error": "Forgetting the 'track' expression in modern @for loops",
        "cause": "Angular 17 mandates a tracking expression to optimize DOM recycling and prevent rendering bugs.",
        "fix": "Always specify '; track item.id' (or track $index) in @for."
      }
    ],
    "bestPractices": [
      "Use modern @if and @for syntax over legacy *ngIf and *ngFor.",
      "Always track unique identity properties (e.g. item.id) in @for loops.",
      "Use the 'async' pipe ({{ obs$ | async }}) to handle Observable subscriptions and unsubscriptions automatically."
    ],
    "practiceQuestions": [
      {
        "question": "Why does modern Angular 17 @for require a 'track' expression?",
        "options": [
          "It is needed to sort the array.",
          "It allows Angular's DOM reconciliation engine to track items by unique identity, dramatically optimizing re-renders.",
          "It converts the loop to a C# thread.",
          "It is optional."
        ],
        "answerIndex": 1,
        "explanation": "The mandatory track expression allows Angular to identify which items have changed, moved, or been deleted, recycling DOM nodes efficiently."
      }
    ],
    "revisionSummary": [
      "Modern @if and @for syntax replaces *ngIf and *ngFor.",
      "Always provide a track expression in @for.",
      "Pipes format currency, dates, and uppercase strings declaratively."
    ],
    "references": [
      {
        "title": "Control Flow - Angular Official Documentation",
        "url": "https://angular.dev/guide/templates/control-flow",
        "source": "Angular.dev"
      }
    ]
  },
  "topic-14-4": {
    "id": "topic-14-4",
    "title": "Dependency Injection & Services in Angular",
    "category": "14. Angular",
    "description": "Angular DI system; injectable services; providedIn; HTTP interceptors",
    "objectives": [
      "Understand the hierarchical Dependency Injection system in Angular",
      "Create singleton application services using @Injectable({ providedIn: 'root' })",
      "Inject services using modern 'inject()' function (Angular 14+) vs constructor injection",
      "Implement functional HTTP Interceptors for authentication and error logging"
    ],
    "prerequisites": "Angular components and TypeScript.",
    "terminology": [
      {
        "term": "@Injectable",
        "definition": "A decorator that marks a TypeScript class as available to the injector for instantiation and dependency resolution."
      },
      {
        "term": "providedIn: 'root'",
        "definition": "Registers the service in the root application injector, making it a tree-shakeable singleton across the entire app."
      },
      {
        "term": "inject()",
        "definition": "The modern functional API for injecting dependencies in Angular components, services, and functions without constructor boilerplate."
      }
    ],
    "concepts": [
      {
        "title": "Angular Services and Modern inject() Syntax",
        "explanation": "Angular services encapsulate business logic and data access, injected cleanly via the modern inject() function.",
        "codeSnippet": "import { Injectable, inject } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\nimport { Observable } from 'rxjs';\n\nexport interface Product { id: number; name: string; price: number; }\n\n@Injectable({\n  providedIn: 'root' // Singleton available app-wide\n})\nexport class ProductService {\n  // Modern functional injection (replaces constructor boilerplate!)\n  private http = inject(HttpClient);\n  private apiUrl = 'https://api.store.com/api/products';\n\n  getProducts(): Observable<Product[]> {\n    return this.http.get<Product[]>(this.apiUrl);\n  }\n}\n\n// In modern Component:\n@Component({ ... })\nexport class ProductListComponent {\n  private productService = inject(ProductService);\n  products$ = this.productService.getProducts();\n}",
        "language": "typescript",
        "output": "Injects HttpClient and ProductService cleanly with zero constructor parameters.",
        "lineExplanation": [
          "Line 7: 'providedIn: \"root\"' creates a tree-shakeable application-level singleton.",
          "Line 11: 'private http = inject(HttpClient)' utilizes the modern functional DI injection API.",
          "Line 22: Components inject the service with a single clean line."
        ]
      }
    ],
    "diagram": "Angular DI Hierarchy:\n[ Root Injector (providedIn: 'root') ] ---> Shared Singleton across all routes!\n               |\n[ Component Injector (providers: [Service]) ] ---> Separate instance per component!",
    "realWorldApplication": "Sharing user session state, managing API communications, and orchestrating centralized toast notifications.",
    "commonErrors": [
      {
        "error": "Providing a service in both 'root' and a component's 'providers: [...]' array",
        "cause": "Creates multiple distinct instances of the service, breaking shared state.",
        "fix": "Only declare providedIn: 'root' for singleton services."
      }
    ],
    "bestPractices": [
      "Use '@Injectable({ providedIn: 'root' })' for almost all services.",
      "Prefer the modern 'inject()' function over constructor parameter injection.",
      "Keep services stateless or manage reactive state via RxJS Signals/BehaviorSubjects."
    ],
    "practiceQuestions": [
      {
        "question": "What does 'providedIn: \"root\"' achieve when applied to an Angular service?",
        "options": [
          "It forces the service to run on the server.",
          "It registers the service as a tree-shakeable singleton available everywhere in the application.",
          "It prevents the service from being injected.",
          "It converts the service to HTML."
        ],
        "answerIndex": 1,
        "explanation": "'providedIn: \"root\"' creates a singleton instance at the application level and enables tree-shaking if the service is unused."
      }
    ],
    "revisionSummary": [
      "@Injectable({ providedIn: 'root' }) creates singleton services.",
      "Use inject(MyService) for clean modern dependency injection.",
      "Services encapsulate business and API communication logic."
    ],
    "references": [
      {
        "title": "Dependency Injection in Angular - Official Docs",
        "url": "https://angular.dev/guide/di",
        "source": "Angular.dev"
      }
    ]
  },
  "topic-14-5": {
    "id": "topic-14-5",
    "title": "Routing & Navigation in Angular",
    "category": "14. Angular",
    "description": "Router module; route params; lazy loading modules; route guards; nested routes",
    "objectives": [
      "Configure client-side routing in Angular using provideRouter",
      "Read route parameters (e.g. /products/:id) using ActivatedRoute",
      "Optimize performance with Lazy Loading using loadComponent and loadChildren",
      "Protect sensitive routes using Functional Route Guards (canActivate)"
    ],
    "prerequisites": "Angular components and services.",
    "terminology": [
      {
        "term": "RouterOutlet",
        "definition": "A placeholder directive (<router-outlet></router-outlet>) where Angular dynamically displays the component for the active URL route."
      },
      {
        "term": "Lazy Loading",
        "definition": "Deferring the download of component code until the user actually navigates to that route, dramatically speeding up initial page load."
      },
      {
        "term": "canActivate Guard",
        "definition": "A security check executed before a route activates, determining whether navigation is allowed (e.g. verifying authentication)."
      }
    ],
    "concepts": [
      {
        "title": "Modern Route Configuration and Auth Guards",
        "explanation": "Modern Angular uses functional route declarations and lazy-loading with loadComponent.",
        "codeSnippet": "import { Routes } from '@angular/router';\nimport { inject } from '@angular/core';\nimport { AuthService } from './services/auth.service';\nimport { Router } from '@angular/router';\n\n// Functional canActivate Route Guard\nexport const authGuard = () => {\n  const auth = inject(AuthService);\n  const router = inject(Router);\n\n  if (auth.isAuthenticated()) {\n    return true; // Navigation allowed\n  }\n  \n  // Redirect unauthenticated user to login\n  return router.parseUrl('/login');\n};\n\n// Application Routes with Lazy Loading\nexport const appRoutes: Routes = [\n  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },\n  {\n    path: 'dashboard',\n    // Lazy loads component bundle only when navigated to!\n    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)\n  },\n  {\n    path: 'admin',\n    canActivate: [authGuard], // Protected route\n    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)\n  },\n  { path: '**', loadComponent: () => import('./not-found.component').then(m => m.NotFoundComponent) }\n];",
        "language": "typescript",
        "output": "Configures protected, lazy-loaded client routing with automatic authentication redirects.",
        "lineExplanation": [
          "Line 7: 'authGuard' is a modern functional guard using inject().",
          "Line 24: 'loadComponent' lazy-loads the dashboard JavaScript bundle on demand.",
          "Line 28: 'canActivate: [authGuard]' protects the admin route."
        ]
      }
    ],
    "diagram": "Client-Side Routing Flow:\nUser clicks: <a routerLink=\"/admin\">Admin</a>\n                    |\n           [ authGuard executes ]\n             /                \\\n     (Authenticated)     (Unauthenticated)\n           |                     |\n[ Lazy-load bundle ]     [ Redirect to /login ]\n           |\n[ Render inside <router-outlet> ]",
    "realWorldApplication": "Structuring commercial Single-Page Applications with secure admin dashboards and fast initial load times.",
    "commonErrors": [
      {
        "error": "Eagerly importing components in route files instead of using loadComponent",
        "cause": "Bundles all components into the main bundle, causing slow initial website load.",
        "fix": "Use 'loadComponent: () => import(...)' for all feature routes."
      }
    ],
    "bestPractices": [
      "Always use lazy loading ('loadComponent') for top-level feature routes.",
      "Use functional route guards ('canActivate: [myGuard]') instead of class-based guards.",
      "Include a wildcard route ('**') to handle 404 page navigation."
    ],
    "practiceQuestions": [
      {
        "question": "What is the primary benefit of using 'loadComponent: () => import(...)' in Angular routing?",
        "options": [
          "It forces server-side rendering.",
          "It enables Lazy Loading, splitting the component into a separate bundle downloaded only when navigated to.",
          "It encrypts the URL.",
          "It makes the route public."
        ],
        "answerIndex": 1,
        "explanation": "Lazy loading splits route code into separate chunks, keeping initial bundle size minimal and speeding up first paint."
      }
    ],
    "revisionSummary": [
      "provideRouter configures client routes.",
      "Use loadComponent for lazy loading.",
      "Functional route guards protect sensitive endpoints."
    ],
    "references": [
      {
        "title": "Common Routing Tasks - Angular Official Docs",
        "url": "https://angular.dev/guide/routing/common-router-tasks",
        "source": "Angular.dev"
      }
    ]
  },
  "topic-14-6": {
    "id": "topic-14-6",
    "title": "Reactive Programming (RxJS)",
    "category": "14. Angular",
    "description": "Observables; Subject, BehaviorSubject; operators (map, filter, switchMap, mergeMap, combineLatest); subscription management; async pipe",
    "objectives": [
      "Understand Reactive Programming and Observables (push-based streams of data over time)",
      "Compare cold Observables with hot Subjects and BehaviorSubjects",
      "Master essential RxJS pipeable operators: map, filter, switchMap, debounceTime, and catchError",
      "Avoid memory leaks using the async pipe and takeUntilDestroyed()"
    ],
    "prerequisites": "Asynchronous JavaScript (Topic 12-3) and Angular services.",
    "terminology": [
      {
        "term": "Observable",
        "definition": "A lazy data stream that emits multiple values over time (next), optional errors (error), and completion signals (complete)."
      },
      {
        "term": "BehaviorSubject",
        "definition": "A specialized Subject that stores the latest current value and immediately emits it to any new subscriber."
      },
      {
        "term": "switchMap",
        "definition": "An operator that maps to a new Observable and cancels previous in-flight requests (ideal for live search inputs)."
      },
      {
        "term": "Async Pipe (| async)",
        "definition": "An Angular template pipe that automatically subscribes to an Observable and unsubscribes when the component unmounts."
      }
    ],
    "concepts": [
      {
        "title": "Live Search with switchMap and Async Pipe",
        "explanation": "switchMap is the gold standard for autocomplete search: if a user types a new character, any pending previous HTTP search request is cancelled automatically.",
        "codeSnippet": "import { Component, inject } from '@angular/core';\nimport { FormControl, ReactiveFormsModule } from '@angular/forms';\nimport { CommonModule } from '@angular/common';\nimport { debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';\nimport { HttpClient } from '@angular/common/http';\n\n@Component({\n  selector: 'app-user-search',\n  standalone: true,\n  imports: [CommonModule, ReactiveFormsModule],\n  template: `\n    <input [formControl]=\"searchControl\" placeholder=\"Search users...\">\n\n    <!-- Async pipe subscribes and unsubscribes automatically! Zero memory leaks! -->\n    <ul>\n      @for (user of users$ | async; track user.id) {\n        <li>{{ user.name }} ({{ user.email }})</li>\n      }\n    </ul>\n  `\n})\nexport class UserSearchComponent {\n  private http = inject(HttpClient);\n  searchControl = new FormControl('');\n\n  // Reactive Stream Pipeline\n  users$ = this.searchControl.valueChanges.pipe(\n    debounceTime(300), // Wait 300ms pause in user typing\n    distinctUntilChanged(), // Only execute if text actually changed\n    switchMap(query => {\n      if (!query || query.trim() === '') return of([]);\n      // Cancels previous in-flight network call if user types again!\n      return this.http.get<any[]>(`/api/users/search?q=${query}`).pipe(\n        catchError(() => of([])) // Graceful fallback on error\n      );\n    })\n  );\n}",
        "language": "typescript",
        "output": "Cancels out-of-order network responses and manages subscriptions with zero manual unsubscribe calls.",
        "lineExplanation": [
          "Line 24: valueChanges emits an event on every keystroke.",
          "Line 25: debounceTime(300) prevents hammering the server while typing.",
          "Line 27: switchMap cancels any previous pending search request.",
          "Line 14: The 'async' pipe handles subscription and unsubscription automatically."
        ]
      }
    ],
    "diagram": "switchMap Flow (Typeahead Search):\nKeystroke \"a\"   ---> Fires HTTP Request A\nKeystroke \"ab\"  ---> Cancels Request A! Fires HTTP Request B\nKeystroke \"abc\" ---> Cancels Request B! Fires HTTP Request C ===> [ Emits Results C ]",
    "realWorldApplication": "Autocomplete search boxes, real-time financial ticker dashboards, and coordinating multiple simultaneous API data streams.",
    "commonErrors": [
      {
        "error": "Subscribing inside a subscribe (Nested Subscriptions Antipattern)",
        "cause": "service.getUser().subscribe(user => { service.getOrders(user.id).subscribe(...) });",
        "fix": "Flatten streams using high-order operators like 'switchMap'."
      }
    ],
    "bestPractices": [
      "Always prefer the async pipe in templates over manual .subscribe() in TypeScript.",
      "Use takeUntilDestroyed() if you must subscribe manually in a component.",
      "Use switchMap for searches and mergeMap for concurrent independent uploads."
    ],
    "practiceQuestions": [
      {
        "question": "Why is switchMap preferred over mergeMap for live search input queries?",
        "options": [
          "switchMap executes faster on the CPU.",
          "switchMap automatically cancels the previous in-flight HTTP request when a new search value is emitted, preventing race conditions.",
          "mergeMap is deprecated in RxJS 7.",
          "switchMap caches the data in memory."
        ],
        "answerIndex": 1,
        "explanation": "switchMap cancels prior in-flight Observable streams, ensuring out-of-order previous searches do not overwrite newer results."
      }
    ],
    "revisionSummary": [
      "Observables push data over time.",
      "switchMap cancels previous in-flight inner streams.",
      "The async pipe eliminates manual subscription memory leaks."
    ],
    "references": [
      {
        "title": "RxJS Documentation",
        "url": "https://rxjs.dev/guide/overview",
        "source": "RxJS.dev"
      },
      {
        "title": "RxJS in Angular - Official Docs",
        "url": "https://angular.dev/guide/ecosystem/rxjs",
        "source": "Angular.dev"
      }
    ]
  },
  "topic-14-7": {
    "id": "topic-14-7",
    "title": "HttpClient & Interceptors",
    "category": "14. Angular",
    "description": "HttpClient module; GET, POST, PUT, DELETE; error handling; interceptors for auth tokens",
    "objectives": [
      "Configure HttpClient using provideHttpClient(withInterceptors([...])) in modern Angular",
      "Perform strongly-typed GET, POST, PUT, and DELETE operations",
      "Implement Functional HTTP Interceptors to inject JWT Bearer tokens automatically",
      "Catch and handle global HTTP 401, 403, and 500 errors gracefully"
    ],
    "prerequisites": "RxJS (Topic 14-6) and JWT Authentication (Topic 7-2).",
    "terminology": [
      {
        "term": "HttpClient",
        "definition": "Angular's simplified client API for HTTP requests, built on top of XMLHttpRequest and RxJS."
      },
      {
        "term": "HTTP Interceptor",
        "definition": "A middleware function that intercepts and mutates outgoing HTTP requests (e.g. adding headers) and incoming responses."
      }
    ],
    "concepts": [
      {
        "title": "Functional Auth Interceptor and HttpClient",
        "explanation": "Modern Angular uses functional interceptors that clone the outgoing request to append Authorization headers before transmission.",
        "codeSnippet": "import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';\nimport { inject } from '@angular/core';\nimport { AuthService } from './auth.service';\nimport { catchError, throwError } from 'rxjs';\nimport { Router } from '@angular/router';\n\n// 1. Functional JWT Auth Interceptor\nexport const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {\n  const authService = inject(AuthService);\n  const router = inject(Router);\n  const token = authService.getToken();\n\n  // Clone request to add Authorization header (Requests are immutable!)\n  let authReq = req;\n  if (token) {\n    authReq = req.clone({\n      setHeaders: {\n        Authorization: `Bearer ${token}`\n      }\n    });\n  }\n\n  // Pass request to next handler with centralized error interception\n  return next(authReq).pipe(\n    catchError(error => {\n      if (error.status === 401) {\n        authService.logout();\n        router.navigate(['/login']);\n      }\n      return throwError(() => error);\n    })\n  );\n};\n\n// 2. Registering in app.config.ts:\n// export const appConfig: ApplicationConfig = {\n//   providers: [provideHttpClient(withInterceptors([authInterceptor]))]\n// };",
        "language": "typescript",
        "output": "Automatically attaches Bearer JWT token to every outgoing API request.",
        "lineExplanation": [
          "Line 8: Modern functional interceptor signature: (req, next) => Observable.",
          "Line 16: 'req.clone({ setHeaders: ... })' clones the request because HTTP requests in Angular are strictly immutable.",
          "Line 24: Catches 401 Unauthorized errors globally and redirects to /login."
        ]
      }
    ],
    "diagram": "HTTP Interceptor Pipeline:\nComponent calls: http.get('/api/orders')\n                     |\n         [ Auth Interceptor Clones Req ]\n         (Appends Authorization: Bearer eyJ...)\n                     |\n         [ Network Request to ASP.NET Core ]\n                     |\n         [ Auth Interceptor inspects Response ]\n         (If 401 -> Logout & Redirect to Login)\n                     |\n         Component receives data Observable",
    "realWorldApplication": "Connecting Angular frontends seamlessly to secure ASP.NET Core Web APIs without manually writing headers on every request.",
    "commonErrors": [
      {
        "error": "Attempting to modify the incoming HttpRequest directly: req.headers.set(...)",
        "cause": "HttpRequest objects are strictly immutable in Angular.",
        "fix": "Always call 'req.clone({ setHeaders: { ... } })'."
      }
    ],
    "bestPractices": [
      "Use provideHttpClient(withInterceptors([...])) in app.config.ts.",
      "Keep interceptors functional rather than legacy class-based implementations.",
      "Check token expiration before attaching it to outgoing requests."
    ],
    "practiceQuestions": [
      {
        "question": "Why must you call 'req.clone()' inside an Angular HTTP Interceptor when modifying headers?",
        "options": [
          "To speed up transmission.",
          "Because HttpRequest objects in Angular are strictly immutable.",
          "It converts the request to JSON.",
          "It is required by TypeScript."
        ],
        "answerIndex": 1,
        "explanation": "In Angular, HttpRequest instances are immutable. To modify headers or URL parameters, you must create a clone."
      }
    ],
    "revisionSummary": [
      "provideHttpClient powers API communications.",
      "Functional interceptors append JWT headers automatically.",
      "Intercept 401 errors globally to handle session expiration."
    ],
    "references": [
      {
        "title": "HttpClient - Angular Official Docs",
        "url": "https://angular.dev/guide/http",
        "source": "Angular.dev"
      }
    ]
  },
  "topic-14-8": {
    "id": "topic-14-8",
    "title": "Angular Forms",
    "category": "14. Angular",
    "description": "Template-driven forms; reactive forms (FormGroup, FormControl, FormArray); validation (built-in & custom validators); dynamic forms",
    "objectives": [
      "Compare Template-driven forms (simple, two-way) with Reactive forms (scalable, robust)",
      "Construct robust reactive forms using FormGroup, FormControl, and FormBuilder",
      "Enforce validation using built-in validators (Validators.required, email, minLength)",
      "Author custom validators and handle asynchronous validation"
    ],
    "prerequisites": "Angular components and templates.",
    "terminology": [
      {
        "term": "Reactive Forms",
        "definition": "A model-driven approach to handling forms where form inputs are bound directly to programmatic FormControl and FormGroup instances."
      },
      {
        "term": "FormControl",
        "definition": "Tracks the value and validation status of an individual form input control."
      },
      {
        "term": "FormGroup",
        "definition": "Tracks the value and validity status of a collection of FormControl instances."
      }
    ],
    "concepts": [
      {
        "title": "Enterprise Reactive Forms with FormBuilder",
        "explanation": "Reactive forms offer predictable, immutable form state, synchronous access to values, and straightforward unit testability.",
        "codeSnippet": "import { Component, inject } from '@angular/core';\nimport { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';\nimport { CommonModule } from '@angular/common';\n\n@Component({\n  selector: 'app-register-form',\n  standalone: true,\n  imports: [CommonModule, ReactiveFormsModule],\n  template: `\n    <form [formGroup]=\"registerForm\" (ngSubmit)=\"onSubmit()\">\n      <div>\n        <label>Email:</label>\n        <input formControlName=\"email\">\n        @if (email?.invalid && email?.touched) {\n          <span class=\"error\">Valid email is required.</span>\n        }\n      </div>\n\n      <div>\n        <label>Password:</label>\n        <input type=\"password\" formControlName=\"password\">\n        @if (password?.invalid && password?.touched) {\n          <span class=\"error\">Password must be at least 8 characters.</span>\n        }\n      </div>\n\n      <button type=\"submit\" [disabled]=\"registerForm.invalid\">Register</button>\n    </form>\n  `\n})\nexport class RegisterFormComponent {\n  private fb = inject(FormBuilder);\n\n  // Declarative Form Structure\n  registerForm = this.fb.group({\n    email: ['', [Validators.required, Validators.email]],\n    password: ['', [Validators.required, Validators.minLength(8)]]\n  });\n\n  get email() { return this.registerForm.get('email'); }\n  get password() { return this.registerForm.get('password'); }\n\n  onSubmit(): void {\n    if (this.registerForm.valid) {\n      console.log(\"Submitting payload:\", this.registerForm.value);\n    }\n  }\n}",
        "language": "typescript",
        "output": "Validates inputs live, disables submit button when invalid, and displays contextual errors.",
        "lineExplanation": [
          "Line 10: '[formGroup]=\"registerForm\"' links the HTML form to the TypeScript model.",
          "Line 13: 'formControlName=\"email\"' associates input with the email control.",
          "Line 14: Displays error message only if the control is both invalid AND touched by the user.",
          "Line 34: FormBuilder creates clean control hierarchies with validation arrays."
        ]
      }
    ],
    "diagram": "Reactive Forms Hierarchy:\n[ FormGroup: registerForm ]\n      |-- [ FormControl: email ] (Validators.required, email)\n      +-- [ FormControl: password ] (Validators.minLength(8))\nForm.valid is TRUE only when ALL child controls are valid!",
    "realWorldApplication": "Building multi-step checkout funnels, registration portals, and complex administrative data entry screens.",
    "commonErrors": [
      {
        "error": "Displaying validation error messages before the user has touched the input",
        "cause": "Checking only 'control.invalid' without 'control.touched' causes the form to appear red on initial page load.",
        "fix": "Check 'control.invalid && (control.dirty || control.touched)'."
      }
    ],
    "bestPractices": [
      "Always use Reactive Forms for enterprise applications; reserve Template-driven forms for simple one-field filters.",
      "Use getters (get email()) for clean template validation property access.",
      "Disable the submit button when the form is invalid: [disabled]=\"form.invalid\"."
    ],
    "practiceQuestions": [
      {
        "question": "Why should you check 'control.touched' or 'control.dirty' before displaying validation errors in Angular?",
        "options": [
          "It compiles faster.",
          "To prevent validation error messages from appearing aggressively before the user has interacted with the input.",
          "Angular throws an error if omitted.",
          "It forces the input to be uppercase."
        ],
        "answerIndex": 1,
        "explanation": "Checking 'touched' ensures error messages only show after the user has focused and blurred the field, providing a polite UX."
      }
    ],
    "revisionSummary": [
      "Reactive forms provide robust, testable form state.",
      "FormGroup groups controls; FormControl tracks state.",
      "Display errors when control is invalid and touched."
    ],
    "references": [
      {
        "title": "Reactive Forms - Angular Official Docs",
        "url": "https://angular.dev/guide/forms/reactive-forms",
        "source": "Angular.dev"
      }
    ]
  },
  "topic-14-9": {
    "id": "topic-14-9",
    "title": "State Management in Angular",
    "category": "14. Angular",
    "description": "Service-based state; NgRx awareness (Store, Actions, Reducers, Effects) — when to use vs simpler patterns",
    "objectives": [
      "Implement lightweight, reactive Service-Based State using BehaviorSubject and Signals",
      "Understand the Redux pattern and NgRx architecture (Store, Actions, Reducers, Selectors, Effects)",
      "Evaluate trade-offs: when is NgRx necessary vs when does it introduce needless boilerplate?",
      "Manage loading, error, and data states predictably"
    ],
    "prerequisites": "Angular services (Topic 14-4) and RxJS (Topic 14-6).",
    "terminology": [
      {
        "term": "Single Source of Truth",
        "definition": "A design principle where the entire state of an application or domain is stored in a single centralized store."
      },
      {
        "term": "NgRx Store",
        "definition": "An RxJS-powered state management library for Angular inspired by Redux, providing transactional state changes via dispatched actions."
      },
      {
        "term": "Reducer",
        "definition": "A pure function that takes the current state and an action, and returns a brand-new updated state."
      }
    ],
    "concepts": [
      {
        "title": "Service-Based State with BehaviorSubject",
        "explanation": "Before reaching for complex libraries like NgRx, most Angular applications can manage state cleanly using an injectable service with a private BehaviorSubject.",
        "codeSnippet": "import { Injectable } from '@angular/core';\nimport { BehaviorSubject, Observable } from 'rxjs';\nimport { map } from 'rxjs/operators';\n\nexport interface CartItem { id: number; name: string; price: number; quantity: number; }\n\n@Injectable({ providedIn: 'root' })\nexport class CartStateService {\n  // 1. Private mutable state container (BehaviorSubject holds current value)\n  private readonly _cartItems = new BehaviorSubject<CartItem[]>([]);\n\n  // 2. Public read-only stream for components\n  readonly cartItems$: Observable<CartItem[]> = this._cartItems.asObservable();\n\n  // 3. Derived state (Selectors)\n  readonly totalItems$ = this.cartItems$.pipe(\n    map(items => items.reduce((sum, item) => sum + item.quantity, 0))\n  );\n\n  readonly totalPrice$ = this.cartItems$.pipe(\n    map(items => items.reduce((sum, item) => sum + (item.price * item.quantity), 0))\n  );\n\n  // 4. State mutation methods\n  addItem(product: { id: number; name: string; price: number }): void {\n    const current = this._cartItems.getValue();\n    const existingIndex = current.findIndex(i => i.id === product.id);\n\n    if (existingIndex > -1) {\n      const updated = [...current];\n      updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + 1 };\n      this._cartItems.next(updated);\n    } else {\n      this._cartItems.next([...current, { ...product, quantity: 1 }]);\n    }\n  }\n}",
        "language": "typescript",
        "output": "Provides reactive, centralized cart state without hundreds of lines of NgRx boilerplate.",
        "lineExplanation": [
          "Line 9: BehaviorSubject holds the live state in memory.",
          "Line 12: Exposes read-only Observable to prevent external components from calling .next() directly.",
          "Line 24: Immutably spreads and updates items array."
        ]
      }
    ],
    "diagram": "State Management Flow:\n[ Component Action ] ---> calls: cartStateService.addItem(product)\n                                       |\n                   [ State Service mutates state immutably ]\n                                       |\n                   [ BehaviorSubject emits updated state ]\n                                       |\n                 [ All UI subscribers update automatically! ]",
    "realWorldApplication": "Managing shopping cart items, authenticated user profile badges, and global notification feeds across disconnected UI modules.",
    "commonErrors": [
      {
        "error": "Introducing full NgRx boilerplate for simple, small applications",
        "cause": "Leads to fatigue from writing Actions, Reducers, Selectors, and Effects for every simple state change.",
        "fix": "Start with Service-based state (BehaviorSubject or Signals); introduce NgRx only when team size and complexity justify it."
      }
    ],
    "bestPractices": [
      "Keep the state container private (_state$) and expose only read-only observables (state$).",
      "Always perform immutable updates when updating state in .next().",
      "Adopt NgRx SignalStore in modern Angular for a middle-ground between simplicity and structure."
    ],
    "practiceQuestions": [
      {
        "question": "When is a Service-Based State approach preferable over full NgRx in Angular?",
        "options": [
          "NgRx is deprecated.",
          "When application state is manageable and does not require complex time-travel debugging, avoiding excessive boilerplate.",
          "Service-based state only works on Windows.",
          "There is no difference."
        ],
        "answerIndex": 1,
        "explanation": "Service-based state provides clean reactivity with minimal overhead, making it ideal for small to medium applications."
      }
    ],
    "revisionSummary": [
      "BehaviorSubject enables reactive service-based state.",
      "Keep state private and expose read-only observables.",
      "Use NgRx for large enterprise teams needing formal action audits."
    ],
    "references": [
      {
        "title": "NgRx Documentation",
        "url": "https://ngrx.io/guide/store",
        "source": "NgRx.io"
      }
    ]
  },
  "topic-14-10": {
    "id": "topic-14-10",
    "title": "Advanced Angular & Signals",
    "category": "14. Angular",
    "description": "Standalone components; signals (Angular 16+); lazy loading & performance optimization; change detection strategies",
    "objectives": [
      "Master Angular Signals (signal, computed, effect) introduced in Angular 16+",
      "Understand the shift from Zone.js change detection to fine-grained Signal reactivity",
      "Optimize rendering performance with ChangeDetectionStrategy.OnPush",
      "Implement deferrable views (@defer) in Angular 17 for automated lazy rendering"
    ],
    "prerequisites": "Angular components and reactivity.",
    "terminology": [
      {
        "term": "Signal",
        "definition": "A wrapper around a value that notifies consumers when that value changes, enabling fine-grained reactivity without Zone.js."
      },
      {
        "term": "computed()",
        "definition": "A reactive signal that derives its value from other signals and caches the result until dependencies change."
      },
      {
        "term": "ChangeDetectionStrategy.OnPush",
        "definition": "Tells Angular to run change detection on a component only when its @Inputs change by reference or an event originates inside it."
      },
      {
        "term": "@defer",
        "definition": "Angular 17 template block that lazily downloads and renders HTML blocks when specified triggers (viewport, hover, timer) occur."
      }
    ],
    "concepts": [
      {
        "title": "Fine-Grained Reactivity with Angular Signals",
        "explanation": "Signals represent the future of Angular, offering fine-grained updates without dirty-checking entire component trees.",
        "codeSnippet": "import { Component, signal, computed, effect, ChangeDetectionStrategy } from '@angular/core';\n\n@Component({\n  selector: 'app-shopping-total',\n  standalone: true,\n  changeDetection: ChangeDetectionStrategy.OnPush, // High-performance change detection\n  template: `\n    <div class=\"cart-box\">\n      <h3>Items: {{ quantity() }}</h3>\n      <p>Unit Price: ${{ unitPrice() }}</p>\n      <p>Subtotal: <strong>${{ subtotal() }}</strong></p>\n      <p>Total with Tax: <strong>${{ totalWithTax() }}</strong></p>\n\n      <button (click)=\"incrementQuantity()\">Add Item</button>\n    </div>\n\n    <!-- Angular 17 Deferrable Views: loads reviews only when scrolled into viewport! -->\n    @defer (on viewport) {\n      <app-heavy-reviews-widget />\n    } @placeholder {\n      <div class=\"placeholder\">Scroll down to view reviews...</div>\n    }\n  `\n})\nexport class ShoppingTotalComponent {\n  // 1. Writable Signals\n  quantity = signal<number>(1);\n  unitPrice = signal<number>(50);\n\n  // 2. Computed Signals (Automatically memoized/cached!)\n  subtotal = computed(() => this.quantity() * this.unitPrice());\n  totalWithTax = computed(() => this.subtotal() * 1.08);\n\n  constructor() {\n    // 3. Effect: Runs automatically whenever read signals change\n    effect(() => {\n      console.log(`Cart updated: ${this.quantity()} items. Subtotal: $${this.subtotal()}`);\n    });\n  }\n\n  incrementQuantity(): void {\n    // Update signal value cleanly\n    this.quantity.update(q => q + 1);\n  }\n}",
        "language": "typescript",
        "output": "Cart updated: 2 items. Subtotal: $100 (Fine-grained UI update with zero full-tree dirty checking)",
        "lineExplanation": [
          "Line 6: 'changeDetection: ChangeDetectionStrategy.OnPush' optimizes rendering.",
          "Line 24: 'signal<number>(1)' creates a reactive, trackable value container.",
          "Line 28: 'computed()' automatically tracks signals used inside it and caches calculations.",
          "Line 32: 'effect()' logs whenever quantity or unitPrice changes."
        ]
      }
    ],
    "diagram": "Signal Reactivity Graph:\n[ quantity (signal) ] -------\\\n                              +---> [ subtotal (computed) ] ---> [ totalWithTax (computed) ]\n[ unitPrice (signal) ] ------/\nUpdating quantity() notifies ONLY dependent computations and UI nodes directly!",
    "realWorldApplication": "Building high-performance e-commerce checkouts, interactive charts, and real-time streaming dashboards.",
    "commonErrors": [
      {
        "error": "Modifying signals inside an effect() without untracked()",
        "cause": "Can trigger circular infinite update loops.",
        "fix": "Effects are meant for side effects (logging, analytics, canvas draws); use computed() for derived state."
      }
    ],
    "bestPractices": [
      "Always set 'ChangeDetectionStrategy.OnPush' on components.",
      "Use computed() for derived values instead of writing manual setter functions.",
      "Use '@defer (on viewport)' for heavy components below the fold."
    ],
    "practiceQuestions": [
      {
        "question": "What is the primary advantage of Angular Signals over traditional Zone.js change detection?",
        "options": [
          "Signals compile to WebAssembly.",
          "Signals provide fine-grained, dependency-tracked reactivity, allowing Angular to update only the specific DOM nodes that changed rather than checking the entire component tree.",
          "Signals work without HTML.",
          "Signals are written in C#."
        ],
        "answerIndex": 1,
        "explanation": "Signals notify the framework precisely which values changed, allowing surgical DOM updates without dirty-checking the entire application tree."
      }
    ],
    "revisionSummary": [
      "Signals (signal, computed, effect) provide fine-grained reactivity.",
      "Use ChangeDetectionStrategy.OnPush for top performance.",
      "@defer lazy-loads template components upon viewport intersection."
    ],
    "references": [
      {
        "title": "Angular Signals - Official Guide",
        "url": "https://angular.dev/guide/signals",
        "source": "Angular.dev"
      },
      {
        "title": "Deferrable Views - Angular Official Guide",
        "url": "https://angular.dev/guide/templates/defer",
        "source": "Angular.dev"
      }
    ]
  },
  "topic-14-11": {
    "id": "topic-14-11",
    "title": "AI Integration in Angular Development",
    "category": "14. Angular",
    "description": "Generating components, services, and forms with Copilot; reviewing AI output for RxJS anti-patterns, memory leaks (unsubscribed observables), and accessibility gaps",
    "objectives": [
      "Prompt AI to scaffold Angular standalone components, reactive forms, and services",
      "Audit AI-generated code for RxJS memory leaks (unsubscribed observables)",
      "Detect legacy Angular paradigms (NgModule boilerplate, *ngIf) and refactor to modern standards (standalone, @if, Signals)",
      "Audit generated templates for accessibility (ARIA attributes, label associations)"
    ],
    "prerequisites": "Angular Modules and Components.",
    "terminology": [
      {
        "term": "Subscription Leak",
        "definition": "A memory leak occurring when a component subscribes to an observable but fails to unsubscribe when destroyed, keeping the component alive in memory."
      }
    ],
    "concepts": [
      {
        "title": "Auditing AI-Generated Angular Code",
        "explanation": "AI models often hallucinate legacy Angular syntax (NgModules) or omit proper subscription cleanup.",
        "codeSnippet": "// LEAKY AI OUTPUT:\n// export class UserComponent implements OnInit {\n//   users: any;\n//   ngOnInit() {\n//     this.userService.getUsers().subscribe(u => this.users = u); // FLAW: Unhandled subscription leak!\n//   }\n// }\n\n// AUDITED & REFACTORED MODERN IMPLEMENTATION:\n@Component({\n  standalone: true,\n  template: `\n    @for (user of users$ | async; track user.id) {\n      <li>{{ user.name }}</li>\n    }\n  `\n})\nexport class UserComponent {\n  private userService = inject(UserService);\n  \n  // Clean declarative stream: automatically managed by async pipe!\n  readonly users$ = this.userService.getUsers();\n}",
        "language": "typescript",
        "output": "Eliminates subscription leak and updates to modern standalone + @for syntax.",
        "lineExplanation": [
          "Eliminates manual .subscribe() call.",
          "Adopts standalone component standard and modern @for syntax."
        ]
      }
    ],
    "diagram": "Angular AI Code Review Checklist:\n1. Is it a modern Standalone component ('standalone: true')?\n2. Does it use modern control flow (@if, @for) instead of *ngIf?\n3. Are subscriptions handled cleanly via 'async' pipe or takeUntilDestroyed()?\n4. Is ChangeDetectionStrategy.OnPush enabled?",
    "realWorldApplication": "Quickly scaffolding feature components while enforcing modern Angular 17+ conventions across a development team.",
    "commonErrors": [
      {
        "error": "Accepting AI code that scaffolds unnecessary NgModule files",
        "cause": "AI models trained on older codebases default to Angular 12-era module architecture.",
        "fix": "Instruct AI explicitly: 'Use Angular 17+ standalone components, inject() syntax, and modern control flow'."
      }
    ],
    "bestPractices": [
      "Always prompt with: 'Target Angular 17+, standalone components, and modern control flow (@if, @for)'.",
      "Verify that all Observable subscriptions are cleaned up or handled via the async pipe.",
      "Check that generated HTML has accessible labels and semantic tags."
    ],
    "practiceQuestions": [
      {
        "question": "When reviewing AI-generated Angular code that subscribes to an Observable in a component, what critical risk must you inspect?",
        "options": [
          "Whether the variable is using snake_case.",
          "Whether the subscription is properly unsubscribed in ngOnDestroy or handled via the async pipe to prevent memory leaks.",
          "Whether the file is saved as .js.",
          "Whether it uses CSS Grid."
        ],
        "answerIndex": 1,
        "explanation": "Unclosed subscriptions keep the component alive in heap memory, causing serious client-side performance degradation."
      }
    ],
    "revisionSummary": [
      "AI accelerates Angular component scaffolding.",
      "Always convert legacy NgModule suggestions into modern standalone components.",
      "Guard against RxJS subscription memory leaks."
    ],
    "references": [
      {
        "title": "Angular Architecture - Official Documentation",
        "url": "https://angular.dev/guide/architecture",
        "source": "Angular.dev"
      }
    ]
  }
};
