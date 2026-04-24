(() => {
  const scenarios = [
    "a regional ecommerce company",
    "a healthcare analytics startup",
    "a fintech payment processor",
    "a media streaming provider",
    "a logistics SaaS platform",
    "an online education company",
    "a global travel booking site",
    "a public sector agency",
    "a manufacturing data platform",
    "a digital banking team",
    "a social networking product",
    "a B2B procurement portal"
  ];

  const patterns = [
    {
      task: "1.1",
      q: (s) => `${s} hosts a web application in a VPC. The database must never be directly reachable from the internet. Which design is best?`,
      opts: [
        "Place the DB in private subnets and allow inbound only from the app tier security group",
        "Place the DB in a public subnet and restrict with NACLs",
        "Expose the DB with an internet gateway and TLS",
        "Use a NAT gateway in front of the DB"
      ],
      ans: 0,
      explain: "Private subnets and source-restricted security groups prevent direct internet access to the database."
    },
    {
      task: "1.1",
      q: (s) => `${s} requires private connectivity from EC2 to S3 without using NAT gateways or internet routing. Which service should be used?`,
      opts: [
        "S3 gateway VPC endpoint",
        "NAT gateway with a private route table",
        "S3 interface endpoint for cross-Region access",
        "Transit gateway attachment to the S3 service VPC"
      ],
      ans: 0,
      explain: "An S3 gateway endpoint enables private VPC-to-S3 routing without IGW or NAT for that traffic."
    },
    {
      task: "1.2",
      q: (s) => `${s} needs temporary credentials for EC2 instances to write to a specific S3 bucket. Which approach is most secure?`,
      opts: [
        "Attach an IAM role to the instance profile with least-privilege bucket permissions",
        "Store access keys in application config",
        "Use a shared IAM user across all instances",
        "Use the root account access key"
      ],
      ans: 0,
      explain: "EC2 instance profiles provide short-lived credentials and avoid embedded long-term keys."
    },
    {
      task: "1.2",
      q: (s) => `${s} wants users from an external identity provider to access AWS accounts centrally. Which architecture is most appropriate?`,
      opts: [
        "Federation through IAM Identity Center",
        "IAM users synchronized separately into each account",
        "Cross-account roles with shared long-term access keys",
        "Resource policies on every application bucket"
      ],
      ans: 0,
      explain: "IAM Identity Center supports federated access and centralized permission management across accounts."
    },
    {
      task: "1.2",
      q: (s) => `${s} needs cross-account access from a CI account into a production account with no static keys. What should be used?`,
      opts: [
        "AssumeRole with AWS STS",
        "Copy production IAM user keys into the CI secret store",
        "Create matching IAM users in both accounts",
        "Use VPC peering between the CI and production VPCs"
      ],
      ans: 0,
      explain: "STS AssumeRole provides temporary, auditable credentials for cross-account access."
    },
    {
      task: "1.3",
      q: (s) => `${s} must prevent member accounts in AWS Organizations from disabling CloudTrail. Which control should be applied?`,
      opts: [
        "Service control policies (SCPs)",
        "A CloudTrail bucket policy with deny statements only",
        "A permission boundary attached to every workload role",
        "A Config rule that evaluates trails after changes"
      ],
      ans: 0,
      explain: "SCPs define guardrails across accounts/OUs and can deny protected actions like trail deletion."
    },
    {
      task: "1.3",
      q: (s) => `${s} wants continuous compliance checks for controls such as encrypted EBS volumes and approved instance types. Which service should be used?`,
      opts: [
        "AWS Config",
        "Amazon Inspector",
        "Amazon Athena",
        "AWS Backup"
      ],
      ans: 0,
      explain: "AWS Config tracks resource configuration and evaluates against rules for ongoing compliance."
    },
    {
      task: "1.3",
      q: (s) => `${s} needs threat-detection findings from CloudTrail, DNS, and VPC flow data across accounts. Which managed service fits best?`,
      opts: [
        "Amazon GuardDuty",
        "AWS Glue",
        "Amazon MQ",
        "AWS DMS"
      ],
      ans: 0,
      explain: "GuardDuty provides managed threat detection using multiple AWS telemetry sources."
    },
    {
      task: "1.3",
      q: (s) => `${s} stores sensitive objects in S3 and requires KMS key policy controls and auditability. Which encryption mode is best?`,
      opts: [
        "SSE-KMS",
        "SSE-S3 with no KMS key policy",
        "Client-side encryption with unmanaged local keys only",
        "S3 Object Lock without server-side encryption"
      ],
      ans: 0,
      explain: "SSE-KMS enables customer-managed key controls and KMS integration for auditing and governance."
    },
    {
      task: "1.2",
      q: (s) => `${s} must store database passwords securely and rotate them automatically. Which service is most appropriate?`,
      opts: [
        "AWS Secrets Manager",
        "Amazon S3 metadata",
        "EC2 user data",
        "CloudWatch dashboard"
      ],
      ans: 0,
      explain: "Secrets Manager is designed for secure secret storage, retrieval, and rotation workflows."
    },
    {
      task: "1.2",
      q: (s) => `${s} needs private API Gateway access from VPC workloads only. Which pattern should be used?`,
      opts: [
        "Private REST API with interface VPC endpoint",
        "Edge-optimized API open to the internet",
        "Public API plus NAT only",
        "ALB with no API Gateway"
      ],
      ans: 0,
      explain: "Private APIs are accessed through interface endpoints over private network paths."
    },
    {
      task: "1.2",
      q: (s) => `${s} needs protection against common web exploits and application-layer request filtering. Which service should be applied?`,
      opts: [
        "AWS WAF",
        "AWS Shield Advanced only",
        "AWS Network Firewall only",
        "Security groups on the CloudFront distribution"
      ],
      ans: 0,
      explain: "AWS WAF is designed to filter HTTP(S) requests and mitigate common web attack patterns."
    },
    {
      task: "1.2",
      q: (s) => `${s} wants centralized visibility and prioritization of security findings from multiple services. Which service helps aggregate this?`,
      opts: [
        "AWS Security Hub",
        "Amazon EFS",
        "AWS AppSync",
        "AWS Ground Station"
      ],
      ans: 0,
      explain: "Security Hub aggregates and normalizes findings from integrated security services."
    },
    {
      task: "1.3",
      q: (s) => `${s} must identify and classify sensitive data in S3 buckets such as PII. Which managed service should be enabled?`,
      opts: [
        "Amazon Macie",
        "AWS Config managed rule for public buckets",
        "Amazon GuardDuty S3 Protection",
        "AWS Glue crawler classification only"
      ],
      ans: 0,
      explain: "Macie analyzes S3 data to discover and classify sensitive information."
    },
    {
      task: "1.3",
      q: (s) => `${s} needs to ensure all S3 buckets in an account remain non-public by default and protected from policy mistakes. Which setting should be enabled?`,
      opts: [
        "S3 Block Public Access",
        "S3 Object Lock retention on selected buckets",
        "A bucket policy copied into every new bucket",
        "S3 server access logging"
      ],
      ans: 0,
      explain: "Block Public Access enforces account/bucket-level controls to prevent accidental public exposure."
    },
    {
      task: "1.1",
      q: (s) => `${s} wants to reduce exposed SSH ports and still allow secure shell access to EC2 for operations. Which two actions are best?`,
      opts: [
        "Use Systems Manager Session Manager for shell access",
        "Open TCP 22 from 0.0.0.0/0",
        "Apply least-privilege IAM for admin actions",
        "Disable CloudTrail logging",
        "Store shared SSH private keys in user data"
      ],
      multi: true,
      ans: [0, 2],
      explain: "Session Manager avoids broad inbound SSH, and least-privilege IAM constrains admin permissions."
    },
    {
      task: "1.3",
      q: (s) => `${s} requires all public endpoints to use managed TLS certificates with automatic renewal. Which AWS service should provide certificates?`,
      opts: [
        "AWS Certificate Manager (ACM)",
        "AWS IAM Access Analyzer",
        "Amazon Inspector",
        "AWS Budgets"
      ],
      ans: 0,
      explain: "ACM provides managed certificate issuance and renewal for integrated AWS services."
    },
    {
      task: "1.3",
      q: (s) => `${s} must enforce that only encrypted EBS volumes can be created by workload teams. Which governance mechanism is most suitable at org scale?`,
      opts: [
        "SCP deny for unencrypted volume creation",
        "NACL rule updates",
        "Route table restrictions",
        "CloudFront behaviors"
      ],
      ans: 0,
      explain: "SCP guardrails can block noncompliant API actions across member accounts."
    },
    {
      task: "1.3",
      q: (s) => `${s} needs to ensure KMS keys are usable only from requests that originate through a specific VPC endpoint. Which control should be applied?`,
      opts: [
        "KMS key policy conditions on source VPC endpoint",
        "Security group outbound rules on the calling instances",
        "A KMS alias naming convention",
        "S3 bucket policy conditions on source VPC endpoint"
      ],
      ans: 0,
      explain: "KMS key policy conditions can restrict key usage context, including source endpoint constraints."
    },
    {
      task: "1.1",
      q: (s) => `${s} must retain immutable API audit records for investigations and compliance. Which service is foundational for this requirement?`,
      opts: [
        "AWS CloudTrail",
        "AWS X-Ray",
        "Amazon Forecast",
        "AWS Batch"
      ],
      ans: 0,
      explain: "CloudTrail records AWS API activity and is core for security auditing and investigation workflows."
    },
    {
      task: "1.2",
      q: (s) => `${s} requires network-level filtering and inspection for centralized egress controls between private subnets and external destinations. Which service is best aligned?`,
      opts: [
        "AWS Network Firewall",
        "Amazon SQS",
        "Amazon Athena",
        "AWS Global Accelerator"
      ],
      ans: 0,
      explain: "AWS Network Firewall provides managed network traffic filtering and inspection capabilities."
    },
    {
      task: "1.1",
      q: (s) => `${s} wants to detect unintended internet exposure paths by continuously analyzing resource access configurations. Which service helps with this objective?`,
      opts: [
        "IAM Access Analyzer",
        "Amazon ElastiCache",
        "AWS Glue Data Catalog",
        "Amazon WorkSpaces"
      ],
      ans: 0,
      explain: "IAM Access Analyzer helps identify external access and public/cross-account exposure risks."
    }
  ];

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function signature(question) {
    const opts = (question.opts || []).map((opt) => normalizeText(opt)).join("|");
    return `${question.task}|${normalizeText(question.q)}|${opts}`;
  }

  function dedupeQuestions(list) {
    const seen = new Set();
    const output = [];
    list.forEach((q) => {
      const sig = signature(q);
      if (seen.has(sig)) return;
      seen.add(sig);
      output.push(q);
    });
    return output;
  }

  const questions = [];
  patterns.forEach((p) => {
    scenarios.forEach((s) => {
      questions.push({
        domain: 1,
        task: p.task,
        q: p.q(s),
        opts: p.opts,
        ...(p.multi ? { multi: true } : {}),
        ans: p.ans,
        explain: p.explain
      });
    });
  });

  window.domain1Questions = dedupeQuestions(questions);
})();
