<div align="center">

# ⚡ Synthara AI

### Autonomous Web-Grounded Synthetic Data & Analytics Platform

*Turn natural language prompts into clean, schema-validated, privacy-audited datasets in real time.*

<p>
  <a href="https://github.com/marutigore/Synthara/actions/workflows/ci.yml">
    <img src="https://github.com/marutigore/Synthara/actions/workflows/ci.yml/badge.svg" alt="Synthara CI" />
  </a>
  <a href="https://github.com/marutigore/Synthara/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Gemini_2.5_Flash-1M_Context-4285F4?logo=google&logoColor=white" alt="Gemini 2.5 Flash" />
  <img src="https://img.shields.io/badge/OpenRouter-DeepSeek_R1-7C3AED" alt="OpenRouter DeepSeek" />
  <img src="https://img.shields.io/badge/Docker-Crawl4AI-2496ED?logo=docker&logoColor=white" alt="Docker Crawl4AI" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL_RLS-3ECF8E?logo=supabase&logoColor=white" alt="Supabase" />
</p>

<p>
  <a href="#-key-features">Features</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-api-ecosystem">API Ecosystem</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="docs/ARCHITECTURE.md">Deep Dive Docs</a> •
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

</div>

---

## 🎯 Overview

**Synthara** is an end-to-end AI data engineering platform that blends **automated web discovery**, **containerized headless crawling**, **two-phase multi-model LLM structuring**, and **real-time Server-Sent Events (SSE)** to transform natural-language prompts (e.g., *"Top EV charging networks in India with station counts and pricing"*) into production-ready CSV/JSON datasets.

Unlike naive LLM wrappers, Synthara is engineered for production resilience:
- **Self-healing scraping** via Dockerized **Crawl4AI** with autonomous domain-synthesis fallbacks when target sites block bots.
- **Two-phase Map-Reduce structuring** that drafts entities first and induces high-density schemas second, preventing context saturation and hallucinations.
- **Built-in Data Quality & Privacy Guard** featuring PII detection/masking, Shannon entropy fidelity scoring, statistical profiling, AI Smart-Fix, and interactive Nivo visualizations.

---

## ✨ Key Features

| Module | Capabilities |
| :--- | :--- |
| **🕷️ Autonomous Ingestion Engine** | Containerized Crawl4AI headless Chromium microservice (`:11235`), SerpAPI 3× URL over-fetching, smart backfill queues, `fit_markdown` extraction, and autonomous AI domain fallback on HTTP 403/500 blocks. |
| **🧠 Multi-Model AI Orchestrator** | Hybrid routing across **Google Gemini 2.5 Flash** (1M token window) and **OpenRouter (DeepSeek R1 / Nemotron)** with 170k-char corpus budgeting, dynamic schema induction, and JSON salvage recovery. |
| **📡 Real-Time SSE Streaming** | Native Web Streams (`text/event-stream`) delivering sub-second terminal telemetry, progress percentages, scraped previews, 30s keep-alive heartbeats, and in-flight request deduplication. |
| **🛡️ Privacy & Fidelity Guard** | Automated PII scanner (`email`, `phone`, `ssn`, `credit_card`, `ip_address`, `passport`) with `TAG`/`HASH`/`ASTERISKS` masking, Shannon entropy fidelity grading (`A+`–`D`), and GDPR/CCPA/HIPAA audits. |
| **📊 Analytics, Viz & Smart-Fix** | Statistical profiler (quartiles, outliers, correlations), AI Smart-Fix anomaly remediation, Nivo chart recommendations, OpenStreetMap geocoding, and one-click `.docx` executive report exports. |
| **🔐 Enterprise Auth & BYOK Vault** | Supabase PostgreSQL with Row-Level Security (RLS), dataset history/diff/merger, community Marketplace, and **AES-256 encrypted** HTTP-only cookies for user-supplied API keys. |

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    User["👤 User / Next.js 15 Dashboard"] -->|POST Prompt + Config| SSE["📡 /api/generate-stream (SSE)"]

    subgraph Ingestion ["1. Discovery & Headless Ingestion"]
        SSE --> Serp["🔎 SerpAPI URL Discovery"]
        Serp --> Filter["🧹 URL Filter & Backfill Queue"]
        Filter --> Crawl["🐳 Crawl4AI Docker (:11235)"]
        Crawl -->|Blocked / Empty| Fallback["⚡ Autonomous AI Domain Fallback"]
    end

    subgraph Structuring ["2. Two-Phase LLM Pipeline"]
        Crawl --> Cleaner["🧽 Noise Reduction & 170k Char Cap"]
        Fallback --> Cleaner
        Cleaner --> Phase1["📝 Phase 1: Exhaustive Entity Draft"]
        Phase1 --> Phase2["🏗️ Phase 2: Dynamic Schema & JSON Rows"]
        Phase2 --> LLM["🤖 Gemini 2.5 Flash / OpenRouter DeepSeek"]
    end

    subgraph PostProcess ["3. Quality, Privacy & Persistence"]
        LLM --> CSV["📄 CSV / Chunked Snapshot"]
        CSV --> Privacy["🛡️ Privacy & Fidelity Guard"]
        CSV --> Profiler["📊 Statistical Profiler & Smart-Fix"]
        CSV --> DB[("🗄️ Supabase PostgreSQL + RLS")]
    end

    SSE -.->|Live Logs, Progress & Heartbeat| User
```

> 📖 For detailed sequence diagrams, token budgeting strategy, and scaling architecture, read **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

---

## 🔌 API Ecosystem

Synthara integrates **7 external services** and exposes **37 internal Next.js API endpoints**:

### External Integrations
- **Google Gemini API (`gemini-2.5-flash`)** — Native high-speed, 1M-context extraction & structuring.
- **OpenRouter API (`DeepSeek R1` / `Nemotron`)** — Multi-model reasoning and fallback routing.
- **SerpAPI** — Live Google SERP discovery and URL ranking.
- **Crawl4AI Microservice** — Containerized Playwright/Chromium HTML-to-Markdown crawler.
- **Supabase** — PostgreSQL REST API, JWT Auth, RLS, and Storage buckets.
- **OpenStreetMap Nominatim** — Geospatial geocoding for map visualizations.
- **Hugging Face Transformers (`@xenova/transformers`)** — Local `all-MiniLM-L6-v2` embeddings for RAG chunking.

### Highlighted Internal Endpoints

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/generate-stream` | `POST` / `GET` | Real-time SSE pipeline streaming scraping, drafting, and final CSV dataset |
| `/api/dataset/privacy-fidelity` | `POST` | Scans & masks PII, calculates Shannon entropy fidelity score & compliance audit |
| `/api/analyze-dataset` | `POST` | Computes column statistics, correlations, outliers, and AI deep insights |
| `/api/analysis/smart-fix` | `POST` | AI-driven cleaning and remediation for missing/malformed cells |
| `/api/dataviz/suggest-charts` | `POST` | Recommends optimal Nivo chart configurations for any dataset |
| `/api/export-docx` | `POST` | Exports formatted Microsoft Word (`.docx`) analytical reports |
| `/api/keys` | `GET` / `POST` | Manages AES-256 encrypted BYOK credentials in HTTP-only cookies |
| `/api/mock-api` | `GET` / `POST` | Exposes generated datasets as instant REST mock endpoints |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 20+** and **npm 9+**
- **Docker Desktop** (for the Crawl4AI microservice)
- A free **[Supabase](https://supabase.com)** project
- API keys for **Google Gemini** (or **OpenRouter**) and **SerpAPI**

### 1. Clone & Install
```bash
git clone https://github.com/marutigore/Synthara.git
cd Synthara
npm install
```

### 2. Configure Environment Variables
Copy `env.example` to `.env.local` and populate your keys:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Providers & Search
GOOGLE_GEMINI_API_KEY=your-gemini-key
OPENROUTER_API_KEY=your-openrouter-key
OPENROUTER_MODEL=tngtech/deepseek-r1t2-chimera:free
SERPAPI_KEY=your-serpapi-key

# Crawl4AI Microservice
CRAWL4AI_SERVICE_URL=http://localhost:11235
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Initialize Supabase Schema
Run the SQL statements in [`supabase-complete-schema.sql`](supabase-complete-schema.sql) inside your Supabase SQL Editor (creates tables, indexes, storage bucket, and Row-Level Security policies).

### 4. Launch Services
```bash
# Start Crawl4AI headless browser container
docker compose up -d crawl4ai

# Start the Next.js development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** to launch the Synthara dashboard.

---

## 🧰 Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E" alt="Supabase" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini" />
</p>

---

## 📂 Project Structure

```text
Synthara/
├── .github/                  # GitHub Actions CI workflow, Issue & PR templates
├── docs/                     # System architecture & sequence diagrams
├── scripts/                  # DB setup, smoke tests & AI integration validators
├── server/                   # Python Crawl4AI & trainer microservices
├── src/
│   ├── ai/                   # Two-phase SimpleAI engine, flows & RAG chunker
│   ├── app/                  # Next.js App Router pages & 37 API endpoints
│   ├── components/           # Dashboard, terminal logger, dataviz & UI primitives
│   ├── lib/                  # Supabase clients, AES-256 encryption & job store
│   └── services/             # Crawl4AI, SerpAPI, Profiler, Privacy Guard, DOCX export
├── supabase/                 # RLS migration files
├── docker-compose.yml        # Multi-container orchestration (Next.js + Crawl4AI)
└── supabase-complete-schema.sql
```

---

## 🛠️ Developer Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start Next.js dev server with hot reload |
| `npm run typecheck` | Run strict TypeScript validation (`tsc --noEmit`) |
| `npm run lint` | Run ESLint code quality checks |
| `npm run build` | Create optimized production build |
| `npm run setup:db` | Initialize Supabase schema and buckets locally |

---

## 🤝 Contributing & License

Contributions are welcome! Please read **[CONTRIBUTING.md](CONTRIBUTING.md)** for branch guidelines and commit conventions.

Distributed under the **MIT License**. See **[LICENSE](LICENSE)** for details.

---

<div align="center">
  Built with ⚡ by <strong>Maruti Gore</strong>
</div>
