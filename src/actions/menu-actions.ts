//src/actions/menu-actions.ts

"use server";
import prisma from "@/lib/prisma"; // Prisma cargado en el servidor
import { Menu, WeekDay } from "@prisma/client";

// Obtener solo los menús activos
export async function getMenus() {
  return await prisma.clientMenu.findMany({
    select: {
      menu: {
        select: {
          id: true,
          name: true,
          extraCost: true,
          isActive: true,
          items: {
            select: {
              product: true,
              quantity: true,
            },
          },
        },
      },
      dayOfWeek: true,
      client: true,
      id: true,
    },
    where: {
      menu: {
        isActive: true,
      },
    },
  });
}

// Crear un nuevo menú
export async function createMenu({
  name,
  extraCost,
  clientId,
  dayOfWeek,
}: {
  name: string;
  extraCost: number;
  clientId: number;
  dayOfWeek: WeekDay;
}) {
  const menu = await prisma.menu.create({
    data: {
      name,
      extraCost,
      isActive: true, // Por defecto, el menú está activo
    },
  });

  const clientMenu = await prisma.clientMenu.create({
    data: {
      clientId,
      menuId: menu.id,
      dayOfWeek,
    },
  });
  return { menu, clientMenu };
}

// Desactivar un menú (en lugar de eliminarlo)
export async function deleteMenu(menuId: number) {
  const menu = await prisma.menu.update({
    where: { id: menuId },
    data: { isActive: false }, // Desactivar el menú
    select: {
      items: true,
    },
  });

  menu.items.forEach(async (item) => {
    await prisma.menuItem.update({
      where: { id: item.id },
      data: { isActive: false }, // Desactivar los items del menú
    });
  });

  return menu;
}

// Obtener un menú por ID, incluyendo sus items
export async function getMenuById(id: number) {
  return await prisma.menu.findUnique({
    where: { id, isActive: true },
    include: {
      items: {
        select: {
          product: true,
          quantity: true,
          id: true,
        },
      },
    }, // Incluimos los items del menú
  });
}

// Actualizar un menú
export async function updateMenu(id: number, data: Menu) {
  return await prisma.menu.update({
    where: { id },
    data,
  });
}
