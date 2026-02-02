import { MockUps } from "@/zod/schema";

export const presets: MockUps = [
  {
    id: "default",
    nickname: "default",
    name: "Default Preset",
    slides: [
      {
        id: "slide1",
        logo: {
          content: "https://example.com/logo.png",
          style: {
            position: {
              x: 12,
              y: 24,
            },
            size: {
              width: 24,
              height: 48,
            },
          },
        },
        heading: {
          content: "Example Slide Heading",
          style: {
            position: {
              x: 12,
              y: 24,
            },
            size: {
              width: 24,
              height: 48,
            },
          },
        },
        description: {
          content: "Example slide description content goes here.",
          style: {
            position: {
              x: 12,
              y: 24,
            },
            size: {
              width: 24,
              height: 48,
            },
          },
        },
      },
    ],
    resources: {
      background: [
        {
          id: "bg1",
          url: "https://example.com/background1.png",
          alt: "Background Image 1",
          style: {
            position: {
              x: 12,
              y: 24,
            },
            size: {
              width: 24,
              height: 48,
            },
          },
        },
      ],
    },
    tags: ["trending", "minimalist"],
  },
];
