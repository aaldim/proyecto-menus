import { createClient } from "@/actions";
import { redirect } from "next/navigation";

export default function CrearProductoPage() {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    await createClient({name, email});
    redirect("/clients");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
      <form action={handleSubmit}>
        <label className="block mb-2">Nombre:</label>
        <input
          type="text"
          name="name"
          className="border rounded p-2 w-full mb-4"
        />

        <label className="block mb-2">Precio:</label>
        <input
          type="email"
          name="email"
          className="border rounded p-2 w-full mb-4"
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Guardar
        </button>
      </form>
    </div>
  );
}
