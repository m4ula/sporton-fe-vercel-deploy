"use client";

import { logout } from "@/app/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiBox,
  FiCreditCard,
  FiLayers,
  FiLogOut,
  FiShoppingCart,
} from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      name: "Products",
      icon: FiBox,
      link: "/admin/products",
    },
    {
      name: "Categories",
      icon: FiLayers,
      link: "/admin/categories",
    },
    {
      name: "Transactions",
      icon: FiShoppingCart,
      link: "/admin/transactions",
    },
    {
      name: "Bank Informations",
      icon: FiCreditCard,
      link: "/admin/bank-info",
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <aside className="w-80 min-h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      <div className="py-8 px-14 border-b border-gray-200">
        <Image
          src="/images/logo-admin.svg"
          alt="logo admin"
          width={215}
          height={36}
        />
      </div>

      <div className="flex flex-col gap-2 mt-12 p-5">
        {menuItems.map((item, index) => {
          const isActive = item.link === pathname;

          return (
            <Link
              href={item.link}
              key={index}
              className={`flex gap-3 items-center py-3 px-4 rounded-lg font-medium duration-300
                ${isActive
                  ? "bg-primary/15 text-primary"
                  : "hover:bg-gray-100"
                }`}
            >
              <item.icon size={24} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <button
        className="cursor-pointer mt-auto mx-5 mb-10 flex gap-3 items-center rounded-lg py-3 px-4 font-medium duration-300 hover:bg-gray-100"
        onClick={handleLogout}
      >
        <FiLogOut size={24} />
        <span>Log Out</span>
      </button>
    </aside>
  );
};

export default Sidebar;