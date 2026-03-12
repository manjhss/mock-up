"use client";

import Image from "next/image";
import { useRef } from "react";
import { useMockup } from "@/store/mockup";
import { Style } from "@/zod/schema";

interface SlideImageProps {
  src: string;
  style: Style;
  slideId?: string;
  readOnly?: boolean;
}

export default function SlideImage({
  src,
  style,
  slideId,
  readOnly,
}: SlideImageProps) {
  const { updateSlideData } = useMockup();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !slideId) return;
    const url = URL.createObjectURL(file);
    updateSlideData(slideId, "media", url);
  }

  return (
    <div
      className="w-[90cqw] flex-1 min-h-0 rounded-[2cqw] overflow-hidden translate-y-[3cqw] relative"
      style={{
        border: style.borderStyle,
        boxShadow: style.shadowStyle,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt="Mockup Preview"
          fill
          className="object-cover object-top"
          priority
        />
      ) : (
        !readOnly && (
          <div className="w-full h-full flex items-center justify-center bg-foreground/10 text-[3cqw] text-muted-foreground">
            Click to upload
          </div>
        )
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
    </div>
  );
}
