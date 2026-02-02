"use client";

import PreviewHeader from "./preview-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PreviewList from "./preview-list";
import {
  DashboardSquare01Icon,
  LeftToRightListDashIcon,
} from "@hugeicons/core-free-icons";
import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Footer from "../../../components/footer";

const tabs = [
  { value: "all", label: "All" },
  { value: "trending", label: "Trending" },
  { value: "minimalist", label: "Minimalist" },
];

export default function PreviewView() {
  const [previewCardStyle, setPreviewCardStyle] = useState<"tile" | "card">(
    "tile",
  );

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

          <div className="pl-2 space-x-1">
            <Button
              size={"icon"}
              variant={previewCardStyle === "tile" ? "secondary" : "ghost"}
              onClick={() => setPreviewCardStyle("tile")}
            >
              <Icon icon={LeftToRightListDashIcon} />
            </Button>

            <Button
              size={"icon"}
              variant={previewCardStyle === "card" ? "secondary" : "ghost"}
              onClick={() => setPreviewCardStyle("card")}
            >
              <Icon icon={DashboardSquare01Icon} />
            </Button>
          </div>
        </div>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className={"px-2 pb-2"}
          >
            <PreviewList previewCardStyle={previewCardStyle} />
          </TabsContent>
        ))}
      </Tabs>

      <Footer />
    </div>
  );
}
