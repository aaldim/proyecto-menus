import { getProducts } from "@/actions";
import { getMenuById } from "@/actions/menu-actions";
import { MenuForm } from "@/components";
import { redirect } from "next/navigation";
import { DeleteButton } from "./deleteButton";

interface Props {
  params: { id: string };
}

export default async function EditMenuPage({ params }: Props) {
  const products = await getProducts();
  const menu = await getMenuById(parseInt(params.id, 10))
  if (!menu) {
    redirect('menu')
  }
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Editar Menú</h1>
      <MenuForm products={products} menu={menu} />
      <table className="mb-4 mt-2 min-w-full text-center bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-2">Producto</th>
            <th className="py-2">Cantidad</th>
            <th className="py-2">Costo Total</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menu.items.map((menuItem) => (
            <tr key={menuItem.product.id} className="border-t">
              <td className="py-2">{menuItem.product.description}</td>
              <td className="py-2">{menuItem.quantity}</td>
              <td className="py-2">{menuItem.product.unitPrice}</td>
              <td className="py-2 flex justify-center items-center space-x-4">
              <DeleteButton menuItemId={menuItem.id} menuId={menu.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
