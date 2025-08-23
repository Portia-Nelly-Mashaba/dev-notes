import React from 'react';

const Sidebar = ({ openAIKey, setOpenAIKey, onSaveAPIKey }) => {
  return (
    <aside className="sidebar">
      <div className="api-key-section">
        <div className="api-key-header">
          <i className="api-key-icon">🔑</i>
          <h3>OpenAI API Key Required</h3>
        </div>
        <p className="api-key-description">
          <i className="brain-icon">🧠</i>
          To use AI features, please enter your OpenAI API key. It will be stored locally in your browser.
        </p>
        <div className="api-key-form">
          <label htmlFor="api-key">OpenAI API Key</label>
          <input
            id="api-key"
            type="password"
            placeholder="sk-..."
            value={openAIKey}
            onChange={(e) => setOpenAIKey(e.target.value)}
            className="api-key-input"
          />
          <button 
            className="btn btn-save" 
            onClick={onSaveAPIKey}
            disabled={!openAIKey.trim()}
          >
            Save API Key
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
