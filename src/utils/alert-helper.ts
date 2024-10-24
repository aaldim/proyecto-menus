// src/utils/alert-helper.ts
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const showAlert = (
  title: string,
  text: string,
  icon: "success" | "error" | "warning",
  confirmButtonText: string = "Aceptar"
) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
  });
};

export const showConfirmationAlert = async (
  title: string,
  text: string,
  confirmButtonText: string = "Sí, eliminar",
  cancelButtonText: string = "Cancelar"
) => {
  return await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
  });
};
