import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCanvasStore = create(
  persist(
    (set, get) => ({
      items: [],
      initializedEventType: null,

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
                  ...(typeof updates === "function"
                    ? updates(item)
                    : updates),
                }
              : item
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      setItems: (items) =>
        set(() => ({
          items,
        })),

      clearCanvas: () =>
        set(() => ({
          items: [],
          initializedEventType: null,
        })),

      loadLayout: (layoutItems, eventType) =>
        set(() => ({
          items: layoutItems,
          initializedEventType: eventType,
        })),
    }),
    {
      name: "canvas-storage", // localStorage key
    }
  )
);