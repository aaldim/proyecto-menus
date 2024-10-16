'use client'; // Esto indica que es un Client Component

interface ProductsButtonProps {
  productId: number; // Recibimos el ID del producto como prop
}

export const ProductsButton = ({ productId }: ProductsButtonProps) => {
  const handleDelete = async () => {
    // Hacemos una solicitud para ejecutar la Server Action
    const res = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Si la eliminación es exitosa, recargamos la página o actualizamos el estado
      window.location.reload(); // O puedes actualizar el estado en lugar de recargar toda la página
    } else {
      alert("Error al eliminar el producto.");
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
      onClick={handleDelete} // Llamamos a la función que hace la solicitud
    >
      Eliminar
    </button>
  );
};
