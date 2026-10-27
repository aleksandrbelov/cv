# OLEKSANDR BIELOV
**Senior Software Engineer | Backend & AI Systems · ex-Microsoft** | Helsinki, Finland · Open to on-site, hybrid, and remote (EU)
📧 obielovswe@gmail.com | 💼 [LinkedIn](https://linkedin.com/in/oleksandr-bielov-07743b79) | 🐙 [GitHub](https://github.com/aleksandrbelov)
---
## SUMMARY
Senior software engineer with 13+ years in backend and distributed systems. Five years at Microsoft building and running Teams meeting recording and transcription as it scaled 30x to 10M+ recordings a month, on tens of thousands of cores across commercial and government clouds. Owned services from design to 24/7 on-call; led a captions service's extraction from a monolith and migrated its infrastructure, saving ~$1.8M a year in compute; delivered data residency in 5 regions for 170K+ customers.
Now shipping production LLM systems: semantic search with hybrid retrieval and LLM re-ranking. Core stack: C#/.NET, Java/Spring, Python/FastAPI, Kafka, Kubernetes, Azure.
---
## SKILLS
**Languages & Frameworks:** C# (.NET Core/Framework, Polly), Java (Spring Boot, Kafka Streams), Python, FastAPI, Slack Bolt, SQL  
**AI/ML Ecosystem:** OpenAI API, Pinecone, RAG pipeline design, Hybrid vector search (dense + sparse/BM25), Multi-query retrieval, LLM reranking, Reasoning model integration, Async AI orchestration  
**Cloud & DevOps:** Azure, Kubernetes (AKS), ARM, Azure Front Door, Docker, Heroku, Azure DevOps, CI/CD automation  
**Observability:** Kusto (KQL), Aria, Geneva Metrics, anomaly detection, dashboards and monitors  
**Data & Messaging:** Kafka, Redis, Azure Service Bus, PostgreSQL, Cassandra, Supabase, MariaDB & MySQL  
**Testing & Quality:** E2E and synthetic monitoring, integration, unit (MSTest, xUnit, NSubstitute, Shouldly, pytest)  
**Compliance & Sovereign Cloud:** GDPR, EU Data Boundary, US Government Cloud (GCC / GCC High / DoD), data residency and tagging
---
## EXPERIENCE
### **OpsLab — AI Developer Consultant**
Jul 2025 – Present · London, UK (Remote)
*MatchCV — AI-Powered Candidate Search System*
**Tech Stack:** Python, FastAPI, OpenAI API, Pinecone, ClickUp API, Docker, Heroku
* **Turned 1,000 raw CVs into a searchable talent database** — batch pipeline pulls CVs from ClickUp, extracts PDF/DOCX text, parses it into structured fields with an LLM and indexes it; runs on demand from a CLI or a one-shot container.
* **Made search understand recruiter intent** — an LLM expands each query into three semantic variants and extracts hard filters such as years of experience; results are deduplicated by best score and retried without filters when the filters return nothing.
* **Built hybrid retrieval in Pinecone** — dense and BM25 sparse vectors in one query with weighted scoring: dense catches paraphrases, BM25 catches exact tokens like framework names and certifications.
* **Re-ranking that degrades safely** — a second-stage LLM judge scores candidates against the original request, surfacing strong conceptual matches that similarity search buries; falls back to vector scores if the re-ranker fails or returns invalid JSON.
---
*AI-Powered Professional Matchmaking Platform*
**Tech Stack:** Python, OpenAI API, Pinecone, Slack Bolt, Supabase, Docker, Heroku
* **Slack-native semantic search across 2,000 professional profiles** — users describe the connection they need in plain language; a reasoning model rewrites it into a retrieval-optimised query, normalising non-English input to English. Profiles are chunked at sentence boundaries with per-chunk vectors and server-side metadata filters.
* **On-demand LinkedIn enrichment from Slack** — an LLM distils contacts' recent posts and profile text into a matching-oriented summary, written to Supabase, the CRM and the vector index; a freshness window skips recently enriched contacts to cut API spend.
📄 [Full technical detail → AI_ML_PROJECTS.md](AI_ML_PROJECTS.md)
---
### **Microsoft — Software Engineer**
Jun 2020 – Jul 2025
*Teams Call Recording, Transcription & Captioning*
**Tech Stack:** C#, .NET, Polly, Redis, Service Bus, Docker, Kubernetes, Azure, Azure DevOps (YAML, Enterprise CI/CD), Kusto, Geneva, Substrate.
* **Service ownership through 30x growth** — owned Teams recording and transcription services from design to 24/7 on-call against a 99.9% availability target while volume grew from ~300K to 10M+ recordings/month. Shipped same-day hotfixes for government-cloud outages; wrote runbooks and postmortems and onboarded engineers into the infra team.
* **$1.8M/year captions service migration** — led the extraction of the human-curated captions service (CART) from a monolith into a standalone microservice with its own CI/CD, testing and scaling, and migrated its infrastructure before a hard year-end deadline, saving ~$1.8M a year in compute. Wrote the migration guide 3 other teams adopted; shipped CART to GA for commercial and government customers.
* **Weekly releases, one click** — cut the release cycle for the first deployment rings from monthly to weekly. Built one-click deployment with traffic switching and rollback, gated by an automated health check on availability, reliability and exception count; consolidated four per-cloud build pipelines into one.
* **Zero-downtime Kubernetes migration** — moved the stateful recording service onto Microsoft's internal Kubernetes platform across four environments, including GCC High and DoD, with no service interruption.
* **Cross-service root-causing** — traced multi-hour recording export hangs to a partner service reporting unrecoverable errors as retryable, so exports kept retrying instead of failing fast.
* **Async recording observability** — built the end-to-end telemetry for moving recording from real-time to asynchronous processing: dashboards and monitors for assembly, delivery, capacity, error rates and reliability that served as the go/no-go signal for production readiness and each rollout expansion. Integrated a new internal media storage API replacing legacy blob storage (auth upgrades, retry policies, event buffering, multi-region data residency).
* **Data residency for 170K+ customers** — delivered in-region data residency for Recorder, Transcription and Live Captions in 5 countries (Norway, Germany, Switzerland, Singapore, Brazil). For EU Data Boundary compliance, moved telemetry and logging event pipelines to dedicated clusters and fixed cross-region data flows. Sovereign clouds: GCC, GCC High, DoD, Gallatin, AG.
* **Government-cloud test automation** — built synthetic E2E monitoring that runs real meetings through production every 15 minutes and blocks broken builds; added 100+ automated E2E tests for government clouds that previously had zero coverage, eliminating manual release testing.
* **Transcription architecture** — led spoken-language support for transcription and captions, and designed the separation of session management from the transcription processor, improving maintainability and testability.
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
