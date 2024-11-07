import { getClientById, updateClient } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: number;
  };
}

export default async function EditarProductoPage({ params }: Props,) {
  const client = await getClientById(Number(params.id));

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (client?.id !== undefined) {
      await updateClient(client.id, { name, email });
    }
    redirect('/clients');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <form action={handleSubmit}>
        <label className="block mb-2">Nombre:</label>
        <input type="text" name="name" defaultValue={client?.name} className="border rounded p-2 w-full mb-4" />

        <label className="block mb-2">Email:</label>
        <input type="email" name="email" defaultValue={client?.email} className="border rounded p-2 w-full mb-4" />

        <button type="submit" className="bg-green-500 text-white px-4 py-2">Actualizar</button>
      </form>
    </div>
  );
}
