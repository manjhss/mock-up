import { MockUp, MockUps } from "@/zod/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Define your state interface
interface State {
  isHydrated: boolean;
  tempMockUp: MockUp; // Temporary mock-up being edited in the sidebar
  userMockUps: MockUps; // Recently edited mock-ups by the user
}

// Define your actions interface
interface Actions {
  setHydrated: () => void;
  setTempMockUp: (mockUp: MockUp) => void;
  setUserMockUps: (mockUps: MockUps) => void;
}

// Combine state and actions
type Store = State & Actions;

const initialState: State = {
  isHydrated: false,
  tempMockUp: null as unknown as MockUp,
  userMockUps: [] as MockUps,
};

// Store with Immer and Persist middleware
export const useMockUp = create<Store>()(
  persist(
    immer((set) => ({
      // Initial state
      ...initialState,

      // Actions
      setHydrated: () =>
        set((state) => {
          state.isHydrated = true;
        }),

      setTempMockUp: (mockUp: MockUp) =>
        set((state) => {
          state.tempMockUp = mockUp;
        }),

      setUserMockUps: (mockUps: MockUps) =>
        set((state) => {
          state.userMockUps = mockUps;
        }),
    })),
    {
      name: "mock-up", // localStorage key
      partialize: (state) => {
        const { isHydrated, setHydrated, ...rest } = state;
        return rest;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
