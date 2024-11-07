//src/actions/menu-actions.ts

"use server";
import prisma from "@/lib/prisma"; // Prisma cargado en el servidor

// Obtener solo los menús activos
export async function getInvoices() {
  return await prisma.invoice.findMany({
    select: {
      id: true,
      client: true,
      totalCost: true,
      quantity: true,
      menu: {
        select: {
          name: true,
          items: true,
        },
      },
    },
  });
}

// Crear un nuevo menú
export async function createInvoice({
  clientId,
  menuId,
  quantity,
  totalCost,
}: {
  clientId: number;
  menuId: number;
  quantity: number;
  totalCost: number;
}) {
  return await prisma.invoice.create({
    data: {
      clientId,
      menuId,
      quantity,
      totalCost,
    },
  });
}
//   const clientMenu = await prisma.clientMenu.create({
//     data: {
//       clientId,
//       menuId: menu.id,
//       dayOfWeek,
//     },
//   });
//   return { menu, clientMenu };
// }

// // Desactivar un menú (en lugar de eliminarlo)
// export async function deleteMenu(menuId: number) {
//   const menu = await prisma.menu.update({
//     where: { id: menuId },
//     data: { isActive: false }, // Desactivar el menú
//     select: {
//       items: true,
//     },
//   });

//   menu.items.forEach(async (item) => {
//     await prisma.menuItem.update({
//       where: { id: item.id },
//       data: { isActive: false }, // Desactivar los items del menú
//     });
//   });

//   return menu;
// }

// // Obtener un menú por ID, incluyendo sus items
// export async function getMenuById(id: number) {
//   return await prisma.menu.findUnique({
//     where: { id, isActive: true },
//     include: {
//       items: {
//         select: {
//           product: true,
//           quantity: true,
//         },
//       },
//     }, // Incluimos los items del menú
//   });
// }

// // Actualizar un menú
// export async function updateMenu(id: number, data: Menu) {
//   return await prisma.menu.update({
//     where: { id },
//     data,
//   });
// }
