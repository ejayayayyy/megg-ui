"use client";

import { useState } from "react";
import { Egg, Bug } from "lucide-react";
import { TotalEggsChart } from "./ui/TotalEggsChart";
import { TotalEggDefectChart } from "./ui/TotalEggDefectChart";
import { EggSizesChart } from "./ui/EggSizesChart";
import { EggDefectsChart } from "./ui/EggDefectsChart";
import { EggSizeStats } from "./ui/EggSizeStats";
import { EggDefectStats } from "./ui/EggDefectStats";

export default function EggCharts() {
  const [timeFrame, setTimeFrame] = useState("daily");
  const [chartType, setChartType] = useState("total");
  const [activeTab, setActiveTab] = useState("sizing"); // "sizing" or "defects"

  return (
    <div className="flex flex-col gap-6">
      {/* toggle buttons */}
      <div className="flex gap-4 items-center justify-center">
        <button
          className={`rounded-full px-4 py-2 flex items-center gap-2 transition-colors duration-150 cursor-pointer ${
            activeTab === "sizing"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("sizing")}
        >
          <Egg className="w-5 h-5" />
          Egg Sizing
        </button>

        <button
          className={`rounded-full px-4 py-2 flex items-center gap-2 transition-colors duration-150 cursor-pointer ${
            activeTab === "defects"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("defects")}
        >
          <Bug className="w-5 h-5" />
          Egg Defects
        </button>
      </div>

      {/* chart */}
      <div className="flex flex-1 flex-col bg-white rounded-2xl border border-gray-300 shadow p-6 gap-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          {/* Dynamic Title */}
          <h3 className="text-xl font-medium">
            {activeTab === "sizing"
              ? "Egg Size Overview"
              : "Egg Defects Overview"}
          </h3>
          {/* time frams */}
          <div className="flex items-center gap-4">
            <select
              className="w-full sm:w-auto rounded-full border border-gray-300 transition-colors duration-150 px-4 py-2 focus:border-blue-500 outline-none"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
            <select
              className="w-full sm:w-auto rounded-full border border-gray-300 transition-colors duration-150 px-4 py-2 focus:border-blue-500 outline-none"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="total">Total Eggs</option>
              <option value="details">
                {activeTab === "sizing" ? "Egg Sizes" : "Defect Types"}
              </option>
            </select>
          </div>
        </div>

        {/* actual chart */}
        <div className="h-auto">
          {activeTab === "sizing" ? (
            chartType === "total" ? (
              <TotalEggsChart timeFrame={timeFrame} />
            ) : (
              <EggSizesChart timeFrame={timeFrame} />
            )
          ) : chartType === "total" ? (
            <TotalEggDefectChart timeFrame={timeFrame} />
          ) : (
            <EggDefectsChart timeFrame={timeFrame} />
          )}
        </div>
      </div>
      {/* stats */}
      {activeTab === "sizing" ? <EggSizeStats /> : <EggDefectStats />}
    </div>
  );
}
