import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/authClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
	const session = await authClient.getSession({
    fetchOptions:{
      headers: await headers(),
    }
  });

  console.log('==== layoutsession', session);

  const currentUser = session?.data?.user;

  if (!session.data) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <div className="flex h-svh w-full bg-background">
        <AppSidebar currentUser={currentUser} />
        <SidebarInset className="flex flex-col">
          <Header />
          <div className="flex-1 p-3 md:p-6 overflow-hidden">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
