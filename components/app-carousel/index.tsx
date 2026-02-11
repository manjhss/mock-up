"use client";

import { useEffect, useRef, useState } from "react";
import { Slides } from "@/zod/schema";
import { cn } from "@/lib/utils";
import AppCarouselItem from "./app-carousel-item";

export function AppCarousel({ slides }: { slides: Slides }) {
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
            <AppCarouselItem key={index} slide={slide} index={index} />
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
