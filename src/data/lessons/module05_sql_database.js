/**
 * Pre-generated comprehensive lessons for MODULE_05_LESSONS
 * Sources: Microsoft Learn, SQL Docs, ASP.NET Core Guides.
 */

export const MODULE_05_LESSONS = {
  "topic-5-1": {
    "id": "topic-5-1",
    "title": "Relational DB Concepts",
    "category": "5. SQL & Database",
    "description": "Tables, schemas, primary keys, foreign keys, constraints; normalization (1NF-3NF); when to denormalize",
    "objectives": [
      "Understand relational database design, tables, schemas, and relational integrity",
      "Master primary keys (PK), foreign keys (FK), unique constraints, and check constraints",
      "Apply database normalization rules from First Normal Form (1NF) through Third Normal Form (3NF)",
      "Evaluate trade-offs between normalized OLTP architectures and denormalized read models"
    ],
    "prerequisites": "Basic understanding of data structures and tabular data.",
    "terminology": [
      {
        "term": "Primary Key (PK)",
        "definition": "A column or combination of columns that uniquely identifies each row in a database table."
      },
      {
        "term": "Foreign Key (FK)",
        "definition": "A column that creates a relationship by referencing the primary key of another table, enforcing referential integrity."
      },
      {
        "term": "Normalization (1NF-3NF)",
        "definition": "The process of organizing data to reduce redundancy and improve data integrity (1NF: atomic values, 2NF: no partial key dependencies, 3NF: no transitive dependencies)."
      },
      {
        "term": "Denormalization",
        "definition": "Deliberately adding redundant data to optimize read performance in analytical or high-traffic reporting queries."
      }
    ],
    "concepts": [
      {
        "title": "Relational Schema Design & Normalization",
        "explanation": "Relational schemas prevent anomalies (insert, update, delete) by separating data into logically related tables linked via foreign keys.",
        "codeSnippet": "-- Customer Table (1NF, 2NF, 3NF compliant)\nCREATE TABLE Customers (\n    CustomerId INT IDENTITY(1,1) PRIMARY KEY,\n    Email NVARCHAR(255) NOT NULL UNIQUE,\n    FullName NVARCHAR(150) NOT NULL,\n    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()\n);\n\n-- Orders Table with Foreign Key constraint\nCREATE TABLE Orders (\n    OrderId INT IDENTITY(1,1) PRIMARY KEY,\n    CustomerId INT NOT NULL,\n    OrderDate DATETIME2 NOT NULL,\n    TotalAmount DECIMAL(18, 2) NOT NULL CHECK (TotalAmount >= 0),\n    Status NVARCHAR(50) NOT NULL DEFAULT 'Pending',\n    CONSTRAINT FK_Orders_Customers FOREIGN KEY (CustomerId) \n        REFERENCES Customers(CustomerId) ON DELETE CASCADE\n);",
        "language": "sql",
        "output": "Commands completed successfully. Enforced primary key, foreign key cascade, unique constraint, and positive check constraint.",
        "lineExplanation": [
          "Line 3: IDENTITY(1,1) generates auto-incrementing integer surrogate keys.",
          "Line 4: UNIQUE constraint prevents duplicate email signups at the database engine level.",
          "Line 16: FOREIGN KEY enforces that every Order must reference a valid Customer, with ON DELETE CASCADE cleaning up child rows."
        ]
      }
    ],
    "diagram": "Entity-Relationship Diagram:\n+-------------------+             +-----------------------+\n|    CUSTOMERS      | 1         N |        ORDERS         |\n+-------------------+-------------+-----------------------+\n| PK CustomerId     | <---------- | FK CustomerId         |\n|    Email (Unique) |             | PK OrderId            |\n|    FullName       |             |    TotalAmount        |\n+-------------------+             +-----------------------+",
    "realWorldApplication": "Ensuring banking and e-commerce transactions never create orphaned records (e.g. an order existing without a valid customer).",
    "commonErrors": [
      {
        "error": "Storing comma-separated values in a single column (e.g. Products: '1,4,9')",
        "cause": "Violates First Normal Form (1NF); makes searching and indexing individual items impossible without slow full-table scans.",
        "fix": "Create a junction table (OrderItems) with OrderId and ProductId."
      }
    ],
    "bestPractices": [
      "Always define a Primary Key for every relational table.",
      "Normalize to 3NF for transactional OLTP workloads; consider denormalization only for dedicated read replicas or data warehouses.",
      "Enforce constraints (CHECK, UNIQUE, NOT NULL) in the database as the final line of defense."
    ],
    "practiceQuestions": [
      {
        "question": "What requirement satisfies Third Normal Form (3NF)?",
        "options": [
          "The table contains no primary key.",
          "The table is in 2NF and has no transitive functional dependencies (non-key columns do not depend on other non-key columns).",
          "All rows are stored in JSON.",
          "Every column must be an integer."
        ],
        "answerIndex": 1,
        "explanation": "3NF requires being in 2NF and eliminating transitive dependencies where non-key attributes depend on other non-key attributes."
      }
    ],
    "revisionSummary": [
      "Primary Keys uniquely identify records; Foreign Keys enforce relationships.",
      "Normalization eliminates redundancy across 1NF, 2NF, and 3NF.",
      "Denormalization is reserved for read optimization."
    ],
    "references": [
      {
        "title": "Relational Database Design Basics - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/tables/tables",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-5-2": {
    "id": "topic-5-2",
    "title": "DDL & DML and Transactions",
    "category": "5. SQL & Database",
    "description": "CREATE, ALTER, DROP; INSERT, UPDATE, DELETE, MERGE; transactions (BEGIN, COMMIT, ROLLBACK); ACID properties",
    "objectives": [
      "Distinguish between Data Definition Language (DDL) and Data Manipulation Language (DML)",
      "Execute safe data modifications with INSERT, UPDATE, DELETE, and MERGE",
      "Manage atomic transactions using BEGIN TRAN, COMMIT, and ROLLBACK",
      "Understand the ACID properties: Atomicity, Consistency, Isolation, and Durability"
    ],
    "prerequisites": "Relational DB concepts (Topic 5-1).",
    "terminology": [
      {
        "term": "DDL",
        "definition": "Data Definition Language (CREATE, ALTER, DROP) which defines the structure/schema of the database."
      },
      {
        "term": "DML",
        "definition": "Data Manipulation Language (SELECT, INSERT, UPDATE, DELETE) which manages the data records within the tables."
      },
      {
        "term": "ACID",
        "definition": "Atomicity (all-or-nothing), Consistency (rules enforced), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes)."
      },
      {
        "term": "MERGE (UPSERT)",
        "definition": "A DML statement that performs INSERT, UPDATE, or DELETE operations in a single statement based on matching source and target records."
      }
    ],
    "concepts": [
      {
        "title": "Atomic Transactions and Money Transfer",
        "explanation": "Transactions guarantee that a group of database operations either completely succeed or completely fail, maintaining consistency.",
        "codeSnippet": "-- Bank Transfer Transaction demonstrating ACID\nBEGIN TRANSACTION;\nBEGIN TRY\n    -- 1. Deduct from Sender\n    UPDATE Accounts \n    SET Balance = Balance - 500.00 \n    WHERE AccountId = 101 AND Balance >= 500.00;\n\n    IF @@ROWCOUNT = 0\n        THROW 50001, 'Insufficient balance or account not found.', 1;\n\n    -- 2. Credit Receiver\n    UPDATE Accounts \n    SET Balance = Balance + 500.00 \n    WHERE AccountId = 202;\n\n    -- Commit transaction if both succeeded\n    COMMIT TRANSACTION;\n    PRINT 'Transfer successful!';\nEND TRY\nBEGIN CATCH\n    -- Rollback on any failure to prevent half-completed transfers\n    IF @@TRANCOUNT > 0\n        ROLLBACK TRANSACTION;\n    PRINT 'Transfer failed: ' + ERROR_MESSAGE();\nEND CATCH;",
        "language": "sql",
        "output": "Transfer successful! Balance atomically transferred.",
        "lineExplanation": [
          "Line 2: BEGIN TRANSACTION opens an atomic boundary.",
          "Line 10: Checks @@ROWCOUNT to verify that the deduction actually affected an eligible account.",
          "Line 17: COMMIT TRANSACTION permanently writes changes to the transaction log.",
          "Line 23: ROLLBACK TRANSACTION reverses all intermediate changes if any error was caught."
        ]
      }
    ],
    "diagram": "ACID Transaction Guarantee:\n[ Begin Transaction ]\n        |\n  [ Step 1: Debit Account A ]\n        |\n  [ Step 2: Credit Account B ]\n        |\n     /     \\\n (Success)   (Error Occurred)\n    |              |\n [ COMMIT ]    [ ROLLBACK ] (Zero partial state!)",
    "realWorldApplication": "Financial ledgers, order checkout pipelines, and inventory reservations requiring strict zero-loss consistency.",
    "commonErrors": [
      {
        "error": "Accidentally running UPDATE or DELETE without a WHERE clause",
        "cause": "Updates or deletes all rows across the entire table.",
        "fix": "Always write the WHERE clause first or test updates inside a rollback transaction block: BEGIN TRAN; UPDATE ...; ROLLBACK;."
      }
    ],
    "bestPractices": [
      "Keep transactions as short as possible to avoid long-held row or table locks.",
      "Always wrap multiple related state changes in a TRY...CATCH transaction block.",
      "Never prompt for user input or perform network I/O inside an open database transaction."
    ],
    "practiceQuestions": [
      {
        "question": "What does the 'A' in the ACID transaction model stand for?",
        "options": [
          "Asynchronous",
          "Atomicity (all operations succeed or all roll back)",
          "Authorization",
          "Auto-increment"
        ],
        "answerIndex": 1,
        "explanation": "Atomicity guarantees that all statements in a transaction complete successfully, or all changes are rolled back completely."
      }
    ],
    "revisionSummary": [
      "DDL shapes schema; DML mutates data.",
      "Transactions guarantee ACID compliance.",
      "Always use TRY...CATCH with ROLLBACK to protect data integrity."
    ],
    "references": [
      {
        "title": "Transactions in SQL Server - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/transactions-transact-sql",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-5-3": {
    "id": "topic-5-3",
    "title": "Basic to Intermediate Queries",
    "category": "5. SQL & Database",
    "description": "SELECT, WHERE, ORDER BY, GROUP BY, HAVING; aggregate functions (COUNT, SUM, AVG); DISTINCT; aliases",
    "objectives": [
      "Master the logical query processing order in SQL (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY)",
      "Filter rows with complex predicate logic (AND, OR, NOT, IN, BETWEEN, LIKE)",
      "Aggregate datasets with COUNT, SUM, AVG, MIN, and MAX",
      "Differentiate between row filtering (WHERE) and group filtering (HAVING)"
    ],
    "prerequisites": "Relational DB concepts and tables.",
    "terminology": [
      {
        "term": "Logical Query Processing Order",
        "definition": "The exact sequence in which SQL Server evaluates clauses, differing from the written syntax."
      },
      {
        "term": "HAVING Clause",
        "definition": "Filters grouped rows produced by GROUP BY based on aggregate calculations (unlike WHERE which filters individual rows before grouping)."
      }
    ],
    "concepts": [
      {
        "title": "Mastering Grouping and Aggregates",
        "explanation": "Understanding the difference between WHERE and HAVING is essential: WHERE filters rows before aggregation; HAVING filters groups after aggregation.",
        "codeSnippet": "-- Find departments with more than 3 active employees having an average salary > $80,000\nSELECT \n    Department,\n    COUNT(*) AS TotalEmployees,\n    AVG(Salary) AS AverageSalary,\n    MAX(Salary) AS HighestSalary\nFROM Employees\nWHERE IsActive = 1 -- 1. Filters raw rows before grouping\nGROUP BY Department -- 2. Groups remaining active employees\nHAVING COUNT(*) > 3 AND AVG(Salary) > 80000 -- 3. Filters aggregated groups\nORDER BY AverageSalary DESC; -- 4. Orders the final output",
        "language": "sql",
        "output": "Department | TotalEmployees | AverageSalary | HighestSalary\nEngineering | 12 | $112,500.00 | $165,000.00\nProduct | 5 | $98,000.00 | $130,000.00",
        "lineExplanation": [
          "Line 7: 'WHERE IsActive = 1' discards inactive workers before any calculations happen.",
          "Line 8: 'GROUP BY Department' segments rows into distinct department buckets.",
          "Line 9: 'HAVING COUNT(*) > 3' evaluates only the aggregated group results.",
          "Line 10: 'ORDER BY AverageSalary DESC' sorts descending."
        ]
      }
    ],
    "diagram": "Logical SQL Execution Order:\n1. FROM / JOIN   (Identify source tables)\n2. WHERE         (Filter rows)\n3. GROUP BY      (Form groups)\n4. HAVING        (Filter grouped metrics)\n5. SELECT        (Evaluate expressions & aliases)\n6. DISTINCT      (Remove duplicates)\n7. ORDER BY      (Sort final set)\n8. TOP / OFFSET  (Limit returned rows)",
    "realWorldApplication": "Generating business intelligence reports, monthly sales revenue aggregations, and customer churn metrics.",
    "commonErrors": [
      {
        "error": "Attempting to use an aggregate function in the WHERE clause (e.g. WHERE COUNT(*) > 5)",
        "cause": "WHERE executes before rows are grouped, so aggregates do not yet exist.",
        "fix": "Place aggregate condition checks inside the HAVING clause."
      },
      {
        "error": "Referencing a SELECT column alias in the WHERE clause",
        "cause": "WHERE is evaluated before SELECT; the database has not yet computed the alias.",
        "fix": "Repeat the expression in WHERE, or wrap the query in a Common Table Expression (CTE)."
      }
    ],
    "bestPractices": [
      "Filter as early as possible in WHERE to minimize the volume of data passed to GROUP BY.",
      "Avoid 'SELECT *' in production code; explicitly name required columns.",
      "Use COUNT(1) or COUNT(*) for general row counting."
    ],
    "practiceQuestions": [
      {
        "question": "What is the key difference between WHERE and HAVING in SQL?",
        "options": [
          "WHERE can only be used with numbers.",
          "WHERE filters rows before grouping; HAVING filters aggregated groups after GROUP BY.",
          "HAVING executes before FROM.",
          "There is no difference."
        ],
        "answerIndex": 1,
        "explanation": "WHERE filters individual table rows prior to aggregation, while HAVING filters the grouped buckets produced by GROUP BY."
      }
    ],
    "revisionSummary": [
      "SQL execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.",
      "WHERE filters rows; HAVING filters aggregates.",
      "Always specify explicit column lists instead of SELECT *."
    ],
    "references": [
      {
        "title": "SELECT - Transact-SQL - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-5-4": {
    "id": "topic-5-4",
    "title": "SQL Joins",
    "category": "5. SQL & Database",
    "description": "INNER, LEFT, RIGHT, FULL OUTER, CROSS; self-joins; join performance considerations",
    "objectives": [
      "Combine data from multiple tables using INNER, LEFT, RIGHT, and FULL OUTER joins",
      "Model hierarchical relationships using SELF JOINs (e.g. Employees and Managers)",
      "Understand Cartesian products with CROSS JOIN and when they are appropriate",
      "Optimize join performance by creating foreign key indexes"
    ],
    "prerequisites": "Relational concepts and basic queries (Topics 5-1 and 5-3).",
    "terminology": [
      {
        "term": "INNER JOIN",
        "definition": "Returns only records that have matching values in both joined tables."
      },
      {
        "term": "LEFT JOIN (LEFT OUTER)",
        "definition": "Returns all records from the left table and matched records from the right table (NULL if no match)."
      },
      {
        "term": "SELF JOIN",
        "definition": "A regular join in which a table is joined with itself using aliasing to navigate hierarchy."
      }
    ],
    "concepts": [
      {
        "title": "Join Types and Self-Joins",
        "explanation": "Joins link tables along foreign key relationships. A Self-Join is used when records within the same table reference each other (e.g. manager hierarchies).",
        "codeSnippet": "-- 1. INNER JOIN vs LEFT JOIN\nSELECT \n    c.FullName,\n    o.OrderId,\n    o.TotalAmount\nFROM Customers c\nLEFT JOIN Orders o ON c.CustomerId = o.CustomerId; \n-- Returns ALL customers even if they have zero orders!\n\n-- 2. SELF JOIN: Employee to Manager hierarchy\nSELECT \n    emp.FullName AS EmployeeName,\n    ISNULL(mgr.FullName, 'Top Executive') AS ManagerName\nFROM Employees emp\nLEFT JOIN Employees mgr ON emp.ManagerId = mgr.EmployeeId;",
        "language": "sql",
        "output": "EmployeeName | ManagerName\nJohn Doe | Jane Smith\nJane Smith | Top Executive",
        "lineExplanation": [
          "Line 7: 'LEFT JOIN' guarantees that prospective customers with 0 orders are preserved in the result set.",
          "Line 14: Joining 'Employees emp' with 'Employees mgr' on 'emp.ManagerId = mgr.EmployeeId' maps the reporting tree."
        ]
      }
    ],
    "diagram": "Venn Diagram of Joins:\nINNER JOIN:       [ A  ( A ∩ B )  B ]  --> Only the overlapping intersection\nLEFT OUTER JOIN:  [ ( A ) ( A ∩ B )  B ]  --> All of A, plus matched B (null if missing)\nFULL OUTER JOIN:  [ All of A AND All of B ]",
    "realWorldApplication": "Retrieving user profiles alongside order histories, permissions, and organizational org charts in one round-trip.",
    "commonErrors": [
      {
        "error": "Accidentally converting a LEFT JOIN into an INNER JOIN via the WHERE clause",
        "cause": "Adding 'WHERE o.Status = 'Shipped'' on a table that was LEFT JOINed causes NULL rows to be discarded.",
        "fix": "Move the filter condition directly into the ON clause: 'LEFT JOIN Orders o ON c.CustomerId = o.CustomerId AND o.Status = 'Shipped''."
      }
    ],
    "bestPractices": [
      "Always create indexes on foreign key columns used in JOIN ... ON clauses.",
      "Prefer LEFT JOIN over RIGHT JOIN for consistent readability (left-to-right flow).",
      "Be cautious with CROSS JOIN as it produces N x M rows (Cartesian product)."
    ],
    "practiceQuestions": [
      {
        "question": "If you want a list of all customers, including those who have never placed an order, which join type should you use?",
        "options": [
          "INNER JOIN",
          "CROSS JOIN",
          "LEFT OUTER JOIN (Customers on the left)",
          "RIGHT JOIN (Orders on the left)"
        ],
        "answerIndex": 2,
        "explanation": "A LEFT OUTER JOIN preserves all rows from the left table (Customers) and populates unmatched columns from Orders with NULL."
      }
    ],
    "revisionSummary": [
      "INNER JOIN matches intersections; LEFT JOIN retains all primary rows.",
      "SELF JOIN resolves parent-child relationships within one table.",
      "Index all join predicate columns for optimal execution speed."
    ],
    "references": [
      {
        "title": "Joins (SQL Server) - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/performance/joins",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-5-5": {
    "id": "topic-5-5",
    "title": "Subqueries & CTEs",
    "category": "5. SQL & Database",
    "description": "Scalar & correlated subqueries; Common Table Expressions (WITH); recursive CTEs",
    "objectives": [
      "Write scalar, multi-row, and correlated subqueries",
      "Refactor complex nested queries into clean Common Table Expressions (WITH cte AS ...)",
      "Implement recursive CTEs to traverse hierarchical organizational structures and bill-of-materials",
      "Avoid subquery performance pitfalls using EXISTS instead of IN"
    ],
    "prerequisites": "Queries and Joins (Topics 5-3 and 5-4).",
    "terminology": [
      {
        "term": "Common Table Expression (CTE)",
        "definition": "A temporary named result set defined within the execution scope of a single SELECT, INSERT, UPDATE, or DELETE statement."
      },
      {
        "term": "Correlated Subquery",
        "definition": "A subquery that uses values from the outer query, executing once for every row processed by the outer query."
      },
      {
        "term": "Recursive CTE",
        "definition": "A CTE that references itself to iterate through recursive hierarchical relationships."
      }
    ],
    "concepts": [
      {
        "title": "Clean Common Table Expressions (CTEs)",
        "explanation": "CTEs replace messy nested subqueries with readable, named modular steps.",
        "codeSnippet": "-- Find all customers whose spending exceeds the company average\nWITH CustomerSpending AS (\n    SELECT \n        CustomerId, \n        SUM(TotalAmount) AS TotalSpent\n    FROM Orders\n    GROUP BY CustomerId\n),\nCompanyAverage AS (\n    SELECT AVG(TotalSpent) AS AvgSpending \n    FROM CustomerSpending\n)\nSELECT \n    c.FullName,\n    cs.TotalSpent,\n    ca.AvgSpending\nFROM CustomerSpending cs\nCROSS JOIN CompanyAverage ca\nJOIN Customers c ON cs.CustomerId = c.CustomerId\nWHERE cs.TotalSpent > ca.AvgSpending;",
        "language": "sql",
        "output": "FullName | TotalSpent | AvgSpending\nJane Doe | $4,500.00 | $1,250.00",
        "lineExplanation": [
          "Line 2: CustomerSpending computes total spending per customer.",
          "Line 8: CompanyAverage calculates the overall average across all customers.",
          "Line 12: Final query joins both CTEs for clear, self-documenting logic."
        ]
      }
    ],
    "diagram": "CTE Modular Query Structure:\n[ CTE 1: Aggregate per Customer ]\n               |\n[ CTE 2: Calculate Company Average ]\n               |\n[ Final SELECT: Join and Filter > Average ]",
    "realWorldApplication": "Calculating paginated leaderboards, category hierarchies, and traversing folder/subfolder directory trees in database systems.",
    "commonErrors": [
      {
        "error": "Performance degradation using 'IN (SELECT ...)' with NULL values",
        "cause": "If the subquery contains a single NULL, 'NOT IN' evaluates to UNKNOWN and returns 0 rows.",
        "fix": "Use 'WHERE EXISTS (SELECT 1 ...)' or 'WHERE NOT EXISTS' for reliable, fast predicate checks."
      }
    ],
    "bestPractices": [
      "Prefer CTEs over deeply nested subqueries for readability and maintainability.",
      "Use 'EXISTS' rather than 'IN' when checking for existence across large tables.",
      "Include a termination condition in recursive CTEs to prevent infinite loops (enforce MAXRECURSION)."
    ],
    "practiceQuestions": [
      {
        "question": "Why is 'EXISTS' generally faster than 'IN' when checking for existence against a large related table?",
        "options": [
          "EXISTS stops scanning as soon as the first matching row is found (short-circuit).",
          "IN is deprecated in modern SQL.",
          "EXISTS uses temporary files on disk.",
          "There is no difference."
        ],
        "answerIndex": 0,
        "explanation": "EXISTS short-circuits and returns true as soon as a single match is encountered, without scanning the remainder of the table."
      }
    ],
    "revisionSummary": [
      "CTEs (WITH ...) modularize complex SQL queries.",
      "Recursive CTEs traverse hierarchical graphs and trees.",
      "Use EXISTS instead of IN for performance and safety with NULLs."
    ],
    "references": [
      {
        "title": "WITH common_table_expression - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/queries/with-common-table-expression-transact-sql",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-5-6": {
    "id": "topic-5-6",
    "title": "Indexes & Performance",
    "category": "5. SQL & Database",
    "description": "Clustered vs non-clustered; covering indexes; execution plans; index fragmentation; query optimization basics",
    "objectives": [
      "Understand physical storage differences between clustered and non-clustered indexes (B-Tree structure)",
      "Create covering indexes with the INCLUDE clause to eliminate key lookups",
      "Analyze Graphical Execution Plans to identify Table Scans and expensive operators",
      "Manage index fragmentation with REORGANIZE and REBUILD commands"
    ],
    "prerequisites": "Tables, queries, and joins.",
    "terminology": [
      {
        "term": "Clustered Index",
        "definition": "Dictates the physical sorting order of rows on disk. A table can have only one clustered index (typically the Primary Key)."
      },
      {
        "term": "Non-Clustered Index",
        "definition": "A separate B-tree structure containing index keys and pointers back to the actual data row."
      },
      {
        "term": "Covering Index",
        "definition": "An index that contains all columns requested by a query, allowing the database engine to satisfy the query entirely from the index."
      },
      {
        "term": "Table Scan",
        "definition": "An expensive operation where the database engine inspects every single page of the table from start to finish."
      }
    ],
    "concepts": [
      {
        "title": "Covering Indexes with the INCLUDE Clause",
        "explanation": "When a query requires columns not present in an index, SQL Server must perform an expensive 'Key Lookup' back to the clustered index. The INCLUDE clause solves this.",
        "codeSnippet": "-- High-frequency query in our API:\n-- SELECT OrderDate, TotalAmount, Status FROM Orders WHERE CustomerId = @CustomerId;\n\n-- Standard index requires a Key Lookup for TotalAmount and Status\n-- OPTIMIZED COVERING INDEX:\nCREATE NONCLUSTERED INDEX IX_Orders_CustomerId_Covering\nON Orders (CustomerId) -- Search key (B-Tree navigation)\nINCLUDE (OrderDate, TotalAmount, Status); -- Data payload attached directly to leaf nodes!",
        "language": "sql",
        "output": "Index created. Query cost drops from 100% (Table/Key Lookup) to < 2% (Index Seek).",
        "lineExplanation": [
          "CustomerId is the search key in the B-Tree root and intermediate levels.",
          "The INCLUDE columns are placed at the leaf nodes, satisfying the query with zero round-trip lookups."
        ]
      }
    ],
    "diagram": "B-Tree Index Search:\n           [ Root Page ]\n          /      |      \\\n    [ Page ]  [ Page ]  [ Page ]  (Intermediate levels)\n     /    \\\n  [Leaf]  [Leaf]  <=== [ Index Seek reaches target row in 3 page reads instead of scanning 1,000,000 rows! ]",
    "realWorldApplication": "Reducing API database response latencies from 800ms down to 4ms in high-scale customer portals.",
    "commonErrors": [
      {
        "error": "Over-indexing a table (e.g. creating 20 indexes on an e-commerce table)",
        "cause": "Every INSERT, UPDATE, and DELETE statement must update all 20 indexes, severely degrading write performance.",
        "fix": "Only create indexes that support frequent, business-critical queries."
      }
    ],
    "bestPractices": [
      "Index all foreign key columns.",
      "Check execution plans for warning icons and costly Table/Clustered Index Scans.",
      "Reorganize indexes if fragmentation is between 10-30%; rebuild if greater than 30%."
    ],
    "practiceQuestions": [
      {
        "question": "How many clustered indexes can a single database table have?",
        "options": [
          "Unlimited",
          "Up to 16",
          "Exactly one",
          "None"
        ],
        "answerIndex": 2,
        "explanation": "Because a clustered index determines the physical order of data on disk, a table can only have one clustered index."
      }
    ],
    "revisionSummary": [
      "Clustered index defines physical disk order; non-clustered indexes are secondary B-Trees.",
      "Covering indexes with INCLUDE eliminate expensive key lookups.",
      "Inspect execution plans to verify Index Seeks vs Scans."
    ],
    "references": [
      {
        "title": "Clustered and Nonclustered Indexes Described - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/indexes/clustered-and-nonclustered-indexes-described",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-5-7": {
    "id": "topic-5-7",
    "title": "Stored Procedures & Functions",
    "category": "5. SQL & Database",
    "description": "Writing & executing stored procs; scalar & table-valued functions; parameters, output parameters; error handling (TRY-CATCH)",
    "objectives": [
      "Author parameterized Stored Procedures with default values and OUTPUT parameters",
      "Implement Structured Error Handling using BEGIN TRY ... BEGIN CATCH in T-SQL",
      "Differentiate between Stored Procedures, Scalar Functions, and Table-Valued Functions (TVFs)",
      "Avoid scalar function performance hazards in WHERE clauses"
    ],
    "prerequisites": "Queries, DDL/DML, and transactions.",
    "terminology": [
      {
        "term": "Stored Procedure",
        "definition": "A precompiled collection of T-SQL statements stored in the database that can modify data and return tabular results."
      },
      {
        "term": "Table-Valued Function (TVF)",
        "definition": "A user-defined function that returns a table data type, which can be queried like a table or joined via CROSS APPLY."
      }
    ],
    "concepts": [
      {
        "title": "Enterprise Stored Procedure with Parameters & Error Handling",
        "explanation": "Stored procedures encapsulate business transactions and maintain a cached execution plan for fast subsequent calls.",
        "codeSnippet": "CREATE OR ALTER PROCEDURE sp_CreateCustomerOrder\n    @CustomerId INT,\n    @TotalAmount DECIMAL(18,2),\n    @NewOrderId INT OUTPUT -- Output parameter\nAS\nBEGIN\n    SET NOCOUNT ON; -- Suppresses 'X rows affected' network messages\n\n    BEGIN TRY\n        IF NOT EXISTS (SELECT 1 FROM Customers WHERE CustomerId = @CustomerId)\n            THROW 50002, 'Customer does not exist.', 1;\n\n        INSERT INTO Orders (CustomerId, OrderDate, TotalAmount, Status)\n        VALUES (@CustomerId, SYSUTCDATETIME(), @TotalAmount, 'Confirmed');\n\n        SET @NewOrderId = SCOPE_IDENTITY(); -- Captures newly generated ID\n        RETURN 0; -- Success code\n    END TRY\n    BEGIN CATCH\n        -- Capture and rethrow diagnostic error\n        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();\n        RAISERROR(@ErrorMessage, 16, 1);\n        RETURN 1; -- Error code\n    END CATCH\nEND;",
        "language": "sql",
        "output": "Procedure created/altered successfully.",
        "lineExplanation": [
          "Line 4: '@NewOrderId INT OUTPUT' returns the generated key back to the caller.",
          "Line 7: 'SET NOCOUNT ON' improves performance by reducing network traffic.",
          "Line 16: 'SCOPE_IDENTITY()' safely retrieves the identity generated in the current execution scope."
        ]
      }
    ],
    "diagram": "Stored Procedure Execution:\nClient API Call ---> [ sp_CreateCustomerOrder @CustomerId=12, @TotalAmount=99.00 ]\n                              |\n                    [ Plan Cache (Precompiled) ]\n                              |\n                    [ Direct Engine Execution ] ---> Returns Result + Output Param",
    "realWorldApplication": "Encapsulating multi-step financial settlements and legacy batch migrations.",
    "commonErrors": [
      {
        "error": "Using @@IDENTITY instead of SCOPE_IDENTITY()",
        "cause": "If a database trigger fires and inserts into another table, @@IDENTITY returns the trigger's ID rather than your new order's ID.",
        "fix": "Always use SCOPE_IDENTITY() to capture identity values generated within the current scope."
      }
    ],
    "bestPractices": [
      "Always include 'SET NOCOUNT ON;' at the start of stored procedures.",
      "Use Inline Table-Valued Functions instead of Multi-Statement TVFs for optimal query plan inlining.",
      "Parameterize all inputs to prevent SQL Injection."
    ],
    "practiceQuestions": [
      {
        "question": "Why should you use SCOPE_IDENTITY() instead of @@IDENTITY after an INSERT statement?",
        "options": [
          "SCOPE_IDENTITY() works on strings.",
          "SCOPE_IDENTITY() returns the identity created in the current execution scope, avoiding trigger interference.",
          "@@IDENTITY is deprecated in SQL Server.",
          "There is no difference."
        ],
        "answerIndex": 1,
        "explanation": "SCOPE_IDENTITY() isolates identity generation to the current scope, preventing triggers from corrupting the returned key."
      }
    ],
    "revisionSummary": [
      "Stored procedures encapsulate complex database routines and reuse execution plans.",
      "Use SCOPE_IDENTITY() to retrieve generated IDs safely.",
      "Inline Table-Valued Functions provide reusable subquery abstractions."
    ],
    "references": [
      {
        "title": "Stored Procedures (Database Engine) - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/stored-procedures/stored-procedures-database-engine",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-5-8": {
    "id": "topic-5-8",
    "title": "Views & Triggers",
    "category": "5. SQL & Database",
    "description": "Creating views (materialized/indexed views awareness); DML triggers; use cases & cautions",
    "objectives": [
      "Create database Views to simplify complex joins and provide role-based security layers",
      "Understand Indexed Views (Materialized Views) and their performance trade-offs",
      "Implement DML triggers (AFTER INSERT/UPDATE/DELETE) using the 'inserted' and 'deleted' pseudo-tables",
      "Recognize the architectural cautions and debugging challenges associated with triggers"
    ],
    "prerequisites": "DDL, DML, and Joins.",
    "terminology": [
      {
        "term": "View",
        "definition": "A saved SQL query that acts as a virtual table without storing data itself (unless indexed/materialized)."
      },
      {
        "term": "DML Trigger",
        "definition": "A specialized stored procedure that fires automatically when an INSERT, UPDATE, or DELETE operation occurs on a table."
      },
      {
        "term": "inserted / deleted Tables",
        "definition": "Temporary memory tables available only inside triggers containing copies of affected rows."
      }
    ],
    "concepts": [
      {
        "title": "Automated Auditing with DML Triggers",
        "explanation": "Triggers run in the same transaction as the triggering statement. They inspect the 'inserted' and 'deleted' pseudo-tables to log changes automatically.",
        "codeSnippet": "-- Audit Trigger to capture employee salary changes\nCREATE OR ALTER TRIGGER trg_AuditSalaryChange\nON Employees\nAFTER UPDATE\nAS\nBEGIN\n    SET NOCOUNT ON;\n\n    -- Fire audit only if Salary column was updated\n    IF UPDATE(Salary)\n    BEGIN\n        INSERT INTO AuditLog (EmployeeId, OldSalary, NewSalary, ChangedAt, ChangedBy)\n        SELECT \n            i.EmployeeId,\n            d.Salary AS OldSalary,\n            i.Salary AS NewSalary,\n            SYSUTCDATETIME(),\n            SYSTEM_USER\n        FROM inserted i\n        JOIN deleted d ON i.EmployeeId = d.EmployeeId\n        WHERE i.Salary <> d.Salary;\n    END\nEND;",
        "language": "sql",
        "output": "Trigger created. Any UPDATE to Employees.Salary will automatically log audit history.",
        "lineExplanation": [
          "Line 4: 'AFTER UPDATE' ensures the trigger executes immediately after the update succeeds.",
          "Line 8: 'IF UPDATE(Salary)' optimizes execution by ignoring updates that didn't modify salary.",
          "Line 16: Joins 'inserted' (new value) and 'deleted' (old value) to record exact change delta."
        ]
      }
    ],
    "diagram": "Trigger Architecture:\n[ Client UPDATE statement ]\n             |\n[ Modified row placed in transaction ]\n             |\n[ Trigger Fires: compares 'deleted' (old) vs 'inserted' (new) ]\n             |\n[ Logs to Audit Table ] ====> [ Transaction Commits ]",
    "realWorldApplication": "Compliance auditing (SOX, HIPAA, GDPR) tracking who changed sensitive pricing, health, or financial records.",
    "commonErrors": [
      {
        "error": "Writing triggers that assume only a single row was modified",
        "cause": "If a user runs 'UPDATE Employees SET Salary = Salary * 1.05', the trigger processes 1,000 rows at once. Using scalar variables like '@Id = (SELECT EmployeeId FROM inserted)' throws an error.",
        "fix": "Always write set-based triggers that operate on all rows in 'inserted' and 'deleted'."
      }
    ],
    "bestPractices": [
      "Use triggers sparingly; business logic is usually better placed in application services where it is easier to test and debug.",
      "Always write set-based trigger logic that handles bulk multi-row operations.",
      "Never execute lengthy network calls or emails inside a database trigger."
    ],
    "practiceQuestions": [
      {
        "question": "Inside a SQL Server UPDATE trigger, which pseudo-table holds the data values as they existed before the update?",
        "options": [
          "inserted",
          "deleted",
          "previous",
          "shadow"
        ],
        "answerIndex": 1,
        "explanation": "In SQL Server triggers, the 'deleted' pseudo-table contains rows as they existed prior to the UPDATE or DELETE."
      }
    ],
    "revisionSummary": [
      "Views simplify queries and provide security abstraction.",
      "Triggers automate auditing by inspecting 'inserted' and 'deleted' tables.",
      "Always write set-based triggers to support bulk updates."
    ],
    "references": [
      {
        "title": "CREATE TRIGGER (Transact-SQL) - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/sql/t-sql/statements/create-trigger-transact-sql",
        "source": "Microsoft Learn"
      }
    ]
  },
  "topic-5-9": {
    "id": "topic-5-9",
    "title": "AI Integration in SQL & Databases",
    "category": "5. SQL & Database",
    "description": "Generating queries, joins, and indexing recommendations with Copilot; analyzing execution plans with AI assistance",
    "objectives": [
      "Prompt AI to generate complex SQL schemas, joins, and aggregate reports",
      "Use AI assistants to analyze text-based execution plans and detect missing indexes",
      "Audit AI-generated SQL for SQL Injection vulnerabilities and Cartesian products",
      "Benchmark AI query proposals against real SQL Server statistics (STATISTICS IO/TIME)"
    ],
    "prerequisites": "Module 5 SQL topics.",
    "terminology": [
      {
        "term": "SQL Injection",
        "definition": "A critical vulnerability where untrusted user input is concatenated directly into SQL text, allowing attackers to execute arbitrary commands."
      }
    ],
    "concepts": [
      {
        "title": "Auditing AI SQL for Security and Performance",
        "explanation": "AI assistants frequently propose string concatenation when constructing queries. Developers must enforce strict parameterization.",
        "codeSnippet": "// VULNERABLE AI CODE:\n// string sql = \"SELECT * FROM Users WHERE Email = '\" + userInput + \"'\"; // CRITICAL SQL INJECTION!\n\n// AUDITED & CORRECTED CODE USING PARAMETERS:\nvar safeSql = \"SELECT UserId, Email, FullName FROM Users WHERE Email = @Email\";\nusing var command = new SqlCommand(safeSql, connection);\ncommand.Parameters.AddWithValue(\"@Email\", userInput); // Safe parameterized execution",
        "language": "csharp",
        "output": "Protects against SQL Injection vulnerabilities.",
        "lineExplanation": [
          "Line 5: Parameterized query completely separates executable code from user-supplied data."
        ]
      }
    ],
    "diagram": "AI Database Collaboration:\n[ Complex Requirement ] ---> [ Copilot Drafts Query & Index ]\n                                       |\n                             [ Developer Audit: Check Parameters & Execution Plan ]\n                                       |\n                             [ Safe, High-Performance Query Deployed ]",
    "realWorldApplication": "Accelerating migration of legacy queries and designing optimized indexes for high-volume database tables.",
    "commonErrors": [
      {
        "error": "Blindly applying index suggestions from AI without evaluating write overhead",
        "cause": "AI might recommend 10 covering indexes for every WHERE clause, slowing INSERT and UPDATE speeds.",
        "fix": "Consolidate index recommendations and test write performance."
      }
    ],
    "bestPractices": [
      "Never accept unparameterized SQL from an AI tool.",
      "Validate AI-suggested queries using 'SET STATISTICS IO, TIME ON'.",
      "Feed the table schema (CREATE TABLE statements) into the AI prompt for accurate join generation."
    ],
    "practiceQuestions": [
      {
        "question": "What is the most critical security flaw to check for when auditing AI-generated database code?",
        "options": [
          "Missing comments",
          "SQL Injection through string concatenation",
          "Using lowercase keywords",
          "Missing primary key"
        ],
        "answerIndex": 1,
        "explanation": "String concatenation in SQL queries opens catastrophic SQL Injection vulnerabilities. All dynamic inputs must be parameterized."
      }
    ],
    "revisionSummary": [
      "AI accelerates SQL development and index analysis.",
      "Always enforce parameterized queries to prevent SQL Injection.",
      "Profile queries with execution plans to verify index utilization."
    ],
    "references": [
      {
        "title": "SQL Server Security Best Practices - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/sql/relational-databases/security/securing-sql-server",
        "source": "Microsoft Learn"
      }
    ]
  }
};
