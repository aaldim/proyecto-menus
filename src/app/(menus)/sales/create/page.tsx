// Mueve el "use server" afuera del componente

import { getMenus } from "@/actions";
import { handleSubmit } from "./handleSubmitt";



export default async function CrearSalesPage() {
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