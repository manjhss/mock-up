"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import ClearDraftDialog from "./clear-draft-dialog";
import MockUpForm from "./mockup-form";

export default function SlideSidebar() {
  return (
    <Sidebar side="left" variant="floating" collapsible="icon">
      <SidebarHeader className="items-start">
        <SidebarTrigger />
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        <Content />
      </SidebarContent>

      <Separator />

      <SidebarFooter>
        <ClearDraftDialog />
      </SidebarFooter>
    </Sidebar>
  );
}

function Content() {
  return (
    <div className="space-y-4">
      <h4 className="pt-2 text-base text-muted-foreground font-semibold">
        Slides
      </h4>

      {/* Pages Form */}
      <MockUpForm />
    </div>
  );
}
