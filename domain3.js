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
      task: "3.1",
      q: (s) => `${s} has a read-heavy Aurora workload with increasing read latency. Which change improves read performance without scaling the writer?`,
      opts: [
        "Add Aurora Replicas and direct read traffic to the reader endpoint",
        "Increase backup retention period",
        "Disable storage autoscaling",
        "Move logs to CloudTrail"
      ],
      ans: 0,
      explain: "Aurora Replicas scale read throughput and are accessed through the reader endpoint."
    },
    {
      task: "3.2",
      q: (s) => `The API for ${s} serves frequently requested mostly static responses. Which option best reduces latency and backend load?`,
      opts: [
        "Use CloudFront caching in front of cacheable API responses",
        "Increase subnet CIDR range",
        "Use larger NAT gateways",
        "Disable HTTP keep-alive"
      ],
      ans: 0,
      explain: "CloudFront edge caching reduces repeated origin requests and improves user-perceived latency."
    },
    {
      task: "3.3",
      q: (s) => `${s} uses DynamoDB and needs microsecond read latency for repeated key lookups. Which service is designed for this?`,
      opts: [
        "Amazon DAX",
        "Amazon RDS Proxy",
        "Amazon Redshift",
        "Amazon Kinesis Data Firehose"
      ],
      ans: 0,
      explain: "DAX is an in-memory accelerator for DynamoDB read-heavy patterns."
    },
    {
      task: "3.4",
      q: (s) => `${s} has CPU-variable traffic on EC2. Which scaling strategy best maintains performance with less manual tuning?`,
      opts: [
        "Target tracking Auto Scaling on CPU",
        "Fixed instance count",
        "Manual weekend scaling",
        "Single large instance"
      ],
      ans: 0,
      explain: "Target tracking automatically adjusts capacity toward a utilization target."
    },
    {
      task: "3.5",
      q: (s) => `${s} serves global users and needs lower latency to regional endpoints. Which change is most appropriate?`,
      opts: [
        "Use AWS Global Accelerator",
        "Increase EBS volume size",
        "Use one NAT per subnet",
        "Disable HTTP/2"
      ],
      ans: 0,
      explain: "Global Accelerator routes clients through the AWS global network to optimal regional endpoints."
    },
    {
      task: "3.6",
      q: (s) => `${s} stores files accessed frequently for 30 days and rarely after. Which S3 design best supports performance and lifecycle efficiency?`,
      opts: [
        "Store in S3 Standard then transition with lifecycle rules",
        "Store directly in Deep Archive",
        "Store in EBS snapshots only",
        "Use One Zone-IA for all critical data"
      ],
      ans: 0,
      explain: "S3 Standard handles frequent access; lifecycle policies automate lower-cost transitions later."
    },
    {
      task: "3.7",
      q: (s) => `${s} runs temporary high-IO scratch processing and can tolerate data loss on stop/terminate. Which storage is best?`,
      opts: [
        "Instance store",
        "Amazon EFS",
        "S3 Glacier",
        "FSx for Windows File Server"
      ],
      ans: 0,
      explain: "Instance store is high-performance ephemeral local block storage."
    },
    {
      task: "3.8",
      q: (s) => `Container workloads for ${s} are uneven and bursty. Which approach improves compute price-performance?`,
      opts: [
        "Right-size ECS/Fargate CPU and memory with autoscaling",
        "Pin all services to large EC2 instances",
        "Disable scaling",
        "Store images on EFS only"
      ],
      ans: 0,
      explain: "Right-sized tasks plus autoscaling align allocated compute to real demand."
    },
    {
      task: "3.9",
      q: (s) => `${s} runs interruptible batch jobs and wants maximum throughput at lower compute cost. Which purchasing option fits best?`,
      opts: [
        "Spot Instances with interruption handling",
        "On-Demand only",
        "Dedicated Hosts",
        "RI-only without elasticity"
      ],
      ans: 0,
      explain: "Spot is ideal for fault-tolerant batch workloads that can handle interruptions."
    },
    {
      task: "3.10",
      q: (s) => `${s} needs private low-latency VPC access to SQS and KMS APIs. Which networking design is best?`,
      opts: [
        "Interface VPC endpoints for required services",
        "Internet gateway for all calls",
        "NAT instance without private endpoints",
        "Public subnet only"
      ],
      ans: 0,
      explain: "Interface endpoints provide private service access over AWS PrivateLink."
    },
    {
      task: "3.11",
      q: (s) => `${s} needs ad hoc SQL analysis over large S3 datasets with minimal infrastructure management. Which service is a strong fit?`,
      opts: [
        "Amazon Athena",
        "Long-running EC2 MySQL",
        "AWS Batch",
        "Amazon MQ"
      ],
      ans: 0,
      explain: "Athena provides serverless SQL query capabilities on data stored in S3."
    },
    {
      task: "3.12",
      q: (s) => `Which two actions typically improve DynamoDB performance at scale for ${s}?`,
      opts: [
        "Design partition keys to avoid hot partitions",
        "Enable DynamoDB auto scaling for provisioned throughput",
        "Force all traffic to one partition key",
        "Disable autoscaling and keep low fixed capacity"
      ],
      multi: true,
      ans: [0, 1],
      explain: "Balanced partition keys prevent hotspots, and auto scaling helps adjust throughput as demand changes."
    },
    {
      task: "3.13",
      q: (s) => `${s} runs many short-lived tasks with unpredictable arrival rates. Which compute model minimizes idle capacity?`,
      opts: [
        "AWS Lambda",
        "One large always-on EC2 instance",
        "Dedicated host",
        "Manual cron server"
      ],
      ans: 0,
      explain: "Lambda scales with request volume and reduces idle server overhead for bursty short tasks."
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
