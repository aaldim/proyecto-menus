"use client"; // Esto indica que es un Client Component

interface MenuButtonProps {
  menuId: number; // Recibimos el ID del menú como prop
}

export const MenuButton = ({ menuId }: MenuButtonProps) => {
  const handleDelete = async () => {
    const res = await fetch(`/api/menus/${menuId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Error al eliminar el menú.");
    }
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
      onClick={handleDelete}
    >
      Eliminar
    </button>
  );
};
