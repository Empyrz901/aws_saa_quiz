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
      task: "2.1",
      q: (s) => `${s} must stay available during an Availability Zone outage. Which architecture best meets this requirement?`,
      opts: [
        "Single EC2 instance in one Availability Zone",
        "Auto Scaling group across multiple AZs behind an Application Load Balancer",
        "Single NAT instance with Elastic IP",
        "One ECS task in one subnet"
      ],
      ans: 1,
      explain: "Multi-AZ Auto Scaling behind ALB improves availability through AZ-level fault tolerance."
    },
    {
      task: "2.2",
      q: (s) => `${s} uses MySQL and needs managed automatic failover with a synchronous standby in another AZ. Which option is correct?`,
      opts: [
        "RDS Multi-AZ deployment",
        "Single-AZ RDS with larger instance class",
        "DynamoDB on-demand",
        "RDS read replica as standby"
      ],
      ans: 0,
      explain: "RDS Multi-AZ deployments maintain a synchronous standby in another AZ and provide managed failover."
    },
    {
      task: "2.3",
      q: (s) => `${s} needs Route 53 to direct users to a secondary region only when the primary endpoint is unhealthy. Which routing policy is best?`,
      opts: [
        "Weighted routing",
        "Latency routing",
        "Failover routing",
        "Geolocation routing"
      ],
      ans: 2,
      explain: "Failover routing is purpose-built for active-passive DNS failover patterns."
    },
    {
      task: "2.4",
      q: (s) => `${s} requires decoupling between producers and consumers to absorb traffic bursts and support retries. Which service is most suitable?`,
      opts: [
        "Amazon SQS",
        "Amazon Route 53",
        "Amazon EFS",
        "AWS Glue"
      ],
      ans: 0,
      explain: "SQS provides durable asynchronous decoupling and buffering."
    },
    {
      task: "2.5",
      q: (s) => `A Lambda function in ${s} processes asynchronous events and occasionally fails. Which configuration best improves resiliency?`,
      opts: [
        "Disable retries and drop failed events",
        "Configure retries and an on-failure destination or DLQ",
        "Place Lambda in a public subnet",
        "Increase memory without failure handling"
      ],
      ans: 1,
      explain: "Retry controls plus DLQ/destination handling help prevent silent event loss."
    },
    {
      task: "2.6",
      q: (s) => `${s} must recover from accidental S3 object overwrite or delete. Which feature should be enabled?`,
      opts: [
        "S3 Versioning",
        "S3 Requester Pays",
        "S3 Inventory",
        "S3 Object Lambda"
      ],
      ans: 0,
      explain: "S3 Versioning keeps object history and supports recovery from deletes and overwrites."
    },
    {
      task: "2.7",
      q: (s) => `${s} requires multi-Region data replication with active reads/writes for business continuity. Which DynamoDB design is best?`,
      opts: [
        "Single-region table with backups only",
        "DynamoDB global tables",
        "One table per account with manual exports",
        "DAX only"
      ],
      ans: 1,
      explain: "Global tables provide multi-Region replication with active read/write capability."
    },
    {
      task: "2.8",
      q: (s) => `${s} needs shared POSIX file access from multiple EC2 instances in multiple AZs. Which storage service is most appropriate?`,
      opts: [
        "Amazon EBS attached to one instance",
        "Amazon EFS",
        "Instance store",
        "S3 Glacier"
      ],
      ans: 1,
      explain: "EFS provides managed NFS file storage designed for multi-AZ access patterns."
    },
    {
      task: "2.9",
      q: (s) => `${s} requires immutable backups that cannot be deleted before retention expires. Which AWS Backup feature should be used?`,
      opts: [
        "Backup Vault Lock",
        "Tag-based backup plans only",
        "Cross-account IAM role",
        "Unencrypted backup copies"
      ],
      ans: 0,
      explain: "Backup Vault Lock enforces immutability controls aligned with retention requirements."
    },
    {
      task: "2.10",
      q: (s) => `${s} needs a warm-standby disaster recovery strategy in a second region. Which description matches warm standby?`,
      opts: [
        "No resources in secondary region",
        "Scaled-down but fully functional secondary stack",
        "Always-on full active-active stack only",
        "Backups with manual rebuild only"
      ],
      ans: 1,
      explain: "Warm standby keeps a smaller running environment ready to scale on failover."
    },
    {
      task: "2.11",
      q: (s) => `${s} uses EventBridge to fan out events to multiple targets. Which resiliency behavior does EventBridge add?`,
      opts: [
        "Event-driven decoupling with configurable retries and optional DLQ for failed deliveries",
        "Strict global ordering across all targets",
        "Synchronous request/response coupling",
        "Built-in relational analytics"
      ],
      ans: 0,
      explain: "EventBridge supports target retry policies and optional DLQs for failed deliveries while preserving loose coupling."
    },
    {
      task: "2.12",
      q: (s) => `Which two actions improve Aurora database resiliency for ${s}?`,
      opts: [
        "Use Aurora Replicas across Availability Zones",
        "Run single writer only with no backups",
        "Enable automated backups and point-in-time recovery",
        "Disable monitoring to reduce overhead"
      ],
      multi: true,
      ans: [0, 2],
      explain: "Aurora Replicas and automated backup/PITR capabilities improve resilience and recovery posture."
    },
    {
      task: "2.13",
      q: (s) => `A consumer service for ${s} is offline for several hours. Which SQS setting helps preserve unprocessed messages during the outage?`,
      opts: [
        "Message retention period",
        "Long polling",
        "Visibility timeout only",
        "FIFO deduplication ID"
      ],
      ans: 0,
      explain: "Message retention controls how long messages remain available in the queue before expiry."
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
        domain: 2,
        task: p.task,
        q: p.q(s),
        opts: p.opts,
        ...(p.multi ? { multi: true } : {}),
        ans: p.ans,
        explain: p.explain
      });
    });
  });

  window.domain2Questions = dedupeQuestions(questions);
})();
