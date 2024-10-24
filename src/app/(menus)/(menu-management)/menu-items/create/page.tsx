// src/app/(menus)/(menu-management)/menu-items/create/page.tsx
import { createMenuItem } from "@/actions/menu-item-actions";
import { getMenus } from "@/actions/menu-actions";
import { getProducts } from "@/actions/product-actions";
import { redirect } from "next/navigation";

export default async function CrearMenuItemPage() {
  const menus = await getMenus();
  const products = await getProducts();

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const menuId = parseInt(formData.get("menuId") as string);
    const productId = parseInt(formData.get("productId") as string);
    const quantity = parseInt(formData.get("quantity") as string);
    const cost = parseFloat(formData.get("cost") as string);

    await createMenuItem({
      menuId,
      productId,
      quantity,
      cost,
    });
    redirect("/menu-items");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar Elemento al Menú</h1>
      <form action={handleSubmit}>
        <label className="block mb-2">Menú:</label>
        <select name="menuId" className="border rounded p-2 w-full mb-4">
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </select>

        <label className="block mb-2">Producto:</label>
        <select name="productId" className="border rounded p-2 w-full mb-4">
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.description}
            </option>
          ))}
        </select>

        <label className="block mb-2">Cantidad:</label>
        <input
          type="number"
          name="quantity"
          className="border rounded p-2 w-full mb-4"
        />

        <label className="block mb-2">Costo Total:</label>
        <input
          type="number"
          step="0.01"
          name="cost"
          className="border rounded p-2 w-full mb-4"
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Guardar
        </button>
      </form>
    </div>
  );
}
