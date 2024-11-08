// src/actions/handleSubmit.ts
"use server";

import { createInvoice, getMenus } from "@/actions";
import { redirect } from "next/navigation";

export async function handleSubmit(formData: FormData) {
  const menus = await getMenus();
  const menuId = parseFloat(formData.get("menuId") as string);
  const quantity = parseFloat(formData.get("quantity") as string);

  const findMenu = menus.find((menu) => menu.id === menuId);

  if (!findMenu) {
    console.error("Menu not found");
    return;
  }

  const totalCost = findMenu.menu.items.reduce((acc, item) => {
    return acc + item.product.unitPrice * item.quantity * quantity;
  }, 0);

  if (findMenu.client.id !== undefined && totalCost !== undefined) {
    await createInvoice({
      clientId: findMenu.client.id,
      menuId,
      quantity,
      totalCost,
    });
    redirect("/sales");
  } else {
    console.error("Client ID is undefined");
  }
}