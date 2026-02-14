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
  ShadowItem,
  TextColorItem,
} from "@/components/style-sidebar/resource-item";
import { useUI } from "@/store/ui";
import { Button } from "../ui/button";
import Icon from "../icon";
import {
  BackgroundIcon,
  BendToolIcon,
  DarkModeIcon,
  Image01Icon,
  TextFontIcon,
} from "@hugeicons/core-free-icons";
import { useMockUp } from "@/store/mockup";

export default function StyleSidebar() {
  const { styleSidebarState, setStyleSidebarOpen } = useUI();

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

        <SidebarContent>
          <Content />
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
  const { selectedMockUp } = useMockUp();
  const isSeletedMockUpEmpty = Object.keys(selectedMockUp).length === 0;

  const { styleSidebarState } = useUI();
  const styleCollapsed = styleSidebarState === "collapsed";

  return (
    <div className="space-y-4">
      <h4 className="pt-2 text-base text-muted-foreground font-semibold">
        Styles
      </h4>
      {isSeletedMockUpEmpty ? (
        !styleCollapsed && (
          <p className="text-sm text-muted-foreground">
            Please select a mockup to edit its styles.
          </p>
        )
      ) : (
        <div className="space-y-4 text-sm font-semibold">
          <div className="flex gap-2 flex-col">
            {styleCollapsed ? (
              <Button size="icon" variant={"ghost"}>
                <Icon icon={Image01Icon} />
              </Button>
            ) : (
              <>
                <div className="flex items-center">
                  <span>Background</span>
                </div>
                <div className="h-14 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-1">
                  {selectedMockUp.resources?.background.map(
                    (resource, index) => (
                      <BackgroundItem key={index} resource={resource} />
                    ),
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2 flex-col">
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
                  {selectedMockUp.resources?.textColor?.map(
                    (resource, index) => (
                      <TextColorItem key={index} resource={resource} />
                    ),
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2 flex-col">
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
                  {selectedMockUp.resources?.font.map((resource, index) => (
                    <FontItem key={index} resource={resource} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2 flex-col">
            {styleCollapsed ? (
              <Button size="icon" variant={"ghost"}>
                <Icon icon={BendToolIcon} />
              </Button>
            ) : (
              <>
                <div className="flex items-center">
                  <span>Border</span>
                </div>
                <div className="h-14 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-1">
                  {selectedMockUp.resources?.border.map((resource, index) => (
                    <BorderItem key={index} resource={resource} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2 flex-col">
            {styleCollapsed ? (
              <Button size="icon" variant={"ghost"}>
                <Icon icon={BackgroundIcon} />
              </Button>
            ) : (
              <>
                <div className="flex items-center">
                  <span>Shadow</span>
                </div>
                <div className="h-14 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-1">
                  {selectedMockUp.resources?.shadow.map((resource, index) => (
                    <ShadowItem key={index} resource={resource} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
