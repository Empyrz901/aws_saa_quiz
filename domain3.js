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
      task: "3.3",
      q: (s) => `${s} has a read-heavy Aurora workload and rising read latency. Which change best improves performance without scaling the writer?`,
      opts: [
        "Add Aurora Replicas and route reads to the reader endpoint",
        "Increase backup retention only",
        "Disable storage autoscaling",
        "Move logs to CloudTrail"
      ],
      ans: 0,
      explain: "Aurora Replicas scale read throughput while preserving the primary writer role."
    },
    {
      task: "3.4",
      q: (s) => `${s} serves repeated API responses that are cacheable for short periods. Which architecture most reduces latency and backend load?`,
      opts: [
        "CloudFront caching in front of API responses",
        "Larger NAT gateways",
        "More route tables",
        "Disable HTTP keep-alive"
      ],
      ans: 0,
      explain: "Edge caching reduces repeated origin hits and improves response latency for cacheable content."
    },
    {
      task: "3.3",
      q: (s) => `${s} uses DynamoDB and needs microsecond reads for frequently accessed keys. Which service is designed for this?`,
      opts: [
        "DynamoDB Accelerator (DAX)",
        "Amazon RDS Proxy",
        "DynamoDB global tables",
        "DynamoDB Streams with Lambda consumers"
      ],
      ans: 0,
      explain: "DAX is an in-memory cache layer for DynamoDB read acceleration."
    },
    {
      task: "3.2",
      q: (s) => `${s} has variable CPU traffic on EC2 and wants automated performance scaling. Which policy is best aligned?`,
      opts: [
        "Target tracking Auto Scaling based on utilization",
        "Static instance count",
        "Manual scale actions only",
        "Disable health checks"
      ],
      ans: 0,
      explain: "Target tracking adjusts capacity automatically to maintain selected performance targets."
    },
    {
      task: "3.4",
      q: (s) => `${s} has global users and wants lower latency to regional endpoints over the AWS backbone. Which service helps most?`,
      opts: [
        "AWS Global Accelerator",
        "Amazon CloudFront with dynamic content disabled",
        "Route 53 geolocation routing only",
        "AWS Site-to-Site VPN acceleration"
      ],
      ans: 0,
      explain: "Global Accelerator optimizes traffic pathing to healthy regional endpoints via AWS global network."
    },
    {
      task: "3.1",
      q: (s) => `${s} stores files frequently accessed for 30 days and rarely afterward. Which storage approach balances performance and lifecycle efficiency?`,
      opts: [
        "S3 Standard with lifecycle transitions to colder classes",
        "S3 Glacier Deep Archive for all objects immediately",
        "EFS Standard with no lifecycle policy",
        "One gp3 volume attached to an upload processor"
      ],
      ans: 0,
      explain: "Use hot storage for active phase, then transition by policy as access frequency drops."
    },
    {
      task: "3.1",
      q: (s) => `${s} runs temporary scratch workloads with high local IOPS needs and no persistence requirement after stop. Which storage is best?`,
      opts: [
        "EC2 instance store",
        "Provisioned IOPS EBS volume with snapshots",
        "Amazon EFS Max I/O mode",
        "S3 Standard with Transfer Acceleration"
      ],
      ans: 0,
      explain: "Instance store provides high-performance ephemeral local storage."
    },
    {
      task: "3.2",
      q: (s) => `${s} runs bursty containers and needs strong price-performance with minimal overprovisioning. Which approach is best?`,
      opts: [
        "Right-size ECS/Fargate tasks and enable autoscaling",
        "Pin all services to the largest EC2 type",
        "Disable scaling",
        "Use one host only"
      ],
      ans: 0,
      explain: "Right-sizing and autoscaling align compute allocation with real demand."
    },
    {
      task: "3.2",
      q: (s) => `${s} executes interruptible batch jobs and wants cheaper compute while maintaining throughput. Which purchasing model is suitable?`,
      opts: [
        "Spot Instances with interruption-aware processing",
        "On-Demand only",
        "Dedicated Hosts only",
        "Savings Plans only"
      ],
      ans: 0,
      explain: "Spot is built for flexible, interruptible workloads and can lower compute cost significantly."
    },
    {
      task: "3.4",
      q: (s) => `${s} needs private in-VPC access to SQS and KMS APIs with no public internet path. Which network design is best?`,
      opts: [
        "Interface VPC endpoints for required services",
        "Gateway endpoints for SQS and KMS",
        "NAT gateways in each AZ with public service endpoints",
        "VPC peering to an AWS-owned service VPC"
      ],
      ans: 0,
      explain: "Interface endpoints provide private service connectivity over AWS PrivateLink."
    },
    {
      task: "3.5",
      q: (s) => `${s} needs serverless ad hoc SQL queries over S3 data with fast startup and minimal ops. Which service is best?`,
      opts: [
        "Amazon Athena",
        "Amazon Redshift provisioned cluster kept online",
        "AWS Glue crawler alone",
        "Amazon EMR cluster with long-running masters"
      ],
      ans: 0,
      explain: "Athena provides serverless SQL querying over data in S3."
    },
    {
      task: "3.3",
      q: (s) => `Which two practices typically improve DynamoDB performance at scale for ${s}?`,
      opts: [
        "Choose partition keys that avoid hotspots",
        "Enable DynamoDB auto scaling for provisioned throughput",
        "Force all writes to one partition key",
        "Disable autoscaling and keep low fixed capacity",
        "Use strongly consistent scans for every request"
      ],
      multi: true,
      ans: [0, 1],
      explain: "Balanced key distribution and capacity autoscaling reduce throttling risk and improve consistency."
    },
    {
      task: "3.3",
      q: (s) => `${s} runs short-lived unpredictable background tasks and wants no idle server fleet. Which compute model best fits?`,
      opts: [
        "AWS Lambda",
        "One large always-on EC2 instance",
        "Dedicated Hosts",
        "Manual cron on single VM"
      ],
      ans: 0,
      explain: "Lambda scales per request and eliminates always-on capacity overhead for bursty short tasks."
    },
    {
      task: "3.1",
      q: (s) => `${s} receives uploads from globally distributed clients and wants faster transfers to S3. Which feature helps?`,
      opts: [
        "S3 Transfer Acceleration",
        "S3 Inventory",
        "S3 Batch Operations",
        "S3 Object Lock"
      ],
      ans: 0,
      explain: "Transfer Acceleration uses edge locations and optimized routing for long-distance uploads."
    },
    {
      task: "3.2",
      q: (s) => `${s} has CPU-bound Java services and needs better throughput per dollar. Which approach is most appropriate?`,
      opts: [
        "Benchmark newer EC2 families and right-size using measured load",
        "Select instance types by memory only",
        "Disable profiling and metrics",
        "Increase DNS TTL"
      ],
      ans: 0,
      explain: "Empirical benchmarking and right-sizing are key to practical performance optimization."
    },
    {
      task: "3.3",
      q: (s) => `${s} has stateless web nodes but frequent session lookups that add response latency. Which architecture can reduce latency?`,
      opts: [
        "Store session state in Amazon ElastiCache",
        "Store sessions on each EC2 local disk only",
        "Store sessions in CloudTrail",
        "Disable connection pooling"
      ],
      ans: 0,
      explain: "In-memory cache services provide low-latency shared session access."
    },
    {
      task: "3.3",
      q: (s) => `${s} has many short-lived database connections causing relational DB pressure. Which service can help connection reuse and stability?`,
      opts: [
        "Amazon RDS Proxy",
        "Aurora read replicas only",
        "DynamoDB Accelerator (DAX)",
        "Application Load Balancer stickiness"
      ],
      ans: 0,
      explain: "RDS Proxy manages pooled database connections and reduces connection churn overhead."
    },
    {
      task: "3.5",
      q: (s) => `${s} needs sustained high-throughput streaming ingestion with partitioned consumers and near-real-time processing. Which service is most suitable?`,
      opts: [
        "Amazon Kinesis Data Streams",
        "Amazon SQS FIFO queue with one message group",
        "AWS Glue crawler scheduled hourly",
        "Amazon Athena query federation"
      ],
      ans: 0,
      explain: "Kinesis Data Streams supports partitioned scalable ingest and parallel stream processing."
    },
    {
      task: "3.1",
      q: (s) => `${s} needs block storage tuned for consistent baseline SSD performance with separate IOPS/throughput control at lower cost than io classes. Which EBS type is best?`,
      opts: [
        "EBS gp3",
        "EBS st1",
        "EBS sc1",
        "EBS magnetic"
      ],
      ans: 0,
      explain: "gp3 allows independent tuning of IOPS/throughput and is commonly strong price-performance for general SSD use."
    },
    {
      task: "3.5",
      q: (s) => `${s} needs event-driven image processing with horizontal scale and minimal server operations. Which design is most aligned?`,
      opts: [
        "S3 event notifications triggering Lambda",
        "Static EC2 cron servers",
        "Single on-prem batch host",
        "Manual SSH processing"
      ],
      ans: 0,
      explain: "S3-to-Lambda event patterns provide scalable serverless processing with low operational overhead."
    },
    {
      task: "3.3",
      q: (s) => `${s} has API hot keys and frequent read amplification from repeated requests. Which additional technique improves performance beyond base table tuning?`,
      opts: [
        "Read-through caching layer such as DAX or ElastiCache",
        "Increase CloudTrail retention",
        "Move to magnetic EBS",
        "Disable auto scaling"
      ],
      ans: 0,
      explain: "Caching frequently requested values reduces repeated backend reads and lowers response latency."
    },
    {
      task: "3.2",
      q: (s) => `${s} wants performance-aware architecture decisions for new workloads. Which discipline best prevents premature overprovisioning?`,
      opts: [
        "Load testing and metric-based right-sizing before broad rollout",
        "Always choose largest instance families",
        "Skip monitoring in production",
        "Ignore latency SLOs"
      ],
      ans: 0,
      explain: "Performance testing plus measured right-sizing is core to high-performing architecture design."
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
        domain: 3,
        task: p.task,
        q: p.q(s),
        opts: p.opts,
        ...(p.multi ? { multi: true } : {}),
        ans: p.ans,
        explain: p.explain
      });
    });
  });

  window.domain3Questions = dedupeQuestions(questions);
})();
