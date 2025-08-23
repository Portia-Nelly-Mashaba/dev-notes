import React, { createContext, useContext, useReducer } from 'react';

const ErrorContext = createContext();

const initialState = {
  errors: JSON.parse(localStorage.getItem('devnotes-errors')) || [],
  loading: false,
  error: null
};

const errorReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      const newErrors = [action.payload, ...state.errors];
      localStorage.setItem('devnotes-errors', JSON.stringify(newErrors));
      return { ...state, errors: newErrors };
    
    case 'UPDATE_ERROR':
      const updatedErrors = state.errors.map(error => 
        error.id === action.payload.id ? action.payload : error
      );
      localStorage.setItem('devnotes-errors', JSON.stringify(updatedErrors));
      return { ...state, errors: updatedErrors };
    
    case 'DELETE_ERROR':
      const filteredErrors = state.errors.filter(error => error.id !== action.payload);
      localStorage.setItem('devnotes-errors', JSON.stringify(filteredErrors));
      return { ...state, errors: filteredErrors };
    
    default:
      return state;
  }
};

export const ErrorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  const addError = (error) => {
    dispatch({ type: 'ADD_ERROR', payload: { ...error, id: Date.now(), createdAt: new Date() } });
  };

  const updateError = (error) => {
    dispatch({ type: 'UPDATE_ERROR', payload: error });
  };

  const deleteError = (id) => {
    dispatch({ type: 'DELETE_ERROR', payload: id });
  };

  return (
    <ErrorContext.Provider value={{ ...state, addError, updateError, deleteError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrors = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrors must be used within an ErrorProvider');
  }
  return context;
};
