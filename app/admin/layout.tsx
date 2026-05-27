import { redirect } from "next/navigation";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";

// This is a simplified admin check for layout.
async function checkAuth() {
  return true; 
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();

  return (
    <div className="flex h-screen bg-black text-zinc-100 overflow-hidden font-sans">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-zinc-950/30" data-lenis-prevent="true">
          {children}
        </main>
      </div>
    </div>
  );
}
