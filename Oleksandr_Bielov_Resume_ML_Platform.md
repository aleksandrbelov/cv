# OLEKSANDR BIELOV
**Senior Software Engineer | Platform, Data & ML Systems · ex-Microsoft** | Helsinki, Finland · Open to on-site and hybrid
📧 obielovswe@gmail.com | 💼 [LinkedIn](https://linkedin.com/in/oleksandr-bielov-07743b79) | 🐙 [GitHub](https://github.com/aleksandrbelov)
---
## SUMMARY
Senior software engineer with 13+ years across backend, platform and data systems. At Microsoft, built the release tooling the whole Teams recording team still ships with — one-click health-gated deployment, one build pipeline in place of four, synthetic E2E monitoring of production — and owned recording and transcription services through 30x growth to 10M+ recordings a month. Since 2025, building ML-backed retrieval systems end to end in Python: ingestion pipelines that turn raw documents into structured records and embeddings, hybrid dense + sparse retrieval, LLM re-ranking and a provider-agnostic model layer behind one interface. Builds tools other engineers adopt: a migration guide used by 3 teams, a Kafka messaging library adopted across a microservice platform.
---
## SKILLS
**Languages & Frameworks:** Python (FastAPI, asyncio, httpx, pytest), Java (Spring Boot, Kafka Streams), C# / .NET, SQL  
**Data & ML Pipelines:** batch ingestion pipelines, Kafka and Kafka Streams, embeddings (text-embedding-3-large), Pinecone, hybrid dense + BM25 sparse retrieval, LLM re-ranking, RAG, OpenAI API  
**Data Stores:** PostgreSQL (Supabase), Redis, Cassandra, Kusto / Azure Data Explorer (KQL), MySQL / MariaDB  
**Platform & Developer Tooling:** REST APIs and webhooks, internal libraries, CLI tools, Kubernetes (AKS), Docker, Azure, CI/CD (Azure DevOps YAML), progressive delivery, feature flighting, AI-assisted development (Claude Code)  
**Observability & Quality:** dashboards and monitors, anomaly detection, Geneva Metrics, synthetic E2E monitoring, unit and integration testing (xUnit, MSTest, pytest)
---
## EXPERIENCE
### **OpsLab — AI Developer Consultant**
Jul 2025 – Present · London, UK (Remote)
*Two production retrieval systems for clients: candidate search over 1,000 CVs (MatchCV) and Slack-native investor-startup matching*
**Tech Stack:** Python, FastAPI, asyncio, httpx, OpenAI API (GPT-4o, text-embedding-3-large), Pinecone, Supabase (PostgreSQL), Slack Bolt, ClickUp API, Docker, Heroku, pytest
* **Ingestion pipeline from raw documents to a searchable index** — MatchCV pulls 1,000 CVs with PDF/DOCX attachments from ClickUp, extracts and normalises the text, parses each with an LLM into a consistent schema and upserts embeddings with metadata into Pinecone for server-side filtering by experience, skills and location.
* **Hybrid retrieval with safe degradation** — dense embeddings and BM25 sparse vectors in one weighted query, followed by a second-stage LLM re-ranker that falls back to vector scores when it fails or returns invalid output.
* **Query understanding** — an LLM expands each query into three semantic variants and extracts hard filters such as years of experience, retrying without filters when they return nothing.
* **One interface over many model providers** — designed a provider-agnostic layer for model calls, with per-family request construction behind a single interface, tokens-per-minute throttling, batched concurrency and exponential backoff, so swapping providers, including self-hosted OpenAI-compatible endpoints, is a config change.
* **Search where users already work** — non-technical users query in natural language from ClickUp Chat, via webhooks into a FastAPI service, and from Slack, via a fully async Slack Bolt service with a Supabase result cache.
---
### **Microsoft — Software Engineer**
Jun 2020 – Jul 2025
*Teams Call Recording, Transcription & Captioning — ~300K → 10M+ recordings/month; infrastructure team from 2022*
**Tech Stack:** C#, .NET, Polly, Kubernetes, Docker, Redis, Azure Service Bus, Azure, Azure DevOps (YAML CI/CD), Kusto, Geneva
* **Release platform the whole team still ships with** — replaced a manual multi-step release with one-click deployment, gated by an automated health check on availability, reliability and exception count with traffic switching and rollback, and consolidated four per-cloud build pipelines into one, moving releases to the first deployment rings from monthly to weekly.
* **Synthetic monitoring and test automation** — built synthetic E2E monitoring that runs real meeting recordings and transcriptions through live production every 15 minutes and blocks broken builds, and added 100+ automated E2E tests for government clouds that previously had zero coverage.
* **Speech-recognition platform modernisation** — drove a multi-phase modernisation that separated speech recognition from session management, improving maintainability and testability, and led spoken-language support for transcription and captions.
* **API contract to GA** — shipped the CART (Computer-Assisted Real-Time Transcription) integration, from API contract, scheduling and network integration to E2E tests, to GA for commercial and government customers.
* **Service extraction saving ~$1.8M/year** — led the extraction of the CART captions service from a monolith into a standalone microservice with its own CI/CD, testing and scaling, and migrated it to Microsoft's internal Kubernetes platform before a hard year-end deadline, saving ~$1.8M a year in compute; wrote the migration guide 3 other teams adopted.
* **Zero-downtime migration of a stateful service** — moved the stateful recording service onto Microsoft's internal Kubernetes platform across four environments, including GCC High and DoD, with no service interruption.
* **Observability as the rollout gate** — built the end-to-end telemetry for moving recording from real-time to asynchronous processing, with dashboards and monitors for assembly, delivery, capacity and error rates used as the go/no-go signal for each rollout expansion.
* **Data pipelines under residency rules** — migrated telemetry and logging event pipelines to dedicated clusters and fixed cross-region data flows for EU Data Boundary compliance, and delivered in-region data residency in 5 countries for 170K+ customers.
* **Service ownership through 30x growth** — owned recording and transcription services from design to 24/7 on-call against a 99.9% availability target while volume grew from ~300K to 10M+ recordings/month.
---
### **Nuvo Group Ltd. — Senior Software Engineer**
May 2018 – Dec 2019
*Wearable sensor platform for pregnancy monitoring*
**Tech Stack:** Java 8, Spring Boot, Kafka, Kafka Streams, MQTT, Cassandra, Docker, AWS
* Built the **internal messaging library** that replaced direct HTTP calls between microservices with Kafka request-response, removing point-to-point coupling; adopted by services across the platform.
* Built parts of the **streaming telemetry pipeline** for continuous sensor data from the wearable device: MQTT ingestion → Kafka Streams → Cassandra → processing service.
---
### **EPAM Systems — Software Engineer**
Oct 2015 – Feb 2018
**Tech Stack:** Java 8, Spring (MVC, Data, Security), Hibernate, MariaDB, Gradle, Tomcat
* Rebuilt a warehouse and retail service for Canadian Tire, migrating it from a legacy IBM platform to Java/Spring.
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
