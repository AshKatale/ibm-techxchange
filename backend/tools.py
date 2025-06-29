"""
Tools for the Compliance RAG Agent
"""

from typing import List
from langchain.tools import tool
from utils import get_regulation_requirements


def create_compliance_tools(agent_instance):
    """Create compliance analysis tools for the agent."""
    
    @tool  
    def ingest_company_documents(company_description: str, file_count: int = 0) -> str:
        """Load uploaded company compliance documents from browser uploads into memory for analysis.
        
        Args:
            company_description: Description of the company and its business
            file_count: Number of files uploaded (optional, for verification)
        """
        try:
            # Store company description
            agent_instance.company_context['description'] = company_description
            agent_instance.company_documents = []  # Clear previous documents
            
            agent_instance.company_context['files_ready'] = True
            agent_instance.uploaded_files_processed = False  # Will be set to True after manual processing
            
            return f"""
Document ingestion system ready for company: {company_description}

To complete the process:
1. Upload your compliance documents (PDF, DOCX, TXT, MD) using the file upload interface
2. Run the 'process_uploaded_compliance_files()' function in the next cell
3. Files will be processed in-memory (not stored in AstraDB)
4. Then proceed with compliance analysis

Supported formats: PDF, DOCX, TXT, MD
Processing mode: In-memory only (session-based)
Ready for file upload and processing.
"""
            
        except Exception as e:
            return f"Error in document ingestion setup: {str(e)}"

    @tool
    def process_uploaded_files() -> str:
        """Process files that have been uploaded to the notebook session."""
        if not agent_instance.uploaded_files_processed:
            return "Files not yet processed. Please run the 'process_uploaded_compliance_files()' function first after uploading your files."
        
        if not agent_instance.company_documents:
            return "No documents processed yet. Please upload and process files first."
        
        total_chunks = len(agent_instance.company_documents)
        agent_instance.company_context['document_chunks'] = total_chunks
        
        return f"Successfully processed {total_chunks} document chunks from uploaded files. Ready for compliance analysis."

    @tool
    def compliance_gap_analysis(regulation_type: str) -> str:
        """Analyze company documents against specific regulation using pre-loaded regulations DB.
        
        Args:
            regulation_type: Type of regulation (GDPR, NIST, HIPAA, ISO27001, etc.)
        """
        if not agent_instance.company_documents:
            return "No company documents loaded. Please upload and process files first using ingest_company_documents and process_uploaded_files."
        
        try:
            # Get regulation requirements (simplified approach without vectorstore)
            regulation_requirements = get_regulation_requirements(regulation_type)
            
            # Use in-memory company documents for analysis
            relevant_company_docs = agent_instance.company_documents[:15]  # Take first 15 chunks
            
            # Combine contexts for LLM analysis
            reg_context = regulation_requirements
            company_doc_context = "\n".join([doc.page_content for doc in relevant_company_docs])
            
            # LLM prompt for gap analysis
            analysis_prompt = f"""
You are a compliance expert. Analyze the company's documentation against {regulation_type} requirements.

REGULATION REQUIREMENTS:
{reg_context}

COMPANY DOCUMENTATION:
{company_doc_context}

COMPANY DESCRIPTION: {agent_instance.company_context.get('description', 'Not provided')}

Provide a structured analysis with:
1. COMPLIANT: Areas where company meets requirements
2. GAPS: Missing or non-compliant areas  
3. PARTIAL: Areas with partial implementation
4. RISK_LEVEL: High/Medium/Low for each gap

Format each finding as: SECTION|STATUS|DESCRIPTION|RISK_LEVEL

Provide specific, actionable findings based on the documentation provided.
"""
            
            analysis_result = agent_instance.llm.invoke(analysis_prompt)
            agent_instance.compliance_findings[regulation_type] = analysis_result
            
            return f"Completed {regulation_type} gap analysis using {len(relevant_company_docs)} company document chunks. Results stored for report generation."
            
        except Exception as e:
            return f"Error in compliance gap analysis: {str(e)}"

    @tool(return_direct=True)
    def generate_compliance_report() -> str:
        """Generate comprehensive compliance assessment report from all analyses."""
        if not agent_instance.compliance_findings:
            return "No compliance analysis data available. Please run gap analysis for at least one regulation first."
        
        try:
            # Compile report
            findings_summary = ""
            for regulation, analysis in agent_instance.compliance_findings.items():
                findings_summary += f"\n\n=== {regulation} ANALYSIS ===\n{analysis}"
            
            report_prompt = f"""
Generate a professional compliance assessment report based on the following analysis:

COMPANY: {agent_instance.company_context.get('description', 'Company under assessment')}
DOCUMENT CHUNKS ANALYZED: {agent_instance.company_context.get('document_chunks', 'Not specified')}

ANALYSIS RESULTS:
{findings_summary}

Structure the report as:
# EXECUTIVE SUMMARY
Brief overview of overall compliance posture and key findings

# COMPANY OVERVIEW  
Brief description of the company and scope of assessment

# OVERALL COMPLIANCE POSTURE
High-level assessment across all regulations analyzed

# DETAILED FINDINGS BY REGULATION
For each regulation analyzed, provide:
- Compliant areas
- Identified gaps
- Partial implementations
- Risk assessments

# RISK PRIORITIZATION MATRIX
Categorize findings by risk level (High/Medium/Low) and impact

# REMEDIATION RECOMMENDATIONS
Actionable recommendations for addressing gaps, organized by priority

# IMPLEMENTATION TIMELINE
Suggested timeline for addressing findings

# CONCLUSION
Summary and next steps

Make it professional, actionable, and specific to the findings provided.
"""
            
            final_report = agent_instance.llm.invoke(report_prompt)
            
            # Add metadata to report
            metadata_header = f"""
COMPLIANCE ASSESSMENT REPORT
Generated: {agent_instance.company_context.get('description', 'Unknown Company')}
Regulations Analyzed: {', '.join(agent_instance.compliance_findings.keys())}
Document Chunks: {agent_instance.company_context.get('document_chunks', 'Not specified')}
Analysis Date: Auto-generated

{'='*60}
"""
            
            return metadata_header + final_report
            
        except Exception as e:
            return f"Error generating compliance report: {str(e)}"

    return [ingest_company_documents, process_uploaded_files, compliance_gap_analysis, generate_compliance_report]
