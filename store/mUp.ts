import { defaultSlide, defaultStyles, tempMockUp } from "@/data";
import { MockUp } from "@/zod/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface State {
  isHydrated: boolean;
  tempMockUp: MockUp;
  tempMockUpStyles: MockUp["slides"][number]["style"];
  resetCounter: number; // Counter to trigger form reset
}

interface Actions {
  setHydrated: () => void;
  addSlide: (slide: MockUp["slides"][number]) => void;
  updateTempMockUpStyles: (styles: MockUp["slides"][number]["style"]) => void;
  updateSlideData: (
    slideId: string,
    field: keyof MockUp["slides"][number]["data"],
    value: string,
  ) => void;

  clearTempMockUp: () => void;
  clearTempMockUpStyles: () => void;
}

type Store = State & Actions;

const initialState: State = {
  isHydrated: false,
  tempMockUp: tempMockUp,
  tempMockUpStyles: defaultStyles,
  resetCounter: 0,
};

export const useMUp = create<Store>()(
  persist(
    immer((set) => ({
      ...initialState,

      setHydrated: () =>
        set((state) => {
          state.isHydrated = true;
        }),

      addSlide: (slide) =>
        set((state) => {
          const updateSlide = {
            id: `slide${state.tempMockUp.slides.length + 1}`,
            data: defaultSlide.data,
            componentName: slide.componentName,
            component: slide.component,
          };
          state.tempMockUp.slides.push(updateSlide);
        }),

      updateTempMockUpStyles: (styles) =>
        set((state) => {
          state.tempMockUpStyles = styles;
        }),

      updateSlideData: (slideId, field, value) =>
        set((state) => {
          const slide = state.tempMockUp.slides.find((s) => s.id === slideId);
          if (slide) slide.data[field] = value;
        }),

      clearTempMockUp: () =>
        set((state) => {
          state.tempMockUp = tempMockUp;
          state.resetCounter += 1;
        }),

      clearTempMockUpStyles: () =>
        set((state) => {
          state.tempMockUpStyles = defaultStyles;
        }),
    })),
    {
      name: "mUp",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
