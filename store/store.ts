import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./todosSlice";
import { shoppingReducer } from "./shoppingSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      todos: todosReducer,
      shopping: shoppingReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
