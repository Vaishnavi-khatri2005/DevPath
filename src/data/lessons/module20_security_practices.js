/**
 * Pre-generated comprehensive lessons for MODULE_20_LESSONS
 * Sources: Microsoft Learn Microservices, Docker Docs, OWASP Foundation.
 */

export const MODULE_20_LESSONS = {
  "topic-20-1": {
    "id": "topic-20-1",
    "title": "OWASP Top 10 & Application Security",
    "category": "20. Security Practices",
    "description": "OWASP Top 10 : Top vulnerabilities with C# and JavaScript/TypeScript examples; what AI tools commonly get wrong",
    "objectives": [
      "Master the OWASP Top 10 Web Application Security Risks",
      "Mitigate Injection attacks (SQLi), Broken Access Control, and Cryptographic Failures",
      "Prevent Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF)",
      "Audit AI-generated code for common security anti-patterns"
    ],
    "prerequisites": "Web APIs, Security, and JavaScript.",
    "terminology": [
      {
        "term": "OWASP",
        "definition": "Open Worldwide Application Security Project; an online community providing free articles, methodologies, and standards for web security."
      },
      {
        "term": "Broken Access Control",
        "definition": "The #1 OWASP vulnerability where users can act outside their intended permissions (e.g. accessing another customer's invoice by changing the URL ID)."
      },
      {
        "term": "XSS (Cross-Site Scripting)",
        "definition": "Injecting malicious client-side scripts into web pages viewed by other users."
      }
    ],
    "concepts": [
      {
        "title": "Mitigating Broken Access Control (BOLA/IDOR)",
        "explanation": "Broken Object Level Authorization (IDOR) happens when an API accepts an ID from a client without verifying that the currently logged-in user owns that record.",
        "codeSnippet": "// VULNERABLE CODE (IDOR / Broken Access Control):\n// [HttpGet(\"invoices/{invoiceId}\")]\n// public async Task<IActionResult> GetInvoice(int invoiceId) {\n//     return Ok(await _db.Invoices.FindAsync(invoiceId)); // Flaw: Any user can read ANY invoice!\n// }\n\n// SECURE CODE: Enforces Resource-Based Ownership Validation\n[Authorize]\n[HttpGet(\"invoices/{invoiceId}\")]\npublic async Task<IActionResult> GetInvoice(int invoiceId)\n{\n    var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);\n\n    // Verify both the invoice ID AND ownership by the active user!\n    var invoice = await _db.Invoices\n        .FirstOrDefaultAsync(i => i.Id == invoiceId && i.UserId == currentUserId);\n\n    if (invoice == null)\n        return NotFound(); // Return 404 to avoid leaking invoice existence\n\n    return Ok(invoice);\n}",
        "language": "csharp",
        "output": "Protects against IDOR/BOLA attacks by enforcing ownership checks at query time.",
        "lineExplanation": [
          "Line 15: Scopes the database query to the current authenticated user ID.",
          "Line 18: Returns 404 rather than 403 to prevent attackers from discovering valid invoice IDs through probing."
        ]
      }
    ],
    "diagram": "Broken Object Level Authorization (BOLA) Attack:\nAttacker logs in as User A (Id: 101)\nAttacker requests: GET /api/invoices/9999 (Belongs to User B!)\nVulnerable API: Returns User B's private invoice!\nSecure API: Checks (InvoiceId == 9999 AND UserId == 101) -> Returns 404 NotFound!",
    "realWorldApplication": "Protecting medical records, financial balances, and personally identifiable information (PII) against unauthorized data breaches.",
    "commonErrors": [
      {
        "error": "Assuming authentication equals authorization",
        "cause": "Checking only that the user is logged in ([Authorize]), but failing to verify whether they have rights to the specific record requested.",
        "fix": "Always verify tenant/user ownership in database query predicates."
      }
    ],
    "bestPractices": [
      "Enforce authorization checks on every single state-modifying and data-retrieval endpoint.",
      "Sanitize and encode all dynamic user data rendered in HTML to prevent XSS.",
      "Store passwords using modern salted adaptive hashing (ASP.NET Core Identity PBKDF2/Argon2)."
    ],
    "practiceQuestions": [
      {
        "question": "What is currently ranked as the #1 most critical web application security risk in the OWASP Top 10?",
        "options": [
          "SQL Injection",
          "Broken Access Control",
          "Security Misconfiguration",
          "Cryptographic Failures"
        ],
        "answerIndex": 1,
        "explanation": "Broken Access Control (including IDOR and privilege escalation) is the #1 security risk in the OWASP Top 10."
      }
    ],
    "revisionSummary": [
      "Broken Access Control is the most prevalent web vulnerability.",
      "Always verify that the active user owns the requested entity.",
      "Sanitize inputs to stop injection and XSS."
    ],
    "references": [
      {
        "title": "OWASP Top 10:2021 Overview",
        "url": "https://owasp.org/Top10/",
        "source": "OWASP Foundation"
      }
    ]
  }
};
