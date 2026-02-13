"use client";

import PreviewHeader from "./preview-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PreviewList from "./preview-list";

import Footer from "../../../components/footer";
import { useMockUp } from "@/store/mockup";

const tabs = [
  { value: "all", label: "All" },
  { value: "trending", label: "Trending" },
  { value: "minimalist", label: "Minimalist" },
];

export default function PreviewView() {
  const { presets, userMockups } = useMockUp();

  // Merge original presets with user-edited mockups
  // If a preset has been edited (exists in userMockups), use the edited version
  const mockups = presets.map((preset) => {
    const userEdit = userMockups.find((um) => um.id === preset.id);
    return userEdit || preset; // Use edited version if it exists, otherwise use original
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <PreviewHeader />

      <Tabs defaultValue="all" className="flex-1 w-full bg-sidebar">
        <div className="p-2.25 sticky top-12.25 z-10 flex bg-sidebar">
          <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <TabsList variant={"line"}>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="px-6">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className={"px-2 pb-2"}
          >
            <PreviewList mockups={mockups} />
          </TabsContent>
        ))}
      </Tabs>

      <Footer />
    </div>
  );
}
