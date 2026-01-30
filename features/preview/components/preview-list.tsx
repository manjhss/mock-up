"use client";

import { cn } from "@/lib/utils";
import PreviewCard from "./preview-card";

interface PreviewListProps {
  previewCardStyle: "tile" | "card";
}

export default function PreviewList({ previewCardStyle }: PreviewListProps) {
  return (
    <div
      className={cn(
        "grid sm:grid-cols-1 gap-2",
        previewCardStyle === "tile" ? "grid-cols-1" : "xl:grid-cols-2",
      )}
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <PreviewCard key={index} />
      ))}
    </div>
  );
}
