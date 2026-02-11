"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MockUpSchema, type MockUp } from "@/zod/schema";
import { useMockUp } from "@/store/mock-up";
import { useUI } from "@/store/ui";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "../../../icon";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { useEffect, useRef } from "react";
import MediaPicker from "./media-picker";
import LogoPicker from "./logo-picker";
import { useSidebar } from "../../../ui/sidebar";
import { cn } from "@/lib/utils";

export default function MockUpForm() {
  const { state, setOpen } = useSidebar();
  const isCollapsed = state === "collapsed";

  const { tempMockUp, setTempMockUp, resetCounter } = useMockUp();
  const { expandedSlides, toggleSlide } = useUI();

  const isResettingRef = useRef(false);
  const prevResetCounterRef = useRef(resetCounter);

  const { control, register, getValues, reset, watch } = useForm<MockUp>({
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
      // Get current form values
      const values = getValues();

      // Update the media URL for this slide
      if (values.slides[index]) {
        values.slides[index].data.media = url;
      }

      // Sync to store
      setTempMockUp(structuredClone(values));
    };
  };

  const handleLogoChange = (url: string) => {
    // Get current form values
    const values = getValues();

    // Update logo URL for ALL slides
    values.slides.forEach((slide) => {
      slide.data.logo = url;
    });

    // Sync to store
    setTempMockUp(structuredClone(values));
  };

  const { fields: slides } = useFieldArray({
    control,
    name: "slides",
  });

  return (
    <form>
      <FieldGroup className="gap-2">
        <Field>
          <LogoPicker
            value={tempMockUp.slides[0]?.data?.logo || ""}
            onChange={handleLogoChange}
          />
        </Field>

        {slides.map((slide, index) => (
          <div key={slide.id} className="space-y-2">
            <div
              className="flex gap-2 justify-between items-center cursor-pointer"
              onClick={() => {
                if (isCollapsed) setOpen(true);
                if (!isCollapsed) toggleSlide(index);
              }}
            >
              <h3 className={cn("p-1 ml-1")}>
                <span className="text-xs text-muted-foreground">#</span>
                {index + 1}
              </h3>

              {!isCollapsed && (
                <div>
                  <Button type="button" variant="ghost" size="icon">
                    <div
                      className={`transition-transform ${
                        expandedSlides.has(index) ? "rotate-0" : "-rotate-90"
                      }`}
                    >
                      <Icon icon={ArrowDown01Icon} />
                    </div>
                  </Button>
                </div>
              )}
            </div>

            {!isCollapsed && expandedSlides.has(index) && (
              <>
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
                    {...register(`slides.${index}.data.description`)}
                  />
                </Field>

                <Field>
                  <MediaPicker
                    value={tempMockUp.slides[index]?.data?.media || ""}
                    onChange={handleMediaChange(index)}
                    alt="Slide media"
                  />
                </Field>
              </>
            )}

            {index < slides.length - 1 && <hr />}
          </div>
        ))}
      </FieldGroup>
    </form>
  );
}
