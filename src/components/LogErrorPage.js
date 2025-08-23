import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrors } from '../context/ErrorContext';

const LogErrorPage = () => {
  const { addError } = useErrors();
  const navigate = useNavigate();
  const [errorData, setErrorData] = useState({
    solution: '',
    stackTrace: '',
    file: '',
    project: '',
    screenshotUrl: '',
    tags: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorData.solution.trim()) return;
    
    addError(errorData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !errorData.tags.includes(newTag.trim())) {
      setErrorData({
        ...errorData,
        tags: [...errorData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setErrorData({
      ...errorData,
      tags: errorData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="error-page">
      <div className="error-page-container">
        <div className="error-page-header">
          <h1>Log New Error</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="error-page-form">
          <div className="form-group">
            <label>Solution/Fix</label>
            <textarea
              placeholder="Describe how you fixed this error..."
              value={errorData.solution}
              onChange={(e) => setErrorData({...errorData, solution: e.target.value})}
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label>Stack Trace (Optional)</label>
            <textarea
              placeholder="Paste the full stack trace here..."
              value={errorData.stackTrace}
              onChange={(e) => setErrorData({...errorData, stackTrace: e.target.value})}
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>File/Component</label>
              <input
                type="text"
                placeholder="filename.js"
                value={errorData.file}
                onChange={(e) => setErrorData({...errorData, file: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Project</label>
              <input
                type="text"
                placeholder="Project name"
                value={errorData.project}
                onChange={(e) => setErrorData({...errorData, project: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Screenshot URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={errorData.screenshotUrl}
                onChange={(e) => setErrorData({...errorData, screenshotUrl: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tags-input">
              <input
                type="text"
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button type="button" className="btn btn-add-tag" onClick={addTag}>+</button>
            </div>
            {errorData.tags.length > 0 && (
              <div className="tags-list">
                {errorData.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="error-page-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Error Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogErrorPage;
