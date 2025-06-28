"use client";

import { ChevronDown, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [activeForm, setActiveForm] = useState("email");

  const viewRegister = () => {
    router.push("/register");
  };

  const viewForgotPassword = () => {
    router.push("/forgot-password")
  }

  return (
    <div className="min-h-screen  flex  items-center justify-center bg-white lg:bg-transparent">
      <div className="flex flex-col gap-8 w-full max-w-lg p-6 md:p-8 lg:bg-white lg:shadow lg:rounded-2xl lg:border lg:border-gray-300 ">
        {/* logo */}
        <div className="flex flex-col gap-4 items-center justify-center">
          <Image src="/logoblue.png" alt="MEGG Logo" height={46} width={46} />

          <div className="flex flex-col text-center">
            <span className="text-2xl font-bold">
              Welcome to <span className="text-blue-900">MEGG</span>
            </span>
            <span className="text-gray-500">Sign in to your account</span>
          </div>
        </div>

        {/* toggle buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveForm("email")}
            className={`flex items-center justify-center gap-2 cursor-pointer rounded-lg w-full transition-colors duration-150 px-4 py-2 ${
              activeForm === "email"
                ? "bg-blue-500 hover:bg-blue-600 text-white "
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Mail className="w-5 h-5" />
            Email
          </button>
          <button
            onClick={() => setActiveForm("phone")}
            className={`flex items-center justify-center gap-2 cursor-pointer rounded-lg w-full transition-colors duration-150 px-4 py-2 ${
              activeForm === "phone"
                ? "bg-blue-500 hover:bg-blue-600 text-white "
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Phone className="w-5 h-5" />
            Phone
          </button>
        </div>

        {/* validation */}
        <div className="hidden bg-red-100 px-4 py-2 rounded-lg border-l-4 border-red-500 text-red-500">
          Validation message here
        </div>

        {/* forms */}

        <div className="flex flex-col gap-6">
          {activeForm === "email" && (
            <form action="" className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name=""
                  id=""
                  className="border-b-2 border-gray-300 p-2 rounded- outline-none focus:border-blue-500 transition-colors duration-150"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Password</label>

                <input
                  type="password"
                  name=""
                  id=""
                  className="border-b-2 border-gray-300 p-2 outline-none focus:border-blue-500 transition-colors duration-150"
                  placeholder="Enter your password"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" name="rememberMe" id="rememberMe" />
                    <label htmlFor="rememberMe">Remember me</label>
                  </div>
                  <button type="button" onClick={viewForgotPassword} className="cursor-pointer text-gray-500 transition-colors duration-150 active:text-blue-500">
                    Forgot password
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duratin-150 cursor-pointer text-white w-full">
                  Sign in
                </button>
              </div>
            </form>
          )}
          {activeForm === "phone" && (
            <form action="" className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber">Phone number</label>
                <div className="flex items-center gap-2">
                  <div className="relative ">
                    <button
                      type="button"
                      className="border-b-2 border-gray-300 p-2 flex items-center gap-4 transition-colors duration-150 active:border-blue-500"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">PH</span>
                        <span>+63</span>
                      </div>

                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border-b-2 border-gray-300 w-full px-2 py-2 rounded- outline-none focus:border-blue-500 transition-colors duration-150"
                    placeholder="Phone"
                  />
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duratin-150 cursor-pointer text-white w-full">
                    Send code
                  </button>
                </div>
              </div>
            </form>
          )}

          <div className="w-full flex items-center gap-4 my-4">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="text-gray-500 text-sm">Sign in with</span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          <div className="flex flex-col gap-4">
            <button className="border border-gray-300 hover:bg-gray-100 transition-colors duration-150 cursor-pointer rounded-lg flex items-center justify-center px-4 py-2 gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="24px"
                height="24px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Sign in with Google
            </button>
            <button
              onClick={viewRegister}
              className="border border-gray-300 hover:bg-gray-100 transition-colors duration-150 cursor-pointer rounded-lg flex items-center justify-center px-4 py-2 gap-2"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
