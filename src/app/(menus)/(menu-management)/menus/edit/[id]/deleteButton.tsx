// components/DeleteButton.tsx
"use client";

import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { deleteTotalMenuItem } from "@/actions";

interface DeleteButtonProps {
  menuItemId: number;
  menuId: number;
}

export const DeleteButton = ({ menuItemId, menuId }: DeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTotalMenuItem(menuItemId); // Llama a la Server Action
    router.push(`/menus/edit/${menuId}`);
  };

  return (
    <IoTrashOutline
      onClick={handleDelete}
      size={24}
      className="hover:text-red-700 cursor-pointer text-red-500"
    />
  );
};