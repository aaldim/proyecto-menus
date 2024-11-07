//src/actions/menu-item-actions.ts

"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Obtener solo los items activos
export async function getMenuItems() {
  return await prisma.menuItem.findMany({
    where: {
      isActive: true, // Solo los items activos
    },
    include: {
      menu: true,
      product: true,
    },
  });
}

export async function getMenuItemById(id: number) {
  return await prisma.menuItem.findUnique({
    where: { id },
    include: {
      menu: true,
      product: true,
    },
  });
}

// Crear un nuevo item de menú
export async function createMenuItem({
  menuId,
  productId,
  quantity,
  cost,
}: {
  menuId: number;
  productId: number;
  quantity: number;
  cost: number;
}) {
  return await prisma.menuItem.create({
    data: {
      menuId,
      productId,
      quantity,
      cost,
      isActive: true, // Por defecto, los items están activos
    },
  });
}

// Actualizar un item de menú
export async function updateMenuItem(
  id: number,
  data: { quantity: number; cost: number }
) {
  return await prisma.menuItem.update({
    where: { id },
    data,
  });
}

// Desactivar un item de menú (en lugar de eliminarlo)
export async function deleteMenuItem(id: number) {
  return await prisma.menuItem.update({
    where: { id },
    data: { isActive: false }, // Desactivar el item de menú
  });
}

export async function deleteTotalMenuItem(id: number) {
  const deleteMenuItem =  await prisma.menuItem.delete({
    where: { id },
  });

  revalidatePath("/menus");
  return deleteMenuItem
}


export async function deleteTotalSale(id: number) {
  const deleteMenuItem =  await prisma.invoice.delete({
    where: { id },
  });

  revalidatePath("/sales");
  return deleteMenuItem
}