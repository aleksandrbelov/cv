# OLEKSANDR BIELOV
**Senior Software Engineer | Backend & AI Systems · ex-Microsoft** | Helsinki, Finland · Open to on-site, hybrid, and remote (EU)
📧 obielovswe@gmail.com | 💼 [LinkedIn](https://linkedin.com/in/oleksandr-bielov-07743b79) | 🐙 [GitHub](https://github.com/aleksandrbelov)
---
## SUMMARY
Senior software engineer with 13+ years in backend and distributed systems. Five years at Microsoft building and running Teams meeting recording and transcription as it scaled 30x to 10M+ recordings a month, on tens of thousands of cores across commercial and government clouds. Owned services from design to 24/7 on-call; led a captions service's extraction from a monolith and migrated its infrastructure, saving ~$1.8M a year in compute; delivered data residency in 5 regions for 170K+ customers.
Now shipping production LLM systems: semantic search with hybrid retrieval and LLM re-ranking, behind a provider-agnostic model-call layer with token-budget throttling and backoff. Core stack: C#/.NET, Java/Spring, Python/FastAPI, Kafka, Kubernetes, Azure.
---
## SKILLS
**Languages & Frameworks:** C# (.NET Core / .NET Framework, Polly), Java (Spring Boot, Spring Framework, Kafka Streams), Python (FastAPI, asyncio, httpx), Slack Bolt, SQL  
**Data & Messaging:** Kafka, Azure Service Bus, Redis, PostgreSQL, Cassandra, Supabase, MariaDB & MySQL  
**Cloud & DevOps:** Azure, Kubernetes (AKS), Docker, ARM, Azure Front Door, Substrate, Heroku, Azure DevOps (YAML CI/CD), CI/CD automation, ring-based progressive delivery, staged traffic cutover  
**Observability:** Kusto (KQL), Aria, Geneva Metrics, anomaly detection, dashboards and monitors  
**AI & Retrieval:** OpenAI API and OpenAI-compatible endpoints, Pinecone, RAG pipeline design, hybrid vector search (dense + sparse/BM25), multi-query retrieval, LLM re-ranking, reasoning model integration, async AI orchestration, provider-agnostic model layer, tokens-per-minute throttling  
**Testing & Quality:** E2E and synthetic monitoring against production, integration, unit (MSTest, xUnit, NSubstitute, Shouldly, pytest)  
**Compliance, Security & Sovereign Cloud:** GDPR, EU Data Boundary, data residency and tagging, US Government Cloud (GCC / GCC High / DoD), managed identities, SDL
---
## EXPERIENCE
### **OpsLab — AI Developer Consultant**
Jul 2025 – Present · London, UK (Remote)
*MatchCV — AI-Powered Candidate Search System*
**Tech Stack:** Python, FastAPI, OpenAI API (GPT-4o, text-embedding-3-large), Pinecone, ClickUp API, Docker, Heroku, pdfplumber, python-docx, pytest
* **Turned 1,000 raw CVs into a searchable talent database** — batch pipeline pulls ClickUp tasks with PDF/DOCX attachments via the REST API, extracts and normalises the text, and parses each resume with an LLM into a consistent schema (name, skills, experience, summary) ready for indexing; runs on demand from a CLI or a one-shot container, since event-driven ingestion through ClickUp webhooks needs the Business plan.
* **Vector indexing with rich metadata** — converts structured resume text into embeddings and upserts them into Pinecone with metadata for server-side filtering by experience range, skills and location.
* **Made search understand recruiter intent** — an LLM-powered `QueryEnhancer` rewrites each query into three semantic variants and extracts hard filters (job title, experience range, skills, location, language level); results across variants are deduplicated by best vector score, and an automatic retry without filters fires when the LLM's constraints return nothing.
* **Built hybrid retrieval in Pinecone** — dense and BM25 sparse vectors in one query with weighted dot-product scoring: dense catches paraphrases and conceptual matches, BM25 catches exact tokens like framework names and certifications; a multi-query layer runs the variants in parallel and deduplicates the results.
* **Re-ranking that degrades safely** — a second-stage LLM judge scores candidates against the original request, surfacing strong conceptual matches that similarity search buries; falls back to vector scores if the re-ranker fails or returns invalid JSON.
* **Search from ClickUp Chat** — FastAPI service on Docker/Heroku, wired to ClickUp webhooks so natural-language queries posted in a ClickUp Chat thread trigger candidate search and get ranked results as a reply; layered architecture with a pytest suite covering ingestion, retrieval and ranking.
---
*AI-Powered Professional Matchmaking Platform*
**Tech Stack:** Python 3.11, OpenAI API (o3-mini, gpt-4.1, text-embedding-3-large), Pinecone, Slack Bolt, Supabase, httpx, Docker, Heroku
* **Slack-native semantic search across 2,000 professional profiles** — users describe the connection they need in plain language; a reasoning model rewrites it into a retrieval-optimised query, normalising non-English input to English. Profiles are chunked at sentence boundaries with per-chunk vectors and server-side metadata filters.
* **On-demand LinkedIn enrichment from Slack** — an LLM distils contacts' recent posts and profile text into a matching-oriented summary, written to Supabase, the CRM and the vector index; a freshness window skips recently enriched contacts to cut API spend.
* **LLM layer with result caching** — abstraction layer supporting multiple OpenAI APIs, with 90-day Supabase result caching and user-controlled cache refresh, cutting redundant API calls and keeping repeat queries fast.
* **Fully async Slack service** — Slack Bolt, httpx and asyncio, so concurrent interactions never block Slack acknowledgements.
* **Zero-downtime CRM schema migrations** — a dual-origin DTO layer bridging NetHunt CRM and Supabase kept data consistent during live schema migrations; per-user Fernet-encrypted API key storage enables individual billing attribution.
---
*Across projects — Slack-native investor-startup matching and MatchCV*
**Tech Stack:** Python, FastAPI, asyncio, httpx, OpenAI API, Pinecone, Supabase, Slack Bolt, Docker, Heroku
* Built two retrieval systems end to end and ran them in production — ingestion, sentence-boundary chunking, indexing, query serving and deployment as containers, driven from CLI and Slack entry points.
* Designed a provider-agnostic service layer for model calls: per-family request construction behind a single interface, client-side throttling against a tokens-per-minute budget, batched concurrency and exponential backoff on rate limits. Swapping providers, including self-hosted OpenAI-compatible endpoints, is a config change.
* Implemented hybrid retrieval — dense embeddings and BM25 sparse vectors in a single query with weighted scoring — plus a second-stage re-ranking pass that falls back to vector scores when the re-ranker fails or returns invalid output.
* Built the Slack service on a fully async Python stack (asyncio, httpx, Slack Bolt) so concurrent interactions never block Slack acknowledgements; repeat queries are served from a result cache in Supabase.
📄 [Full technical detail → AI_ML_PROJECTS.md](AI_ML_PROJECTS.md)
---
### **Microsoft — Software Engineer**
Jun 2020 – Jul 2025
*Teams Call Recording, Transcription & Captioning — ~300K → 10M+ recordings per month, deployed on tens of thousands of cores per release across commercial clouds, regional data-residency deployments and US government clouds (GCC, GCC High, DoD)*
**Tech Stack:** C#, .NET Core / .NET Framework, Polly, Redis, Service Bus, Docker, Kubernetes, Azure, Azure DevOps (YAML, Enterprise CI/CD), Kusto, Geneva, Substrate, FFmpeg
* **Service ownership under compliance constraints** — owned Teams recording and transcription services from design to 24/7 production on-call against a 99.9% availability target while volume grew 30x, from ~300K to 10M+ recordings/month, including environments where compliance restricts telemetry and direct production access. Root-caused distributed failures across service boundaries, from multi-hour export hangs (a partner service reporting unrecoverable errors as retryable, so exports kept retrying instead of failing fast) to government-cloud recording outages fixed with same-day hotfixes. Wrote runbooks and postmortems and onboarded engineers into the infra team.
* **Kubernetes migration with ~$1.8M/year savings** — led the extraction of the human-curated captions service (CART) from a monolith into a standalone microservice with its own CI/CD, testing and scaling, and migrated its infrastructure to Microsoft's internal Kubernetes platform before a hard year-end deadline, cutting compute for ~$1.8M in annual savings; wrote the migration guide 3 other teams adopted. Moved the stateful recording service off classic Azure infrastructure onto the same platform across four environments, including GCC High and DoD, during the company-wide retirement of classic Azure infrastructure (RDFE shutdown), with no service interruption.
* **Release automation and production quality gates** — replaced a manual multi-step release process with one-click deployment, moving releases to the first deployment rings from monthly to weekly. Traffic switching and rollback were gated by an automated deployment health check (availability, reliability, exception count); each deployment unit was drained of live recording sessions before deploying, then traffic shifted back in steps (1% → 5% → 25% → 50% → 100%). Consolidated four per-cloud build pipelines into one and contributed to the redesign of feature flighting for deterministic production rollouts. Built synthetic E2E monitoring that runs real meeting recordings and transcriptions through live production every 15 minutes and blocks broken builds, added 100+ automated E2E tests for government environments that previously had zero coverage, eliminating manual regression testing, and automated tests for Teams Copilot features (2024).
* **Speech and transcription platform** — drove a multi-phase modernisation that separated speech recognition from session management, improving maintainability and testability, and led spoken-language support for transcription and captions. On the core transcription team, shipped speaker attribution, session resilience, automatic recording and GDPR-compliant transcript deletion. Shipped the CART (Computer-Assisted Real-Time Transcription) integration — API contract, scheduling, network integration and E2E tests — to GA for commercial and government customers.
* **Observability for the async recording re-architecture** — built end-to-end observability and telemetry for moving recording from real-time to asynchronous processing: dashboards and monitors for recording assembly, delivery, scale, capacity, error rates and reliability, used as the go/no-go signal for production readiness and each rollout expansion. Integrated a new internal media storage API replacing legacy blob storage, with auth upgrades, retry policies, event buffering and multi-region data residency.
* **Data residency and EU Data Boundary** — deployed Recorder, Transcription and Live Captions to dedicated data-residency regions in Norway, Germany, Switzerland, Singapore and Brazil, serving 170K+ customers. For EU Data Boundary compliance of telemetry and logging, kept customer data in the correct region by migrating event pipelines to dedicated clusters and fixing cross-region data flows. Shipped across sovereign clouds: GCC, GCC High, DoD, Gallatin and AG.
* **Security hardening** — replaced personal access tokens with managed identities, upgraded FFmpeg to 7.1 to remediate CVEs, and moved pipelines onto SDL v2 / 1ES templates.

**Key Achievement:** The release automation and production validation work established the foundational infrastructure still used by the entire Teams recording team and drove my promotion.
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
* Established code review practices and unit/integration testing standards.
* Delivered backend services and supporting front-end work for enterprise clients.
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
