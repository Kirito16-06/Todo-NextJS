import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TodoItem {
  id: string;
  value: string;
}

interface TodoState {
  userInput: string;
  list: TodoItem[];
  editIndex: number | null;
}

const initialState: TodoState = {
  userInput: '',
  list: [],
  editIndex: null,
};

// Helper function to load from localStorage
const loadFromLocalStorage = (): TodoItem[] => {
  if (typeof window !== 'undefined') {
    const savedList = localStorage.getItem('todo-list');
    return savedList ? JSON.parse(savedList) : [];
  }
  return [];
};

// Helper function to save to localStorage
const saveToLocalStorage = (list: TodoItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('todo-list', JSON.stringify(list));
  }
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
    loadTodos: (state) => {
      state.list = loadFromLocalStorage();
    },
    addTodo: (state) => {
      if (state.userInput.trim() === '') return;

      const newItem: TodoItem = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID 
          ? crypto.randomUUID() 
          : Math.random().toString(),
        value: state.userInput,
      };
      
      state.list.push(newItem);
      state.userInput = '';
      saveToLocalStorage(state.list);
    },
    updateTodo: (state) => {
      if (state.userInput.trim() === '' || state.editIndex === null) return;

      state.list[state.editIndex].value = state.userInput;
      state.userInput = '';
      state.editIndex = null;
      saveToLocalStorage(state.list);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(item => item.id !== action.payload);
      saveToLocalStorage(state.list);
    },
    startEdit: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.userInput = state.list[index].value;
      state.editIndex = index;
    },
    cancelEdit: (state) => {
      state.userInput = '';
      state.editIndex = null;
    },
  },
});

export const {
  setUserInput,
  loadTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  startEdit,
  cancelEdit,
} = todoSlice.actions;

export default todoSlice.reducer;