# IBM TechXchange Compliance Veritas Agent

A Retrieval-Augmented Generation (RAG) based compliance analysis system for automated legal document review, powered by IBM Watson AI and AstraDB vector storage.

## Overview

The **Compliance RAG Agent** helps companies analyze uploaded legal/compliance documents against regulations such as **GDPR, NIST, HIPAA, ISO27001**, and more. It uses IBM Watson LLMs, vector storage with AstraDB, and a web-based API for end-to-end document ingestion, processing, compliance gap analysis, and reporting.

## Features

- **Automated Ingestion** of company documents (PDF, DOCX, XLSX, etc.)
- **Vector-based retrieval** for contextual analysis using AstraDB
- **Compliance gap analysis** for GDPR, NIST, HIPAA, ISO27001, and more
- **Automated compliance report generation**
- **REST API** for integration or web UI workflows
- **Customizable prompts and tools** for adaptable compliance workflows

## Tech Stack

- **Backend:** Python, Flask, LangChain, IBM Watsonx AI, AstraDB, tiktoken, bs4, pypdf, openpyxl, python-dotenv
- **Frontend:** Vite/React (see [`frontend/README.md`](frontend/README.md))
- **Vector DB:** AstraDB (Cassandra-based)
- **LLM:** IBM Granite/Watsonx

## Directory Structure

```
backend/    # Flask API, business logic, compliance agent
frontend/   # Vite/React UI (see frontend/README.md)
```

## API Endpoints

- `POST /setup_ingestion` – Setup document ingestion (company description)
- `POST /upload` – Upload compliance documents
- `POST /process_files` – Process uploaded files
- `POST /analyze/<regulation_type>` – Analyze for specific regulation (e.g., GDPR, NIST)
- `POST /generate_report` – Generate compliance report
- `GET /status` – Get current analysis status
- `GET /available_regulations` – List supported regulations
- `POST /reset` – Reset analysis session

### Example Workflow

1. **Setup ingestion:**  
   `POST /setup_ingestion` with your company description  
2. **Upload documents:**  
   `POST /upload` with your compliance files  
3. **Process files:**  
   `POST /process_files`  
4. **Analyze compliance:**  
   `POST /analyze/GDPR` (or NIST/HIPAA/ISO27001)  
5. **Generate report:**  
   `POST /generate_report`  

## Setup (Backend)

1. **Install dependencies**  
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Set environment variables**  
   Create a `.env` file or export the following:
   - `WATSONX_URL`
   - `WATSONX_APIKEY`
   - `WATSONX_PROJECT_ID`
   - `ASTRA_DB_API_ENDPOINT`
   - `ASTRA_DB_APPLICATION_TOKEN`
   - `REGULATIONS_ASTRA_ENDPOINT`
   - `REGULATIONS_ASTRA_TOKEN`

3. **Run the API**  
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:5000`

## Setup (Frontend)

See [`frontend/README.md`](frontend/README.md):

```bash
cd frontend
npm install
npm run dev
```

## Customization

- **Compliance workflows** are defined via flexible prompts and tool interfaces in `backend/agent.py`.
- Add new regulations or document types by extending agent tools and vectorstore setup.

## License

*No license specified yet.*

---

> **This repository is a prototype for IBM TechXchange and intended for demonstration, not production use. Use at your own risk.*
