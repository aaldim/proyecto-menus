import { getClients } from "@/actions";
import { ProductsButton } from "@/components/products";
import { Client } from "@prisma/client";

export default async function ProductsPage() {
  const clients: Client[] = await getClients(); // Obtener productos desde el servidor

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <a
          href="/clients/create"
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Crear Nuevo Cliente
        </a>
      </div>
      <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Email</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-t">
              <td className="py-2">{client.name}</td>
              <td className="py-2">{client.email}</td>
              <td className="py-2">
                {/* // ! Componente adicional */}
                {/* Pasamos el ID del producto al componente de botón */}
                <ProductsButton productId={client.id} />
                <a
                  href={`/clients/edit/${client.id}`}
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
