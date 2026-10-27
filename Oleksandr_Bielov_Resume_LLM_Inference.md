# OLEKSANDR BIELOV
**Senior Backend Engineer | Real-Time Platforms & LLM Systems · ex-Microsoft** | Helsinki, Finland · Open to on-site, hybrid and remote (EU)
obielovswe@gmail.com | [linkedin.com/in/oleksandr-bielov-07743b79](https://linkedin.com/in/oleksandr-bielov-07743b79) | [github.com/aleksandrbelov](https://github.com/aleksandrbelov)
---
## SUMMARY
Senior backend engineer with 13+ years in backend and distributed systems. Five years at Microsoft on the Teams real-time media platform — call recording, transcription and captioning — a platform that grew from ~300K to 10M+ recordings per month, running on tens of thousands of cores per release across commercial and government (sovereign) clouds. Owned services end to end: design, migration to Kubernetes, staged rollouts of a stateful service with long-lived sessions, production on-call. Since 2025, building production LLM systems: a provider-agnostic model-call layer with token-budget throttling and backoff, hybrid retrieval and LLM re-ranking. Primary stack C#/.NET and Java/Spring; Python for recent LLM work.
---
## SKILLS
**Languages & Frameworks:** C# (.NET Core / .NET Framework), Java (Spring Framework), Python (FastAPI, asyncio), SQL
**Platform & Infrastructure:** Kubernetes, Docker, Azure, Azure DevOps (YAML CI/CD), ring-based progressive delivery, staged traffic cutover
**Data & Messaging:** PostgreSQL, Kafka, Kafka Streams, Redis, Cassandra, MySQL / MariaDB, Supabase
**Retrieval & LLM Systems:** OpenAI API and OpenAI-compatible endpoints, provider-agnostic model layer, tokens-per-minute throttling, RAG, hybrid dense + BM25 retrieval, LLM re-ranking, Pinecone
**Testing & Quality:** E2E and synthetic monitoring against production, integration, unit (MSTest, xUnit, pytest)
**Compliance & Sovereign Cloud:** GDPR, EU Data Boundary, US Government Cloud (GCC / GCC High / DoD), data residency
---
## EXPERIENCE
### **Microsoft — Software Engineer**
Jun 2020 – Jul 2025
*Teams Call Recording, Transcription & Captioning — ~300K → 10M+ recordings per month, deployed on tens of thousands of cores per release across commercial and US government clouds (GCC, GCC High, DoD)*
**Tech Stack:** C#, .NET Core / .NET Framework, Kubernetes, Docker, Redis, Azure, Azure DevOps (YAML CI/CD)
* **Service Ownership:** Owned services in the recording and transcription pipeline from design to production on-call against a 99.9% availability SLA, across environments where compliance restricts telemetry and direct access to production.
* **Transcription Architecture:** Drove a multi-phase initiative to modernise the transcription architecture, splitting recognition from session management and delivering spoken-language features.
* **Safe Rollouts of a Stateful Service:** Ran rollouts of a real-time service with long-lived sessions: each deployment unit was drained of live recording sessions before deploying, then traffic was cut back over in steps (1% → 5% → 25% → 50% → 100%), with inner-ring rollouts gated automatically on availability, reliability and exception-count signals.
* **Accelerated release velocity and reduced risk:** Led the move from a manual multi-step release process to one-click automated deployments. This accelerated releases into the inner rings from monthly to weekly.
* **Synthetic Monitoring & Release Gating:** Built a suite that exercises the live service with real meeting recordings and transcriptions every 15 minutes. This continuous production validation blocked broken builds and eliminated manual testing.
* **Kubernetes Migration:** Migrated the stateful recording service off classic Azure infrastructure onto Microsoft's internal Kubernetes platform across four environments. Carried the cutover into government clouds without service interruption.
* **Cross-Boundary Troubleshooting:** Root-caused distributed failures, including resolving hours-long recording export hangs caused by a partner service misreporting unrecoverable errors as retryable.
**Key Achievement:** The release automation and production validation work established the foundational infrastructure still used by the entire Teams recording team and drove my promotion.
---
### **OpsLab — AI Developer Consultant**
Jul 2025 – Present · London, UK (Remote)
*Two client projects: Slack-native investor-startup matching, and a candidate search system (MatchCV)*
**Tech Stack:** Python, FastAPI, asyncio, httpx, OpenAI API, Pinecone, Supabase, Slack Bolt, Docker, Heroku
* Designed a provider-agnostic service layer for model calls: per-family request construction behind one interface, client-side throttling against a tokens-per-minute budget, batched concurrency and exponential backoff on rate limits. Swapping providers, including self-hosted OpenAI-compatible endpoints, is a config change.
* Built two retrieval systems end to end and ran them in production — ingestion, sentence-boundary chunking, indexing, query serving and deployment as containers, driven from CLI and Slack entry points.
* Implemented hybrid retrieval — dense embeddings and BM25 sparse vectors in a single query with weighted scoring — plus a second-stage re-ranking pass that falls back to vector scores when the re-ranker fails or returns invalid output.
* Built the Slack service on a fully async Python stack (asyncio, httpx, Slack Bolt) so concurrent interactions never block Slack acknowledgements; repeat queries are served from a result cache in Supabase.
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
