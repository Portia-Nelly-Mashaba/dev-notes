import React from 'react';
import { useErrors } from '../context/ErrorContext';

const ErrorLogsTab = ({ searchQuery }) => {
  const { errors } = useErrors();

  const filteredErrors = errors.filter(error => 
    error.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    error.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    error.solution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (errors.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⚠️</div>
        <h3>No error logs found</h3>
        <p>Start tracking your debugging journey by logging your first error.</p>
        <button className="btn btn-primary">Log First Error</button>
      </div>
    );
  }

  if (filteredErrors.length === 0 && searchQuery) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3>No errors match your search</h3>
        <p>Try adjusting your search terms or log a new error.</p>
      </div>
    );
  }

  return (
    <div className="errors-grid">
      {filteredErrors.map(error => (
        <div key={error.id} className="error-card">
          <div className="error-header">
            <h3 className="error-title">{error.title}</h3>
            <span className="error-severity">Error</span>
          </div>
          <p className="error-message">{error.message.substring(0, 100)}...</p>
          {error.solution && (
            <div className="error-solution">
              <strong>Solution:</strong> {error.solution.substring(0, 100)}...
            </div>
          )}
          <div className="error-meta">
            {error.file && <span className="error-file">{error.file}</span>}
            {error.project && <span className="error-project">{error.project}</span>}
          </div>
          <div className="error-footer">
            <span className="error-date">
              {new Date(error.createdAt).toLocaleDateString()}
            </span>
            <div className="error-actions">
              <button className="btn btn-sm">View</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ErrorLogsTab;
