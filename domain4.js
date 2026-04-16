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
      task: "4.1",
      q: (s) => `${s} runs a stable 24/7 EC2 baseline for at least one year. Which option is generally most cost efficient?`,
      opts: [
        "Savings Plans or Reserved Instances for baseline usage",
        "On-Demand only",
        "Dedicated Hosts for everything",
        "Spot only"
      ],
      ans: 0,
      explain: "Commitment discounts are typically best for predictable steady-state compute usage."
    },
    {
      task: "4.1",
      q: (s) => `${s} has interruptible batch jobs and wants lower compute spend. Which purchasing model is most suitable?`,
      opts: [
        "Spot Instances",
        "On-Demand only",
        "Dedicated Instances only",
        "Capacity Reservations only"
      ],
      ans: 0,
      explain: "Spot capacity is designed for flexible workloads that can tolerate interruptions."
    },
    {
      task: "4.1",
      q: (s) => `${s} retains logs in S3 and rarely reads data older than 90 days. Which policy best optimizes storage cost?`,
      opts: [
        "S3 lifecycle transitions to lower-cost classes",
        "Keep all data in S3 Standard forever",
        "Move logs to gp3 volumes",
        "Delete all logs after 7 days"
      ],
      ans: 0,
      explain: "Lifecycle transitions align storage class cost with changing access patterns."
    },
    {
      task: "4.1",
      q: (s) => `${s} accesses S3 from private subnets through NAT gateways and has high processing charges. Which change likely reduces cost?`,
      opts: [
        "Use an S3 gateway endpoint",
        "Add more NAT gateways",
        "Route through internet gateway",
        "Use one public subnet"
      ],
      ans: 0,
      explain: "S3 gateway endpoints can avoid NAT processing for S3 traffic."
    },
    {
      task: "4.1",
      q: (s) => `${s} uses io1 volumes for mostly general-purpose workloads and is overpaying. Which option usually improves cost efficiency?`,
      opts: [
        "Move suitable volumes to right-sized gp3",
        "Upgrade all volumes to io2",
        "Replace block storage with Glacier",
        "Disable snapshots"
      ],
      ans: 0,
      explain: "gp3 often provides strong price-performance for general-purpose SSD workloads."
    },
    {
      task: "4.2",
      q: (s) => `${s} uses one oversized always-on API instance even though demand peaks only in daytime hours. Which change is typically more cost-effective?`,
      opts: [
        "Use smaller instances with Auto Scaling",
        "Keep one large fixed instance",
        "Switch to Dedicated Hosts",
        "Increase provisioned IOPS"
      ],
      ans: 0,
      explain: "Elastic scaling reduces payment for idle capacity during low-traffic periods."
    },
    {
      task: "4.2",
      q: (s) => `${s} wants alerts for unusual spend spikes and rightsizing recommendations. Which services should be used together?`,
      opts: [
        "AWS Cost Anomaly Detection and AWS Compute Optimizer",
        "Route 53 and CloudTrail",
        "Macie and GuardDuty",
        "Athena and Glue only"
      ],
      ans: 0,
      explain: "Cost Anomaly Detection and Compute Optimizer target spend monitoring and optimization insights."
    },
    {
      task: "4.2",
      q: (s) => `${s} runs occasional SQL analytics on S3 and wants to avoid always-on cluster cost. Which service is the best fit?`,
      opts: [
        "Amazon Athena",
        "Permanent EC2 warehouse",
        "Always-on provisioned Redshift cluster",
        "Dedicated Hadoop fleet"
      ],
      ans: 0,
      explain: "Athena is serverless and charges primarily per query scanned data."
    },
    {
      task: "4.2",
      q: (s) => `${s} serves static assets globally from S3 and wants to reduce origin transfer load. Which architecture helps most?`,
      opts: [
        "CloudFront with S3 origin caching",
        "Single EC2 origin only",
        "Static traffic through NAT",
        "EBS snapshot distribution"
      ],
      ans: 0,
      explain: "CloudFront caching reduces repeated origin fetches and improves transfer efficiency."
    },
    {
      task: "4.2",
      q: (s) => `${s} needs monthly spend guardrails and team-level budget alerts. Which approach should be implemented?`,
      opts: [
        "AWS Budgets with cost allocation tags",
        "CloudTrail event history",
        "Security groups by team",
        "KMS key aliases only"
      ],
      ans: 0,
      explain: "Budgets plus cost tags support accountable team-level spend visibility and alerting."
    },
    {
      task: "4.3",
      q: (s) => `${s} has non-production environments needed only during business hours. Which action directly lowers cost?`,
      opts: [
        "Automated stop/start schedules for non-prod resources",
        "Scale all instances up",
        "Move non-prod to dedicated hosts",
        "Disable monitoring"
      ],
      ans: 0,
      explain: "Scheduling reduces runtime for resources not needed 24/7."
    },
    {
      task: "4.3",
      q: (s) => `Which two networking changes can reduce data transfer and processing costs for ${s}?`,
      opts: [
        "Use VPC endpoints for AWS services where appropriate",
        "Route all service traffic through centralized NAT",
        "Minimize unnecessary cross-AZ traffic",
        "Duplicate traffic for analytics"
      ],
      multi: true,
      ans: [0, 2],
      explain: "Service endpoints and traffic-path optimization can lower NAT and transfer charges."
    },
    {
      task: "4.3",
      q: (s) => `${s} has stable baseline demand with periodic spikes. Which procurement mix is usually cost-optimized?`,
      opts: [
        "Cover baseline with Savings Plans and use On-Demand/Spot for spikes",
        "On-Demand for all workloads",
        "Spot for all workloads",
        "Dedicated Hosts for all workloads"
      ],
      ans: 0,
      explain: "Blended procurement aligns commitment discounts with flexible burst capacity."
    },
    {
      task: "4.3",
      q: (s) => `${s} needs infrequent backup access with millisecond retrieval. Which S3 class is typically appropriate?`,
      opts: [
        "S3 Standard-IA",
        "S3 Deep Archive",
        "S3 Glacier Flexible Retrieval only",
        "EBS io2"
      ],
      ans: 0,
      explain: "Standard-IA is designed for infrequent access with rapid retrieval characteristics."
    },
    {
      task: "4.3",
      q: (s) => `${s} often leaves idle resources running after projects finish. Which governance practice most directly prevents this waste?`,
      opts: [
        "Tagging policies with automated cleanup workflows",
        "Disable cost reports",
        "Use larger default instance types",
        "Block CloudWatch alarms"
      ],
      ans: 0,
      explain: "Tag governance plus cleanup automation helps detect and remove orphaned spend."
    },
    {
      task: "4.4",
      q: (s) => `${s} has variable database demand and currently overpays for fixed provisioned capacity. Which model can better align cost with usage?`,
      opts: [
        "Serverless or autoscaling database capacity options",
        "Larger fixed provisioned instances",
        "Single magnetic disk",
        "Disable backups"
      ],
      ans: 0,
      explain: "Usage-adaptive capacity models reduce idle overprovisioning for variable workloads."
    },
    {
      task: "4.4",
      q: (s) => `${s} runs container tasks continuously at predictable baseline levels. Which pricing commitment generally lowers cost versus pure On-Demand?`,
      opts: [
        "Compute Savings Plans",
        "Dedicated Hosts",
        "Capacity Reservations only",
        "Elastic IP discounts"
      ],
      ans: 0,
      explain: "Compute Savings Plans can apply discounted rates to eligible steady compute usage."
    },
    {
      task: "4.4",
      q: (s) => `${s} wants to cut EC2 spend while keeping performance. Which method should be prioritized first?`,
      opts: [
        "Rightsize using utilization metrics and recommendations",
        "Terminate monitoring agents",
        "Increase all instance sizes",
        "Disable Auto Scaling"
      ],
      ans: 0,
      explain: "Rightsizing based on measured utilization addresses overprovisioned compute directly."
    },
    {
      task: "4.4",
      q: (s) => `${s} stores EBS snapshots indefinitely with no lifecycle plan. Which action typically reduces long-term storage cost?`,
      opts: [
        "Implement snapshot retention/lifecycle policies",
        "Increase snapshot frequency only",
        "Move snapshots to instance store",
        "Disable all backups"
      ],
      ans: 0,
      explain: "Lifecycle retention policy prevents unbounded growth of old backup artifacts."
    },
    {
      task: "4.4",
      q: (s) => `${s} has spiky nightly ETL workloads in EMR. Which strategy usually lowers cost while keeping throughput targets?`,
      opts: [
        "Use spot-heavy task/core nodes with interruption-aware design",
        "Run full on-demand clusters 24/7",
        "Use dedicated hosts only",
        "Disable autoscaling"
      ],
      ans: 0,
      explain: "EMR with spot-aware architecture is a common cost optimization for fault-tolerant ETL windows."
    },
    {
      task: "4.4",
      q: (s) => `${s} serves API traffic with mostly idle off-peak periods. Which architecture often improves cost efficiency compared to always-on servers?`,
      opts: [
        "Serverless API pattern with Lambda and API Gateway",
        "Single largest EC2 instance all day",
        "Dedicated hosts for API tier",
        "Manual scaling weekly"
      ],
      ans: 0,
      explain: "Serverless usage-based billing often improves efficiency for bursty or highly variable traffic."
    },
    {
      task: "4.4",
      q: (s) => `${s} wants to forecast spend trends and prevent budget overruns early. Which process is most aligned with AWS cost optimization guidance?`,
      opts: [
        "Continuous cost monitoring with budgets, anomaly detection, and periodic optimization review",
        "Quarterly manual spreadsheet checks only",
        "Disable all tagging",
        "Ignore low-utilization resources"
      ],
      ans: 0,
      explain: "Ongoing monitoring and recurring optimization reviews are core to sustained cost governance."
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