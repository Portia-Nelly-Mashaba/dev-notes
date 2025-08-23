import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NoteContext';
import Editor from '@monaco-editor/react';

const CreateNotePage = () => {
  const { addNote } = useNotes();
  const navigate = useNavigate();
  const [noteData, setNoteData] = useState({
    title: '',
    type: 'Code Snippet',
    language: 'javascript',
    useCodeEditor: true,
    content: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  const noteTypes = ['Code Snippet', 'Tutorial', 'Tool', 'Project'];
  
  // Comprehensive list of programming languages with Monaco Editor support
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'scala', label: 'Scala' },
    { value: 'dart', label: 'Dart' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'perl', label: 'Perl' },
    { value: 'lua', label: 'Lua' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'clojure', label: 'Clojure' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'erlang', label: 'Erlang' },
    { value: 'fsharp', label: 'F#' },
    { value: 'ocaml', label: 'OCaml' },
    { value: 'nim', label: 'Nim' },
    { value: 'crystal', label: 'Crystal' },
    { value: 'zig', label: 'Zig' },
    { value: 'v', label: 'V' },
    { value: 'julia', label: 'Julia' },
    { value: 'groovy', label: 'Groovy' },
    { value: 'powershell', label: 'PowerShell' },
    { value: 'bash', label: 'Bash' },
    { value: 'shell', label: 'Shell' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'scss', label: 'SCSS' },
    { value: 'sass', label: 'Sass' },
    { value: 'less', label: 'Less' },
    { value: 'json', label: 'JSON' },
    { value: 'xml', label: 'XML' },
    { value: 'yaml', label: 'YAML' },
    { value: 'toml', label: 'TOML' },
    { value: 'ini', label: 'INI' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'dockerfile', label: 'Dockerfile' },
    { value: 'makefile', label: 'Makefile' },
    { value: 'cmake', label: 'CMake' },
    { value: 'assembly', label: 'Assembly' },
    { value: 'fortran', label: 'Fortran' },
    { value: 'cobol', label: 'COBOL' },
    { value: 'pascal', label: 'Pascal' },
    { value: 'ada', label: 'Ada' },
    { value: 'lisp', label: 'Lisp' },
    { value: 'scheme', label: 'Scheme' },
    { value: 'prolog', label: 'Prolog' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteData.title.trim() || !noteData.content.trim()) return;
    
    addNote(noteData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const addTag = () => {
    if (newTag.trim() && !noteData.tags.includes(newTag.trim())) {
      setNoteData({
        ...noteData,
        tags: [...noteData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setNoteData({
      ...noteData,
      tags: noteData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleEditorChange = (value) => {
    setNoteData({
      ...noteData,
      content: value || ''
    });
  };

  return (
    <div className="note-page">
      <div className="note-page-container">
        <div className="note-page-header">
          <h1>Create New Note</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="note-page-form">
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter note title..."
                value={noteData.title}
                onChange={(e) => setNoteData({...noteData, title: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Type</label>
              <select
                value={noteData.type}
                onChange={(e) => setNoteData({...noteData, type: e.target.value})}
              >
                {noteTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Language</label>
              <select
                value={noteData.language}
                onChange={(e) => setNoteData({...noteData, language: e.target.value})}
                className="language-select"
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={noteData.useCodeEditor}
                  onChange={(e) => setNoteData({...noteData, useCodeEditor: e.target.checked})}
                />
                Use code editor
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Content</label>
            {noteData.useCodeEditor ? (
              <div className="monaco-editor-container">
                <Editor
                  height="400px"
                  language={noteData.language}
                  value={noteData.content}
                  onChange={handleEditorChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on',
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                    parameterHints: { enabled: true },
                    formatOnPaste: true,
                    formatOnType: true,
                    tabSize: 2,
                    insertSpaces: true,
                    detectIndentation: true,
                    trimAutoWhitespace: true,
                    largeFileOptimizations: true,
                    suggest: {
                      showKeywords: true,
                      showSnippets: true,
                      showClasses: true,
                      showFunctions: true,
                      showVariables: true,
                      showModules: true,
                      showProperties: true,
                      showEvents: true,
                      showOperators: true,
                      showUnits: true,
                      showValues: true,
                      showConstants: true,
                      showEnums: true,
                      showEnumMembers: true,
                      showColors: true,
                      showFiles: true,
                      showReferences: true,
                      showFolders: true,
                      showTypeParameters: true,
                      showWords: true,
                      showUsers: true,
                      showIssues: true
                    }
                  }}
                />
              </div>
            ) : (
              <textarea
                placeholder="Enter your note content..."
                value={noteData.content}
                onChange={(e) => setNoteData({...noteData, content: e.target.value})}
                rows={12}
                required
              />
            )}
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
            {noteData.tags.length > 0 && (
              <div className="tags-list">
                {noteData.tags.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="note-page-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNotePage;
