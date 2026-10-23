/**
 * Pre-generated comprehensive lessons for MODULE_12_LESSONS
 * Sources: MDN Web Docs, TypeScript Official Handbook, W3C Standards.
 */

export const MODULE_12_LESSONS = {
  "topic-12-1": {
    "id": "topic-12-1",
    "title": "Core JavaScript",
    "category": "12. JavaScript Fundamentals",
    "description": "Variables (let, const, var); data types & type coercion; operators; control structures; functions & scope (block, function, global)",
    "objectives": [
      "Understand variable scoping: const and let (block-scoped) vs var (function-scoped / hoisted)",
      "Master JavaScript primitives vs objects and avoid type coercion traps (== vs ===)",
      "Understand lexical scoping, closures, and the call stack",
      "Write clean function declarations, function expressions, and arrow functions"
    ],
    "prerequisites": "Programming basics.",
    "terminology": [
      {
        "term": "Strict Equality (===)",
        "definition": "Compares both value and type without performing implicit type coercion."
      },
      {
        "term": "Hoisting",
        "definition": "JavaScript's default behavior of moving variable and function declarations to the top of their scope before code execution."
      },
      {
        "term": "Temporal Dead Zone (TDZ)",
        "definition": "The period between entering scope and variable declaration where accessing a let/const variable throws a ReferenceError."
      }
    ],
    "concepts": [
      {
        "title": "Variable Scoping and Strict Equality",
        "explanation": "Never use 'var' in modern JavaScript. 'const' prevents reassignment; 'let' is used for mutable counters. Always use '===' to prevent unexpected type coercion.",
        "codeSnippet": "// 1. Scoping: const and let are block-scoped\nconst taxRate = 0.08;\n// taxRate = 0.10; // TypeError: Assignment to constant variable\n\nif (true) {\n    let blockScopedVariable = \"I live only inside this if-block\";\n}\n// console.log(blockScopedVariable); // ReferenceError!\n\n// 2. Strict Equality (===) vs Loose Equality (==)\nconsole.log(0 == false);   // true (Loose: implicit type coercion)\nconsole.log(0 === false);  // false (Strict: number !== boolean)\nconsole.log(\"\" == 0);      // true (Avoid loose equality!)\nconsole.log(\"\" === 0);     // false (Predictable and safe)\n\n// 3. Functions and Lexical Scope\nfunction createCounter() {\n    let count = 0;\n    return () => ++count; // Closure maintains access to 'count'\n}\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2",
        "language": "javascript",
        "output": "true\nfalse\ntrue\nfalse\n1\n2",
        "lineExplanation": [
          "Line 2: 'const' guarantees the identifier cannot be reassigned.",
          "Line 11-14: Strict equality (===) prevents bugs by requiring identical types.",
          "Line 18: The returned arrow function forms a closure over 'count'."
        ]
      }
    ],
    "diagram": "Variable Scoping Comparison:\nvar:   [ Function Scope ] ---> Hoisted to top as undefined (Avoid!)\nlet:   { Block Scope }   ---> Accessible only inside { } (TDZ protected)\nconst: { Block Scope }   ---> Immutable identifier binding",
    "realWorldApplication": "Writing reliable frontend logic in React, Angular, and Node.js without runtime coercion bugs.",
    "commonErrors": [
      {
        "error": "Using loose equality '==' causing unexpected boolean conversions",
        "cause": "JavaScript coerces types (e.g. '0' == 0 evaluates to true).",
        "fix": "Always use strict equality '==='."
      }
    ],
    "bestPractices": [
      "Default to 'const'; only use 'let' when you know the variable will be reassigned.",
      "Never use 'var'.",
      "Always use triple equals '===' and '!=='."
    ],
    "practiceQuestions": [
      {
        "question": "What is the result of 'null == undefined' vs 'null === undefined' in JavaScript?",
        "options": [
          "Both are true.",
          "'null == undefined' is true; 'null === undefined' is false.",
          "Both are false.",
          "Throws a TypeError."
        ],
        "answerIndex": 1,
        "explanation": "Loose equality (==) coerces null and undefined to be equal, but strict equality (===) evaluates to false because their types differ."
      }
    ],
    "revisionSummary": [
      "Use 'const' by default and 'let' for reassignments.",
      "Always use '===' to avoid type coercion bugs.",
      "Closures capture surrounding lexical scope."
    ],
    "references": [
      {
        "title": "JavaScript Guide - MDN Web Docs",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
        "source": "MDN Web Docs"
      }
    ]
  },
  "topic-12-2": {
    "id": "topic-12-2",
    "title": "Modern JavaScript (ES6+)",
    "category": "12. JavaScript Fundamentals",
    "description": "Arrow functions; destructuring; spread/rest operators; template literals; modules (import/export); default parameters",
    "objectives": [
      "Write concise arrow functions and understand lexical 'this' binding",
      "Unpack objects and arrays using Object and Array Destructuring",
      "Manipulate collections immutably using Spread (...) and Rest (...) operators",
      "Organize modular applications using ES Modules (import and export)"
    ],
    "prerequisites": "Core JavaScript (Topic 12-1).",
    "terminology": [
      {
        "term": "Lexical this",
        "definition": "Arrow functions do not bind their own 'this'; they inherit 'this' from the enclosing execution context."
      },
      {
        "term": "Destructuring",
        "definition": "A syntax that allows unpacking values from arrays or properties from objects into distinct variables."
      },
      {
        "term": "Spread Operator (...)",
        "definition": "Expands an iterable (like an array or object) into individual elements or key-value pairs."
      }
    ],
    "concepts": [
      {
        "title": "ES6+ Productivity Features",
        "explanation": "Modern JavaScript idioms eliminate boilerplate and facilitate immutable state updates.",
        "codeSnippet": "// 1. Destructuring with Default Values\nconst user = { id: 101, username: \"dev_alex\", role: \"Developer\" };\nconst { username, role, status = \"Active\" } = user;\nconsole.log(`User: ${username}, Role: ${role}, Status: ${status}`);\n\n// 2. Spread Operator for Immutable Updates (Essential for React & Angular!)\nconst originalUser = { id: 1, name: \"Sarah\", skills: [\"C#\", \"SQL\"] };\nconst updatedUser = {\n    ...originalUser,\n    skills: [...originalUser.skills, \"Angular\"], // Append new skill immutably\n    name: \"Sarah Jenkins\" // Update property\n};\nconsole.log(updatedUser.skills); // [\"C#\", \"SQL\", \"Angular\"]\n\n// 3. Arrow Function with Lexical this\nconst timer = {\n    seconds: 0,\n    start() {\n        // Arrow function retains 'this' pointing to the timer object!\n        setInterval(() => {\n            this.seconds++;\n        }, 1000);\n    }\n};",
        "language": "javascript",
        "output": "User: dev_alex, Role: Developer, Status: Active\n['C#', 'SQL', 'Angular']",
        "lineExplanation": [
          "Line 3: Destructures properties and provides a default value for 'status'.",
          "Line 8-11: Spread operator creates shallow copies, preserving immutability.",
          "Line 18: Arrow function inherits lexical 'this', avoiding legacy 'var self = this' hacks."
        ]
      }
    ],
    "diagram": "Spread Operator:\nOriginal: [ \"C#\", \"SQL\" ]\n               |\nSpread:   [ ...original, \"Angular\" ]\n               v\nNew Array: [ \"C#\", \"SQL\", \"Angular\" ] (Original array is NOT mutated!)",
    "realWorldApplication": "Immutable state management in React (useState) and Angular Signals/NgRx stores.",
    "commonErrors": [
      {
        "error": "Mutating state directly (e.g. user.skills.push('Angular')) instead of spreading",
        "cause": "Direct mutations bypass change detection in React and Angular.",
        "fix": "Always spread into a new object: [...array, newItem]."
      }
    ],
    "bestPractices": [
      "Use template literals (`${val}`) instead of string concatenation (+).",
      "Use destructuring in function parameter lists: const render = ({ title, date }) => ...",
      "Adopt ES Modules (import/export) over CommonJS (require)."
    ],
    "practiceQuestions": [
      {
        "question": "How does the 'this' keyword behave inside an arrow function compared to a traditional function in JavaScript?",
        "options": [
          "It is always undefined.",
          "It binds to the global window object.",
          "It retains the lexical 'this' of its enclosing scope.",
          "It can be rebound using .bind()."
        ],
        "answerIndex": 2,
        "explanation": "Arrow functions do not define their own 'this'; they inherit 'this' from the lexical context where they were created."
      }
    ],
    "revisionSummary": [
      "Arrow functions capture lexical 'this'.",
      "Destructuring simplifies unpacking objects and arrays.",
      "Spread (...) enables safe, immutable updates."
    ],
    "references": [
      {
        "title": "ECMAScript 6 Features - MDN Web Docs",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference",
        "source": "MDN Web Docs"
      }
    ]
  },
  "topic-12-3": {
    "id": "topic-12-3",
    "title": "Asynchronous JavaScript",
    "category": "12. JavaScript Fundamentals",
    "description": "Callbacks & callback hell; Promises (chaining, all, race); async/await; error handling",
    "objectives": [
      "Understand the JavaScript Event Loop, Call Stack, and Microtask Queue",
      "Move from callback-based code to Promise chains (.then, .catch, .finally)",
      "Master async/await syntax for linear, readable asynchronous code",
      "Execute parallel operations with Promise.all() and Promise.allSettled()"
    ],
    "prerequisites": "Core JavaScript and ES6 functions.",
    "terminology": [
      {
        "term": "Event Loop",
        "definition": "The runtime mechanism that coordinates the execution of code, collecting events, and executing queued sub-tasks."
      },
      {
        "term": "Promise",
        "definition": "An object representing the eventual completion (fulfillment) or failure (rejection) of an asynchronous operation."
      },
      {
        "term": "Promise.all",
        "definition": "Executes multiple promises concurrently and resolves when all succeed, or rejects immediately if any single promise fails."
      }
    ],
    "concepts": [
      {
        "title": "Async/Await and Concurrent Promise Execution",
        "explanation": "Async/await turns asynchronous Promise code into readable, synchronous-looking code with try/catch error handling.",
        "codeSnippet": "// Asynchronous fetch with error handling\nasync function loadUserData(userId) {\n    try {\n        const response = await fetch(`https://api.example.com/users/${userId}`);\n        if (!response.ok) {\n            throw new Error(`HTTP error! status: ${response.status}`);\n        }\n        const user = await response.json();\n        return user;\n    } catch (error) {\n        console.error(\"Failed to load user:\", error.message);\n        throw error;\n    }\n}\n\n// Running concurrent requests in parallel with Promise.all\nasync function loadDashboard() {\n    console.log(\"Loading dashboard data concurrently...\");\n    const [user, orders, notifications] = await Promise.all([\n        fetch(\"/api/user\").then(r => r.json()),\n        fetch(\"/api/orders\").then(r => r.json()),\n        fetch(\"/api/notifications\").then(r => r.json())\n    ]);\n    console.log(\"Dashboard ready!\", { user, orders, notifications });\n}",
        "language": "javascript",
        "output": "Loads 3 API endpoints concurrently in parallel rather than sequentially, tripling network speed.",
        "lineExplanation": [
          "Line 4: 'await fetch' yields the main thread until the network response headers arrive.",
          "Line 5: Must verify 'response.ok'; fetch only rejects on network failures, not on 404 or 500 errors!",
          "Line 21: 'Promise.all' fires all three network calls simultaneously."
        ]
      }
    ],
    "diagram": "Event Loop Execution:\n[ Call Stack (Sync code) ] ---> Calls await fetch() ---> Handed to Browser Web API\n          |                                                      |\n    (Empty stack)                                           (I/O complete)\n          ^                                                      |\n          |                                                      v\n  [ Microtask Queue ] <------------------------------- Enqueues resolved promise callback",
    "realWorldApplication": "Fetching REST API data from ASP.NET Core backends to render interactive tables and forms in Angular/React.",
    "commonErrors": [
      {
        "error": "Assuming 'fetch()' throws an exception on HTTP 404 or 500 errors",
        "cause": "fetch() resolves normally on HTTP error status codes; it only rejects if network is offline.",
        "fix": "Always check 'if (!response.ok) throw new Error(...)'."
      }
    ],
    "bestPractices": [
      "Use Promise.all() when requests are independent to execute them concurrently.",
      "Always wrap await calls in try...catch blocks to handle network disconnections.",
      "Check response.ok when using the native fetch() API."
    ],
    "practiceQuestions": [
      {
        "question": "Does the native browser fetch() API reject its promise when the server returns a 404 Not Found status code?",
        "options": [
          "Yes, all 4xx and 5xx status codes reject the promise automatically.",
          "No, the promise resolves successfully; you must check the 'response.ok' boolean property.",
          "It crashes the browser tab.",
          "It depends on the operating system."
        ],
        "answerIndex": 1,
        "explanation": "fetch() only rejects on genuine network failures (e.g. offline). HTTP errors like 404 resolve successfully with response.ok = false."
      }
    ],
    "revisionSummary": [
      "async/await provides clean syntax over Promises.",
      "Check response.ok on fetch() calls.",
      "Use Promise.all() for concurrent parallel operations."
    ],
    "references": [
      {
        "title": "Asynchronous JavaScript - MDN Web Docs",
        "url": "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous",
        "source": "MDN Web Docs"
      }
    ]
  },
  "topic-12-4": {
    "id": "topic-12-4",
    "title": "DOM Manipulation & Events",
    "category": "12. JavaScript Fundamentals",
    "description": "Selecting elements; modifying DOM; event listeners; event bubbling & capturing; event delegation",
    "objectives": [
      "Select DOM elements using document.querySelector and querySelectorAll",
      "Manipulate element properties, textContent, classList, and attributes",
      "Understand the DOM Event Flow: Capturing phase, Target phase, and Bubbling phase",
      "Implement high-performance Event Delegation for dynamic lists"
    ],
    "prerequisites": "HTML and Core JavaScript.",
    "terminology": [
      {
        "term": "DOM (Document Object Model)",
        "definition": "The tree structure representation of HTML elements created by the browser that JavaScript can inspect and manipulate."
      },
      {
        "term": "Event Bubbling",
        "definition": "When an event triggered on a child element propagates upward through its ancestors in the DOM tree."
      },
      {
        "term": "Event Delegation",
        "definition": "A pattern where a single event listener on a parent element handles events from multiple child elements by inspecting e.target."
      }
    ],
    "concepts": [
      {
        "title": "High-Performance Event Delegation",
        "explanation": "Instead of attaching 1,000 separate event listeners to 1,000 list items, attach a single listener to the parent container.",
        "codeSnippet": "// HTML: <ul id=\"todo-list\"><li>Item 1</li><li>Item 2</li>...</ul>\n\nconst todoList = document.getElementById(\"todo-list\");\n\n// Single event listener on parent utilizing Event Bubbling\ntodoList.addEventListener(\"click\", (event) => {\n    // Check if the clicked element matches target selector\n    const item = event.target.closest(\"li\");\n    if (!item || !todoList.contains(item)) return;\n\n    // Toggle completed state\n    item.classList.toggle(\"completed\");\n    console.log(\"Toggled todo item:\", item.textContent);\n});\n\n// Adding new elements dynamically works automatically with zero new listeners needed!\nconst newItem = document.createElement(\"li\");\nnewItem.textContent = \"Item 3 (Dynamic)\";\ntodoList.appendChild(newItem);",
        "language": "javascript",
        "output": "Handles clicks across existing and newly added items with minimal memory usage.",
        "lineExplanation": [
          "Line 6: Single listener attached to container #todo-list.",
          "Line 8: event.target.closest('li') finds the clicked list item even if child icons were clicked.",
          "Line 16: Dynamically appended elements are immediately interactive without adding new event listeners."
        ]
      }
    ],
    "diagram": "Event Bubbling:\n[ <html> ]\n     ^\n[ <body> ]\n     ^\n[ <ul id=\"todo-list\"> ] <=== Event Listener handles event here!\n     ^\n[ <li> (Clicked Target) ]",
    "realWorldApplication": "Powers framework event systems in React and Angular, and handles dynamic table row selections and item deletions.",
    "commonErrors": [
      {
        "error": "Using innerHTML with unsanitized user input (element.innerHTML = userInput)",
        "cause": "Opens catastrophic Cross-Site Scripting (XSS) vulnerabilities.",
        "fix": "Always use 'element.textContent = userInput' or sanitize inputs."
      }
    ],
    "bestPractices": [
      "Use event delegation on lists and tables to save memory.",
      "Use element.classList.add(), remove(), and toggle() instead of editing className strings directly.",
      "Never use innerHTML with dynamic user input."
    ],
    "practiceQuestions": [
      {
        "question": "What is the primary benefit of Event Delegation in JavaScript DOM programming?",
        "options": [
          "It makes the page reload faster.",
          "It uses a single parent listener to handle events for all current and future child elements, saving memory and eliminating redundant listeners.",
          "It prevents CSS from loading.",
          "It encrypts the DOM."
        ],
        "answerIndex": 1,
        "explanation": "Event delegation leverages bubbling to handle events on dynamic children with a single, memory-efficient parent listener."
      }
    ],
    "revisionSummary": [
      "DOM represents HTML elements as objects.",
      "Event bubbling propagates clicks up the DOM tree.",
      "Event delegation provides high-performance event handling."
    ],
    "references": [
      {
        "title": "Introduction to events - MDN Web Docs",
        "url": "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events",
        "source": "MDN Web Docs"
      }
    ]
  },
  "topic-12-5": {
    "id": "topic-12-5",
    "title": "Objects, Arrays & Functional Methods",
    "category": "12. JavaScript Fundamentals",
    "description": "Object methods; array methods (map, filter, reduce, find, some, every); immutability concepts",
    "objectives": [
      "Master functional array transformation methods: map, filter, reduce, find, some, every",
      "Avoid mutating original arrays (prefer immutable operations)",
      "Object inspection using Object.keys(), Object.values(), and Object.entries()",
      "Understand shallow copying vs structuredClone() for deep copies"
    ],
    "prerequisites": "JavaScript fundamentals and arrow functions.",
    "terminology": [
      {
        "term": "Pure Function",
        "definition": "A function that always produces the same output for the same input and produces zero side effects."
      },
      {
        "term": "Immutability",
        "definition": "A pattern where existing data structures are never modified in place; transformations produce new data structures."
      },
      {
        "term": "Array.reduce()",
        "definition": "Executes a reducer function on each element of the array, resulting in a single output value (sum, object map, grouped set)."
      }
    ],
    "concepts": [
      {
        "title": "Functional Data Transformation with map, filter, reduce",
        "explanation": "Functional methods allow chaining declarative operations on collections without writing imperative for-loops.",
        "codeSnippet": "const products = [\n    { id: 1, name: \"Mechanical Keyboard\", price: 120, category: \"Tech\", inStock: true },\n    { id: 2, name: \"Ergonomic Mouse\", price: 80, category: \"Tech\", inStock: false },\n    { id: 3, name: \"Desk Mat\", price: 25, category: \"Accessories\", inStock: true },\n    { id: 4, name: \"USB-C Hub\", price: 45, category: \"Tech\", inStock: true }\n];\n\n// 1. Filter: Available Tech items\nconst availableTech = products.filter(p => p.inStock && p.category === \"Tech\");\n\n// 2. Map: Extract names with formatted prices\nconst productLabels = availableTech.map(p => `${p.name} ($ ${p.price})`);\nconsole.log(\"Labels:\", productLabels);\n\n// 3. Reduce: Calculate total inventory value of in-stock items\nconst totalInventoryValue = products\n    .filter(p => p.inStock)\n    .reduce((accumulator, item) => accumulator + item.price, 0); // 0 is initial value\n\nconsole.log(\"Total In-Stock Value: $\", totalInventoryValue);",
        "language": "javascript",
        "output": "Labels: ['Mechanical Keyboard ($ 120)', 'USB-C Hub ($ 45)']\nTotal In-Stock Value: $ 190",
        "lineExplanation": [
          "Line 9: filter() returns a new array matching the condition.",
          "Line 12: map() transforms objects into an array of formatted strings.",
          "Line 17: reduce() aggregates individual prices into a single sum."
        ]
      }
    ],
    "diagram": "Functional Array Pipeline:\n[ Original Array: 4 items ]\n             |\n      .filter(inStock)\n             v\n[ 3 In-Stock Items ]\n             |\n      .map(item.price)\n             v\n[ 120, 25, 45 ]\n             |\n      .reduce((sum, p) => sum + p, 0)\n             v\n[ Final Total: 190 ]",
    "realWorldApplication": "Filtering and transforming product catalogs, computing shopping cart totals, and reshaping API responses for UI components.",
    "commonErrors": [
      {
        "error": "Using .sort() without realizing it mutates the original array in place",
        "cause": "Array.prototype.sort() mutates the array directly.",
        "fix": "Use modern '.toSorted()' (ES2023) or copy first with '[...array].sort()'."
      }
    ],
    "bestPractices": [
      "Use map, filter, and reduce instead of manual for-loops.",
      "Keep array transformation pipelines immutable.",
      "Use structuredClone(obj) when you need a genuine deep copy."
    ],
    "practiceQuestions": [
      {
        "question": "Which array method returns a single accumulated value from an array of elements?",
        "options": [
          "filter()",
          "map()",
          "reduce()",
          "forEach()"
        ],
        "answerIndex": 2,
        "explanation": "Array.prototype.reduce() accumulates array elements into a single result (number, object, or grouped array)."
      }
    ],
    "revisionSummary": [
      "map transforms elements; filter selects elements.",
      "reduce accumulates elements into a single result.",
      "Keep transformations pure and avoid mutating original collections."
    ],
    "references": [
      {
        "title": "Array Methods - MDN Web Docs",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
        "source": "MDN Web Docs"
      }
    ]
  },
  "topic-12-6": {
    "id": "topic-12-6",
    "title": "Browser APIs & Modern Tooling",
    "category": "12. JavaScript Fundamentals",
    "description": "Fetch API; localStorage & sessionStorage; JSON parsing; npm basics; Vite/Webpack overview",
    "objectives": [
      "Store persistent state using localStorage and sessionStorage",
      "Serialize and parse JSON data safely with JSON.stringify and JSON.parse",
      "Understand modern frontend build tools (Vite, Rollup, Webpack) and HMR",
      "Manage package dependencies with npm and package.json"
    ],
    "prerequisites": "JavaScript core and async concepts.",
    "terminology": [
      {
        "term": "localStorage",
        "definition": "Browser storage that persists data with no expiration date across browser restarts."
      },
      {
        "term": "sessionStorage",
        "definition": "Browser storage that persists data only for the duration of the page session (cleared when tab closes)."
      },
      {
        "term": "Vite",
        "definition": "A modern frontend build tool that leverages native ES modules in the browser for instant server start and lightning-fast Hot Module Replacement (HMR)."
      }
    ],
    "concepts": [
      {
        "title": "Client-Side Persistence with LocalStorage",
        "explanation": "LocalStorage stores key-value string pairs. Objects must be serialized to JSON before storage.",
        "codeSnippet": "// Persistence helper service\nconst StorageService = {\n    save(key, data) {\n        try {\n            const serialized = JSON.stringify(data);\n            localStorage.setItem(key, serialized);\n        } catch (error) {\n            console.error(\"Storage quota exceeded or private mode error:\", error);\n        }\n    },\n\n    load(key, fallback = null) {\n        try {\n            const raw = localStorage.getItem(key);\n            return raw ? JSON.parse(raw) : fallback;\n        } catch (error) {\n            console.error(\"Corrupted JSON in storage:\", error);\n            return fallback;\n        }\n    }\n};\n\n// Usage:\nStorageService.save(\"user_preferences\", { theme: \"dark\", fontSize: 16 });\nconst prefs = StorageService.load(\"user_preferences\");\nconsole.log(\"Loaded Theme:\", prefs?.theme);",
        "language": "javascript",
        "output": "Loaded Theme: dark (Persists across browser refreshes)",
        "lineExplanation": [
          "Line 5: JSON.stringify serializes objects into strings.",
          "Line 14: JSON.parse reconstructs the object graph.",
          "Line 17: Fallback return handles corrupted or missing values gracefully."
        ]
      }
    ],
    "diagram": "Web Storage Options:\nlocalStorage:   Persists indefinitely (~5MB per origin)\nsessionStorage: Persists until tab closes (~5MB per tab)\nCookies:        Sent with every HTTP request (~4KB limit)",
    "realWorldApplication": "Saving user authentication tokens, theme preferences, draft form inputs, and syllabus progress (as in this platform).",
    "commonErrors": [
      {
        "error": "Storing an object directly without JSON.stringify: localStorage.setItem('user', userObj)",
        "cause": "Converts the object to '[object Object]', losing all properties.",
        "fix": "Always pass JSON.stringify(userObj)."
      }
    ],
    "bestPractices": [
      "Always wrap JSON.parse in try...catch blocks to guard against corrupted storage data.",
      "Never store unencrypted passwords or sensitive personal data in localStorage.",
      "Use Vite for modern frontend development due to instant HMR."
    ],
    "practiceQuestions": [
      {
        "question": "What happens to data stored in sessionStorage when the user closes their browser tab?",
        "options": [
          "It persists forever.",
          "It is automatically deleted.",
          "It is uploaded to the server.",
          "It moves to localStorage."
        ],
        "answerIndex": 1,
        "explanation": "sessionStorage is scoped to the lifetime of the browser tab and is cleared immediately when the tab is closed."
      }
    ],
    "revisionSummary": [
      "localStorage persists across restarts; sessionStorage clears on tab close.",
      "Always JSON.stringify before saving and JSON.parse upon loading.",
      "Vite powers fast modern frontend builds."
    ],
    "references": [
      {
        "title": "Window.localStorage - MDN Web Docs",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
        "source": "MDN Web Docs"
      },
      {
        "title": "Vite Official Guide",
        "url": "https://vite.dev/guide/",
        "source": "Vite Docs"
      }
    ]
  },
  "topic-12-7": {
    "id": "topic-12-7",
    "title": "AI Integration in JavaScript Development",
    "category": "12. JavaScript Fundamentals",
    "description": "Generating JavaScript functions with Copilot; debugging runtime errors with AI; transpilation awareness (Babel)",
    "objectives": [
      "Prompt AI to scaffold complex regex, date parsing, and algorithmic JavaScript functions",
      "Use AI to explain and diagnose obscure browser runtime errors (TypeError: Cannot read properties of undefined)",
      "Audit AI JavaScript output for memory leaks (event listeners not removed) and XSS risks",
      "Understand transpilation (Babel/SWC) for legacy browser compatibility"
    ],
    "prerequisites": "JavaScript fundamentals (Topics 12-1 to 12-6).",
    "terminology": [
      {
        "term": "Transpilation",
        "definition": "Translating modern source code (ES2024, TypeScript) into backwards-compatible JavaScript that older browsers can execute."
      }
    ],
    "concepts": [
      {
        "title": "Auditing AI JavaScript for Security and Memory Leaks",
        "explanation": "AI often produces functional code that introduces severe security vulnerabilities or leaks event listener references.",
        "codeSnippet": "// INSECURE AI OUTPUT:\n// function renderProfile(user) {\n//     document.getElementById(\"profile\").innerHTML = \"<h3>\" + user.bio + \"</h3>\"; // XSS Hazard!\n// }\n\n// AUDITED & SECURE IMPLEMENTATION:\nfunction renderProfile(user) {\n    const container = document.getElementById(\"profile\");\n    if (!container) return;\n\n    const heading = document.createElement(\"h3\");\n    heading.textContent = user.bio; // Safe! Automatically escapes all HTML entities\n    container.replaceChildren(heading);\n}",
        "language": "javascript",
        "output": "Protects against Cross-Site Scripting (XSS) attacks by using textContent.",
        "lineExplanation": [
          "Line 9: textContent guarantees that malicious <script> tags injected by attackers are treated as literal text rather than executable markup."
        ]
      }
    ],
    "diagram": "AI JavaScript Code Audit:\n1. Does it use innerHTML with dynamic data? (Change to textContent to stop XSS)\n2. Does it use '==' instead of '==='? (Enforce strict equality)\n3. Are event listeners removed when components unmount? (Prevent memory leaks)",
    "realWorldApplication": "Quickly authoring complex date calculations, currency formatting, and form validation utilities with AI assistance.",
    "commonErrors": [
      {
        "error": "Accepting AI code that mutates input arguments directly",
        "cause": "Violates immutability principles and creates bugs in UI frameworks.",
        "fix": "Instruct AI: 'Return a new array/object without mutating arguments'."
      }
    ],
    "bestPractices": [
      "Audit all DOM manipulation code for XSS vulnerabilities.",
      "Check for proper cleanup of timers (clearInterval) and event listeners.",
      "Specify modern ECMAScript standards in prompts."
    ],
    "practiceQuestions": [
      {
        "question": "Why should you avoid using innerHTML when rendering dynamic user data suggested by AI?",
        "options": [
          "It runs slowly on mobile phones.",
          "It opens the application to Cross-Site Scripting (XSS) attacks if the data contains malicious HTML or scripts.",
          "innerHTML is deprecated.",
          "It only works with numbers."
        ],
        "answerIndex": 1,
        "explanation": "innerHTML evaluates arbitrary HTML and JavaScript, enabling Cross-Site Scripting (XSS) attacks. Use textContent instead."
      }
    ],
    "revisionSummary": [
      "AI accelerates utility function development.",
      "Audit output for XSS hazards and strict equality.",
      "Ensure immutability is preserved."
    ],
    "references": [
      {
        "title": "Cross-Site Scripting (XSS) Prevention - OWASP",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
        "source": "OWASP"
      }
    ]
  }
};
