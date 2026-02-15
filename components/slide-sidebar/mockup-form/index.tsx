"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MockUpSchema, type MockUp } from "@/zod/schema";
import { useMockUp } from "@/store/mockup";
import { useUI } from "@/store/ui";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "../../icon";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";
import MediaPicker from "./media-picker";
import LogoPicker from "./logo-picker";
import { useSidebar } from "../../ui/sidebar";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableSlideItem } from "./sortable-slide-item";

export default function MockUpForm() {
  const { state, setOpen } = useSidebar();
  const isCollapsed = state === "collapsed";

  const { tempMockUp, setTempMockUp, resetCounter } = useMockUp();
  const { expandedSlides, toggleSlide, setExpandedSlides } = useUI();

  const isResettingRef = useRef(false);
  const prevResetCounterRef = useRef(resetCounter);

  const { control, register, getValues, reset, watch } = useForm({
    resolver: zodResolver(MockUpSchema),
    defaultValues: tempMockUp,
  });

  // Debounced sync to store
  useEffect(() => {
    const subscription = watch((value) => {
      if (value && !isResettingRef.current) {
        setTempMockUp(structuredClone(value as MockUp));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setTempMockUp]);

  // Reset form when clearTempMockUp is called
  useEffect(() => {
    if (resetCounter > 0 && resetCounter !== prevResetCounterRef.current) {
      prevResetCounterRef.current = resetCounter;
      isResettingRef.current = true;
      reset(tempMockUp);
      // Reset flag after next render
      setTimeout(() => {
        isResettingRef.current = false;
      }, 0);
    }
  }, [resetCounter, tempMockUp, reset]);

  const handleMediaChange = (index: number) => {
    return (url: string) => {
      const values = getValues();
      if (values.slides[index]) {
        values.slides[index].data.media = url;
      }
      setTempMockUp(structuredClone(values as MockUp));
    };
  };

  const handleLogoChange = (url: string) => {
    const values = getValues();
    values.slides.forEach((slide) => {
      slide.data.logo = url;
    });
    setTempMockUp(structuredClone(values as MockUp));
  };

  const { fields: slides, move } = useFieldArray({
    control,
    name: "slides",
  });

  const watchedSlides = watch("slides");

  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const previouslyExpandedSlides = useRef<Set<string>>(new Set());

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveDragId(active.id as string);

    // Save currently expanded slides
    previouslyExpandedSlides.current = new Set(expandedSlides);
    
    // Collapse all slides
    setExpandedSlides(new Set());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = slides.findIndex((f) => f.id === active.id);
      const newIndex = slides.findIndex((f) => f.id === over.id);

      move(oldIndex, newIndex);

      const reorderedSlides = [...tempMockUp.slides];
      const [movedSlide] = reorderedSlides.splice(oldIndex, 1);

      reorderedSlides.splice(newIndex, 0, movedSlide);

      setTempMockUp({
        ...tempMockUp,
        slides: reorderedSlides,
      });
    }

    // Restore previously expanded slides
    if (previouslyExpandedSlides.current.size > 0) {
      setExpandedSlides(new Set(previouslyExpandedSlides.current));
      previouslyExpandedSlides.current.clear();
    }
    setActiveDragId(null);
  };

  return (
    <form>
      <FieldGroup className="gap-2">
        <Field>
          <LogoPicker
            value={tempMockUp.slides[0]?.data?.logo || ""}
            onChange={handleLogoChange}
          />
        </Field>

        <div className="space-y-2 ">
          <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext
              items={slides.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              {slides.map((slide, index) => {
                const realId = watchedSlides?.[index]?.id;

                return (
                  <SortableSlideItem
                    key={slide.id}
                    id={slide.id}
                    isAnyDragging={!!activeDragId}
                  >
                    {({ listeners }) => (
                      <div className="space-y-2">
                        <div
                          className={cn(
                            "flex gap-2 justify-between items-center cursor-grab active:cursor-grabbing",
                          )}
                        >
                          <div
                            className="flex-1 items-center gap-2"
                            {...listeners}
                          >
                            <h3
                              className={cn(
                                "p-1 font-semibold",
                                isCollapsed && "text-center",
                              )}
                            >
                              s{index + 1}
                            </h3>
                          </div>

                          {!isCollapsed && realId && (
                            <div>
                              <Button type="button" variant="ghost" size="icon">
                                <div
                                  className={`transition-transform ${
                                    expandedSlides.has(realId)
                                      ? "rotate-0"
                                      : "-rotate-90"
                                  }`}
                                  onClick={() => {
                                    if (isCollapsed) setOpen(true);
                                    if (!isCollapsed && realId)
                                      toggleSlide(realId);
                                  }}
                                >
                                  <Icon icon={ArrowDown01Icon} />
                                </div>
                              </Button>
                            </div>
                          )}
                        </div>

                        {!isCollapsed &&
                          realId &&
                          expandedSlides.has(realId) && (
                            <div className={"space-y-2"}>
                              <Field>
                                <Input
                                  id={`slides.${index}.data.heading`}
                                  placeholder="Heading"
                                  autoComplete="off"
                                  {...register(`slides.${index}.data.heading`)}
                                />
                              </Field>

                              <Field>
                                <Input
                                  id={`slides.${index}.data.description`}
                                  placeholder="Description"
                                  autoComplete="off"
                                  {...register(
                                    `slides.${index}.data.description`,
                                  )}
                                />
                              </Field>

                              <Field>
                                <MediaPicker
                                  value={
                                    tempMockUp.slides[index]?.data?.media || ""
                                  }
                                  onChange={handleMediaChange(index)}
                                  alt="Slide media"
                                />
                              </Field>
                            </div>
                          )}

                        {index < slides.length - 1 && <hr />}
                      </div>
                    )}
                  </SortableSlideItem>
                );
              })}
            </SortableContext>
          </DndContext>
        </div>
      </FieldGroup>
    </form>
  );
}
