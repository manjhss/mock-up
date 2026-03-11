import { preset } from "@/data/presets";
import { tempMockUp } from "@/data";
import { MockUp, MockUps } from "@/zod/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Define your state interface
interface State {
  isHydrated: boolean;
  presets: MockUps; // Original preset mock-ups (read-only, always reset on load)
  userMockups: MockUps; // User-edited mockups (persisted)
  tempMockUp: MockUp; // Temporary mock-up being edited in the sidebar
  selectedMockUp: MockUp; // Currently selected mock-up for styling and preview
  resetCounter: number; // Counter to trigger form reset
}

// Define your actions interface
interface Actions {
  setHydrated: () => void;
  setPresets: (presets: MockUps) => void;
  addOrUpdateUserMockup: (mockup: MockUp) => void;
  setTempMockUp: (mockUp: MockUp) => void;
  clearTempMockUp: () => void;
  setSelectedMockUp: (mockUp: MockUp) => void;
}

// Combine state and actions
type Store = State & Actions;

const initialState: State = {
  isHydrated: false,
  tempMockUp: tempMockUp,
  selectedMockUp: {} as MockUp,
  resetCounter: 0,
  presets: preset as MockUps,
  userMockups: [],
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
          // Always reset presets to original on hydration
          state.presets = preset as MockUps;

          // Sync selectedMockUp resources with fresh preset data
          // This ensures selectedMockUp has the latest resources after reload
          const freshPreset = preset.find(
            (p) => p.id === state.selectedMockUp.id,
          );
          if (freshPreset) {
            state.selectedMockUp = {
              ...state.selectedMockUp,
              resources: freshPreset.resources,
            };
          }
        }),

      setPresets: (presets: MockUps) =>
        set((state) => {
          state.presets = presets;
        }),

      addOrUpdateUserMockup: (mockup: MockUp) =>
        set((state) => {
          const existingIndex = state.userMockups.findIndex(
            (m) => m.id === mockup.id,
          );
          if (existingIndex >= 0) {
            // Update existing user mockup
            state.userMockups[existingIndex] = mockup;
          } else {
            // Add new user mockup
            state.userMockups.push(mockup);
          }
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

      setSelectedMockUp: (mockUp: MockUp) =>
        set((state) => {
          state.selectedMockUp = mockUp;
        }),
    })),
    {
      name: "mockup", // localStorage key
      partialize: (state) => {
        // Only persist userMockups, selectedMockUp, and tempMockUp
        // presets will always be loaded from the original import
        const { isHydrated, setHydrated, resetCounter, presets, ...rest } =
          state;
        return rest;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
