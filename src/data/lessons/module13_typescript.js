/**
 * Pre-generated comprehensive lessons for MODULE_13_LESSONS
 * Sources: MDN Web Docs, TypeScript Official Handbook, W3C Standards.
 */

export const MODULE_13_LESSONS = {
  "topic-13-1": {
    "id": "topic-13-1",
    "title": "TypeScript Fundamentals",
    "category": "13. TypeScript",
    "description": "Types, interfaces, enums; type inference; union & intersection types",
    "objectives": [
      "Understand the benefits of static typing in JavaScript",
      "Declare primitive types, custom types (type alias), and interfaces",
      "Model multi-state data with Union Types (|) and Intersection Types (&)",
      "Leverage type inference to write clean code without redundant annotations"
    ],
    "prerequisites": "Modern JavaScript (Module 12).",
    "terminology": [
      {
        "term": "Static Typing",
        "definition": "Checking types at compile time rather than runtime, eliminating an entire class of bugs before code executes."
      },
      {
        "term": "Type Inference",
        "definition": "TypeScript's ability to automatically deduce the type of a variable based on its assigned value."
      },
      {
        "term": "Union Type (|)",
        "definition": "A type formed from two or more other types, representing values that may be any one of those types."
      }
    ],
    "concepts": [
      {
        "title": "Interfaces and Union Types in TypeScript",
        "explanation": "TypeScript augments JavaScript with a powerful static type system that compiles away entirely into clean JavaScript.",
        "codeSnippet": "// 1. Interface definition\ninterface UserProfile {\n    readonly id: number;\n    name: string;\n    email: string;\n    bio?: string; // Optional property\n}\n\n// 2. Union and Literal Types\ntype LoadingState = \"idle\" | \"loading\" | \"success\" | \"error\";\n\ninterface ApiResponse<T> {\n    state: LoadingState;\n    data: T | null;\n    errorMessage?: string;\n}\n\n// 3. Type inference in action\nconst user: UserProfile = {\n    id: 1,\n    name: \"Alex\",\n    email: \"alex@tech.io\"\n};\n\nfunction renderState(state: LoadingState) {\n    if (state === \"loading\") console.log(\"Spinner active...\");\n}\nrenderState(\"loading\"); // Safe! Passing \"finished\" causes a compile-time error.",
        "language": "typescript",
        "output": "Spinner active... (Compiler prevents invalid string states)",
        "lineExplanation": [
          "Line 3: readonly prevents property reassignment.",
          "Line 6: 'bio?' defines an optional property (can be undefined).",
          "Line 10: 'type LoadingState' restricts values strictly to the four specified string literals."
        ]
      }
    ],
    "diagram": "TypeScript Compilation:\n[ TypeScript Source (.ts) ] ---> (tsc compiler checks types) ---> [ Pure JavaScript (.js) ]\n                                                                        |\n                                                            (Types completely erased at runtime!)",
    "realWorldApplication": "The standard language for all modern Angular applications, enterprise React codebases, and Node.js microservices.",
    "commonErrors": [
      {
        "error": "Overusing the 'any' escape hatch (let data: any;)",
        "cause": "Disables all type checking, forfeiting the entire value of TypeScript.",
        "fix": "Use 'unknown' if type is truly dynamic, and narrow with type guards."
      }
    ],
    "bestPractices": [
      "Enable 'strict: true' in tsconfig.json.",
      "Use interfaces for public API contracts and type aliases for unions and tuples.",
      "Avoid 'any'; use 'unknown' when dealing with unvalidated external JSON payloads."
    ],
    "practiceQuestions": [
      {
        "question": "Do TypeScript types and interfaces exist in the final JavaScript code executed in the browser?",
        "options": [
          "Yes, they are evaluated at runtime by the browser.",
          "No, all types, interfaces, and type annotations are completely stripped (erased) during compilation.",
          "Only interfaces are preserved.",
          "They are converted into HTML tags."
        ],
        "answerIndex": 1,
        "explanation": "TypeScript is purely a compile-time tool; type annotations are erased during compilation, leaving plain JavaScript."
      }
    ],
    "revisionSummary": [
      "TypeScript adds compile-time type safety to JavaScript.",
      "Union types (|) model distinct states cleanly.",
      "Avoid 'any' to preserve type safety guarantees."
    ],
    "references": [
      {
        "title": "TypeScript Handbook - Official Documentation",
        "url": "https://www.typescriptlang.org/docs/handbook/intro.html",
        "source": "TypeScriptLang.org"
      }
    ]
  },
  "topic-13-2": {
    "id": "topic-13-2",
    "title": "Classes & OOP in TypeScript",
    "category": "13. TypeScript",
    "description": "Classes; inheritance; abstract classes; implements vs extends; access modifiers",
    "objectives": [
      "Implement OOP classes with parameter properties and access modifiers (public, private, protected, readonly)",
      "Understand 'implements' (contract conformance) vs 'extends' (class inheritance)",
      "Author abstract classes with shared logic and abstract methods",
      "Compare TypeScript access modifiers with native JavaScript private fields (#field)"
    ],
    "prerequisites": "TypeScript fundamentals (Topic 13-1) and OOP concepts.",
    "terminology": [
      {
        "term": "Parameter Properties",
        "definition": "A TypeScript constructor shorthand that automatically creates and initializes class members from constructor parameters."
      },
      {
        "term": "implements",
        "definition": "Declares that a class satisfies an interface contract."
      },
      {
        "term": "extends",
        "definition": "Creates a subclass that inherits state and behavior from a base class."
      }
    ],
    "concepts": [
      {
        "title": "Parameter Properties and Abstract Classes in TypeScript",
        "explanation": "TypeScript streamlines class authoring with concise parameter properties and strong access control.",
        "codeSnippet": "interface ILogger {\n    log(msg: string): void;\n}\n\nabstract class BaseRepository<T> implements ILogger {\n    // Concise parameter property: automatically creates private readonly field!\n    constructor(protected readonly connectionString: string) {}\n\n    abstract getById(id: number): Promise<T | null>;\n\n    log(msg: string): void {\n        console.log(`[DB LOG]: ${msg}`);\n    }\n}\n\nclass UserRepository extends BaseRepository<{ id: number; name: string }> {\n    constructor(connectionString: string) {\n        super(connectionString);\n    }\n\n    async getById(id: number) {\n        this.log(`Fetching user ${id} via ${this.connectionString}`);\n        return { id, name: \"Alice\" };\n    }\n}",
        "language": "typescript",
        "output": "Compiles to robust object-oriented JavaScript class hierarchy.",
        "lineExplanation": [
          "Line 7: 'protected readonly connectionString' defines and assigns the property in one stroke.",
          "Line 9: 'abstract getById' mandates derived implementation.",
          "Line 18: 'super(connectionString)' calls the base class constructor."
        ]
      }
    ],
    "diagram": "implements vs extends:\nInterface [ ILogger ] <... (implements contract) ... [ BaseRepository ]\n                                                            ^\n                                                            | (extends class)\n                                                     [ UserRepository ]",
    "realWorldApplication": "Developing Angular components, services, and injectable data sources.",
    "commonErrors": [
      {
        "error": "Relying on TypeScript 'private' modifier for runtime security",
        "cause": "TS access modifiers are checked only at compile time and disappear in compiled JS.",
        "fix": "Use native JavaScript private fields (#privateField) if genuine runtime privacy is required."
      }
    ],
    "bestPractices": [
      "Use parameter properties to reduce constructor boilerplate.",
      "Prefer implementing interfaces over extending deep base classes.",
      "Mark immutable dependencies as 'readonly'."
    ],
    "practiceQuestions": [
      {
        "question": "What does the constructor syntax 'constructor(private readonly logger: ILogger)' do in TypeScript?",
        "options": [
          "Throws a syntax error.",
          "Declares a private, immutable class member named 'logger' and assigns the constructor argument to it automatically.",
          "Makes the class abstract.",
          "Runs the logger immediately."
        ],
        "answerIndex": 1,
        "explanation": "TypeScript parameter properties automatically declare and assign class members directly from constructor arguments."
      }
    ],
    "revisionSummary": [
      "TypeScript classes support public, private, protected, and readonly.",
      "Parameter properties eliminate redundant field assignments.",
      "implements satisfies contracts; extends inherits behavior."
    ],
    "references": [
      {
        "title": "Classes - TypeScript Handbook",
        "url": "https://www.typescriptlang.org/docs/handbook/2/classes.html",
        "source": "TypeScriptLang.org"
      }
    ]
  },
  "topic-13-3": {
    "id": "topic-13-3",
    "title": "Advanced Types in TypeScript",
    "category": "13. TypeScript",
    "description": "Utility types; type guards; discriminated unions; generics; module declarations",
    "objectives": [
      "Leverage built-in Utility Types: Partial<T>, Required<T>, Readonly<T>, Pick<T, K>, Omit<T, K>",
      "Master Discriminated Unions for exhaustive pattern matching",
      "Author custom Type Guards using the 'is' keyword (x is Type)",
      "Write reusable generic interfaces and functions with constraints"
    ],
    "prerequisites": "TypeScript classes and fundamentals.",
    "terminology": [
      {
        "term": "Discriminated Union",
        "definition": "A pattern where multiple object types share a common literal discriminator property (e.g. 'kind' or 'type'), allowing the compiler to narrow types automatically."
      },
      {
        "term": "Type Guard",
        "definition": "A function returning a type predicate (arg is Type) that narrows variable types within conditional blocks."
      },
      {
        "term": "Partial<T>",
        "definition": "A utility type that returns a new type with all properties of T set to optional."
      }
    ],
    "concepts": [
      {
        "title": "Discriminated Unions and Utility Types",
        "explanation": "Discriminated unions provide compile-time exhaustive checking for multi-state workflows (like Redux/NgRx actions and API states).",
        "codeSnippet": "// 1. Discriminated Union Pattern\ninterface SuccessState {\n    status: \"success\"; // Discriminator\n    data: string[];\n}\n\ninterface ErrorState {\n    status: \"error\"; // Discriminator\n    errorMessage: string;\n}\n\ntype ViewState = SuccessState | ErrorState;\n\nfunction renderView(state: ViewState) {\n    if (state.status === \"success\") {\n        // TypeScript automatically narrows 'state' to SuccessState!\n        console.log(`Loaded ${state.data.length} items.`);\n    } else {\n        // Automatically narrowed to ErrorState!\n        console.error(`Failed: ${state.errorMessage}`);\n    }\n}\n\n// 2. Utility Types: Partial and Pick\ninterface Product {\n    id: number;\n    name: string;\n    price: number;\n    sku: string;\n}\n\n// Update DTO allows updating any subset of properties\ntype UpdateProductDto = Partial<Omit<Product, \"id\">>;",
        "language": "typescript",
        "output": "Exhaustive type narrowing with zero runtime type-casting needed.",
        "lineExplanation": [
          "Line 3 & 8: 'status' acts as the common discriminator literal.",
          "Line 16: The compiler narrows type inside the if block, providing full autocomplete for 'data'.",
          "Line 31: Combines Partial and Omit to create a flexible update DTO."
        ]
      }
    ],
    "diagram": "Discriminated Union Narrowing:\n[ ViewState (status: \"success\" | \"error\") ]\n                   |\n        (if state.status === \"success\")\n            /                     \\\n        [ TRUE ]               [ FALSE ]\n           |                       |\nNarrows to SuccessState!   Narrows to ErrorState!",
    "realWorldApplication": "Architecting NgRx action reducers, handling API responses, and creating reusable form update utilities.",
    "commonErrors": [
      {
        "error": "Type casting with 'as Type' instead of using Type Guards",
        "cause": "Using 'as' tells the compiler to silence warnings even if the object is wrong, risking runtime crashes.",
        "fix": "Use Discriminated Unions or type predicates ('x is Type') to prove types safely."
      }
    ],
    "bestPractices": [
      "Use Discriminated Unions to model application state and API responses.",
      "Use Partial<T> for PATCH update payloads and Pick<T, K> for lightweight projections.",
      "Avoid forced type assertions ('as any') in production code."
    ],
    "practiceQuestions": [
      {
        "question": "What does the utility type 'Omit<User, \"password\">' produce in TypeScript?",
        "options": [
          "A type containing only the password property.",
          "A type containing all properties of User except the password property.",
          "An empty object.",
          "A runtime error."
        ],
        "answerIndex": 1,
        "explanation": "Omit<T, K> constructs a new type by picking all properties from T and removing the specified keys K."
      }
    ],
    "revisionSummary": [
      "Discriminated unions enable exhaustive, safe type narrowing.",
      "Utility types (Partial, Pick, Omit) create derived types efficiently.",
      "Type guards (is) verify types safely at runtime."
    ],
    "references": [
      {
        "title": "Utility Types - TypeScript Handbook",
        "url": "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        "source": "TypeScriptLang.org"
      }
    ]
  },
  "topic-13-4": {
    "id": "topic-13-4",
    "title": "TypeScript Decorators",
    "category": "13. TypeScript",
    "description": "Decorator syntax; class, method, property decorators — essential for Angular",
    "objectives": [
      "Understand decorator syntax (@Decorator) as higher-order meta-programming functions",
      "Explore the four primary decorator types: Class, Method, Property, and Parameter decorators",
      "Recognize how Angular relies on decorators (@Component, @Injectable, @Input, @Output)",
      "Understand the difference between experimental decorators and modern Stage 3 TC39 decorators"
    ],
    "prerequisites": "TypeScript classes and OOP (Topic 13-2).",
    "terminology": [
      {
        "term": "Decorator",
        "definition": "A special declaration attached to a class, method, or property that uses @ syntax to modify or annotate the target at design time."
      },
      {
        "term": "Meta-Programming",
        "definition": "Writing code that treats other code as data, modifying or enhancing behavior declaratively."
      }
    ],
    "concepts": [
      {
        "title": "How Decorators Work: The Foundation of Angular",
        "explanation": "In Angular, decorators are fundamental: @Component turns a class into a visual UI element, and @Injectable registers it with the DI container.",
        "codeSnippet": "// 1. Conceptual Method Decorator: Execution Timer\nfunction LogExecutionTime() {\n    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {\n        const originalMethod = descriptor.value;\n\n        descriptor.value = function (...args: any[]) {\n            console.time(propertyKey);\n            const result = originalMethod.apply(this, args);\n            console.timeEnd(propertyKey);\n            return result;\n        };\n\n        return descriptor;\n    };\n}\n\n// 2. Applying the decorator to a class method\nclass AnalyticsService {\n    @LogExecutionTime()\n    computeStatistics() {\n        // Expensive calculation...\n        for (let i = 0; i < 1_000_000; i++) {}\n        console.log(\"Calculations finished.\");\n    }\n}\n\n// 3. Angular Decorator Preview:\n// @Component({\n//   selector: 'app-user',\n//   template: '<h1>{{ name }}</h1>'\n// })\n// export class UserComponent { ... }",
        "language": "typescript",
        "output": "computeStatistics: 2.14ms\nCalculations finished.",
        "lineExplanation": [
          "Line 2: Decorator factory returns a function that intercepts method execution.",
          "Line 7: Wraps the original method with performance timers.",
          "Line 19: '@LogExecutionTime()' applies the timing behavior transparently without altering method logic."
        ]
      }
    ],
    "diagram": "Decorator Pattern:\n[ Plain Class / Method ] + [ @Decorator Metadata ] ---> [ Enhanced Class with Dependency Injection / UI Template ]",
    "realWorldApplication": "Decorators are the primary syntax mechanism used by Angular, NestJS, and TypeORM for declarative configuration.",
    "commonErrors": [
      {
        "error": "Experimental support for decorators is a feature that is subject to change in a future release",
        "cause": "tsconfig.json does not have experimentalDecorators enabled.",
        "fix": "Add '\"experimentalDecorators\": true' and '\"emitDecoratorMetadata\": true' to tsconfig.json compilerOptions."
      }
    ],
    "bestPractices": [
      "Understand that decorators in Angular attach metadata consumed by the Angular compiler.",
      "Keep custom decorators pure and focused on cross-cutting concerns (logging, validation, timing).",
      "Ensure tsconfig.json has experimentalDecorators enabled when using Angular or NestJS."
    ],
    "practiceQuestions": [
      {
        "question": "Why are decorators so important in the Angular framework?",
        "options": [
          "Angular cannot run without C#.",
          "Decorators (@Component, @Injectable, @Directive) tell the Angular compiler how to process classes, attach HTML templates, and register services with DI.",
          "Decorators make JavaScript run in multithreaded mode.",
          "Decorators convert CSS into TypeScript."
        ],
        "answerIndex": 1,
        "explanation": "Angular relies heavily on decorators to attach component metadata, templates, and dependency injection tokens to TypeScript classes."
      }
    ],
    "revisionSummary": [
      "Decorators use @ syntax to annotate and enhance classes, methods, and properties.",
      "Decorators are the foundation of Angular's component and service architecture.",
      "Enable experimentalDecorators in tsconfig.json."
    ],
    "references": [
      {
        "title": "Decorators - TypeScript Handbook",
        "url": "https://www.typescriptlang.org/docs/handbook/decorators.html",
        "source": "TypeScriptLang.org"
      }
    ]
  }
};
