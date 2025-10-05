// src/app/(auth)/forgot-password/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type User = { email: string; password: string; name?: string; role?: "user" | "admin" | string; };

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email);
    if (!user) return alert("ไม่พบอีเมลนี้ในระบบ");
    router.push(`/reset-password?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
    <div className="flex flex-col md:flex-row w-full max-w-\[900px\] bg-white shadow-xl rounded-xl overflow-hidden transform hover:shadow-2xl transition duration-300">
      {/* ซ้าย */}
      <div className="w-full md:w-1/2 flex-shrink-0 bg-gradient-to-b from-blue-200 to-white text-gray-800 flex flex-col items-center justify-center p-10 md:border-r border-b md:border-b-0 border-gray-200">
        <h1 className="text-xl font-bold mb-4 text-center tracking-wider text-gray-900">RESET PASSWORD</h1>
        <p className="text-center text-sm leading-6 text-gray-700 px-2">
          กรอกอีเมลที่ลงทะเบียน ระบบจะพาไปหน้าตั้งรหัสผ่านใหม่
        </p>
        <div className="mt-6 w-1/3 h-px bg-blue-400" />
      </div>

      {/* ขวา */}
      <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center min-w-0">
        <h2 className="text-2xl font-normal mb-8 text-gray-800 border-b border-gray-300 pb-2">ลืมรหัสผ่าน</h2>

        <form onSubmit={submit} className="flex flex-col gap-5 w-full">
          <input
            className="p-3 bg-white border-b border-gray-400 shadow-inner rounded-none focus:outline-none focus:border-blue-800 placeholder-gray-500"
            type="email" placeholder="อีเมลที่ลงทะเบียน"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit"
            className="bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition shadow-lg hover:shadow-xl font-semibold tracking-wider transform hover:scale-[1.01]">
            ต่อไป
          </button>

          <p className="text-center text-sm text-gray-600">
            กลับไปหน้า <Link href="/login" className="text-blue-800 hover:text-blue-900 hover:underline">เข้าสู่ระบบ</Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
}
