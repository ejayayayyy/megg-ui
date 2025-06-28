"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const viewSignIn = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen  flex  items-center justify-center bg-white lg:bg-transparent">
      <div className="flex flex-col gap-10 w-full max-w-lg p-6 md:p-8 lg:bg-white lg:shadow lg:rounded-2xl lg:border lg:border-gray-300">
        {/* logo */}
        <div className="flex flex-col gap-4 items-center justify-center">
          <Image src="/logoblue.png" alt="MEGG Logo" height={46} width={46} />

          <div className="flex flex-col text-center">
            <span className="text-2xl font-bold">Reset password</span>
            <span className="text-gray-500">
              Your new password must be different to previous password.
            </span>
          </div>
        </div>

        {/* validation */}
        <div className="hidden bg-red-100 px-4 py-2 rounded-lg border-l-4 border-red-500 text-red-500">
          Validation message here
        </div>

        {/* forms */}
        <form action="" className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="">New password</label>

            <input
              type="password"
              name=""
              id=""
              className="border-b-2 border-gray-300 p-2 outline-none focus:border-blue-500 transition-colors duration-150"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Confirm password</label>

            <input
              type="password"
              name=""
              id=""
              className="border-b-2 border-gray-300 p-2 outline-none focus:border-blue-500 transition-colors duration-150"
              placeholder="Re-enter your password"
            />
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duratin-150 cursor-pointer text-white w-full">
              Change password{" "}
            </button>

            <button
              type="button"
              onClick={viewSignIn}
              className="border border-gray-300 hover:bg-gray-100 transition-colors duration-150 cursor-pointer rounded-lg flex items-center justify-center px-4 py-2 gap-2"
            >
              Go back to Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
