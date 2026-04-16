import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  bought: boolean;
};

type ShoppingState = {
  items: ShoppingItem[];
};

const initialState: ShoppingState = {
  items: [],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addShoppingItem: {
      reducer(state, action: PayloadAction<ShoppingItem>) {
        state.items.push(action.payload);
      },
      prepare(name: string, quantity: number) {
        return {
          payload: {
            id: nanoid(),
            name: name.trim(),
            quantity: Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1,
            bought: false,
          },
        };
      },
    },
    updateShoppingItem(
      state,
      action: PayloadAction<{ id: string; name: string; quantity: number }>
    ) {
      const item = state.items.find((it) => it.id === action.payload.id);
      if (!item) return;

      const nextName = action.payload.name.trim();
      const nextQuantity = Math.max(1, Math.floor(action.payload.quantity));
      if (nextName) item.name = nextName;
      item.quantity = nextQuantity;
    },
    toggleBought(state, action: PayloadAction<string>) {
      const item = state.items.find((it) => it.id === action.payload);
      if (item) item.bought = !item.bought;
    },
    deleteShoppingItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((it) => it.id !== action.payload);
    },
  },
});

export const { addShoppingItem, updateShoppingItem, toggleBought, deleteShoppingItem } =
  shoppingSlice.actions;
export const shoppingReducer = shoppingSlice.reducer;
