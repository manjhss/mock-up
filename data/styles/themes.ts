import { Style } from "@/zod/schema";

interface Theme {
  name: string;
  meta: {
    img: string;
  };
  style: Style;
}

export const themes: Theme[] = [
  {
    name: "Candy",
    meta: {
      img: "https://ik.imagekit.io/manjhss/pexels-codioful-7130474.jpg",
    },
    style: {
      backgroundImage:
        "https://ik.imagekit.io/manjhss/pexels-codioful-7130474.jpg",
      textColor: "#000000",
      fontFamily: "font-pacifico",
      borderStyle: "shadow-xl",
    },
  },
  {
    name: "Chocolate",
    meta: {
      img: "https://ik.imagekit.io/manjhss/brownies.jpg",
    },
    style: {
      backgroundImage:
        "https://ik.imagekit.io/manjhss/brownies.jpg",
      textColor: "#FFFFFF",
      fontFamily: "font-sedan",
      borderStyle: "shadow-xl",
    },
  },
  {
    name: "Rainbowie",
    meta: {
      img: "https://ik.imagekit.io/manjhss/pixel_rainbow",
    },
    style: {
      backgroundImage: "https://ik.imagekit.io/manjhss/pixel_rainbow",
      textColor: "#000000",
      fontFamily: "font-pixelify-sans",
      borderStyle: "shadow-xl",
    },
  },
];
