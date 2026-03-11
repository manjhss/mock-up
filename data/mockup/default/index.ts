import { DefaultSlide } from "./template/default-slide";

export const background = ["/green.jpg", "/dark-blue.jpg", "/orange.jpg"];

export const textColor = ["#000000", "#FFFFFF"];
export const font = ["lotion", "sans-serif", "serif"];
export const border = ["border-center", "border-thick", "border-dashed"];
export const shadow = ["right", "left", "top", "bottom"];

export const trial = {
  id: "default",
  nickname: "default",
  name: "Default",
  slides: [
    {
      id: "slide1",
      component: DefaultSlide,
      componentName: "DefaultSlide",
      data: {
        logo: "https://example.com/logo.png",
        heading: "Chat with your data and get instant answers",
        description: "How can I increase my average order value?",
        media:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      },
      style: {
        backgroundImage:
          "https://ik.imagekit.io/manjhss/placeholder-img.png?updatedAt=1765081936295",
      },
    },
  ],
  resources: {
    background,
    textColor,
    font,
    border,
    shadow,
  },
  tags: ["trending"],
};
