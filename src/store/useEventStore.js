import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEventStore = create(
  persist(
    (set, get) => ({
      // ==================== SCREEN 1: Blueprint Form ====================
      eventDetails: {
        eventName: "",
        date: "",
        time: "",
        location: "",
        guestCount: "",
        eventType: "",
        budget: "",
        city: "",
        venueType: "",
      },
      setEventDetails: (details) =>
  set((state) => ({
    eventDetails: {
      ...state.eventDetails,
      ...details,
    },
  })),

      theme: null,
      setTheme: (theme) => set({ theme }),


      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),

      activeStep: "form",
      setActiveStep: (step) =>
      set({ activeStep: step.toLowerCase() }),

      formValid: false,
setFormValid: (val) => set({ formValid: val }),

      // ==================== SCREEN 2: Guests ====================
      guests: [],
      addGuest: (guest) =>
        set((state) => ({
          guests: [...state.guests, { id: Date.now(), ...guest }],
        })),
      removeGuest: (guestId) =>
        set((state) => ({
          guests: state.guests.filter((g) => g.id !== guestId),
        })),
      updateGuest: (guestId, updates) =>
        set((state) => ({
          guests: state.guests.map((g) =>
            g.id === guestId ? { ...g, ...updates } : g
          ),
        })),
      clearGuests: () => set({ guests: [] }),

      // ==================== SCREEN 3: Timings ====================
      timings: {
        selectedDate: "",
        timeSlots: [],
      },
      setTimings: (timings) =>
        set((state) => ({
          timings: { ...state.timings, ...timings },
        })),

      // ==================== SCREEN 4: Weather ====================
      weather: {
        temperatureUnit: "C",
        sliderValue: 12,
        backgroundColor: "#fdfdf8",
        sunPosition: 50,
      },
      setWeather: (weather) =>
        set((state) => ({
          weather: { ...state.weather, ...weather },
        })),

      // ==================== SCREEN 5: Budget ====================
      budget: {
        totalBudget: 100,
        allocations: {
          food: 30,
          decor: 25,
          tech: 20,
          performance: 15,
          extras: 10,
        },
      },
      setBudget: (budget) =>
        set((state) => ({
          budget: { ...state.budget, ...budget },
        })),
      setBudgetAllocation: (category, value) =>
        set((state) => ({
          budget: {
            ...state.budget,
            allocations: { ...state.budget.allocations, [category]: value },
          },
        })),

      // ==================== SCREEN 6: Vendors ====================
      vendors: [],
      shortlistVendor: (vendor) =>
        set((state) => ({
          vendors: [
            ...state.vendors,
            { ...vendor, uid: crypto.randomUUID() }, // keep original id
          ],
        })),
      removeVendor: (vendorId) =>
        set((state) => ({
          vendors: state.vendors.filter((v) => v.id !== vendorId),
        })),
      clearVendors: () => set({ vendors: [] }),

      // ==================== SCREEN 7: Menu ====================
      menu: {
        selectedCuisine: null,
        plate: [],
      },
      setMenuCuisine: (cuisine) =>
        set((state) => ({
          menu: { ...state.menu, selectedCuisine: cuisine },
        })),
      addDishToPlate: (dish) =>
        set((state) => ({
          menu: {
            ...state.menu,
            plate: [...state.menu.plate, { id: Date.now(), ...dish }],
          },
        })),
      removeDishFromPlate: (dishId) =>
        set((state) => ({
          menu: {
            ...state.menu,
            plate: state.menu.plate.filter((d) => d.id !== dishId),
          },
        })),
      clearMenu: () =>
        set({ menu: { selectedCuisine: null, plate: [] } }),

      // ==================== SCREEN 8: Timeline ====================
      timeline: [],

      setTimeline: (timeline) => set({ timeline }),

      addTimelineEvent: (event) =>
        set((state) => ({
          timeline: [...state.timeline, event],
        })),

      removeTimelineEvent: (id) =>
        set((state) => ({
          timeline: state.timeline.filter((e) => e.id !== id),
        })),

      reorderTimeline: (newOrder) =>
        set({ timeline: [...newOrder] }),
      clearTimeline: () => set({ timeline: [] }),

      // ==================== SCREEN 9: Extras (Entertainment) ====================
      entertainment: {
        selectedCategory: null,
        selectedArtist: null,
        selectedHost: null,
        selectedLightShow: null,
      },
      setEntertainment: (updates) =>
      set((state) => ({
        entertainment: {
          ...state.entertainment,
          ...updates,
        },
      })),

      // ==================== SCREEN 10: Decor ====================
      decor: {
        selectedTheme: null,
        colorPalette: [],
        items: [],
      },
      setDecor: (decor) =>
        set((state) => ({
          decor: { ...state.decor, ...decor },
        })),


      paletteItems: [
        { id: "led", label: "LED Screen" },
        { id: "stage", label: "Stage" },
        { id: "projector", label: "Projector" },
      ],

      addPaletteItem: (item) =>
        set((state) => ({
          paletteItems: [...state.paletteItems, item],
        })),

      // ==================== SCREEN 11: Poster ====================
      poster: {
        status: "idle", // 'idle' | 'generating' | 'complete'
        generatedData: null,
      },
      setPosterStatus: (status) =>
        set((state) => ({
          poster: { ...state.poster, status },
        })),
      setPosterData: (data) =>
        set((state) => ({
          poster: { ...state.poster, generatedData: data, status: "complete" },
        })),

      // ==================== SCREEN 12: Email Invites ====================
      invites: {
        file: null,
        emailDraft: "",
        isSent: false,
      },
      setInvitesFile: (file) =>
        set((state) => ({
          invites: { ...state.invites, file },
        })),
      setEmailDraft: (draft) =>
        set((state) => ({
          invites: { ...state.invites, emailDraft: draft },
        })),
      setInvitesSent: (sent) =>
        set((state) => ({
          invites: { ...state.invites, isSent: sent },
        })),

      // ==================== Progress Tracking ====================
      currentStep: "form",
      completedSteps: [],

      setStep: (step) => set({ currentStep: step }),

      completeStep: (step) =>
        set((state) => ({
          completedSteps: [...new Set([...state.completedSteps, step])],
        })),

      resetSteps: () =>
        set({
          currentStep: "form",
          completedSteps: [],
        }),

      // ==================== Reset All Data ====================
      resetAll: () =>
        set({
          eventDetails: {
            eventName: "",
            date: "",
            time: "",
            location: "",
            guestCount: "",
            eventType: "",
            budget: "",
            city: "",
            venueType: "",
          },
          guests: [],
          timings: { selectedDate: "", timeSlots: [] },
          weather: {
            temperatureUnit: "C",
            sliderValue: 12,
            backgroundColor: "#fdfdf8",
            sunPosition: 50,
          },
          budget: {
            totalBudget: 100,
            allocations: {
              food: 30,
              decor: 25,
              tech: 20,
              performance: 15,
              extras: 10,
            },
          },
          vendors: [],
          menu: { selectedCuisine: null, plate: [] },
          timeline: [],
          entertainment: {
            selectedCategory: null,
            selectedArtist: null,
            selectedHost: null,
            selectedLightShow: null,
          },
          decor: { selectedTheme: null, colorPalette: [], items: [] },
          poster: { status: "idle", generatedData: null },
          invites: { file: null, emailDraft: "", isSent: false },
          currentStep: "form",
          completedSteps: [],
        }),

      // ==================== Helper: Get All Data for Summary ====================
      getSummaryData: () => {
        const state = get();
        return {
          eventName: state.eventDetails.eventName || "North Star",
          date: state.eventDetails.date || "TBD",
          location: state.eventDetails.location || "TBD",
          guestCount: state.eventDetails.guestCount || state.guests.length || 0,
          budget: state.eventDetails.budget || state.budget.totalBudget || 0,
          theme: state.theme || "TBD",
          budgetBreakdown: Object.entries(state.budget.allocations).map(
            ([category, amount]) => ({
              category:
                category === "performance" ? "Entertainment" : category,
              amount,
            })
          ),
          vendors: state.vendors,
          menu: state.menu.plate,
          timeline: state.timeline,
          entertainment: {
            artist: state.entertainment.selectedArtist,
            host: state.entertainment.selectedHost,
            lightShow: state.entertainment.selectedLightShow,
          },
          decor: state.decor.selectedTheme || "TBD",
          poster: state.poster.generatedData,
          guests: state.guests,
        };
      },
    }),
    {
      name: "event-progress",
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    }
  )
);