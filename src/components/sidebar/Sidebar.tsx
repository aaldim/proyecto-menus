import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import {
  IoHomeOutline,
  IoCubeOutline,
  IoRestaurantOutline,
  IoPeopleOutline,
  IoCashOutline,
  IoSettingsOutline,
  IoHelpCircleOutline,
  IoExitOutline,
  IoCartOutline,
  IoListOutline,
  IoTimeOutline,
  IoAddCircleOutline,
  IoListCircleOutline,
  IoMenu,
  IoClose,
} from "react-icons/io5";

// Define los tipos de las props
interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const menuItem = [
  {
    icon: <IoHomeOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCubeOutline />,
    title: "Gestión de Productos",
    path: "#",
    subItems: [
      {
        icon: <IoCartOutline />,
        title: "Productos",
        path: "/products",
      },
      {
        icon: <IoListOutline />,
        title: "Clasificadores",
        path: "/classifier",
      },
      {
        icon: <IoTimeOutline />,
        title: "Histórico de Precios",
        path: "/products-history",
      },
    ],
  },
  {
    icon: <IoRestaurantOutline />,
    title: "Creación de Menús",
    path: "#",
    subItems: [
      {
        icon: <IoAddCircleOutline />,
        title: "Nuevo Menú",
        path: "/menus",
      },
      {
        icon: <IoListCircleOutline />,
        title: "Listar Menús",
        path: "/menu-items",
      },
    ],
  },
  {
    icon: <IoPeopleOutline />,
    title: "Gestión de Clientes",
    path: "/clientes",
  },
  {
    icon: <IoCashOutline />,
    title: "Facturación Semanal",
    path: "#",
    subItems: [
      {
        icon: <IoCashOutline />,
        title: "Generar Reportes",
        path: "/facturacion/reportes",
      },
      {
        icon: <IoTimeOutline />,
        title: "Histórico de Facturas",
        path: "/facturacion/historico",
      },
    ],
  },
  {
    icon: <IoSettingsOutline />,
    title: "Configuraciones",
    path: "/configuraciones",
  },
  {
    icon: <IoHelpCircleOutline />,
    title: "Soporte",
    path: "/soporte",
  },
  {
    icon: <IoExitOutline />,
    title: "Salir",
    path: "/logout",
  },
];

export const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  return (
    <>
      {/* Solo renderizamos el botón de hamburguesa cuando el sidebar está cerrado */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed z-50 top-4 left-4 md:hidden bg-gray-200 p-2 rounded-md"
        >
          <IoMenu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 w-64 h-screen bg-white transition-transform duration-300 transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 md:w-64 lg:w-64`}
      >
        <div className="flex justify-between items-center p-6">
          <Link href="/" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
          {/* Botón de cerrar para pantallas pequeñas */}
          <button
            onClick={toggleSidebar}
            className="md:hidden bg-gray-200 p-2 rounded-md"
          >
            <IoClose size={24} />
          </button>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItem.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </aside>
    </>
  );
};
