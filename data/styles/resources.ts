import { Resources } from "@/zod/schema";
import { Pacifico, Sedan } from "next/font/google";

export const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export const sedan = Sedan({
  variable: "--font-sedan",
  subsets: ["latin"],
  weight: "400",
});

export const background = ["/green.jpg"];
export const textColor = ["#000000", "#FFFFFF"];
export const font = ["font-pacifico", "font-sedan"];
export const border = [
  "shadow-xl", // Default
  "border-[0.8cqw] border-white/40 shadow-[inset_0_2px_10px_rgba(255,255,255,0.8),0_4px_15px_rgba(0,0,0,0.1)] backdrop-blur-md", // Glass Light
  "border-[0.8cqw] border-black/40 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5),0_4px_15px_rgba(0,0,0,0.3)] backdrop-blur-md", // Glass Dark
];
export const shadow = ["right", "left", "top", "bottom"];

export const resources: Resources = {
  background,
  textColor,
  font,
  border,
  shadow,
};
