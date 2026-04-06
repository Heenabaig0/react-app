import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./todosSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      todos: todosReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
