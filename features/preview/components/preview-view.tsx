"use client";

import PreviewHeader from "./preview-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PreviewList from "./preview-list";

import Footer from "../../../components/footer";
import { useMockUp } from "@/store/mockup";
import { useUI } from "@/store/ui";
import { useState, useMemo } from "react";

const tabs = [
  { value: "all", label: "All" },
  { value: "trending", label: "Trending" },
  { value: "minimalist", label: "Minimalist" },
];

export default function PreviewView() {
  const { presets, userMockups } = useMockUp();
  const { searchQuery } = useUI();
  const [activeTab, setActiveTab] = useState("all");

  // Merge original presets with user-edited mockups
  const mockups = useMemo(() => {
    return presets.map((preset) => {
      const userEdit = userMockups.find((um) => um.id === preset.id);
      return userEdit || preset;
    });
  }, [presets, userMockups]);

  const filteredMockups = useMemo(() => {
    return mockups.filter((mockup) => {
      const search = searchQuery.toLowerCase();
      
      const matchesSearch =
        !search ||
        mockup.name?.toLowerCase().includes(search) ||
        mockup.nickname?.toLowerCase().includes(search) ||
        mockup.tags?.some((tag) => tag.toLowerCase().includes(search));

      const matchesTab =
        activeTab === "all" ||
        mockup.tags?.some((tag) => tag.toLowerCase() === activeTab.toLowerCase());

      return matchesSearch && matchesTab;
    });
  }, [mockups, searchQuery, activeTab]);

  return (
    <div className="flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <PreviewHeader />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 w-full bg-sidebar"
      >
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

        <TabsContent value={activeTab} className={"px-2 pb-2"}>
          <PreviewList mockups={filteredMockups} />
        </TabsContent>
      </Tabs>

      <Footer />
    </div>
  );
}
