"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  CircleUserRound,
  Settings,
  DoorOpen,
  Package,
  Monitor,
  FolderClock,
  ChevronDown,
  ChevronUp,
  ArrowUpNarrowWide,
  Bug,
  Bell,
  UserPen,
  KeyRound,
  MonitorCog,
} from "lucide-react";

import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [historyDropdown, setHistoryDropdown] = useState(false);
  const [manageAccountDropdown, setManageAccountDropdown] = useState(false);
 

  const handleLogout = async () => {
    try {
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  const isActive = (href) => pathname === href;

  const menus = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Inventory", href: "/admin/inventory", icon: Package },
    { name: "Machines", href: "/admin/machines", icon: Monitor },
  ];

  const historyLinks = [
    {
      name: "Sort history",
      href: "/admin/history/sort",
      icon: ArrowUpNarrowWide,
    },
    {
      name: "Defect history",
      href: "/admin/history/defect",
      icon: Bug,
    },
  ];

  const manageAccountLinks = [
    {
      name: "Edit profile",
      href: "/admin/settings/edit-profile",
      icon: UserPen,
    },
    {
      name: "Change password",
      href: "/admin/settings/change-password",
      icon: KeyRound,
    },
    {
      name: "Preferences",
      href: "/admin/settings/preferences",
      icon: MonitorCog,
    },
  ];

  return (
    <div className="w-full max-w-xs text-[#1F2421]">
      <div className="flex flex-col lg:border border-gray-300 lg:shadow p-6 rounded-2xl gap-6 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logoblue.png"
            alt="Spenderly Logo"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-blue-900">MEGG</h1>
            <span className="text-gray-500 text-xs">
              Smart Egg Quality & Defect Detection
            </span>
          </div>
        </div>

        {/* Menus */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-gray-500">Menus</span>
            {menus.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-150 ${
                  isActive(href)
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            ))}

            {/* History Dropdown */}
            <button
              onClick={() => setHistoryDropdown((prev) => !prev)}
              className="flex items-center justify-between px-4 py-2 rounded-lg transition-colors duration-150 cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <FolderClock className="w-5 h-5" />
                History
              </div>
              {historyDropdown ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {historyDropdown && (
              <div className="flex flex-col gap-2 border-l-4 border-gray-500 ms-4">
                {historyLinks.map(({ name, href, icon: Icon }) => (
                  <Link
                    key={name}
                    href={href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-150 ${
                      isActive(href)
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          

          {/* Management */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-gray-500">Management</span>
            <Link
              href="/admin/profile"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-150 ${
                isActive("/admin/profile")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <CircleUserRound className="w-5 h-5" />
              Profile
            </Link>

            {/* Settings Dropdown */}
            <button
              onClick={() => setManageAccountDropdown((prev) => !prev)}
              className="flex items-center justify-between px-4 py-2 rounded-lg transition-colors duration-150 cursor-pointer hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </div>
              {manageAccountDropdown ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {manageAccountDropdown && (
              <div className="flex flex-col gap-2 border-l-4 border-gray-500 ms-4">
                {manageAccountLinks.map(({ name, href, icon: Icon }) => (
                  <Link
                    key={name}
                    href={href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-150 ${
                      isActive(href)
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {name}
                  </Link>
                ))}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-200 transition-colors duration-150 cursor-pointer"
            >
              <DoorOpen className="w-5 h-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
