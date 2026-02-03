"use client";

import { cn } from "@/lib/utils";
import PreviewCard from "./preview-card";
import { MockUps } from "@/zod/schema";

interface PreviewListProps {
  mockups: MockUps;
  previewCardStyle: "tile" | "card";
}

export default function PreviewList({
  mockups,
  previewCardStyle,
}: PreviewListProps) {
  return (
    <div
      className={cn(
        "grid sm:grid-cols-1 gap-2",
        previewCardStyle === "tile" ? "grid-cols-1" : "xl:grid-cols-2",
      )}
    >
      {mockups.map((mockup, index) => (
        <PreviewCard key={index} mockup={mockup} />
      ))}
    </div>
  );
}
