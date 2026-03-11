import { MockUp, Slide } from "@/zod/schema";
import { DefaultSlide } from "./mockup/default/template/default-slide";

export const defaultSlide: Slide = {
  id: "default-slide",
  data: {
    logo: "",
    heading: "mockup",
    description: "create mockup instantly",
    media:
      "https://ik.imagekit.io/manjhss/placeholder-img.png?updatedAt=1765081936295",
  },
  componentName: "DefaultSlide",
  component: DefaultSlide,
};

export const slides: Slide[] = [defaultSlide];

export const background = ["/green.jpg", "/dark-blue.jpg", "/orange.jpg"];
export const textColor = ["#000000", "#FFFFFF"];
export const font = ["lotion", "sans-serif", "serif"];
export const border = ["border-center", "border-thick", "border-dashed"];
export const shadow = ["right", "left", "top", "bottom"];

export const defaultStyles: MockUp["slides"][number]["style"] = {
  backgroundImage:
    background[0],
  textColor: textColor[0],
  fontFamily: font[0],
};

export const resources = {
  background,
  textColor,
  font,
  border,
  shadow,
};

export const tempMockUp: MockUp = {
  slides: [defaultSlide],
};
