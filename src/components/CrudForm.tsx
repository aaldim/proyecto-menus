// src/components/CrudForm.tsx
"use client";

import { useState } from "react";
import { showAlert } from "../utils/alert-helper";

interface FieldOption {
  value: string | number;
  label: string;
}

interface CrudFormProps<T> {
  initialData?: T;
  fields: {
    name: keyof T;
    label: string;
    type: string;
    options?: FieldOption[]; // Opciones solo para campos de tipo select
  }[];
  onSubmit: (data: T) => Promise<void>;
  isEditMode: boolean;
}

export default function CrudForm<T>({
  initialData,
  fields,
  onSubmit,
  isEditMode,
}: CrudFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialData || ({} as T));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: (typeof formData[name as keyof T] === "number"
        ? Number(value)
        : value) as T[keyof T], // Convertimos a número si el tipo de campo es numérico
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      showAlert(
        isEditMode ? "Actualizado" : "Creado",
        `El registro ha sido ${
          isEditMode ? "actualizado" : "creado"
        } con éxito.`,
        "success"
      );
    } catch {
      showAlert("Error", "Hubo un problema al enviar el formulario.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name as string} className="flex flex-col">
          <label className="block mb-2">{field.label}:</label>

          {field.type === "select" && field.options ? (
            <select
              name={field.name as string}
              value={String(formData[field.name]) || ""}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            >
              {field.options.map((option) => (
                <option key={option.value} value={String(option.value)}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={field.name as string}
              type={field.type}
              value={String(formData[field.name]) || ""}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          )}
        </div>
      ))}
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        {isEditMode ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
