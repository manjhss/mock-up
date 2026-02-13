"use client";

import PreviewCard from "./preview-card";
import { MockUps } from "@/zod/schema";

interface PreviewListProps {
  mockups: MockUps;
}

export default function PreviewList({ mockups }: PreviewListProps) {
  return (
    <div className="space-y-3">
      {mockups.map((mockup, index) => (
        <PreviewCard key={index} mockup={mockup} />
      ))}
    </div>
  );
}
