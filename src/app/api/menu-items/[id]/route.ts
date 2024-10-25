import {
  deleteMenuItem,
  getMenuItemById,
  updateMenuItem,
} from "@/actions/menu-item-actions";
import { NextResponse } from "next/server";

interface Segments {
  params: {
    id: string;
  };
}

// Obtener un elemento del menú por ID
export async function GET(request: Request, { params }: Segments) {
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "ID del elemento no proporcionado" },
      { status: 400 }
    );
  }

  try {
    const menuItem = await getMenuItemById(id);
    if (!menuItem) {
      return NextResponse.json(
        { error: "Elemento del menú no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(menuItem, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el elemento del menú:", error);
    return NextResponse.json(
      { error: "Error al obtener el elemento del menú" },
      { status: 500 }
    );
  }
}

// Actualizar un elemento del menú
export async function PUT(request: Request, { params }: Segments) {
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "ID del elemento no proporcionado" },
      { status: 400 }
    );
  }

  try {
    const { quantity, cost } = await request.json();

    if (quantity == null || cost == null) {
      return NextResponse.json(
        { error: "Cantidad y costo son requeridos" },
        { status: 400 }
      );
    }

    await updateMenuItem(id, { quantity, cost });

    return NextResponse.json(
      { message: "Elemento del menú actualizado con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar el elemento del menú:", error);
    return NextResponse.json(
      { error: "Error al actualizar el elemento del menú" },
      { status: 500 }
    );
  }
}

// Desactivar un elemento del menú
export async function DELETE(request: Request, { params }: Segments) {
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "ID del elemento no proporcionado" },
      { status: 400 }
    );
  }

  try {
    await deleteMenuItem(id);
    return NextResponse.json(
      { message: "Elemento del menú desactivado con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al desactivar el elemento del menú:", error);
    return NextResponse.json(
      { error: "Error al desactivar el elemento del menú" },
      { status: 500 }
    );
  }
}
