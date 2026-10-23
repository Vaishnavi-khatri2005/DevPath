import fs from 'fs';

function writeModule(filename, varName, lessons) {
  const content = `/**
 * Pre-generated comprehensive lessons for ${varName}
 * Sources: Microsoft Learn, xUnit Docs, Clean Code Architecture.
 */

export const ${varName} = ${JSON.stringify(lessons, null, 2)};
`;
  fs.writeFileSync(`src/data/lessons/${filename}`, content);
  console.log(`Generated src/data/lessons/${filename} (${Object.keys(lessons).length} topics)`);
}

// -------------------------------------------------------------
// MODULE 8: Backend Testing & Code Quality (9 topics)
// -------------------------------------------------------------
const m8 = {
  "topic-8-1": {
    id: "topic-8-1",
    title: "Testing Fundamentals",
    category: "8. Backend Testing & Code Quality",
    description: "Unit vs integration vs end-to-end; testing pyramid; AAA pattern (Arrange, Act, Assert); test-driven development (TDD) concepts",
    objectives: [
      "Distinguish between Unit tests, Integration tests, and End-to-End (E2E) tests",
      "Understand the Testing Pyramid and why unit tests form the foundation",
      "Structure test methods strictly using the Arrange-Act-Assert (AAA) pattern",
      "Understand Test-Driven Development (TDD) cycles (Red-Green-Refactor)"
    ],
    prerequisites: "C# Fundamentals and OOP.",
    terminology: [
      { term: "Testing Pyramid", definition: "A strategy recommending a large base of fast, isolated unit tests, fewer integration tests, and very few slow, brittle E2E tests." },
      { term: "AAA Pattern", definition: "Arrange (setup inputs and dependencies), Act (execute the method under test), Assert (verify expected results)." },
      { term: "Red-Green-Refactor", definition: "The TDD cycle: write a failing test (Red), write the minimal code to make it pass (Green), and clean up design (Refactor)." }
    ],
    concepts: [
      {
        title: "The Arrange-Act-Assert (AAA) Pattern",
        explanation: "Every reliable test separates test setup, execution, and verification into three distinct, readable phases.",
        codeSnippet: `public class CalculatorTests
{
    [Fact]
    public void Add_TwoPositiveNumbers_ReturnsCorrectSum()
    {
        // 1. Arrange: Setup variables and system under test
        var calculator = new Calculator();
        int a = 15;
        int b = 25;
        int expectedSum = 40;

        // 2. Act: Call the single method being tested
        int actualSum = calculator.Add(a, b);

        // 3. Assert: Verify outcome
        Assert.Equal(expectedSum, actualSum);
    }
}`,
        language: "csharp",
        output: "Test passes with 100% deterministic result in under 1 millisecond.",
        lineExplanation: [
          "Arrange prepares inputs.",
          "Act executes the single behavior being validated.",
          "Assert verifies that the expectation equals the real output."
        ]
      }
    ],
    diagram: `Testing Pyramid:
       /  E2E Tests  \\     (Slowest, Expensive, Fragile)
      / Integration   \\    (Medium speed, Tests DB & API)
     /   Unit Tests    \\   (Fastest, In-Memory, Massive coverage)`,
    realWorldApplication: "Enforcing quality gates in CI/CD pipelines before code can be merged into production branches.",
    commonErrors: [
      {
        error: "Writing unit tests that connect to live production databases",
        cause: "Makes tests slow, non-deterministic, and dependent on network state.",
        fix: "Mock external dependencies in unit tests; reserve real database tests for integration test suites."
      }
    ],
    bestPractices: [
      "Follow consistent test naming: MethodName_StateUnderTest_ExpectedBehavior.",
      "Keep unit tests independent: one test should never depend on another test having run first.",
      "Aim for high code coverage on core domain business logic."
    ],
    practiceQuestions: [
      {
        question: "What are the three steps of the AAA pattern in automated testing?",
        options: ["Analyze, Code, Test", "Arrange, Act, Assert", "Apply, Check, Accept", "Allocate, Compute, Assert"],
        answerIndex: 1,
        explanation: "AAA stands for Arrange (setup), Act (execute), and Assert (verify)."
      }
    ],
    revisionSummary: [
      "Unit tests are fast and isolated.",
      "The AAA pattern keeps test code readable and maintainable.",
      "Follow Red-Green-Refactor in TDD."
    ],
    references: [
      { title: "Unit testing best practices with .NET - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices", source: "Microsoft Learn" }
    ]
  },

  "topic-8-2": {
    id: "topic-8-2",
    title: "xUnit Framework",
    category: "8. Backend Testing & Code Quality",
    description: "Test classes, [Fact], [Theory], [InlineData]; test lifecycle; assertions (built-in & FluentAssertions)",
    objectives: [
      "Author test suites using xUnit in .NET",
      "Differentiate between single-scenario tests ([Fact]) and parameterized data-driven tests ([Theory])",
      "Supply diverse test data using [InlineData], [MemberData], and [ClassData]",
      "Enhance test readability with FluentAssertions"
    ],
    prerequisites: "Testing fundamentals (Topic 8-1).",
    terminology: [
      { term: "xUnit", definition: "The modern, community-driven testing framework standard in .NET, used by Microsoft for the .NET runtime itself." },
      { term: "[Fact]", definition: "An xUnit attribute that denotes a single invariant test that runs once without arguments." },
      { term: "[Theory]", definition: "An xUnit attribute that denotes a data-driven test that executes multiple times against various datasets." }
    ],
    concepts: [
      {
        title: "Data-Driven Testing with [Theory] and [InlineData]",
        explanation: "Instead of copying and pasting tests for different inputs, use [Theory] to test boundary values and edge cases cleanly in one method.",
        codeSnippet: `using Xunit;
using FluentAssertions;

public class EmailValidatorTests
{
    // [Theory] runs this test 4 times, once for each [InlineData] row!
    [Theory]
    [InlineData("valid@company.com", true)]
    [InlineData("admin@sub.domain.org", true)]
    [InlineData("plainaddress", false)]
    [InlineData("", false)]
    [InlineData(null, false)]
    public void IsValidEmail_VariousInputs_MatchesExpectedValidity(string input, bool expectedResult)
    {
        // Act
        bool result = EmailValidator.IsValidEmail(input);

        // Assert using FluentAssertions for expressive error messages
        result.Should().Be(expectedResult);
    }
}`,
        language: "csharp",
        output: "Passed! 5 data variations executed successfully in 12ms.",
        lineExplanation: [
          "Line 6: [Theory] marks this as a parameterized test.",
          "Line 7-11: [InlineData] passes test arguments and expected outcomes directly into method parameters.",
          "Line 18: 'result.Should().Be(...)' provides natural language assertions via FluentAssertions."
        ]
      }
    ],
    diagram: `xUnit Test Lifecycle:
xUnit creates a brand new test class instance for EVERY test method!
Constructor Runs ---> [ Test Method 1 ] ---> Dispose()
Constructor Runs ---> [ Test Method 2 ] ---> Dispose()
(Zero shared mutable state between tests!)`,
    realWorldApplication: "Validating tax tier calculations, regex inputs, and currency conversions across dozens of input combinations.",
    commonErrors: [
      {
        error: "Sharing mutable fields between tests and causing random failures",
        cause: "xUnit executes tests within a class in parallel by default.",
        fix: "Never use static mutable fields in test classes; use constructor setup and IClassFixture for shared contexts."
      }
    ],
    bestPractices: [
      "Use [Theory] for boundary testing (0, -1, int.MaxValue, null, empty strings).",
      "Adopt FluentAssertions for clean, readable assertion failures.",
      "Run tests automatically in terminal with 'dotnet watch test'."
    ],
    practiceQuestions: [
      {
        question: "In xUnit, which attribute is used to run a test multiple times with different parameter values?",
        options: ["[Fact]", "[Theory]", "[TestCase]", "[DataRow]"],
        answerIndex: 1,
        explanation: "[Theory] is the xUnit attribute for parameterized tests, supplied with data via [InlineData] or [MemberData]."
      }
    ],
    revisionSummary: [
      "Use [Fact] for single tests; [Theory] for parameterized tests.",
      "FluentAssertions creates self-explanatory test failures.",
      "xUnit isolates test instances to prevent test pollution."
    ],
    references: [
      { title: "Getting started with xUnit.net - xUnit Docs", url: "https://xunit.net/docs/getting-started/netcore/cmdline", source: "xUnit.net" }
    ]
  },

  "topic-8-3": {
    id: "topic-8-3",
    title: "Mocking with Moq",
    category: "8. Backend Testing & Code Quality",
    description: "Mocks vs stubs; Mock<T>; Setup, Returns, Verify; mocking interfaces (repositories, external services)",
    objectives: [
      "Isolate the System Under Test (SUT) from external dependencies using Mocks",
      "Create mocks using Moq: Mock<T>, .Setup(), and .ReturnsAsync()",
      "Verify that expected methods were called using .Verify() and Times.Once()",
      "Simulate exceptions and error conditions from external dependencies"
    ],
    prerequisites: "Interfaces (Topic 1-5) and Dependency Injection (Topic 6-4).",
    terminology: [
      { term: "Mock", definition: "A simulated object that mimics the behavior of a real interface, allowing setup of return values and verification of method invocations." },
      { term: "System Under Test (SUT)", definition: "The specific class or method being tested, with all other collaborators replaced by mocks." },
      { term: "Verify", definition: "Asserting that a mock was invoked a specific number of times with expected arguments." }
    ],
    concepts: [
      {
        title: "Testing Business Logic with Moq",
        explanation: "By mocking the repository and notification service interfaces, you can test the OrderService in complete isolation without a live database or email server.",
        codeSnippet: `using Moq;
using Xunit;
using FluentAssertions;

public class OrderServiceTests
{
    [Fact]
    public async Task CheckoutAsync_ValidOrder_SavesOrderAndSendsEmail()
    {
        // 1. Arrange: Create mocks of dependencies
        var mockRepo = new Mock<IOrderRepository>();
        var mockEmail = new Mock<IEmailSender>();

        // Setup mock return behavior
        mockRepo.Setup(r => r.SaveOrderAsync(It.IsAny<Order>()))
                .ReturnsAsync(true);

        // System Under Test (SUT)
        var service = new OrderService(mockRepo.Object, mockEmail.Object);
        var order = new Order { Id = 101, CustomerEmail = "buyer@store.com", Total = 150m };

        // 2. Act
        bool result = await service.CheckoutAsync(order);

        // 3. Assert
        result.Should().BeTrue();

        // Verify mock interactions:
        mockRepo.Verify(r => r.SaveOrderAsync(It.Is<Order>(o => o.Id == 101)), Times.Once);
        mockEmail.Verify(e => e.SendReceiptAsync("buyer@store.com", 150m), Times.Once);
    }
}`,
        language: "csharp",
        output: "Test runs in 4ms; verified exact parameters were passed to collaborators without touching real network.",
        lineExplanation: [
          "Line 11-12: Mock<T> generates dynamic proxy instances implementing the interface.",
          "Line 14: .Setup() configures mock to return true when SaveOrderAsync is called.",
          "Line 28: .Verify() asserts that SaveOrderAsync was called exactly once with order ID 101."
        ]
      }
    ],
    diagram: `Mocking Isolation:
[ Test Suite ]
      |
      v
[ OrderService (SUT) ]
      |-- (Calls SaveOrderAsync) ----> [ Mock<IOrderRepository> ] (Simulated: Returns true)
      +-- (Calls SendReceiptAsync) --> [ Mock<IEmailSender> ]    (Simulated: Verified called)` ,
    realWorldApplication: "Testing payment workflows, invoice generation, and account approval logic without charging real credit cards or firing real emails.",
    commonErrors: [
      {
        error: "Passing the Mock instance directly instead of mock.Object",
        cause: "mock is of type Mock<T>; mock.Object is the concrete object implementing T.",
        fix: "Always pass 'mock.Object' into constructors."
      }
    ],
    bestPractices: [
      "Only mock interfaces you do not own or that cross architectural boundaries (I/O, database, third-party APIs).",
      "Do not over-mock: testing simple helper functions with mocks is an antipattern; use real instances for pure calculations.",
      "Verify method calls with Times.Once() on critical operations (e.g. ChargeCreditCard)."
    ],
    practiceQuestions: [
      {
        question: "What property of a Moq 'Mock<T>' instance supplies the actual object that implements interface T?",
        options: ["mock.Instance", "mock.Object", "mock.Proxy", "mock.Value"],
        answerIndex: 1,
        explanation: "'mock.Object' returns the generated proxy instance that satisfies interface T."
      }
    ],
    revisionSummary: [
      "Mocks isolate the System Under Test from network, database, and hardware dependencies.",
      "Setup() configures return values; Verify() confirms method calls.",
      "Pass mock.Object to dependent constructors."
    ],
    references: [
      { title: "Moq Quickstart Documentation", url: "https://github.com/devlooped/moq/wiki/Quickstart", source: "Moq GitHub" }
    ]
  },

  "topic-8-4": {
    id: "topic-8-4",
    title: "Integration Testing in ASP.NET Core",
    category: "8. Backend Testing & Code Quality",
    description: "WebApplicationFactory<Program>; in-memory DB vs test containers; testing endpoints end-to-end; test fixtures",
    objectives: [
      "Bootstrap an entire in-memory ASP.NET Core test server using WebApplicationFactory<Program>",
      "Execute HTTP requests against controllers using HttpClient and verify JSON responses",
      "Override dependencies in test fixtures (e.g. replacing real payment gateways with test doubles)",
      "Compare in-memory databases with real Testcontainers (Docker-based real SQL Server)"
    ],
    prerequisites: "Controllers (Topic 6-3) and xUnit (Topic 8-2).",
    terminology: [
      { term: "WebApplicationFactory<TProgram>", definition: "A test fixture in Microsoft.AspNetCore.Mvc.Testing that spins up the full ASP.NET Core pipeline in-memory for testing." },
      { term: "Integration Test", definition: "A test that verifies that multiple components (routing, middleware, validation, controller, database) work together correctly." }
    ],
    concepts: [
      {
        title: "Testing Endpoints with WebApplicationFactory",
        explanation: "WebApplicationFactory allows executing real HTTP requests through the middleware, routing, model binding, and controller layers in milliseconds.",
        codeSnippet: `using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using System.Net.Http.Json;
using Xunit;
using FluentAssertions;

public class ProductsApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ProductsApiTests(WebApplicationFactory<Program> factory)
    {
        // Creates in-memory test client connected to running server pipeline!
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetProduct_InvalidId_ReturnsNotFoundProblemDetails()
    {
        // Act: Make real HTTP GET call to in-memory server
        var response = await _client.GetAsync("/api/products/99999");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        var problem = await response.Content.ReadFromJsonAsync<Microsoft.AspNetCore.Mvc.ProblemDetails>();
        problem.Should().NotBeNull();
        problem!.Status.Should().Be(404);
    }
}`,
        language: "csharp",
        output: "Tests entire pipeline: routing, model binding, and global error handling without deploying to IIS or cloud.",
        lineExplanation: [
          "Line 7: 'IClassFixture<WebApplicationFactory<Program>>' manages the test server lifetime.",
          "Line 13: '_client = factory.CreateClient()' creates a specialized HttpClient wired directly to the in-memory web server.",
          "Line 19: Sends a real HTTP GET request and tests the resulting status code and ProblemDetails."
        ]
      }
    ],
    diagram: `Integration Test Architecture:
[ xUnit Test Method ] ---> [ HttpClient ]
                                 | (Direct In-Memory Request)
                                 v
[ ASP.NET Core TestServer Pipeline (WebApplicationFactory) ]
   |-- Middleware (Exception Handling, CORS, Auth)
   |-- Controller & Model Binding
   +-- DbContext (In-Memory / Testcontainers) ---> Response returned to test`,
    realWorldApplication: "Validating that API security policies, validation filters, and database migrations function seamlessly end-to-end.",
    commonErrors: [
      {
        error: "Compilation error: Program is inaccessible due to its protection level",
        cause: "In .NET 6+, Program.cs uses top-level statements, making the Program class internal by default.",
        fix: "Add 'public partial class Program { }' at the bottom of Program.cs in the Web API project."
      }
    ],
    bestPractices: [
      "Always add 'public partial class Program { }' so test projects can reference the application entry point.",
      "Use WebApplicationFactory for happy-path and critical security integration tests.",
      "Prefer Testcontainers over In-Memory database for Entity Framework tests to ensure SQL dialect compatibility."
    ],
    practiceQuestions: [
      {
        question: "What class in Microsoft.AspNetCore.Mvc.Testing spins up the in-memory ASP.NET Core test server?",
        options: ["TestHost", "WebApplicationFactory<TProgram>", "HttpServerFixture", "MockServer"],
        answerIndex: 1,
        explanation: "WebApplicationFactory<TProgram> provides the standard test fixture for running full pipeline integration tests in .NET."
      }
    ],
    revisionSummary: [
      "WebApplicationFactory boots the real ASP.NET Core pipeline in memory.",
      "Tests middleware, routing, model binding, and controllers end-to-end.",
      "Add 'public partial class Program { }' to expose top-level Program.cs to tests."
    ],
    references: [
      { title: "Integration tests in ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests", source: "Microsoft Learn" }
    ]
  },

  "topic-8-5": {
    id: "topic-8-5",
    title: "Clean Code & Refactoring",
    category: "8. Backend Testing & Code Quality",
    description: "DRY, KISS, YAGNI; code smells; naming conventions; small methods; refactoring techniques",
    objectives: [
      "Apply core software engineering principles: DRY, KISS, and YAGNI",
      "Identify common code smells (Long Method, God Class, Feature Envy, Primitive Obsession)",
      "Refactor messy procedural code using Extract Method, Rename, and Guard Clauses",
      "Maintain consistent, self-documenting naming conventions"
    ],
    prerequisites: "C# Fundamentals and OOP.",
    terminology: [
      { term: "DRY (Don't Repeat Yourself)", definition: "Every piece of business knowledge must have a single, unambiguous representation within a system." },
      { term: "KISS (Keep It Simple, Stupid)", definition: "Systems work best when kept simple rather than made unnecessarily complex." },
      { term: "YAGNI (You Aren't Gonna Need It)", definition: "Do not add functionality until it is deemed necessary by real requirements." },
      { term: "Code Smell", definition: "A surface symptom in code that often indicates a deeper architectural or design flaw." }
    ],
    concepts: [
      {
        title: "Refactoring: Guard Clauses and Extract Method",
        explanation: "Replacing deeply nested if-statements with early guard clauses dramatically improves code readability and reduces cyclomatic complexity.",
        codeSnippet: `// BAD CODE SMELL: Deep Arrow Anti-Pattern
// public void Process(User u) {
//     if (u != null) {
//         if (u.IsActive) {
//             if (u.HasBalance) {
//                 // Do work...
//             }
//         }
//     }
// }

// CLEAN REFACTORED CODE: Guard Clauses
public void Process(User? user)
{
    ArgumentNullException.ThrowIfNull(user);

    if (!user.IsActive) return;
    if (!user.HasBalance) return;

    // Happy path remains completely unindented!
    ExecuteTransaction(user);
}

private void ExecuteTransaction(User user)
{
    // Small, focused method (Extract Method pattern)
    user.DeductBalance(10.0m);
}`,
        language: "csharp",
        output: "Eliminates deep indentation and clarifies business constraints immediately.",
        lineExplanation: [
          "Line 14: ArgumentNullException.ThrowIfNull provides modern, fast guard checks.",
          "Line 16-17: Early returns eliminate nested if-pyramids.",
          "Line 20: Happy path logic executes without horizontal nesting."
        ]
      }
    ],
    diagram: `Arrow Anti-Pattern vs Guard Clauses:
Nested (Bad):               Guard Clauses (Clean):
if (a)                      if (!a) return;
  if (b)                    if (!b) return;
    if (c)                  if (!c) return;
      doWork();             doWork();`,
    realWorldApplication: "Lowering long-term software maintenance costs and minimizing bugs introduced during feature additions.",
    commonErrors: [
      {
        error: "Over-engineering solutions for theoretical future requirements (violating YAGNI)",
        cause: "Creating 5 layers of abstractions for a simple CRUD operation.",
        fix: "Build the simplest design that satisfies current requirements and refactor when real needs arise."
      }
    ],
    bestPractices: [
      "Keep methods small: ideally under 20-25 lines.",
      "Use intention-revealing names: avoid abbreviations like 'usrMgr', use 'UserManager'.",
      "Refactor in small, verified steps with passing automated unit tests."
    ],
    practiceQuestions: [
      {
        question: "What principle advises developers against adding speculative features before they are actually required?",
        options: ["DRY", "YAGNI (You Aren't Gonna Need It)", "KISS", "SOLID"],
        answerIndex: 1,
        explanation: "YAGNI states that developers should not add functionality until it is genuinely required."
      }
    ],
    revisionSummary: [
      "Apply DRY, KISS, and YAGNI.",
      "Use guard clauses to flatten nested if-statements.",
      "Keep methods small, focused, and well-named."
    ],
    references: [
      { title: "Clean Code - Robert C. Martin", url: "https://en.wikipedia.org/wiki/Clean_Code", source: "Industry Standard" }
    ]
  },

  "topic-8-6": {
    id: "topic-8-6",
    title: "Static Analysis & Linters",
    category: "8. Backend Testing & Code Quality",
    description: "Roslyn analyzers; StyleCop; SonarLint; editorconfig; enforcing code quality in build",
    objectives: [
      "Leverage built-in Roslyn analyzers for compile-time code quality enforcement",
      "Integrate SonarLint and StyleCop to detect security vulnerabilities and styling bugs",
      "Treat compiler warnings as errors in CI/CD (<TreatWarningsAsErrors>true</TreatWarningsAsErrors>)",
      "Automate code formatting with dotnet format"
    ],
    prerequisites: ".NET Build Tools and .csproj (Topic 2-5).",
    terminology: [
      { term: "Roslyn Analyzer", definition: "A compiler extension that inspects C# source code as you type to enforce style, quality, design, and security rules." },
      { term: "Static Code Analysis", definition: "Analyzing software source code without executing it to detect bugs, anti-patterns, and security vulnerabilities." }
    ],
    concepts: [
      {
        title: "Enforcing Quality in .csproj and CLI",
        explanation: "Setting high analysis levels and treating warnings as errors in the project configuration ensures that poor code cannot pass CI/CD builds.",
        codeSnippet: `<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <!-- Enable all standard .NET code quality rules -->
    <AnalysisLevel>latest-recommended</AnalysisLevel>
    <EnforceCodeStyleInBuild>true</EnforceCodeStyleInBuild>
    <!-- Prevent messy code from passing automated builds -->
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>

  <ItemGroup>
    <!-- SonarLint analyzer package -->
    <PackageReference Include="SonarAnalyzer.CSharp" Version="9.21.0.86780" PrivateAssets="all" />
  </ItemGroup>

</Project>`,
        language: "xml",
        output: "Enforces zero warnings and latest recommended static analysis rules during build.",
        lineExplanation: [
          "Line 7: Enables latest recommended Roslyn analyzers.",
          "Line 10: Fails the build if any warning is triggered, ensuring team discipline.",
          "Line 15: Integrates SonarAnalyzer for security and code smell scanning."
        ]
      }
    ],
    diagram: `Quality Gate Pipeline:
[ Developer commits code ]
             |
       (dotnet build)
             |
  (Roslyn & Sonar Analyzers)
      /             \\
 (Warnings Found)  (Zero Warnings)
      |                   |
 [ Build Failed! ]   [ Tests Run -> Deployed ]`,
    realWorldApplication: "Enforcing enterprise architectural standards and catching memory leaks and security vulnerabilities before code review.",
    commonErrors: [
      {
        error: "Ignoring compiler warnings until there are 800+ warnings in the project",
        cause: "Treating warnings as optional suggestions.",
        fix: "Enable <TreatWarningsAsErrors>true</TreatWarningsAsErrors> from day one."
      }
    ],
    bestPractices: [
      "Run 'dotnet format --verify-no-changes' in GitHub Actions to block unformatted code.",
      "Install the SonarLint extension in VS Code for real-time bug highlighting.",
      "Enable Nullable Reference Types (<Nullable>enable</Nullable>) on all projects."
    ],
    practiceQuestions: [
      {
        question: "What MSBuild setting causes the .NET compiler to fail the build if any warning is detected?",
        options: [
          "<AnalysisMode>strict</AnalysisMode>",
          "<TreatWarningsAsErrors>true</TreatWarningsAsErrors>",
          "<FailOnWarning>enabled</FailOnWarning>",
          "<WarningBehavior>abort</WarningBehavior>"
        ],
        answerIndex: 1,
        explanation: "<TreatWarningsAsErrors>true</TreatWarningsAsErrors> instructs the compiler to treat all warnings as fatal errors, failing the build."
      }
    ],
    revisionSummary: [
      "Roslyn analyzers inspect code at compile time.",
      "Treat warnings as errors in CI/CD to prevent technical debt accumulation.",
      "Automate formatting with 'dotnet format'."
    ],
    references: [
      { title: "Code analysis in .NET - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview", source: "Microsoft Learn" }
    ]
  },

  "topic-8-7": {
    id: "topic-8-7",
    title: "AI Integration in Backend Testing",
    category: "8. Backend Testing & Code Quality",
    description: "Generating unit tests with Copilot; using AI to create edge-case test data; validating AI-generated tests for false positives",
    objectives: [
      "Prompt AI to generate comprehensive xUnit test suites and edge cases",
      "Use AI to synthesize diverse mock data sets ([InlineData], [MemberData])",
      "Critically audit AI-generated tests for false positives (tests that pass even when code is broken)",
      "Refactor AI tests to eliminate test duplication and maintain readable AAA structure"
    ],
    prerequisites: "xUnit, Moq, and Testing Fundamentals (Topics 8-1 to 8-3).",
    terminology: [
      { term: "False Positive Test", definition: "A flawed test that reports success (green) even when the underlying production code contains defects, often due to meaningless assertions (e.g. Assert.True(true))." }
    ],
    concepts: [
      {
        title: "Prompting and Auditing AI-Generated Tests",
        explanation: "AI is exceptionally fast at writing unit tests, but frequently writes tests with weak assertions or mocks that mock the system under test itself.",
        codeSnippet: `// PROMPT: "Write an xUnit test with Moq for BankAccount.Withdraw when balance is insufficient."

// CRITICAL AUDIT OF AI OUTPUT:
[Fact]
public void Withdraw_InsufficientFunds_ThrowsException()
{
    // Arrange
    var account = new BankAccount(initialBalance: 50m);

    // Act & Assert: Verify exact exception type and message
    var exception = Assert.Throws<InsufficientFundsException>(() => account.Withdraw(100m));
    
    // Developer Enhancement: Verify state wasn't partially mutated!
    account.Balance.Should().Be(50m); // AI often forgets to assert that state remained untouched!
}`,
        language: "csharp",
        output: "Verified unit test that validates both the thrown exception and state preservation.",
        lineExplanation: [
          "Verifies that the exception is thrown.",
          "Asserts that the balance was not mutated during the failed operation (defensive test auditing)."
        ]
      }
    ],
    diagram: `Auditing AI Tests:
1. Does the test fail if I intentionally break the production code? (Sanity Check)
2. Are assertions meaningful (not just Assert.NotNull)?
3. Is the System Under Test real (not accidentally mocked)?`,
    realWorldApplication: "Rapidly expanding test coverage across legacy codebases and generating edge-case boundary test data.",
    commonErrors: [
      {
        error: "Accepting an AI-generated test that passes without asserting anything meaningful",
        cause: "AI sometimes writes tests that only call the method without an Assert statement.",
        fix: "Ensure every test asserts exact expected values or states."
      }
    ],
    bestPractices: [
      "Test your tests: intentionally introduce a bug in production code to verify the AI test turns red.",
      "Prompt AI with boundary values: 'Generate edge cases including 0, negative numbers, null, and max limits'.",
      "Ensure AI adheres to the Arrange-Act-Assert structure."
    ],
    practiceQuestions: [
      {
        question: "What is the best way to verify that an AI-generated unit test is genuinely effective and not a false positive?",
        options: [
          "Ask AI if the test is correct.",
          "Intentionally introduce a bug into the production method under test and verify that the test fails (turns red).",
          "Check if it has more than 50 lines of code.",
          "Run it on Linux."
        ],
        answerIndex: 1,
        explanation: "Intentionally introducing a defect (mutation testing) proves that the test will catch real bugs."
      }
    ],
    revisionSummary: [
      "AI accelerates test generation and mock data synthesis.",
      "Always inspect assertions for false positives.",
      "Verify that tests fail when production code is broken."
    ],
    references: [
      { title: "Testing code with GitHub Copilot", url: "https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide", source: "GitHub Docs" }
    ]
  },

  "topic-8-8": {
    id: "topic-8-8",
    title: "Generative AI across the SDLC",
    category: "8. Backend Testing & Code Quality",
    description: "AI across requirements, design, coding, testing, review; strengths & failure modes of LLMs in software dev",
    objectives: [
      "Map Generative AI capabilities across all phases of the Software Development Life Cycle (SDLC)",
      "Understand the key strengths (boilerplate, regex, explanations, test generation) and failure modes (hallucinations, security gaps, context blindness) of LLMs",
      "Apply AI responsibly in code reviews and requirement refinement",
      "Establish engineering guardrails for AI-augmented teams"
    ],
    prerequisites: "SDLC fundamentals.",
    terminology: [
      { term: "Hallucination", definition: "When an LLM generates syntactically convincing code or references APIs and package versions that do not actually exist." },
      { term: "Context Window", definition: "The maximum amount of tokenized text (code, files, chat history) an LLM can process in a single prompt." }
    ],
    concepts: [
      {
        title: "AI Capabilities Across the SDLC",
        explanation: "AI is a collaborative partner across the entire software lifecycle, from refining user stories to writing release notes.",
        codeSnippet: `// SDLC Stage Mapping:
// 1. Requirements: User story refinement, acceptance criteria generation (Gherkin/BDD)
// 2. Architecture: Trade-off analysis between SQL vs NoSQL, drawing Mermaid diagrams
// 3. Coding: Scaffolding boilerplate, regex patterns, DTO mapping
// 4. Testing: Edge-case synthesis, test data generation, mutation test creation
// 5. Code Review: Automated PR summarization, checking naming conventions
// 6. Maintenance: Explaining legacy codebases, generating migration guides`,
        language: "csharp",
        output: "Structured framework for AI adoption across engineering organizations.",
        lineExplanation: [
          "Demonstrates that AI value extends far beyond autocomplete."
        ]
      }
    ],
    diagram: `AI in SDLC:
Requirements ---> Architecture ---> Implementation ---> Automated Testing ---> Deployment & Review
    ^                 ^                   ^                     ^                     ^
    |                 |                   |                     |                     |
[ BDD Stories ] [ Architecture ]    [ Copilot Coding ]    [ Test Scenarios ]   [ PR Summary ]`,
    realWorldApplication: "Increasing overall engineering velocity and reducing time spent writing repetitive boilerplate.",
    commonErrors: [
      {
        error: "Treating LLM output as authoritative truth without verification",
        cause: "LLMs predict the most probable next token; they do not have real runtime comprehension.",
        fix: "Treat all AI output as an unverified draft that requires human compilation and testing."
      }
    ],
    bestPractices: [
      "Always verify library versions: LLMs may suggest deprecated or insecure APIs.",
      "Keep humans in the loop: engineers are legally and professionally responsible for committed code.",
      "Use AI to explain complex, undocumented legacy code before refactoring."
    ],
    practiceQuestions: [
      {
        question: "What is an AI hallucination in software engineering?",
        options: [
          "A server crashing due to out of memory.",
          "When an LLM produces convincing code referencing libraries, methods, or syntax that do not exist.",
          "A visual glitch on a monitor.",
          "A network timeout."
        ],
        answerIndex: 1,
        explanation: "Hallucinations occur when LLMs invent non-existent APIs, packages, or language features with high confidence."
      }
    ],
    revisionSummary: [
      "AI augments requirements, architecture, coding, testing, and reviews.",
      "Engineers must verify output against real compilers and tests.",
      "Never trust unverified AI code in production."
    ],
    references: [
      { title: "Generative AI in Software Engineering - IEEE Software", url: "https://www.computer.org/csdl/magazine/so", source: "IEEE Software" }
    ]
  },

  "topic-8-9": {
    id: "topic-8-9",
    title: "Coding Agents & Copilot Chat",
    category: "8. Backend Testing & Code Quality",
    description: "Copilot Chat (@workspace, /explain, /fix, /tests); terminal integration; multi-file edits with coding agents",
    objectives: [
      "Master Copilot Chat commands: /explain, /fix, /tests, and /doc",
      "Use context agents like @workspace to query multi-file architectures",
      "Leverage terminal integration to diagnose and resolve shell and build errors",
      "Understand autonomous coding agents performing multi-file refactors"
    ],
    prerequisites: "VS Code Tooling and Git.",
    terminology: [
      { term: "@workspace Agent", definition: "A specialized context provider in Copilot Chat that indexes the entire project repository to answer architectural questions." },
      { term: "Coding Agent", definition: "An autonomous AI workflow capable of inspecting files, creating plans, running commands, and making coordinated edits across multiple files." }
    ],
    concepts: [
      {
        title: "Mastering Copilot Chat Slash Commands",
        explanation: "Copilot Chat provides specialized slash commands designed for common software development workflows.",
        codeSnippet: `// Copilot Chat Interaction Examples:

// 1. Explaining complex algorithms:
// Query: /explain How does the caching layer in @workspace handle cache invalidation?

// 2. Fixing errors:
// Query: /fix Why is this LINQ query throwing an InvalidOperationException?

// 3. Generating test suites:
// Query: /tests Generate xUnit tests with FluentAssertions covering edge cases for this method.

// 4. In the Terminal:
// Query: @terminal How do I publish a trimmed self-contained .NET 8 binary for linux-x64?`,
        language: "csharp",
        output: "Accelerates debugging, testing, and multi-file exploration directly inside the IDE.",
        lineExplanation: [
          "/explain breaks down code step-by-step.",
          "/fix proposes targeted corrections for selected code.",
          "/tests writes unit tests for the current file or selection."
        ]
      }
    ],
    diagram: `Copilot Chat Architecture:
[ VS Code Editor Selection ] + [ @workspace Index ] + [ User Prompt ]
                                    |
                                    v
                         [ Copilot Agent Engine ]
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
    [ Code Modifications ]                         [ Terminal Commands ]`,
    realWorldApplication: "Onboarding onto massive million-line enterprise codebases and quickly identifying where features or endpoints are defined.",
    commonErrors: [
      {
        error: "Asking questions without context and getting generic, incorrect responses",
        cause: "Not specifying files, selections, or @workspace in the prompt.",
        fix: "Select the relevant code or include '@workspace' to ground the AI in your codebase."
      }
    ],
    bestPractices: [
      "Use '@workspace' when asking about architecture across multiple files.",
      "Use '/fix' when the compiler highlights an error in the active editor.",
      "Review git diffs after coding agents perform multi-file modifications."
    ],
    practiceQuestions: [
      {
        question: "Which Copilot Chat slash command is specifically designed to scaffold unit tests for selected code?",
        options: ["/check", "/tests", "/qa", "/mock"],
        answerIndex: 1,
        explanation: "The '/tests' slash command instructs Copilot to generate automated unit tests for the selected code."
      }
    ],
    revisionSummary: [
      "Use /explain, /fix, /tests, and @workspace for contextual IDE assistance.",
      "Terminal integration helps resolve build and CLI commands quickly.",
      "Inspect git diffs after agent-assisted multi-file refactors."
    ],
    references: [
      { title: "GitHub Copilot Chat in VS Code - Official Guide", url: "https://code.visualstudio.com/docs/copilot/copilot-chat", source: "Visual Studio Code Docs" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 9: Logging (1 topic)
// -------------------------------------------------------------
const m9 = {
  "topic-9-1": {
    id: "topic-9-1",
    title: "Logging in .NET & Serilog",
    category: "9. Logging",
    description: "ILogger<T>; log levels (Trace → Critical); structured logging; Serilog / NLog; sinks (Console, File, Seq); correlation IDs",
    objectives: [
      "Master the Microsoft.Extensions.Logging abstraction (ILogger<T>)",
      "Understand the six standard log levels: Trace, Debug, Information, Warning, Error, Critical",
      "Implement Structured Logging with message templates and semantic properties",
      "Configure Serilog with sinks (Console, File, Seq) and Correlation IDs for distributed tracing"
    ],
    prerequisites: "Dependency Injection and Web API architecture.",
    terminology: [
      { term: "Structured Logging", definition: "Logging data as key-value pairs (JSON) rather than formatted strings, enabling querying, filtering, and indexing in log aggregators." },
      { term: "Log Sink", definition: "The destination where log events are written (e.g. Console, File, Elasticsearch, Seq, Datadog)." },
      { term: "Correlation ID", definition: "A unique GUID passed in HTTP headers (X-Correlation-ID) that traces a single request across multiple microservices." }
    ],
    concepts: [
      {
        title: "Structured Logging with Serilog and ILogger<T>",
        explanation: "Never use string interpolation in logging. Structured logging preserves parameters as searchable JSON fields in log management tools.",
        codeSnippet: `// BAD: String interpolation (Destroys queryability, wastes CPU)
// _logger.LogInformation($"Order {orderId} processed for {amount}");

// GOOD: Structured Logging (Message template with named properties)
_logger.LogInformation("Order {OrderId} processed for customer {CustomerId} with total {TotalAmount:C}", 
    orderId, customerId, totalAmount);

// Configuring Serilog in Program.cs:
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog as the primary logging provider
builder.Host.UseSerilog((context, configuration) => configuration
    .ReadFrom.Configuration(context.Configuration)
    .Enrich.FromLogContext()
    .Enrich.WithMachineName()
    .WriteTo.Console()
    .WriteTo.File("logs/app-.log", rollingInterval: RollingInterval.Day)
    .WriteTo.Seq("http://localhost:5341")); // Real-time structured log search engine!

var app = builder.Build();`,
        language: "csharp",
        output: "Emits searchable structured JSON events with timestamps, log levels, and enriched metadata.",
        lineExplanation: [
          "Line 4: Named placeholders like {OrderId} are stored as queryable JSON fields in Elasticsearch or Seq.",
          "Line 12: Integrates Serilog seamlessly into the ASP.NET Core host pipeline.",
          "Line 17: Writes logs to Console, daily rolling Files, and a Seq server simultaneously."
        ]
      }
    ],
    diagram: `Structured Logging Pipeline:
_logger.LogInformation("Payment {Amount} by {User}", amount, user)
                         |
                 (Serilog Pipeline)
                         |
           +-------------+-------------+
           |             |             |
           v             v             v
       [ Console ]   [ File Sink ]  [ Seq / Elastic (JSON Search) ]
                                    { "Amount": 99.0, "User": "Jane" }`,
    realWorldApplication: "Investigating customer issues and production outages in distributed cloud microservices in seconds by filtering on CorrelationId.",
    commonErrors: [
      {
        error: "Using string interpolation inside logger methods (e.g. _logger.LogInformation($\"User {id}\"))",
        cause: "Converts data into a plain flat string, preventing search engines from indexing the parameter as a queryable field.",
        fix: "Always use message templates: _logger.LogInformation(\"User {UserId}\", id)."
      }
    ],
    bestPractices: [
      "Always use structured message templates ({PropertyName}), never string interpolation.",
      "Attach a Correlation ID middleware to track requests across distributed service boundaries.",
      "Log at Information or Warning in production; reserve Debug and Trace for local development."
    ],
    practiceQuestions: [
      {
        question: "Why is structured logging (_logger.LogInformation(\"Order {Id}\", id)) preferred over string interpolation ($) in modern .NET?",
        options: [
          "String interpolation is not supported by C#.",
          "Structured logging captures named parameters as discrete JSON properties, allowing log aggregators (Seq, Elastic) to search and filter by that exact field.",
          "Structured logging requires less disk space.",
          "It automatically encrypts the log file."
        ],
        answerIndex: 1,
        explanation: "Structured logging preserves individual parameters as queryable metadata attributes in centralized log systems."
      }
    ],
    revisionSummary: [
      "Use ILogger<T> with structured message templates.",
      "Serilog routes logs to multiple sinks (Console, File, Seq).",
      "Correlation IDs enable end-to-end distributed tracing."
    ],
    references: [
      { title: "Logging in .NET and ASP.NET Core - Microsoft Learn", url: "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/logging/", source: "Microsoft Learn" },
      { title: "Serilog Documentation", url: "https://serilog.net/", source: "Serilog.net" }
    ]
  }
};

// -------------------------------------------------------------
// MODULE 10: Design Patterns & SOLID (2 topics)
// -------------------------------------------------------------
const m10 = {
  "topic-10-1": {
    id: "topic-10-1",
    title: "SOLID Principles in C#",
    category: "10. Design Patterns & SOLID",
    description: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion — with C# examples",
    objectives: [
      "Master all five SOLID design principles with concrete C# implementations",
      "Single Responsibility (SRP): One reason to change",
      "Open/Closed (OCP): Open for extension, closed for modification",
      "Liskov Substitution (LSP): Subtypes must be substitutable for base types",
      "Interface Segregation (ISP): Fine-grained client-specific interfaces",
      "Dependency Inversion (DIP): Depend on abstractions, not concretions"
    ],
    prerequisites: "OOP, Interfaces, and Polymorphism.",
    terminology: [
      { term: "SOLID", definition: "A mnemonic acronym for five design principles intended to make software designs more understandable, flexible, and maintainable." },
      { term: "Dependency Inversion (DIP)", definition: "High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces)." }
    ],
    concepts: [
      {
        title: "SOLID in Practice",
        explanation: "SOLID transforms rigid, fragile codebases into extensible, testable software architectures.",
        codeSnippet: `// 1. Single Responsibility: Only handles invoice calculations
public class InvoiceCalculator
{
    public decimal CalculateTotal(Invoice inv) => inv.Subtotal * (1 + inv.TaxRate);
}

// 2. Open/Closed & Dependency Inversion: Extensible discount rules without modifying core engine
public interface IDiscountStrategy
{
    decimal ApplyDiscount(decimal total);
}

public class VipDiscount : IDiscountStrategy
{
    public decimal ApplyDiscount(decimal total) => total * 0.85m;
}

// High-level service depends on abstraction (IDiscountStrategy), not concrete class!
public class CheckoutService(IDiscountStrategy discountStrategy)
{
    public decimal Checkout(decimal total) => discountStrategy.ApplyDiscount(total);
}`,
        language: "csharp",
        output: "Demonstrates SRP, OCP, and DIP working together cleanly.",
        lineExplanation: [
          "InvoiceCalculator has a single responsibility.",
          "IDiscountStrategy enables new discount strategies without changing existing code (OCP).",
          "CheckoutService depends on the interface abstraction (DIP)."
        ]
      }
    ],
    diagram: `SOLID Overview:
S - Single Responsibility   -> One class, one job
O - Open/Closed             -> Extend behavior via interfaces without altering tested code
L - Liskov Substitution     -> Subclasses honor base class contracts
I - Interface Segregation   -> Small, focused interfaces instead of bloated God-interfaces
D - Dependency Inversion    -> Depend on abstractions (interfaces), not concrete implementations`,
    realWorldApplication: "Architecting enterprise .NET applications where features can be swapped, extended, or tested without cascading breaking changes.",
    commonErrors: [
      {
        error: "Violating ISP with massive 'fat' interfaces (e.g. IRepository with 40 methods)",
        cause: "Forces implementing classes to implement methods they do not need (throwing NotImplementedException).",
        fix: "Break large interfaces into small, cohesive contracts (IReadRepository, IWriteRepository)."
      }
    ],
    bestPractices: [
      "Inject interfaces into service constructors to satisfy Dependency Inversion.",
      "Keep interfaces focused and small (often 2-4 methods).",
      "Apply Open/Closed principle by using strategy and decorator patterns."
    ],
    practiceQuestions: [
      {
        question: "What does the Dependency Inversion Principle (DIP) state?",
        options: [
          "Classes should inherit from as many base classes as possible.",
          "High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces).",
          "Methods should not accept parameters.",
          "All classes should be static."
        ],
        answerIndex: 1,
        explanation: "DIP dictates that software components should decouple by depending on interface abstractions rather than direct concrete implementations."
      }
    ],
    revisionSummary: [
      "SOLID ensures maintainable, decoupled object-oriented architecture.",
      "SRP = single responsibility; OCP = extend with interfaces.",
      "DIP = depend on abstractions via Dependency Injection."
    ],
    references: [
      { title: "SOLID Principles in C# - Microsoft Learn", url: "https://learn.microsoft.com/en-us/archive/msdn-magazine/2014/may/csharp-best-practices-dangers-of-violating-solid-principles-in-csharp", source: "MSDN / Microsoft Learn" }
    ]
  },

  "topic-10-2": {
    id: "topic-10-2",
    title: "Common Design Patterns",
    category: "10. Design Patterns & SOLID",
    description: "Repository & Unit of Work; Factory; Strategy; Decorator; Mediator (MediatR awareness)",
    objectives: [
      "Master the Repository and Unit of Work patterns for clean data access abstraction",
      "Implement the Strategy pattern for interchangeable algorithms",
      "Use the Decorator pattern to add caching or logging without modifying core code",
      "Understand the Mediator pattern with MediatR for CQRS command/query decoupling"
    ],
    prerequisites: "OOP, Interfaces, and SOLID Principles.",
    terminology: [
      { term: "Repository Pattern", definition: "Mediates between the domain and data mapping layers, acting like an in-memory collection of domain objects." },
      { term: "Unit of Work", definition: "Maintains a list of business objects affected by a transaction and coordinates the writing out of changes." },
      { term: "Mediator Pattern (MediatR)", definition: "Encapsulates how sets of objects interact, decoupling senders of requests from their handlers (CQRS)." }
    ],
    concepts: [
      {
        title: "Repository, Strategy, and Mediator Patterns",
        explanation: "Design patterns provide battle-tested solutions to recurring software engineering challenges.",
        codeSnippet: `// 1. Repository Pattern Interface
public interface ICustomerRepository
{
    Task<Customer?> GetByIdAsync(int id);
    Task AddAsync(Customer customer);
}

// 2. Mediator Pattern (MediatR CQRS pattern)
// Command representation
public record RegisterCustomerCommand(string Name, string Email) : MediatR.IRequest<int>;

// Command Handler: Decoupled handler executing business logic
public class RegisterCustomerHandler(ICustomerRepository repository) 
    : MediatR.IRequestHandler<RegisterCustomerCommand, int>
{
    public async Task<int> Handle(RegisterCustomerCommand request, CancellationToken ct)
    {
        var customer = new Customer { Name = request.Name, Email = request.Email };
        await repository.AddAsync(customer);
        return customer.Id;
    }
}`,
        language: "csharp",
        output: "Decouples Web API controllers from business logic via mediator messaging.",
        lineExplanation: [
          "Line 2: Repository encapsulates database querying and persistence.",
          "Line 9: Command encapsulates data intent.",
          "Line 12: Handler encapsulates the business workflow, keeping controllers to a single line of code: await _mediator.Send(command)."
        ]
      }
    ],
    diagram: `Mediator Pattern Flow:
[ API Controller ] ---> calls: _mediator.Send(command)
                                 |
                         [ MediatR Bus ]
                                 |
                 (Dispatches to registered handler)
                                 v
                 [ RegisterCustomerHandler ] ---> [ Repository ] ---> [ DB ]`,
    realWorldApplication: "Architecting enterprise CQRS (Command Query Responsibility Segregation) microservices and clean architecture solutions.",
    commonErrors: [
      {
        error: "Re-implementing a generic repository over EF Core that hides LINQ capabilities",
        cause: "DbSet<T> is already an implementation of the Repository pattern, and DbContext is already a Unit of Work.",
        fix: "Keep repositories focused on domain-specific queries rather than generic wrappers that reinvent IQueryable."
      }
    ],
    bestPractices: [
      "Use MediatR to keep API controllers thin and decouple requests from business handlers.",
      "Use the Strategy pattern when algorithmic logic must change dynamically at runtime.",
      "Use the Decorator pattern for cross-cutting concerns like caching and logging."
    ],
    practiceQuestions: [
      {
        question: "What is the primary architectural benefit of the Mediator pattern (such as MediatR) in ASP.NET Core?",
        options: [
          "It forces queries to run synchronously.",
          "It completely decouples the sender of a request from the handler that executes it, promoting single-responsibility and clean CQRS architecture.",
          "It replaces the database.",
          "It creates CSS stylesheets."
        ],
        answerIndex: 1,
        explanation: "MediatR decouples controllers from business handlers, ensuring controllers merely dispatch requests and handlers execute business logic independently."
      }
    ],
    revisionSummary: [
      "Repository abstracts data access; Unit of Work manages transactions.",
      "Strategy swaps algorithms dynamically.",
      "MediatR decouples controllers from business handlers in CQRS."
    ],
    references: [
      { title: "Design Patterns in C# - Refactoring Guru", url: "https://refactoring.guru/design-patterns/csharp", source: "Refactoring Guru" },
      { title: "MediatR Documentation", url: "https://github.com/jbogard/MediatR", source: "GitHub / MediatR" }
    ]
  }
};

writeModule('module08_testing_code_quality.js', 'MODULE_08_LESSONS', m8);
writeModule('module09_logging.js', 'MODULE_09_LESSONS', m9);
writeModule('module10_design_patterns_solid.js', 'MODULE_10_LESSONS', m10);
console.log('Batch 3 (Modules 8, 9, 10) complete!');
