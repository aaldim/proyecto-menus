"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCrudAlerts } from "@/hooks/useCrudAlerts";
import { IoTrashOutline } from "react-icons/io5"; // Importamos el ícono de eliminar

interface MenuItemButtonProps {
  menuItemId: number;
}

export const MenuItemButton = ({ menuItemId }: MenuItemButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { showSuccessAlert, showErrorAlert, showConfirmationAlert } =
    useCrudAlerts();

  const handleDelete = async () => {
    const result = await showConfirmationAlert(
      "¿Estás seguro de que deseas desactivar este elemento del menú?"
    );

    if (!result.isConfirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/menu-items/${menuItemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await showSuccessAlert("Elemento del menú desactivado exitosamente.");
        router.refresh(); // Refresca la lista de items sin recargar toda la página
      } else {
        const errorData = await res.json();
        await showErrorAlert(errorData.error || "Error desconocido.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      await showErrorAlert("Error de red al desactivar el elemento.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`${
        isDeleting ? "opacity-50 cursor-not-allowed" : "text-red-500"
      }`}
      disabled={isDeleting}
    >
      <IoTrashOutline size={24} className="hover:text-red-700 cursor-pointer" />
    </button>
  );
};
