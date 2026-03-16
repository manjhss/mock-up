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
    name: "Brownies",
    meta: {
      img: "https://ik.imagekit.io/manjhss/brownies.jpg?updatedAt=1773657140665",
    },
    style: {
      backgroundImage:
        "https://ik.imagekit.io/manjhss/brownies.jpg?updatedAt=1773657140665",
      textColor: "#FFFFFF",
      fontFamily: "font-ramaraja",
      borderStyle: "shadow-xl",
    },
  },
];
