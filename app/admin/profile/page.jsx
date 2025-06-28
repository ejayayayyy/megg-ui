"use client";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Image from "next/image";
import { useState } from "react";
import { SaveOff, Trash2, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const basicInfoItems = [
    {
      id: 1,
      label: "Fullname",
      value: "Edward Gatbonton",
    },
    {
      id: 2,
      label: "Gender",
      value: "Male",
    },
    {
      id: 3,
      label: "Birthday",
      value: "September 26, 2003",
    },
    {
      id: 4,
      label: "Age",
      value: 21,
    },
  ];

  const viewProfile = () => {
    router.push("/admin/settings/edit-profile");
  };

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
              <div className="w-full max-w-2xl flex flex-col gap-6 py-2">
                {/* top  */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* left */}
                  <div className="flex flex-col md:flex-row gap-2 items-center md:gap-5">
                    <div className="relative rounded-full w-26 h-26 lg:w-20 lg:h-20 border border-blue-500 overflow-hidden">
                      <Image
                        src="/default.png"
                        alt="Profile"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/*  */}
                    <div className="flex flex-col text-center md:text-start gap-1">
                      <span className="text-xl font-medium">
                        Edward Gatbonton
                      </span>
                      <span className="text-gray-500 text-sm">
                        edwardgatbonton13@gamil.com
                      </span>
                    </div>
                  </div>
                  {/* right */}
                  <div className="flex items-center justify-center">
                    <button
                      onClick={viewProfile}
                      className="rounded-full px-4 py-2 transition-colors duration-150 flex items-center gap-2 bg-gray-100 hover:bg-blue-500 hover:text-white cursor-pointer"
                    >
                      <UserPen className="w-5 h-5" />
                      Edit profile
                    </button>
                  </div>
                </div>
                {/* basic info */}
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Basic information</span>

                  <div className="grid grid-cols-2 gap-4">
                    {basicInfoItems.map(({ id, label, value }) => (
                      <div
                        key={id}
                        className="col-span-2 md:col-span-1 rounded-lg border border-gray-300 p-4 flex flex-col transition-colors duration-150 hover:border-blue-500"
                      >
                        <span className="text-gray-500 text-sm">{label}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* contact */}
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Contact information</span>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1 rounded-lg border border-gray-300 p-4 flex flex-col transition-colors duration-150 hover:border-blue-500">
                      <span className="text-gray-500 text-sm">Email</span>
                      <span className="font-medium">
                        edwardgatbonton13@gmail.com
                      </span>
                    </div>

                    <div className="col-span-2 md:col-span-1 rounded-lg border border-gray-300 p-4 flex flex-col transition-colors duration-150 hover:border-blue-500">
                      <span className="text-gray-500 text-sm">
                        Contact number
                      </span>
                      <span className="font-medium">+63 916 256 1433</span>
                    </div>

                    <div className="col-span-2 rounded-lg border border-gray-300 p-4 flex flex-col transition-colors duration-150 hover:border-blue-500">
                      <span className="text-gray-500 text-sm">
                        Residential address
                      </span>
                      <span className="font-medium">
                        Poblacion 4, Victoria, Oriental Mindoro
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-red-500 px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-150 hover:bg-red-600 cursor-pointer text-white"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* delete modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 min-h-screen flex items-center justify-center p-4 bg-black/10 backdrop-blur-xs transition-opacity duration-200 z-50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-md relative flex flex-col gap-6 transform transition-all duration-200">
              {/* title */}
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center p-2 rounded-full bg-red-500">
                  <Trash2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-center text-red-600">
                  Delete account
                </span>
              </div>

              {/* validation message (hidden for now) */}
              {/* <div className="bg-red-200 w-full flex text-red-600 items-center gap-2 rounded-lg px-4 py-2">
                    <TriangleAlert className="w-5 h-5" />
                    validation/error message here
                  </div> */}

              <div className="flex items-center justify-center">
                <span className="text-gray-500 text-center">
                  <span className="font-bold">Warning:</span> Deleting your
                  account is permanent and cannot be undone.
                </span>
              </div>

              <form action="" className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="">
                    Enter your password to delete account
                  </label>
                  <input
                    type="password"
                    name=""
                    id=""
                    className="rounded-lg px-4 py-2 border border-gray-300 outline-none transition-colors duration-150 focus:border-red-500"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-gray-100 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-150 cursor-pointe flex items-center justify-center gap-2 hover:bg-gray-200"
                  >
                    <SaveOff className="w-5 h-5" />
                    Cancel
                  </button>
                  <button className="bg-red-500 w-full  text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-150 cursor-pointe flex items-center justify-center gap-2 hover:bg-red-600">
                    <Trash2 className="w-5 h-5" />
                    Delete account
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
