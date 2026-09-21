# OLEKSANDR BIELOV
**Senior Software Engineer** | Helsinki, Finland · Open to on-site, hybrid and remote (EU)
📧 obielovswe@gmail.com | 💼 [LinkedIn](https://linkedin.com/in/oleksandr-bielov-07743b79) | 🐙 [GitHub](https://github.com/aleksandrbelov)
---
## SUMMARY
Senior software engineer with 13+ years in backend and distributed systems. Five years at Microsoft on the Teams real-time media platform — call recording, transcription and captioning — running on tens of thousands of cores per release across commercial and government (sovereign) clouds. Owned services end to end: design, platform migration, production on-call. Shipped production LLM systems: candidate-search and investor-startup matching systems. Primary stack C#/.NET and Java/Spring; Python for recent retrieval and LLM work.
---
## SKILLS
**Languages & Frameworks:** C# (.NET Core / .NET Framework), Java (Spring Framework), Python (FastAPI), SQL
**Platform & Infrastructure:** Kubernetes, Docker, Azure, Azure DevOps, CI/CD
**Data & Messaging:** PostgreSQL, Kafka, Cassandra, Redis, MySQL / MariaDB, Supabase
**Retrieval & LLM Systems:** RAG, hybrid dense + BM25 retrieval, LLM re-ranking, OpenAI API, Pinecone
---
## EXPERIENCE
### **Microsoft — Software Engineer II**
Jun 2020 – Jul 2025
*Teams Call Recording, Transcription & Captioning — deployed on tens of thousands of cores per release across commercial and US government clouds (GCC, GCC High, DoD)*

* **Transcription Architecture & Service Ownership:** Drove a multi-phase initiative to modernise the transcription architecture, delivering spoken-language features. Owned services from design to production on-call in highly restricted compliance environments.
* **Automated CI/CD & Release Velocity:** Led the move from a manual multi-step release process to one-click automated deployments gated by health checks. This accelerated release cadence from monthly to weekly and established the foundation still used by the team.
* **Synthetic Monitoring & Release Gating:** Built a suite that exercises the live service with real meeting recordings and transcriptions. This continuous production validation blocked broken builds and eliminated manual testing; together with the release automation, it drove my 2023 promotion.
* **Kubernetes Migration:** Migrated the stateful recording service off classic Azure infrastructure onto Microsoft's internal Kubernetes platform across four environments, carrying the cutover into government clouds without service interruption.
* **Cross-Boundary Troubleshooting:** Root-caused distributed failures, including resolving hours-long recording export hangs caused by a partner service misreporting unrecoverable errors as retryable.
---
### **Independent Contractor — Backend & AI Engineer**
Jul 2025 – Present
*Two client projects: Slack-native people search, and a candidate search system (MatchCV)*
* Built two retrieval systems end to end and ran them in production — ingestion, sentence-boundary chunking, indexing, query serving and deployment as containers, driven from CLI and Slack entry points.
* Designed a provider-agnostic service layer for model calls: per-family request construction behind a single interface, client-side throttling against a tokens-per-minute budget, batched concurrency and exponential backoff on rate limits. Swapping providers, including self-hosted OpenAI-compatible endpoints, is a config change.
* Implemented hybrid retrieval — dense embeddings and BM25 sparse vectors in a single query with weighted scoring — plus a second-stage re-ranking pass that falls back to vector scores when the re-ranker fails or returns invalid output.
---
### **Nuvo Group Ltd. — Senior Software Engineer**
May 2018 – Dec 2019
*Wearable sensor platform for pregnancy monitoring*
* Built the internal messaging library that replaced direct HTTP calls between microservices with Kafka request-response, removing point-to-point coupling; adopted by services across the platform.
* Built parts of the telemetry pipeline handling continuous sensor streams from the wearable device: MQTT ingestion → Kafka Streams → Cassandra → processing service.
---
### **EPAM Systems — Software Engineer**
Oct 2015 – Feb 2018
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
