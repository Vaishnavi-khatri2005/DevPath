import fs from 'fs';

function writeModule(filename, varName, lessons) {
  const content = `/**
 * Pre-generated comprehensive lessons for ${varName}
 * Sources: MDN Web Docs, TypeScript Official Handbook, W3C Standards.
 */

export const ${varName} = ${JSON.stringify(lessons, null, 2)};
`;
  fs.writeFileSync(`src/data/lessons/${filename}`, content);
  console.log(`Generated src/data/lessons/${filename} (${Object.keys(lessons).length} topics)`);
}

// -------------------------------------------------------------
// MODULE 11: HTML5 & CSS3 Fundamentals (3 topics)
// -------------------------------------------------------------
const m11 = {
  "topic-11-1": {
    id: "topic-11-1",
    title: "Semantic HTML5 & Accessibility",
    category: "11. HTML5 & CSS3 Fundamentals",
    description: "Document structure; semantic elements (header, nav, main, section, article, aside, footer); accessibility (a11y) basics; forms & validation",
    objectives: [
      "Master modern semantic document structure (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>)",
      "Understand Web Accessibility (a11y) and WCAG guidelines (alt attributes, ARIA landmarks, keyboard navigation)",
      "Implement accessible HTML5 form controls with native validation constraints",
      "Avoid 'div soup' and inaccessible markup antipatterns"
    ],
    prerequisites: "Basic web browsing familiarity.",
    terminology: [
      { term: "Semantic HTML", definition: "Using HTML tags that convey meaning about the content they enclose (e.g. <nav>, <article>) rather than generic presentation (<div>, <span>)." },
      { term: "Accessibility (a11y)", definition: "Designing web applications usable by everyone, including people with visual, auditory, motor, or cognitive disabilities." },
      { term: "ARIA (Accessible Rich Internet Applications)", definition: "W3C attributes added to HTML to make web content and interactive controls accessible to screen readers." }
    ],
    concepts: [
      {
        title: "Semantic Document Outline & Accessible Forms",
        explanation: "Screen readers use semantic tags to build an interactive page landmark outline. Semantic forms provide native browser validation without custom JavaScript.",
        codeSnippet: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Order Form</title>
</head>
<body>
    <header>
        <nav aria-label="Main Navigation">
            <a href="/">Home</a> | <a href="/catalog">Catalog</a>
        </nav>
    </header>

    <main>
        <article>
            <h1>Place New Order</h1>
            <form action="/api/orders" method="POST">
                <div>
                    <label for="cust-email">Email Address (Required):</label>
                    <input type="email" id="cust-email" name="email" required autocomplete="email">
                </div>

                <div>
                    <label for="cust-qty">Quantity (1 - 100):</label>
                    <input type="number" id="cust-qty" name="quantity" min="1" max="100" value="1" required>
                </div>

                <button type="submit">Submit Order</button>
            </form>
        </article>
    </main>

    <footer>
        <p>&copy; 2026 Enterprise Store. All rights reserved.</p>
    </footer>
</body>
</html>`,
        language: "html",
        output: "Renders accessible, screen-reader friendly page with built-in browser input validation.",
        lineExplanation: [
          "Line 10: <nav aria-label=\"...\"> provides screen reader landmarks.",
          "Line 18: <label for=\"cust-email\"> explicitly links text to input id for assistive tech and mobile tap targets.",
          "Line 24: min, max, and required enforce native constraint validation."
        ]
      }
    ],
    diagram: `Semantic Web Page Layout:
+---------------------------------------------------+
| <header> + <nav> (Site Branding & Main Navigation) |
+---------------------------------------------------+
| <main>                                            |
|   <article> (Primary Independent Content)         |
|   <aside>   (Sidebar / Related Meta Links)        |
+---------------------------------------------------+
| <footer> (Copyright, Legal, Contact)              |
+---------------------------------------------------+`,
    realWorldApplication: "Ensuring commercial websites comply with government accessibility laws (ADA, European Accessibility Act) and rank high in SEO algorithms.",
    commonErrors: [
      {
        error: "Using unclickable <div> or <span> as buttons (<div onclick=\"submit()\">Submit</div>)",
        cause: "Inaccessible via keyboard navigation (Tab/Enter) and invisible to screen readers.",
        fix: "Always use the native <button type=\"button\"> element."
      }
    ],
    bestPractices: [
      "Always include an alt attribute on <img> tags (descriptive for photos, empty alt=\"\" for purely decorative graphics).",
      "Always link <label for=\"...\"> with <input id=\"...\">.",
      "Use one and only one <h1> tag per page to establish clear document hierarchy."
    ],
    practiceQuestions: [
      {
        question: "Why should you use native <button> elements instead of <div> elements with JavaScript click handlers?",
        options: [
          "Buttons compile faster.",
          "Native buttons provide built-in keyboard accessibility (Tab, Enter, Spacebar) and assistive screen reader roles automatically.",
          "Divs cannot be styled with CSS.",
          "Buttons are required by HTML4."
        ],
        answerIndex: 1,
        explanation: "Native <button> elements provide keyboard navigation and accessibility tree roles automatically without fragile custom JS handlers."
      }
    ],
    revisionSummary: [
      "Use semantic HTML5 elements (<header>, <main>, <nav>, <article>, <footer>).",
      "Accessibility (a11y) is a legal and ethical requirement.",
      "Always pair <label> with <input>."
    ],
    references: [
      { title: "HTML: HyperText Markup Language - MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", source: "MDN Web Docs" }
    ]
  },

  "topic-11-2": {
    id: "topic-11-2",
    title: "Modern CSS Layouts (Flexbox & Grid)",
    category: "11. HTML5 & CSS3 Fundamentals",
    description: "Box model; Flexbox (complete layout guide); CSS Grid (templates, areas); responsive design; media queries; mobile-first",
    objectives: [
      "Master the CSS Box Model (content, padding, border, margin) and box-sizing: border-box",
      "Build one-dimensional responsive layouts with Flexbox (justify-content, align-items, flex-wrap)",
      "Build two-dimensional application layouts with CSS Grid (grid-template-columns, grid-template-areas)",
      "Implement mobile-first responsive design using modern CSS media queries"
    ],
    prerequisites: "Semantic HTML (Topic 11-1).",
    terminology: [
      { term: "Box Model", definition: "The conceptual box wrapping every HTML element composed of content, padding, border, and margin." },
      { term: "Flexbox", definition: "A 1-dimensional layout module designed for distributing space and aligning items along a single axis (row or column)." },
      { term: "CSS Grid", definition: "A 2-dimensional layout system that handles both rows and columns simultaneously." },
      { term: "Mobile-First Design", definition: "Designing for small screens by default and using min-width media queries to enhance layouts as viewport size expands." }
    ],
    concepts: [
      {
        title: "Modern Flexbox & Grid Dashboard Layout",
        explanation: "Combining CSS Grid for the macro application shell with Flexbox for component-level alignment produces flexible, responsive designs.",
        codeSnippet: `/* Global Box Model Reset */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* 2D Application Grid Shell */
.app-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    grid-template-rows: 64px 1fr;
    grid-template-areas:
        "sidebar topbar"
        "sidebar main";
    min-height: 100vh;
}

.topbar  { grid-area: topbar; background: #0f172a; }
.sidebar { grid-area: sidebar; background: #0b1325; }
.main    { grid-area: main; background: #090d16; padding: 2rem; }

/* 1D Flexbox Component Alignment */
.header-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

/* Mobile-First Responsive Breakpoint */
@media (max-width: 768px) {
    .app-layout {
        grid-template-columns: 1fr;
        grid-template-areas:
            "topbar"
            "main";
    }
    .sidebar { display: none; }
}`,
        language: "css",
        output: "Produces responsive application shell adapting seamlessly between desktop and mobile viewports.",
        lineExplanation: [
          "Line 2: 'box-sizing: border-box' ensures padding and borders are included within element width/height calculations.",
          "Line 9: CSS Grid sets up two-dimensional layout with named grid areas.",
          "Line 22: Flexbox aligns buttons horizontally with even gap spacing.",
          "Line 30: Media query collapses sidebar on mobile screens under 768px."
        ]
      }
    ],
    diagram: `CSS Grid vs Flexbox:
CSS Grid (2D: Rows AND Columns):
+-----------+-------------------------+
| Sidebar   | Topbar                  |
|           +-------------------------+
|           | Main Content Area       |
+-----------+-------------------------+

Flexbox (1D: Row OR Column):
[ Button 1 ] <--- gap ---> [ Search Input ] <--- gap ---> [ Profile Avatar ]`,
    realWorldApplication: "Creating modern dashboard interfaces, card grids, navigation bars, and mobile-responsive web applications.",
    commonErrors: [
      {
        error: "Forgetting 'box-sizing: border-box'",
        cause: "Default content-box adds padding to width, causing containers to break and overflow screens.",
        fix: "Apply '*, *::before, *::after { box-sizing: border-box; }' globally."
      }
    ],
    bestPractices: [
      "Use CSS Grid for overall page layout and two-dimensional cards.",
      "Use Flexbox for single-axis alignment (navigation items, form actions).",
      "Adopt a mobile-first approach using 'min-width' media queries."
    ],
    practiceQuestions: [
      {
        question: "What CSS property ensures that padding and borders are included within an element's total declared width and height?",
        options: ["display: flex", "box-sizing: border-box", "overflow: hidden", "position: relative"],
        answerIndex: 1,
        explanation: "'box-sizing: border-box' forces width and height to include content, padding, and border, preventing layout overflows."
      }
    ],
    revisionSummary: [
      "Set box-sizing: border-box globally.",
      "CSS Grid is 2D (rows + columns); Flexbox is 1D (row or column).",
      "Use media queries for mobile-first responsiveness."
    ],
    references: [
      { title: "CSS Layout - MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout", source: "MDN Web Docs" },
      { title: "A Complete Guide to Flexbox - CSS Tricks", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", source: "CSS Tricks" }
    ]
  },

  "topic-11-3": {
    id: "topic-11-3",
    title: "CSS Methodologies & Custom Properties",
    category: "11. HTML5 & CSS3 Fundamentals",
    description: "BEM methodology; CSS variables (custom properties); Bootstrap / Tailwind awareness",
    objectives: [
      "Structure maintainable, collision-free CSS classes using the BEM methodology (Block-Element-Modifier)",
      "Master CSS Custom Properties (CSS Variables) for dark/light theme switching",
      "Understand modern CSS nesting and CSS modules",
      "Evaluate CSS frameworks (Tailwind, Bootstrap) vs custom utility-first stylesheets"
    ],
    prerequisites: "CSS syntax and box model.",
    terminology: [
      { term: "BEM (Block, Element, Modifier)", definition: "A naming convention for classes that makes front-end code easier to read and maintain (e.g. .card, .card__title, .card--featured)." },
      { term: "CSS Custom Properties (Variables)", definition: "Entities defined with '--' that contain specific values to be reused throughout a document using var(--name)." }
    ],
    concepts: [
      {
        title: "BEM Naming and Dynamic Theme Variables",
        explanation: "CSS Custom Properties enable dynamic theming without duplicating stylesheets.",
        codeSnippet: `/* Design Tokens via CSS Variables */
:root {
    --bg-primary: #090d16;
    --text-color: #f8fafc;
    --accent-blue: #3b82f6;
    --radius-md: 8px;
}

/* Light Theme Override */
[data-theme="light"] {
    --bg-primary: #ffffff;
    --text-color: #0f172a;
    --accent-blue: #2563eb;
}

/* BEM Component Styling */
.card {
    background-color: var(--bg-primary);
    color: var(--text-color);
    border-radius: var(--radius-md);
    padding: 1.5rem;
}

.card__title {
    font-size: 1.25rem;
    font-weight: 700;
}

.card--featured {
    border: 2px solid var(--accent-blue);
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
}`,
        language: "css",
        output: "Modular, isolated component styling with instant dark/light mode toggle support.",
        lineExplanation: [
          "Line 2: Design tokens declared in :root are inherited globally.",
          "Line 17: .card is the Block; .card__title is the Element; .card--featured is the Modifier."
        ]
      }
    ],
    diagram: `BEM Architecture:
.card              <--- BLOCK (Standalone entity)
  .card__header    <--- ELEMENT (Part of block, denoted by __)
  .card__body      <--- ELEMENT
.card--highlighted <--- MODIFIER (Variant state, denoted by --)`,
    realWorldApplication: "Architecting large enterprise web design systems (like this platform) with scalable dark/light themes and zero selector specificity collisions.",
    commonErrors: [
      {
        error: "Deeply nested selectors (e.g. div.content ul li a span)",
        cause: "Creates high specificity conflicts that require ugly !important overrides.",
        fix: "Use single BEM class names (.nav__link) for low, uniform specificity."
      }
    ],
    bestPractices: [
      "Use CSS Custom Properties for all colors, radii, and spacing tokens.",
      "Adopt BEM naming to prevent style leakage between components.",
      "Avoid using '!important' in stylesheets."
    ],
    practiceQuestions: [
      {
        question: "In the BEM naming convention (.btn, .btn__icon, .btn--primary), what does '__' represent?",
        options: ["A modifier", "An element that is a child part of the block", "A pseudo-class", "An ID"],
        answerIndex: 1,
        explanation: "Two underscores (__element) signify an Element belonging to a Block in BEM."
      }
    ],
    revisionSummary: [
      "BEM (Block__Element--Modifier) prevents selector collisions.",
      "CSS Custom Properties (var(--name)) power dynamic dark/light themes.",
      "Keep selector specificity low and uniform."
    ],
    references: [
      { title: "BEM Methodology", url: "https://en.bem.info/methodology/quick-start/", source: "BEM Official" },
      { title: "CSS Custom Properties - MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties", source: "MDN Web Docs" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 12: JavaScript Fundamentals (7 topics)
// -------------------------------------------------------------
const m12 = {
  "topic-12-1": {
    id: "topic-12-1",
    title: "Core JavaScript",
    category: "12. JavaScript Fundamentals",
    description: "Variables (let, const, var); data types & type coercion; operators; control structures; functions & scope (block, function, global)",
    objectives: [
      "Understand variable scoping: const and let (block-scoped) vs var (function-scoped / hoisted)",
      "Master JavaScript primitives vs objects and avoid type coercion traps (== vs ===)",
      "Understand lexical scoping, closures, and the call stack",
      "Write clean function declarations, function expressions, and arrow functions"
    ],
    prerequisites: "Programming basics.",
    terminology: [
      { term: "Strict Equality (===)", definition: "Compares both value and type without performing implicit type coercion." },
      { term: "Hoisting", definition: "JavaScript's default behavior of moving variable and function declarations to the top of their scope before code execution." },
      { term: "Temporal Dead Zone (TDZ)", definition: "The period between entering scope and variable declaration where accessing a let/const variable throws a ReferenceError." }
    ],
    concepts: [
      {
        title: "Variable Scoping and Strict Equality",
        explanation: "Never use 'var' in modern JavaScript. 'const' prevents reassignment; 'let' is used for mutable counters. Always use '===' to prevent unexpected type coercion.",
        codeSnippet: `// 1. Scoping: const and let are block-scoped
const taxRate = 0.08;
// taxRate = 0.10; // TypeError: Assignment to constant variable

if (true) {
    let blockScopedVariable = "I live only inside this if-block";
}
// console.log(blockScopedVariable); // ReferenceError!

// 2. Strict Equality (===) vs Loose Equality (==)
console.log(0 == false);   // true (Loose: implicit type coercion)
console.log(0 === false);  // false (Strict: number !== boolean)
console.log("" == 0);      // true (Avoid loose equality!)
console.log("" === 0);     // false (Predictable and safe)

// 3. Functions and Lexical Scope
function createCounter() {
    let count = 0;
    return () => ++count; // Closure maintains access to 'count'
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
        language: "javascript",
        output: "true\nfalse\ntrue\nfalse\n1\n2",
        lineExplanation: [
          "Line 2: 'const' guarantees the identifier cannot be reassigned.",
          "Line 11-14: Strict equality (===) prevents bugs by requiring identical types.",
          "Line 18: The returned arrow function forms a closure over 'count'."
        ]
      }
    ],
    diagram: `Variable Scoping Comparison:
var:   [ Function Scope ] ---> Hoisted to top as undefined (Avoid!)
let:   { Block Scope }   ---> Accessible only inside { } (TDZ protected)
const: { Block Scope }   ---> Immutable identifier binding`,
    realWorldApplication: "Writing reliable frontend logic in React, Angular, and Node.js without runtime coercion bugs.",
    commonErrors: [
      {
        error: "Using loose equality '==' causing unexpected boolean conversions",
        cause: "JavaScript coerces types (e.g. '0' == 0 evaluates to true).",
        fix: "Always use strict equality '==='."
      }
    ],
    bestPractices: [
      "Default to 'const'; only use 'let' when you know the variable will be reassigned.",
      "Never use 'var'.",
      "Always use triple equals '===' and '!=='."
    ],
    practiceQuestions: [
      {
        question: "What is the result of 'null == undefined' vs 'null === undefined' in JavaScript?",
        options: [
          "Both are true.",
          "'null == undefined' is true; 'null === undefined' is false.",
          "Both are false.",
          "Throws a TypeError."
        ],
        answerIndex: 1,
        explanation: "Loose equality (==) coerces null and undefined to be equal, but strict equality (===) evaluates to false because their types differ."
      }
    ],
    revisionSummary: [
      "Use 'const' by default and 'let' for reassignments.",
      "Always use '===' to avoid type coercion bugs.",
      "Closures capture surrounding lexical scope."
    ],
    references: [
      { title: "JavaScript Guide - MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", source: "MDN Web Docs" }
    ]
  },

  "topic-12-2": {
    id: "topic-12-2",
    title: "Modern JavaScript (ES6+)",
    category: "12. JavaScript Fundamentals",
    description: "Arrow functions; destructuring; spread/rest operators; template literals; modules (import/export); default parameters",
    objectives: [
      "Write concise arrow functions and understand lexical 'this' binding",
      "Unpack objects and arrays using Object and Array Destructuring",
      "Manipulate collections immutably using Spread (...) and Rest (...) operators",
      "Organize modular applications using ES Modules (import and export)"
    ],
    prerequisites: "Core JavaScript (Topic 12-1).",
    terminology: [
      { term: "Lexical this", definition: "Arrow functions do not bind their own 'this'; they inherit 'this' from the enclosing execution context." },
      { term: "Destructuring", definition: "A syntax that allows unpacking values from arrays or properties from objects into distinct variables." },
      { term: "Spread Operator (...)", definition: "Expands an iterable (like an array or object) into individual elements or key-value pairs." }
    ],
    concepts: [
      {
        title: "ES6+ Productivity Features",
        explanation: "Modern JavaScript idioms eliminate boilerplate and facilitate immutable state updates.",
        codeSnippet: `// 1. Destructuring with Default Values
const user = { id: 101, username: "dev_alex", role: "Developer" };
const { username, role, status = "Active" } = user;
console.log(\`User: \${username}, Role: \${role}, Status: \${status}\`);

// 2. Spread Operator for Immutable Updates (Essential for React & Angular!)
const originalUser = { id: 1, name: "Sarah", skills: ["C#", "SQL"] };
const updatedUser = {
    ...originalUser,
    skills: [...originalUser.skills, "Angular"], // Append new skill immutably
    name: "Sarah Jenkins" // Update property
};
console.log(updatedUser.skills); // ["C#", "SQL", "Angular"]

// 3. Arrow Function with Lexical this
const timer = {
    seconds: 0,
    start() {
        // Arrow function retains 'this' pointing to the timer object!
        setInterval(() => {
            this.seconds++;
        }, 1000);
    }
};`,
        language: "javascript",
        output: "User: dev_alex, Role: Developer, Status: Active\n['C#', 'SQL', 'Angular']",
        lineExplanation: [
          "Line 3: Destructures properties and provides a default value for 'status'.",
          "Line 8-11: Spread operator creates shallow copies, preserving immutability.",
          "Line 18: Arrow function inherits lexical 'this', avoiding legacy 'var self = this' hacks."
        ]
      }
    ],
    diagram: `Spread Operator:
Original: [ "C#", "SQL" ]
               |
Spread:   [ ...original, "Angular" ]
               v
New Array: [ "C#", "SQL", "Angular" ] (Original array is NOT mutated!)`,
    realWorldApplication: "Immutable state management in React (useState) and Angular Signals/NgRx stores.",
    commonErrors: [
      {
        error: "Mutating state directly (e.g. user.skills.push('Angular')) instead of spreading",
        cause: "Direct mutations bypass change detection in React and Angular.",
        fix: "Always spread into a new object: [...array, newItem]."
      }
    ],
    bestPractices: [
      "Use template literals (\`\${val}\`) instead of string concatenation (+).",
      "Use destructuring in function parameter lists: const render = ({ title, date }) => ...",
      "Adopt ES Modules (import/export) over CommonJS (require)."
    ],
    practiceQuestions: [
      {
        question: "How does the 'this' keyword behave inside an arrow function compared to a traditional function in JavaScript?",
        options: [
          "It is always undefined.",
          "It binds to the global window object.",
          "It retains the lexical 'this' of its enclosing scope.",
          "It can be rebound using .bind()."
        ],
        answerIndex: 2,
        explanation: "Arrow functions do not define their own 'this'; they inherit 'this' from the lexical context where they were created."
      }
    ],
    revisionSummary: [
      "Arrow functions capture lexical 'this'.",
      "Destructuring simplifies unpacking objects and arrays.",
      "Spread (...) enables safe, immutable updates."
    ],
    references: [
      { title: "ECMAScript 6 Features - MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference", source: "MDN Web Docs" }
    ]
  },

  "topic-12-3": {
    id: "topic-12-3",
    title: "Asynchronous JavaScript",
    category: "12. JavaScript Fundamentals",
    description: "Callbacks & callback hell; Promises (chaining, all, race); async/await; error handling",
    objectives: [
      "Understand the JavaScript Event Loop, Call Stack, and Microtask Queue",
      "Move from callback-based code to Promise chains (.then, .catch, .finally)",
      "Master async/await syntax for linear, readable asynchronous code",
      "Execute parallel operations with Promise.all() and Promise.allSettled()"
    ],
    prerequisites: "Core JavaScript and ES6 functions.",
    terminology: [
      { term: "Event Loop", definition: "The runtime mechanism that coordinates the execution of code, collecting events, and executing queued sub-tasks." },
      { term: "Promise", definition: "An object representing the eventual completion (fulfillment) or failure (rejection) of an asynchronous operation." },
      { term: "Promise.all", definition: "Executes multiple promises concurrently and resolves when all succeed, or rejects immediately if any single promise fails." }
    ],
    concepts: [
      {
        title: "Async/Await and Concurrent Promise Execution",
        explanation: "Async/await turns asynchronous Promise code into readable, synchronous-looking code with try/catch error handling.",
        codeSnippet: `// Asynchronous fetch with error handling
async function loadUserData(userId) {
    try {
        const response = await fetch(\`https://api.example.com/users/\${userId}\`);
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Failed to load user:", error.message);
        throw error;
    }
}

// Running concurrent requests in parallel with Promise.all
async function loadDashboard() {
    console.log("Loading dashboard data concurrently...");
    const [user, orders, notifications] = await Promise.all([
        fetch("/api/user").then(r => r.json()),
        fetch("/api/orders").then(r => r.json()),
        fetch("/api/notifications").then(r => r.json())
    ]);
    console.log("Dashboard ready!", { user, orders, notifications });
}`,
        language: "javascript",
        output: "Loads 3 API endpoints concurrently in parallel rather than sequentially, tripling network speed.",
        lineExplanation: [
          "Line 4: 'await fetch' yields the main thread until the network response headers arrive.",
          "Line 5: Must verify 'response.ok'; fetch only rejects on network failures, not on 404 or 500 errors!",
          "Line 21: 'Promise.all' fires all three network calls simultaneously."
        ]
      }
    ],
    diagram: `Event Loop Execution:
[ Call Stack (Sync code) ] ---> Calls await fetch() ---> Handed to Browser Web API
          |                                                      |
    (Empty stack)                                           (I/O complete)
          ^                                                      |
          |                                                      v
  [ Microtask Queue ] <------------------------------- Enqueues resolved promise callback`,
    realWorldApplication: "Fetching REST API data from ASP.NET Core backends to render interactive tables and forms in Angular/React.",
    commonErrors: [
      {
        error: "Assuming 'fetch()' throws an exception on HTTP 404 or 500 errors",
        cause: "fetch() resolves normally on HTTP error status codes; it only rejects if network is offline.",
        fix: "Always check 'if (!response.ok) throw new Error(...)'."
      }
    ],
    bestPractices: [
      "Use Promise.all() when requests are independent to execute them concurrently.",
      "Always wrap await calls in try...catch blocks to handle network disconnections.",
      "Check response.ok when using the native fetch() API."
    ],
    practiceQuestions: [
      {
        question: "Does the native browser fetch() API reject its promise when the server returns a 404 Not Found status code?",
        options: [
          "Yes, all 4xx and 5xx status codes reject the promise automatically.",
          "No, the promise resolves successfully; you must check the 'response.ok' boolean property.",
          "It crashes the browser tab.",
          "It depends on the operating system."
        ],
        answerIndex: 1,
        explanation: "fetch() only rejects on genuine network failures (e.g. offline). HTTP errors like 404 resolve successfully with response.ok = false."
      }
    ],
    revisionSummary: [
      "async/await provides clean syntax over Promises.",
      "Check response.ok on fetch() calls.",
      "Use Promise.all() for concurrent parallel operations."
    ],
    references: [
      { title: "Asynchronous JavaScript - MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous", source: "MDN Web Docs" }
    ]
  },

  "topic-12-4": {
    id: "topic-12-4",
    title: "DOM Manipulation & Events",
    category: "12. JavaScript Fundamentals",
    description: "Selecting elements; modifying DOM; event listeners; event bubbling & capturing; event delegation",
    objectives: [
      "Select DOM elements using document.querySelector and querySelectorAll",
      "Manipulate element properties, textContent, classList, and attributes",
      "Understand the DOM Event Flow: Capturing phase, Target phase, and Bubbling phase",
      "Implement high-performance Event Delegation for dynamic lists"
    ],
    prerequisites: "HTML and Core JavaScript.",
    terminology: [
      { term: "DOM (Document Object Model)", definition: "The tree structure representation of HTML elements created by the browser that JavaScript can inspect and manipulate." },
      { term: "Event Bubbling", definition: "When an event triggered on a child element propagates upward through its ancestors in the DOM tree." },
      { term: "Event Delegation", definition: "A pattern where a single event listener on a parent element handles events from multiple child elements by inspecting e.target." }
    ],
    concepts: [
      {
        title: "High-Performance Event Delegation",
        explanation: "Instead of attaching 1,000 separate event listeners to 1,000 list items, attach a single listener to the parent container.",
        codeSnippet: `// HTML: <ul id="todo-list"><li>Item 1</li><li>Item 2</li>...</ul>

const todoList = document.getElementById("todo-list");

// Single event listener on parent utilizing Event Bubbling
todoList.addEventListener("click", (event) => {
    // Check if the clicked element matches target selector
    const item = event.target.closest("li");
    if (!item || !todoList.contains(item)) return;

    // Toggle completed state
    item.classList.toggle("completed");
    console.log("Toggled todo item:", item.textContent);
});

// Adding new elements dynamically works automatically with zero new listeners needed!
const newItem = document.createElement("li");
newItem.textContent = "Item 3 (Dynamic)";
todoList.appendChild(newItem);`,
        language: "javascript",
        output: "Handles clicks across existing and newly added items with minimal memory usage.",
        lineExplanation: [
          "Line 6: Single listener attached to container #todo-list.",
          "Line 8: event.target.closest('li') finds the clicked list item even if child icons were clicked.",
          "Line 16: Dynamically appended elements are immediately interactive without adding new event listeners."
        ]
      }
    ],
    diagram: `Event Bubbling:
[ <html> ]
     ^
[ <body> ]
     ^
[ <ul id="todo-list"> ] <=== Event Listener handles event here!
     ^
[ <li> (Clicked Target) ]`,
    realWorldApplication: "Powers framework event systems in React and Angular, and handles dynamic table row selections and item deletions.",
    commonErrors: [
      {
        error: "Using innerHTML with unsanitized user input (element.innerHTML = userInput)",
        cause: "Opens catastrophic Cross-Site Scripting (XSS) vulnerabilities.",
        fix: "Always use 'element.textContent = userInput' or sanitize inputs."
      }
    ],
    bestPractices: [
      "Use event delegation on lists and tables to save memory.",
      "Use element.classList.add(), remove(), and toggle() instead of editing className strings directly.",
      "Never use innerHTML with dynamic user input."
    ],
    practiceQuestions: [
      {
        question: "What is the primary benefit of Event Delegation in JavaScript DOM programming?",
        options: [
          "It makes the page reload faster.",
          "It uses a single parent listener to handle events for all current and future child elements, saving memory and eliminating redundant listeners.",
          "It prevents CSS from loading.",
          "It encrypts the DOM."
        ],
        answerIndex: 1,
        explanation: "Event delegation leverages bubbling to handle events on dynamic children with a single, memory-efficient parent listener."
      }
    ],
    revisionSummary: [
      "DOM represents HTML elements as objects.",
      "Event bubbling propagates clicks up the DOM tree.",
      "Event delegation provides high-performance event handling."
    ],
    references: [
      { title: "Introduction to events - MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events", source: "MDN Web Docs" }
    ]
  },

  "topic-12-5": {
    id: "topic-12-5",
    title: "Objects, Arrays & Functional Methods",
    category: "12. JavaScript Fundamentals",
    description: "Object methods; array methods (map, filter, reduce, find, some, every); immutability concepts",
    objectives: [
      "Master functional array transformation methods: map, filter, reduce, find, some, every",
      "Avoid mutating original arrays (prefer immutable operations)",
      "Object inspection using Object.keys(), Object.values(), and Object.entries()",
      "Understand shallow copying vs structuredClone() for deep copies"
    ],
    prerequisites: "JavaScript fundamentals and arrow functions.",
    terminology: [
      { term: "Pure Function", definition: "A function that always produces the same output for the same input and produces zero side effects." },
      { term: "Immutability", definition: "A pattern where existing data structures are never modified in place; transformations produce new data structures." },
      { term: "Array.reduce()", definition: "Executes a reducer function on each element of the array, resulting in a single output value (sum, object map, grouped set)." }
    ],
    concepts: [
      {
        title: "Functional Data Transformation with map, filter, reduce",
        explanation: "Functional methods allow chaining declarative operations on collections without writing imperative for-loops.",
        codeSnippet: `const products = [
    { id: 1, name: "Mechanical Keyboard", price: 120, category: "Tech", inStock: true },
    { id: 2, name: "Ergonomic Mouse", price: 80, category: "Tech", inStock: false },
    { id: 3, name: "Desk Mat", price: 25, category: "Accessories", inStock: true },
    { id: 4, name: "USB-C Hub", price: 45, category: "Tech", inStock: true }
];

// 1. Filter: Available Tech items
const availableTech = products.filter(p => p.inStock && p.category === "Tech");

// 2. Map: Extract names with formatted prices
const productLabels = availableTech.map(p => \`\${p.name} ($ \${p.price})\`);
console.log("Labels:", productLabels);

// 3. Reduce: Calculate total inventory value of in-stock items
const totalInventoryValue = products
    .filter(p => p.inStock)
    .reduce((accumulator, item) => accumulator + item.price, 0); // 0 is initial value

console.log("Total In-Stock Value: $", totalInventoryValue);`,
        language: "javascript",
        output: "Labels: ['Mechanical Keyboard ($ 120)', 'USB-C Hub ($ 45)']\nTotal In-Stock Value: $ 190",
        lineExplanation: [
          "Line 9: filter() returns a new array matching the condition.",
          "Line 12: map() transforms objects into an array of formatted strings.",
          "Line 17: reduce() aggregates individual prices into a single sum."
        ]
      }
    ],
    diagram: `Functional Array Pipeline:
[ Original Array: 4 items ]
             |
      .filter(inStock)
             v
[ 3 In-Stock Items ]
             |
      .map(item.price)
             v
[ 120, 25, 45 ]
             |
      .reduce((sum, p) => sum + p, 0)
             v
[ Final Total: 190 ]`,
    realWorldApplication: "Filtering and transforming product catalogs, computing shopping cart totals, and reshaping API responses for UI components.",
    commonErrors: [
      {
        error: "Using .sort() without realizing it mutates the original array in place",
        cause: "Array.prototype.sort() mutates the array directly.",
        fix: "Use modern '.toSorted()' (ES2023) or copy first with '[...array].sort()'."
      }
    ],
    bestPractices: [
      "Use map, filter, and reduce instead of manual for-loops.",
      "Keep array transformation pipelines immutable.",
      "Use structuredClone(obj) when you need a genuine deep copy."
    ],
    practiceQuestions: [
      {
        question: "Which array method returns a single accumulated value from an array of elements?",
        options: ["filter()", "map()", "reduce()", "forEach()"],
        answerIndex: 2,
        explanation: "Array.prototype.reduce() accumulates array elements into a single result (number, object, or grouped array)."
      }
    ],
    revisionSummary: [
      "map transforms elements; filter selects elements.",
      "reduce accumulates elements into a single result.",
      "Keep transformations pure and avoid mutating original collections."
    ],
    references: [
      { title: "Array Methods - MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array", source: "MDN Web Docs" }
    ]
  },

  "topic-12-6": {
    id: "topic-12-6",
    title: "Browser APIs & Modern Tooling",
    category: "12. JavaScript Fundamentals",
    description: "Fetch API; localStorage & sessionStorage; JSON parsing; npm basics; Vite/Webpack overview",
    objectives: [
      "Store persistent state using localStorage and sessionStorage",
      "Serialize and parse JSON data safely with JSON.stringify and JSON.parse",
      "Understand modern frontend build tools (Vite, Rollup, Webpack) and HMR",
      "Manage package dependencies with npm and package.json"
    ],
    prerequisites: "JavaScript core and async concepts.",
    terminology: [
      { term: "localStorage", definition: "Browser storage that persists data with no expiration date across browser restarts." },
      { term: "sessionStorage", definition: "Browser storage that persists data only for the duration of the page session (cleared when tab closes)." },
      { term: "Vite", definition: "A modern frontend build tool that leverages native ES modules in the browser for instant server start and lightning-fast Hot Module Replacement (HMR)." }
    ],
    concepts: [
      {
        title: "Client-Side Persistence with LocalStorage",
        explanation: "LocalStorage stores key-value string pairs. Objects must be serialized to JSON before storage.",
        codeSnippet: `// Persistence helper service
const StorageService = {
    save(key, data) {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(key, serialized);
        } catch (error) {
            console.error("Storage quota exceeded or private mode error:", error);
        }
    },

    load(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            console.error("Corrupted JSON in storage:", error);
            return fallback;
        }
    }
};

// Usage:
StorageService.save("user_preferences", { theme: "dark", fontSize: 16 });
const prefs = StorageService.load("user_preferences");
console.log("Loaded Theme:", prefs?.theme);`,
        language: "javascript",
        output: "Loaded Theme: dark (Persists across browser refreshes)",
        lineExplanation: [
          "Line 5: JSON.stringify serializes objects into strings.",
          "Line 14: JSON.parse reconstructs the object graph.",
          "Line 17: Fallback return handles corrupted or missing values gracefully."
        ]
      }
    ],
    diagram: `Web Storage Options:
localStorage:   Persists indefinitely (~5MB per origin)
sessionStorage: Persists until tab closes (~5MB per tab)
Cookies:        Sent with every HTTP request (~4KB limit)`,
    realWorldApplication: "Saving user authentication tokens, theme preferences, draft form inputs, and syllabus progress (as in this platform).",
    commonErrors: [
      {
        error: "Storing an object directly without JSON.stringify: localStorage.setItem('user', userObj)",
        cause: "Converts the object to '[object Object]', losing all properties.",
        fix: "Always pass JSON.stringify(userObj)."
      }
    ],
    bestPractices: [
      "Always wrap JSON.parse in try...catch blocks to guard against corrupted storage data.",
      "Never store unencrypted passwords or sensitive personal data in localStorage.",
      "Use Vite for modern frontend development due to instant HMR."
    ],
    practiceQuestions: [
      {
        question: "What happens to data stored in sessionStorage when the user closes their browser tab?",
        options: [
          "It persists forever.",
          "It is automatically deleted.",
          "It is uploaded to the server.",
          "It moves to localStorage."
        ],
        answerIndex: 1,
        explanation: "sessionStorage is scoped to the lifetime of the browser tab and is cleared immediately when the tab is closed."
      }
    ],
    revisionSummary: [
      "localStorage persists across restarts; sessionStorage clears on tab close.",
      "Always JSON.stringify before saving and JSON.parse upon loading.",
      "Vite powers fast modern frontend builds."
    ],
    references: [
      { title: "Window.localStorage - MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage", source: "MDN Web Docs" },
      { title: "Vite Official Guide", url: "https://vite.dev/guide/", source: "Vite Docs" }
    ]
  },

  "topic-12-7": {
    id: "topic-12-7",
    title: "AI Integration in JavaScript Development",
    category: "12. JavaScript Fundamentals",
    description: "Generating JavaScript functions with Copilot; debugging runtime errors with AI; transpilation awareness (Babel)",
    objectives: [
      "Prompt AI to scaffold complex regex, date parsing, and algorithmic JavaScript functions",
      "Use AI to explain and diagnose obscure browser runtime errors (TypeError: Cannot read properties of undefined)",
      "Audit AI JavaScript output for memory leaks (event listeners not removed) and XSS risks",
      "Understand transpilation (Babel/SWC) for legacy browser compatibility"
    ],
    prerequisites: "JavaScript fundamentals (Topics 12-1 to 12-6).",
    terminology: [
      { term: "Transpilation", definition: "Translating modern source code (ES2024, TypeScript) into backwards-compatible JavaScript that older browsers can execute." }
    ],
    concepts: [
      {
        title: "Auditing AI JavaScript for Security and Memory Leaks",
        explanation: "AI often produces functional code that introduces severe security vulnerabilities or leaks event listener references.",
        codeSnippet: `// INSECURE AI OUTPUT:
// function renderProfile(user) {
//     document.getElementById("profile").innerHTML = "<h3>" + user.bio + "</h3>"; // XSS Hazard!
// }

// AUDITED & SECURE IMPLEMENTATION:
function renderProfile(user) {
    const container = document.getElementById("profile");
    if (!container) return;

    const heading = document.createElement("h3");
    heading.textContent = user.bio; // Safe! Automatically escapes all HTML entities
    container.replaceChildren(heading);
}`,
        language: "javascript",
        output: "Protects against Cross-Site Scripting (XSS) attacks by using textContent.",
        lineExplanation: [
          "Line 9: textContent guarantees that malicious <script> tags injected by attackers are treated as literal text rather than executable markup."
        ]
      }
    ],
    diagram: `AI JavaScript Code Audit:
1. Does it use innerHTML with dynamic data? (Change to textContent to stop XSS)
2. Does it use '==' instead of '==='? (Enforce strict equality)
3. Are event listeners removed when components unmount? (Prevent memory leaks)`,
    realWorldApplication: "Quickly authoring complex date calculations, currency formatting, and form validation utilities with AI assistance.",
    commonErrors: [
      {
        error: "Accepting AI code that mutates input arguments directly",
        cause: "Violates immutability principles and creates bugs in UI frameworks.",
        fix: "Instruct AI: 'Return a new array/object without mutating arguments'."
      }
    ],
    bestPractices: [
      "Audit all DOM manipulation code for XSS vulnerabilities.",
      "Check for proper cleanup of timers (clearInterval) and event listeners.",
      "Specify modern ECMAScript standards in prompts."
    ],
    practiceQuestions: [
      {
        question: "Why should you avoid using innerHTML when rendering dynamic user data suggested by AI?",
        options: [
          "It runs slowly on mobile phones.",
          "It opens the application to Cross-Site Scripting (XSS) attacks if the data contains malicious HTML or scripts.",
          "innerHTML is deprecated.",
          "It only works with numbers."
        ],
        answerIndex: 1,
        explanation: "innerHTML evaluates arbitrary HTML and JavaScript, enabling Cross-Site Scripting (XSS) attacks. Use textContent instead."
      }
    ],
    revisionSummary: [
      "AI accelerates utility function development.",
      "Audit output for XSS hazards and strict equality.",
      "Ensure immutability is preserved."
    ],
    references: [
      { title: "Cross-Site Scripting (XSS) Prevention - OWASP", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html", source: "OWASP" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 13: TypeScript (4 topics)
// -------------------------------------------------------------
const m13 = {
  "topic-13-1": {
    id: "topic-13-1",
    title: "TypeScript Fundamentals",
    category: "13. TypeScript",
    description: "Types, interfaces, enums; type inference; union & intersection types",
    objectives: [
      "Understand the benefits of static typing in JavaScript",
      "Declare primitive types, custom types (type alias), and interfaces",
      "Model multi-state data with Union Types (|) and Intersection Types (&)",
      "Leverage type inference to write clean code without redundant annotations"
    ],
    prerequisites: "Modern JavaScript (Module 12).",
    terminology: [
      { term: "Static Typing", definition: "Checking types at compile time rather than runtime, eliminating an entire class of bugs before code executes." },
      { term: "Type Inference", definition: "TypeScript's ability to automatically deduce the type of a variable based on its assigned value." },
      { term: "Union Type (|)", definition: "A type formed from two or more other types, representing values that may be any one of those types." }
    ],
    concepts: [
      {
        title: "Interfaces and Union Types in TypeScript",
        explanation: "TypeScript augments JavaScript with a powerful static type system that compiles away entirely into clean JavaScript.",
        codeSnippet: `// 1. Interface definition
interface UserProfile {
    readonly id: number;
    name: string;
    email: string;
    bio?: string; // Optional property
}

// 2. Union and Literal Types
type LoadingState = "idle" | "loading" | "success" | "error";

interface ApiResponse<T> {
    state: LoadingState;
    data: T | null;
    errorMessage?: string;
}

// 3. Type inference in action
const user: UserProfile = {
    id: 1,
    name: "Alex",
    email: "alex@tech.io"
};

function renderState(state: LoadingState) {
    if (state === "loading") console.log("Spinner active...");
}
renderState("loading"); // Safe! Passing "finished" causes a compile-time error.`,
        language: "typescript",
        output: "Spinner active... (Compiler prevents invalid string states)",
        lineExplanation: [
          "Line 3: readonly prevents property reassignment.",
          "Line 6: 'bio?' defines an optional property (can be undefined).",
          "Line 10: 'type LoadingState' restricts values strictly to the four specified string literals."
        ]
      }
    ],
    diagram: `TypeScript Compilation:
[ TypeScript Source (.ts) ] ---> (tsc compiler checks types) ---> [ Pure JavaScript (.js) ]
                                                                        |
                                                            (Types completely erased at runtime!)`,
    realWorldApplication: "The standard language for all modern Angular applications, enterprise React codebases, and Node.js microservices.",
    commonErrors: [
      {
        error: "Overusing the 'any' escape hatch (let data: any;)",
        cause: "Disables all type checking, forfeiting the entire value of TypeScript.",
        fix: "Use 'unknown' if type is truly dynamic, and narrow with type guards."
      }
    ],
    bestPractices: [
      "Enable 'strict: true' in tsconfig.json.",
      "Use interfaces for public API contracts and type aliases for unions and tuples.",
      "Avoid 'any'; use 'unknown' when dealing with unvalidated external JSON payloads."
    ],
    practiceQuestions: [
      {
        question: "Do TypeScript types and interfaces exist in the final JavaScript code executed in the browser?",
        options: [
          "Yes, they are evaluated at runtime by the browser.",
          "No, all types, interfaces, and type annotations are completely stripped (erased) during compilation.",
          "Only interfaces are preserved.",
          "They are converted into HTML tags."
        ],
        answerIndex: 1,
        explanation: "TypeScript is purely a compile-time tool; type annotations are erased during compilation, leaving plain JavaScript."
      }
    ],
    revisionSummary: [
      "TypeScript adds compile-time type safety to JavaScript.",
      "Union types (|) model distinct states cleanly.",
      "Avoid 'any' to preserve type safety guarantees."
    ],
    references: [
      { title: "TypeScript Handbook - Official Documentation", url: "https://www.typescriptlang.org/docs/handbook/intro.html", source: "TypeScriptLang.org" }
    ]
  },

  "topic-13-2": {
    id: "topic-13-2",
    title: "Classes & OOP in TypeScript",
    category: "13. TypeScript",
    description: "Classes; inheritance; abstract classes; implements vs extends; access modifiers",
    objectives: [
      "Implement OOP classes with parameter properties and access modifiers (public, private, protected, readonly)",
      "Understand 'implements' (contract conformance) vs 'extends' (class inheritance)",
      "Author abstract classes with shared logic and abstract methods",
      "Compare TypeScript access modifiers with native JavaScript private fields (#field)"
    ],
    prerequisites: "TypeScript fundamentals (Topic 13-1) and OOP concepts.",
    terminology: [
      { term: "Parameter Properties", definition: "A TypeScript constructor shorthand that automatically creates and initializes class members from constructor parameters." },
      { term: "implements", definition: "Declares that a class satisfies an interface contract." },
      { term: "extends", definition: "Creates a subclass that inherits state and behavior from a base class." }
    ],
    concepts: [
      {
        title: "Parameter Properties and Abstract Classes in TypeScript",
        explanation: "TypeScript streamlines class authoring with concise parameter properties and strong access control.",
        codeSnippet: `interface ILogger {
    log(msg: string): void;
}

abstract class BaseRepository<T> implements ILogger {
    // Concise parameter property: automatically creates private readonly field!
    constructor(protected readonly connectionString: string) {}

    abstract getById(id: number): Promise<T | null>;

    log(msg: string): void {
        console.log(\`[DB LOG]: \${msg}\`);
    }
}

class UserRepository extends BaseRepository<{ id: number; name: string }> {
    constructor(connectionString: string) {
        super(connectionString);
    }

    async getById(id: number) {
        this.log(\`Fetching user \${id} via \${this.connectionString}\`);
        return { id, name: "Alice" };
    }
}`,
        language: "typescript",
        output: "Compiles to robust object-oriented JavaScript class hierarchy.",
        lineExplanation: [
          "Line 7: 'protected readonly connectionString' defines and assigns the property in one stroke.",
          "Line 9: 'abstract getById' mandates derived implementation.",
          "Line 18: 'super(connectionString)' calls the base class constructor."
        ]
      }
    ],
    diagram: `implements vs extends:
Interface [ ILogger ] <... (implements contract) ... [ BaseRepository ]
                                                            ^
                                                            | (extends class)
                                                     [ UserRepository ]`,
    realWorldApplication: "Developing Angular components, services, and injectable data sources.",
    commonErrors: [
      {
        error: "Relying on TypeScript 'private' modifier for runtime security",
        cause: "TS access modifiers are checked only at compile time and disappear in compiled JS.",
        fix: "Use native JavaScript private fields (#privateField) if genuine runtime privacy is required."
      }
    ],
    bestPractices: [
      "Use parameter properties to reduce constructor boilerplate.",
      "Prefer implementing interfaces over extending deep base classes.",
      "Mark immutable dependencies as 'readonly'."
    ],
    practiceQuestions: [
      {
        question: "What does the constructor syntax 'constructor(private readonly logger: ILogger)' do in TypeScript?",
        options: [
          "Throws a syntax error.",
          "Declares a private, immutable class member named 'logger' and assigns the constructor argument to it automatically.",
          "Makes the class abstract.",
          "Runs the logger immediately."
        ],
        answerIndex: 1,
        explanation: "TypeScript parameter properties automatically declare and assign class members directly from constructor arguments."
      }
    ],
    revisionSummary: [
      "TypeScript classes support public, private, protected, and readonly.",
      "Parameter properties eliminate redundant field assignments.",
      "implements satisfies contracts; extends inherits behavior."
    ],
    references: [
      { title: "Classes - TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/2/classes.html", source: "TypeScriptLang.org" }
    ]
  },

  "topic-13-3": {
    id: "topic-13-3",
    title: "Advanced Types in TypeScript",
    category: "13. TypeScript",
    description: "Utility types; type guards; discriminated unions; generics; module declarations",
    objectives: [
      "Leverage built-in Utility Types: Partial<T>, Required<T>, Readonly<T>, Pick<T, K>, Omit<T, K>",
      "Master Discriminated Unions for exhaustive pattern matching",
      "Author custom Type Guards using the 'is' keyword (x is Type)",
      "Write reusable generic interfaces and functions with constraints"
    ],
    prerequisites: "TypeScript classes and fundamentals.",
    terminology: [
      { term: "Discriminated Union", definition: "A pattern where multiple object types share a common literal discriminator property (e.g. 'kind' or 'type'), allowing the compiler to narrow types automatically." },
      { term: "Type Guard", definition: "A function returning a type predicate (arg is Type) that narrows variable types within conditional blocks." },
      { term: "Partial<T>", definition: "A utility type that returns a new type with all properties of T set to optional." }
    ],
    concepts: [
      {
        title: "Discriminated Unions and Utility Types",
        explanation: "Discriminated unions provide compile-time exhaustive checking for multi-state workflows (like Redux/NgRx actions and API states).",
        codeSnippet: `// 1. Discriminated Union Pattern
interface SuccessState {
    status: "success"; // Discriminator
    data: string[];
}

interface ErrorState {
    status: "error"; // Discriminator
    errorMessage: string;
}

type ViewState = SuccessState | ErrorState;

function renderView(state: ViewState) {
    if (state.status === "success") {
        // TypeScript automatically narrows 'state' to SuccessState!
        console.log(\`Loaded \${state.data.length} items.\`);
    } else {
        // Automatically narrowed to ErrorState!
        console.error(\`Failed: \${state.errorMessage}\`);
    }
}

// 2. Utility Types: Partial and Pick
interface Product {
    id: number;
    name: string;
    price: number;
    sku: string;
}

// Update DTO allows updating any subset of properties
type UpdateProductDto = Partial<Omit<Product, "id">>;`,
        language: "typescript",
        output: "Exhaustive type narrowing with zero runtime type-casting needed.",
        lineExplanation: [
          "Line 3 & 8: 'status' acts as the common discriminator literal.",
          "Line 16: The compiler narrows type inside the if block, providing full autocomplete for 'data'.",
          "Line 31: Combines Partial and Omit to create a flexible update DTO."
        ]
      }
    ],
    diagram: `Discriminated Union Narrowing:
[ ViewState (status: "success" | "error") ]
                   |
        (if state.status === "success")
            /                     \\
        [ TRUE ]               [ FALSE ]
           |                       |
Narrows to SuccessState!   Narrows to ErrorState!`,
    realWorldApplication: "Architecting NgRx action reducers, handling API responses, and creating reusable form update utilities.",
    commonErrors: [
      {
        error: "Type casting with 'as Type' instead of using Type Guards",
        cause: "Using 'as' tells the compiler to silence warnings even if the object is wrong, risking runtime crashes.",
        fix: "Use Discriminated Unions or type predicates ('x is Type') to prove types safely."
      }
    ],
    bestPractices: [
      "Use Discriminated Unions to model application state and API responses.",
      "Use Partial<T> for PATCH update payloads and Pick<T, K> for lightweight projections.",
      "Avoid forced type assertions ('as any') in production code."
    ],
    practiceQuestions: [
      {
        question: "What does the utility type 'Omit<User, \"password\">' produce in TypeScript?",
        options: [
          "A type containing only the password property.",
          "A type containing all properties of User except the password property.",
          "An empty object.",
          "A runtime error."
        ],
        answerIndex: 1,
        explanation: "Omit<T, K> constructs a new type by picking all properties from T and removing the specified keys K."
      }
    ],
    revisionSummary: [
      "Discriminated unions enable exhaustive, safe type narrowing.",
      "Utility types (Partial, Pick, Omit) create derived types efficiently.",
      "Type guards (is) verify types safely at runtime."
    ],
    references: [
      { title: "Utility Types - TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/utility-types.html", source: "TypeScriptLang.org" }
    ]
  },

  "topic-13-4": {
    id: "topic-13-4",
    title: "TypeScript Decorators",
    category: "13. TypeScript",
    description: "Decorator syntax; class, method, property decorators — essential for Angular",
    objectives: [
      "Understand decorator syntax (@Decorator) as higher-order meta-programming functions",
      "Explore the four primary decorator types: Class, Method, Property, and Parameter decorators",
      "Recognize how Angular relies on decorators (@Component, @Injectable, @Input, @Output)",
      "Understand the difference between experimental decorators and modern Stage 3 TC39 decorators"
    ],
    prerequisites: "TypeScript classes and OOP (Topic 13-2).",
    terminology: [
      { term: "Decorator", definition: "A special declaration attached to a class, method, or property that uses @ syntax to modify or annotate the target at design time." },
      { term: "Meta-Programming", definition: "Writing code that treats other code as data, modifying or enhancing behavior declaratively." }
    ],
    concepts: [
      {
        title: "How Decorators Work: The Foundation of Angular",
        explanation: "In Angular, decorators are fundamental: @Component turns a class into a visual UI element, and @Injectable registers it with the DI container.",
        codeSnippet: `// 1. Conceptual Method Decorator: Execution Timer
function LogExecutionTime() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.time(propertyKey);
            const result = originalMethod.apply(this, args);
            console.timeEnd(propertyKey);
            return result;
        };

        return descriptor;
    };
}

// 2. Applying the decorator to a class method
class AnalyticsService {
    @LogExecutionTime()
    computeStatistics() {
        // Expensive calculation...
        for (let i = 0; i < 1_000_000; i++) {}
        console.log("Calculations finished.");
    }
}

// 3. Angular Decorator Preview:
// @Component({
//   selector: 'app-user',
//   template: '<h1>{{ name }}</h1>'
// })
// export class UserComponent { ... }`,
        language: "typescript",
        output: "computeStatistics: 2.14ms\nCalculations finished.",
        lineExplanation: [
          "Line 2: Decorator factory returns a function that intercepts method execution.",
          "Line 7: Wraps the original method with performance timers.",
          "Line 19: '@LogExecutionTime()' applies the timing behavior transparently without altering method logic."
        ]
      }
    ],
    diagram: `Decorator Pattern:
[ Plain Class / Method ] + [ @Decorator Metadata ] ---> [ Enhanced Class with Dependency Injection / UI Template ]`,
    realWorldApplication: "Decorators are the primary syntax mechanism used by Angular, NestJS, and TypeORM for declarative configuration.",
    commonErrors: [
      {
        error: "Experimental support for decorators is a feature that is subject to change in a future release",
        cause: "tsconfig.json does not have experimentalDecorators enabled.",
        fix: "Add '\"experimentalDecorators\": true' and '\"emitDecoratorMetadata\": true' to tsconfig.json compilerOptions."
      }
    ],
    bestPractices: [
      "Understand that decorators in Angular attach metadata consumed by the Angular compiler.",
      "Keep custom decorators pure and focused on cross-cutting concerns (logging, validation, timing).",
      "Ensure tsconfig.json has experimentalDecorators enabled when using Angular or NestJS."
    ],
    practiceQuestions: [
      {
        question: "Why are decorators so important in the Angular framework?",
        options: [
          "Angular cannot run without C#.",
          "Decorators (@Component, @Injectable, @Directive) tell the Angular compiler how to process classes, attach HTML templates, and register services with DI.",
          "Decorators make JavaScript run in multithreaded mode.",
          "Decorators convert CSS into TypeScript."
        ],
        answerIndex: 1,
        explanation: "Angular relies heavily on decorators to attach component metadata, templates, and dependency injection tokens to TypeScript classes."
      }
    ],
    revisionSummary: [
      "Decorators use @ syntax to annotate and enhance classes, methods, and properties.",
      "Decorators are the foundation of Angular's component and service architecture.",
      "Enable experimentalDecorators in tsconfig.json."
    ],
    references: [
      { title: "Decorators - TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/decorators.html", source: "TypeScriptLang.org" }
    ]
  }
};

writeModule('module11_html_css.js', 'MODULE_11_LESSONS', m11);
writeModule('module12_javascript.js', 'MODULE_12_LESSONS', m12);
writeModule('module13_typescript.js', 'MODULE_13_LESSONS', m13);
console.log('Batch 4 (Modules 11, 12, 13) complete!');
