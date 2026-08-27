# OLEKSANDR BIELOV
**Senior Software Engineer | AI/ML Systems** | Remote (EU timezone)
📧 obielovswe@gmail.com | 🐙 [GitHub](github.com/aleksandrbelov)
---
## SUMMARY
Senior software engineer with 10+ years building distributed services and platform automation — five of them at Microsoft on Teams call recording and transcription.
Recently shipped production AI systems: semantic search over CVs and professional profiles, with hybrid retrieval and LLM re-ranking. Strong track record with C#/.NET, Java/Spring, Python/FastAPI, Kafka and Kubernetes.
---
## SKILLS
**Languages & Frameworks:** C# (.NET Core/Framework), Java (Spring Boot, Kafka Streams), Python, FastAPI, Slack Bolt, SQL  
**AI/ML Ecosystem:** OpenAI API, Pinecone, RAG pipeline design, Hybrid vector search (dense + sparse/BM25), Multi-query retrieval, LLM reranking, Reasoning model integration, Async AI orchestration  
**Cloud & DevOps:** Kubernetes, Docker, Heroku, Azure DevOps, CI/CD automation  
**Data & Messaging:** Kafka, Redis, Supabase, MariaDB & MySQL
---
## EXPERIENCE
### **Freelance — AI Engineer**
Jul 2025 – Present
*AI-Powered Professional Matchmaking Platform* · 
**Tech Stack:** Python, OpenAI API, Pinecone, Slack Bolt, Supabase, Docker, Heroku
* **Slack-native semantic search over a professional network** — users describe the connection they need in plain language; a reasoning model rewrites the request into a retrieval-optimised query, normalising non-English input to English before embedding. Profiles are chunked at sentence boundaries with per-chunk vectors and server-side metadata filters.
* **Model-agnostic LLM service layer** — adapts request construction per model family (developer role, `max_completion_tokens`, no temperature for reasoning models), making the model swappable through config, including self-hosted OpenAI-compatible endpoints. Client-side throttling against a tokens-per-minute budget, batched concurrent summarisation, exponential backoff on rate limits.
* **On-demand LinkedIn enrichment from Slack** — an LLM distils contacts' recent posts and profile text into a matching-oriented summary, fanned out to Supabase, the CRM and the vector index; a freshness window skips recently-enriched contacts to cut redundant API spend.
---
*MatchCV — AI-Powered Candidate Search System* · 2025–2026
**Tech Stack:** Python, FastAPI, OpenAI API, Pinecone, ClickUp API, Docker, Heroku
* **Turned raw CVs into a searchable talent database** — batch ingestion pipeline that pulls ClickUp tasks with attachments, extracts text from PDF/DOCX, parses it into structured fields with an LLM and indexes it; run on demand via CLI or a one-shot container.
* **Made search understand recruiter intent** — an LLM expands each query into three semantic variants and extracts hard filters like experience range; results are deduplicated by best score, with automatic retry without filters when the LLM's constraints return nothing.
* **Built hybrid retrieval in Pinecone** — dense embeddings and BM25 sparse vectors in a single query, combined through weighted dot-product scoring; dense catches paraphrasing, BM25 catches exact tokens like framework names and certifications.
* **Ensured top candidate visibility via re-ranking** — added an LLM acting as a second-stage judge to score candidates against the original request, catching strong conceptual matches that basic similarity search would bury; falls back to vector scores if the reranker fails or returns invalid JSON.

📄 [Full technical detail → AI_ML_PROJECTS.md](AI_ML_PROJECTS.md)
---
### **Microsoft — Software Engineer**
Jun 2020 – Jul 2025
*Teams Call Recording, Transcription & Captioning*
**Tech Stack:** C#, .NET, Redis, Docker, Kubernetes, Azure DevOps (YAML, Enterprise CI/CD).
* **Enhanced product accessibility through transcription architecture improvements** — drove multi-phase initiative to modernize captioning capabilities, delivering features like server-side multilingual caption selection and improving inclusivity for international teams.
* **Accelerated release velocity and reduced risk** — transformed manual deployment processes into automated, one-click workflows, significantly increasing release cadence while making production rollouts predictable.
* **Maximized QA efficiency** — eliminated the majority of manual regression testing effort by introducing automated end-to-end validation across all deployment stages, freeing the team to focus on feature development.
* **Reduced production incidents and improved reliability** — cut release-related outages through continuous automated testing integrated into CI/CD pipelines, catching regressions before they reached customers.
* **Platform migration** — moved a service to Microsoft's internal Kubernetes platform during the company-wide RDFE shutdown; manifests, StatefulSet configuration for indexed replicas, on-call for incidents after the move

**Key Achievement:** This automation initiative was a primary driver for my promotion and established the foundational infrastructure now used by the entire Teams recording team.
---
### **Nuvo Group Ltd. — Senior Software Engineer**
May 2018 – Dec 2019
*Wearable sensor technology for pregnancy monitoring.*
**Tech Stack:** Java 8, Spring Boot, Kafka, Kafka Streams, MQTT, Docker, AWS
* Built the messaging layer that replaced HTTP calls between microservices with Kafka request-response — a library services imported to communicate without direct coupling
* Contributed to the telemetry pipeline: MQTT ingestion → Kafka Streams → Cassandra → processing service for sensor data from the wearable belt
---
### **EPAM Systems — Software Engineer**
Oct 2015 – Feb 2018
**Tech Stack:** Java 8, Spring (MVC, Data, Security), Hibernate, MariaDB, Gradle, Tomcat
* Rebuilt a warehouse and retail service for Canadian Tire, migrating it from a legacy IBM platform to Java/Spring
* Coordinated a cross-functional squad (developers, BA, QA) through the full delivery cycle
* Delivered backend services and supporting front-end work for enterprise clients
---
### **LLC "Astelit" (Lifecell) — Junior Software Engineer**
Sep 2013 – Oct 2015
* Customized Oracle Maximo applications (Java, JSP, PL/SQL), supported production systems, and provided application monitoring and user support.
---
## EDUCATION
**Bachelor's Degree in Computer Science**  
*Applied Mathematics / Applied Cryptography*  
National Technical University of Ukraine "Kyiv Polytechnic Institute"
---
