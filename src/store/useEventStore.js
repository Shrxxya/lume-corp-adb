import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEventStore = create(
    persist(
    (set) => ({
  eventName: "",
  requirements: [],
  guests: [],
  budget: {
    food: 30,
    decor: 30,
    tech: 40,
  },
  timeline: [],

  setEventName: (name) => set({ eventName: name }),

  currentStep: 1,
  completedSteps: [],

  setStep: (step) => set({ currentStep: step }),

  completeStep: (step) =>
    set((state) => ({
      completedSteps: [...new Set([...state.completedSteps, step])],
    })),
    resetSteps: () => set({ currentStep: 1, completedSteps: [] }),
}),
{
      name: "event-progress", // localStorage key
    }
));