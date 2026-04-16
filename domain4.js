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
      task: "4.1",
      q: (s) => `${s} runs steady 24/7 baseline EC2 usage for at least one year. Which option is generally most cost-efficient?`,
      opts: [
        "Savings Plans or Reserved Instances for baseline usage",
        "On-Demand only",
        "Dedicated Hosts for everything",
        "Spot only"
      ],
      ans: 0,
      explain: "Commitment-based pricing (Savings Plans/RIs) usually reduces cost for predictable baseline usage."
    },
    {
      task: "4.2",
      q: (s) => `${s} has fault-tolerant batch jobs that can be interrupted. Which purchase model can minimize compute cost?`,
      opts: [
        "Spot Instances",
        "On-Demand only",
        "Dedicated Instances",
        "Capacity Blocks only"
      ],
      ans: 0,
      explain: "Spot pricing is designed for interruptible workloads and can significantly lower compute cost."
    },
    {
      task: "4.3",
      q: (s) => `${s} stores logs in S3 and rarely accesses data after 90 days. Which approach is most cost-effective?`,
      opts: [
        "S3 lifecycle transitions to lower-cost storage classes",
        "Keep all data in S3 Standard forever",
        "Move logs to gp3 volumes",
        "Delete all logs immediately"
      ],
      ans: 0,
      explain: "Lifecycle transitions align storage cost with access frequency over time."
    },
    {
      task: "4.4",
      q: (s) => `${s} accesses S3 heavily from private subnets through NAT gateways and sees high processing charges. How can costs be reduced?`,
      opts: [
        "Use an S3 gateway endpoint",
        "Add more NAT gateways",
        "Route through internet gateway",
        "Use Direct Connect gateway only"
      ],
      ans: 0,
      explain: "S3 gateway endpoints can avoid unnecessary NAT processing for S3-bound traffic."
    },
    {
      task: "4.5",
      q: (s) => `${s} overprovisioned io1 EBS volumes for general-purpose workloads. Which change is usually more cost-efficient?`,
      opts: [
        "Move suitable volumes to right-sized gp3",
        "Increase all volumes to io2",
        "Replace with Glacier",
        "Disable snapshots"
      ],
      ans: 0,
      explain: "gp3 often offers better price-performance for general-purpose SSD workloads."
    },
    {
      task: "4.6",
      q: (s) => `${s} runs one oversized always-on API instance despite daytime-only spikes. Which change is typically most cost-effective?`,
      opts: [
        "Use Auto Scaling with smaller instances",
        "Keep one large fixed instance",
        "Use dedicated hosts",
        "Increase provisioned IOPS only"
      ],
      ans: 0,
      explain: "Autoscaling aligns capacity to demand and reduces payment for idle resources."
    },
    {
      task: "4.7",
      q: (s) => `Finance wants proactive cost insights for ${s}, including unusual spend alerts and rightsizing suggestions. Which services help?`,
      opts: [
        "AWS Cost Anomaly Detection and AWS Compute Optimizer",
        "CloudTrail and Route 53",
        "Amazon Rekognition and Polly",
        "S3 Inventory and DataSync"
      ],
      ans: 0,
      explain: "Cost Anomaly Detection and Compute Optimizer provide focused cost-governance recommendations."
    },
    {
      task: "4.8",
      q: (s) => `${s} runs occasional SQL analytics over large S3 datasets and wants minimal always-on infrastructure cost. Which option fits best?`,
      opts: [
        "Amazon Athena pay-per-query",
        "Permanent EC2 analytics cluster",
        "Always-on provisioned Redshift regardless of usage",
        "Dedicated Hadoop fleet"
      ],
      ans: 0,
      explain: "Athena is serverless and cost-aligned for intermittent query workloads."
    },
    {
      task: "4.9",
      q: (s) => `${s} serves global static content from S3 and wants lower origin load and better transfer efficiency. Which architecture helps?`,
      opts: [
        "Use CloudFront with S3 as origin",
        "Serve directly from one EC2 server",
        "Route static traffic through NAT gateways",
        "Use EBS snapshots for distribution"
      ],
      ans: 0,
      explain: "CloudFront edge caching reduces repeated origin transfers and improves delivery efficiency."
    },
    {
      task: "4.10",
      q: (s) => `${s} needs team-level monthly spending controls and alerting. Which approach should be used?`,
      opts: [
        "AWS Budgets with cost allocation tags",
        "Route 53 health checks",
        "IAM Access Analyzer",
        "EC2 key pair policies"
      ],
      ans: 0,
      explain: "Budgets plus cost-allocation tags support per-team monitoring and alert thresholds."
    },
    {
      task: "4.11",
      q: (s) => `Development environments for ${s} run only during business hours. Which action reduces unnecessary spend?`,
      opts: [
        "Automate stop/start schedules for non-production resources",
        "Scale all instances up",
        "Use Dedicated Hosts for dev",
        "Disable CloudWatch metrics"
      ],
      ans: 0,
      explain: "Scheduling non-production resources avoids paying for idle runtime."
    },
    {
      task: "4.12",
      q: (s) => `Which two networking changes can reduce avoidable transfer and processing costs for ${s}?`,
      opts: [
        "Use VPC endpoints for AWS services when appropriate",
        "Route all service traffic through centralized NAT regardless of destination",
        "Minimize unnecessary cross-AZ traffic paths",
        "Duplicate packet streams for all workloads"
      ],
      multi: true,
      ans: [0, 2],
      explain: "Service endpoints and transfer-aware architecture choices reduce unnecessary network-related charges."
    },
    {
      task: "4.13",
      q: (s) => `${s} has stable baseline demand with occasional spikes. Which strategy is typically cost-optimized?`,
      opts: [
        "Cover baseline with Savings Plans; handle bursts with On-Demand or Spot where appropriate",
        "Run all usage as On-Demand",
        "Run all usage as Spot regardless of interruption tolerance",
        "Use Dedicated Hosts for all workloads"
      ],
      ans: 0,
      explain: "Blending commitments for predictable usage and flexible capacity for spikes is often the best cost pattern."
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
        domain: 4,
        task: p.task,
        q: p.q(s),
        opts: p.opts,
        ...(p.multi ? { multi: true } : {}),
        ans: p.ans,
        explain: p.explain
      });
    });
  });

  window.domain4Questions = dedupeQuestions(questions);
})();
