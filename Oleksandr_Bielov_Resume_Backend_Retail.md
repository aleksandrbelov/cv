# OLEKSANDR BIELOV
**Senior Software Engineer | Backend & Distributed Systems · ex-Microsoft** | Helsinki, Finland · Open to on-site and hybrid
📧 obielovswe@gmail.com | 💼 [LinkedIn](https://linkedin.com/in/oleksandr-bielov-07743b79) | 🐙 [GitHub](https://github.com/aleksandrbelov)
---
## SUMMARY
Senior backend engineer with 13+ years designing, building and operating production distributed systems. Five years at Microsoft owning Teams recording and transcription services end to end — design, deployment, monitoring and 24/7 on-call — while volume grew 30x to 10M+ recordings a month on tens of thousands of cores. Replaced legacy platforms with purpose-built services: rebuilt a warehouse and retail service for Canadian Tire off a legacy IBM platform, and extracted a captions service from a monolith for ~$1.8M a year in compute savings. Event-driven and streaming systems on Kafka, Kafka Streams and Azure Service Bus; since 2025, data-heavy LLM matching and ranking systems in Python. Primary languages Java (JVM) and C#/.NET.
---
## SKILLS
**Languages & Frameworks:** Java (JVM, Spring Boot, Kafka Streams), C# / .NET (Polly), Python (FastAPI, asyncio), SQL  
**Data & Messaging:** Kafka, Kafka Streams, Azure Service Bus, PostgreSQL, Redis, Cassandra, Kusto / Azure Data Explorer (KQL), MySQL / MariaDB  
**Cloud & Infrastructure:** Kubernetes (AKS), Docker, Azure, AWS, Azure DevOps (YAML CI/CD), ring-based progressive delivery, feature flighting  
**Reliability & Observability:** 99.9% availability targets, 24/7 on-call, dashboards and monitors, anomaly detection, runbooks and postmortems, synthetic E2E monitoring  
**Testing:** unit, integration and E2E (xUnit, MSTest, NSubstitute, pytest)  
**AI:** AI-assisted development (Claude Code), LLM integration (OpenAI API), RAG, hybrid retrieval, LLM re-ranking
---
## EXPERIENCE
### **Microsoft — Software Engineer**
Jun 2020 – Jul 2025
*Teams Call Recording, Transcription & Captioning — ~300K → 10M+ recordings/month on tens of thousands of cores, across commercial, data-residency and US government clouds*
**Tech Stack:** C#, .NET, Polly, Kubernetes, Docker, Redis, Azure Service Bus, Azure, Azure DevOps (YAML CI/CD), Kusto, Geneva
* **End-to-end service ownership through 30x growth** — owned Teams recording and transcription services from design and implementation through deployment, monitoring and 24/7 on-call against a 99.9% availability target while volume grew from ~300K to 10M+ recordings/month.
* **Monolith extraction saving ~$1.8M/year** — led the extraction of the captions service (CART) from a monolith into a standalone microservice with its own CI/CD, testing and scaling, and migrated it to Microsoft's internal Kubernetes platform before a hard year-end deadline, saving ~$1.8M a year in compute; wrote the migration guide 3 other teams adopted.
* **Observability for an async re-architecture** — built the end-to-end telemetry for moving recording from real-time to asynchronous processing, with dashboards and monitors for assembly, delivery, capacity and error rates used as the go/no-go signal for production readiness and each rollout expansion.
* **Failure handling across service boundaries** — integrated a new internal media storage API with retry policies and event buffering, and traced multi-hour export hangs to a partner service reporting unrecoverable errors as retryable, so exports kept retrying instead of failing fast.
* **Weekly releases, one click** — replaced a manual multi-step release with one-click deployment, gated by an automated health check with traffic switching and rollback, and consolidated four per-cloud build pipelines into one, moving releases to the first deployment rings from monthly to weekly.
* **Zero-downtime migration of a stateful service** — moved the stateful recording service onto Microsoft's internal Kubernetes platform across four environments, including GCC High and DoD, with no service interruption.
* **Data residency for 170K+ customers** — delivered in-region data residency for Recorder, Transcription and Live Captions in 5 countries and migrated telemetry event pipelines to dedicated clusters to fix cross-region data flows for EU Data Boundary compliance.
* **Production quality gates** — built synthetic E2E monitoring that runs real meetings through production every 15 minutes and blocks broken builds, and added 100+ automated E2E tests for government clouds that previously had zero coverage.
* **Operational standards** — wrote runbooks and postmortems and onboarded engineers into the infrastructure team.
---
### **OpsLab — AI Developer Consultant**
Jul 2025 – Present · London, UK (Remote)
*Two client systems in production: candidate search over 1,000 CVs (MatchCV) and Slack-native investor-startup matching*
**Tech Stack:** Python, FastAPI, asyncio, httpx, OpenAI API, Pinecone, Supabase (PostgreSQL), Slack Bolt, Docker, Heroku, pytest
* **Matching and ranking systems end to end** — built and ran two retrieval systems in production, from ingestion, chunking and indexing to query serving and container deployment, driven from CLI and Slack entry points.
* **Data pipeline from raw documents** — MatchCV's batch pipeline pulls 1,000 CVs from ClickUp, extracts PDF/DOCX text, parses it into structured fields with an LLM and indexes it with metadata for server-side filtering.
* **Resilience around rate-limited dependencies** — designed a provider-agnostic model-call layer with client-side throttling against a tokens-per-minute budget, batched concurrency and exponential backoff, so swapping providers is a config change.
* **Ranking that degrades safely** — combined dense embeddings and BM25 sparse vectors in one weighted query, followed by a second-stage LLM re-ranker that falls back to vector scores when it fails or returns invalid output.
---
### **Nuvo Group Ltd. — Senior Software Engineer**
May 2018 – Dec 2019
*Wearable sensor platform for pregnancy monitoring*
**Tech Stack:** Java 8, Spring Boot, Kafka, Kafka Streams, MQTT, Cassandra, Docker, AWS
* Built the internal messaging library that replaced direct HTTP calls between microservices with **Kafka request-response**, removing point-to-point coupling; adopted by services across the platform.
* Built parts of the **streaming telemetry pipeline** for continuous sensor data from the wearable device: MQTT ingestion → Kafka Streams → Cassandra → processing service.
---
### **EPAM Systems — Software Engineer**
Oct 2015 – Feb 2018
**Tech Stack:** Java 8, Spring (MVC, Data, Security), Hibernate, MariaDB, Gradle, Tomcat
* Rebuilt a **warehouse and retail service for Canadian Tire**, migrating it from a legacy IBM platform to Java/Spring.
* Established code review practices and unit/integration testing standards.
* Coordinated a cross-functional squad of developers, BA and QA through the full delivery cycle.
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
