import { getMenus } from "@/actions/menu-actions";
import { MenuButton } from "@/components/menus";
import { Menu } from "@prisma/client";

export default async function MenusPage() {
  const menus: Menu[] = await getMenus(); // Obtener menús desde el servidor

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Menús</h1>
        <a
          href="/menus/create"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Crear Nuevo Menú
        </a>
      </div>
      <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Costo Extra</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.id} className="border-t">
              <td className="py-2">{menu.name}</td>
              <td className="py-2">{menu.extraCost}</td>
              <td className="py-2">
                <MenuButton menuId={menu.id} />
                <a
                  href={`/menus/edit/${menu.id}`}
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
