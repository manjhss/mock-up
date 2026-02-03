"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "../../../../components/ui/sidebar";

interface LogoPickerProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export default function LogoPicker({
  value,
  onChange,
  className,
}: LogoPickerProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

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
    <div className={cn("flex items-center justify-between", className)}>
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
          "w-fit h-8 px-3 rounded-md border border-input cursor-pointer",
          "text-sm text-muted-foreground",
          isCollapsed && "ml-0.5",
        )}
      >
        {!isCollapsed && (value ? "Logo selected" : "Choose logo")}
        {isCollapsed && "L"}
      </button>
    </div>
  );
}
