"use client";

import Loading from "@/components/loading";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar/components";
import { useMockUp } from "@/store/mock-up";
import { useResource } from "@/store/resource";
import { useTools } from "@/store/tools";
import { useUI } from "@/store/ui";

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isHydrated: isMockUpHydrated } = useMockUp();
  const { isHydrated: isUIHydrated } = useUI();
  const { isHydrated: isToolsHydrated } = useTools();
  const { isHydrated: isResourceHydrated } = useResource();

  return isMockUpHydrated &&
    isUIHydrated &&
    isToolsHydrated &&
    isResourceHydrated ? (
    <SidebarProvider>
      <AppSidebar />
      <main className="fixed inset-y-0 right-0 left-0 md:left-[calc(var(--sidebar-width))] peer-data-[state=collapsed]:md:left-[calc(var(--sidebar-width-icon)+1.15rem)] transition-[left] duration-200 ease-linear my-2 mr-2 ml-2 md:ml-0">
        <div className="h-full rounded-lg bg-sidebar shadow-sm ring-1 ring-sidebar-border overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {children}
        </div>
      </main>
    </SidebarProvider>
  ) : (
    <Loading />
  );
}
