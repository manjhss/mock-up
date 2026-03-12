"use client";

import { useMockup } from "@/store/mockup";
import { MockUp, Style } from "@/zod/schema";
import Image from "next/image";
import { useRef } from "react";

interface ResourceItemProps {
  resource: string;
}

interface SlideImageProps {
  src: string;
}

// Background resource item - displays image as background
export function BackgroundItem({ src }: SlideImageProps) {
  const { tempMockUpStyles, updateTempMockUpStyles } = useMockup();
  const inputRef = useRef<HTMLInputElement>(null);
  const isSelected = tempMockUpStyles?.backgroundImage === src;

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const updatedTempMockUpStyles: MockUp["slides"][0]["style"] = {
      ...tempMockUpStyles,
      backgroundImage: url,
    };
    updateTempMockUpStyles(updatedTempMockUpStyles);
  }

  return (
    <div
      className={`w-full h-full aspect-4/3 rounded-md shrink-0 cursor-pointer transition-all relative overflow-hidden bg-input ${
        isSelected
          ? "ring-1 ring-primary ring-offset-2 ring-offset-background"
          : ""
      }`}
      style={
        src
          ? {
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
      onClick={() => inputRef.current?.click()}
    >
      {!src && (
        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
          Upload
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
}

// Font resource item - displays font preview
export function FontItem({ resource }: ResourceItemProps) {
  const { tempMockUpStyles, updateTempMockUpStyles } = useMockup();
  const isSelected = tempMockUpStyles?.fontFamily === resource;

  return (
    <div
      className={`h-full aspect-square bg-input rounded-md shrink-0 flex items-center justify-center p-4 cursor-pointer transition-all ${
        isSelected
          ? "ring-1 ring-primary ring-offset-2 ring-offset-background"
          : ""
      }`}
      onClick={() => {
        const updatedTempMockUpStyles: MockUp["slides"][0]["style"] = {
          ...tempMockUpStyles,
          fontFamily: resource,
        };
        updateTempMockUpStyles(updatedTempMockUpStyles);
      }}
    >
      <span
        className="text-xl font-bold text-center"
        style={{ fontFamily: resource }}
      >
        A
      </span>
    </div>
  );
}

// Border resource item - displays border preview
export function BorderItem({ resource }: ResourceItemProps) {
  const { tempMockUpStyles, updateTempMockUpStyles } = useMockup();
  const isSelected = tempMockUpStyles?.borderStyle === resource;

  return (
    <div
      className={`h-full aspect-square bg-input rounded-md shrink-0 flex items-center justify-center p-4 cursor-pointer transition-all ${
        isSelected
          ? "ring-1 ring-primary ring-offset-2 ring-offset-background"
          : ""
      }`}
      onClick={() => {
        const updatedTempMockUpStyles: MockUp["slides"][0]["style"] = {
          ...tempMockUpStyles,
          borderStyle: resource,
        };
        updateTempMockUpStyles(updatedTempMockUpStyles);
      }}
    >
      <div
        className="w-full h-full border-4 rounded-md"
        style={{ borderStyle: resource }}
      />
    </div>
  );
}

// Shadow resource item - displays shadow preview
export function ShadowItem({ resource }: ResourceItemProps) {
  const { tempMockUpStyles, updateTempMockUpStyles } = useMockup();
  const isSelected = tempMockUpStyles?.shadowStyle === resource;

  return (
    <div
      className={`h-full aspect-square bg-input rounded-md shrink-0 flex items-center justify-center p-4 cursor-pointer transition-all ${
        isSelected
          ? "ring-1 ring-primary ring-offset-2 ring-offset-background"
          : ""
      }`}
      onClick={() => {
        const updatedTempMockUpStyles: MockUp["slides"][0]["style"] = {
          ...tempMockUpStyles,
          shadowStyle: resource,
        };
        updateTempMockUpStyles(updatedTempMockUpStyles);
      }}
    >
      <div
        className="w-3/4 h-3/4 bg-foreground rounded-md"
        style={{ boxShadow: resource }}
      />
    </div>
  );
}

// Text color resource item - displays color preview
export function TextColorItem({ resource }: ResourceItemProps) {
  const { tempMockUpStyles, updateTempMockUpStyles } = useMockup();
  const isSelected = tempMockUpStyles?.textColor === resource;

  return (
    <div
      className={`h-full aspect-square rounded-md shrink-0 cursor-pointer transition-all ${
        isSelected
          ? "ring-1 ring-primary ring-offset-2 ring-offset-background"
          : ""
      }`}
      style={{ backgroundColor: resource }}
      onClick={() => {
        const updatedTempMockUpStyles: MockUp["slides"][0]["style"] = {
          ...tempMockUpStyles,
          textColor: resource,
        };
        updateTempMockUpStyles(updatedTempMockUpStyles);
      }}
    />
  );
}
