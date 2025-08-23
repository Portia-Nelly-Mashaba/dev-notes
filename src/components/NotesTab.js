import React from 'react';
import { useNotes } from '../context/NoteContext';

const NotesTab = ({ searchQuery }) => {
  const { notes } = useNotes();

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📄</div>
        <h3>No notes found</h3>
        <p>Start building your knowledge base by creating your first note.</p>
        <button className="btn btn-primary">Create First Note</button>
      </div>
    );
  }

  if (filteredNotes.length === 0 && searchQuery) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3>No notes match your search</h3>
        <p>Try adjusting your search terms or create a new note.</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {filteredNotes.map(note => (
        <div key={note.id} className="note-card">
          <div className="note-header">
            <h3 className="note-title">{note.title}</h3>
            <span className="note-type">{note.type}</span>
          </div>
          <p className="note-content">{note.content.substring(0, 150)}...</p>
          {note.tags && note.tags.length > 0 && (
            <div className="note-tags">
              {note.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
          <div className="note-footer">
            <span className="note-date">
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
            <div className="note-actions">
              <button className="btn btn-sm">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesTab;
