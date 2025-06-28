"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Only allow digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if not the last
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // Clear current
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Go back
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const viewSignIn = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white lg:bg-transparent">
      <div className="flex flex-col gap-10 w-full max-w-lg p-6 md:p-8 lg:bg-white lg:shadow lg:rounded-2xl lg:border lg:border-gray-300">
        {/* logo */}
        <div className="flex flex-col gap-4 items-center justify-center">
          <Image src="/logoblue.png" alt="MEGG Logo" height={46} width={46} />
          <div className="flex flex-col text-center">
            <span className="text-2xl font-bold">Verify your email</span>
            <span className="text-gray-500">
              Enter the 6-digit code sent to{" "}
              <span className="font-medium text-black">name@example.com</span>
            </span>
          </div>
        </div>

        {/* validation */}
        {/* <div className="flex bg-red-100 px-4 py-2 rounded-lg border-l-4 border-red-500 text-red-500">
          <TriangleAlert className="w-5 h-5" />
          Validation message here
        </div> */}

        {/* forms */}
        <form action="" className="flex flex-col gap-6">
          <div className="grid grid-cols-6 gap-2 place-items-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="password"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputMode="numeric"
                className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 text-lg"
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Time remaining:</span>
              <span className="text-lg font-medium">0:00</span>
            </div>

            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-150 cursor-pointer"
            >
              Resend code
            </button>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-150 cursor-pointer text-white w-full"
            >
              Verify email
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
