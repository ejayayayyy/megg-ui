"use client";
import { Bell, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { auth, db } from "../config/firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
// import { signOut } from "firebase/auth";

export default function Header({ setSidebarOpen }) {
  const pathname = usePathname();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    profileImageUrl: "",
  });
  const router = useRouter();

  const viewProfile = () => {
    router.push("/admin/profile");
  };

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              username: data.username || "User",
              email: user.email || "",
              profileImageUrl: data.profileImageUrl || "/default.png",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const [showNotificationDropdown, setShowNotificationDropdown] = useState(
    false
  );

  const pageName =
    {
      "/admin/dashboard": "Dashboard",
      "/admin/inventory": "Inventory",
      "/admin/machines": "Machines",
      "/admin/history/sort": "Sort History",
      "/admin/history/defect": "Defect History",
      "/admin/profile": "Profile",
      "/admin/settings/edit-profile": "Edit Profile",
      "/admin/settings/change-password": "Change Password",
      "/admin/settings/preferences": "Preferences",
    }[pathname] || "Page";
  return (
    <div className="">
      {/* Header */}
      <div className="relative flex items-center justify-between bg-white p-4 md:p-6 rounded-2xl border border-gray-300 shadow">
        {/* left */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg transition-colors duration-150 hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-xl  font-bold">{pageName}</span>
        </div>

        {/* right */}
        <div className=" flex items-center gap-2 md:gap-">
          {/* notification */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationDropdown((prev) => !prev)}
              className={`p-2 rounded-full transition-colors duration-150 cursor-pointer ${
                showNotificationDropdown
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <Bell className="w-6 h-6" />
            </button>

            {/* notification */}
            {showNotificationDropdown && (
              <div className="absolute -right-13 md:-inset-x-45 mt-4 w-96 z-40 rounded-2xl bg-white border border-gray-300 flex flex-col overflow-hidden">
                {/* header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Notifications</span>
                    <div className="bg-red-500 rounded-full text-xs text-white px-2.5 py-1 flex items-center justify-center">
                      99+
                    </div>
                  </div>
                  <button className="text-gray-500 transition-colors duration-150 hover:text-blue-500 cursor-pointer text-sm">
                    Mark all as read
                  </button>
                </div>
                {/* content */}
                <div className="flex flex-col">
                  <button className="p-4 flex items-center gap-4 cursor-pointer transition-colors duration-150 hover:bg-gray-100 border-b border-gray-300">
                    {/* image */}
                    <div className="p-6 rounded-full bg-gray-200"></div>
                    {/* description */}
                    <div className="flex flex-col text-start">
                      <span className="font-medium">Title</span>
                      <span className="text-gray-500 text-sm line-clamp-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Debitis illo repellat ad neque quasi quae eaque harum
                        commodi eos suscipit consequatur repellendus, obcaecati,
                        dolor voluptatibus cupiditate adipisci velit corrupti
                        nam!
                      </span>
                    </div>
                  </button>

                  <button className="p-4 flex items-center gap-4 cursor-pointer transition-colors duration-150 hover:bg-gray-100 border-b border-gray-300">
                    {/* image */}
                    <div className="p-6 rounded-full bg-gray-200"></div>
                    {/* description */}
                    <div className="flex flex-col text-start">
                      <span className="font-medium">Title</span>
                      <span className="text-gray-500 text-sm line-clamp-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Debitis illo repellat ad neque quasi quae eaque harum
                        commodi eos suscipit consequatur repellendus, obcaecati,
                        dolor voluptatibus cupiditate adipisci velit corrupti
                        nam!
                      </span>
                    </div>
                  </button>

                  <button className="p-4 flex items-center gap-4 cursor-pointer transition-colors duration-150 hover:bg-gray-100 border-b border-gray-300">
                    {/* image */}
                    <div className="p-6 rounded-full bg-gray-200"></div>
                    {/* description */}
                    <div className="flex flex-col text-start">
                      <span className="font-medium">Title</span>
                      <span className="text-gray-500 text-sm line-clamp-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Debitis illo repellat ad neque quasi quae eaque harum
                        commodi eos suscipit consequatur repellendus, obcaecati,
                        dolor voluptatibus cupiditate adipisci velit corrupti
                        nam!
                      </span>
                    </div>
                  </button>
                </div>
                {/* see all button */}
                <div className="flex items-center justify-center p-4">
                  <button className="text-center cursor-pointer text-gray-500 transition-colors duration-150 hover:text-blue-500">
                    See all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* profile */}
          <button
            onClick={viewProfile}
            className="flex items-center gap-2 cursor-pointer rounded-lg"
          >
            {/* image */}
            {userData?.photoURL ? (
              <Image
                src={userData.photoURL}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : (
              <Image
                src="/default.png"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            )}
            <div className="hidden md:flex flex-col text-start">
              <h1 className="font-medium text-sm">Edward Gatbonton</h1>
              <span className="text-sm text-gray-500">
                edwardgatbonton13@gmail.com
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
