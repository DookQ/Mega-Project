// app/AdminLogin/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  username: z.string().min(3, "กรุณากรอกชื่อผู้ใช้"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
});
type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    if (data.username === "admin" && data.password === "123456") {
      router.push("/admin");
      alert("ยินดีต้อนรับเข้าสู่ระบบ Admin! 🎉");
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง ❌");
    }
  };

  return (
    <div className="min-h-svh brand-page flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 rounded-2xl p-6 shadow-lg bg-white/90 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800"
      >
        <h2 className="text-xl font-bold text-[var(--brand-to)] mb-4">Admin Login</h2>

        <input
          {...register("username")}
          placeholder="Username"
          className="border w-full mb-2 px-3 py-2 rounded outline-none bg-white/70 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700"
        />
        {errors.username && <p className="text-red-500 text-sm mb-2">{errors.username.message}</p>}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border w-full mb-2 px-3 py-2 rounded outline-none bg-white/70 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700"
        />
        {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>}

        <button
          type="submit"
          className="w-full rounded-lg px-4 py-2 text-white brand-gradient shadow hover:opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
}
