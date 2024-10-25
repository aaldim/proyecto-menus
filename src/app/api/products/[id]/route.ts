import { deleteProduct } from "@/actions/product-actions";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Segments {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: Segments) {
  const id = params.id;

  if (!id) {
    return NextResponse.json("ID de producto no proporcionado", {
      status: 400,
    });
  }

  try {
    // Eliminar el producto por ID y verificar que pertenezca al usuario autenticado
    await deleteProduct(Number(id));

    return NextResponse.json("Producto eliminado con éxito", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al eliminar el producto" },
      { status: 400 }
    );
  }
}
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return NextResponse.json(
      { error: "Error al obtener los productos" },
      { status: 500 }
    );
  }
}
