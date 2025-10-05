// src/app/(auth)/register/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return alert("รหัสผ่านไม่ตรงกัน");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ name, email, password, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ name, email, role: "user" }));
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="flex w-[750px] bg-white shadow-xl rounded-xl overflow-hidden transform hover:shadow-2xl transition duration-300">
        {/* ซ้าย */}
        <div className="w-1/2 bg-gradient-to-b from-blue-200 to-white text-gray-800 flex flex-col items-center justify-center p-12 border-r border-gray-200">
          <h1 className="text-xl font-bold mb-4 text-center tracking-wider text-gray-900">JOIN THE LIBRARY</h1>
          <p className="text-center text-sm leading-6 text-gray-700 px-2">
            สร้างบัญชีเพื่อเริ่มจองห้องและจัดการเวลาของคุณ
          </p>
          <div className="mt-6 w-1/3 h-px bg-blue-400" />
        </div>

        {/* ขวา */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-normal mb-8 text-gray-800 border-b border-gray-300 pb-2">สมัครสมาชิก</h2>

          <form onSubmit={submit} className="flex flex-col gap-5">
            <input className="p-3 bg-white border-b border-gray-400 shadow-inner rounded-none focus:outline-none focus:border-blue-800 placeholder-gray-500" placeholder="ชื่อผู้ใช้" value={name} onChange={e => setName(e.target.value)} />
            <input className="p-3 bg-white border-b border-gray-400 shadow-inner rounded-none focus:outline-none focus:border-blue-800 placeholder-gray-500" type="email" placeholder="อีเมล" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="p-3 bg-white border-b border-gray-400 shadow-inner rounded-none focus:outline-none focus:border-blue-800 placeholder-gray-500" type="password" placeholder="รหัสผ่าน" value={password} onChange={e => setPassword(e.target.value)} />
            <input className="p-3 bg-white border-b border-gray-400 shadow-inner rounded-none focus:outline-none focus:border-blue-800 placeholder-gray-500" type="password" placeholder="ยืนยันรหัสผ่าน" value={confirm} onChange={e => setConfirm(e.target.value)} />

            <button type="submit"
              className="mt-2 bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition shadow-lg hover:shadow-xl font-semibold tracking-wider transform hover:scale-[1.01]">
              สมัครสมาชิก
            </button>

            <p className="text-center text-sm text-gray-600 mt-3">
              มีบัญชีแล้ว? <Link href="/login" className="text-blue-800 hover:text-blue-900 hover:underline">เข้าสู่ระบบ</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
