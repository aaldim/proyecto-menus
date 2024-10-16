import prisma from "@/lib/prisma";

// src/actions/product-actions.ts

export async function getProductHistory() {
  return await prisma.priceHistory.findMany({
    orderBy: { changedAt: "desc" },
    include: {
      product: {
        select: {
          description: true, // Incluir solo la descripción del producto
        },
      },
    },
  });
}
