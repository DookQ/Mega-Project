"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type User = {
  name?: string;
  email: string;
  password: string;
  role?: "user" | "admin" | string;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    ) as User[];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      return;
    }

    const currentUser: Pick<User, "name" | "email" | "role"> = {
      name: user.name ?? "ผู้ใช้",
      email: user.email,
      role: user.role ?? "user",
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <input
          className="auth-input w-full"
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button type="submit" className="btn-brand w-full">
          Login
        </button>
      </form>

      <p className="text-center text-sm text-muted mt-4">
        ยังไม่มีบัญชี?
        <Link href="/register" className="underline mx-1">
          สมัครสมาชิก
        </Link>
        ·
        <Link href="/forgot-password" className="underline ml-1">
          ลืมรหัสผ่าน
        </Link>
      </p>
    </div>
  );
}
