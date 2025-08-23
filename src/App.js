import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NotesTab from './components/NotesTab';
import ErrorLogsTab from './components/ErrorLogsTab';
import CreateNoteModal from './components/CreateNoteModal';
import LogErrorModal from './components/LogErrorModal';
import { NoteProvider, useNotes } from './context/NoteContext';
import { ErrorProvider, useErrors } from './context/ErrorContext';

function AppContent() {
  const { notes } = useNotes();
  const { errors } = useErrors();
  const [activeTab, setActiveTab] = useState('notes');
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [showLogError, setShowLogError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAIKey, setOpenAIKey] = useState(localStorage.getItem('openai-key') || '');

  const handleSaveAPIKey = () => {
    localStorage.setItem('openai-key', openAIKey);
    // You could add a success notification here
  };

  return (
    <div className="app">
      <Header 
        onCreateNote={() => setShowCreateNote(true)}
        onLogError={() => setShowLogError(true)}
      />
      
      <main className="main-content">
        <div className="content-area">
          <div className="search-section">
            <div className="search-container">
              <i className="search-icon">🔍</i>
              <input
                type="text"
                placeholder="Search notes, tags, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <button className="filters-btn">
              <i className="filter-icon">🔽</i>
              Filters
            </button>
          </div>

          <div className="tabs-container">
            <button 
              className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              <i className="tab-icon">📄</i>
              Notes ({notes.length})
            </button>
            <button 
              className={`tab ${activeTab === 'errors' ? 'active' : ''}`}
              onClick={() => setActiveTab('errors')}
            >
              <i className="tab-icon">⚠️</i>
              Error Logs ({errors.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'notes' ? (
              <NotesTab searchQuery={searchQuery} />
            ) : (
              <ErrorLogsTab searchQuery={searchQuery} />
            )}
          </div>
        </div>

        <Sidebar 
          openAIKey={openAIKey}
          setOpenAIKey={setOpenAIKey}
          onSaveAPIKey={handleSaveAPIKey}
        />
      </main>

      {showCreateNote && (
        <CreateNoteModal onClose={() => setShowCreateNote(false)} />
      )}

      {showLogError && (
        <LogErrorModal onClose={() => setShowLogError(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <NoteProvider>
      <ErrorProvider>
        <AppContent />
      </ErrorProvider>
    </NoteProvider>
  );
}

export default App;
