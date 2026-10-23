import fs from 'fs';

function writeModule(filename, varName, lessons) {
  const content = `/**
 * Pre-generated comprehensive lessons for ${varName}
 * Sources: Microsoft Learn, official documentation, practical industry patterns.
 */

export const ${varName} = ${JSON.stringify(lessons, null, 2)};
`;
  fs.writeFileSync(`src/data/lessons/${filename}`, content);
  console.log(`Generated src/data/lessons/${filename} (${Object.keys(lessons).length} topics)`);
}

const m1 = {
  "topic-1-1": {
    id: "topic-1-1",
    title: "Language Basics",
    category: "1. C# Fundamentals",
    description: "Variables, data types, constants; operators; type casting; value types vs reference types",
    objectives: [
      "Understand strongly-typed variable declaration and initialization in modern C#",
      "Distinguish between value types (Stack) and reference types (Heap)",
      "Master implicit/explicit type casting, safe casting with 'as' and 'is', and arithmetic/logical operators",
      "Utilize constants and readonly qualifiers effectively"
    ],
    prerequisites: "Basic understanding of programming logic and computer execution flow.",
    terminology: [
      { term: "Value Type", definition: "A data type that directly contains its data in its own memory allocation (typically on the call stack)." },
      { term: "Reference Type", definition: "A data type that stores a reference (memory address) pointing to the actual object stored on the managed heap." },
      { term: "Type Casting", definition: "The process of converting a value from one data type to another either implicitly (safe) or explicitly." },
      { term: "Boxing/Unboxing", definition: "Boxing is converting a value type to 'object' or an interface; unboxing extracts the value type back." }
    ],
    concepts: [
      {
        title: "Primitive Data Types and Declaration",
        explanation: "C# is a statically-typed language where variables must have a declared type or use type inference via 'var'. Primitive types include int, double, decimal, bool, char, and string. Use decimal for monetary calculations due to its 128-bit precision.",
        codeSnippet: `// Implicit typing with 'var' and explicit types
int userAge = 25;
double itemWeight = 4.75;
decimal productPrice = 99.99m; // 'm' suffix for financial accuracy
bool isStudent = true;
char grade = 'A';
string fullName = "Jane Doe";

const double TaxRate = 0.08; // Compile-time constant

Console.WriteLine($"Student: {fullName}, Age: {userAge}, Price with Tax: {productPrice * (1 + (decimal)TaxRate):C}");`,
        language: "csharp",
        output: "Student: Jane Doe, Age: 25, Price with Tax: $107.99",
        lineExplanation: [
          "Line 1-6: Declares strongly-typed variables. The 'm' suffix on 99.99m designates a decimal literal.",
          "Line 8: Declares a compile-time constant 'TaxRate' that cannot be reassigned.",
          "Line 10: Interpolates strings using $:C formatting for currency display."
        ]
      },
      {
        title: "Value Types vs Reference Types",
        explanation: "Value types (int, float, bool, struct) allocate memory directly on the thread stack. Copying a value type duplicates the actual value. Reference types (class, string, object, array) store their data on the managed heap, while the variable on the stack merely holds a pointer to that heap address.",
        codeSnippet: `// Value type copy behavior
int a = 10;
int b = a; // Copied by value
b = 20;
Console.WriteLine($"a: {a}, b: {b}"); // a remains 10

// Reference type copy behavior
int[] originalArray = { 1, 2, 3 };
int[] copiedRef = originalArray; // Copied by reference
copiedRef[0] = 99;
Console.WriteLine($"originalArray[0]: {originalArray[0]}"); // originalArray[0] is now 99!`,
        language: "csharp",
        output: "a: 10, b: 20\noriginalArray[0]: 99",
        lineExplanation: [
          "Lines 1-5: Modifying 'b' does not affect 'a' because 'int' is a value type stored independently on the stack.",
          "Lines 8-11: Arrays are reference types; 'copiedRef' points to the same memory segment as 'originalArray'."
        ]
      }
    ],
    diagram: `+----------------------------------+----------------------------------+
|           STACK MEMORY           |           HEAP MEMORY            |
+----------------------------------+----------------------------------+
| userAge = 25                     |                                  |
| a = 10, b = 20                   |                                  |
| originalArray = [0x00FF34] ------> [ 99, 2, 3 ]                     |
| copiedRef     = [0x00FF34] ------> (points to exact same address!)  |
+----------------------------------+----------------------------------+`,
    realWorldApplication: "Selecting between decimal and double prevents floating-point rounding errors in fintech and banking applications. Understanding stack vs heap prevents memory leaks and unnecessary Garbage Collection pressure.",
    commonErrors: [
      {
        error: "InvalidCastException at runtime",
        cause: "Performing an unsafe explicit cast between incompatible reference types.",
        fix: "Use pattern matching 'if (obj is Person p)' or safe casting 'obj as Person'."
      },
      {
        error: "Precision loss using float or double for currency",
        cause: "Binary floating-point types cannot represent base-10 fractions (like 0.10) with exact precision.",
        fix: "Always declare monetary values with the 'decimal' type."
      }
    ],
    bestPractices: [
      "Use 'var' when the variable type is obvious from the right-hand side of the assignment (e.g. var client = new HttpClient()).",
      "Always use 'decimal' for currency and financial calculations.",
      "Prefer pattern matching with 'is' over raw explicit casts."
    ],
    practiceQuestions: [
      {
        question: "What is the primary difference between a value type and a reference type in C#?",
        options: [
          "Value types are stored on the heap; reference types on the stack.",
          "Value types hold the actual data; reference types hold a memory address pointing to the heap.",
          "Value types can be inherited; reference types cannot.",
          "Reference types cannot be null."
        ],
        answerIndex: 1,
        explanation: "Value types store the actual data directly (usually on the stack), whereas reference types store a pointer to data on the heap."
      },
      {
        question: "Which keyword should be used for compile-time immutable values in C#?",
        options: ["readonly", "static", "const", "var"],
        answerIndex: 2,
        explanation: "'const' creates compile-time constants whose values are baked into assembly metadata."
      }
    ],
    revisionSummary: [
      "Value types (primitives, structs) store values directly; reference types (classes, strings, arrays) store heap pointers.",
      "Decimal offers 128-bit precision and is mandatory for financial math.",
      "Implicit casting is automatic and safe; explicit casting requires parentheses and can throw InvalidCastException.",
      "Pattern matching with 'is' provides safe casting and type inspection."
    ],
    references: [
      { title: "C# Types and Variables - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/", source: "Microsoft Learn" },
      { title: "Value Types and Reference Types - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-types", source: "Microsoft Learn" }
    ]
  },

  "topic-1-2": {
    id: "topic-1-2",
    title: "Control Flow",
    category: "1. C# Fundamentals",
    description: "if/else, switch (including switch expressions); while, for, foreach; break, continue",
    objectives: [
      "Write conditional branching with if, else if, else, and ternary operators",
      "Leverage modern C# switch expressions with pattern matching",
      "Control iterative execution using for, while, do-while, and foreach loops",
      "Understand loop jumping semantics with break, continue, and return"
    ],
    prerequisites: "Variables, boolean logic, and relational operators (Topic 1-1).",
    terminology: [
      { term: "Switch Expression", definition: "A concise syntax introduced in C# 8 that evaluates an expression and returns a value based on pattern matching." },
      { term: "Short-Circuit Evaluation", definition: "Logical AND (&&) and OR (||) only evaluate the second operand if the first doesn't determine the outcome." },
      { term: "IEnumerable Loop (foreach)", definition: "Iterates through elements of a collection without needing to track an integer index counter." }
    ],
    concepts: [
      {
        title: "Modern Switch Expressions and Pattern Matching",
        explanation: "Traditional switch statements have been enhanced in modern C# with expression-bodied switch syntax, discard patterns (_), and relational condition guards.",
        codeSnippet: `int statusCode = 404;

string message = statusCode switch
{
    200 => "OK - Request Succeeded",
    201 => "Created - Resource saved",
    400 => "Bad Request - Validate payload",
    401 or 403 => "Security error - Unauthorized or Forbidden",
    404 => "Not Found - Endpoint does not exist",
    >= 500 and <= 599 => "Server Error - Internal failure",
    _ => "Unknown HTTP status"
};

Console.WriteLine($"Status: {statusCode} -> {message}");`,
        language: "csharp",
        output: "Status: 404 -> Not Found - Endpoint does not exist",
        lineExplanation: [
          "Line 3: 'statusCode switch' initiates an expression switch that returns a string value.",
          "Line 8: Uses the 'or' pattern to combine 401 and 403 in a single branch.",
          "Line 10: Relational pattern using '>= 500 and <= 599' to catch all 5xx errors.",
          "Line 11: Discard operator '_' acts as the default fallback case."
        ]
      },
      {
        title: "Loop Constructs and Iteration",
        explanation: "Use 'for' when the iteration count is known; use 'foreach' for iterating collections; use 'while' when the stop condition depends on dynamic state.",
        codeSnippet: `string[] frameworks = { "ASP.NET Core", "Entity Framework", "Angular", "Docker" };

foreach (var item in frameworks)
{
    if (item == "Angular")
    {
        Console.WriteLine($"{item} (Frontend)");
        continue;
    }
    Console.WriteLine($"{item} (Backend/DevOps)");
}`,
        language: "csharp",
        output: "ASP.NET Core (Backend/DevOps)\nEntity Framework (Backend/DevOps)\nAngular (Frontend)\nDocker (Backend/DevOps)",
        lineExplanation: [
          "Line 3: 'foreach' safely enumerates each element of the array.",
          "Line 8: 'continue' skips remaining lines in this loop iteration and proceeds to the next element."
        ]
      }
    ],
    diagram: `Branching Logic Flow:
[Input Condition]
       |
     /   \\
  [True]  [False]
    |        |
[Action A] [Action B]
    \\        /
     [Join Flow]`,
    realWorldApplication: "Handling API status codes, determining customer tiered discounts based on order volume, and iterating through paginated database records.",
    commonErrors: [
      {
        error: "Modifying collection inside a foreach loop",
        cause: "Calling list.Remove(x) or list.Add(x) while iterating throws InvalidOperationException.",
        fix: "Use a standard 'for' loop in reverse or iterate over a snapshot copy (e.g. list.ToList())."
      }
    ],
    bestPractices: [
      "Prefer modern switch expressions over lengthy if-else-if ladders when mapping inputs to outputs.",
      "Prefer 'foreach' over 'for' when index access is not required.",
      "Avoid deeply nested if statements by using guard clauses (early returns)."
    ],
    practiceQuestions: [
      {
        question: "What does the discard pattern '_' represent in a C# switch expression?",
        options: ["A null check", "The default or catch-all branch", "An error indicator", "A loop terminator"],
        answerIndex: 1,
        explanation: "In C# switch expressions, '_' represents the default case when no other pattern matches."
      }
    ],
    revisionSummary: [
      "Use guard clauses (early returns) to simplify nested if/else code.",
      "C# 8+ switch expressions provide concise pattern matching with relational and logical operators.",
      "foreach is the safest way to iterate collections without manual index management."
    ],
    references: [
      { title: "Selection Statements - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/selection-statements", source: "Microsoft Learn" }
    ]
  },

  "topic-1-3": {
    id: "topic-1-3",
    title: "Methods & Functions",
    category: "1. C# Fundamentals",
    description: "Method signatures; parameters (ref, out, in); return types; overloading",
    objectives: [
      "Define clean method signatures with return types and parameters",
      "Differentiate between pass-by-value and parameter modifiers: ref, out, and in",
      "Implement method overloading based on signature differences",
      "Use expression-bodied members and optional/named parameters"
    ],
    prerequisites: "Variables, primitive data types, and control flow.",
    terminology: [
      { term: "Method Signature", definition: "The combination of the method name, parameter types, and parameter order." },
      { term: "ref Parameter", definition: "Passes an argument by reference. Variable must be initialized beforehand." },
      { term: "out Parameter", definition: "Passes an argument by reference for output; method must assign a value." },
      { term: "in Parameter", definition: "Passes an argument by reference for performance without allowing modification." }
    ],
    concepts: [
      {
        title: "Parameter Modifiers: ref, out, and in",
        explanation: "In C#, arguments are passed by value by default. The modifiers 'ref', 'out', and 'in' change this behavior to pass by reference.",
        codeSnippet: `public class ParameterDemo
{
    public static bool TryDivide(double numerator, double denominator, out double result)
    {
        if (denominator == 0)
        {
            result = 0;
            return false;
        }
        result = numerator / denominator;
        return true;
    }

    public static void Increment(ref int counter) => counter++;
}`,
        language: "csharp",
        output: "TryDivide(10, 2, out var res) -> true, res = 5",
        lineExplanation: [
          "Line 3: 'out double result' guarantees caller receives an assigned value.",
          "Line 13: 'ref int counter' directly mutates the caller's variable."
        ]
      }
    ],
    diagram: `Parameter Passing:
Pass by Value: Caller Variable [10] ---> [Copy: 10] ---> Method Stack
Pass by Ref:   Caller Variable [10] <------------------> Method Stack (Direct Address)`,
    realWorldApplication: "int.TryParse and Dictionary.TryGetValue rely on out parameters for high-performance operations without allocating exceptions.",
    commonErrors: [
      {
        error: "Compilation error: The 'out' parameter must be assigned before control leaves current method",
        cause: "Returning from a method without assigning to the out parameter on all code paths.",
        fix: "Ensure every return branch assigns a fallback or calculated value to the out parameter."
      }
    ],
    bestPractices: [
      "Use modern out variables inline: e.g. if (int.TryParse(input, out var num)).",
      "Keep methods small and single-purposed."
    ],
    practiceQuestions: [
      {
        question: "Can two methods differ only by their return types to be considered valid overloads in C#?",
        options: ["Yes", "No, return type is not part of method signature", "Only if one return type is void", "Only in generic methods"],
        answerIndex: 1,
        explanation: "In C#, return types are not considered part of the method signature for overloading purposes."
      }
    ],
    revisionSummary: [
      "Method signatures consist of name, parameter types, and order.",
      "ref is for bidirectional modification; out is for returning values; in is for read-only references."
    ],
    references: [
      { title: "Methods in C# - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/methods", source: "Microsoft Learn" }
    ]
  },

  "topic-1-4": {
    id: "topic-1-4",
    title: "OOP Concepts",
    category: "1. C# Fundamentals",
    description: "Classes, fields, properties, constructors; this; access modifiers; namespaces",
    objectives: [
      "Define classes with fields, auto-implemented properties, and encapsulation",
      "Implement primary constructors (.NET 8) and standard constructors",
      "Understand access modifiers: public, private, protected, internal",
      "Organize code using file-scoped namespaces"
    ],
    prerequisites: "Variables, methods, and reference types.",
    terminology: [
      { term: "Encapsulation", definition: "Hiding internal object state and requiring interaction through defined properties and methods." },
      { term: "Primary Constructor", definition: "C# 12 feature enabling parameters directly in class declaration headers." }
    ],
    concepts: [
      {
        title: "Modern Class Definition & Primary Constructors",
        explanation: "C# 12 introduced primary constructors for classes. Parameters defined in the class declaration are available throughout the class body.",
        codeSnippet: `namespace FullStackLms.Core.Models;

public class BankAccount(string accountNumber, decimal initialDeposit)
{
    public string AccountNumber { get; } = accountNumber;
    public decimal Balance { get; private set; } = initialDeposit >= 0 
        ? initialDeposit 
        : throw new ArgumentException("Initial deposit cannot be negative.");

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentException("Deposit must be positive.");
        Balance += amount;
    }
}`,
        language: "csharp",
        output: "var acc = new BankAccount(\"ACC-101\", 500m); acc.Deposit(200m); // Balance = 700",
        lineExplanation: [
          "Line 3: C# 12 primary constructor directly in class header.",
          "Line 5: Auto-property with private setter protects balance from invalid external mutation."
        ]
      }
    ],
    diagram: `Access Modifier Visibility:
private:   Inside containing class only
protected: Containing class + Subclasses
internal:  Any class within the same .csproj assembly
public:    Visible everywhere`,
    realWorldApplication: "Encapsulation prevents database models and domain entities from reaching invalid states.",
    commonErrors: [
      {
        error: "Exposing public mutable fields",
        cause: "Breaks encapsulation; external code can overwrite values without validation.",
        fix: "Always use properties with private or protected setters."
      }
    ],
    bestPractices: [
      "Use file-scoped namespaces to reduce nesting indentation.",
      "Prefer auto-implemented properties over raw fields."
    ],
    practiceQuestions: [
      {
        question: "Which access modifier restricts access exclusively to the current project/assembly?",
        options: ["protected", "private", "internal", "file"],
        answerIndex: 2,
        explanation: "'internal' limits access strictly to within the compilation assembly."
      }
    ],
    revisionSummary: [
      "Encapsulation protects object state via private fields and controlled properties.",
      "Primary constructors streamline class and property initialization."
    ],
    references: [
      { title: "Object-Oriented Programming in C# - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/tutorials/oop", source: "Microsoft Learn" }
    ]
  },

  "topic-1-5": {
    id: "topic-1-5",
    title: "Inheritance & Polymorphism",
    category: "1. C# Fundamentals",
    description: "Interfaces, abstract classes; method overriding; inheritance hierarchies; early & late binding",
    objectives: [
      "Understand class inheritance (: baseClass) and the 'base' keyword",
      "Compare and contrast abstract classes vs interfaces and when to use each",
      "Implement dynamic polymorphism via virtual, override, and abstract keywords",
      "Avoid common pitfalls with method hiding (new keyword)"
    ],
    prerequisites: "Classes and methods.",
    terminology: [
      { term: "Polymorphism", definition: "The ability of different classes to respond to the same method invocation in their own unique way at runtime." },
      { term: "Abstract Class", definition: "A class that cannot be instantiated and can provide both concrete and abstract method declarations." }
    ],
    concepts: [
      {
        title: "Dynamic Polymorphism with Virtual and Override",
        explanation: "Dynamic polymorphism ensures that when a method is called on a base reference, the runtime invokes the derived class's actual overridden method.",
        codeSnippet: `public abstract class PaymentProcessor
{
    public abstract bool ProcessPayment(decimal amount);

    public virtual void SendReceipt(string email, decimal amount)
    {
        Console.WriteLine($"[Default] Sending standard receipt of {amount:C} to {email}");
    }
}

public class StripePaymentProcessor : PaymentProcessor
{
    public override bool ProcessPayment(decimal amount)
    {
        Console.WriteLine($"Processing {amount:C} via Stripe...");
        return true;
    }
}`,
        language: "csharp",
        output: "Processing $100.00 via Stripe...",
        lineExplanation: [
          "Line 3: abstract method enforces derived implementation.",
          "Line 12: override supplies the concrete Stripe logic."
        ]
      }
    ],
    diagram: `Inheritance vs Interface:
Abstract Class: Shares state & code logic (is-a relationship)
Interface:      Pure contract defining behavior (can-do relationship)`,
    realWorldApplication: "Architecting payment gateways and notification providers where implementations swap seamlessly.",
    commonErrors: [
      {
        error: "Accidentally using 'new' instead of 'override'",
        cause: "Hides the base method rather than overriding it; calls via base reference execute base version.",
        fix: "Declare base method as 'virtual' and derived as 'override'."
      }
    ],
    bestPractices: [
      "Favor composition over inheritance.",
      "Keep inheritance hierarchies shallow (under 3 levels)."
    ],
    practiceQuestions: [
      {
        question: "Can a C# class inherit from multiple base classes?",
        options: ["Yes", "No, C# enforces single class inheritance but allows multiple interfaces", "Only in .NET 8+", "Only if abstract"],
        answerIndex: 1,
        explanation: "C# enforces single class inheritance but permits implementing any number of interfaces."
      }
    ],
    revisionSummary: [
      "Abstract classes provide common state; interfaces provide decoupled contracts.",
      "Virtual and override enable late runtime method binding."
    ],
    references: [
      { title: "Inheritance in C# - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/object-oriented/inheritance", source: "Microsoft Learn" }
    ]
  },

  "topic-1-6": {
    id: "topic-1-6",
    title: "Modern C# Types",
    category: "1. C# Fundamentals",
    description: "Records; structs; tuples; when to use each",
    objectives: [
      "Master positional records and value-based equality in C# 9+",
      "Understand value-type memory mechanics with structs and readonly structs",
      "Use tuples and named tuples for lightweight multi-value returns",
      "Know precisely when to choose between class, struct, record class, and record struct"
    ],
    prerequisites: "Classes and value types.",
    terminology: [
      { term: "Record", definition: "A type providing built-in value-based equality and non-destructive mutation via with-expressions." }
    ],
    concepts: [
      {
        title: "Records and Value Equality",
        explanation: "Records are designed for immutable data carriers (like DTOs and API responses).",
        codeSnippet: `public record UserDto(int Id, string Username, string Email);

var u1 = new UserDto(1, "alice", "alice@test.com");
var u2 = new UserDto(1, "alice", "alice@test.com");

Console.WriteLine($"u1 == u2: {u1 == u2}"); // True! Value equality

var u3 = u1 with { Email = "new@test.com" }; // Non-destructive mutation`,
        language: "csharp",
        output: "u1 == u2: True",
        lineExplanation: [
          "Line 1: Positional record automatically implements equality by property values.",
          "Line 8: 'with' creates a new instance with modified Email."
        ]
      }
    ],
    diagram: `Choosing Types:
DTO / Immutable Data -> Record
Small (<16 bytes) Math/Point -> readonly struct
Method multi-return -> (Value, Tuple)
Rich Domain Entity -> class`,
    realWorldApplication: "Web API request/response DTOs should almost always be records.",
    commonErrors: [
      {
        error: "Creating large mutable structs",
        cause: "Structs copy by value; passing large structs incurs significant memory copy overhead.",
        fix: "Keep structs under 16 bytes, or use classes."
      }
    ],
    bestPractices: [
      "Use 'record' for Web API request/response DTOs.",
      "Prefer readonly struct for value types."
    ],
    practiceQuestions: [
      {
        question: "How do two instances of a 'record' evaluate equality?",
        options: ["Reference addresses", "Values of their properties", "Creation thread", "Cannot be compared"],
        answerIndex: 1,
        explanation: "Records compare property values rather than memory addresses."
      }
    ],
    revisionSummary: [
      "Records deliver value equality for DTOs.",
      "Structs are stack-allocated and lightweight.",
      "Tuples provide zero-allocation multi-value returns."
    ],
    references: [
      { title: "Records in C# - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/records", source: "Microsoft Learn" }
    ]
  },

  "topic-1-7": {
    id: "topic-1-7",
    title: "Exception Handling",
    category: "1. C# Fundamentals",
    description: "try-catch-finally; throw; custom exceptions; exception filters",
    objectives: [
      "Structure robust error handling with try, catch, and finally blocks",
      "Apply exception filters using the 'when' keyword",
      "Avoid stack trace loss by using bare 'throw' instead of 'throw ex'",
      "Author domain-specific custom exceptions"
    ],
    prerequisites: "Methods and control flow.",
    terminology: [
      { term: "Exception Filter", definition: "A condition attached to a catch block using 'when (...)' to catch errors selectively without stack unwinding." }
    ],
    concepts: [
      {
        title: "Exception Filters and Stack Preservation",
        explanation: "Use 'when' filters to selectively catch exceptions, and always use bare 'throw;' to preserve diagnostic history.",
        codeSnippet: `try
{
    CallPaymentApi();
}
catch (HttpRequestException ex) when (ex.StatusCode == System.Net.HttpStatusCode.GatewayTimeout)
{
    Console.WriteLine("Gateway timeout - retrying...");
}
catch (Exception)
{
    // Preserves original call stack!
    throw;
}`,
        language: "csharp",
        output: "Gateway timeout - retrying...",
        lineExplanation: [
          "Line 5: 'when' filter inspects HTTP status code before unwinding.",
          "Line 11: Bare 'throw;' preserves the original line numbers and call origins."
        ]
      }
    ],
    diagram: `try -> catch (when condition) -> finally runs unconditionally`,
    realWorldApplication: "Global exception handling in ASP.NET Core converts custom domain exceptions into ProblemDetails HTTP responses.",
    commonErrors: [
      {
        error: "Writing 'throw ex;'",
        cause: "Resets the stack trace to the catch line, erasing the original error origin.",
        fix: "Always use bare 'throw;'."
      }
    ],
    bestPractices: [
      "Never catch System.Exception and swallow it silently.",
      "Use exception filters ('when') instead of catch-and-rethrow."
    ],
    practiceQuestions: [
      {
        question: "Why should you use 'throw;' instead of 'throw ex;'?",
        options: ["Faster compilation", "Preserves original call stack trace", "Required by .NET 8", "No difference"],
        answerIndex: 1,
        explanation: "'throw;' preserves the stack trace, whereas 'throw ex;' resets it."
      }
    ],
    revisionSummary: [
      "try-catch-finally manages runtime failures.",
      "Exception filters ('when') allow granular catching.",
      "Use bare 'throw;' to preserve stack traces."
    ],
    references: [
      { title: "Exceptions - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/", source: "Microsoft Learn" }
    ]
  },

  "topic-1-8": {
    id: "topic-1-8",
    title: "Collections",
    category: "1. C# Fundamentals",
    description: "List, Dictionary, HashSet, Queue, Stack; IEnumerable; iteration patterns; when to use which collection",
    objectives: [
      "Choose the optimal collection based on algorithmic complexity (Big-O)",
      "Master O(1) lookups with Dictionary and HashSet",
      "Understand IEnumerable and deferred iteration",
      "Implement FIFO (Queue) and LIFO (Stack) patterns"
    ],
    prerequisites: "Loops and data types.",
    terminology: [
      { term: "Big-O", definition: "Measure of time or memory complexity as collection size grows." }
    ],
    concepts: [
      {
        title: "Choosing the Right Collection",
        explanation: "Selecting the correct collection is crucial: List for ordered sequences, Dictionary for key-value, HashSet for uniqueness.",
        codeSnippet: `var list = new List<string> { "a", "b", "c" }; // O(1) add, O(N) search
var dict = new Dictionary<int, string> { [1] = "Admin", [2] = "User" }; // O(1) lookup
var set = new HashSet<string> { "active", "pending" }; // O(1) set check`,
        language: "csharp",
        output: "Provides optimal memory and lookup mechanics.",
        lineExplanation: [
          "List is ordered; Dictionary uses hashing for instant lookup; HashSet prevents duplicates."
        ]
      }
    ],
    diagram: `Collection Lookup Time:
List<T>:        O(N) search
Dictionary<K,V>:O(1) search
HashSet<T>:     O(1) presence check`,
    realWorldApplication: "In-memory caching of permissions with HashSet<string> for sub-millisecond authorization checks.",
    commonErrors: [
      {
        error: "Accessing dict[key] without checking existence",
        cause: "Throws KeyNotFoundException if key is missing.",
        fix: "Use dict.TryGetValue(key, out var val)."
      }
    ],
    bestPractices: [
      "Use TryGetValue() instead of ContainsKey() followed by indexer.",
      "Expose IReadOnlyList or IEnumerable from public APIs."
    ],
    practiceQuestions: [
      {
        question: "Which collection provides O(1) lookup to check if an item exists without duplicates?",
        options: ["List<T>", "HashSet<T>", "Queue<T>", "Stack<T>"],
        answerIndex: 1,
        explanation: "HashSet<T> provides O(1) lookups and enforces item uniqueness."
      }
    ],
    revisionSummary: [
      "List is ordered; Dictionary and HashSet offer O(1) lookups.",
      "Queue is FIFO; Stack is LIFO."
    ],
    references: [
      { title: "Commonly Used Collection Types - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/standard/collections/commonly-used-collection-types", source: "Microsoft Learn" }
    ]
  },

  "topic-1-9": {
    id: "topic-1-9",
    title: "Generics",
    category: "1. C# Fundamentals",
    description: "Generic classes, methods, constraints; covariance & contravariance awareness",
    objectives: [
      "Author reusable, type-safe generic classes and methods",
      "Apply generic constraints (where T : class, struct, new(), IEntity)",
      "Eliminate runtime boxing/unboxing overhead with generic types"
    ],
    prerequisites: "Classes and interfaces.",
    terminology: [
      { term: "Generic Constraint", definition: "A requirement restricting what types can be supplied as arguments for T." }
    ],
    concepts: [
      {
        title: "Generic Repository and Constraints",
        explanation: "Generics enable creating reusable components without sacrificing type safety or boxing performance.",
        codeSnippet: `public interface IEntity { public int Id { get; set; } }

public class Repository<T> where T : class, IEntity, new()
{
    private readonly List<T> _items = new();
    public void Add(T entity) => _items.Add(entity);
    public T? GetById(int id) => _items.FirstOrDefault(x => x.Id == id);
}`,
        language: "csharp",
        output: "Type-safe repository without boxing overhead.",
        lineExplanation: [
          "where T : class, IEntity, new() enforces that T is a reference type with an Id and default constructor."
        ]
      }
    ],
    diagram: `Generics: Type safety + Zero boxing overhead + Maximum code reuse`,
    realWorldApplication: "Architecting Entity Framework DbSets, generic API response wrappers (ApiResponse<T>), and MediatR handlers.",
    commonErrors: [
      {
        error: "Cannot create instance of T without new() constraint",
        cause: "Calling 'new T()' without telling compiler T has a default constructor.",
        fix: "Add 'where T : new()'."
      }
    ],
    bestPractices: [
      "Apply constraints to generics when accessing specific properties or constructors.",
      "Use descriptive parameter names like TKey, TValue."
    ],
    practiceQuestions: [
      {
        question: "What performance issue do generics eliminate for value types?",
        options: ["Memory leaks", "Boxing and unboxing", "Garbage collection", "Thread contention"],
        answerIndex: 1,
        explanation: "Generics eliminate boxing/unboxing by generating specialized code for each value type."
      }
    ],
    revisionSummary: [
      "Generics maximize code reuse and type safety.",
      "Constraints ('where') define type expectations."
    ],
    references: [
      { title: "Generics in C# - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/generics", source: "Microsoft Learn" }
    ]
  },

  "topic-1-10": {
    id: "topic-1-10",
    title: "Delegates, Lambdas & Events",
    category: "1. C# Fundamentals",
    description: "Delegate types; lambda expressions; Action, Func, Predicate; events & event handlers",
    objectives: [
      "Understand delegates as type-safe function pointers",
      "Write concise lambda expressions ((args) => expression)",
      "Master standard built-in delegates: Action and Func",
      "Implement publish-subscribe patterns using events"
    ],
    prerequisites: "Methods and interfaces.",
    terminology: [
      { term: "Action", definition: "A delegate representing a method that returns void." },
      { term: "Func", definition: "A delegate representing a method that returns a value (last type arg is return type)." }
    ],
    concepts: [
      {
        title: "Action, Func, and Lambdas",
        explanation: "Action and Func represent callbacks and functions as first-class variables.",
        codeSnippet: `Action<string> log = msg => Console.WriteLine($"LOG: {msg}");
Func<int, int, int> add = (x, y) => x + y;

log("Ready");
Console.WriteLine($"Result: {add(10, 20)}");`,
        language: "csharp",
        output: "LOG: Ready\nResult: 30",
        lineExplanation: [
          "Action<string> returns void; Func<int, int, int> takes two ints and returns an int."
        ]
      }
    ],
    diagram: `Action: (args) => void
Func:   (args) => TResult`,
    realWorldApplication: "LINQ query filtering, background job lifecycle notifications, and event-driven architectures.",
    commonErrors: [
      {
        error: "Memory leaks due to dangling event subscriptions",
        cause: "Long-lived publishers hold references to short-lived subscribers.",
        fix: "Unsubscribe using '-=' in Dispose()."
      }
    ],
    bestPractices: [
      "Use Action and Func instead of declaring custom delegates.",
      "Invoke events with 'Event?.Invoke(this, args)'."
    ],
    practiceQuestions: [
      {
        question: "What is the return type of Action<int, string>?",
        options: ["int", "string", "void", "bool"],
        answerIndex: 2,
        explanation: "All Action delegates return void."
      }
    ],
    revisionSummary: [
      "Action is for void; Func returns a value.",
      "Events implement pub/sub with '?.' safe invocation."
    ],
    references: [
      { title: "Delegates in C# - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/", source: "Microsoft Learn" }
    ]
  },

  "topic-1-11": {
    id: "topic-1-11",
    title: "Memory Management",
    category: "1. C# Fundamentals",
    description: "Value vs reference types on stack/heap; garbage collection basics; IDisposable & using",
    objectives: [
      "Understand .NET Garbage Collection generations (Gen 0, 1, 2, LOH)",
      "Manage unmanaged resources with IDisposable",
      "Use modern 'using' declarations for automated disposal",
      "Avoid memory leaks from static references and event listeners"
    ],
    prerequisites: "Stack vs Heap and Classes.",
    terminology: [
      { term: "IDisposable", definition: "An interface providing Dispose() for deterministic cleanup of unmanaged resources." }
    ],
    concepts: [
      {
        title: "Deterministic Cleanup with 'using'",
        explanation: "External OS resources (sockets, file streams) must be released promptly with IDisposable.",
        codeSnippet: `public static void ProcessData()
{
    using var stream = File.OpenRead("data.json");
    // Stream is disposed deterministically at method exit!
}`,
        language: "csharp",
        output: "Resource opened and cleanly closed at end of block scope.",
        lineExplanation: [
          "'using var' automatically calls Dispose() when variable falls out of scope."
        ]
      }
    ],
    diagram: `GC Generations:
Gen 0 (Frequent, fast) -> Gen 1 -> Gen 2 (Full GC, rare, long-lived)
Large Object Heap (LOH): Objects > 85,000 bytes`,
    realWorldApplication: "Ensuring database connections and HTTP client response streams do not leak socket handles.",
    commonErrors: [
      {
        error: "Exhausting database connection pool",
        cause: "Failing to dispose connections with 'using'.",
        fix: "Always declare disposables with 'using var conn = ...;'."
      }
    ],
    bestPractices: [
      "Use 'using var' for every IDisposable.",
      "Never call GC.Collect() manually in web apps."
    ],
    practiceQuestions: [
      {
        question: "What is the primary purpose of IDisposable in .NET?",
        options: ["Run GC immediately", "Deterministic cleanup of unmanaged resources like file handles", "Convert to struct", "Make object serializable"],
        answerIndex: 1,
        explanation: "IDisposable provides deterministic cleanup of unmanaged OS resources."
      }
    ],
    revisionSummary: [
      "GC handles managed heap memory across generations.",
      "Unmanaged resources require IDisposable and 'using'."
    ],
    references: [
      { title: "Garbage Collection Fundamentals - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/fundamentals", source: "Microsoft Learn" }
    ]
  },

  "topic-1-12": {
    id: "topic-1-12",
    title: "AI Integration in C# Fundamentals",
    category: "1. C# Fundamentals",
    description: "Using Copilot for boilerplate generation (classes, properties, collections code); critically reviewing AI-generated OOP code",
    objectives: [
      "Prompt AI tools effectively to scaffold C# classes, records, and boilerplate",
      "Critically audit AI-generated code for encapsulation and resource leaks",
      "Refactor AI output to adhere to clean code and SOLID standards"
    ],
    prerequisites: "C# Fundamentals (Topics 1-1 to 1-11).",
    terminology: [
      { term: "Code Audit", definition: "Systematically inspecting AI-generated code for security, nullability, and resource leaks." }
    ],
    concepts: [
      {
        title: "Prompting and Auditing C# Code",
        explanation: "AI accelerates boilerplate generation, but engineers must inspect output for defensive checks and unmanaged resource leaks.",
        codeSnippet: `// Enhanced AI Record with defensive validation
public record CustomerDto(int Id, string Name, string Email)
{
    public CustomerDto
    {
        if (Id <= 0) throw new ArgumentException("Id must be positive.");
        if (string.IsNullOrWhiteSpace(Name)) throw new ArgumentException("Name required.");
    }
}`,
        language: "csharp",
        output: "Production-ready record with validation guards.",
        lineExplanation: [
          "Adds domain validation guards to AI-scaffolded records."
        ]
      }
    ],
    diagram: `Prompt -> AI Scaffolds -> Engineer Audits & Validates -> Production Code`,
    realWorldApplication: "Scaffolding DTOs, regex patterns, and mapping logic with Copilot while maintaining architectural control.",
    commonErrors: [
      {
        error: "Accepting AI code without checking for 'using' disposal",
        cause: "AI often creates streams or clients without proper disposal.",
        fix: "Verify that all IDisposable types are wrapped in 'using'."
      }
    ],
    bestPractices: [
      "Specify target .NET version in prompts (.NET 8).",
      "Review AI output for thread safety and nullability."
    ],
    practiceQuestions: [
      {
        question: "When reviewing AI-generated C# code that accesses files, what must you verify?",
        options: ["Variables use camelCase", "Resources are managed with using statements or DI", "Methods are static", "Lines have XML comments"],
        answerIndex: 1,
        explanation: "Verifying resource disposal prevents socket and file handle exhaustion."
      }
    ],
    revisionSummary: [
      "AI accelerates boilerplate generation.",
      "Engineers must review output for security and resource management."
    ],
    references: [
      { title: "GitHub Copilot Documentation", url: "https://docs.github.com/en/copilot", source: "GitHub Docs" }
    ]
  },

  "topic-1-13": {
    id: "topic-1-13",
    title: "Assessment 1: C# Fundamentals Checkpoint",
    category: "1. C# Fundamentals",
    description: "Coding exercise: OOP design, collections manipulation, delegates, LINQ-ready data processing problem",
    objectives: [
      "Synthesize all Module 1 topics into a complete console application",
      "Implement an inventory system with OOP encapsulation and custom exceptions",
      "Use generic collections (Dictionary, List) and delegates for dynamic calculations"
    ],
    prerequisites: "Topics 1-1 through 1-12.",
    terminology: [
      { term: "Checkpoint Assessment", definition: "A practical coding project demonstrating mastery of foundational programming concepts." }
    ],
    concepts: [
      {
        title: "Enterprise Inventory & Discount Engine",
        explanation: "Demonstrates records, collections, delegates, custom exceptions, and pattern matching.",
        codeSnippet: `public record ProductItem(int Id, string Name, decimal Price, int Stock);
public class OutOfStockException(string msg) : Exception(msg);

public class InventoryManager
{
    private readonly Dictionary<int, ProductItem> _inventory = new();
    public void AddProduct(ProductItem item) => _inventory[item.Id] = item;

    public decimal CalculateTotal(int productId, int quantity, Func<decimal, decimal> discountRule)
    {
        if (!_inventory.TryGetValue(productId, out var item))
            throw new KeyNotFoundException("Product not found.");
        if (item.Stock < quantity)
            throw new OutOfStockException("Insufficient stock.");

        return discountRule(item.Price * quantity);
    }
}`,
        language: "csharp",
        output: "Final Order Price calculated using injected discount rule.",
        lineExplanation: [
          "Uses dictionary for O(1) lookup, custom exception for business rules, and Func delegate for discount strategy."
        ]
      }
    ],
    diagram: `Order Request -> Check Dict O(1) -> Verify Stock -> Apply Func<decimal, decimal> Discount`,
    realWorldApplication: "Core domain logic used in e-commerce backend ordering engines.",
    commonErrors: [
      {
        error: "Modifying stock directly without concurrency validation",
        cause: "Multiple threads could deplete stock simultaneously.",
        fix: "Use atomic database transactions or concurrency checks."
      }
    ],
    bestPractices: [
      "Separate data models from business rule orchestrators.",
      "Validate caller parameters before executing calculations."
    ],
    practiceQuestions: [
      {
        question: "Why is Func<decimal, decimal> preferred for discount calculation?",
        options: ["Faster runtime", "Adheres to Open/Closed Principle by allowing dynamic discount algorithms", "Avoids stack memory", "Required by .NET 8"],
        answerIndex: 1,
        explanation: "Injecting logic via delegates enables extension without modifying the existing class."
      }
    ],
    revisionSummary: [
      "Combines records, dictionary lookups, custom exceptions, and delegates.",
      "Validates full mastery of C# language fundamentals."
    ],
    references: [
      { title: "C# Documentation - Microsoft Learn", url: "https://learn.microsoft.com/en-us/dotnet/csharp/", source: "Microsoft Learn" }
    ]
  }
};

writeModule('module01_csharp_fundamentals.js', 'MODULE_01_LESSONS', m1);
