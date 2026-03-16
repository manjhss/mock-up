import { Slide } from "@/zod/schema";
import { TopToBottom } from "./comp/top-to-bottom";
import { BottomToTop } from "./comp/bottom-to-top";
import { LeftToRight } from "./comp/left-to-right";
import { RightToLeft } from "./comp/right-to-left";

export const defaultData: Slide["data"] = {
  logo: "",
  heading: "title goes here",
  description:
    "description - by double clicking on the text, you can edit it.",
  media:
    "/upload.png",
};

export const topToBottom: Slide = {
  id: "top-to-bottom",
  data: defaultData,
  componentName: "TopToBottom",
  component: TopToBottom,
};

export const bottomToTop: Slide = {
  id: "bottom-to-top",
  data: defaultData,
  componentName: "BottomToTop",
  component: BottomToTop,
};

export const leftToRight: Slide = {
  id: "left-to-right",
  data: defaultData,
  componentName: "LeftToRight",
  component: LeftToRight,
};

export const rightToLeft: Slide = {
  id: "right-to-left",
  data: defaultData,
  componentName: "RightToLeft",
  component: RightToLeft,
};

export const slides: Slide[] = [
  topToBottom,
  leftToRight,
  rightToLeft,
  bottomToTop,
];
