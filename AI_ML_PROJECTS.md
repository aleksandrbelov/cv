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
* **Designed** a batch ingestion pipeline that pulls ClickUp tasks with PDF/DOCX attachments via REST API, extracts and normalises raw text, then uses an LLM with structured prompting to parse each resume into a consistent schema — name, skills, experience, and summary — ready for indexing; run on demand via CLI or a one-shot container (ClickUp webhooks require Business plan, so event-driven ingestion was deliberately deferred).
* **Engineered** a vector indexing layer that converts structured resume text into high-dimensional embeddings and upserts records into Pinecone with rich metadata, enabling precise server-side filtering by experience range, skills, and location.
* **Implemented** an LLM-powered `QueryEnhancer` module that rewrites each query into three semantic variants, normalising non-English input into English before embedding, and extracts structured hard filters (job title, experience range, skills, location, language level); results across all variants are deduplicated by best vector score. An automatic retry without filters fires when the LLM's constraints return an empty result set, preventing silent failures from over-specified queries.
* **Built** hybrid retrieval in Pinecone — dense embeddings and BM25 sparse vectors combined in a single query through weighted dot-product scoring; dense vectors catch paraphrasing and conceptual matches, BM25 catches exact tokens like framework names and certifications. Wrapped with a multi-query layer that executes parallel queries and deduplicates results for improved recall across both keyword-heavy and conceptual searches.
* **Added** an LLM re-ranking layer as a second-stage judge that scores each candidate against the original request, surfacing strong conceptual matches that pure vector similarity would bury; falls back to vector scores if the reranker fails or returns invalid JSON.
* **Deployed** a production-ready FastAPI service on Docker/Heroku, wired to ClickUp webhooks so that natural language queries posted in a ClickUp Chat thread automatically trigger candidate search and return ranked results as a reply — with a clean layered architecture and a comprehensive pytest suite covering ingestion, retrieval, and ranking layers.
