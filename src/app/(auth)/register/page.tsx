"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return alert("รหัสผ่านไม่ตรงกัน");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ name, email, role:"user" }));
    router.push("/home");
  };

  return (
    <div className="auth-card mx-auto">
      <h1 className="auth-title text-2xl text-center mb-6">สมัครสมาชิก</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="auth-input w-full" placeholder="ชื่อผู้ใช้" value={name} onChange={e=>setName(e.target.value)} />
        <input className="auth-input w-full" type="email" placeholder="อีเมล" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="auth-input w-full" type="password" placeholder="รหัสผ่าน" value={password} onChange={e=>setPassword(e.target.value)} />
        <input className="auth-input w-full" type="password" placeholder="ยืนยันรหัสผ่าน" value={confirm} onChange={e=>setConfirm(e.target.value)} />
        <button type="submit" className="btn-brand w-full">สมัครสมาชิก</button>
      </form>
      <p className="text-center text-sm text-muted mt-4">
        มีบัญชีแล้ว? <Link href="/login" className="underline">เข้าสู่ระบบ</Link>
      </p>
    </div>
  );
}
