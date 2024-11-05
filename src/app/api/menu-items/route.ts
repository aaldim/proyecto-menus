// src/app/api/menu-items/route.ts
import { createMenuItem } from "@/actions/menu-item-actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { menuId, productId, quantity, cost } = await request.json();

    // Validar que los campos estén presentes
    if (!menuId || !productId || !quantity || cost == null) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Crear el item de menú en la base de datos
    await createMenuItem({ menuId, productId, quantity, cost });

    // Responder con éxito
    return NextResponse.json(
      { message: "Elemento del menú creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear el elemento del menú:", error);
    return NextResponse.json(
      { error: "Error al crear el elemento del menú" },
      { status: 500 }
    );
  }
}
