'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setUserInput,
  loadTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  startEdit,
} from '../store/slices/todoSlice';

export default function Page() {
  const dispatch = useAppDispatch();
  const { userInput, list, editIndex } = useAppSelector((state) => state.todo);

  // Load todos from localStorage on mount
  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  // Handle input change
  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserInput(e.target.value));
  };

  // Handle add or update action
  const handleAction = () => {
    if (editIndex !== null) {
      dispatch(updateTodo());
    } else {
      dispatch(addTodo());
    }
  };

  // Handle delete item
  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  // Handle start edit
  const handleStartEdit = (index: number) => {
    dispatch(startEdit(index));
  };

  // Handle key press for Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAction();
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '40px 0',
      }}
    >
      <div
        style={{
          fontSize: '2.8rem',
          fontWeight: 700,
          marginBottom: '10px',
          color: '#22223b',
          letterSpacing: '2px',
        }}
      >
        <span style={{ color: '#4f8cff' }}>Todo</span> App
      </div>
      <div
        style={{
          fontSize: '1.3rem',
          fontWeight: 500,
          marginBottom: '30px',
          color: '#4f8cff',
          letterSpacing: '1px',
        }}
      >
        Organize your day efficiently
      </div>
      <div
        style={{
          background: '#fff',
          boxShadow: '0 4px 24px 0 rgba(80, 120, 200, 0.08)',
          borderRadius: '18px',
          padding: '32px 28px',
          width: '100%',
          maxWidth: '420px',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '18px' }}>
          <input
            style={{
              fontSize: '1.1rem',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1.5px solid #1976d2',
              outline: 'none',
              flexGrow: 1,
              marginRight: '12px',
              background: '#e3f0ff',
              color: '#22223b',
              transition: 'border 0.2s',
            }}
            placeholder={editIndex !== null ? 'Edit item...' : 'Add item...'}
            value={userInput}
            onChange={updateInput}
            onKeyPress={handleKeyPress}
          />
          <button
            style={{
              fontSize: '1.1rem',
              padding: '12px 24px',
              background: editIndex !== null ? '#ffb703' : '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(80, 120, 200, 0.10)',
              transition: 'background 0.2s',
            }}
            onClick={handleAction}
          >
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>
        <div style={{ minHeight: '40px' }}>
          {list.length > 0 ? (
            list.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#f5f7fa',
                  borderRadius: '10px',
                  marginBottom: '12px',
                  padding: '12px 16px',
                  boxShadow: '0 1px 4px 0 rgba(80, 120, 200, 0.04)',
                }}
              >
                <span 
                  style={{ 
                    fontSize: '1.1rem', 
                    color: '#22223b', 
                    flexGrow: 1, 
                    wordBreak: 'break-word' 
                  }}
                >
                  {item.value}
                </span>
                <button
                  style={{
                    padding: '8px 14px',
                    background: '#e63946',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    marginRight: '8px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button
                  style={{
                    padding: '8px 14px',
                    background: '#4361ee',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onClick={() => handleStartEdit(index)}
                >
                  Edit
                </button>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', fontSize: '1.1rem', color: '#adb5bd', padding: '18px 0' }}>
              No items in the list
            </div>
          )}
        </div>
      </div>
      <div style={{ color: '#adb5bd', fontSize: '0.95rem', marginTop: '12px' }}>
        &copy; {new Date().getFullYear()} Redux Todo App
      </div>
    </div>
  );
}