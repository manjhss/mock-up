"use client";

import SandboxHeader from "./sandbox-header";
import Tools from "./tools";
import { ResourceCarousel } from "./resource-carousel";
import { SandboxCarousel } from "./carousel";
import { useMockUp } from "@/store/mock-up";
import { Resources, Slides } from "@/zod/schema";

export default function SandboxIdView({ id }: { id: string }) {
  const { userMockUps } = useMockUp();

  const mockUp = userMockUps.find((mockUp) => mockUp.id === id);
  const slides = (mockUp ? mockUp.slides : []) as Slides;
  const resource = (mockUp ? mockUp.resources : {}) as Resources;

  return (
    <div className="flex flex-col h-full bg-background">
      <SandboxHeader name={mockUp ? (mockUp.name as string) : ""} />

      <div className="flex-13">
        <div className="h-full p-3">
          <SandboxCarousel slides={slides} />
        </div>
      </div>

      <ResourceCarousel resources={resource} />
      <Tools />
    </div>
  );
}
