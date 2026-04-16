(() => {
  const scenarios = [
    "an ecommerce platform",
    "a healthcare analytics system",
    "a fintech transaction service",
    "a media streaming backend",
    "an IoT telemetry pipeline",
    "a logistics tracking platform",
    "an online learning portal",
    "a SaaS CRM product",
    "a gaming leaderboard service",
    "a travel booking engine",
    "a digital banking app",
    "a content publishing platform",
    "a retail recommendation API",
    "a manufacturing control dashboard",
    "a customer support platform",
    "a payment settlement workflow",
    "a B2B procurement portal",
    "a social networking feature",
    "a real-time bidding service",
    "a compliance reporting system"
  ];

  const patterns = [
    {
      task: "1.1",
      q: (s) => `A team operating ${s} runs a three-tier application in a VPC. The database must not be reachable from the internet. Which design best meets this requirement?`,
      opts: [
        "Place the DB in a public subnet with a restrictive security group",
        "Place the DB in private subnets and allow inbound only from the application-tier security group",
        "Use a network ACL that allows only TCP 443 from 0.0.0.0/0",
        "Attach an internet gateway directly to the DB subnet"
      ],
      ans: 1,
      explain: "Private subnets with security-group-based app-to-DB access prevent direct internet reachability."
    },
    {
      task: "1.2",
      q: (s) => `An EC2 workload for ${s} needs temporary permissions to write to a specific S3 bucket. What is the most secure approach?`,
      opts: [
        "Store access keys in user data",
        "Attach an IAM role to the EC2 instance profile with least-privilege permissions",
        "Create an IAM user and rotate long-term keys monthly",
        "Share the account root access key across instances"
      ],
      ans: 1,
      explain: "Instance profiles provide temporary credentials and avoid embedded long-term access keys."
    },
    {
      task: "1.3",
      q: (s) => `A central security team for ${s} must ensure member accounts in AWS Organizations cannot disable CloudTrail. Which control should be used?`,
      opts: [
        "Permission boundaries",
        "Service control policies (SCPs)",
        "Route table rules",
        "Session tags only"
      ],
      ans: 1,
      explain: "SCPs set organization-level guardrails, including explicit deny controls for protected actions."
    },
    {
      task: "1.4",
      q: (s) => `${s} stores sensitive objects in S3 and requires encryption keys managed and auditable through AWS KMS. Which option is best?`,
      opts: [
        "SSE-S3",
        "SSE-KMS",
        "No encryption with bucket policy restrictions",
        "Client compression only"
      ],
      ans: 1,
      explain: "SSE-KMS integrates with KMS key policies and auditing controls."
    },
    {
      task: "1.5",
      q: (s) => `Developers supporting ${s} need to avoid storing plaintext database credentials in code. Which service is recommended?`,
      opts: [
        "Store credentials in a private Git repository",
        "AWS Secrets Manager with rotation",
        "EC2 tags for passwords",
        "Manual email distribution"
      ],
      ans: 1,
      explain: "Secrets Manager is designed for secure secret storage, retrieval, and optional rotation."
    },
    {
      task: "1.6",
      q: (s) => `Workloads for ${s} in private subnets need private network access to S3 without using the public internet. What should be used?`,
      opts: [
        "Internet gateway",
        "NAT instance",
        "Gateway VPC endpoint for S3",
        "Site-to-Site VPN"
      ],
      ans: 2,
      explain: "S3 gateway endpoints allow private routing from VPC subnets to S3 without IGW or NAT requirements."
    },
    {
      task: "1.7",
      q: (s) => `${s} exposes a public web application and needs Layer 7 filtering plus managed DDoS protection. Which combination is best?`,
      opts: [
        "AWS WAF with AWS Shield",
        "AWS Backup with AWS Config",
        "CloudTrail with Athena",
        "EFS with DataSync"
      ],
      ans: 0,
      explain: "AWS WAF mitigates common web attacks and AWS Shield provides DDoS protection capabilities."
    },
    {
      task: "1.8",
      q: (s) => `Auditors for ${s} need a log of AWS API activity for governance and investigations. Which service is required?`,
      opts: [
        "Amazon CloudTrail",
        "Amazon EventBridge",
        "Amazon Route 53",
        "AWS X-Ray"
      ],
      ans: 0,
      explain: "CloudTrail records AWS API activity and supports governance and audit use cases."
    },
    {
      task: "1.9",
      q: (s) => `The platform team for ${s} wants account-level guardrails to prevent accidental public S3 exposure. Which setting should be enabled?`,
      opts: [
        "S3 Requester Pays",
        "S3 Block Public Access",
        "S3 Transfer Acceleration",
        "S3 Batch Operations"
      ],
      ans: 1,
      explain: "S3 Block Public Access provides centralized controls that override public bucket/object policy exposure."
    },
    {
      task: "1.10",
      q: (s) => `${s} includes a mobile app that needs user sign-up/sign-in with social providers and token-based access. Which service fits?`,
      opts: [
        "Amazon Cognito",
        "Amazon Macie",
        "AWS Directory Service AD Connector",
        "AWS GuardDuty"
      ],
      ans: 0,
      explain: "Amazon Cognito supports user pools, federation, and application authentication flows."
    },
    {
      task: "1.11",
      q: (s) => `Security operations for ${s} wants managed threat detection findings across AWS accounts. Which service should be enabled?`,
      opts: [
        "AWS GuardDuty",
        "AWS DataSync",
        "AWS Snowball",
        "Amazon MQ"
      ],
      ans: 0,
      explain: "GuardDuty provides threat-detection findings using signals such as CloudTrail and network telemetry."
    },
    {
      task: "1.12",
      q: (s) => `${s} must reduce EC2 management-plane attack surface. Which two actions are best?`,
      opts: [
        "Use Systems Manager Session Manager and restrict direct SSH ingress",
        "Open TCP 22 to 0.0.0.0/0 for faster operations",
        "Apply IAM least privilege to administration workflows",
        "Disable CloudTrail to reduce log volume"
      ],
      multi: true,
      ans: [0, 2],
      explain: "Session Manager removes need for broad SSH exposure, and least-privilege IAM limits administrative risk."
    },
    {
      task: "1.13",
      q: (s) => `${s} uses customer managed KMS keys and must restrict key usage to specific IAM roles. What should be configured?`,
      opts: [
        "KMS key policy and IAM policy conditions",
        "Subnet route tables",
        "Auto Scaling lifecycle hooks",
        "CloudFront cache policies"
      ],
      ans: 0,
      explain: "KMS authorization is controlled through key policies plus IAM permissions/conditions."
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
