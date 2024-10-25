//src/actions/menu-actions.ts

"use server";
import prisma from "@/lib/prisma"; // Prisma cargado en el servidor

// Obtener solo los menús activos
export async function getMenus() {
  return await prisma.menu.findMany({
    where: {
      isActive: true, // Solo los menús activos
    },
  });
}

// Crear un nuevo menú
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
      isActive: true, // Por defecto, el menú está activo
    },
  });
}

// Desactivar un menú (en lugar de eliminarlo)
export async function deleteMenu(menuId: number) {
  return await prisma.menu.update({
    where: { id: menuId },
    data: { isActive: false }, // Desactivar el menú
  });
}

// Obtener un menú por ID, incluyendo sus items
export async function getMenuById(id: number) {
  return await prisma.menu.findUnique({
    where: { id },
    include: { items: true }, // Incluimos los items del menú
  });
}

// Actualizar un menú
export async function updateMenu(
  id: number,
  data: { name: string; extraCost: number }
) {
  return await prisma.menu.update({
    where: { id },
    data,
  });
}
