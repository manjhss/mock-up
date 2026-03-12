"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import ClearDraftDialog from "./clear-draft-dialog";
import { useMockup } from "@/store/mockup";
import { useUI } from "@/store/ui";
import { slides } from "@/data";
import PreviewSlideCarouselItem from "@/features/preview/components/preview-slide-carousel/preview-slide-carousel-item";
import { useState } from "react";

const tabs = [
  { value: "desktop", label: "Desktop", content: <SlideList /> },
  { value: "mobile", label: "Mobile" },
];

export default function SlideSidebar() {
  const { slideSidebarState } = useUI();
  const isCollapsed = slideSidebarState === "collapsed";

  const [activeTab, setActiveTab] = useState("desktop");

  return (
    <Sidebar side="left" variant="floating" collapsible="icon">
      <SidebarHeader className="items-start">
        <SidebarTrigger />
      </SidebarHeader>

      <Separator />

      <SidebarContent className="space-y-2">
        <h4 className="text-basetext-muted-foreground font-semibold">Slides</h4>

        {!isCollapsed && (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className={"space-y-2"}
          >
            <TabsList variant={"default"} className="w-full">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab}>
              {tabs.find((tab) => tab.value === activeTab)?.content}
            </TabsContent>
          </Tabs>
        )}
      </SidebarContent>

      <Separator />

      <SidebarFooter>
        <ClearDraftDialog />
      </SidebarFooter>
    </Sidebar>
  );
}

function SlideList() {
  const { addSlide } = useMockup();

  return (
    <div className="space-y-2">
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="w-full aspect-video bg-foreground/10 rounded-md overflow-hidden cursor-pointer"
          onClick={() => addSlide(slide)}
        >
          <PreviewSlideCarouselItem slide={slide} readOnly />
        </div>
      ))}
    </div>
  );
}
