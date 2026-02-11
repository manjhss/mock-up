"use client";

import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaPickerProps {
  value?: string;
  onChange: (url: string) => void;
  alt?: string;
  className?: string;
}

export default function MediaPicker({
  value,
  onChange,
  alt = "Selected media",
  className,
}: MediaPickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a temporary URL for the selected file
      const url = URL.createObjectURL(file);
      onChange(url);
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "relative w-full aspect-video rounded-md overflow-hidden cursor-pointer",
          "border border-input",
          className,
        )}
      >
        {value ? (
          <Image
            src={value}
            alt={alt}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            Click to select media
          </div>
        )}
      </button>
    </div>
  );
}
