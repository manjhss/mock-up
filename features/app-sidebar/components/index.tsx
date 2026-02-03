"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import Icon from "../../../components/icon";
import { CleanIcon } from "@hugeicons/core-free-icons";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import ClearDraftDialogContent from "./clear-draft-dialog";
import MockUpForm from "./mock-up-form/form";

export default function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        <Content />
      </SidebarContent>

      <Separator />

      <SidebarFooter>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              variant={"destructive"}
              size={isCollapsed ? "icon-lg" : "lg"}
              className={"w-full"}
            >
              <Icon icon={CleanIcon} /> {!isCollapsed && "Clear Draft"}
            </Button>
          </AlertDialogTrigger>
          <ClearDraftDialogContent />
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  );
}

function Content() {
  return (
    <div className="space-y-4">
      <h4 className="pt-2 text-sm text-muted-foreground font-semibold">
        Slides
      </h4>

      {/* Pages Form */}
      <MockUpForm />
    </div>
  );
}
