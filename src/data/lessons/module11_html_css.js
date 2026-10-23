/**
 * Pre-generated comprehensive lessons for MODULE_11_LESSONS
 * Sources: MDN Web Docs, TypeScript Official Handbook, W3C Standards.
 */

export const MODULE_11_LESSONS = {
  "topic-11-1": {
    "id": "topic-11-1",
    "title": "Semantic HTML5 & Accessibility",
    "category": "11. HTML5 & CSS3 Fundamentals",
    "description": "Document structure; semantic elements (header, nav, main, section, article, aside, footer); accessibility (a11y) basics; forms & validation",
    "objectives": [
      "Master modern semantic document structure (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>)",
      "Understand Web Accessibility (a11y) and WCAG guidelines (alt attributes, ARIA landmarks, keyboard navigation)",
      "Implement accessible HTML5 form controls with native validation constraints",
      "Avoid 'div soup' and inaccessible markup antipatterns"
    ],
    "prerequisites": "Basic web browsing familiarity.",
    "terminology": [
      {
        "term": "Semantic HTML",
        "definition": "Using HTML tags that convey meaning about the content they enclose (e.g. <nav>, <article>) rather than generic presentation (<div>, <span>)."
      },
      {
        "term": "Accessibility (a11y)",
        "definition": "Designing web applications usable by everyone, including people with visual, auditory, motor, or cognitive disabilities."
      },
      {
        "term": "ARIA (Accessible Rich Internet Applications)",
        "definition": "W3C attributes added to HTML to make web content and interactive controls accessible to screen readers."
      }
    ],
    "concepts": [
      {
        "title": "Semantic Document Outline & Accessible Forms",
        "explanation": "Screen readers use semantic tags to build an interactive page landmark outline. Semantic forms provide native browser validation without custom JavaScript.",
        "codeSnippet": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Customer Order Form</title>\n</head>\n<body>\n    <header>\n        <nav aria-label=\"Main Navigation\">\n            <a href=\"/\">Home</a> | <a href=\"/catalog\">Catalog</a>\n        </nav>\n    </header>\n\n    <main>\n        <article>\n            <h1>Place New Order</h1>\n            <form action=\"/api/orders\" method=\"POST\">\n                <div>\n                    <label for=\"cust-email\">Email Address (Required):</label>\n                    <input type=\"email\" id=\"cust-email\" name=\"email\" required autocomplete=\"email\">\n                </div>\n\n                <div>\n                    <label for=\"cust-qty\">Quantity (1 - 100):</label>\n                    <input type=\"number\" id=\"cust-qty\" name=\"quantity\" min=\"1\" max=\"100\" value=\"1\" required>\n                </div>\n\n                <button type=\"submit\">Submit Order</button>\n            </form>\n        </article>\n    </main>\n\n    <footer>\n        <p>&copy; 2026 Enterprise Store. All rights reserved.</p>\n    </footer>\n</body>\n</html>",
        "language": "html",
        "output": "Renders accessible, screen-reader friendly page with built-in browser input validation.",
        "lineExplanation": [
          "Line 10: <nav aria-label=\"...\"> provides screen reader landmarks.",
          "Line 18: <label for=\"cust-email\"> explicitly links text to input id for assistive tech and mobile tap targets.",
          "Line 24: min, max, and required enforce native constraint validation."
        ]
      }
    ],
    "diagram": "Semantic Web Page Layout:\n+---------------------------------------------------+\n| <header> + <nav> (Site Branding & Main Navigation) |\n+---------------------------------------------------+\n| <main>                                            |\n|   <article> (Primary Independent Content)         |\n|   <aside>   (Sidebar / Related Meta Links)        |\n+---------------------------------------------------+\n| <footer> (Copyright, Legal, Contact)              |\n+---------------------------------------------------+",
    "realWorldApplication": "Ensuring commercial websites comply with government accessibility laws (ADA, European Accessibility Act) and rank high in SEO algorithms.",
    "commonErrors": [
      {
        "error": "Using unclickable <div> or <span> as buttons (<div onclick=\"submit()\">Submit</div>)",
        "cause": "Inaccessible via keyboard navigation (Tab/Enter) and invisible to screen readers.",
        "fix": "Always use the native <button type=\"button\"> element."
      }
    ],
    "bestPractices": [
      "Always include an alt attribute on <img> tags (descriptive for photos, empty alt=\"\" for purely decorative graphics).",
      "Always link <label for=\"...\"> with <input id=\"...\">.",
      "Use one and only one <h1> tag per page to establish clear document hierarchy."
    ],
    "practiceQuestions": [
      {
        "question": "Why should you use native <button> elements instead of <div> elements with JavaScript click handlers?",
        "options": [
          "Buttons compile faster.",
          "Native buttons provide built-in keyboard accessibility (Tab, Enter, Spacebar) and assistive screen reader roles automatically.",
          "Divs cannot be styled with CSS.",
          "Buttons are required by HTML4."
        ],
        "answerIndex": 1,
        "explanation": "Native <button> elements provide keyboard navigation and accessibility tree roles automatically without fragile custom JS handlers."
      }
    ],
    "revisionSummary": [
      "Use semantic HTML5 elements (<header>, <main>, <nav>, <article>, <footer>).",
      "Accessibility (a11y) is a legal and ethical requirement.",
      "Always pair <label> with <input>."
    ],
    "references": [
      {
        "title": "HTML: HyperText Markup Language - MDN Web Docs",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTML",
        "source": "MDN Web Docs"
      }
    ]
  },
  "topic-11-2": {
    "id": "topic-11-2",
    "title": "Modern CSS Layouts (Flexbox & Grid)",
    "category": "11. HTML5 & CSS3 Fundamentals",
    "description": "Box model; Flexbox (complete layout guide); CSS Grid (templates, areas); responsive design; media queries; mobile-first",
    "objectives": [
      "Master the CSS Box Model (content, padding, border, margin) and box-sizing: border-box",
      "Build one-dimensional responsive layouts with Flexbox (justify-content, align-items, flex-wrap)",
      "Build two-dimensional application layouts with CSS Grid (grid-template-columns, grid-template-areas)",
      "Implement mobile-first responsive design using modern CSS media queries"
    ],
    "prerequisites": "Semantic HTML (Topic 11-1).",
    "terminology": [
      {
        "term": "Box Model",
        "definition": "The conceptual box wrapping every HTML element composed of content, padding, border, and margin."
      },
      {
        "term": "Flexbox",
        "definition": "A 1-dimensional layout module designed for distributing space and aligning items along a single axis (row or column)."
      },
      {
        "term": "CSS Grid",
        "definition": "A 2-dimensional layout system that handles both rows and columns simultaneously."
      },
      {
        "term": "Mobile-First Design",
        "definition": "Designing for small screens by default and using min-width media queries to enhance layouts as viewport size expands."
      }
    ],
    "concepts": [
      {
        "title": "Modern Flexbox & Grid Dashboard Layout",
        "explanation": "Combining CSS Grid for the macro application shell with Flexbox for component-level alignment produces flexible, responsive designs.",
        "codeSnippet": "/* Global Box Model Reset */\n*, *::before, *::after {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\n/* 2D Application Grid Shell */\n.app-layout {\n    display: grid;\n    grid-template-columns: 280px 1fr;\n    grid-template-rows: 64px 1fr;\n    grid-template-areas:\n        \"sidebar topbar\"\n        \"sidebar main\";\n    min-height: 100vh;\n}\n\n.topbar  { grid-area: topbar; background: #0f172a; }\n.sidebar { grid-area: sidebar; background: #0b1325; }\n.main    { grid-area: main; background: #090d16; padding: 2rem; }\n\n/* 1D Flexbox Component Alignment */\n.header-actions {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 1rem;\n}\n\n/* Mobile-First Responsive Breakpoint */\n@media (max-width: 768px) {\n    .app-layout {\n        grid-template-columns: 1fr;\n        grid-template-areas:\n            \"topbar\"\n            \"main\";\n    }\n    .sidebar { display: none; }\n}",
        "language": "css",
        "output": "Produces responsive application shell adapting seamlessly between desktop and mobile viewports.",
        "lineExplanation": [
          "Line 2: 'box-sizing: border-box' ensures padding and borders are included within element width/height calculations.",
          "Line 9: CSS Grid sets up two-dimensional layout with named grid areas.",
          "Line 22: Flexbox aligns buttons horizontally with even gap spacing.",
          "Line 30: Media query collapses sidebar on mobile screens under 768px."
        ]
      }
    ],
    "diagram": "CSS Grid vs Flexbox:\nCSS Grid (2D: Rows AND Columns):\n+-----------+-------------------------+\n| Sidebar   | Topbar                  |\n|           +-------------------------+\n|           | Main Content Area       |\n+-----------+-------------------------+\n\nFlexbox (1D: Row OR Column):\n[ Button 1 ] <--- gap ---> [ Search Input ] <--- gap ---> [ Profile Avatar ]",
    "realWorldApplication": "Creating modern dashboard interfaces, card grids, navigation bars, and mobile-responsive web applications.",
    "commonErrors": [
      {
        "error": "Forgetting 'box-sizing: border-box'",
        "cause": "Default content-box adds padding to width, causing containers to break and overflow screens.",
        "fix": "Apply '*, *::before, *::after { box-sizing: border-box; }' globally."
      }
    ],
    "bestPractices": [
      "Use CSS Grid for overall page layout and two-dimensional cards.",
      "Use Flexbox for single-axis alignment (navigation items, form actions).",
      "Adopt a mobile-first approach using 'min-width' media queries."
    ],
    "practiceQuestions": [
      {
        "question": "What CSS property ensures that padding and borders are included within an element's total declared width and height?",
        "options": [
          "display: flex",
          "box-sizing: border-box",
          "overflow: hidden",
          "position: relative"
        ],
        "answerIndex": 1,
        "explanation": "'box-sizing: border-box' forces width and height to include content, padding, and border, preventing layout overflows."
      }
    ],
    "revisionSummary": [
      "Set box-sizing: border-box globally.",
      "CSS Grid is 2D (rows + columns); Flexbox is 1D (row or column).",
      "Use media queries for mobile-first responsiveness."
    ],
    "references": [
      {
        "title": "CSS Layout - MDN Web Docs",
        "url": "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout",
        "source": "MDN Web Docs"
      },
      {
        "title": "A Complete Guide to Flexbox - CSS Tricks",
        "url": "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
        "source": "CSS Tricks"
      }
    ]
  },
  "topic-11-3": {
    "id": "topic-11-3",
    "title": "CSS Methodologies & Custom Properties",
    "category": "11. HTML5 & CSS3 Fundamentals",
    "description": "BEM methodology; CSS variables (custom properties); Bootstrap / Tailwind awareness",
    "objectives": [
      "Structure maintainable, collision-free CSS classes using the BEM methodology (Block-Element-Modifier)",
      "Master CSS Custom Properties (CSS Variables) for dark/light theme switching",
      "Understand modern CSS nesting and CSS modules",
      "Evaluate CSS frameworks (Tailwind, Bootstrap) vs custom utility-first stylesheets"
    ],
    "prerequisites": "CSS syntax and box model.",
    "terminology": [
      {
        "term": "BEM (Block, Element, Modifier)",
        "definition": "A naming convention for classes that makes front-end code easier to read and maintain (e.g. .card, .card__title, .card--featured)."
      },
      {
        "term": "CSS Custom Properties (Variables)",
        "definition": "Entities defined with '--' that contain specific values to be reused throughout a document using var(--name)."
      }
    ],
    "concepts": [
      {
        "title": "BEM Naming and Dynamic Theme Variables",
        "explanation": "CSS Custom Properties enable dynamic theming without duplicating stylesheets.",
        "codeSnippet": "/* Design Tokens via CSS Variables */\n:root {\n    --bg-primary: #090d16;\n    --text-color: #f8fafc;\n    --accent-blue: #3b82f6;\n    --radius-md: 8px;\n}\n\n/* Light Theme Override */\n[data-theme=\"light\"] {\n    --bg-primary: #ffffff;\n    --text-color: #0f172a;\n    --accent-blue: #2563eb;\n}\n\n/* BEM Component Styling */\n.card {\n    background-color: var(--bg-primary);\n    color: var(--text-color);\n    border-radius: var(--radius-md);\n    padding: 1.5rem;\n}\n\n.card__title {\n    font-size: 1.25rem;\n    font-weight: 700;\n}\n\n.card--featured {\n    border: 2px solid var(--accent-blue);\n    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);\n}",
        "language": "css",
        "output": "Modular, isolated component styling with instant dark/light mode toggle support.",
        "lineExplanation": [
          "Line 2: Design tokens declared in :root are inherited globally.",
          "Line 17: .card is the Block; .card__title is the Element; .card--featured is the Modifier."
        ]
      }
    ],
    "diagram": "BEM Architecture:\n.card              <--- BLOCK (Standalone entity)\n  .card__header    <--- ELEMENT (Part of block, denoted by __)\n  .card__body      <--- ELEMENT\n.card--highlighted <--- MODIFIER (Variant state, denoted by --)",
    "realWorldApplication": "Architecting large enterprise web design systems (like this platform) with scalable dark/light themes and zero selector specificity collisions.",
    "commonErrors": [
      {
        "error": "Deeply nested selectors (e.g. div.content ul li a span)",
        "cause": "Creates high specificity conflicts that require ugly !important overrides.",
        "fix": "Use single BEM class names (.nav__link) for low, uniform specificity."
      }
    ],
    "bestPractices": [
      "Use CSS Custom Properties for all colors, radii, and spacing tokens.",
      "Adopt BEM naming to prevent style leakage between components.",
      "Avoid using '!important' in stylesheets."
    ],
    "practiceQuestions": [
      {
        "question": "In the BEM naming convention (.btn, .btn__icon, .btn--primary), what does '__' represent?",
        "options": [
          "A modifier",
          "An element that is a child part of the block",
          "A pseudo-class",
          "An ID"
        ],
        "answerIndex": 1,
        "explanation": "Two underscores (__element) signify an Element belonging to a Block in BEM."
      }
    ],
    "revisionSummary": [
      "BEM (Block__Element--Modifier) prevents selector collisions.",
      "CSS Custom Properties (var(--name)) power dynamic dark/light themes.",
      "Keep selector specificity low and uniform."
    ],
    "references": [
      {
        "title": "BEM Methodology",
        "url": "https://en.bem.info/methodology/quick-start/",
        "source": "BEM Official"
      },
      {
        "title": "CSS Custom Properties - MDN Web Docs",
        "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",
        "source": "MDN Web Docs"
      }
    ]
  }
};
