import React, { createContext, useContext, useReducer } from 'react';

const NoteContext = createContext();

const initialState = {
  notes: JSON.parse(localStorage.getItem('devnotes-notes')) || [],
  loading: false,
  error: null
};

const noteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      const newNotes = [action.payload, ...state.notes];
      localStorage.setItem('devnotes-notes', JSON.stringify(newNotes));
      return { ...state, notes: newNotes };
    
    case 'UPDATE_NOTE':
      const updatedNotes = state.notes.map(note => 
        note.id === action.payload.id ? action.payload : note
      );
      localStorage.setItem('devnotes-notes', JSON.stringify(updatedNotes));
      return { ...state, notes: updatedNotes };
    
    case 'DELETE_NOTE':
      const filteredNotes = state.notes.filter(note => note.id !== action.payload);
      localStorage.setItem('devnotes-notes', JSON.stringify(filteredNotes));
      return { ...state, notes: filteredNotes };
    
    default:
      return state;
  }
};

export const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  const addNote = (note) => {
    dispatch({ type: 'ADD_NOTE', payload: { ...note, id: Date.now(), createdAt: new Date() } });
  };

  const updateNote = (note) => {
    dispatch({ type: 'UPDATE_NOTE', payload: note });
  };

  const deleteNote = (id) => {
    dispatch({ type: 'DELETE_NOTE', payload: id });
  };

  return (
    <NoteContext.Provider value={{ ...state, addNote, updateNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};
