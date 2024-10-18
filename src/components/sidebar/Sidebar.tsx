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
} from "react-icons/io5";

const menuItem = [
  {
    icon: <IoHomeOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  // ! Esto es de la primera semana
  {
    icon: <IoCubeOutline />,
    title: "Gestión de Productos",
    path: "#", // No ruta directa, abre submenú
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
  // TODO: Esto es lo que hay que trabajar
  {
    icon: <IoRestaurantOutline />,
    title: "Creación de Menús",
    path: "#", // No ruta directa, abre submenú
    subItems: [
      {
        icon: <IoAddCircleOutline />,
        title: "Nuevo Menú",
        path: "/menus/new",
      },
      {
        icon: <IoListCircleOutline />,
        title: "Listar Menús",
        path: "/menus",
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
    path: "#", // No ruta directa, abre submenú
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

export const Sidebar = async () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItem.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>
    </aside>
  );
};
