# OLEKSANDR BIELOV
**Senior Software Engineer | Backend & Distributed Systems** | Helsinki, Finland · Open to on-site, hybrid and remote (EU)
📧 obielovswe@gmail.com | 💼 [LinkedIn](https://linkedin.com/in/oleksandr-bielov-07743b79) | 🐙 [GitHub](https://github.com/aleksandrbelov)
---
## SUMMARY
Senior software engineer with 13+ years in backend and distributed systems. Five years at Microsoft on the Teams real-time media platform — call recording, transcription and captioning — a platform that grew from ~300K to 10M+ recordings per month, running on tens of thousands of cores per release across commercial and government (sovereign) clouds. Owned services end to end: design, platform migration, production on-call. Led the extraction of a captions service from a monolith and migrated its infrastructure, saving ~$1.8M a year in compute. Shipped two production LLM retrieval systems: investor-startup matching and candidate search (MatchCV). Primary stack C#/.NET and Java/Spring; Python for recent retrieval and LLM work.
---
## SKILLS
**Languages & Frameworks:** C# (.NET Core / .NET Framework, Polly), Java (Spring Framework), Python (FastAPI), SQL
**Platform & Infrastructure:** Kubernetes (AKS), Docker, Azure (ARM, Azure Front Door), Azure DevOps, CI/CD
**Observability:** Kusto (KQL), Aria, Geneva Metrics, anomaly detection, dashboards and monitors
**Data & Messaging:** PostgreSQL, Kafka, Cassandra, Redis, Azure Service Bus, MySQL / MariaDB, Supabase
**Retrieval & LLM Systems:** RAG, hybrid dense + BM25 retrieval, LLM re-ranking, OpenAI API, Pinecone
**Testing & Quality:** E2E and synthetic monitoring, integration, unit (MSTest, xUnit, NSubstitute, Shouldly, pytest)
**Compliance & Sovereign Cloud:** GDPR, EU Data Boundary, US Government Cloud (GCC / GCC High / DoD), data residency and tagging
---
## EXPERIENCE
### **Microsoft — Software Engineer**
Jun 2020 – Jul 2025
*Teams Call Recording, Transcription & Captioning*
**Tech Stack:** C#, .NET Core / .NET Framework, Polly, Kubernetes, Docker, Redis, Service Bus, Azure, Azure DevOps (YAML CI/CD), Kusto, Geneva, Substrate
* **Service Ownership Through 30x Growth:** Owned Teams recording and transcription services from design to 24/7 on-call against a 99.9% availability target while volume grew from ~300K to 10M+ recordings/month. Shipped same-day hotfixes for government-cloud outages; wrote runbooks and postmortems and onboarded engineers into the infra team.
* **$1.8M/Year Captions Service Migration:** Led the extraction of the human-curated captions service (CART) from a monolith into a standalone microservice with its own CI/CD, testing and scaling, and migrated its infrastructure before a hard year-end deadline, saving ~$1.8M a year in compute. Wrote the migration guide 3 other teams adopted; shipped CART to GA for commercial and government customers.
* **Weekly Releases, One Click:** Cut the release cycle for the first deployment rings from monthly to weekly. Built one-click deployment with traffic switching and rollback, gated by an automated health check on availability, reliability and exception count; consolidated four per-cloud build pipelines into one.
* **Zero-Downtime Kubernetes Migration:** Moved the stateful recording service onto Microsoft's internal Kubernetes platform across four environments, including GCC High and DoD, with no service interruption.
* **Cross-Service Root-Causing:** Traced multi-hour recording export hangs to a partner service reporting unrecoverable errors as retryable, so exports kept retrying instead of failing fast.
* **Async Recording Observability:** Built the end-to-end telemetry for moving recording from real-time to asynchronous processing: dashboards and monitors for assembly, delivery, capacity, error rates and reliability that served as the go/no-go signal for production readiness and each rollout expansion. Integrated a new internal media storage API replacing legacy blob storage (auth upgrades, retry policies, event buffering, multi-region data residency).
* **Data Residency for 170K+ Customers:** Delivered in-region data residency for Recorder, Transcription and Live Captions in 5 countries (Norway, Germany, Switzerland, Singapore, Brazil). For EU Data Boundary compliance, moved telemetry and logging event pipelines to dedicated clusters and fixed cross-region data flows. Sovereign clouds: GCC, GCC High, DoD, Gallatin, AG.
* **Government-Cloud Test Automation:** Built synthetic E2E monitoring that runs real meetings through production every 15 minutes and blocks broken builds; added 100+ automated E2E tests for government clouds that previously had zero coverage, eliminating manual release testing.
* **Transcription Architecture:** Led spoken-language support for transcription and captions, and designed the separation of session management from the transcription processor, improving maintainability and testability.
---
### **OpsLab — AI Developer Consultant**
Jul 2025 – Present · London, UK (Remote)
*Two client projects: Slack-native investor-startup matching, and candidate search over 1,000 CVs (MatchCV)*
**Tech Stack:** Python, FastAPI, OpenAI API, Pinecone, Supabase, Slack Bolt, Docker, Heroku
* Built two retrieval systems end to end and ran them in production — ingestion, sentence-boundary chunking, indexing, query serving and deployment as containers, driven from CLI and Slack entry points.
* Designed a provider-agnostic service layer for model calls: per-family request construction behind a single interface, client-side throttling against a tokens-per-minute budget, batched concurrency and exponential backoff on rate limits. Swapping providers, including self-hosted OpenAI-compatible endpoints, is a config change.
* Implemented hybrid retrieval — dense embeddings and BM25 sparse vectors in a single query with weighted scoring — plus a second-stage re-ranking pass that falls back to vector scores when the re-ranker fails or returns invalid output.
---
### **Nuvo Group Ltd. — Senior Software Engineer**
May 2018 – Dec 2019
*Wearable sensor platform for pregnancy monitoring*
**Tech Stack:** Java 8, Spring Boot, Kafka, Kafka Streams, MQTT, Cassandra, Docker, AWS
* Built the internal messaging library that replaced direct HTTP calls between microservices with Kafka request-response, removing point-to-point coupling; adopted by services across the platform.
* Built parts of the telemetry pipeline handling continuous sensor streams from the wearable device: MQTT ingestion → Kafka Streams → Cassandra → processing service.
---
### **EPAM Systems — Software Engineer**
Oct 2015 – Feb 2018
**Tech Stack:** Java 8, Spring (MVC, Data, Security), Hibernate, MariaDB, Gradle, Tomcat
* Rebuilt a warehouse and retail service for Canadian Tire, migrating it from a legacy IBM platform to Java/Spring.
* Coordinated a cross-functional squad of developers, BA and QA through the full delivery cycle.
* Delivered backend services and supporting front-end work for enterprise clients.
---
### **LLC "Astelit" (lifecell) — Junior Software Engineer**
Sep 2013 – Oct 2015
* Customised Oracle Maximo applications (Java, JSP, PL/SQL), supported production systems and provided application monitoring and user support.
---
## EDUCATION
**Bachelor's Degree in Computer Science**
*Applied Mathematics / Applied Cryptography*
National Technical University of Ukraine "Kyiv Polytechnic Institute"
---
