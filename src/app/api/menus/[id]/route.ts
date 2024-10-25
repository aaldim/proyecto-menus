//src/app/api/menus/[id]/route.ts

import { deleteMenu, updateMenu, getMenuById } from "@/actions/menu-actions"; // Asegúrate de importar createMenu
import { NextResponse } from "next/server";

interface Segments {
  params: {
    id: string;
  };
}

// Crear un nuevo menú
// Esta función maneja las solicitudes POST para crear un nuevo menú

// Obtener un menú por ID
export async function GET(request: Request, { params }: Segments) {
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "ID de menú no proporcionado" },
      { status: 400 }
    );
  }

  try {
    const menu = await getMenuById(id);
    if (!menu) {
      return NextResponse.json(
        { error: "Menú no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(menu, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el menú:", error);
    return NextResponse.json(
      { error: "Error al obtener el menú" },
      { status: 500 }
    );
  }
}

// Actualizar un menú existente
export async function PUT(request: Request, { params }: Segments) {
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "ID de menú no proporcionado" },
      { status: 400 }
    );
  }

  try {
    const { name, extraCost } = await request.json();

    if (!name || extraCost == null) {
      return NextResponse.json(
        { error: "Nombre y costo extra son requeridos" },
        { status: 400 }
      );
    }

    await updateMenu(id, { name, extraCost });

    return NextResponse.json(
      { message: "Menú actualizado con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar el menú:", error);
    return NextResponse.json(
      { error: "Error al actualizar el menú" },
      { status: 500 }
    );
  }
}

// Desactivar (eliminar lógicamente) un menú
export async function DELETE(request: Request, { params }: Segments) {
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "ID de menú no proporcionado" },
      { status: 400 }
    );
  }

  try {
    await deleteMenu(id);
    return NextResponse.json(
      { message: "Menú desactivado con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al desactivar el menú:", error);
    return NextResponse.json(
      { error: "Error al desactivar el menú" },
      { status: 500 }
    );
  }
}
