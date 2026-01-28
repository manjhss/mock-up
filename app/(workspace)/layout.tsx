import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="fixed inset-y-0 right-0 left-0 md:left-[calc(var(--sidebar-width))] peer-data-[state=collapsed]:md:left-[calc(var(--sidebar-width-icon)+0.5rem)] transition-[left] duration-200 ease-linear my-2 mr-2 ml-2 md:ml-0">
        <div className="h-full rounded-lg bg-sidebar shadow-sm ring-1 ring-sidebar-border overflow-auto">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
