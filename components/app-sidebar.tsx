"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";
import Icon from "./icon";
import { CleanIcon } from "@hugeicons/core-free-icons";

export default function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <Image src={"/vercel.svg"} alt="Logo" width={32} height={32} />
          <ModeToggle />
        </div>
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        <Content />
      </SidebarContent>

      <Separator />

      <SidebarFooter>
        <Button variant={"destructive"} size={"lg"}>
          <Icon icon={CleanIcon}/> Clear Draft
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

function Content() {
  return (
    <div>
      <h4 className="text-sm text-muted-foreground">Pages</h4>

      {/* Pages Form */}
    </div>
  );
}
