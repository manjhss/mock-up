import { Slide } from "@/zod/schema";
import { TopToBottom } from "./comp/top-to-bottom";

export const topToBottom: Slide = {
  id: "default-slide",
  data: {
    logo: "",
    heading: "mockup",
    description: "create mockup instantly",
    media:
      "https://ik.imagekit.io/manjhss/placeholder-img.png?updatedAt=1765081936295",
  },
  componentName: "TopToBottom",
  component: TopToBottom,
};

export const slides: Slide[] = [topToBottom];
