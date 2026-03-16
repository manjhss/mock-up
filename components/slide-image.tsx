"use client";

import Image from "next/image";
import { useRef } from "react";
import { useMockup } from "@/store/mockup";
import { cn } from "@/lib/utils";

interface SlideImageProps {
  src: string;
  slideId?: string;
  readOnly?: boolean;
  side?: string;
}

export default function SlideImage({
  src,
  slideId,
  readOnly,
  side,
}: SlideImageProps) {
  const { updateSlideData } = useMockup();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !slideId) return;
    const url = URL.createObjectURL(file);
    updateSlideData(slideId, "media", url);
  }

  const positions: Record<string, string> = {
    top: "object-top",
    bottom: "object-bottom",
    left: "object-right",
    right: "object-left",
    center: "object-center",
  };

  const objectPosition = positions[side as string] || "object-center";

  return (
    <>
      {src && (
        <Image
          src={src}
          alt="Mockup Preview"
          fill
          className={cn("object-cover", objectPosition)}
          priority
        />
      )}

      {!readOnly && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => inputRef.current?.click()}
          />
        </>
      )}
    </>
  );
}
