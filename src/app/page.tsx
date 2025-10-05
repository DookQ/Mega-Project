"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

/* ---------- Schemas ---------- */
const loginSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
});
type LoginForm = z.infer<typeof loginSchema>;

const registerSchema = z
  .object({
    name: z.string().min(1, "กรุณากรอกชื่อผู้ใช้"),
    email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
    password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
    confirm: z.string().min(6),
  })
  .refine((v) => v.password === v.confirm, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirm"],
  });
type RegisterForm = z.infer<typeof registerSchema>;

type User = { name?: string; email: string; password: string; role?: "user" | "admin" };

/* ---------- Small UI Helpers (หดขนาดแล้ว) ---------- */
function LeftPanel({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="bg-blue-50 text-gray-800 border-b md:border-b-0 md:border-r border-gray-200
                    p-6 sm:p-7 min-h-[420px] shrink-0 flex flex-col items-center justify-center">
      <h1 className="text-xl sm:text-[1.35rem] font-extrabold mb-3 tracking-wider text-gray-900 text-center">
        {title}
      </h1>
      <p className="text-center text-[0.9rem] leading-6 text-gray-700 max-w-[26ch]">
        {subtitle}
      </p>
      <div className="mt-6 w-16 h-[3px] bg-blue-600 rounded-full" />
    </div>
  );
}

function FieldInput(props: JSX.IntrinsicElements["input"]) {
  return (
    <input
      {...props}
      className={
        "w-full h-10 px-3 bg-white border-b border-gray-400 rounded-none " +
        "focus:outline-none focus:border-blue-800 placeholder-gray-500 text-[0.95rem] " +
        (props.className ?? "")
      }
    />
  );
}

/* ---------- Main ---------- */
export default function AuthPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const view = (sp.get("view") ?? "login") as "login" | "register" | "forgot";
  const setView = (v: typeof view) => router.replace(`?view=${v}`, { scroll: false });

  /* Login */
  const login = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const onLogin = (data: LoginForm) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === data.email && u.password === data.password);
    if (!user) return alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ name: user.name ?? "ผู้ใช้", email: user.email, role: user.role ?? "user" })
    );
    router.push("/home");
  };

  /* Register */
  const reg = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });
  const onRegister = (data: RegisterForm) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === data.email)) return alert("อีเมลนี้ถูกใช้งานแล้ว");
    users.push({ name: data.name, email: data.email, password: data.password, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ name: data.name, email: data.email, role: "user" }));
    alert("สมัครสมาชิกสำเร็จ!");
    router.push("/home");
  };

  /* Forgot */
  const [emailForgot, setEmailForgot] = useState("");
  const onForgot = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === emailForgot);
    if (!user) return alert("ไม่พบอีเมลนี้ในระบบ");
    router.push(`/reset-password?email=${encodeURIComponent(emailForgot)}`);
  };

  const LEFT = {
    login: { title: "WELCOME TO THE LIBRARY", subtitle: "การอ่านคือการเดินทางของจิตใจ หนังสือพาเราไปได้ไกล แม้อยู่กับที่" },
    register: { title: "JOIN THE LIBRARY", subtitle: "สร้างบัญชีเพื่อเริ่มจองห้องและจัดการเวลาของคุณ" },
    forgot: { title: "RESET PASSWORD", subtitle: "กรอกอีเมลที่ลงทะเบียน ระบบจะพาไปหน้าตั้งรหัสผ่านใหม่" },
  }[view];

  const RIGHT_TITLE = { login: "เข้าสู่ระบบ", register: "สมัครสมาชิก", forgot: "ลืมรหัสผ่าน" }[view];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* การ์ด: เล็กลงจาก 920px → 760px */}
      <div className="w-full max-w-[760px] bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* grid เหมือนเดิม แต่ลด padding+min-height ในแต่ละคอลัมน์ */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <LeftPanel title={LEFT.title} subtitle={LEFT.subtitle} />

          <div className="p-6 sm:p-7 min-h-[420px] shrink-0 flex flex-col justify-center min-w-0">
            <h2 className="text-xl sm:text-[1.35rem] font-semibold mb-6 text-gray-800 border-b border-gray-300 pb-2">
              {RIGHT_TITLE}
            </h2>

            {/* LOGIN */}
            {view === "login" && (
              <form onSubmit={login.handleSubmit(onLogin)} className="space-y-4">
                <FieldInput type="email" placeholder="อีเมล" {...login.register("email")} />
                {login.formState.errors.email && (
                  <p className="text-red-500 text-xs">{login.formState.errors.email.message}</p>
                )}

                <FieldInput type="password" placeholder="รหัสผ่าน" {...login.register("password")} />
                {login.formState.errors.password && (
                  <p className="text-red-500 text-xs">{login.formState.errors.password.message}</p>
                )}

                <div className="flex items-center justify-between text-[0.9rem] text-gray-600">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" className="accent-blue-800 w-4 h-4" /> Remember me
                  </label>
                  <span />
                </div>

                {/* ปุ่มเล็กลง: h-10 */}
                <button
                  type="submit"
                  className="w-full h-10 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition shadow-md hover:shadow-lg font-semibold tracking-wide"
                >
                  Login
                </button>

                {/* ปุ่มย่อยตรงกลาง เล็กลง */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setView("register")}
                    className="h-9 px-3 rounded-md border border-blue-800 text-blue-800 hover:bg-blue-50 transition text-sm"
                  >
                    สมัครสมาชิก
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("forgot")}
                    className="h-9 px-3 rounded-md border border-blue-800 text-blue-800 hover:bg-blue-50 transition text-sm"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            )}

            {/* REGISTER */}
            {view === "register" && (
              <form onSubmit={reg.handleSubmit(onRegister)} className="space-y-4">
                <FieldInput placeholder="ชื่อผู้ใช้" {...reg.register("name")} />
                {reg.formState.errors.name && <p className="text-red-500 text-xs">{reg.formState.errors.name.message}</p>}

                <FieldInput type="email" placeholder="อีเมล" {...reg.register("email")} />
                {reg.formState.errors.email && (
                  <p className="text-red-500 text-xs">{reg.formState.errors.email.message}</p>
                )}

                <FieldInput type="password" placeholder="รหัสผ่าน (อย่างน้อย 6 ตัว)" {...reg.register("password")} />
                {reg.formState.errors.password && (
                  <p className="text-red-500 text-xs">{reg.formState.errors.password.message}</p>
                )}

                <FieldInput type="password" placeholder="ยืนยันรหัสผ่าน" {...reg.register("confirm")} />
                {reg.formState.errors.confirm && (
                  <p className="text-red-500 text-xs">{reg.formState.errors.confirm.message}</p>
                )}

                <button
                  type="submit"
                  className="w-full h-10 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition shadow-md hover:shadow-lg font-semibold tracking-wide"
                >
                  สมัครสมาชิก
                </button>

                <p className="text-center text-sm text-gray-600">
                  มีบัญชีแล้ว?{" "}
                  <button
                    type="button"
                    onClick={() => setView("login")}
                    className="text-blue-800 hover:text-blue-900 hover:underline"
                  >
                    เข้าสู่ระบบ
                  </button>
                </p>
              </form>
            )}

            {/* FORGOT */}
            {view === "forgot" && (
              <form onSubmit={onForgot} className="space-y-4">
                <FieldInput
                  type="email"
                  placeholder="อีเมลที่ลงทะเบียน"
                  value={emailForgot}
                  onChange={(e) => setEmailForgot(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full h-10 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition shadow-md hover:shadow-lg font-semibold tracking-wide"
                >
                  ต่อไป
                </button>

                <p className="text-center text-sm text-gray-600">
                  กลับไปหน้า{" "}
                  <button
                    type="button"
                    onClick={() => setView("login")}
                    className="text-blue-800 hover:text-blue-900 hover:underline"
                  >
                    เข้าสู่ระบบ
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
