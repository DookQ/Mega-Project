"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type User = {
  email: string;
  password: string;
  name?: string;
  role?: "user" | "admin" | string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    ) as User[];

    const user = users.find((u) => u.email === email);
    if (!user) {
      alert("ไม่พบอีเมลนี้ในระบบ");
      return;
    }
    router.push(`/reset-password?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="auth-card mx-auto">
      <h1 className="auth-title text-2xl text-center mb-6">ลืมรหัสผ่าน</h1>
      <form onSubmit={submit} className="space-y-4">
        <input
          className="auth-input w-full"
          type="email"
          placeholder="อีเมลที่ลงทะเบียน"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <button type="submit" className="btn-brand w-full">
          ต่อไป
        </button>
      </form>
      <p className="text-center text-sm text-muted mt-4">
        กลับไปหน้า <a href="/login" className="underline">เข้าสู่ระบบ</a>
      </p>
    </div>
  );
}
