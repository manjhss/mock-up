"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import SlideSidebar from "@/components/slide-sidebar";
import StyleSidebar from "@/components/style-sidebar";
import { useUI } from "@/store/ui";
import { cn } from "@/lib/utils";
import { useMockup } from "@/store/mockup";

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isHydrated: isMockUpHydrated } = useMockup();
  const {
    isHydrated: isUIHydrated,
    slideSidebarState,
    setSlideSidebarOpen,
    styleSidebarState,
    setStyleSidebarOpen,
  } = useUI();

  const slideExpanded = slideSidebarState === "expanded";
  const styleExpanded = styleSidebarState === "expanded";

  return isMockUpHydrated && isUIHydrated ? (
    <div className={cn("flex h-screen w-full overflow-hidden")}>
      {/* Slide Sidebar */}
      <div className="flex shrink-0">
        <SidebarProvider
          open={slideExpanded}
          onOpenChange={setSlideSidebarOpen}
        >
          <SlideSidebar />
        </SidebarProvider>
      </div>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 flex flex-col py-2 min-w-0",
          !slideExpanded && "pl-2 md:pl-0.5",
          !styleExpanded && "pr-2 md:pr-0.5",
        )}
      >
        <div className="flex-1 rounded-lg bg-sidebar shadow-sm ring-1 ring-sidebar-border overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {children}
        </div>
      </main>

      {/* Style Sidebar */}
      <div className="flex shrink-0">
        <SidebarProvider
          open={styleExpanded}
          onOpenChange={setStyleSidebarOpen}
        >
          <StyleSidebar />
        </SidebarProvider>
      </div>
    </div>
  ) : null;
}
