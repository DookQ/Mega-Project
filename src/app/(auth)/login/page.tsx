"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const users: any[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    localStorage.setItem("currentUser", JSON.stringify({
      name: user.name || "ผู้ใช้", email: user.email, role: user.role || "user"
    }));
    router.push("/home");
  };

  return (
    <div className="auth-card mx-auto">
      <h1 className="auth-title text-2xl text-center mb-6">เข้าสู่ระบบ</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="auth-input w-full"
          type="email"
          placeholder="อีเมล"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          className="auth-input w-full"
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit" className="btn-brand w-full">Login</button>
      </form>

      <p className="text-center text-sm text-muted mt-4">
        ยังไม่มีบัญชี?
        <Link href="/register" className="underline mx-1">สมัครสมาชิก</Link>
        ·
        <Link href="/forgot-password" className="underline ml-1">ลืมรหัสผ่าน</Link>
      </p>
    </div>
  );
}
