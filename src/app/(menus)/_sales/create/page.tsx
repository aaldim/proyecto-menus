"use server";

import { createInvoice, getMenus } from "@/actions";
import { redirect } from "next/navigation";

async function handleSubmit(formData: FormData) {
  const menus = await getMenus();
  const menuId = parseFloat(formData.get("menuId") as string);
  const quantity = parseFloat(formData.get("quantity") as string);

  const findMenu = menus.find((menu) => menu.id === menuId);

  if (!findMenu) {
    console.error("Menu not found");
    return;
  }

  const totalCost = findMenu.menu.items.reduce((acc, item) => {
    return acc + item.product.unitPrice * item.quantity * quantity;
  }, 0);

  if (findMenu.client.id !== undefined && totalCost !== undefined) {
    await createInvoice({
      clientId: findMenu.client.id,
      menuId,
      quantity,
      totalCost,
    });
    redirect("/sales");
  } else {
    console.error("Client ID is undefined");
  }
}

export default async function CrearMenuPage() {
  const menus = await getMenus();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Venta</h1>
      <form action={handleSubmit}>
        <label className="block mb-2">Menu:</label>
        <select
          name="menuId"
          className="border rounded p-2 w-full mb-4"
          required
        >
          <option value="">Selecciona un Menu</option>
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.menu.name}
            </option>
          ))}
        </select>

        <label className="block mb-2">Cantidad:</label>
        <input
          type="number"
          name="quantity"
          className="border rounded p-2 w-full mb-4"
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Guardar
        </button>
      </form>
    </div>
  );
}