// components/DeleteButton.tsx
"use client";

import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { deleteTotalSale } from "@/actions";

interface DeleteButtonProps {
  saleId: number;
}

export const DeleteButton = ({ saleId }: DeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTotalSale(saleId); // Llama a la Server Action
    router.push(`/sales`);
  };

  return (
    <IoTrashOutline
      onClick={handleDelete}
      size={24}
      className="hover:text-red-700 cursor-pointer text-red-500"
    />
  );
};