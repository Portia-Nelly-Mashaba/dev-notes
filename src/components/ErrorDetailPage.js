import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, Calendar, AlertTriangle, CheckCircle, FileText, Server, Clock, Hash } from 'lucide-react';

const ErrorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you'd fetch this data based on the id
  const errorDetails = {
    id: 3,
    title: "Docker Build Failing on ARM64",
    date: "Jan 10, 2024",
    project: "microservice-api",
    tags: ["docker", "arm64", "build", "platform"],
    error: `ERROR: failed to solve: process "/bin/sh -c npm install" did not complete successfully: exit code: 1\nnpm ERR! code ENOENT\nnpm ERR! syscall spawn git`,
    solution: `Issue was with native dependencies not compatible with ARM64 architecture.\n\nSolution:\n1. Updated Dockerfile to use multi-platform base image\n2. Added platform-specific dependency installation\n3. Used docker buildx for cross-platform builds\n\n# Updated Dockerfile\nFROM --platform=$BUILDPLATFORM node:18-alpine\nRUN apk add --no-cache git python3 make g++\nCOPY package*.json ./\nRUN npm ci --omit=dev`,
    context: {
      file: 'Dockerfile',
      project: 'microservice-api'
    },
    metadata: {
      created: 'Jan 10, 2024, 2:00:00 AM',
      errorId: 3
    }
  };

  if (!errorDetails) {
    return <div>Error not found</div>;
  }

  return (
    <div className="error-detail-page">
      <div className="error-detail-header">
        <div className="header-content">
          <div className="header-main">
            <button onClick={() => navigate(-1)} className="back-btn">
              <ChevronLeft size={20} />
              Back
            </button>
            <div className="header-details">
              <div className="error-title-container">
                <AlertTriangle size={20} className="header-icon" />
                <h1>{errorDetails.title}</h1>
              </div>
              <div className="error-meta">
                <div className="meta-item">
                  <Calendar size={14} className="meta-icon" />
                  <span>{errorDetails.date}</span>
                </div>
                <div className="meta-divider">•</div>
                <div className="meta-item">
                  <Server size={14} className="meta-icon" />
                  <span>{errorDetails.project}</span>
                </div>
              </div>
            </div>
            <button className="edit-btn">
              <Edit size={16} />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>

      <div className="error-detail-tags">
        {errorDetails.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      <div className="error-detail-content">
        <div className="detail-card">
          <div className="card-header">
            <AlertTriangle size={20} className="card-icon error" />
            <h2>Error Details</h2>
          </div>
          <pre className="error-code-block">{errorDetails.error}</pre>
        </div>

        <div className="detail-card">
          <div className="card-header">
            <CheckCircle size={20} className="card-icon solution" />
            <h2>Solution</h2>
          </div>
          <div className="solution-content" dangerouslySetInnerHTML={{ __html: errorDetails.solution.replace(/\n/g, '<br />') }} />
        </div>

        <div className="detail-card">
            <div className="card-header">
                <FileText size={20} className="card-icon context" />
                <h2>Context</h2>
            </div>
            <div className="context-grid">
                <div className="context-item">
                    <span className="context-label">File:</span>
                    <span className="context-value">{errorDetails.context.file}</span>
                </div>
                <div className="context-item">
                    <span className="context-label">Project:</span>
                    <span className="context-value">{errorDetails.context.project}</span>
                </div>
            </div>
        </div>

        <div className="detail-card">
            <div className="card-header">
                <Clock size={20} className="card-icon metadata" />
                <h2>Metadata</h2>
            </div>
            <div className="context-grid">
                <div className="context-item">
                    <span className="context-label">Created:</span>
                    <span className="context-value">{errorDetails.metadata.created}</span>
                </div>
                <div className="context-item">
                    <span className="context-label">Error ID:</span>
                    <span className="context-value">{errorDetails.metadata.errorId}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDetailPage;
