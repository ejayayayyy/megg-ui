"use client";

import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import { useState } from "react";
import {
  ArrowUpWideNarrow,
  ChartNoAxesCombined,
  CalendarRange,
  Package,
} from "lucide-react";

import DefectLog from "./components/DefectLog";
import DailySummary from "./components/DailySummary";
import Statistics from "./components/Statistics";
import BatchReview from "./components/BatchReview";

export default function DefectHistoryPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("defectLog");

  const navItems = [
    { name: "Defect Log", value: "defectLog", icon: ArrowUpWideNarrow },
    { name: "Statistics", value: "statistics", icon: ChartNoAxesCombined },
    { name: "Daily Summary", value: "dailySummary", icon: CalendarRange },
    { name: "Batch Review", value: "batchReview", icon: Package },
  ];

  // Get the currently selected tab
  const selectedOption = navItems.find(
    (option) => option.value === selectedTab
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
            {/* nav items */}
            <div className=" flex items-center md:justify-center gap-4 overflow-x-auto">
              <button
                onClick={() => setSelectedTab("defectLog")}
                className={`px-4 py-2 rounded-full flex items-center gap-2 shrink-0 cursor-pointer transition-colors duration-150 ${
                  selectedTab === "defectLog"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <ArrowUpWideNarrow className="w-5 h-5" />
                Defect Log
              </button>

              <button
                onClick={() => setSelectedTab("statistics")}
                className={`px-4 py-2 rounded-full flex items-center gap-2 shrink-0 cursor-pointer transition-colors duration-150 ${
                  selectedTab === "statistics"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <ChartNoAxesCombined className="w-5 h-5" />
                Statistics
              </button>

              <button
                onClick={() => setSelectedTab("dailySummary")}
                className={`px-4 py-2 rounded-full flex items-center gap-2 shrink-0 cursor-pointer transition-colors duration-150 ${
                  selectedTab === "dailySummary"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <CalendarRange className="w-5 h-5" />
                Daily Summary
              </button>

              <button
                onClick={() => setSelectedTab("batchReview")}
                className={`px-4 py-2 rounded-full flex items-center gap-2 shrink-0 cursor-pointer transition-colors duration-150 ${
                  selectedTab === "batchReview"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <Package className="w-5 h-5" />
                Batch Review
              </button>
            </div>

            {/* main content */}
            {selectedTab === "defectLog" && <DefectLog />}
            {selectedTab === "statistics" && <Statistics />}
            {selectedTab === "dailySummary" && <DailySummary />}
            {selectedTab === "batchReview" && <BatchReview />}
          </div>
        </div>
      </div>
    </div>
  );
}
