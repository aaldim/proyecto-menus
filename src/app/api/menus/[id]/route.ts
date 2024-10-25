// src/app/api/menus/[id]/route.ts
import { deleteMenu } from "@/actions/menu-actions";
import { NextResponse } from "next/server";

interface Segments {
  params: {
    id: string;
  };
}

// La ruta sigue siendo DELETE, pero solo desactiva el menú
export async function DELETE(request: Request, { params }: Segments) {
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "ID de menú no proporcionado" },
      { status: 400 }
    );
  }

  try {
    await deleteMenu(id); // Desactiva el menú en lugar de eliminarlo
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
