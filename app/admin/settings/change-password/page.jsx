"use client";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import Image from "next/image";
import { useState } from "react";
import {
  Save,
  SaveOff,
  Trash2,
  TriangleAlert,
  Upload,
  UserPen,
} from "lucide-react";

export default function ChangePasswordPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen container mx-auto text-[#1F2421] relative">
      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed z-50 inset-y-0 left-0 w-80 bg-white transform shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Navbar />
      </div>

      {/* MAIN */}
      <div className="flex gap-6 p-4 md:p-6">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Navbar />
        </div>

        <div className="flex flex-1 flex-col gap-6 w-full">
          {/* Header */}
          <Header setSidebarOpen={setSidebarOpen} />

          {/* Main container */}
          <div className="flex flex-col gap-6">
            <div className="flex w-full bg-white p-6 rounded-2xl border justify-center border-gray-300 shadow">
              <div className="w-full max-w-lg flex flex-col py-2 gap-6">

                {/* validation/error message (hidden for now) */}
                {/* <div className="flex bg-red-200 text-red-600 items-center gap-2 rounded-lg px-4 py-2">
                  <TriangleAlert className="w-5 h-5" />
                  Validation/error message here.
                </div> */}

                {/* form */}
                <form action="" className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500">
                      Current password
                    </label>
                    <input
                      type="password"
                      name=""
                      id=""
                      className="rounded-lg border px-4 py-2 border-gray-300 transition-colors duration-150 outline-none focus:border-blue-500"
                      placeholder="Enter your current password"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500">
                      New password
                    </label>
                    <input
                      type="password"
                      name=""
                      id=""
                      className="rounded-lg border px-4 py-2 border-gray-300 transition-colors duration-150 outline-none focus:border-blue-500"
                      placeholder="Enter your new password"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-gray-500">
                      Re-enter password
                    </label>
                    <input
                      type="password"
                      name=""
                      id=""
                      className="rounded-lg border px-4 py-2 border-gray-300 transition-colors duration-150 outline-none focus:border-blue-500"
                      placeholder="Confirm your password"
                    />
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-end gap-2">
                    <button className="w-full sm:w-auto justify-center px-4 py-2 rounded-lg bg-gray-100 transition-colors duration-150 hover:bg-gray-200 flex items-center gap-2 cursor-pointer">
                      <SaveOff className="w-5 h-5" />
                      Discard
                    </button>
                    <button className="w-full sm:w-auto justify-center px-4 py-2 rounded-lg bg-green-500 text-white transition-colors duration-150 hover:bg-green-600 flex items-center gap-2 cursor-pointer">
                      <Save className="w-5 h-5" />
                      Change password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
