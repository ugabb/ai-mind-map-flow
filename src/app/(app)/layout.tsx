import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/authjs/getCurrentUser";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = await getCurrentUser();

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-background">
        <AppSidebar currentUser={currentUser} />
        <SidebarInset>
          <Header />
          <div className="p-3 md:p-6">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
