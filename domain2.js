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
      task: "2.1",
      q: (s) => `${s} must keep a web tier online during an Availability Zone outage. Which architecture best meets this goal?`,
      opts: [
        "Multi-AZ Auto Scaling behind an Application Load Balancer",
        "Single EC2 instance with EIP",
        "One ECS task in one subnet",
        "Single NAT instance"
      ],
      ans: 0,
      explain: "Multi-AZ load balancing and autoscaling protect against single-AZ failures."
    },
    {
      task: "2.1",
      q: (s) => `${s} needs managed MySQL failover with a synchronous standby in another AZ. Which option should be selected?`,
      opts: [
        "RDS Multi-AZ DB instance deployment",
        "Single-AZ RDS with larger storage",
        "DynamoDB global table",
        "S3 cross-region replication"
      ],
      ans: 0,
      explain: "RDS Multi-AZ provides synchronous standby and managed failover for high availability."
    },
    {
      task: "2.1",
      q: (s) => `${s} requires DNS-based active-passive regional failover when primary endpoints fail health checks. Which Route 53 policy fits?`,
      opts: [
        "Failover routing",
        "Weighted routing",
        "Geolocation routing",
        "Multivalue answer routing"
      ],
      ans: 0,
      explain: "Failover routing is designed for primary/secondary endpoint health-based failover."
    },
    {
      task: "2.1",
      q: (s) => `${s} needs to decouple producers from consumers and absorb burst traffic during downstream slowdowns. Which service is best?`,
      opts: [
        "Amazon SQS",
        "Amazon EBS",
        "Amazon Route 53",
        "AWS Config"
      ],
      ans: 0,
      explain: "SQS provides durable buffering and asynchronous decoupling."
    },
    {
      task: "2.1",
      q: (s) => `${s} uses asynchronous Lambda invocations and wants undeliverable events preserved for later processing. What should be configured?`,
      opts: [
        "Retry policy with DLQ or on-failure destination",
        "Disable retries and ignore failures",
        "Increase subnet size",
        "Use static IPs for Lambda"
      ],
      ans: 0,
      explain: "Retries plus DLQ/destination handling improve failure recovery for async events."
    },
    {
      task: "2.2",
      q: (s) => `${s} must recover S3 objects from accidental overwrite or deletion. Which feature is required?`,
      opts: [
        "S3 Versioning",
        "S3 Transfer Acceleration",
        "S3 Inventory",
        "S3 Requester Pays"
      ],
      ans: 0,
      explain: "Versioning retains prior object versions and supports restore operations."
    },
    {
      task: "2.2",
      q: (s) => `${s} needs multi-Region active reads/writes with low RPO for a DynamoDB workload. Which design is best?`,
      opts: [
        "DynamoDB global tables",
        "Single-region table with daily exports",
        "DAX only",
        "Cross-account IAM role"
      ],
      ans: 0,
      explain: "Global tables provide managed multi-Region replication and active access patterns."
    },
    {
      task: "2.2",
      q: (s) => `${s} requires shared POSIX file access from compute in multiple AZs. Which storage service meets this need?`,
      opts: [
        "Amazon EFS",
        "Single EBS volume",
        "Instance store",
        "S3 Glacier"
      ],
      ans: 0,
      explain: "EFS provides managed NFS semantics and multi-AZ accessibility."
    },
    {
      task: "2.2",
      q: (s) => `${s} needs immutable backups that cannot be deleted before retention. Which AWS Backup feature is appropriate?`,
      opts: [
        "Backup Vault Lock",
        "Backup tags only",
        "CloudTrail Insights",
        "Route 53 Resolver"
      ],
      ans: 0,
      explain: "Vault Lock supports immutability controls aligned with retention requirements."
    },
    {
      task: "2.2",
      q: (s) => `${s} chooses warm standby for disaster recovery. Which description matches that pattern?`,
      opts: [
        "Scaled-down but running stack in the secondary region",
        "No infrastructure until disaster",
        "Full-size active-active only",
        "Backups on tape with manual rebuild"
      ],
      ans: 0,
      explain: "Warm standby keeps reduced-capacity resources running and ready to scale during failover."
    },
    {
      task: "2.3",
      q: (s) => `${s} uses EventBridge to route events to many targets and wants resilient delivery. Which statement is accurate?`,
      opts: [
        "EventBridge supports retries and can send failed deliveries to a DLQ",
        "EventBridge guarantees global ordering across all targets",
        "EventBridge requires synchronous response from each target",
        "EventBridge stores relational query indexes"
      ],
      ans: 0,
      explain: "EventBridge has retry policies and DLQ integration to handle failed target delivery attempts."
    },
    {
      task: "2.3",
      q: (s) => `Which two actions improve Aurora resiliency for ${s}?`,
      opts: [
        "Use Aurora Replicas across Availability Zones",
        "Disable backups to reduce overhead",
        "Enable automated backups and point-in-time recovery",
        "Use one instance in one AZ only"
      ],
      multi: true,
      ans: [0, 2],
      explain: "Aurora replicas plus automated backup/PITR improve availability and recoverability."
    },
    {
      task: "2.3",
      q: (s) => `${s} has temporary consumer outages and must avoid losing queued messages. Which SQS parameter is most relevant?`,
      opts: [
        "Message retention period",
        "Queue name prefix",
        "Long polling only",
        "Content-based deduplication only"
      ],
      ans: 0,
      explain: "Retention defines how long unprocessed messages remain available before expiration."
    },
    {
      task: "2.3",
      q: (s) => `${s} uses EC2 Auto Scaling and wants failed instances automatically replaced to keep desired capacity. Which mechanism enables this?`,
      opts: [
        "Auto Scaling health checks with replacement",
        "Manual instance reboot scripts",
        "Fixed EC2 count without checks",
        "Disable ELB health checks"
      ],
      ans: 0,
      explain: "Auto Scaling integrates health status and replaces unhealthy instances automatically."
    },
    {
      task: "2.4",
      q: (s) => `${s} needs resilient dedicated hybrid connectivity with minimal single-point-of-failure risk. What is recommended?`,
      opts: [
        "Redundant Direct Connect connections with resilient routing",
        "Single VPN tunnel only",
        "Single DX link in one location",
        "Internet gateway with static routes"
      ],
      ans: 0,
      explain: "Redundant Direct Connect design improves connectivity availability and failover posture."
    },
    {
      task: "2.4",
      q: (s) => `${s} has microservices that should continue partial operation if one dependency fails. Which architecture principle fits?`,
      opts: [
        "Failure isolation and bulkhead-style boundaries",
        "Single shared database for all services",
        "Synchronous hard dependency chains",
        "One global lock for all requests"
      ],
      ans: 0,
      explain: "Bulkhead/failure-isolation approaches reduce blast radius and preserve partial availability."
    },
    {
      task: "2.4",
      q: (s) => `${s} wants to run stateless container tasks across AZs and survive instance failures automatically. Which orchestration setup is strongest?`,
      opts: [
        "ECS service across multiple AZ subnets with desired task count",
        "Single EC2 host with one container",
        "One ECS task without service controller",
        "Manual SSH restarts"
      ],
      ans: 0,
      explain: "ECS services maintain desired task count and can place tasks across AZs for resilience."
    },
    {
      task: "2.4",
      q: (s) => `${s} needs regional disaster recovery for object data with asynchronous replication to another region. Which S3 feature should be used?`,
      opts: [
        "S3 Cross-Region Replication",
        "S3 Requester Pays",
        "S3 Transfer Acceleration",
        "S3 Batch Operations"
      ],
      ans: 0,
      explain: "CRR replicates objects to another region for resilience and DR use cases."
    },
    {
      task: "2.4",
      q: (s) => `${s} needs resilient API integration between microservices with event replay capability. Which combination is most aligned?`,
      opts: [
        "EventBridge or SQS with DLQ and idempotent consumers",
        "Synchronous HTTP chaining only",
        "Single database trigger for all services",
        "One cron job and local files"
      ],
      ans: 0,
      explain: "Asynchronous messaging with DLQ and idempotent processing supports resilient recovery patterns."
    },
    {
      task: "2.4",
      q: (s) => `${s} needs to reduce RTO for relational database recovery from failures. Which managed capability directly supports fast point-in-time restoration?`,
      opts: [
        "Automated backups with point-in-time restore",
        "Larger instance family only",
        "NAT gateway failover",
        "CloudFront cache policies"
      ],
      ans: 0,
      explain: "Automated backups and PITR are core mechanisms for restoring relational databases quickly."
    },
    {
      task: "2.4",
      q: (s) => `${s} uses SQS standard queues and wants consumers to avoid processing the same message simultaneously. Which feature helps?`,
      opts: [
        "Visibility timeout",
        "Transfer acceleration",
        "Route table propagation",
        "CloudWatch dashboard"
      ],
      ans: 0,
      explain: "Visibility timeout hides in-flight messages from other consumers during processing."
    },
    {
      task: "2.4",
      q: (s) => `${s} needs data-store-level regional resilience for global users with read locality. Which Aurora architecture is typically selected?`,
      opts: [
        "Aurora Global Database",
        "Single-AZ RDS instance",
        "One-region read replica only",
        "EFS One Zone"
      ],
      ans: 0,
      explain: "Aurora Global Database is designed for cross-region read scaling and DR capabilities."
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