// src/app/(menus)/(menu-management)/menus/edit/[id]/page.tsx
import { getMenuById, updateMenu } from "@/actions/menu-actions";
import { redirect } from "next/navigation";

export default async function EditMenuPage({
  params,
}: {
  params: { id: string };
}) {
  const menu = await getMenuById(parseInt(params.id));

  // Verificamos si el menú es null o undefined
  if (!menu) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Menú no encontrado</h1>
        <p>El menú que intentas editar no existe.</p>
        <a href="/menus" className="text-blue-500 underline">
          Volver a la lista de menús
        </a>
      </div>
    );
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const extraCost = parseFloat(formData.get("extraCost") as string);

    await updateMenu(menu.id, { name, extraCost });
    redirect("/menus");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Menú</h1>
      <form action={handleSubmit}>
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          name="name"
          defaultValue={menu.name}
          className="border rounded p-2 w-full mb-4"
        />

        <label className="block mb-2">Costo Extra:</label>
        <input
          type="number"
          name="extraCost"
          defaultValue={menu.extraCost}
          className="border rounded p-2 w-full mb-4"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Actualizar
        </button>
      </form>
    </div>
  );
}
