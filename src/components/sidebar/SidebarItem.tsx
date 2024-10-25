//src/components/sidebar/SidebarItem.tsx:

"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
  subItems?: Array<{ icon: React.ReactNode; path: string; title: string }>;
}

export const SidebarItem = ({ icon, path, title, subItems }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <li>
        <Link
          href={path}
          className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
                    hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white
                    ${
                      path === pathName
                        ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                        : ""
                    }`}
          onClick={subItems ? toggleSubmenu : undefined} // Toggle submenú si tiene subItems
        >
          {icon}
          <span className="group-hover:text-white-700">{title}</span>
        </Link>
      </li>
      {/* Renderiza los subItems si existen y el menú está abierto */}
      {subItems && isOpen && (
        <ul className="ml-6 space-y-2">
          {subItems.map((subItem) => (
            <li key={subItem.path}>
              <Link
                href={subItem.path}
                className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover:bg-gradient-to-r hover:bg-sky-500 hover:text-white
                                ${
                                  subItem.path === pathName
                                    ? "text-white bg-gradient-to-r from-sky-500 to-cyan-300"
                                    : ""
                                }`}
              >
                {subItem.icon}
                <span className="group-hover:text-white-700">
                  {subItem.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
