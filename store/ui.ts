import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define your state interface
interface State {
  isHydrated: boolean;
  expandedSlides: Set<string>;
  slideSidebarState: "expanded" | "collapsed";
  styleSidebarState: "expanded" | "collapsed";
}

// Define your actions interface
interface Actions {
  setHydrated: () => void;
  toggleSlide: (id: string) => void;
  setExpandedSlides: (slides: Set<string>) => void;
  setSlideSidebarOpen: (open: boolean) => void;
  setStyleSidebarOpen: (open: boolean) => void;
}

// Combine state and actions
type Store = State & Actions;

const initialState: State = {
  isHydrated: false,
  expandedSlides: new Set<string>(),
  slideSidebarState: "expanded",
  styleSidebarState: "collapsed",
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

      toggleSlide: (id: string) =>
        set((state) => {
          const newSet = new Set(state.expandedSlides);
          if (newSet.has(id)) {
            newSet.delete(id);
          } else {
            newSet.add(id);
          }
          return { expandedSlides: newSet };
        }),

      setExpandedSlides: (slides: Set<string>) =>
        set(() => ({
          expandedSlides: slides,
        })),

      setSlideSidebarOpen: (open: boolean) =>
        set(() => ({
          slideSidebarState: open ? "expanded" : "collapsed",
        })),

      setStyleSidebarOpen: (open: boolean) =>
        set(() => ({
          styleSidebarState: open ? "expanded" : "collapsed",
        })),
    }),
    {
      name: "ui", // localStorage key
      partialize: (state) => {
        const {
          isHydrated,
          setHydrated,
          toggleSlide,
          setExpandedSlides,
          setSlideSidebarOpen: setLeftSidebarOpen,
          setStyleSidebarOpen: setRightSidebarOpen,
          ...rest
        } = state;
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
          expandedSlides: new Set(persistedState?.expandedSlides || []),
          slideSidebarState: persistedState?.slideSidebarState || "expanded",
          styleSidebarState: persistedState?.styleSidebarState || "collapsed",
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
