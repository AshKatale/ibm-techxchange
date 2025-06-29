"""
Flask API routes for Compliance RAG Agent
"""

import os
from flask import Flask, request, jsonify
import werkzeug

from config import Config
from agent import ComplianceRAGAgent
from utils import allowed_file, handle_agent_error


def create_app(config: Config = None):
    """Create and configure the Flask application."""
    app = Flask(__name__)
    
    # Use provided config or create default
    if config is None:
        config = Config()
    
    # Configure Flask app
    app.config['MAX_CONTENT_LENGTH'] = config.max_content_length
    app.config['UPLOAD_FOLDER'] = config.upload_folder
    app.secret_key = config.secret_key
    
    # Global variables
    global_agent = None
    uploaded_file_paths = []
    
    @app.route('/health', methods=['GET'])
    def health_check():
        """Health check endpoint."""
        return jsonify({
            'status': 'healthy',
            'service': 'Compliance RAG Agent API',
            'agent_initialized': global_agent is not None
        })
    
    @app.route('/upload', methods=['POST'])
    def upload_files():
        """Handle file uploads."""
        nonlocal uploaded_file_paths
        
        try:
            if 'files' not in request.files:
                return jsonify({'success': False, 'error': 'No files provided'})
            
            files = request.files.getlist('files')
            uploaded_files = []
            
            for file in files:
                if file.filename == '':
                    continue
                    
                if file and allowed_file(file.filename, config.allowed_extensions):
                    # Secure the filename
                    filename = werkzeug.utils.secure_filename(file.filename)
                    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                    
                    # Save the file
                    file.save(filepath)
                    uploaded_files.append(filename)
                    uploaded_file_paths.append(filepath)
            
            return jsonify({
                'success': True, 
                'files': uploaded_files,
                'message': f'Successfully uploaded {len(uploaded_files)} files'
            })
            
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

    @app.route('/setup_ingestion', methods=['POST'])
    def setup_ingestion():
        """Setup document ingestion with company description."""
        nonlocal global_agent
        
        try:
            data = request.get_json()
            company_description = data.get('company_description', '')
            
            if not company_description:
                return jsonify({'success': False, 'error': 'Company description is required'})
            
            # Initialize the agent if not already done
            if global_agent is None:
                global_agent = ComplianceRAGAgent(config)
            
            # Try agent invocation first, fallback to direct tool call
            try:
                result = global_agent.invoke(f"Set up document ingestion for {company_description}")
                output = result.get('output', 'Document ingestion setup complete')
                if isinstance(output, dict):
                    output = output.get('action_input', 'Document ingestion setup complete')
            except Exception as agent_error:
                # Fallback to direct tool invocation
                result = global_agent.invoke_direct("ingest_company_documents", company_description)
                output = result.get('output', 'Document ingestion setup complete')
            
            return jsonify({
                'success': True,
                'message': output
            })
            
        except Exception as e:
            error_message = handle_agent_error(e, 'setup ingestion')
            return jsonify({'success': False, 'error': error_message})

    @app.route('/process_files', methods=['POST'])
    def process_files():
        """Process uploaded files."""
        nonlocal global_agent, uploaded_file_paths
        
        try:
            if global_agent is None:
                return jsonify({'success': False, 'error': 'Agent not initialized. Please setup ingestion first.'})
            
            if not uploaded_file_paths:
                return jsonify({'success': False, 'error': 'No files uploaded. Please upload files first.'})
            
            # Process files using the agent's method
            chunks_processed = global_agent.process_uploaded_files_sync(uploaded_file_paths)
            
            return jsonify({
                'success': True,
                'chunks': chunks_processed,
                'message': f'Successfully processed {chunks_processed} document chunks'
            })
            
        except Exception as e:
            error_message = handle_agent_error(e, 'file processing')
            return jsonify({'success': False, 'error': error_message})

    @app.route('/analyze/<regulation_type>', methods=['POST'])
    def analyze_regulation(regulation_type):
        """Analyze compliance against a specific regulation."""
        nonlocal global_agent
        
        try:
            if global_agent is None:
                return jsonify({'success': False, 'error': 'Agent not initialized.'})
            
            # Validate regulation type
            valid_regulations = ['GDPR', 'NIST', 'HIPAA', 'ISO27001']
            regulation_upper = regulation_type.upper()
            
            if regulation_upper not in valid_regulations:
                return jsonify({
                    'success': False, 
                    'error': f'Invalid regulation type. Must be one of: {", ".join(valid_regulations)}'
                })
            
            # Try agent invocation first, fallback to direct tool call
            try:
                result = global_agent.invoke(f"Analyze against {regulation_upper}")
                output = result.get('output', f'{regulation_upper} analysis completed')
                if isinstance(output, dict):
                    output = output.get('action_input', f'{regulation_upper} analysis completed')
            except Exception as agent_error:
                # Fallback to direct tool invocation
                result = global_agent.invoke_direct("compliance_gap_analysis", regulation_upper)
                output = result.get('output', f'{regulation_upper} analysis completed')
            
            return jsonify({
                'success': True,
                'regulation': regulation_upper,
                'message': output
            })
            
        except Exception as e:
            error_message = handle_agent_error(e, f'{regulation_type} analysis')
            return jsonify({'success': False, 'error': error_message})

    @app.route('/analyze_gdpr', methods=['POST'])
    def analyze_gdpr():
        """Analyze GDPR compliance (backward compatibility endpoint)."""
        return analyze_regulation('GDPR')

    @app.route('/generate_report', methods=['POST'])
    def generate_report():
        """Generate compliance report."""
        nonlocal global_agent
        
        try:
            if global_agent is None:
                return jsonify({'success': False, 'error': 'Agent not initialized.'})
            
            # Try agent invocation first, fallback to direct tool call
            try:
                result = global_agent.invoke("Generate comprehensive compliance report")
                output = result.get('output', 'Report generation completed')
                if isinstance(output, dict):
                    output = output.get('action_input', 'Report generation completed')
            except Exception as agent_error:
                # Fallback to direct tool invocation
                result = global_agent.invoke_direct("generate_compliance_report", "")
                output = result.get('output', 'Report generation completed')
            
            return jsonify({
                'success': True,
                'report': output
            })
            
        except Exception as e:
            error_message = handle_agent_error(e, 'report generation')
            return jsonify({'success': False, 'error': error_message})

    @app.route('/status', methods=['GET'])
    def get_status():
        """Get current compliance analysis status."""
        nonlocal global_agent
        
        try:
            if global_agent is None:
                return jsonify({
                    'success': True,
                    'agent_initialized': False,
                    'message': 'Agent not initialized'
                })
            
            return jsonify({
                'success': True,
                'agent_initialized': True,
                'company_description': global_agent.company_context.get('description', 'Not set'),
                'files_processed': global_agent.uploaded_files_processed,
                'document_chunks': len(global_agent.company_documents),
                'regulations_analyzed': list(global_agent.compliance_findings.keys()),
                'ready_for_report': bool(global_agent.compliance_findings)
            })
            
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

    @app.route('/reset', methods=['POST'])
    def reset_session():
        """Reset compliance analysis session."""
        nonlocal global_agent, uploaded_file_paths
        
        try:
            if global_agent is not None:
                global_agent.reset_compliance_session()
            
            # Clear uploaded files
            uploaded_file_paths = []
            
            return jsonify({
                'success': True,
                'message': 'Compliance session reset successfully'
            })
            
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

    @app.route('/test_agent', methods=['GET'])
    def test_agent():
        """Test if the agent is working properly."""
        nonlocal global_agent
        
        try:
            if global_agent is None:
                return jsonify({'success': False, 'error': 'Agent not initialized'})
            
            # Test with a simple direct tool call
            test_result = global_agent.tools[0].invoke("Test company - A technology company")
            
            return jsonify({
                'success': True,
                'message': 'Agent is working properly',
                'test_result': str(test_result)
            })
            
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})

    @app.route('/available_regulations', methods=['GET'])
    def get_available_regulations():
        """Get list of available regulations for analysis."""
        return jsonify({
            'success': True,
            'regulations': [
                {
                    'code': 'GDPR',
                    'name': 'General Data Protection Regulation',
                    'description': 'European data protection and privacy regulation'
                },
                {
                    'code': 'NIST',
                    'name': 'NIST Cybersecurity Framework',
                    'description': 'US cybersecurity framework for critical infrastructure'
                },
                {
                    'code': 'HIPAA',
                    'name': 'Health Insurance Portability and Accountability Act',
                    'description': 'US healthcare data protection regulation'
                },
                {
                    'code': 'ISO27001',
                    'name': 'ISO/IEC 27001',
                    'description': 'International information security management standard'
                }
            ]
        })

    # Error handlers
    @app.errorhandler(413)
    def too_large(e):
        return jsonify({'success': False, 'error': 'File too large. Maximum size is 50MB.'}), 413

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'success': False, 'error': 'Endpoint not found'}), 404

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({'success': False, 'error': 'Internal server error'}), 500

    return app
