import { Sidebar } from "@/components/sidebar/Sidebar";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex">
      {/* Sidebar ocupa una parte fija de la pantalla */}
      <div className="w-[250px]">
        <Sidebar />
      </div>
      {/* Contenido principal al lado del sidebar */}
      <div className="flex-1 px-0 sm:px-10">
        {children}
      </div>
    </main>
  );
}
