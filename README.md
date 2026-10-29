# OLEKSANDR BIELOV
**Senior Software Engineer | Backend & AI Systems · ex-Microsoft** | Helsinki, Finland · Open to on-site, hybrid, and remote (EU)
📧 obielovswe@gmail.com | 💼 [LinkedIn](https://linkedin.com/in/oleksandr-bielov-07743b79) | 🐙 [GitHub](https://github.com/aleksandrbelov)
---
## SUMMARY
Senior software engineer with 13+ years in backend and distributed systems. Spent five years at Microsoft building and running a real-time media platform — Teams meeting recording and transcription — that grew from ~300K to 10M+ recordings per month, on tens of thousands of cores across commercial and government clouds. Owned services end to end: design, Kubernetes migration, release automation and production on-call.
Now shipping production LLM systems: semantic search with hybrid retrieval and LLM re-ranking. Core stack: C#/.NET, Java/Spring, Python/FastAPI, Kafka, Kubernetes, Azure.
---
## SKILLS
**Languages & Frameworks:** C# (.NET Core/Framework), Java (Spring Boot, Kafka Streams), Python, FastAPI, Slack Bolt, SQL  
**AI/ML Ecosystem:** OpenAI API, Pinecone, RAG pipeline design, Hybrid vector search (dense + sparse/BM25), Multi-query retrieval, LLM reranking, Reasoning model integration, Async AI orchestration  
**Cloud & DevOps:** Azure, Kubernetes, Docker, Heroku, Azure DevOps, CI/CD automation  
**Data & Messaging:** Kafka, Redis, PostgreSQL, Cassandra, Supabase, MariaDB & MySQL  
**Testing & Quality:** E2E and synthetic monitoring, integration, unit (MSTest, xUnit, pytest)  
**Compliance & Sovereign Cloud:** GDPR, EU Data Boundary, US Government Cloud (GCC / GCC High / DoD), data residency
---
## EXPERIENCE
### **OpsLab — AI Developer Consultant**
Jul 2025 – Present · London, UK (Remote)
*MatchCV — AI-Powered Candidate Search System*
**Tech Stack:** Python, FastAPI, OpenAI API, Pinecone, ClickUp API, Docker, Heroku
* **Turned raw CVs into a searchable talent database** — batch ingestion pipeline that pulls ClickUp tasks with attachments, extracts text from PDF/DOCX, parses it into structured fields with an LLM and indexes it; run on demand via CLI or a one-shot container.
* **Made search understand recruiter intent** — an LLM expands each query into three semantic variants and extracts hard filters like experience range; results are deduplicated by best score, with automatic retry without filters when the LLM's constraints return nothing.
* **Built hybrid retrieval in Pinecone** — dense embeddings and BM25 sparse vectors in a single query, combined through weighted dot-product scoring; dense catches paraphrasing, BM25 catches exact tokens like framework names and certifications.
* **Ensured top candidate visibility via re-ranking** — added an LLM acting as a second-stage judge to score candidates against the original request, catching strong conceptual matches that basic similarity search would bury; falls back to vector scores if the reranker fails or returns invalid JSON.
---
*AI-Powered Professional Matchmaking Platform*
**Tech Stack:** Python, OpenAI API, Pinecone, Slack Bolt, Supabase, Docker, Heroku
* **Slack-native semantic search over a professional network** — users describe the connection they need in plain language; a reasoning model rewrites the request into a retrieval-optimised query, normalising non-English input to English before embedding. Each profile is indexed as one vector, with server-side metadata filters.
* **On-demand LinkedIn enrichment from Slack** — an LLM distils contacts' recent posts and profile text into a matching-oriented summary, fanned out to Supabase, the CRM and the vector index; a freshness window skips recently-enriched contacts to cut redundant API spend.
📄 [Full technical detail → AI_ML_PROJECTS.md](AI_ML_PROJECTS.md)
---
### **Microsoft — Software Engineer**
Jun 2020 – Jul 2025
*Teams Call Recording, Transcription & Captioning — ~300K → 10M+ recordings per month, deployed on tens of thousands of cores per release across commercial and US government clouds (GCC, GCC High, DoD)*
**Tech Stack:** C#, .NET, Redis, Docker, Kubernetes, Azure (Front Door, Managed Identities), Azure DevOps (YAML, Enterprise CI/CD), Kusto, FFmpeg.
* **Service ownership** — owned services in the recording and transcription pipeline from design to production on-call against a 99.9% availability SLA, across environments where compliance restricts telemetry and direct access to production.
* **Kubernetes migration** — led the stateful recording service's move off classic Azure onto Microsoft's internal Kubernetes platform during the RDFE shutdown: end to end in the first production ring (capacity, pod identity, deployment templates, pipelines), then the GCC High and DoD cutovers, without service interruption.
* **Release automation** — core contributor to the infra team's multi-quarter initiative that moved releases from monthly to weekly; merged the commercial, GCC, GCC High and DoD builds into one YAML pipeline and built an automated health check that flags availability, reliability and exception regressions after each deployment.
* **Synthetic monitoring and release gating** — owned the end-to-end suite that runs real meetings through the live services and checks output video and transcripts against reference snapshots; it gated early deployment rings, blocking broken builds before wider rollout and eliminating manual regression testing.
* **Cross-boundary troubleshooting** — root-caused hours-long recording export hangs (a partner media service misreporting fatal errors as retryable) and a roster-update queue fault that blocked call handover in large meetings and could drop parts of recordings.
* **Resilience and security** — after an Azure Front Door outage, added failover with priority routing and fallback endpoints; replaced pipeline personal access tokens with managed identities and upgraded FFmpeg to 7.1 to close known CVEs.
* **Transcription architecture** — drove a multi-phase modernisation separating speech-recognition multiplexing from session lifecycle, which simplified retry logic, and shipped additional spoken languages for Teams transcription.
**Key Achievement:** The YAML pipeline migration and production validation suite became the foundation of the recording team's deployment automation, still in use today.
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
* Rebuilt a warehouse and retail service for Canadian Tire, migrating it from a legacy IBM platform to Java/Spring
* Coordinated a cross-functional squad (developers, BA, QA) through the full delivery cycle
* Delivered backend services and supporting front-end work for enterprise clients
---
### **LLC "Astelit" (lifecell) — Junior Software Engineer**
Sep 2013 – Oct 2015
* Customised Oracle Maximo applications (Java, JSP, PL/SQL), supported production systems, and provided application monitoring and user support.
---
## EDUCATION
**Bachelor's Degree in Computer Science**  
*Applied Mathematics / Applied Cryptography*  
National Technical University of Ukraine "Kyiv Polytechnic Institute"
---
