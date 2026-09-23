# OLEKSANDR BIELOV
**Senior Software Engineer | Backend & AI Systems · ex-Microsoft** | Helsinki, Finland · Open to on-site, hybrid, and remote (EU)
📧 obielovswe@gmail.com | 💼 [LinkedIn](https://linkedin.com/in/oleksandr-bielov-07743b79) | 🐙 [GitHub](https://github.com/aleksandrbelov)
---
## SUMMARY
Senior software engineer with 13+ years in backend and distributed systems. Spent five years at Microsoft building and running a real-time media platform — Teams meeting recording and transcription — that grew from ~300K to 10M+ recordings per month, on tens of thousands of cores across commercial and government clouds. Owned services end to end: design, platform migration, production on-call.
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
*AI-Powered Professional Matchmaking Platform*
**Tech Stack:** Python, OpenAI API, Pinecone, Slack Bolt, Supabase, Docker, Heroku
* **Slack-native semantic search over a professional network** — users describe the connection they need in plain language; a reasoning model rewrites the request into a retrieval-optimised query, normalising non-English input to English before embedding. Profiles are chunked at sentence boundaries with per-chunk vectors and server-side metadata filters.
* **Model-agnostic LLM service layer** — adapts request construction per model family (developer role, `max_completion_tokens`, no temperature for reasoning models), making the model swappable through config, including self-hosted OpenAI-compatible endpoints. Client-side throttling against a tokens-per-minute budget, batched concurrent summarisation, exponential backoff on rate limits.
* **On-demand LinkedIn enrichment from Slack** — an LLM distils contacts' recent posts and profile text into a matching-oriented summary, fanned out to Supabase, the CRM and the vector index; a freshness window skips recently-enriched contacts to cut redundant API spend.
---
*MatchCV — AI-Powered Candidate Search System*
**Tech Stack:** Python, FastAPI, OpenAI API, Pinecone, ClickUp API, Docker, Heroku
* **Turned raw CVs into a searchable talent database** — batch ingestion pipeline that pulls ClickUp tasks with attachments, extracts text from PDF/DOCX, parses it into structured fields with an LLM and indexes it; run on demand via CLI or a one-shot container.
* **Made search understand recruiter intent** — an LLM expands each query into three semantic variants and extracts hard filters like experience range; results are deduplicated by best score, with automatic retry without filters when the LLM's constraints return nothing.
* **Built hybrid retrieval in Pinecone** — dense embeddings and BM25 sparse vectors in a single query, combined through weighted dot-product scoring; dense catches paraphrasing, BM25 catches exact tokens like framework names and certifications.
* **Ensured top candidate visibility via re-ranking** — added an LLM acting as a second-stage judge to score candidates against the original request, catching strong conceptual matches that basic similarity search would bury; falls back to vector scores if the reranker fails or returns invalid JSON.

📄 [Full technical detail → AI_ML_PROJECTS.md](AI_ML_PROJECTS.md)
---
### **Microsoft — Software Engineer**
Jun 2020 – Jul 2025
*Teams Call Recording, Transcription & Captioning — deployed on tens of thousands of cores per release across commercial and US government clouds (GCC, GCC High, DoD)*
**Tech Stack:** C#, .NET, Redis, Docker, Kubernetes, Azure, Azure DevOps (YAML, Enterprise CI/CD).
* **Service ownership** — owned services in the recording and transcription pipeline from design to production on-call against a 99.9% availability SLA, across environments where compliance restricts telemetry and direct access to production.
* **Transcription architecture** — drove a multi-phase initiative to modernise the transcription architecture, splitting recognition from session management and delivering spoken-language features such as server-side multilingual caption selection.
* **Accelerated release velocity and reduced risk** — replaced a manual multi-step release process with one-click automated deployments gated by health checks, moving release cadence from monthly to weekly.
* **Synthetic monitoring and release gating** — built a suite that exercises the live service with real meeting recordings and transcriptions; this continuous production validation blocked broken builds and eliminated manual regression testing.
* **Kubernetes migration** — migrated the stateful recording service off classic Azure infrastructure onto Microsoft's internal Kubernetes platform across four environments during the company-wide RDFE shutdown; carried the cutover into government clouds without service interruption.
* **On-call and cross-boundary troubleshooting** — root-caused distributed failures across service boundaries, including hours-long recording export hangs caused by a partner service misreporting unrecoverable errors as retryable.

**Key Achievement:** This automation initiative was a primary driver for my promotion and established the foundational infrastructure now used by the entire Teams recording team.
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
