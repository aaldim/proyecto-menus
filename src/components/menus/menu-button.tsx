"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCrudAlerts } from "@/hooks/useCrudAlerts";

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
        method: "DELETE", // Sigue siendo DELETE pero desactiva el menú
      });

      if (res.ok) {
        await showSuccessAlert("Menú desactivado exitosamente.");
        router.refresh(); // Refresca la página
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
      className={`bg-red-500 text-white px-4 py-2 rounded-md mr-2 ${
        isDeleting ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Desactivando..." : "Eliminar"}
    </button>
  );
};
