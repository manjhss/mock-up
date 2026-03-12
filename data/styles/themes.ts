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
    name: "Vercel",
    meta: {
      img: "https://ik.imagekit.io/manjhss/placeholder-img.png?updatedAt=1765081936295",
    },
    style: {
      backgroundImage: "/dark-blue.jpg",
      textColor: "",
      fontFamily: "",
      borderStyle: "",
      shadowStyle: "",
    },
  },
];
