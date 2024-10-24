// src/components/menu-items/menu-item-button.tsx
"use client";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; // Importamos el CSS de SweetAlert2

interface MenuItemButtonProps {
  menuItemId: number;
}

export const MenuItemButton = ({ menuItemId }: MenuItemButtonProps) => {
  const handleDelete = async () => {
    const confirmResult = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmResult.isConfirmed) {
      const res = await fetch(`/api/menu-items/${menuItemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        Swal.fire(
          "Eliminado",
          "El elemento del menú ha sido eliminado.",
          "success"
        );
        window.location.reload(); // Recargamos la página tras la eliminación
      } else {
        Swal.fire(
          "Error",
          "Hubo un problema al eliminar el elemento.",
          "error"
        );
      }
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
      onClick={handleDelete}
    >
      Eliminar
    </button>
  );
};
