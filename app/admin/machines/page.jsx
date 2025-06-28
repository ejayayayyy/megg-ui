"use client";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import { useState, useRef } from "react";
import {
  MonitorSmartphone,
  Plus,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
  ChevronDown,
  TriangleAlert,
  ScanQrCode,
  Upload,
  X,
  Trash,
  Trash2,
  SaveOff,
} from "lucide-react";

export default function MachinesPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [machineItems, setMachineItems] = useState([
    {
      id: 1,
      name: "MEGG-1",
      date: "6/23/2025",
      location: "Mangangan I, Baco, Oriental Mindoro",
    },
    {
      id: 2,
      name: "MEGG-2",
      date: "6/25/2025",
      location: "Poblacion 4, Victoria, Oriental Mindoro",
    },
    {
      id: 3,
      name: "MEGG-3",
      date: "6/27/2025",
      location: "Pagkakaisa, Naujan, Oriental Mindoro",
    },
    {
      id: 4,
      name: "MEGG-4",
      date: "6/29/2025",
      location: "Cacawan, Pinamalayan, Oriental Mindoro",
    },
  ]);

  const [showAddMachineModal, setShowAddMachineModal] = useState(false);

  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [machineToDelete, setMachineToDelete] = useState(null); // holds machine object
  const [enteredMachineName, setEnteredMachineName] = useState("");

  const handleDeleteClick = (machine) => {
    setMachineToDelete(machine); // store the machine to delete
    setEnteredMachineName(""); // reset input
    setShowConfirmDeleteModal(true); // show modal
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ name: "", location: "" });

  const [selectedMachine, setSelectedMachine] = useState(null);
  const overviewData = selectedMachine
    ? machineItems.find((machine) => machine.id === selectedMachine)
    : null;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [showRowsDropdown, setShowRowsDropdown] = useState(false);
  const rowsDropdownRef = useRef(null);

  // Total pages calculation
  const totalPages = Math.ceil(machineItems.length / rowsPerPage);

  // Get current page data
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;

  const handleMachineSelect = (machineId) => {
    if (selectedMachine === machineId) {
      setSelectedMachine(null); // Deselect if already selected
    } else {
      setSelectedMachine(machineId);
    }
  };

  // Navigation functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToLastPage = () => setCurrentPage(totalPages);

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
          <Header setSidebarOpen={setSidebarOpen} />

          {/* Main container */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col-reverse xl:flex-row gap-6 items-start">
              <div className="flex flex-col gap-6 w-full">
                {/* total machnes */}
                <div className="relative bg-white rounded-2xl border border-gray-300 p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className=" flex flex-col sm:flex-row sm:flex-1 items-center gap-4">
                    {/* image */}
                    <div className="absolute sm:static top-4 left-4 flex items-center justify-center rounded-full bg-blue-100 p-4">
                      <MonitorSmartphone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                    </div>
                    {/* deets */}
                    <div className="flex flex-col text-center sm:text-start gap-1">
                      <span className="text-gray-500">Total Machines</span>
                      <span className="text-4xl font-bold text-blue-500">
                        {machineItems.length}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setShowAddMachineModal(true)}
                      className="bg-gray-100 transition-colors hover:bg-blue-500 hover:text-white cursor-pointer duration-150 px-4 py-2 rounded-full flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Add machine
                    </button>
                  </div>
                </div>
                {/* machines data */}
                <div className="bg-white rounded-2xl border border-gray-300 p-6 flex flex-col gap-8">
                  {/* list of machines */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-medium">
                      {selectedMachine ? (
                        <div className="flex items-center gap-2">
                          <span className=" text-gray-500">
                            <span className="text-xl font-semibold text-black">
                              {overviewData.name}
                            </span>
                          </span>
                          <button
                            onClick={() => setSelectedMachine(null)}
                            className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer"
                          >
                            (Clear Selection)
                          </button>
                        </div>
                      ) : (
                        <span className="text-xl font-medium">
                          List of Machines
                        </span>
                      )}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      {machineItems.map(({ id, name, date, location }) => (
                        <div
                          key={id}
                          className={`col-span-2 md:col-span-1 rounded-lg  border ${
                            selectedMachine === id
                              ? "border-2 border-blue-500"
                              : "border-gray-300 hover:bg-gray-50"
                          }  flex gap-4 items-center px-4 py-4 transition-colors duration-150 cursor-pointer`}
                          onClick={() => handleMachineSelect(id)}
                        >
                          {/* logo something */}
                          <div className="flex items-center justify-center rounded-full bg-gray-100 p-4">
                            <MonitorSmartphone className="w-6 h-6" />
                          </div>
                          {/* deets */}
                          <div className="flex flex-col">
                            <span className="text-lg font-bold">{name}</span>
                            <span className="text-gray-500 text-sm">
                              Linked: {date}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* pagination */}
                  <div className="flex flex-col-reverse gap-4 items-center justify-center md:flex-row md:justify-between">
                    {/* Pagination controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={goToFirstPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg border ${
                          currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <ChevronsLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg border ${
                          currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="text-sm border rounded-lg px-4 py-2 bg-blue-50 text-blue-600">
                        {currentPage}
                      </div>

                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg border ${
                          currentPage === totalPages
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={goToLastPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg border ${
                          currentPage === totalPages
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <ChevronsRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Rows per page selector */}
                    <div className="relative" ref={rowsDropdownRef}>
                      <button
                        onClick={() => setShowRowsDropdown(!showRowsDropdown)}
                        className="text-sm border rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50"
                      >
                        {rowsPerPage} per page
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            showRowsDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {showRowsDropdown && (
                        <div className="absolute bottom-full mb-2 border bg-white shadow rounded-lg overflow-hidden z-40">
                          {[6, 9, 12, 15].map((value) => (
                            <button
                              key={value}
                              onClick={() => {
                                setRowsPerPage(value);
                                setShowRowsDropdown(false);
                                setCurrentPage(1); // Reset to first page when changing rows per page
                              }}
                              className={`px-4 py-2 text-sm w-full text-left hover:bg-gray-50 ${
                                rowsPerPage === value
                                  ? "bg-blue-50 text-blue-600"
                                  : ""
                              }`}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* select machine to edit */}
              <div className="bg-white rounded-2xl border border-gray-300 p-6 flex flex-col gap-6 w-full xl:max-w-sm">
                {selectedMachine ? (
                  <div className="flex flex-col gap-6">
                    {/* title */}

                    <div className="flex flex-col gap-4 items-center justify-center">
                      {/* validation message (hidden for now) */}
                      {/* <div className="bg-red-200 w-full flex text-red-600 items-center gap-2 rounded-lg px-4 py-2">
                        <TriangleAlert className="w-5 h-5" />
                        validation/error message here
                      </div> */}

                      <div className="bg-gray-100 rounded-full p-4 ">
                        <MonitorSmartphone className="w-10 h-10 mx-auto text-gray-500" />
                      </div>
                      <div className="flex flex-col text-center">
                        {isEditing ? (
                          <input
                            type="text"
                            className="text-center text-xl font-bold rounded-lg border border-gray-300 px-4 py-2 outline-none transition-colors duration-150 focus:border-blue-500"
                            value={editValues.name}
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          <span className="text-center text-xl font-bold">
                            {overviewData.name}
                          </span>
                        )}
                        <span className="text-gray-500 text-sm">
                          {overviewData.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <span className="text-gray-500">Location:</span>
                        {isEditing ? (
                          <input
                            type="text"
                            className="px-4 py-2 rounded-lg border border-gray-300 outline-none transition-colors duration-150 focus:border-blue-500"
                            value={editValues.location}
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                location: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          <span>{overviewData.location}</span>
                        )}
                      </div>
                    </div>

                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black transition-colors duration-150 w-full cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setMachineItems((prev) =>
                              prev.map((item) =>
                                item.id === selectedMachine
                                  ? {
                                      ...item,
                                      name: editValues.name,
                                      location: editValues.location,
                                    }
                                  : item
                              )
                            );
                            setIsEditing(false);
                          }}
                          className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors duration-150 w-full cursor-pointer"
                        >
                          Save changes
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setShowConfirmDeleteModal(true);
                            setMachineToDelete(overviewData);
                          }}
                          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-150 w-full cursor-pointer"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setEditValues({
                              name: overviewData.name,
                              location: overviewData.location,
                            });
                          }}
                          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-150 w-full cursor-pointer"
                        >
                          Modify
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center flex-col gap-4 justify-center py-6">
                    <div className="bg-gray-100 rounded-full p-4 ">
                      <MonitorSmartphone className="w-10 h-10 mx-auto text-gray-500 animate-pulse" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <h3 className="text-lg font-medium">
                        Select a machine to review
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Click on any machine to view its details
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* show add machine modal */}
            {showAddMachineModal && (
              <div className="fixed inset-0 min-h-screen flex items-center justify-center p-4 bg-black/10 backdrop-blur-xs transition-opacity duration-200 opacity-100">
                <div className="bg-white p-6 rounded-2xl w-full max-w-lg relative  flex flex-col gap-6 transform transition-all duration-200 scale-100 opacity-100">
                  {/* close modal */}
                  <button
                    onClick={() => setShowAddMachineModal(false)}
                    className="p-2 absolute top-3 right-3 active:bg-gray-100 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* logo */}
                  <div className="flex flex-col items-center justify-center gap-2 ">
                    <div className="flex items-center p-2 rounded-full bg-blue-500">
                      <MonitorSmartphone className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-center">
                      Add new machine
                    </span>
                  </div>

                  {/* validation message (hidden for now) */}
                  {/* <div className="bg-red-200 w-full flex text-red-600 items-center gap-2 rounded-lg px-4 py-2">
                    <TriangleAlert className="w-5 h-5" />
                    validation/error message here
                  </div> */}

                  <div className="flex flex-col gap-4 p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50">
                    {/* qr logo */}
                    <div className="flex flex-col gap-2 items-center justify-center py-6">
                      <div className="bg-red-500 size-56 rounded-lg text-center">
                        Sample QR Only
                      </div>
                      <span className="text-gray-500 text-center">
                        Scan or upload a QR code to link a machine
                      </span>
                    </div>
                    {/* buttons */}
                    <div className="flex flex-col md:flex-row items-center gap-2">
                      {/* scan */}
                      <button className="flex items-center justify-center text-white hover:bg-blue-600 gap-2 rounded-lg px-4 py-2 bg-blue-500 transition-colors duration-150 cursor-pointer w-full">
                        <ScanQrCode className="w-5 h-5" />
                        Scan QR code
                      </button>
                      {/* upload */}
                      <button className="flex items-center justify-center hover:bg-gray-300 gap-2 rounded-lg px-4 py-2 bg-gray-200 transition-colors duration-150 cursor-pointer w-full">
                        <Upload className="w-5 h-5" />
                        Upload QR code
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* delete modal */}
            {showConfirmDeleteModal && machineToDelete && (
              <div className="fixed inset-0 min-h-screen flex items-center justify-center p-4 bg-black/10 backdrop-blur-xs transition-opacity duration-200 z-50">
                <div className="bg-white p-6 rounded-2xl w-full max-w-md relative flex flex-col gap-6 transform transition-all duration-200">
                  {/* title */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center p-2 rounded-full bg-red-500">
                      <Trash className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-center text-red-600">
                      Confirm Deletion
                    </span>
                  </div>

                  {/* validation message (hidden for now) */}
                  {/* <div className="bg-red-200 w-full flex text-red-600 items-center gap-2 rounded-lg px-4 py-2">
                    <TriangleAlert className="w-5 h-5" />
                    validation/error message here
                  </div> */}

                  {/* input field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-gray-500">
                      Please type <strong>{machineToDelete.name}</strong> to
                      confirm deletion.
                    </label>

                    <input
                      type="text"
                      value={enteredMachineName}
                      onChange={(e) => setEnteredMachineName(e.target.value)}
                      placeholder={`Enter ${machineToDelete.name}`}
                      className="px-4 py-2 border border-gray-300 rounded-lg outline-none transition-colors duration-150 focus:border-red-500"
                    />
                  </div>

                  {/* buttons */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => setShowConfirmDeleteModal(false)}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center justify-center cursor-pointer gap-2 "
                    >
                      <SaveOff className="w-5 h-5" />
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteClick;
                        setShowConfirmDeleteModal(false);
                        setEnteredMachineName("");
                      }}
                      disabled={
                        enteredMachineName.trim() !== machineToDelete.name
                      }
                      className={`px-4 py-2 rounded-lg text-white transition-colors w-full  flex items-center justify-center cursor-pointer gap-2 ${
                        enteredMachineName.trim() !== machineToDelete.name
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 cursor-pointer"
                      }`}
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
