import { MockUp, Style } from "@/zod/schema";
import {topToBottom } from "./slides";
import { themes } from "./styles/themes";

export const defaultStyles: Style = themes[0].style;

export const tempMockUp: MockUp = {
  slides: [topToBottom],
};

export * from "./slides";
export * from "./styles/resources";
export * from "./styles/themes";
