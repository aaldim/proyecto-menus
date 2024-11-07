//src/app/api/menus/route.ts

import { createMenu } from "@/actions/menu-actions";
import { NextResponse } from "next/server";

// Esta función maneja las solicitudes POST para crear un nuevo menú
export async function POST(request: Request) {
  try {
    const { name, extraCost, clientId, dayOfWeek } = await request.json();

    // Validar que los campos estén presentes
    if (!name || extraCost == null) {
      return NextResponse.json(
        { error: "Nombre y costo extra son requeridos" },
        { status: 400 }
      );
    }

    // Crear el menú en la base de datos
    await createMenu({ name, extraCost, clientId, dayOfWeek });

    // Responder con éxito
    return NextResponse.json(
      { message: "Menú creado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear el menú:", error);
    return NextResponse.json(
      { error: "Error al crear el menú" },
      { status: 500 }
    );
  }
}
