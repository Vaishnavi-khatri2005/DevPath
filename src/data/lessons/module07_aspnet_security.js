/**
 * Pre-generated comprehensive lessons for MODULE_07_LESSONS
 * Sources: Microsoft Learn, ASP.NET Core Guides, EF Core Docs.
 */

export const MODULE_07_LESSONS = {
  "topic-7-1": {
    "id": "topic-7-1",
    "title": "Authentication Concepts",
    "category": "7. ASP.NET Core Security",
    "description": "AuthN vs AuthZ; cookie vs token auth; ASP.NET Core Identity overview",
    "objectives": [
      "Distinguish between Authentication (Who are you?) and Authorization (What are you allowed to do?)",
      "Compare Cookie-based authentication (stateful web apps) with Token-based authentication (stateless APIs)",
      "Understand ASP.NET Core Identity (UserManager, SignInManager, IdentityUser)",
      "Evaluate password hashing security (PBKDF2, bcrypt, Argon2)"
    ],
    "prerequisites": "Web API architecture and controllers.",
    "terminology": [
      {
        "term": "Authentication (AuthN)",
        "definition": "The process of verifying the identity of a user or system (e.g. verifying a password or certificate)."
      },
      {
        "term": "Authorization (AuthZ)",
        "definition": "The process of verifying whether an authenticated user has permission to perform an action or access a resource."
      },
      {
        "term": "Bearer Token",
        "definition": "A security token that grants access to whoever bears (possesses) it, typically passed in the Authorization HTTP header."
      }
    ],
    "concepts": [
      {
        "title": "AuthN vs AuthZ and Token-Based Security",
        "explanation": "REST APIs use stateless token-based authentication (JWT), while traditional server-rendered websites use stateful cookies.",
        "codeSnippet": "// Comparing Token vs Cookie Headers in HTTP\n// Token Authentication (APIs):\n// GET /api/orders HTTP/1.1\n// Host: api.store.com\n// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\n\n// Cookie Authentication (Traditional Web):\n// GET /dashboard HTTP/1.1\n// Host: www.store.com\n// Cookie: .AspNetCore.Identity.Application=CfDJ8N...",
        "language": "http",
        "output": "Bearer tokens transmit stateless identity proofs directly in the Authorization header.",
        "lineExplanation": [
          "Bearer tokens allow mobile and single-page apps (Angular/React) to access cross-domain APIs without CSRF vulnerabilities."
        ]
      }
    ],
    "diagram": "AuthN vs AuthZ:\n[ Credentials: user + pass ] ---> (Authentication) ---> [ Identity Verified (Token Issued) ]\n                                                                   |\n                                                         (Access /api/admin)\n                                                                   v\n                                                         (Authorization)\n                                                          /           \\\n                                                   (Has Admin Role)   (Lacks Admin Role)\n                                                          |                   |\n                                                      [ 200 OK ]        [ 403 Forbidden ]",
    "realWorldApplication": "Securing web portals, mobile banking backends, and multi-tenant SaaS platforms.",
    "commonErrors": [
      {
        "error": "Confusing 401 Unauthorized with 403 Forbidden",
        "cause": "401 means unauthenticated (missing or invalid token). 403 means authenticated, but lacking required permissions.",
        "fix": "Return 401 when the user needs to log in; return 403 when the user is logged in but denied access."
      }
    ],
    "bestPractices": [
      "Use token-based authentication (JWT) for APIs consumed by mobile and single-page applications.",
      "Never store plaintext passwords; use ASP.NET Core Identity's built-in PBKDF2 hashing.",
      "Return 401 for unauthenticated requests and 403 for unauthorized requests."
    ],
    "practiceQuestions": [
      {
        "question": "What is the difference between a 401 and 403 HTTP response status code?",
        "options": [
          "401 means server crash; 403 means page not found.",
          "401 means Unauthenticated (who are you?); 403 means Forbidden (authenticated, but lacking permissions).",
          "There is no difference.",
          "401 is used for cookies; 403 is used for tokens."
        ],
        "answerIndex": 1,
        "explanation": "401 Unauthorized signals missing or invalid credentials. 403 Forbidden signals that identity is known, but access is denied."
      }
    ],
    "revisionSummary": [
      "AuthN verifies identity; AuthZ verifies permissions.",
      "Token authentication is stateless and cross-domain friendly.",
      "ASP.NET Core Identity provides secure password hashing."
    ],
    "references": [
      {
        "title": "Overview of ASP.NET Core Security - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/security/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-7-2": {
    "id": "topic-7-2",
    "title": "JWT Authentication",
    "category": "7. ASP.NET Core Security",
    "description": "Token structure (header, payload, signature); issuing tokens; validating tokens; symmetric vs asymmetric keys; refresh tokens",
    "objectives": [
      "Understand the three parts of a JSON Web Token: Header, Payload (Claims), and Signature",
      "Issue signed JWT tokens upon successful login using System.IdentityModel.Tokens.Jwt",
      "Configure JwtBearer authentication in Program.cs with TokenValidationParameters",
      "Implement refresh tokens to maintain long-lived sessions securely without prolonged token lifespans"
    ],
    "prerequisites": "Authentication concepts (Topic 7-1).",
    "terminology": [
      {
        "term": "JWT (JSON Web Token)",
        "definition": "A compact, URL-safe means of representing claims to be transferred between two parties, signed with a cryptographic key."
      },
      {
        "term": "Claims",
        "definition": "Name-value statements about a subject (e.g. email, user ID, roles) embedded inside the JWT payload."
      },
      {
        "term": "Refresh Token",
        "definition": "A secure, opaque token stored in the database used to obtain a new short-lived JWT without re-prompting the user for passwords."
      }
    ],
    "concepts": [
      {
        "title": "Generating and Validating JWTs in ASP.NET Core",
        "explanation": "A JWT is composed of three Base64URL-encoded strings separated by dots: header.payload.signature. The signature guarantees the payload was not tampered with.",
        "codeSnippet": "// 1. Issuing a JWT in AuthService\npublic string GenerateJwtToken(string userId, string email, string role, IConfiguration config)\n{\n    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config[\"Jwt:Key\"]!));\n    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);\n\n    var claims = new[]\n    {\n        new Claim(JwtRegisteredClaimNames.Sub, userId),\n        new Claim(JwtRegisteredClaimNames.Email, email),\n        new Claim(ClaimTypes.Role, role),\n        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())\n    };\n\n    var token = new JwtSecurityToken(\n        issuer: config[\"Jwt:Issuer\"],\n        audience: config[\"Jwt:Audience\"],\n        claims: claims,\n        expires: DateTime.UtcNow.AddMinutes(15), // Short lifespan!\n        signingCredentials: credentials);\n\n    return new JwtSecurityTokenHandler().WriteToken(token);\n}\n\n// 2. Validating JWT in Program.cs:\n// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)\n//     .AddJwtBearer(options => {\n//         options.TokenValidationParameters = new TokenValidationParameters {\n//             ValidateIssuer = true,\n//             ValidateAudience = true,\n//             ValidateLifetime = true,\n//             ValidateIssuerSigningKey = true,\n//             ValidIssuer = builder.Configuration[\"Jwt:Issuer\"],\n//             ValidAudience = builder.Configuration[\"Jwt:Audience\"],\n//             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration[\"Jwt:Key\"]!))\n//         };\n//     });",
        "language": "csharp",
        "output": "Produces cryptographically signed JWT token: eyJhbGciOi...eyJzdWIiOi...",
        "lineExplanation": [
          "Line 4: SymmetricSecurityKey holds the secret key used to sign the token with HMAC-SHA256.",
          "Line 7: Claims embed user identity and role directly in the payload.",
          "Line 17: Expiration is kept short (15 minutes); refresh tokens extend the session."
        ]
      }
    ],
    "diagram": "JWT Structure:\n[ HEADER ] (Algorithm & Type)\n    .\n[ PAYLOAD ] (Claims: Sub, Email, Role, Exp)\n    .\n[ SIGNATURE ] (HMAC-SHA256(Header + Payload, SecretKey))",
    "realWorldApplication": "Authenticating single-page web applications (Angular) and mobile clients across microservice clusters without server-side session state.",
    "commonErrors": [
      {
        "error": "Setting JWT expiration to 30 days because handling token refresh is inconvenient",
        "cause": "If a 30-day token is stolen, an attacker has unrestricted access for an entire month with no revocation mechanism.",
        "fix": "Keep JWT access tokens short-lived (10-15 minutes) and implement secure refresh tokens stored in the database."
      }
    ],
    "bestPractices": [
      "Never store sensitive secrets (credit card numbers, passwords) inside the JWT payload (it is Base64 readable, not encrypted).",
      "Use strong signing keys (at least 256 bits / 32 characters).",
      "Validate issuer, audience, signature key, and lifetime on every request."
    ],
    "practiceQuestions": [
      {
        "question": "Is the payload of a standard JWT encrypted or encoded?",
        "options": [
          "It is encrypted with military-grade AES-256 and cannot be read.",
          "It is only Base64URL encoded; anyone who intercepts it can read its claims, though they cannot modify it without breaking the signature.",
          "It is hashed.",
          "It is plain text XML."
        ],
        "answerIndex": 1,
        "explanation": "Standard JWTs are signed, not encrypted. The payload is readable by anyone using Base64 decoding; the signature merely prevents tampering."
      }
    ],
    "revisionSummary": [
      "JWT consists of Header, Payload, and Signature.",
      "The signature prevents payload tampering.",
      "Keep access tokens short-lived and use refresh tokens for continuous sessions."
    ],
    "references": [
      {
        "title": "JWT Bearer authentication in ASP.NET Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/security/authentication/",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-7-3": {
    "id": "topic-7-3",
    "title": "Authorization",
    "category": "7. ASP.NET Core Security",
    "description": "Role-based [Authorize(Roles = \"...\")]; claims-based authorization; policy-based authorization; custom authorization requirements",
    "objectives": [
      "Secure controllers and actions using [Authorize]",
      "Implement Role-Based Access Control (RBAC) with [Authorize(Roles = \"Admin\")]",
      "Build modern Policy-Based Authorization evaluating fine-grained claims",
      "Author custom AuthorizationHandler and IAuthorizationRequirement classes"
    ],
    "prerequisites": "Authentication and JWT (Topics 7-1 and 7-2).",
    "terminology": [
      {
        "term": "RBAC (Role-Based Access Control)",
        "definition": "Restricting system access based on the roles assigned to users (e.g. Admin, Manager, User)."
      },
      {
        "term": "Policy-Based Authorization",
        "definition": "A rich, decoupled model where named policies evaluate claims, roles, or custom business rules."
      }
    ],
    "concepts": [
      {
        "title": "Role and Policy-Based Authorization",
        "explanation": "Policy-based authorization decouples security rules from controller code, allowing complex rules (e.g. MinimumAge or Department membership) to be reused cleanly.",
        "codeSnippet": "// 1. Defining Policies in Program.cs\nbuilder.Services.AddAuthorization(options =>\n{\n    // Role-based policy\n    options.AddPolicy(\"RequireAdminRole\", policy => policy.RequireRole(\"Admin\"));\n\n    // Claims-based custom policy\n    options.AddPolicy(\"MustBeSeniorEngineer\", policy =>\n        policy.RequireClaim(\"Department\", \"Engineering\")\n              .RequireClaim(\"Seniority\", \"Senior\", \"Lead\"));\n});\n\n// 2. Applying policies to Controllers\n[ApiController]\n[Route(\"api/[controller]\")]\npublic class AdminSettingsController : ControllerBase\n{\n    [HttpGet(\"system-health\")]\n    [Authorize(Policy = \"RequireAdminRole\")] // Requires Admin\n    public IActionResult GetHealth() => Ok(\"Healthy\");\n\n    [HttpPost(\"deploy-microservice\")]\n    [Authorize(Policy = \"MustBeSeniorEngineer\")] // Requires Department=Engineering AND Seniority=Senior\n    public IActionResult DeployService() => Ok(\"Deployed\");\n}",
        "language": "csharp",
        "output": "Protects endpoints based on declarative role and claims policies.",
        "lineExplanation": [
          "Line 5: 'RequireRole(\"Admin\")' validates the user's role claim.",
          "Line 9: Multi-claim policy enforces both Department and Seniority requirements.",
          "Line 21: Clean declarative attribute on controller actions."
        ]
      }
    ],
    "diagram": "Policy Authorization Evaluation:\n[ Incoming Request with JWT ] ---> [ Extract Claims from Token ]\n                                                |\n                                   [ Evaluate Policy Requirements ]\n                                      /                   \\\n                              (All Claims Satisfied)    (Missing Claim)\n                                      |                       |\n                               [ 200 OK / Execute ]      [ 403 Forbidden ]",
    "realWorldApplication": "Enforcing tier-based SaaS features (e.g. only 'Enterprise' tier users can access advanced reporting exports).",
    "commonErrors": [
      {
        "error": "Hardcoding role checks inside action bodies with if (!User.IsInRole(\"Admin\"))",
        "cause": "Scatters security logic, violates DRY, and makes testing cumbersome.",
        "fix": "Use declarative [Authorize(Policy = \"...\")] attributes."
      }
    ],
    "bestPractices": [
      "Prefer Policy-based authorization over raw Role strings for maintainability.",
      "Apply [Authorize] at the controller level and [AllowAnonymous] on specific public endpoints if needed.",
      "Combine claims into cohesive permission scopes (e.g. 'orders:read', 'orders:write')."
    ],
    "practiceQuestions": [
      {
        "question": "Why is policy-based authorization preferred over simple role-based authorization in enterprise applications?",
        "options": [
          "Roles are deprecated in .NET 8.",
          "Policies decouple security rules from controllers and allow combining multiple claims, age checks, and custom business requirements into reusable names.",
          "Policies do not require authentication.",
          "Policies compile faster."
        ],
        "answerIndex": 1,
        "explanation": "Policy-based authorization allows combining roles, claims, and complex custom logic into reusable, testable policies."
      }
    ],
    "revisionSummary": [
      "Role-based authorization checks user roles.",
      "Policy-based authorization provides flexible, multi-claim rule evaluation.",
      "Use [Authorize(Policy = \"...\")] for clean declarative protection."
    ],
    "references": [
      {
        "title": "Policy-based authorization in ASP.NET Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/security/authorization/policies",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-7-4": {
    "id": "topic-7-4",
    "title": "API Security Best Practices",
    "category": "7. ASP.NET Core Security",
    "description": "CORS configuration; rate limiting (.NET 7+); input sanitization; HTTPS enforcement; secrets management",
    "objectives": [
      "Configure Cross-Origin Resource Sharing (CORS) securely for frontend clients (Angular)",
      "Implement built-in Rate Limiting (.NET 7+) to prevent denial-of-service and brute-force attacks",
      "Enforce HTTPS redirection and HTTP Strict Transport Security (HSTS)",
      "Protect sensitive credentials in cloud environments using Azure Key Vault or AWS Secrets Manager"
    ],
    "prerequisites": "Web API architecture and JWT authentication.",
    "terminology": [
      {
        "term": "CORS (Cross-Origin Resource Sharing)",
        "definition": "A browser security mechanism that restricts web applications from making HTTP requests to a different domain/origin than the one serving the frontend."
      },
      {
        "term": "Rate Limiting",
        "definition": "Restricting the number of requests a client can make within a specified timeframe (e.g. 100 requests per minute)."
      },
      {
        "term": "HSTS",
        "definition": "HTTP Strict Transport Security; a header informing browsers to communicate exclusively over encrypted HTTPS."
      }
    ],
    "concepts": [
      {
        "title": "Secure CORS and Built-In Rate Limiting",
        "explanation": "Never use AllowAnyOrigin() in production with credentials. In .NET 7+, built-in rate limiting protects against API abuse without third-party packages.",
        "codeSnippet": "using System.Threading.RateLimiting;\n\nvar builder = WebApplication.CreateBuilder(args);\n\n// 1. Secure CORS Policy for Angular Frontend\nbuilder.Services.AddCors(options =>\n{\n    options.AddPolicy(\"AllowAngularDev\", policy =>\n    {\n        policy.WithOrigins(\"http://localhost:4200\", \"https://app.mycompany.com\")\n              .AllowAnyHeader()\n              .AllowAnyMethod()\n              .AllowCredentials(); // Required when sending auth cookies or credentials\n    });\n});\n\n// 2. Built-in Rate Limiting (.NET 7+)\nbuilder.Services.AddRateLimiter(options =>\n{\n    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;\n    options.AddFixedWindowLimiter(\"PublicApiLimiter\", opt =>\n    {\n        opt.PermitLimit = 100; // 100 requests\n        opt.Window = TimeSpan.FromMinutes(1); // per minute\n        opt.QueueLimit = 2;\n    });\n});\n\nvar app = builder.Build();\n\napp.UseHttpsRedirection();\napp.UseCors(\"AllowAngularDev\");\napp.UseRateLimiter(); // Apply rate limiter middleware\n\napp.MapControllers().RequireRateLimiting(\"PublicApiLimiter\");",
        "language": "csharp",
        "output": "Configures secure origin restrictions and throttles abusive traffic with 429 Too Many Requests.",
        "lineExplanation": [
          "Line 10: Explicitly lists trusted origins rather than using dangerous wildcards ('*').",
          "Line 21: Fixed window rate limiter limits users to 100 requests per minute.",
          "Line 34: Middleware throttles excessive traffic and returns HTTP 429."
        ]
      }
    ],
    "diagram": "Defense-in-Depth API Security:\n[ Client Request ]\n       |\n  (HTTPS / HSTS)\n       |\n  (Rate Limiter: <100 req/min?) ---> Exceeded? ---> [ 429 Too Many Requests ]\n       |\n  (CORS: Trusted Origin?)        ---> Untrusted? --> [ CORS Browser Block ]\n       |\n  (Authentication & Authorization)\n       |\n[ Protected API Logic Executed ]",
    "realWorldApplication": "Shielding production payment endpoints, login forms, and customer databases from scraping, brute-force attacks, and credential stuffing.",
    "commonErrors": [
      {
        "error": "Configuring CORS with .AllowAnyOrigin() alongside .AllowCredentials()",
        "cause": "Browsers reject this combination as a severe security vulnerability.",
        "fix": "Explicitly name trusted origins with .WithOrigins(...) when using .AllowCredentials()."
      }
    ],
    "bestPractices": [
      "Always restrict CORS to explicit, whitelisted origins in production.",
      "Apply rate limiting to all public authentication endpoints (login, register, forgot-password).",
      "Enforce HTTPS and enable HSTS in non-development environments."
    ],
    "practiceQuestions": [
      {
        "question": "What HTTP status code is returned when a client exceeds an API rate limit?",
        "options": [
          "401 Unauthorized",
          "403 Forbidden",
          "429 Too Many Requests",
          "503 Service Unavailable"
        ],
        "answerIndex": 2,
        "explanation": "HTTP 429 Too Many Requests is the standard response when an API client exceeds configured rate limits."
      }
    ],
    "revisionSummary": [
      "Whitelist specific origins in CORS.",
      "Use built-in rate limiting (.NET 7+) to stop brute force attacks.",
      "Enforce HTTPS and use managed cloud secret stores."
    ],
    "references": [
      {
        "title": "Enable Cross-Origin Requests (CORS) in ASP.NET Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/security/cors",
        "source": "Microsoft Learn"
      },
      {
        "title": "Rate limiting middleware in ASP.NET Core - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/aspnet/core/performance/rate-limit",
        "source": "Microsoft Learn"
      }
    ]
  }
};
