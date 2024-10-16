// src/actions/product-actions.ts
'use server';
import prisma from "@/lib/prisma"; // Prisma cargado en el servidor

export async function getProducts() {
  return await prisma.product.findMany();
}

export async function createProduct({
  description,
  unitPrice,
  costPrice,
}: {
  description: string;
  unitPrice: number;
  costPrice: number;
}) {
  return await prisma.product.create({
    data: {
      description,
      unitPrice,
      costPrice,
    },
  });
}

export async function deleteProduct(id: number) {
  return await prisma.product.delete({
    where: { id },
  });
}


export async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: { id },
  });
}

export async function updateProduct(id: number, data: { description: string; unitPrice: number }) {
  await updateProductPrice(id, data.unitPrice, "admin");
  return await prisma.product.update({
    where: { id },
    data,
  });
}


// Función para actualizar el precio del producto y registrar el cambio en el historial
export async function updateProductPrice(productId: number, newPrice: number, userId: string) {
  // Primero, obtener el producto actual para comparar el precio
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  // Verificar si el precio ha cambiado
  if (product.unitPrice !== newPrice) {
    // Registrar el cambio en la tabla de historial
    await prisma.priceHistory.create({
      data: {
        productId: product.id,
        oldPrice: product.unitPrice,   // Precio anterior
        newPrice: newPrice,        // Nuevo precio
        changedBy: userId,         // Usuario que hizo el cambio
      },
    });

    // Actualizar el precio del producto
    return await prisma.product.update({
      where: { id: productId },
      data: { unitPrice: newPrice },
    });
  } else {
    throw new Error("El precio no ha cambiado");
  }
}


