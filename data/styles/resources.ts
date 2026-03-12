import { Resources } from "@/zod/schema";

export const background = ["/green.jpg", "/dark-blue.jpg", "/orange.jpg"];
export const textColor = ["#000000", "#FFFFFF"];
export const font = ["lotion", "sans-serif", "serif"];
export const border = ["border-center", "border-thick", "border-dashed"];
export const shadow = ["right", "left", "top", "bottom"];

export const resources: Resources = {
  background,
  textColor,
  font,
  border,
  shadow,
};