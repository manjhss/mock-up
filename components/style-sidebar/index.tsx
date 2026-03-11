"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import ResetStyleDialog from "./reset-style-dialog";
import {
  BackgroundItem,
  FontItem,
  TextColorItem,
} from "@/components/style-sidebar/resource-item";
import { useUI } from "@/store/ui";
import { Button } from "../ui/button";
import Icon from "../icon";
import {
  DarkModeIcon,
  Image01Icon,
  TextFontIcon,
} from "@hugeicons/core-free-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useMUp } from "@/store/mUp";
import { resources } from "@/data";

const tabs = [
  { value: "themes", label: "Themes" },
  { value: "customize", label: "Customize", content: <Content /> },
];

export default function StyleSidebar() {
  const { styleSidebarState, setStyleSidebarOpen } = useUI();
  const [activeTab, setActiveTab] = useState("themes");

  const { tempMockUp } = useMUp();

  const styleCollapsed = styleSidebarState === "collapsed";

  return (
    <SidebarProvider
      open={styleSidebarState === "expanded"}
      onOpenChange={setStyleSidebarOpen}
    >
      <Sidebar side="right" variant="floating" collapsible="icon">
        <SidebarHeader className="items-end">
          <SidebarTrigger />
        </SidebarHeader>

        <Separator />

        <SidebarContent className="space-y-2">
          <h4 className="text-base font-semibold">Styles</h4>

          {tempMockUp && Object.keys(tempMockUp).length > 0 ? (
            !styleCollapsed && (
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
            )
          ) : (
            <p className="text-sm text-muted-foreground">
              Please add a slide to edit its styles.
            </p>
          )}
        </SidebarContent>

        <Separator />

        <SidebarFooter>
          <ResetStyleDialog />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}

function Content() {
  const { styleSidebarState } = useUI();
  const styleCollapsed = styleSidebarState === "collapsed";

  const { tempMockUpStyles } = useMUp();

  return (
    <div className="space-y-4 text-[11px] font-semibold uppercase text-muted-foreground tracking-wider">
      <div className="flex gap-1 flex-col">
        {styleCollapsed ? (
          <Button size="icon" variant={"ghost"}>
            <Icon icon={Image01Icon} />
          </Button>
        ) : (
          <>
            <div className="flex items-center">
              <span>Background</span>
            </div>
            <div className="h-20 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-1">
              <BackgroundItem src={tempMockUpStyles?.backgroundImage!} />
            </div>
          </>
        )}
      </div>
      <div className="flex gap-1 flex-col">
        {styleCollapsed ? (
          <Button size="icon" variant={"ghost"}>
            <Icon icon={DarkModeIcon} />
          </Button>
        ) : (
          <>
            <div className="flex items-center">
              <span>Text Color</span>
            </div>
            <div className="h-14 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-1">
              {resources?.textColor?.map((resource, index) => (
                <TextColorItem key={index} resource={resource} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex gap-1 flex-col">
        {styleCollapsed ? (
          <Button size="icon" variant={"ghost"}>
            <Icon icon={TextFontIcon} />
          </Button>
        ) : (
          <>
            <div className="flex items-center">
              <span>Font</span>
            </div>
            <div className="h-14 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-1">
              {resources?.font.map((resource, index) => (
                <FontItem key={index} resource={resource} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
