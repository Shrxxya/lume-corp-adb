import { create } from "zustand";

export const useCanvasStore = create((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              ...(typeof updates === "function" ? updates(item) : updates),
            }
          : item
      ),
    })),
}));