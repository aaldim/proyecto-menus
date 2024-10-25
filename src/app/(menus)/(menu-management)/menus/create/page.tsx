//src/app/(menus)/(menu-management)/menus/create/page.tsx
import { createMenu } from "@/actions/menu-actions";
import { redirect } from "next/navigation";

export default function CrearMenuPage() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const extraCost = parseFloat(formData.get("extraCost") as string);

    await createMenu({
      name,
      extraCost,
    });
    redirect("/menus");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Menú</h1>
      <form action={handleSubmit}>
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          name="name"
          className="border rounded p-2 w-full mb-4"
        />

        <label className="block mb-2">Costo Extra:</label>
        <input
          type="number"
          name="extraCost"
          className="border rounded p-2 w-full mb-4"
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Guardar
        </button>
      </form>
    </div>
  );
}
