## AI/ML PROJECTS (Freelance)

### **AI-Powered Professional Matchmaking Platform**
*Slack-native semantic search and LLM enrichment pipeline that delivers ranked professional matches on demand, directly inside a team's workspace*  
**Tech Stack:** Python 3.11, OpenAI API (o3-mini, gpt-4.1, text-embedding-3-large), Pinecone, Slack Bolt, Supabase, httpx, Docker, Heroku
* **Delivered** a multi-stage AI matching pipeline: reasoning-model query enrichment (multilingual → optimized English) → high-dimensional embeddings → Pinecone cosine similarity search with server-side metadata filtering, returning top-10 ranked matches directly in Slack.
* **Engineered** a fault-tolerant RAG ingestion pipeline — sentence-boundary chunking, batched vector upserts, and dynamic metadata validation at write time — reliably processing thousands of professional profiles per run without data loss.
* **Implemented** production-grade LLM reliability — client-side token budgeting, exponential backoff with Retry-After parsing, and automatic parameter switching for reasoning models — ensuring stable throughput under OpenAI rate limits.
* **Built** a flexible LLM abstraction layer supporting multiple OpenAI APIs, with 90-day Supabase result caching and user-controlled cache refresh — reducing redundant API calls and keeping response times fast for repeat queries.
* **Designed** a fully async Python stack (Slack Bolt, httpx, asyncio) ensuring zero blocked Slack ACKs across all concurrent interactions.
* **Maintained** zero-downtime data integrity during live CRM schema migrations via dual-origin DTO abstraction bridging NetHunt CRM and Supabase; implemented per-user Fernet-encrypted API key storage for individual billing attribution.

---

### **MatchCV — AI-Powered Candidate Search System**
*End-to-end RAG pipeline that indexes candidate CVs into a Pinecone vector database and enables semantic candidate search via natural language queries posted in ClickUp Chat*  
**Tech Stack:** Python, FastAPI, OpenAI API (GPT-4o, text-embedding-3-large), Pinecone, ClickUp API, Docker, Heroku, pdfplumber, python-docx, pytest
* **Designed** an end-to-end RAG ingestion pipeline that pulls PDF/DOCX CV attachments from ClickUp via REST API, extracts and normalises raw text, then uses an LLM with structured prompting to parse each resume into a consistent schema — name, skills, experience, and summary — ready for indexing.
* **Engineered** a vector indexing layer that converts structured resume text into high-dimensional embeddings and upserts records into Pinecone with rich metadata, enabling precise server-side filtering by experience range, skills, and location.
* **Implemented** an LLM-powered `QueryEnhancer` module that rewrites natural language search queries — extracting job title, experience range, required skills, location, and language level — and generates multiple semantic query alternatives to diversify query semantics and improve vector search recall; supports multilingual input (e.g., Ukrainian → English semantic search).
* **Built** a multi-query re-ranking layer with Pinecone hybrid search (dense + sparse BM25) — executing parallel queries, deduplicating results, and combining lexical and semantic recall for improved match quality across both keyword-heavy and conceptual searches.
* **Deployed** a production-ready FastAPI service on Docker/Heroku, wired to ClickUp webhooks so that natural language queries posted in a ClickUp Chat thread automatically trigger candidate search and return ranked results as a reply — with a clean layered architecture and a comprehensive pytest suite covering ingestion, retrieval, and ranking layers.
