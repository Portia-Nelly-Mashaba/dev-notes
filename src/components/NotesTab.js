import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, Edit, Share, Trash2 } from 'lucide-react';

const NotesTab = ({ searchQuery = '' }) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // Dummy data that matches exactly the image
      const dummyNotes = [
        {
          id: 1,
          title: "React useEffect Hook Best Practices",
          content: "// Clean up subscriptions and event listeners\nuseEffect(() => {\n  const subscription = dataService.subscribe(handleData);\n  return () => {\n    subscription.unsubscribe();\n  };\n}, []); // Dependenc...",
          type: "snippet",
          language: "javascript",
          date: "Jan 15, 2024",
          isFavorite: true,
          tags: ["react", "hooks", "useEffect", "cleanup"]
        },
        {
          id: 2,
          title: "PostgreSQL Performance Optimization",
          content: "-- Index optimization for complex queries\nCREATE INDEX CONCURRENTLY idx_user_activity_date \nON user_activity(user_id, created_at DESC);\n-- Explain analyze for query performance\nEXPLAIN (ANALYZE, BUFF...",
          type: "snippet",
          language: "sql",
          date: "Jan 12, 2024",
          isFavorite: false,
          tags: ["postgresql", "performance", "indexing", "database"]
        },
        {
          id: 3,
          title: "Docker Multi-stage Build Optimization",
          content: "# Multi-stage Dockerfile for Node.js app\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only-production\nFROM node:18-alpine AS runtime\nWORKDIR /app\nCOPY --from-builder...",
          type: "tutorial",
          language: "dockerfile",
          date: "Jan 8, 2024",
          isFavorite: true,
          tags: ["docker", "build", "nodejs", "alpine"]
        },
        {
          id: 4,
          title: "TypeScript Generic Utility Types",
          content: "// Useful TypeScript utility patterns\ntype Optional<T, K extends keyof T> = Omit<T, K> &\nPartial<Pick<T, K>>;\ntype DeepPartial<T> = {\n  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]...",
          type: "snippet",
          language: "typescript",
          date: "Jan 7, 2024",
          isFavorite: false,
          tags: ["typescript", "generics", "utility-types", "types"]
        }
      ];
      setNotes(dummyNotes);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const filteredNotes = React.useMemo(() => {
    if (!searchQuery.trim()) return notes;
    
    const query = searchQuery.toLowerCase();
    return notes.filter(note => 
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      (note.tags && note.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }, [notes, searchQuery]);

  const handleIconClick = (e, action, noteId) => {
    e.stopPropagation();
    console.log(`${action} clicked for note ${noteId}`);
    // Handle different actions here
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📄</div>
        <h3>No notes found</h3>
        <p>Start building your knowledge base by creating your first note.</p>
        <button className="btn btn-primary" onClick={() => navigate('/create-note')}>
          Create First Note
        </button>
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
        <div 
          key={note.id} 
          className="note-card" 
        >
          <div className="note-header">
            <div className="note-title-section">
              <input type="checkbox" className="note-checkbox" />
              <h3 className="note-title">
                {note.title.length > 25 ? note.title.substring(0, 25) + "..." : note.title}
              </h3>
            </div>
            <button className="favorite-btn">
              <Star 
                size={16} 
                className={note.isFavorite ? "favorite-icon filled" : "favorite-icon"} 
                fill={note.isFavorite ? "#fbbf24" : "none"}
              />
            </button>
          </div>
          
          <div className="note-meta">
            <span className="note-type">{note.type}</span>
            <span className="note-language">{note.language}</span>
            <div className="note-date">
              <Calendar size={12} />
              <span>{note.date}</span>
            </div>
          </div>
          
          <div className="note-content">
            <pre className="code-preview">{note.content}</pre>
          </div>
          
          <div className="note-tags">
            {note.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          {/* Action Icons - Show only when card is clicked */}
          <div className="action-icons">
            <button 
              className="action-icon"
              onClick={(e) => handleIconClick(e, 'edit', note.id)}
              title="Edit Note"
            >
              <Edit size={18} />
            </button>
            <button 
              className="action-icon"
              onClick={(e) => handleIconClick(e, 'share', note.id)}
              title="Share Note"
            >
              <Share size={18} />
            </button>
            <button 
              className="action-icon"
              onClick={(e) => handleIconClick(e, 'delete', note.id)}
              title="Delete Note"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesTab;