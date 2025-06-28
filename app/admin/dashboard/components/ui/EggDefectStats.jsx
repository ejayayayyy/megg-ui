"use client";

import { useState, useEffect } from "react";
import { EggDefectDonutChart } from "./EggDefectDonutChart";
import { StatItem } from "./StatItem";
import { getDefectStats, getDefectDistribution } from "../../../../lib/api";
import { Search, Clock, Bug, Blend } from "lucide-react";

export function EggDefectStats() {
  const [stats, setStats] = useState({
    totalEggs: 0,
    avgEggsPerHour: 0,
    defectRate: "0.00%",
    mostCommonDefect: "None",
  });
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, segmentsData] = await Promise.all([
          getDefectStats(),
          getDefectDistribution(),
        ]);

        setStats(statsData);

        // Check if there's any data at all
        const totalCount = segmentsData.reduce(
          (sum, segment) => sum + segment.count,
          0
        );

        if (totalCount > 0) {
          // Calculate the average percentage for each defect type
          const totalPercentage = segmentsData.reduce(
            (sum, segment) => sum + segment.percentage,
            0
          );

          // Calculate average percentage for each segment
          const averagedSegments = segmentsData.map((segment) => ({
            ...segment,
            // For segments with data, calculate their proportion of the total
            percentage:
              segment.percentage > 0
                ? Math.round((segment.percentage / totalPercentage) * 100)
                : 0,
          }));

          setSegments(averagedSegments);
          setHasData(true);
        } else {
          // If no data, set all percentages to 0
          const emptySegments = segmentsData.map((segment) => ({
            ...segment,
            percentage: 0,
            count: 0,
          }));

          setSegments(emptySegments);
          setHasData(false);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching egg defect stats:", err);
        setError("Failed to load egg defect statistics");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-6 animate-pulse ">
        <div className="grid grid-cols-2 gap-6 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="col-span-1 md:col-span-2 xl:col-span-1 bg-gray-200 p-6 rounded-2xl h-32"
            ></div>
          ))}
        </div>
        <div className="flex flex-col gap-4 bg-gray-100 p-6 rounded-2xl border h-96"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-6 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Egg Distribution Doughnut Chart */}
      <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-300 shadow w-full max-w-md">
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-medium">Egg Defect Distribution</h3>
          <p className="text-sm text-gray-500">Average percentage of defects</p>
        </div>

        <div className="size-72 mx-auto relative">
          {hasData ? (
            <EggDefectDonutChart />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-500">No defect data available</div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {hasData ? (
            segments.map((segment, index) => (
              <StatItem
                key={index}
                label={segment.name}
                value={`${segment.percentage}%`}
                color={segment.color}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              No data to display
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="col-span-2 xl:col-span-2 bg-gradient-to-l from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow flex items-center justify-between gap-4 xl:gap-8">
          <div className="flex items-center justify-center p-2 rounded-full bg-blue-400">
            <Search className="w-12 h-12 xl:w-10 xl:h-10 animate-pulse" />
          </div>

          <div className="flex flex-col gap-2 text-end">
            <h3 className="text-3xl font-semibold">
              {stats.totalEggs.toLocaleString()}
            </h3>
            <span className="text-gray-50 text-sm">Total Eggs Inspected</span>
          </div>
        </div>
        <div className="col-span-2 xl:col-span-2 bg-gradient-to-l from-green-400 to-green-500 text-white p-6 rounded-2xl shadow flex items-center justify-between gap-4 xl:gap-8">
          <div className="flex items-center justify-center p-2 rounded-full bg-green-300">
            <Clock className="w-12 h-12 xl:w-10 xl:h-10" />
          </div>

          <div className="flex flex-col gap-2 text-end">
            <h3 className="text-3xl font-semibold">{stats.avgEggsPerHour}</h3>
            <span className="text-gray-50 text-sm">Avg. Eggs /hr</span>
          </div>
        </div>
        <div className="col-span-2 xl:col-span-2 bg-gradient-to-l from-purple-400 to-purple-500 text-white p-6 rounded-2xl shadow flex items-center justify-between gap-4 xl:gap-8">
          <div className="flex items-center justify-center p-2 rounded-full bg-purple-300">
            <Bug className="w-12 h-12 xl:w-10 xl:h-10" />
          </div>

          <div className="flex flex-col gap-2 text-end">
            <h3 className="text-3xl font-semibold">{stats.defectRate}</h3>
            <span className="text-gray-50 text-sm">Defect Rate</span>
          </div>
        </div>
        <div className="col-span-2 xl:col-span-2 bg-gradient-to-l from-yellow-400 to-yellow-500 text-white p-6 rounded-2xl shadow flex items-center justify-between gap-4 xl:gap-8">
          <div className="flex items-center justify-center p-2 rounded-full bg-yellow-300">
            <Blend className="w-12 h-12 xl:w-10 xl:h-10" />
          </div>

          <div className="flex flex-col gap-2 text-end">
            <h3 className="text-3xl font-semibold">{stats.mostCommonDefect}</h3>
            <span className="text-gray-50 text-sm">
              Most Common Detected Eggs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
