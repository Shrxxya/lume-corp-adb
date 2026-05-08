import { create } from "zustand";

export const useCanvasStore = create((set, get) => ({
  items: [],
  hasInitializedLayout: false,

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

  // NEW: replace entire canvas
  setItems: (items) =>
    set(() => ({
      items,
    })),

  // NEW: clear canvas
  clearCanvas: () =>
    set(() => ({
      items: [],
      hasInitializedLayout: false,
    })),

  // NEW: load preset layout safely
  loadLayout: (layoutItems) => {
    set(() => ({
      items: layoutItems,
    }));
  },
}));