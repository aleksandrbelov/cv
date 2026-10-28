# OLEKSANDR BIELOV
**Senior Software Engineer | High-Throughput Backend Systems · ex-Microsoft** | Helsinki, Finland · Open to on-site and hybrid
📧 obielovswe@gmail.com | 💼 [LinkedIn](https://linkedin.com/in/oleksandr-bielov-07743b79) | 🐙 [GitHub](https://github.com/aleksandrbelov)
---
## SUMMARY
Senior backend engineer with 13+ years building and scaling complex distributed systems. Five years at Microsoft on Teams recording, transcription and captioning — real-time, high-throughput services that grew 30x to 10M+ recordings a month on tens of thousands of cores — owned from design to 24/7 on-call and incident management. Led key technical decisions: extracted a captions service from a monolith for ~$1.8M a year in compute savings, and drove the separation of speech recognition from session management. Production experience with Cassandra, Redis, PostgreSQL and MySQL, and event-driven systems on Kafka and Azure Service Bus. Polyglot backend engineer across Java, C#/.NET and Python; since 2025, building LLM-powered tools that non-technical teams use inside Slack and ClickUp.
---
## SKILLS
**Languages & Frameworks:** Java (Spring Boot, Kafka Streams), C# / .NET (Polly), Python (FastAPI, asyncio), SQL  
**Databases (SQL & NoSQL):** Cassandra, Redis, PostgreSQL, MySQL / MariaDB, Kusto / Azure Data Explorer (KQL)  
**Messaging & Event-Driven:** Kafka, Kafka Streams, Azure Service Bus, MQTT, webhooks  
**Cloud & Infrastructure:** Kubernetes (AKS), Docker, Azure, AWS, Azure DevOps (YAML CI/CD), ring-based progressive delivery, feature flighting  
**Reliability & Incident Management:** 24/7 on-call, 99.9% availability targets, same-day hotfixes, runbooks and postmortems, dashboards, monitors and anomaly detection, synthetic E2E monitoring  
**Testing & Code Quality:** unit, integration and E2E testing (xUnit, MSTest, NSubstitute, pytest), code review standards, AI-assisted development (Claude Code)
---
## EXPERIENCE
### **Microsoft — Software Engineer**
Jun 2020 – Jul 2025
*Teams Call Recording, Transcription & Captioning — real-time media services, ~300K → 10M+ recordings/month on tens of thousands of cores*
**Tech Stack:** C#, .NET, Polly, Kubernetes, Docker, Redis, Azure Service Bus, Azure, Azure DevOps (YAML CI/CD), Kusto, Geneva
* **Scaled real-time services 30x** — owned Teams recording and transcription services from design to 24/7 on-call against a 99.9% availability target while volume grew from ~300K to 10M+ recordings/month.
* **On-call and incident management** — root-caused distributed failures across service boundaries, from multi-hour export hangs caused by a partner service reporting unrecoverable errors as retryable to government-cloud recording outages fixed with same-day hotfixes.
* **Led a service extraction saving ~$1.8M/year** — led the extraction of the captions service (CART) from a monolith into a standalone microservice with its own CI/CD, testing and scaling, and migrated it to Microsoft's internal Kubernetes platform before a hard year-end deadline, saving ~$1.8M a year in compute; wrote the migration guide 3 other teams adopted.
* **Architecture for maintainability** — drove a multi-phase modernisation that separated speech recognition from session management, improving maintainability and testability, and led spoken-language support for transcription and captions.
* **User-facing features to GA** — shipped speaker attribution, automatic recording and GDPR-compliant transcript deletion, and took the CART live human-captioning integration for accessibility from API contract to GA for commercial and government customers.
* **Resilience for an async re-architecture** — built the telemetry used as the go/no-go signal for moving recording from real-time to asynchronous processing, and integrated a new media storage API with retry policies and event buffering.
* **Weekly releases, one click** — replaced a manual multi-step release with one-click deployment, gated by an automated health check with traffic switching and rollback, moving releases to the first deployment rings from monthly to weekly.
* **Zero-downtime migration of a stateful service** — moved the stateful recording service onto Microsoft's internal Kubernetes platform across four environments, including GCC High and DoD, with no service interruption.
* **Quality gates** — built synthetic E2E monitoring that runs real meetings through production every 15 minutes and blocks broken builds, and added 100+ automated E2E tests for government clouds that previously had zero coverage.
* **Mentoring and operational standards** — wrote runbooks and postmortems and onboarded engineers into the infrastructure team.
---
### **OpsLab — AI Developer Consultant**
Jul 2025 – Present · London, UK (Remote)
*Two client systems in production, used by non-technical teams inside Slack and ClickUp: candidate search over 1,000 CVs (MatchCV) and investor-startup matching*
**Tech Stack:** Python, FastAPI, asyncio, httpx, OpenAI API, Pinecone, Supabase (PostgreSQL), Slack Bolt, Docker, Heroku, pytest
* **Built for where users already work** — recruiters post natural-language queries in a ClickUp Chat thread and get ranked candidates back as a reply, and the Slack service runs fully async so concurrent interactions never block acknowledgements, with repeat queries served from a result cache.
* **End-to-end ownership** — built and ran two retrieval systems in production, from ingestion, chunking and indexing to query serving and container deployment.
* **Resilient by design** — designed a provider-agnostic model-call layer with tokens-per-minute throttling, batched concurrency and exponential backoff, and a re-ranking stage that falls back to vector scores when the model fails or returns invalid output.
---
### **Nuvo Group Ltd. — Senior Software Engineer**
May 2018 – Dec 2019
*Wearable sensor platform for pregnancy monitoring*
**Tech Stack:** Java 8, Spring Boot, Kafka, Kafka Streams, MQTT, Cassandra, Docker, AWS
* Built parts of the **streaming telemetry pipeline** for continuous sensor data from the wearable device: MQTT ingestion → Kafka Streams → **Cassandra** → processing service.
* Built the internal messaging library that replaced direct HTTP calls between microservices with **Kafka request-response**, removing point-to-point coupling; adopted by services across the platform.
---
### **EPAM Systems — Software Engineer**
Oct 2015 – Feb 2018
**Tech Stack:** Java 8, Spring (MVC, Data, Security), Hibernate, MariaDB, Gradle, Tomcat
* Rebuilt a warehouse and retail service for Canadian Tire, migrating it from a legacy IBM platform to Java/Spring.
* Established code review practices and unit/integration testing standards.
* Coordinated a cross-functional squad of developers, BA and QA through the full delivery cycle.
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
