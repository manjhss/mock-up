import { ToolId } from "@/features/sandbox/components/tools";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define your state interface
interface State {
  isHydrated: boolean;
  activeTool: ToolId;
}

// Define your actions interface
interface Actions {
  setHydrated: () => void;
  setActiveTool: (toolId: ToolId) => void;
}

// Combine state and actions
type Store = State & Actions;

const initialState: State = {
  isHydrated: false,
  activeTool: "background",
};

// Store with Persist middleware
export const useTools = create<Store>()(
  persist(
    (set) => ({
      // Initial state
      ...initialState,

      // Actions
      setHydrated: () =>
        set(() => ({
          isHydrated: true,
        })),

      setActiveTool: (toolId: ToolId) =>
        set(() => ({
          activeTool: toolId,
        })),
    }),
    {
      name: "tools", // localStorage key
      partialize: (state) => {
        const { isHydrated, setHydrated, setActiveTool, ...rest } = state;
        return rest;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
