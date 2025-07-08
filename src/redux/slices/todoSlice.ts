import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoItem {
  id: string | number;
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

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
    setList: (state, action: PayloadAction<TodoItem[]>) => {
      state.list = action.payload;
    },
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.list.push(action.payload);
      state.userInput = '';
    },
    deleteTodo: (state, action: PayloadAction<string | number>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    startEdit: (state, action: PayloadAction<number>) => {
      state.userInput = state.list[action.payload].value;
      state.editIndex = action.payload;
    },
    updateTodo: (state) => {
      if (state.editIndex !== null) {
        state.list[state.editIndex].value = state.userInput;
        state.editIndex = null;
        state.userInput = '';
      }
    },
  },
});

export const {
  setUserInput,
  setList,
  addTodo,
  deleteTodo,
  startEdit,
  updateTodo,
} = todoSlice.actions;

export default todoSlice.reducer;

export type { TodoItem, TodoState };