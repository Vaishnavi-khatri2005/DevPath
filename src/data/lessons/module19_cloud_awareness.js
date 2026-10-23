/**
 * Pre-generated comprehensive lessons for MODULE_19_LESSONS
 * Sources: Microsoft Learn Microservices, Docker Docs, OWASP Foundation.
 */

export const MODULE_19_LESSONS = {
  "topic-19-1": {
    "id": "topic-19-1",
    "title": "Cloud Computing Fundamentals",
    "category": "19. Cloud Awareness",
    "description": "Cloud Fundamentals : IaaS, PaaS, SaaS; major providers (AWS/Azure/GCP); key services — compute, storage, RDS, API gateway, serverless",
    "objectives": [
      "Understand cloud service models: IaaS (Infrastructure), PaaS (Platform), SaaS (Software)",
      "Compare the major cloud hyperscalers: Microsoft Azure, AWS, and Google Cloud",
      "Explore core cloud services: Compute (App Services, VMs), Storage (Blob/S3), Managed SQL, and Serverless Functions",
      "Evaluate cost optimization, elasticity, and cloud high availability"
    ],
    "prerequisites": "General web architecture.",
    "terminology": [
      {
        "term": "IaaS",
        "definition": "Infrastructure as a Service (e.g. Azure VMs, AWS EC2); renting virtual hardware where you manage OS and software."
      },
      {
        "term": "PaaS",
        "definition": "Platform as a Service (e.g. Azure App Service, AWS Elastic Beanstalk); cloud provider manages OS and servers; you deploy only code."
      },
      {
        "term": "Serverless (FaaS)",
        "definition": "Functions as a Service (Azure Functions, AWS Lambda); event-driven execution with zero server management that scales to zero when idle."
      }
    ],
    "concepts": [
      {
        "title": "IaaS vs PaaS vs Serverless Comparison",
        "explanation": "Modern .NET full-stack developers prioritize PaaS (Azure App Service) and Serverless to minimize infrastructure management.",
        "codeSnippet": "// Azure Serverless Function (.NET 8 Isolated Worker)\npublic class CloudOrderFunction(ILogger<CloudOrderFunction> logger)\n{\n    [Function(\"ProcessOrderQueue\")]\n    public void Run([QueueTrigger(\"orders-queue\", Connection = \"AzureWebJobsStorage\")] string orderMessage)\n    {\n        // Executes serverlessly ONLY when a message enters the cloud queue!\n        // Costs $0.00 when queue is idle!\n        logger.LogInformation(\"Processing cloud queue message: {Message}\", orderMessage);\n    }\n}",
        "language": "csharp",
        "output": "Executes in cloud on demand with sub-second scaling and zero idle billing.",
        "lineExplanation": [
          "Demonstrates event-driven serverless computing scaling dynamically based on queue depth."
        ]
      }
    ],
    "diagram": "Shared Responsibility Model:\nModel       You Manage                  Cloud Provider Manages\nIaaS        App, Data, OS, Runtime      Virtualization, Hardware, Datacenter\nPaaS        Application Code & Data     OS, Patching, Runtime, Hardware\nServerless  Application Functions Only  Scaling, OS, Runtime, Hardware\nSaaS        Nothing (End User)          Everything (e.g. Office 365, Salesforce)",
    "realWorldApplication": "Deploying enterprise .NET Web APIs to Azure App Service and Angular frontends to Azure Static Web Apps or AWS S3/CloudFront.",
    "commonErrors": [
      {
        "error": "Choosing IaaS virtual machines when a managed PaaS service would cost 70% less in maintenance",
        "cause": "Assuming cloud is just 'other people's computers' instead of leveraging managed platform offerings.",
        "fix": "Default to PaaS (Azure App Service / Container Apps) unless custom OS drivers are required."
      }
    ],
    "bestPractices": [
      "Use PaaS (Azure App Service, Azure Container Apps) for Web APIs to eliminate server patching.",
      "Host Angular static assets on low-cost CDNs (Azure Static Web Apps, AWS CloudFront).",
      "Use managed databases (Azure SQL Database, AWS Aurora) for automated backups and failover."
    ],
    "practiceQuestions": [
      {
        "question": "Which cloud service model relieves developers from managing the operating system, security patching, and server maintenance while allowing them to deploy code directly?",
        "options": [
          "IaaS",
          "PaaS (Platform as a Service)",
          "SaaS",
          "On-Premises"
        ],
        "answerIndex": 1,
        "explanation": "PaaS providers manage the OS, runtime, and server infrastructure, allowing developers to focus solely on application code and configuration."
      }
    ],
    "revisionSummary": [
      "IaaS = virtual machines; PaaS = managed application platforms; Serverless = event-driven functions.",
      "Azure, AWS, and GCP offer equivalent managed building blocks.",
      "Leverage PaaS to minimize operations overhead."
    ],
    "references": [
      {
        "title": "Microsoft Azure Fundamentals - Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/",
        "source": "Microsoft Learn"
      }
    ]
  }
};
