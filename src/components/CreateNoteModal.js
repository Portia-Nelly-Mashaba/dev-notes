import React, { useState } from 'react';
import { useNotes } from '../context/NoteContext';

const CreateNoteModal = ({ onClose }) => {
  const { addNote } = useNotes();
  const [noteData, setNoteData] = useState({
    title: '',
    type: 'Code Snippet',
    language: 'Javascript',
    useCodeEditor: true,
    content: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  const noteTypes = ['Code Snippet', 'Tutorial', 'Tool', 'Project'];
  const languages = ['Javascript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'TypeScript'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteData.title.trim() || !noteData.content.trim()) return;
    
    addNote(noteData);
    onClose();
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Note</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
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

          <div className="form-row">
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

            <div className="form-group">
              <label>Language</label>
              <select
                value={noteData.language}
                onChange={(e) => setNoteData({...noteData, language: e.target.value})}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
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

          <div className="form-group">
            <label>Content</label>
            <textarea
              placeholder="Enter your note content..."
              value={noteData.content}
              onChange={(e) => setNoteData({...noteData, content: e.target.value})}
              rows={10}
              required
            />
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

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
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

export default CreateNoteModal;
