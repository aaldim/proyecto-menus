//src/components/menus/menu-button.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCrudAlerts } from "@/hooks/useCrudAlerts";
import { IoTrashOutline } from "react-icons/io5"; // Importamos el ícono de eliminar

interface MenuButtonProps {
  menuId: number;
}

export const MenuButton = ({ menuId }: MenuButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { showSuccessAlert, showErrorAlert, showConfirmationAlert } =
    useCrudAlerts();

  const handleDelete = async () => {
    const result = await showConfirmationAlert(
      "¿Estás seguro de que deseas desactivar este menú?"
    );

    if (!result.isConfirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`/api/menus/${menuId}`, {
        method: "DELETE", // Enviar la solicitud DELETE para desactivar el menú
      });

      if (res.ok) {
        await showSuccessAlert("Menú desactivado exitosamente.");
        // En lugar de refrescar toda la página, puedes manejar esto con un cambio de estado o redirigir a la lista
        router.refresh(); // Esto solo refresca el componente actual, sin recargar toda la página
      } else {
        const errorData = await res.json();
        await showErrorAlert(errorData.error || "Error desconocido.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      await showErrorAlert("Error de red al desactivar el menú.");
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
