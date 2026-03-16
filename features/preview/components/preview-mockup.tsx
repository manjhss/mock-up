"use client";

import { useRef, useState } from "react";
import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { MockUp } from "@/zod/schema";
import { PreviewSlideCarousel } from "@/features/preview/components/preview-slide-carousel";
import { cn } from "@/lib/utils";
import { exportSlides } from "@/lib/export-slides";
import { Spinner } from "@/components/ui/spinner";

export default function PreviewMockUp({ mockup }: { mockup: MockUp }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardRef.current || isExporting) return;

    const slideElements =
      cardRef.current.querySelectorAll<HTMLElement>(".slide-export-item");
    if (slideElements.length > 0) {
      try {
        setIsExporting(true);
        await exportSlides(Array.from(slideElements));
      } catch (error) {
        console.error("Export failed:", error);
      } finally {
        setIsExporting(false);
      }
    }
  };

  return (
    <Card ref={cardRef} className={cn("pt-2.5 pb-0 gap-3 bg-sidebar h-full")}>
      <CardHeader className="flex items-center justify-end">
        <CardAction className="flex gap-1">
          <Button
            size={"icon"}
            variant={"ghost"}
            className={"rounded-md!"}
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? <Spinner /> : <Icon icon={Download01Icon} />}
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="bg-background h-full p-3">
        <PreviewSlideCarousel slides={mockup.slides} />
      </CardContent>
    </Card>
  );
}
