import { ToolId } from "@/features/sandbox/components/tools";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define your state interface
interface State {
  isHydrated: boolean;
  selectedBackgroundId: string | null;
  selectedFontId: string | null;
  selectedBorderId: string | null;
  selectedShadowId: string | null;
}

// Define your actions interface
interface Actions {
  setHydrated: () => void;
  setSelectedResource: (toolId: ToolId, resourceId: string) => void;
  clearSelectedResource: (toolId: ToolId) => void;
  getSelectedResourceId: (toolId: ToolId) => string | null;
}

// Combine state and actions
type Store = State & Actions;

const initialState: State = {
  isHydrated: false,
  selectedBackgroundId: null,
  selectedFontId: null,
  selectedBorderId: null,
  selectedShadowId: null,
};

// Store with Persist middleware
export const useResource = create<Store>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,

      // Actions
      setHydrated: () =>
        set(() => ({
          isHydrated: true,
        })),

      setSelectedResource: (toolId: ToolId, resourceId: string) =>
        set(() => {
          switch (toolId) {
            case "background":
              return { selectedBackgroundId: resourceId };
            case "font":
              return { selectedFontId: resourceId };
            case "border":
              return { selectedBorderId: resourceId };
            case "shadow":
              return { selectedShadowId: resourceId };
            default:
              return {};
          }
        }),

      clearSelectedResource: (toolId: ToolId) =>
        set(() => {
          switch (toolId) {
            case "background":
              return { selectedBackgroundId: null };
            case "font":
              return { selectedFontId: null };
            case "border":
              return { selectedBorderId: null };
            case "shadow":
              return { selectedShadowId: null };
            default:
              return {};
          }
        }),

      getSelectedResourceId: (toolId: ToolId) => {
        const state = get();
        switch (toolId) {
          case "background":
            return state.selectedBackgroundId;
          case "font":
            return state.selectedFontId;
          case "border":
            return state.selectedBorderId;
          case "shadow":
            return state.selectedShadowId;
          default:
            return null;
        }
      },
    }),
    {
      name: "resource", // localStorage key
      partialize: (state) => {
        const { isHydrated, setHydrated, setSelectedResource, clearSelectedResource, getSelectedResourceId, ...rest } = state;
        return rest;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
