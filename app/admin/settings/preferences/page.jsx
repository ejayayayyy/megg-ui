"use client";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { useState } from "react";
import { Bell, TriangleAlert } from "lucide-react";

export default function PreferencesPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(
    false
  );

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
                <div className="hidden bg-red-200 text-red-600 items-center gap-2 rounded-lg px-4 py-2">
                  <TriangleAlert className="w-5 h-5" />
                  Validation/error message here.
                </div>
                {/* form */}

                {/* Preferences */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xl font-medium">Notifications</span>
                      <span className="text-gray-500 text-sm">
                        Choose how you want to receive in-app alerts and
                        updates.
                      </span>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationsEnabled}
                        onChange={() =>
                          setNotificationsEnabled((prev) => !prev)
                        }
                      />
                      <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>

                  {notificationsEnabled && (
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <span className=" font-medium">
                            Push notifications
                          </span>
                          <span className="text-gray-500 text-sm">
                            Receive alerts even when you're not actively using
                            the app.
                          </span>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={pushNotificationsEnabled}
                            onChange={() =>
                              setPushNotificationsEnabled((prev) => !prev)
                            }
                          />
                          <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
