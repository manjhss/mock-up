"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { MockUp, Slide, Slides } from "@/zod/schema";
import { useMockUp } from "@/store/mockup";
import { useTools } from "@/store/tools";
import { useResource } from "@/store/resource";

export default function PreviewCard({ mockup }: { mockup: MockUp }) {
  const { addUserMockUp } = useMockUp();
  const { setActiveTool } = useTools();
  const { setSelectedResource, clearSelectedResource } = useResource();

  const router = useRouter();

  const handleEdit = () => {
    // Generate unique ID
    const uniqueId = crypto.randomUUID();

    // Create mockup with the unique ID, preserving component references and names
    const mockupWithId: MockUp = {
      ...mockup,
      id: uniqueId,
      slides: mockup.slides.map((slide) => ({
        ...slide,
        component: slide.component, // Preserve component reference
        componentName: slide.componentName, // Preserve component name for persistence
      })),
    };

    // Add to store
    addUserMockUp(mockupWithId);

    // Set Active Tool to Background by default
    setActiveTool("background");

    // Extract and set resources from mockup
    if (mockup.resources) {
      // Set first background image if available
      if (
        mockup.resources.background &&
        mockup.resources.background.length > 0
      ) {
        setSelectedResource("background", mockup.resources.background[0]);
      } else {
        clearSelectedResource("background");
      }

      // Set first font if available
      if (mockup.resources.font && mockup.resources.font.length > 0) {
        setSelectedResource("font", "font-0");
      } else {
        clearSelectedResource("font");
      }

      // Set first border if available
      if (mockup.resources.border && mockup.resources.border.length > 0) {
        setSelectedResource("border", "border-0");
      } else {
        clearSelectedResource("border");
      }

      // Set first shadow if available
      if (mockup.resources.shadow && mockup.resources.shadow.length > 0) {
        setSelectedResource("shadow", "shadow-0");
      } else {
        clearSelectedResource("shadow");
      }
    } else {
      // Clear all resources if mockup has no resources
      clearSelectedResource("background");
      clearSelectedResource("font");
      clearSelectedResource("border");
      clearSelectedResource("shadow");
    }

    // Redirect to sandbox page
    router.push(`/sandbox/${uniqueId}`);
  };

  return (
    <Card className="p-0 gap-3 bg-sidebar">
      <CardHeader className="pt-3 flex items-center justify-between">
        <CardTitle>{mockup.name}</CardTitle>
        <CardAction className="flex gap-1">
          <Button onClick={handleEdit}>Edit</Button>

          <Button size="icon" variant={"ghost"}>
            <Icon icon={Download01Icon} />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="bg-background h-80 p-3">
        <Carousel slides={mockup.slides} />
      </CardContent>
    </Card>
  );
}

export function Carousel({ slides }: { slides: Slides }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      // Calculate scroll percentage (0 to 1)
      const scrollPercentage = maxScroll > 0 ? scrollLeft / maxScroll : 0;

      // Map percentage to slide index
      const newSlide = Math.round(scrollPercentage * (totalSlides - 1));

      setCurrentSlide(newSlide);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const slideWidth = container.scrollWidth / totalSlides;
    container.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex-1 flex items-center justify-center">
        <div
          ref={scrollRef}
          className="h-full flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-md"
        >
          {slides.map((slide, index) => (
            <CarouselItem key={index} slide={slide} index={index} />
          ))}
        </div>
      </div>

      {/* Dots */}
      <ul className="flex justify-center gap-1">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <li
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all cursor-pointer",
              currentSlide === index
                ? "bg-foreground w-5"
                : "bg-foreground/30 hover:bg-foreground/50 w-1.5 aspect-square",
            )}
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </ul>
    </div>
  );
}

function CarouselItem({ slide, index }: { slide: Slide; index: number }) {
  const { tempMockUp } = useMockUp();

  // const headingContent = tempMockUp.slides[index]?.heading.content;
  // const displayContent =
  //   headingContent && headingContent.trim() !== ""
  //     ? headingContent
  //     : slide.heading.content;

  return (
    <div className="h-full aspect-video bg-sidebar flex items-center justify-center rounded-md shrink-0">
      {/* <span className="text-4xl font-semibold">{displayContent}</span> */}
    </div>
  );
}
