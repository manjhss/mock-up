import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define your state interface
interface State {
  isHydrated: boolean;
  expandedSlides: Set<number>;
}

// Define your actions interface
interface Actions {
  setHydrated: () => void;
  toggleSlide: (index: number) => void;
  setExpandedSlides: (slides: Set<number>) => void;
}

// Combine state and actions
type Store = State & Actions;

const initialState: State = {
  isHydrated: false,
  expandedSlides: new Set([0]),
};

// Store with Persist middleware (no Immer for Set compatibility)
export const useUI = create<Store>()(
  persist(
    (set) => ({
      // Initial state
      ...initialState,

      // Actions
      setHydrated: () =>
        set(() => ({
          isHydrated: true,
        })),

      toggleSlide: (index: number) =>
        set((state) => {
          const newSet = new Set(state.expandedSlides);
          if (newSet.has(index)) {
            newSet.delete(index);
          } else {
            newSet.add(index);
          }
          return { expandedSlides: newSet };
        }),

      setExpandedSlides: (slides: Set<number>) =>
        set(() => ({
          expandedSlides: slides,
        })),
    }),
    {
      name: "ui", // localStorage key
      partialize: (state) => {
        const { isHydrated, setHydrated, toggleSlide, setExpandedSlides, ...rest } = state;
        return {
          ...rest,
          // Convert Set to Array for JSON serialization
          expandedSlides: Array.from(rest.expandedSlides),
        };
      },
      merge: (persistedState: any, currentState) => {
        return {
          ...currentState,
          ...persistedState,
          // Convert Array back to Set
          expandedSlides: new Set(persistedState?.expandedSlides || [0]),
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
