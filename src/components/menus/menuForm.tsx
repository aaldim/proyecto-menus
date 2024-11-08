//src//app/components/menus/MenuForm
import { createMenuItem } from "@/actions/menu-item-actions";
import { Menu, Product } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  products: Product[];
  menu: Menu;
}

export const MenuForm = ({ products, menu }: Props) => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const extraCost = parseFloat(formData.get("extraCost") as string);
    const productId = parseFloat(formData.get("productId") as string);
    const quantity = parseFloat(formData.get("quantity") as string);

    await createMenuItem({
      menuId: menu.id,
      productId,
      quantity,
      cost: extraCost,
    });
    redirect(`/menus/edit/${menu.id}`);
  };

  const isSubmitting = false;
  return (
    <>
      <form action={handleSubmit}>
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          name="name"
          defaultValue={menu.name}
          className="border rounded p-2 w-full mb-4"
          required
        />

        <label className="block mb-2">Costo Extra:</label>
        <input
          type="number"
          name="extraCost"
          defaultValue={menu.extraCost}
          className="border rounded p-2 w-full mb-4"
          required
        />

        <label className="block mb-2">Producto:</label>
        <select
          name="productId"
          className="border rounded p-2 w-full mb-4"
          required
        >
          <option value="">Selecciona un producto</option>
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
          defaultValue="1"
          className="border rounded p-2 w-full mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardar..." : "Guardar"}
        </button>
      </form>
    </>
  );
};
