// src/hooks/useCrudAlerts.ts
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export function useCrudAlerts() {
  const showSuccessAlert = async (message: string) => {
    await Swal.fire({
      title: "Operación Exitosa",
      text: message,
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  const showErrorAlert = async (message: string) => {
    await Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  const showConfirmationAlert = async (message: string) => {
    return await Swal.fire({
      title: "¿Estás seguro?",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, continuar",
    });
  };

  return { showSuccessAlert, showErrorAlert, showConfirmationAlert };
}
