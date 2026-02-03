import { tempMockUp } from "@/data/temp-mock-up";
import { MockUp, MockUps } from "@/zod/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Define your state interface
interface State {
  isHydrated: boolean;
  tempMockUp: MockUp; // Temporary mock-up being edited in the sidebar
  userMockUps: MockUps; // Recently edited mock-ups by the user
  resetCounter: number; // Counter to trigger form reset
}

// Define your actions interface
interface Actions {
  setHydrated: () => void;
  setTempMockUp: (mockUp: MockUp) => void;
  clearTempMockUp: () => void;
  setUserMockUps: (mockUps: MockUps) => void;
}

// Combine state and actions
type Store = State & Actions;

const initialState: State = {
  isHydrated: false,
  tempMockUp: tempMockUp,
  userMockUps: [] as MockUps,
  resetCounter: 0,
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

      clearTempMockUp: () =>
        set((state) => {
          state.tempMockUp = tempMockUp;
          state.resetCounter += 1;
        }),

      setUserMockUps: (mockUps: MockUps) =>
        set((state) => {
          state.userMockUps = mockUps;
        }),
    })),
    {
      name: "mock-up", // localStorage key
      partialize: (state) => {
        const { isHydrated, setHydrated, resetCounter, ...rest } = state;
        return rest;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
