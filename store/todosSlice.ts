import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export type Todo = { id: string; text: string };

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
        if (!action.payload.text) return;
        state.items.push(action.payload);
      },
      prepare(text: string) {
        const trimmed = text.trim();
        return {
          payload: { id: nanoid(), text: trimmed },
        };
      },
    },
    editTodo(state, action: PayloadAction<{ id: string; text: string }>) {
      const next = action.payload.text.trim();
      if (!next) return;
      const item = state.items.find((t) => t.id === action.payload.id);
      if (item) item.text = next;
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTodo, editTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
