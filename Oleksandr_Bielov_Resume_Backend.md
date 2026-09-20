# Oleksandr Bielov

**Senior Software Engineer — Distributed Systems & Real-Time Platforms**

Helsinki, Finland · Open to on-site, hybrid and remote (EU)
obielovswe@gmail.com · linkedin.com/in/oleksandr-bielov-07743b79 · github.com/aleksandrbelov

---

## Summary

Backend engineer with 13 years in distributed systems. Five years at Microsoft on the Teams real-time media platform — call recording, transcription and captioning — running on tens of thousands of cores per release across commercial and government (sovereign) clouds. Owned services end to end: design, platform migration, production on-call. Primary stack C#/.NET and Java/Spring; Python for recent retrieval and LLM work.

---

## Skills

**Primary languages:** C# (.NET Core / .NET Framework), Java (Spring Boot, Kafka Streams)
**Also:** Python (FastAPI), SQL

**Distributed systems:** Kafka, event-driven services, stateful services, multi-cloud deployment, production on-call
**Platform & infrastructure:** Kubernetes, Docker, Azure, Azure DevOps, CI/CD
**Data & storage:** PostgreSQL, Cassandra, Redis, MySQL / MariaDB, Supabase
**Retrieval & LLM systems:** RAG pipeline design, hybrid dense + BM25 retrieval, LLM re-ranking, OpenAI API, Pinecone

---

## Professional Experience

### Microsoft — Software Engineer II
**Jun 2020 – Jul 2025 · Teams Call Recording, Transcription & Captioning**

Real-time media platform that records, transcribes and captions Teams meetings, deployed on tens of thousands of cores per release across commercial and US government clouds (GCC, GCC High, DoD).

- Owned services in the recording and transcription pipeline end to end — design, rollout, production on-call and incident response — across commercial and government clouds, where compliance restricts telemetry and direct access to production.
- Migrated the stateful recording service off classic Azure infrastructure onto Microsoft's internal Kubernetes platform across four environments, carrying the cutover into the government clouds without interrupting service.
- Led the move from a manual multi-step release process to one-click automated deployments gated by an automated health check, taking the team from monthly to weekly releases and leaving the deployment foundation the recording team still uses.
- Owned synthetic monitoring and release gating: built a suite that exercises the live service with real meeting recordings and transcriptions, blocking broken builds in the release pipeline and running continuously in production, cutting detection time and removing the team's manual testing.
- Drove a multi-phase initiative to modernise the transcription and captioning architecture, delivering spoken-language transcription and splitting recognition from session management underneath.
- Root-caused failures that crossed service boundaries, including recording exports hanging for hours because a partner service misreported an unrecoverable error as retryable.

### Independent Contractor — Backend & AI Engineer
**Jul 2025 – Present · Two client projects: Slack-native people search, and a candidate search system (MatchCV)**

- Built two retrieval systems end to end and ran them in production — ingestion, sentence-boundary chunking, indexing, query serving and deployment as containers, driven from CLI and Slack entry points.
- Designed a provider-agnostic service layer for model calls: per-family request construction behind a single interface, client-side throttling against a tokens-per-minute budget, batched concurrency and exponential backoff on rate limits. Swapping providers, including self-hosted OpenAI-compatible endpoints, is a config change.
- Implemented hybrid retrieval — dense embeddings and BM25 sparse vectors in a single query with weighted scoring — plus a second-stage re-ranking pass that falls back to vector scores when the re-ranker fails or returns invalid output.

### Nuvo Group Ltd. — Senior Software Engineer
**May 2018 – Dec 2019 · Wearable sensor platform for pregnancy monitoring**

- Built the internal messaging library that replaced direct HTTP calls between microservices with Kafka request-response, removing point-to-point coupling; adopted by services across the platform.
- Built parts of the telemetry pipeline handling continuous sensor streams from the wearable device: MQTT ingestion → Kafka Streams → Cassandra → processing service.

### EPAM Systems — Software Engineer
**Oct 2015 – Feb 2018**

- Rebuilt a warehouse and retail service for Canadian Tire, migrating it from a legacy IBM platform to Java/Spring.
- Coordinated a cross-functional squad of developers, BA and QA through the full delivery cycle.
- Delivered backend services and supporting front-end work for enterprise clients.

### LLC "Astelit" (lifecell) — Junior Software Engineer
**Sep 2013 – Oct 2015**

- Customised Oracle Maximo applications (Java, JSP, PL/SQL), supported production systems and provided application monitoring and user support.

---

## Education

**Bachelor's Degree in Computer Science** — Applied Mathematics / Applied Cryptography
National Technical University of Ukraine "Kyiv Polytechnic Institute"
