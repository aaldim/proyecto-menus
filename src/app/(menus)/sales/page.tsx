//src/app/(menus)/(menu-management)/page.tsx
import { getInvoices } from "@/actions";
import { getMenus } from "@/actions/menu-actions";
import { MenuButton } from "@/components/menus";
import Link from "next/link";
import { IoPencilOutline } from "react-icons/io5"; // Importamos el icono de edición
import { DeleteButton } from "./deleteButton";

export default async function MenusPage({
  isSidebarOpen,
}: {
  isSidebarOpen: boolean;
}) {
  const invoices = await getInvoices(); // Obtener menús desde el servidor

  return (
    <div className={`container mx-auto p-4 ${isSidebarOpen ? "md:ml-64" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ventas</h1>
        <Link href="/sales/create">
          <div className="bg-green-500 text-white px-4 py-2 rounded-md">
            Crear Nueva Venta
          </div>
        </Link>
      </div>
      <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-2">Escuela</th>
            <th className="py-2">Menu</th>
            <th className="py-2">Cantidad</th>
            <th className="py-2">Costo total</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-t">
              <td className="py-2">{invoice.client.name}</td>
              <td className="py-2">{invoice.menu.name}</td>
              <td className="py-2">{invoice.quantity}</td>
              <td className="py-2">{invoice.totalCost}</td>
              <td className="py-2 flex justify-center items-center space-x-4">
              <DeleteButton saleId={invoice.id} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
