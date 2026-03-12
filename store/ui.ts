import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  isHydrated: boolean;
  expandedSlides: Set<string>;
  slideSidebarState: "expanded" | "collapsed";
  styleSidebarState: "expanded" | "collapsed";
}

interface Actions {
  setHydrated: () => void;
  toggleSlide: (id: string) => void;
  setExpandedSlides: (slides: Set<string>) => void;
  setSlideSidebarOpen: (open: boolean) => void;
  setStyleSidebarOpen: (open: boolean) => void;
}

type Store = State & Actions;

const initialState: State = {
  isHydrated: false,
  expandedSlides: new Set<string>(),
  slideSidebarState: "expanded",
  styleSidebarState: "expanded",
};

export const useUI = create<Store>()(
  persist(
    (set) => ({
      ...initialState,

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
      name: "ui",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
