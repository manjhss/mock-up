"use client";

import { cn } from "@/lib/utils";
import { useMUp } from "@/store/mUp";
import { MockUp } from "@/zod/schema";
import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";

const variants = {
  heading: {
    tag: "h1" as const,
    className: "text-[4cqw] font-semibold tracking-tighter leading-[1.05]",
  },
  description: {
    tag: "p" as const,
    className: "text-[2.2cqw] opacity-85 font-sans font-normal tracking-tight leading-snug",
  },
};

interface SlideTextProps extends Omit<ComponentProps<"h1"> & ComponentProps<"p">, "children"> {
  variant: keyof typeof variants;
  slideId?: string;
  field?: keyof MockUp["slides"][number]["data"];
  children: string;
  readOnly?: boolean;
}

export default function SlideText({
  variant,
  className,
  children,
  slideId,
  field,
  readOnly,
  ...props
}: SlideTextProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(children);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const updateSlideData = useMUp((s) => s.updateSlideData);

  useEffect(() => {
    if (!editing) setValue(children);
  }, [children, editing]);

  const { tag: Tag, className: variantClass } = variants[variant];

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value, editing]);

  const handleDoubleClick = () => {
    if (readOnly || !slideId || !field) return;
    setEditing(true);
    setTimeout(() => textareaRef.current?.select(), 0);
  };

  const commit = () => {
    setEditing(false);
    const trimmed = value.trim();
    if (slideId && field) {
      if (!trimmed) {
        setValue(children);
      } else if (trimmed !== children) {
        updateSlideData(slideId, field, trimmed);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      commit();
    }
    if (e.key === "Escape") {
      setValue(children);
      setEditing(false);
    }
  };

  const baseClass = cn(variantClass, className);

  if (editing) {
    return (
      <textarea
        ref={textareaRef}
        rows={1}
        className={cn(baseClass, "resize-none overflow-hidden bg-transparent outline-none border-none text-center block w-[85cqw]")}
        style={props.style}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    );
  }

  return (
    <Tag
      className={cn(baseClass, "wrap-break-word")}
      onDoubleClick={handleDoubleClick}
      {...props}
    >
      {value}
    </Tag>
  );
}
