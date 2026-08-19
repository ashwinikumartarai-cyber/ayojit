# **Enterprise Learning Architecture and AI Governance Infrastructure: Technical Requirements, Editorial Lifecycles, and System Design Blueprint**

## **Modern Enterprise Learning Management System Architecture**

Modern enterprise learning ecosystems require an architectural foundation capable of serving complex organizational structures, strict regulatory environments, and multi-modal learning workflows. An enterprise-ready Learning Management System (LMS) acts as the operational nucleus for corporate talent development, continuous compliance tracking, and distributed knowledge delivery. Engineering such a platform requires adherence to modular software patterns, zero-trust authorization frameworks, and standardized interoperability protocols.

### **User Management, Identity Synchronization, and Governance**

The identity management subsystem forms the perimeter of the enterprise LMS. Multi-tenancy architecture must support multi-layered organizational trees, enabling global enterprises to segment operations into discrete workspaces, regional sub-tenants, functional business units, or external client portals. Each tenant boundary mandates isolated database schemas or logically partitioned tenant boundaries, custom branding configurations, localized domain management, and isolated administrative permissions.  
Identity synchronization relies on federation with enterprise Identity Providers (IdPs). Single Sign-On (SSO) is established via SAML 2.0 and OpenID Connect (OIDC), while automated lifecycle provisioning is handled through System for Cross-domain Identity Management (SCIM 2.0) or OneRoster directory synchronization. When employee status changes occur in an enterprise Human Resource Information System (HRIS), SCIM listeners automatically provision, adjust access scopes, or immediately revoke permissions in the LMS without manual administrative intervention.  
Role-Based Access Control (RBAC) enforces permission sets across system capabilities:

* **Super Administrators:** Retain global, cross-tenant system access, platform-wide audit visibility, system configuration controls, and administrative overrides.  
* **Tenant Administrators:** Manage tenant-specific settings, departmental hierarchies, localized user assignments, and workspace branding assets.  
* **Instructors and Authors:** Possess authoring, course modification, submission evaluation, and learner interaction rights within explicitly assigned courses.  
* **Subject Matter Experts (SMEs):** Granted targeted review, verification, and approval rights over specific learning modules without broad course-editing privileges.  
* **Department Managers:** Access real-time transcript reports, skill matrix analytics, and compliance completion matrices for direct and indirect reporting lines.  
* **Auditors:** Granted immutable, read-only export access to historical access logs, policy acknowledgments, and certification records.  
* **Learners:** Access assigned learning trajectories, interact with collaborative feeds, complete assessments, and manage personal achievement records.

The system's event-driven notification engine handles asynchronous communication via dedicated messaging queues. Automated alerts, deadline reminders, certification expiration notices, and system webhooks execute based on status changes in user enrollment or administrative schedules across multiple delivery channels, including Email, SMS, Web Push, Slack, and Microsoft Teams.

### **Content Authoring, Marketplace Connectors, and Monetization**

The content engine must support both natively authored modules and external media packages. Native authoring environments utilize block-based drag-and-drop editors to assemble structured text, high-bitrate streaming media, interactive H5P modules, code execution blocks, and embedded assessment items.  
To complement internal content creation, native marketplace connectors interface with external content repositories such as LinkedIn Learning, Coursera, and industry-specific course providers. These connectors utilize Open Content Network (OCN) APIs to index external course catalogs directly within the internal search registry, managing Single Sign-On launch passes and returning completion telemetry to the central tracking engine.  
For commercial enterprise enablement—such as customer training portals or partner certification hubs—the platform integrates e-commerce and monetization workflows. This includes localized multi-currency payment gateway integrations, shopping cart interfaces, tier-based subscription management, corporate seat allocations, dynamic coupon engines, and automated tax handling.

### **E-Learning Technical Standards and Interoperability**

Interoperability protocols ensure content portability, advanced activity tracking, and tool embedding across distributed enterprise software stacks.

| Standard | Primary Architectural Purpose | Enterprise Use Case | Technical Tracking Payload / Mechanism |
| :---- | :---- | :---- | :---- |
| **SCORM 1.2 / 2004** | Course packaging, sequence structure, and basic completion tracking. | Legacy compliance modules and third-party vendor course packages. | JavaScript DOM API (LMSInitialize, LMSSetValue, cmi.core.lesson\_status). |
| **xAPI (Tin Can)** | Captures detailed, event-driven learning activity statements. | Cross-platform tracking, simulation execution, and mobile activity logging. | RESTful JSON statements formatted as Actor-Verb-Object sent to a Learning Record Store. |
| **cmi5** | Merges SCORM structural governance with xAPI data flexibility. | Mobile app distribution, offline session synchronization, and formal compliance tracking. | xAPI-based runtime launch state using predefined verbs (Launched, Completed, Passed). |
| **LTI 1.3 Advantage** | Embeds external tools and applications securely inside the platform. | Integrating external virtual labs, coding sandboxes, and video conference systems. | OAuth 2.1, OpenID Connect, and JSON Web Tokens (JWT) for launch context passing. |
| **OneRoster / Ed-Fi** | Exposes standardized REST APIs for roster and enrollment exchange. | Automated student, instructor, and course directory synchronization. | Standardized RESTful JSON endpoints and batch CSV exchange schemas. |
| **QTI (3.0)** | Standardizes assessment items, item banks, and scoring models. | Exporting and importing question banks across heterogeneous platforms. | XML-based item declarations detailing prompt structures, media, and response rules. |

### **Delivery Modalities, Personalization, and Collaborative Engagement**

Enterprise environments demand adaptive delivery models tailored to distinct learning objectives:

* **Self-Paced E-Learning:** Asynchronous access to media assets, SCORM packages, and structured text paths.  
* **Instructor-Led Training (ILT) & Virtual ILT (vILT):** Physical classroom management and virtual meeting integrations (such as Zoom, Microsoft Teams, and Webex) featuring automated attendance logging and waitlist handling.  
* **Cohort-Based Programs:** Synchronous group navigation through scheduled course modules with synchronized milestone deadlines.  
* **Micro-Credentials & Skill Paths:** Granular, stackable units mapped directly to enterprise competency models.

Personalization is driven by adaptive learning path engines. By evaluating job roles, baseline assessment scores, manager evaluations, and predictive skill gap analysis, the system constructs dynamic learning trajectories. These trajectories automatically unlock remedial content or advance high-performing learners past redundant introductory modules.  
Social engagement is fostered through moderated peer discussion forums, cohort messaging feeds, social Q\&A models, and shared project workspaces. Retention is supported by gamification mechanisms, including configurable badge frameworks, skill points, achievement tokens, dynamic departmental leaderboards, and an enterprise rewards store where earned points can be redeemed for organizational recognition or tangible incentives.

### **Assessment Engines, Evaluation Queues, and Native LRS Integrations**

The assessment engine supports diverse item formats, including multiple-choice, multi-select, free-response essay, code execution, matching, and video submission. High-stakes assessments require timed attempt windows, question pool randomization, item option shuffling, and configurable pass/fail scoring logic.  
For manual evaluations, the instructor grading queue aggregates submissions across cohorts. Key features include:

* **Rubric-Based Evaluation:** Multi-criteria scoring matrices establishing clear evaluation benchmarks.  
* **Plagiarism & Integrity Workflows:** Automated text similarity scanning against internal submission databases and web indices.  
* **Grade Overrides and Audit Control:** Immutable logging of all manual score overrides with mandatory administrative comment fields.

Analytics capabilities rely on a native, xAPI-compliant Learning Record Store (LRS) operating alongside real-time visualization dashboards. Dashboards display completion percentages, item discrimination metrics, drop-off points, and departmental compliance matrices. The native LRS stores granular event statements from both internal platform tools and external connected applications, exposing querying capabilities to enterprise Business Intelligence (BI) platforms via SQL or RESTful endpoints.

### **Accessibility, Mobile Synchronization, and Infrastructure Security**

Enterprise software must adhere to global accessibility mandates. Conformance with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards is required, necessitating full keyboard navigation, screen-reader optimizations (ARIA attributes), high-contrast visual themes, scalable typography, and automated closed-caption generation for audio/video media assets.  
Mobile learning (m-Learning) is delivered through progressive web apps (PWAs) or native mobile applications across iOS and Android. Utilizing the cmi5 specification, mobile clients allow learners to download course modules, execute training offline within a sandboxed runtime, and synchronize completion state, time tracking, and assessment results upon reconnecting to the network.  
Infrastructure security relies on data-at-rest encryption (AES-256), data-in-transit encryption (TLS 1.3), dynamic tenant isolation, zero-trust session management, and comprehensive audit logging compliant with GDPR and HIPAA standards.

## **Content Lifecycle Management and Editorial Engine**

Managing enterprise learning assets requires a deterministic content lifecycle engine. This system governs how assets are drafted, evaluated, revised, and deployed while maintaining transcript integrity for historical learners and progress continuity for active enrollees.

### **Deterministic Lifecycle State Machine**

Learning content—including courses, individual modules, assessments, and media assets—must transition through an immutable state machine. Modifying production content without explicit state transitions risks corrupting gradebooks and invalidating compliance audit trails.  
The editorial state machine governs seven states:

* **Draft:** Initial creation phase. Content is accessible strictly to the primary author and assigned collaborators. Draft assets are hidden from public catalogs and enrollment engines.  
* **Under Review:** locked against further editorial changes while undergoing automated accessibility scans, safety checks, and peer review.  
* **Changes Requested:** Returned to the author with attached inline comments, required modification flags, and feedback items.  
* **Approved:** Passed all automated governance checks and manual SME evaluations. The content is staged in the production repository, ready for scheduling or immediate release.  
* **Scheduled:** Staged for automatic release at a designated future timestamp.  
* **Published / Active:** Live and visible in the course catalog, launchable by enrolled learners according to assigned access schedules or drip rules.  
* **Archived / Deprecated:** Removed from active catalogs and blocked from new enrollments. The underlying assets, structure, and transcript references remain permanently preserved in a read-only state for compliance auditing.

### **Modular Editing, In-Place Modifications, and Regrading Logic**

Modifying content assigned to active learners presents challenges for progress tracking and gradebook stability. Content modification engines must decouple structural changes from core asset content updates.  
When an author modifies text, updates hyperlinks, or swaps media assets within a published module, the engine executes an in-place non-destructive replacement. The asset's unique identifier (UUID) remains stable, while its underlying asset payload updates, keeping active learner completion states intact.  
When structural modifications occur—such as adding mandatory modules, reordering unit sequences, or removing graded assessments—the system generates a version branch. Administrators can choose between two deployment strategies:

* **Prospective Mode:** Existing enrolled learners complete the course under the structural version active at the time of their enrollment. Newly enrolled learners are assigned the updated version.  
* **Retroactive Alignment Mode:** Enrolled learners who have not yet completed the course are migrated to the updated structure. Completed module UUIDs are mapped to the new layout, marking newly introduced required modules as pending.

When an instructor corrects an assessment key or adjusts point distributions on an active exam, the scoring engine can recalculate scores across existing submissions or lock prior attempts while applying new scoring logic exclusively to future submission events.

### **Semantic Versioning, Visual Diffing, and Audit Trails**

Content updates follow Semantic Versioning (MAJOR.MINOR.PATCH):

* **PATCH (e.g., v1.0.0 to v1.0.1):** Corrects minor typos, broken URLs, or minor visual formatting issues without impacting learning objectives or completion criteria.  
* **MINOR (e.g., v1.0.0 to v1.1.0):** Adds optional supplementary reading, updates existing video lectures, or refines question phrasing without altering total score weights.  
* **MAJOR (e.g., v1.0.0 to v2.0.0):** Restructures core modules, changes pass/fail score thresholds, adds mandatory units, or alters course learning outcomes.

The platform provides a visual, side-by-side version comparison workspace. Authors and compliance auditors can compare any two historical revisions of a course or assessment. Text modifications are highlighted with standard color-coded diff markers, structural additions are highlighted within unified outline views, and media updates display side-by-side previews.  
If an unauthorized or defective update reaches production, administrators can execute a one-click rollback. Reverting to a prior version restores the active publishing pointer to the selected historical release without deleting the defective revision from the change history.  
Every edit, state change, preview event, and publication action is recorded in an immutable audit trail. The log captures the User ID, IP Address, Timestamp, Target Resource UUID, Action Type, and Delta Payload. Audit records are cryptographically hashed and stored in append-only storage volumes to prevent tampering.

### **Configurable Governance Gates and Approval Rules**

Transitioning content from *Under Review* to *Approved* requires passing automated checks and manual sign-offs.

| Governance Gate | Check Type | Mechanism and Rule Description | Failure Handling Strategy |
| :---- | :---- | :---- | :---- |
| **WCAG 2.1 AA Accessibility** | Automated System Scan | Evaluates video assets for closed-caption tracks, checks images for alt text, and validates text contrast ratios against a 4.5:1 minimum threshold. | Blocks approval workflow; flags non-compliant elements directly in the visual editor. |
| **Safety & PII Moderation** | Automated System Scan | Scans uploaded text and media for PII patterns, copyright signatures, or restricted content using pattern matching and classifier models. | Quarantines flagged assets; routes the item to a manual security review queue. |
| **Copyright Declaration** | Manual Author Checklist | Mandates that the author explicitly confirm copyright ownership or licensing rights for third-party media assets. | Prevents state transition until all compliance checkboxes are verified. |
| **SME & Peer Review** | Workflow Verification Gate | Assigns review notifications to designated SMEs or Department Administrators to evaluate content accuracy and pedagogical quality. | Requires authenticated digital sign-off within the portal. |

### **Scoped Distribution, Preview Simulation, and Emergency Interventions**

Publishing configurations allow administrators to direct content distribution across the enterprise:

* **Instant Publishing:** Releases approved content across designated tenant workspaces immediately.  
* **Scheduled Release & Expiration:** Automates content launch dates and schedules archiving at explicit future timestamps.  
* **Drip Scheduling:** Releases modules incrementally based on calendar dates (e.g., unlocking new units every Monday) or completion prerequisites (e.g., unlocking Module 2 seven days after passing Module 1).

Distribution rules can scope content by tenant ID, organizational unit, job code, user role, dynamic group membership, or subscription level.  
To verify the learner experience prior to release, authors utilize a multi-view preview engine. This runtime context switcher renders draft content through different viewports, including Student View, Mobile Device View, Instructor View, or Accessibility Screen-Reader View.  
If critical errors, security vulnerabilities, or compliance issues are discovered in active content, administrators can trigger an emergency pause. This global kill-switch revokes access to the active course across all tenant portals, freezing active user sessions and displaying a customizable system maintenance notice while administrative teams address the issue.

## **Enterprise Architectural Evaluation and System System Blueprint for Ayojit Intelligence**

Deploying agentic AI frameworks within enterprise software platforms demands clear separation between presentation workflows, runtime execution environments, and policy enforcement engines1. When building an integrated platform that includes a global administrative control plane, a user-facing educational application layer, and an autonomous AI governance backend, establishing the correct engineering build sequence is critical1.

### **Module Priority Evaluation and System Dependency Analysis**

Architectural dependency analysis confirms that the **Agent-Governance Backend must be designed and constructed first**1. Constructing user-facing presentation layers or administrative dashboards before establishing the governance backend creates structural vulnerabilities1. Building application workflows over unvalidated runtime logic forces engineering teams to rely on mock security boundaries, which must later be retrofitted under zero-trust constraints at significant technical cost1.  
The priority of the Agent-Governance Backend rests on five architectural imperatives:

> 1. **Authorization Primitive Placement:** The Agent-Governance Backend houses the central Policy Decision Point (PDP) and Policy Enforcement Point (PEP)1. Mitigating dynamic agent risks—such as direct/indirect prompt injection, unauthorized tool usage, and privilege escalation—requires enforcing safety invariants at the execution layer before exposing user capabilities1.  
> 2. **Schema and Interface Contracts:** Both the Course Platform and the Master Dashboard operate as consumers of lower-level agent orchestration layers1. Defining declarative agent contracts and Model Context Protocol (MCP) tool interfaces establishes the data schemas, capability boundaries, and telemetry streams that higher-level interfaces require1.  
> 3. **Low-Level Isolation Verification:** WebAssembly (Wasm) sandboxing boundaries and extended Berkeley Packet Filter (eBPF) kernel tracing hooks operate near the operating system kernel1. These isolation primitives must be validated under operational loads to establish memory, CPU, and network resource limits before deploying multi-tenant workflows1.  
> 4. **Governance Alignment:** Aligning system behaviors with the NIST AI Risk Management Framework (AI 100-1) mandates establishing operational boundaries, risk mappings, and continuous measurement protocols prior to live model deployment1.  
> 5. **Containment of Blast Radius:** Establishing eBPF tracepoints and Wasm isolation early ensures that vulnerabilities in user prompts or untrusted tool payloads remain contained, preventing cross-tenant data leakage or host infrastructure compromise1.

| Architectural Module | Build Priority | Core Architectural Dependencies | Security Blast Radius | Core Architectural Role |
| :---- | :---- | :---- | :---- | :---- |
| **Agent-Governance Backend** | **Priority 1** | Host Linux Kernel (eBPF), LLM Provider APIs, Wasmtime Engine | High (Host Infrastructure Level) | Execution runtime, security enforcement, dual-model orchestration, policy evaluation, sandbox isolation, and telemetry generation1. |
| **Student/Instructor Course Platform** | **Priority 2** | Agent-Governance Backend, Identity Provider (IdP), Platform Database | Medium (Tenant / User Space Level) | User workflow execution, prompt interaction handling, assignment execution pipelines, and agent tutoring interfaces1. |
| **Supreme Master Dashboard** | **Priority 3** | Agent-Governance Backend, Course Platform DB, eBPF Telemetry Aggregator | Low (View / Read-Only Control Level) | Cross-tenant observability, administrative kill-switch controls, system analytics, and NIST AI RMF compliance reporting1. |

The system construction sequence follows a downward-dependent architecture where higher-level administrative controls depend on user workflows, and user workflows depend on deterministic governance and execution engines1.

### **Operationalizing NIST AI 100-1 Framework and Autonomy Tiers**

The security architecture of Ayojit Intelligence embeds enterprise risk management directly into runtime execution mechanisms by aligning technical controls with the four core functions of the NIST AI Risk Management Framework (NIST AI 100-1): GOVERN, MAP, MEASURE, and MANAGE3.  
To govern autonomous agent execution effectively, every agent interaction is assigned an explicit Autonomy Tier during contract compilation1:

* **Tier 0 (Advisory):** The model produces text recommendations for human review. Tool invocation capabilities are disabled in runtime configurations1.  
* **Tier 1 (Human-in-the-Loop Gate):** The agent constructs tool invocation payloads, but runtime execution remains blocked until an authorized human user approves the action1.  
* **Tier 2 (Bounded Autonomous Execution):** The agent executes pre-approved tool signatures within constrained Wasm memory boundaries and rate limits without per-action human approval1.  
* **Tier 3 (Delegated Multi-Step Execution):** The agent autonomously orchestrates multi-step workflows across external MCP servers, managing dynamic sub-tasks under continuous eBPF kernel monitoring1.

| NIST Function | Agentic Implementation Subsystem | System Metric / Evidence Artifact | Mitigation & Enforcement Mechanism |
| :---- | :---- | :---- | :---- |
| **GOVERN** | Declarative Agent Contract Parser | Cryptographically signed contract manifest (contract.json) | Rejection of unsigned, altered, or non-compliant agent execution configurations2. |
| **MAP** | Autonomy Tier Classifier & Context Engine | Risk Classification Metadata Schema | Dynamic restriction of MCP tool capabilities based on contextual user and resource risk levels1. |
| **MEASURE** | eBPF Kernel Collector & Wasm Metering Engine | Syscall trace logs, WASI memory fault rates, token consumption velocity | Real-time metric streaming to central security information and event management (SIEM) engines2. |
| **MANAGE** | Dual-Model Interceptor & Emergency Kill-Switch | System event logs, process revocation signals (SIGKILL) | Instant termination of Wasm execution contexts and session token revocation2. |

### **Engineering Safeguards for OWASP Top 10 LLM Vulnerabilities (2025 Edition)**

The Agent-Governance Backend embeds defensive controls directly into the execution runtime to mitigate generative AI threats defined in the OWASP Top 10 for LLM Applications (2025 Edition)1:

| OWASP Risk ID | Threat Vector Name | Primary Engineering Risk | Platform Security Control Architecture |
| :---- | :---- | :---- | :---- |
| **LLM01** | Prompt Injection | Unauthorized manipulation of model behavior via crafted inputs3. | Dual-Model Isolation Gateway with JSON Intent Vector Parsing3. |
| **LLM02** | Sensitive Information Disclosure | Unintentional exposure of PII, credentials, or proprietary data3. | Dynamic ABAC Response Sanitization and Output Masking2. |
| **LLM03** | Supply Chain Vulnerabilities | Compromised models, fine-tuning datasets, or tool dependencies10. | Cryptographic Signature Verification and Vendor Allowlisting2. |
| **LLM04** | Data and Model Poisoning | Tampering with training data, fine-tuning sets, or RAG vectors. | Ingestion Provenance Hashing and Embedding Anomaly Scans11. |
| **LLM05** | Improper Output Handling | Unsanitized model output executing arbitrary scripts downstream10. | Strict Schema Validation and Render Sanitization Proxies2. |
| **LLM06** | Excessive Agency | Agents executing actions beyond required functional scope8. | Declarative WASI Capability Manifests & OAuth 2.1 Delegation2. |
| **LLM07** | System Prompt Leakage | Unauthorized extraction of proprietary instructions or keys2. | Memory-Partitioned System Prompts & Signature Filtering2. |
| **LLM08** | Vector & Embedding Weaknesses | Cross-tenant memory leaks or poisoned RAG embeddings2. | Tenant-Keyed Vector Partitioning & Distance Thresholding2. |
| **LLM09** | Misinformation | Hallucinated facts presented as authoritative output10. | Mandatory RAG Source Attribution & Grounding Verifiers10. |
| **LLM10** | Unbounded Consumption | Resource exhaustion via runaway loops or token floods2. | Wasm Instruction Fuel Metering & Gateway Token Quotas2. |

### **Dynamic Zero-Trust Authorization Framework (RBAC \+ ABAC)**

The authorization engine combines Role-Based Access Control (RBAC) with Attribute-Based Access Control (ABAC) to evaluate every API call and agent tool invocation dynamically2.  
The authorization decision logic is defined as:  
![][image1]  
Where:

* ![][image2] represents the requesting principal (a human user identity or an agent identity)2.  
* ![][image3] denotes the requested action or tool invocation signature2.  
* ![][image4] identifies the target resource, tool, or data entity3.  
* ![][image5] represents the real-time environmental context vector (incorporating parameters such as current Autonomy Tier, system risk score, network origin, session token state, and token expenditure balances)1.

The policy evaluation executes a two-stage verification sequence. First, ![][image6] checks if the principal's static role possesses baseline authorization for resource ![][image7]. If valid, ![][image8] evaluates real-time environmental context ![][image9] against active policy constraints. Both evaluations must yield a logical TRUE state for the Policy Decision Point to return a PERMIT decision.

| Principal Role | Target Resource (r) | Allowed Actions (a) | Mandatory ABAC Context Conditions (c) | Decision Policy |
| :---- | :---- | :---- | :---- | :---- |
| **Student** | Tutor Agent Instance | InvokePrompt, ReadCourseData | Active enrollment verified; session risk score below threshold; token rate limit remaining. | PERMIT if conditions met; otherwise DENY. |
| **Instructor** | Course Agent Template | UpdatePrompt, AssignTool, DeployAgent | Workspace ownership verified; human-in-the-loop confirmation signed for prompt updates. | PERMIT if conditions met; otherwise DENY. |
| **Agent Runtime** | Local Storage / DB | ReadStorage, WriteScratchpad | Active OAuth delegation token verified; execution sandboxed within WASI capability scope2. | PERMIT if within scope; otherwise DENY. |
| **Master Admin** | Tenant Config / Global Engine | PauseSystem, RevokeContract, UpdatePolicy | Dual-signature administrative authorization; multi-factor authentication active. | PERMIT if dual-signed; otherwise DENY. |

For delegated agent actions, the platform implements OAuth 2.1 with PKCE paired with RFC 8693 Token Exchange2. When an agent acts on behalf of a user, it receives a scoped, short-lived delegation token containing an explicit actor claim (act)2. If the primary user revokes their session, all child delegation tokens linked to that session are invalidated immediately2.

### **Deep System Engineering of the Agent-Governance Backend**

The Agent-Governance Backend processes requests through an integrated execution pipeline:

> 1. **Ingestion & Isolation:** Inbound requests terminate mTLS connections at the API Gateway and pass to the Dual-Model Isolation Engine3. Raw, unvalidated user text is routed exclusively to Model A (Untrusted Parser), a low-privilege parsing model running in a restricted sandbox context3. Model A generates a structured JSON Intent Vector representing requested actions and parameter values without executing code3.  
> 2. **Sanitization & Interception:** The JSON Intent Vector passes through the Guardrail Interceptor, which validates parameter structures against JSON schemas, stripping injected prompt commands or unexpected attributes.  
> 3. **Policy Evaluation:** The sanitized intent vector enters the Zero-Trust Policy Decision Point (PDP), which evaluates user capabilities, signed agent contracts, and contextual attributes2.  
> 4. **Broker Routing:** Authorized intent vectors move to the Model Context Protocol (MCP) Secure Broker, which formats tool calls and dispatches them to Model B (Executor Model) or native execution modules3. Model B operates on structured JSON validated by policy checks rather than raw user text, neutralizing indirect prompt injection vectors3.  
> 5. **Sandboxed Execution:** Dynamic tools and agent execution modules run inside WebAssembly sandboxes managed by Wasmtime, isolated from host resources6.  
> 6. **Kernel Observability:** Throughout execution, eBPF kernel probes capture system call activity, streaming real-time telemetry to security analyzers to enforce policy compliance5.

Agent capabilities are governed by declarative manifest files (contract.json) cryptographically signed using asymmetric ECDSA key pairs during deployment2:

JSON  
{  
  "$schema": "https://ayojit.ai/schemas/agent\_contract\_v1.json",  
  "contract\_id": "cnt\_lab\_evaluator\_9901",  
  "agent\_id": "agt\_grading\_assistant",  
  "autonomy\_tier": "Tier2\_Bounded\_Execution",  
  "signature": "MEQCID3k8...f902a3a==",  
  "execution\_limits": {  
    "max\_memory\_mb": 128,  
    "max\_cpu\_fuel": 10000000,  
    "timeout\_ms": 2500  
  },  
  "capabilities": {  
    "allowed\_mcp\_tools": \[  
      "mcp::python\_evaluator::run\_unit\_tests",  
      "mcp::file\_system::read\_student\_repo"  
    \],  
    "network\_egress": {  
      "enabled": false,  
      "allowed\_domains": \[\]  
    }  
  }  
}

Dynamic tool execution runs inside a Wasmtime WebAssembly runtime configured with WASI Preview 2 resource constraints6:

* **Linear Memory Allocation:** Instance memory is restricted using WASI virtual memory limits (e.g., maximum 128 MB)6. Out-of-bounds memory access attempts raise immediate isolation faults, trapping the instance without compromising host memory6.  
* **Instruction Fuel Metering:** Execution progress is tracked via instruction fuel counters6. Each WebAssembly instruction consumes defined fuel units7. Reaching zero fuel raises a non-catchable interrupt, mitigating infinite loop denial-of-service risks.  
* **Epoch Interruption:** For latency-sensitive paths where fuel accounting overhead (5–15%) is undesirable, the host enables epoch interruption. A background timer thread increments engine epoch ticks, cooperatively interrupting running Wasm modules that exceed their wall-clock execution budget.  
* **Capability Wrappers (WASI Preview 2 Worlds):** System call access is restricted9. Host file system paths and network endpoints are accessible exclusively via explicitly wrapped function handles exposed for tools listed in the contract manifest2.

The MCP Secure Broker wraps stdio and Server-Sent Events (SSE) transports within authorization handlers4. The broker synchronizes with registered MCP servers to discover tool capabilities (tools/list)2. Discovered capabilities are validated against the agent contract manifest, filtering out unlisted tools before platform integration2. When an agent emits a tools/call JSON-RPC message, the PEP interceptor extracts principal context, verifies active ABAC rules, and inspects parameter payloads against defined JSON schemas2. Authorized requests are routed to target MCP servers over isolated communication channels3.  
To fulfill NIST AI 100-1 MEASURE and MANAGE requirements, custom eBPF programs attach directly to Linux kernel tracepoints and probes (kprobes/uprobes)2. Running in kernel space, eBPF telemetry operates independently of user-space processes, providing tamper-resistant audit logs2:

* tracepoint/syscalls/sys\_enter\_execve: Monitors process creation attempts within tool containers, detecting unexpected binary execution2.  
* tracepoint/syscalls/sys\_enter\_connect: Captures socket connection events, validating destination IP addresses against contract network allowlists2.  
* kprobe/sys\_mprotect: Tracks changes to memory page permissions (e.g., transitions to PROT\_EXEC), flagging dynamic code injection attempts2.

Events captured by eBPF maps stream through a kernel ring buffer to the user-space Telemetry Collector. If the threat correlation engine detects a policy breach—such as a Wasm sandbox making an unauthorized outbound socket call—it issues an immediate process termination signal (SIGKILL) and records the violation event in the NIST AI RMF compliance audit store2.

### **Implementation Roadmap and Strategic Directives**

System rollout progresses through four structured phases:

> 1. **Phase 1: Core Engine & Runtime Foundations:** Instantiate the Wasm host environment, compile baseline eBPF tracepoint probes, and construct declarative agent contract verification parsers5.  
> 2. **Phase 2: Security Subsystems & Protocol Integration:** Deploy the Dual-Model Isolation engine, OWASP prompt guardrails, zero-trust PDP authorization engine, and the MCP Secure Broker Proxy2.  
> 3. **Phase 3: Student/Instructor Course Platform:** Expose authenticated platform APIs guarded by the underlying PDP, implementing course management workflows, assignment execution runners, and agent tutoring interfaces1.  
> 4. **Phase 4: Supreme Master Dashboard:** Connect aggregate eBPF event streams to central observability pipelines, surfacing real-time NIST AI 100-1 compliance metrics, prompt drift statistics, and administrative controls1.

Engineering teams must adhere to key operational directives:

* **Enforce Strict Architectural Priority:** Do not construct presentation tiers or user workflows until the Agent-Governance Backend satisfies contract verification, WASI sandboxing, and policy enforcement tests1.  
* **Maintain Cryptographic Contract Integrity:** Treat agent contracts as immutable security artifacts2. Contracts must be cryptographically signed during build pipelines and verified at runtime before execution2.  
* **Maintain Independent Telemetry Pipelines:** eBPF kernel probes must stream data through dedicated kernel memory buffers, ensuring audit logging remains operational even during application-layer security incidents2.  
* **Calibrate Autonomy Tiers Continuously:** Monitor model drift and execution metrics against defined risk parameters1. When error or drift rates exceed configured thresholds, the system must automatically downgrade target agents to lower autonomy tiers (e.g., shifting Tier 2 autonomous agents to Tier 1 human-in-the-loop review) to protect system stability1.

## **Synthesis and Strategic Conclusions**

Building an enterprise-ready Learning Management System integrated with autonomous AI capabilities requires unifying traditional content workflows with runtime security architectures1. While functional user management, multi-tenancy, standards compliance (SCORM, xAPI, cmi5, LTI), and content lifecycle management establish the baseline for administrative operations, introducing agentic AI requires a shift in architectural priorities1.  
The architectural analysis demonstrates that the Agent-Governance Backend must serve as the primary foundational build phase1. Placing policy enforcement, WASI sandboxing, dual-model isolation, and eBPF kernel tracing beneath user-facing platforms and administrative dashboards guarantees that security invariants are enforced at the execution boundary rather than relying on application-level assumptions1.  
By aligning content lifecycle management with deterministic state transitions, establishing zero-trust authorization frameworks (RBAC+ABAC), and operationalizing the NIST AI 100-1 framework alongside OWASP 2025 mitigations, enterprises can deploy resilient, scalable, and secure learning ecosystems that safely harness the capabilities of autonomous AI agents1.

#### **Works cited**

> 1. What are the OWASP Top 10 risks for LLMs? | Trend Micro (US), [https://www.trendmicro.com/en\_us/what-is/ai/owasp-top-10.html](https://www.trendmicro.com/en_us/what-is/ai/owasp-top-10.html)  
> 2. OWASP Top 10 for LLM Applications (2025): A Practical Guide \- Gravitee, [https://www.gravitee.io/blog/owasp-top-10-for-llm-applications-2025-a-practical-guide](https://www.gravitee.io/blog/owasp-top-10-for-llm-applications-2025-a-practical-guide)  
> 3. OWASP Top 10 LLM, Updated 2025: Examples & Mitigation Strategies \- Oligo Security, [https://www.oligo.security/academy/owasp-top-10-llm-updated-2025-examples-and-mitigation-strategies](https://www.oligo.security/academy/owasp-top-10-llm-updated-2025-examples-and-mitigation-strategies)  
> 4. Specification \- What is the Model Context Protocol (MCP)?, [https://modelcontextprotocol.io/specification/2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28)  
> 5. Introduction \- OWASP Top 10:2025, [https://owasp.org/Top10/2025/0x00\_2025-Introduction/](https://owasp.org/Top10/2025/0x00_2025-Introduction/)  
> 6. Wasmtime \- Rust Utilities, [https://rustutils.com/tools/wasmtime/](https://rustutils.com/tools/wasmtime/)  
> 7. WASM Fuel Metering and Execution Budget Enforcement for DoS Prevention, [https://www.systemshardening.com/articles/wasm/wasm-fuel-metering/](https://www.systemshardening.com/articles/wasm/wasm-fuel-metering/)  
> 8. NIST AI 100-1 \- Accorian, [https://www.accorian.com/nist-ai-100-1/](https://www.accorian.com/nist-ai-100-1/)  
> 9. Taming Agentic AI: Applying the NIST AI Risk Management Framework \- Medium, [https://rgutierrez2004.medium.com/taming-agentic-ai-applying-the-nist-ai-risk-management-framework-a7f592e0e97a](https://rgutierrez2004.medium.com/taming-agentic-ai-applying-the-nist-ai-risk-management-framework-a7f592e0e97a)  
> 10. The OWASP Top 10 for LLM Applications (2025): Explained Simply \- Aembit, [https://aembit.io/blog/owasp-top-10-llm-risks-explained/](https://aembit.io/blog/owasp-top-10-llm-risks-explained/)  
> 11. OWASP Top 10 LLM Security Risks (2025) – 5-Minute TLDR | Promptfoo, [https://www.promptfoo.dev/blog/owasp-top-10-llms-tldr/](https://www.promptfoo.dev/blog/owasp-top-10-llms-tldr/)  
> 12. WASI and the WebAssembly Component Model: Current Status | eunomia, [https://eunomia.dev/blog/2025/02/16/wasi-and-the-webassembly-component-model-current-status/](https://eunomia.dev/blog/2025/02/16/wasi-and-the-webassembly-component-model-current-status/)  
> 13. Using WebAssembly from .NET with Wasmtime \- Bytecode Alliance, [https://bytecodealliance.org/articles/using-webassembly-from-dot-net-with-wasmtime](https://bytecodealliance.org/articles/using-webassembly-from-dot-net-with-wasmtime)

[image1]: <data:image/png;base64,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T68Pik0W4TQhYCBm/ymK00fUtKI6RUq7HbGX68ey1MGZa98cpa2YcntalIXqT4nd8whABEV+8vnxsQniZAkQavXxddaFeuQ6JAoB+49j9/9WYlMIOu79/CiCgJ8EywdWxyVkQbhvTQpDgjeDjNum8ndRvq1XCwFE6H9FCVK9aR7skWCJwFhizk54fxAHdbavhUD7zOgLlYS24n1pM109uF7d/vQzdp7v2sOqfSPbIQNHP2WfYXvZX2Sm8AN1f98ZRWyTbaZP8lz6HbvB7vhMlgwby2w6PPVgXxb6O7Nf3JMMWr0fG8SmahD1CCvu9+tR+o1B4X7s9j0i5m2x+43P7EfqS1thO2+K4hPrbFzto9rBDNDez43iY7gGGUqyalz3t2NTlyU/RT/SXtc022s4j2tynWc0+4B7IfSxZery0ijf1L+xPijm7TTbBTErIhcYRkejEWUNo0qcYw0vKdk5nBvOYZR6B67/guhPNQCOjOxKii2uw/V64uv6dsMB1KF3fMtSXfLeBOvR9a6K/r8cOk1G0xt7sT4bVEM7nIvyxzSvjd3s1sWG+nxClEBIne4X/ewO0D9vbbYh4hALiFL6lYA/Op/92Eib8QPqwTTR6NyaOTvZi3EWL0EALL2b8IAY23MNdW7f0bl3bS+OZjuXIviHa6IsPXhE9J8X0YuYZ0BQk7MJCDTaENvpnZ/goxgMj2DKtPaXXIvPNXN+ijpgg21f9sDeb2g3VnBvfN3If+/F2E7TvnsZPBE5AcgQkEFipIkz7k1btPAyMypMcmS1H/0RYAsvNKPa48J9GaEeh5Ooy9dFyeidFkwx7kX5i+9AuxBoelmW+0fJfD643XEFgz0/5+BnwvTR+ehnCloIRNhZL0gdhpGd8D69NsoSgkuZs2g79BmZqXqAkrMJ9fq1EemjsKHjcBJ+CrjGUQXVkp2mfTPgFpELAClvpg8IYKT1c7H1EjgrnBgvJ5kcpjKY/pjLVACC7mVR/m7YcWE6h2mTo3ISdcGJ4dAZpZ8GjLiZKnlXlDUziJJvjN11aDU3RZmWWhLmVxJkp+hnbJNsHFOhrz/4fS7AcDwBl6zicZizEwIdf0Ntrh6XCmfNdvARvxWb/icb9uNRvhjwxQf750gfdZz2Ogk/BXy5genyo2bH5+x0zr5F5IQgkLFIlPUKrEdZCw6ItRAIPNa9ZPmBmHdiTJle3W48AoxcHx/9LNJajlsX2mAvthepnwb0G2u99qNkQG7Z2rsLDpfplevaHVc4rF1i7RTr3dJeWdDdW5uWsO/L43j9O2cnZK1Yi0Wm+3LgLNoOffPqKOsj8Xm1v3t0dVzLSfgoOK6fSlg+gL8/CnN2OmffInKJ8PTY/Z+aZwmE0pPi8nRSZOaYJpz7Fu2VxhdG+RLLxWZkJ3zDlMz2UYPoaXEWbQfR9IOx++d8zgJLdjqybxERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERGRy43/B4BbC8bmQpOuAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAaCAYAAAD43n+tAAACLklEQVR4Xu2WTUhUURiG3yihP0QoLKmI2gmBC6mVq4hASBdFIQoRCLkLCkKojRBBuBJJhGiRi2iRS91oi3FnELSxZSASuZJAXBlZ79t3z8y5Z+bO3MvVaOQ+8DDcc+7P+fm+7wxQUFCw3zhK39Jt+jvyF/3mtX2mV+mB6JmmoItu0ll6yGs/Qidgk+z32veMg7SddnjqWu1ZuAnbjUdhB+mD9c3Tw0HfrqGVe0y/0Bn6io7TAdob9Wdhkv6kPWEHGYJNKNy9Mq2wj56Lro/R67Qb6Vb2NJ2jg0h3fyOO0xL9Sk/Fu/5O4B1sQlqsKrRyU/QJ/U5fwGauVdCvVrqlfHc1+oCevxV25KCTbqD2Dug72rlpJIzrGn2KykteoxIel+mP6J4kLsEmFH44D0p27cAn2II6S7Bdu4M6kXCPXoG9RJXDH7ziV6tRKzEdStAHiBeB0BPIVmKVPzv0NnK85zldpWe8thHYSqniJKEJLSC+kqEK4zb3QANc/ujcORvvSo+KwAfEY1a/ulYYKhyT0I4+DBtz4EI/V0m+SNfpqNd2AbZKSr56+aEzRlVHv7uBO3/8sWTGJeFYdK04fUZX6PmorR6qPCom2uk86LsvYflTrxA1RPmjarZM39MlWLjpfEmDBnKDfoStsPIgCwqtN3QL8f9vGsfJym3pcEmomFW5ViXJOiCHDuhhWD6ueS7C3vtPqJU/Tc192BbfRfrS+l/jnxc1/xsVFBQUNC1/AL69bRI9LupcAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAaCAYAAAAaAmTUAAACGklEQVR4Xu2WO0hcQRSGjxhFSUARUSQxQRTx1VkJsTOBFApKukSxE8TGQPBVigQUBSU2IRJCCkGS0kIU3C4pE0gRBAtFtBIrG0X0/5md3bOz9+7d1TWwMB98eHfO3MeZOedeRTwej0MdnIaVbqDQKIKz8Ag+cWIFRyc8j8vj/8YjMSWh5dhtKYff4CG8hM9Tw/dDG9yFO/BT3FH4GraqebkyABfgJLyGvanhYIrF3PQlfOjEMsF6HoYbkv96roE/YD2cEJPMm5QZATTDX/ADHIIxeAzfqTlhsIZ5wwo3kAfew7fxY+4Ik2FSoTyDe3BKzCoTZs8T++ykEDh/Hna5gTzQLqZXbL/ZZOYSMxwewM9iXnkNapw7cirRtc4brcIWSW96bZk9IUtK4EfYrcbY+HwBfFVjKfBh+dDfxSRG+Je/YxL9FmKcvfJFkk0f5Ct7Qpa8gFdidsJ1U0IWx27diBqrhftwRY2FwYtyZx67gTvA3luHTc44d/hAMiyyTUavnN1OvhLZC+MqFgQXQi/GXWGJB13PJsOF5oKn0SGmzGyjc1X4nbBf2hnYE4+FwXNYalHzouDLhAv5Gz51YoT3+SkmISaWBi8wBv/ANbgN++FfuAUXxTRjFFViSoMl1yjmm5ULbPQzSfbFiZiPsGUJXqg4j/m8pWpOAtYgP1D2IZhAtfqdDVwY7uYy/Cfm3w/roJrn8Xg8Hk/BcQPZW2KK4JTRWwAAAABJRU5ErkJggg==>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAaCAYAAAAaAmTUAAACBklEQVR4Xu2WyytFURSHl1CURx4lYSATpAxkoBgoisIAMymliCEhmVwDEzNK8igjKfEfKEopQwOPiQEppaQUAxK/393nuNu+5577Hqj91de9d69z7jlr773WOSIWi+W/0w4f4bfmE/yAX/AcDsBM94T/wDb8hK3aGBMYE5XULMzQYmkhD5Ybciwe8uEpvIVlRoz/dxchljLq4TE8gpuOk3AQ1mnHxQKPf4YHMMuINcN3eAlLjViQAtgNq5zf/OwRNQvR4FKPwH1Y+TeUMH2iamXcDICAqNi0MR6EW2ADLsIHuArX4Ry8gtWhQz1pgoew0AwkAe/BrJdsOCpqxWac32F0iZqBRvgKd2CRqO3CE/22CFdlGbaYgSTg5J6I6l5nzvdrUavBSS5xD/RiQlQi/RKaDd4ktxkT9esYvPAarJXwotfNcU+IAa964T3Mi+pinc6YL1zaiEUVASbDWuFqukXvJesxVtx6mTLGuZ3fRLVsX9xWuCv+K2HCGefKVJiBJPCqFzIkKsklYzwMd2m9ukc0eE4i53nh93xhkkyGjckXvV7ihV2MW63DDCRAA3yR8OcLv/MaejILEuGaAXghUTqFD8VwT9SWq5H435vaRD3Vzfcx1o8L38fYAJjUMNyCuVr8F+79eF85TFhrLNIVeAPvNXnxVMCt1yuqo3kmYrFYLBZLuvgBXANno3VS4pMAAAAASUVORK5CYII=>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAaCAYAAAD1wA/qAAACH0lEQVR4Xu2WO0hcQRSGj0TBGElQQQ0q2aiFxtJKQRGxMIUgaGETsqRR7LRSCSFNEAQLCxFC8JEm+K4kIIKLggq2FiGpEkKsbCSkUFD/37l3dxzvkxthwfvBB5eZ2b07Z845syIxMfeSQtgGe2E9fGCNP4KV1nNW8wLuw79wEQ7Dz3ATNsCvsCO9OgvJg2/hGRyBD29OSws8hb/ljk+EqfDUkGNB4CZm4DnsMeZs8uGGJZ//O0yFbbgFP1oOSia3gzAAL+EozDHmdBbgmDnoRBnsgq2iouQFX5iESxLtqGvhH/gDVhlzJp/Epz7K4Qpch33wnajieqIvMmiEq+K9JgjvRZ3GB2PcCb7LNcDP4JGolOAiLj6AJ+KeGjyNCdhkToSENZSCF+ITaT9yRR0XO8FzbewN7Bb3fOUPmIZ1crvAdf2Kkmt+wmNYbcyFghFn5JlW3EBQuBHWxpxkCtzJl/YHXLA3QvnsBRtCszlow8JmfvLSCQMjzROpMCdCUgQPxX8jJXAWlpoTNowYN8INmRRI5m+BE/2WUZkUVSOd5oQF05uBdrtfrmG7Y9tLGuPtcE1UJNxgU2B6RSpSUc3mO9wR1T11eLuzgw6Je72m4amw2JdF5XUKjsPH2ho3iuEXUWlWI94n6EUC7sF/cB6+hlNwV1RQfTdhw7bLy5A5GPbH8CW8U/jib/CX5ittnR/8noSobkmjBCYmJiYmJiYwV3LsVg/JFaxLAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,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>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAaCAYAAACO5M0mAAAAlElEQVR4XmNgGAXUBHxA7AnEslA+iPYBYkm4CiDgAeKZQNwIxE+AeBIQTwficiC+BsSKMIUeQJwOxPpA/AmI5wOxIBDvAeK3QKwJU5gJVRQExL+B2AaIGRkgVoMMAbFRAMjKq0Asgi6BDHiB+DAQL2XAYgIyALkD5B6QW/ECZPfhBQ1AfBGIhdHEMQAHAyQ8RwGNAQDoLhQQwKpatAAAAABJRU5ErkJggg==>

[image8]: <data:image/png;base64,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>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAaCAYAAABl03YlAAAAo0lEQVR4XmNgGAXkAnEg9gViOyBmRZNjkADiNUC8HogjgLgOiHcBMT9MgTwQXwHiWQwQ3SCJE0D8Fog1QQpYgHgOED8BYkWIHrBYEhAHADEjSACkEqQDZBVIEisAOfI/EBehSyADTwaIIpBidMAFxMwghiwQ3wbiBGRZIHAC4nVALAwTAJkGcvhqBogPDwBxOxDzwRTAAMjroIAUY4BaMQpIAwAvUBUS5DgSfQAAAABJRU5ErkJggg==>