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

export default function EditProfilePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/default.png");

  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState("");

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleBirthdayChange = (e) => {
    const value = e.target.value;
    setBirthday(value);

    const computedAge = calculateAge(value);
    setAge(computedAge);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file size (5MB limit)
    const fileSize = file.size / 1024 / 1024; // Convert to MB
    if (fileSize > 5) {
      setGlobalMessage("Image size must not exceed 5MB");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setGlobalMessage("Please log in to upload an image");
        return;
      }

      // Store original data for change tracking
      const oldData = { ...userData };

      // Create a reference to the storage location
      const storageRef = ref(storage, `profile-images/${user.uid}`);

      // Upload the file
      await uploadBytes(storageRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update the user document with the new image URL
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        profileImageUrl: downloadURL,
      });

      // Update state
      setProfileImage(downloadURL);
      setUserData((prev) => ({
        ...prev,
        profileImageUrl: downloadURL,
      }));

      // Track changes and create notifications
      const newData = { ...userData, profileImageUrl: downloadURL };
      await trackProfileChanges(user.uid, oldData, newData);

      setGlobalMessage("Profile image updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setGlobalMessage("Error uploading image");
    }

    setTimeout(() => {
      setGlobalMessage("");
    }, 3000);
  };

  const handleImageRemove = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setGlobalMessage("Please log in to remove the image");
        return;
      }

      // Store original data for change tracking
      const oldData = { ...userData };

      // Delete the image from storage if it exists
      if (userData.profileImageUrl) {
        const storageRef = ref(storage, `profile-images/${user.uid}`);
        await deleteObject(storageRef);
      }

      // Update the user document
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        profileImageUrl: "",
      });

      // Update state
      setProfileImage("/default.png");
      setUserData((prev) => ({
        ...prev,
        profileImageUrl: "",
      }));

      // Track changes and create notifications
      const newData = { ...userData, profileImageUrl: "" };
      await trackProfileChanges(user.uid, oldData, newData);

      setGlobalMessage("Profile image removed successfully!");
    } catch (error) {
      console.error("Error removing image:", error);
      setGlobalMessage("Error removing image");
    }

    setTimeout(() => {
      setGlobalMessage("");
    }, 3000);
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
                
                {/* validation/error message (hidden for now) */}
                {/* <div className="flex bg-red-200 text-red-600 items-center gap-2 rounded-lg px-4 py-2">
                  <TriangleAlert className="w-5 h-5" />
                  Validation/error message here.
                </div> */}

                {/* top  */}
                <div className="flex flex-col gap-4 items-center justify-between">
                  {/* left */}
                  <div className="flex items-center gap-5">
                    <div className="relative rounded-full w-26 h-26 border border-blue-500 overflow-hidden">
                      <Image
                        src={
                          profileImage === "/default.png"
                            ? "/default.png"
                            : profileImage
                        }
                        alt="Profile"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                  {/* right */}
                  <div className="flex flex-col gap-2 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={handleImageRemove}
                        className="rounded-full px-4 py-2 transition-colors duration-150 flex items-center gap-2 bg-gray-100 hover:bg-red-500 text-red-500 hover:text-white cursor-pointer"
                      >
                        <Trash2 className="w-5 h-5" />
                        Remove
                      </button>

                      <label className="rounded-full px-4 py-2 transition-colors duration-150 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
                        <Upload className="w-5 h-5" /> Upload
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <span className="text-gray-500 font-bold text-sm">
                      Note:{" "}
                      <span className="font-normal">
                        {" "}
                        Image must not exceed 5MB.
                      </span>
                    </span>
                  </div>
                </div>
                <form action="" className="flex flex-col gap-6">
                  {/* basic info */}
                  <div className="flex flex-col gap-2">
                    <span className="font-medium">Basic information</span>

                    <div className="grid grid-cols-2 gap-4">
                      {/* name */}
                      <div className="col-span-2 md:col-span-1  flex flex-col gap-1">
                        <label className="text-gray-500 text-sm">
                          Fullname
                        </label>
                        <input
                          type="text"
                          name=""
                          id=""
                          className="px-4 py-2 rounded-lg border border-gray-300 transition-colos duration-150 outline-none focus:border-blue-500"
                        />
                      </div>
                      {/* gender */}
                      <div className="col-span-2 md:col-span-1  flex flex-col gap-1">
                        <label className="text-gray-500 text-sm">Gender</label>
                        <select className="px-4 py-2 rounded-lg border border-gray-300 transition-colos duration-150 outline-none focus:border-blue-500">
                          <option value="default" className="text-gray-500">
                            -- Select a gender --
                          </option>
                          <option
                            value="male"
                            className="text-gray-500 transition-colors duration-150 hover:text-blue-500 "
                          >
                            Male
                          </option>
                          <option
                            value="female"
                            className="text-gray-500 transition-colors duration-150 hover:text-blue-500"
                          >
                            Female
                          </option>
                        </select>
                      </div>
                      {/* bday */}
                      <div className="col-span-2 md:col-span-1  flex flex-col gap-1">
                        <label className="text-gray-500 text-sm">
                          Birthday
                        </label>
                        <input
                          type="date"
                          value={birthday}
                          onChange={handleBirthdayChange}
                          className="px-4 py-2 rounded-lg border border-gray-300 transition-colors duration-150 outline-none focus:border-blue-500"
                        />
                      </div>
                      {/* age automatically assign age depending on the birthday */}
                      <div className="col-span-2 md:col-span-1  flex flex-col gap-1">
                        <label className="text-gray-500 text-sm">Age</label>
                        <input
                          type="text"
                          value={age}
                          readOnly
                          className="px-4 py-2 rounded-lg border border-gray-300 transition-colors duration-150 outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* contact */}
                  <div className="flex flex-col gap-2">
                    <span className="font-medium">Contact information</span>

                    <div className="grid grid-cols-2 gap-4">
                      {/* email */}
                      <div className="col-span-2 md:col-span-1  flex flex-col gap-1">
                        <label className="text-gray-500 text-sm">Email</label>
                        <input
                          type="email"
                          name=""
                          id=""
                          className="px-4 py-2 rounded-lg border border-gray-300 transition-colos duration-150 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="col-span-2 md:col-span-1  flex flex-col gap-1">
                        <label className="text-gray-500 text-sm">
                          Contact number
                        </label>
                        <input
                          type="tel"
                          name=""
                          id=""
                          className="px-4 py-2 rounded-lg border border-gray-300 transition-colos duration-150 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="col-span-2  flex flex-col gap-1">
                        <label className="text-gray-500 text-sm">
                          Residential address
                        </label>
                        <input
                          type="text"
                          name=""
                          id=""
                          className="px-4 py-2 rounded-lg border border-gray-300 transition-colos duration-150 outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* buttons */}
                  <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-end gap-2">
                    <button className="w-full sm:w-auto justify-center px-4 py-2 rounded-lg bg-gray-100 transition-colors duration-150 hover:bg-gray-200 flex items-center gap-2 cursor-pointer">
                      <SaveOff className="w-5 h-5" />
                      Discard
                    </button>
                    <button className="w-full sm:w-auto justify-center px-4 py-2 rounded-lg bg-green-500 text-white transition-colors duration-150 hover:bg-green-600 flex items-center gap-2 cursor-pointer">
                      <Save className="w-5 h-5" />
                      Save changes
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
