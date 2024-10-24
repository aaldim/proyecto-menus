// src/app/(menus)/(menu-management)/menu-items/page.tsx
import { getMenuItems } from "@/actions/menu-item-actions";
import { MenuItemButton } from "@/components/menu-items";
import { MenuItem } from "@prisma/client";

export default async function MenuItemsPage() {
  const menuItems: MenuItem[] = await getMenuItems(); // Obtener elementos del menú desde el servidor

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Elementos del Menú</h1>
        <a
          href="/menu-items/create"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Agregar Elemento al Menú
        </a>
      </div>
      <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-2">Menú</th>
            <th className="py-2">Producto</th>
            <th className="py-2">Cantidad</th>
            <th className="py-2">Costo Total</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((menuItem) => (
            <tr key={menuItem.id} className="border-t">
              <td className="py-2">{menuItem.menu.name}</td>
              <td className="py-2">{menuItem.product.description}</td>
              <td className="py-2">{menuItem.quantity}</td>
              <td className="py-2">{menuItem.cost}</td>
              <td className="py-2">
                <MenuItemButton menuItemId={menuItem.id} />
                <a
                  href={`/menu-items/edit/${menuItem.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Editar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
