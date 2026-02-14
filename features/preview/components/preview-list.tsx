"use client";

import PreviewCard from "./preview-card";
import { MockUps } from "@/zod/schema";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Icon from "@/components/icon";
import { Search01Icon } from "@hugeicons/core-free-icons";

interface PreviewListProps {
  mockups: MockUps;
}

export default function PreviewList({ mockups }: PreviewListProps) {
  if (mockups.length === 0) {
    return (
      <Empty className="h-60">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon icon={Search01Icon} />
          </EmptyMedia>
          <EmptyTitle>No mockups found</EmptyTitle>
          <EmptyDescription>
            Try adjusting your search or filters 
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="space-y-3">
      {mockups.map((mockup, index) => (
        <PreviewCard key={mockup.id || index} mockup={mockup} />
      ))}
    </div>
  );
}
