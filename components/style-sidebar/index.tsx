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
  BorderItem,
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
import { useMockup } from "@/store/mockup";
import { resources, themes } from "@/data";

const tabs = [
  { value: "themes", label: "Themes", content: <Themes /> },
  { value: "customize", label: "Customize", content: <Customize /> },
];

export default function StyleSidebar() {
  const { styleSidebarState, setStyleSidebarOpen } = useUI();
  const [activeTab, setActiveTab] = useState("themes");

  const { tempMockUp } = useMockup();

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

function Customize() {
  const { styleSidebarState } = useUI();
  const styleCollapsed = styleSidebarState === "collapsed";

  const { tempMockUpStyles } = useMockup();

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
      <div className="flex gap-1 flex-col">
        {styleCollapsed ? (
          <Button size="icon" variant={"ghost"}>
            <Icon icon={TextFontIcon} />
          </Button>
        ) : (
          <>
            <div className="flex items-center">
              <span>Border</span>
            </div>
            <div className="h-14 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-1">
              {resources?.border.map((resource, index) => (
                <BorderItem key={index} resource={resource} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Themes() {
  const { updateTempMockUpStyles } = useMockup();

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {themes.map((theme, index) => (
          <div
            className="cursor-pointer"
            onClick={() => {
              updateTempMockUpStyles(theme.style);
            }}
          >
            <div key={index} className="rounded-md overflow-hidden">
              <img
                src={theme.meta.img}
                alt={theme.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="py-1 px-2 text-xs font-medium tracking-wide">
              {theme.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
