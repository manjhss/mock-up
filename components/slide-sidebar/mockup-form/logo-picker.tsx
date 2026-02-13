"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "../../ui/sidebar";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon";
import { Image01Icon } from "@hugeicons/core-free-icons";

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

      {isCollapsed ? (
        <Button size="icon" variant={"ghost"} onClick={handleClick}>
          <Icon icon={Image01Icon} />
        </Button>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className={cn(
            "w-fit h-8 px-3 rounded-md cursor-pointer",
            "text-sm bg-input",
            isCollapsed && "ml-0.5",
          )}
        >
          {value ? "Logo selected" : "Choose logo"}
        </button>
      )}
    </div>
  );
}
