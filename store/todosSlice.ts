import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  text: string;
};

type TodosState = {
  items: Todo[];
};

const initialState: TodosState = {
  items: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.items.push(action.payload);
      },
      prepare(text: string) {
        return { payload: { id: nanoid(), text: text.trim() } };
      },
    },
    updateTodo(
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) {
      const todo = state.items.find((t) => t.id === action.payload.id);
      if (todo) todo.text = action.payload.text.trim();
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
