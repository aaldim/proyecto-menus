// src/actions/menu-actions.ts
"use server";
import prisma from "@/lib/prisma"; // Prisma cargado en el servidor

export async function getMenus() {
  return await prisma.menu.findMany();
}

export async function createMenu({
  name,
  extraCost,
}: {
  name: string;
  extraCost: number;
}) {
  return await prisma.menu.create({
    data: {
      name,
      extraCost,
    },
  });
}

export async function deleteMenu(id: number) {
  return await prisma.menu.delete({
    where: { id },
  });
}

export async function getMenuById(id: number) {
  return await prisma.menu.findUnique({
    where: { id },
    include: { items: true }, // Incluimos los items del menú
  });
}

export async function updateMenu(
  id: number,
  data: { name: string; extraCost: number }
) {
  return await prisma.menu.update({
    where: { id },
    data,
  });
}
