// src/actions/menu-item-actions.ts
"use server";
import prisma from "@/lib/prisma";

export async function getMenuItems() {
  return await prisma.menuItem.findMany({
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
    },
  });
}

export async function updateMenuItem(
  id: number,
  data: { quantity: number; cost: number }
) {
  return await prisma.menuItem.update({
    where: { id },
    data,
  });
}

export async function deleteMenuItem(id: number) {
  return await prisma.menuItem.delete({
    where: { id },
  });
}
