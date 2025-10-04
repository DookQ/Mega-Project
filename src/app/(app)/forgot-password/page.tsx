// app/(auth)/forgot-password/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const forgotSchema = z.object({ email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง") });
type ForgotForm = z.infer<typeof forgotSchema>;
interface User { email: string; password: string; }

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotForm>({ resolver: zodResolver(forgotSchema) });

  const onSubmit = (data: ForgotForm) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === data.email);
    if (user) router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
    else alert("ไม่พบอีเมลนี้ในระบบ");
  };

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 transform hover:shadow-2xl transition duration-300">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b border-gray-200 pb-3">ลืมรหัสผ่าน</h1>
      <p className="text-center text-sm text-gray-500 mb-6">กรุณากรอกอีเมลที่ใช้ลงทะเบียน เพื่อรับลิงก์ตั้งรหัสผ่านใหม่</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">อีเมล</label>
          <input {...register("email")} type="email"
                 className="w-full p-3 bg-white border-b border-gray-400 shadow-inner rounded-none focus:outline-none focus:border-blue-800"
                 placeholder="กรอกอีเมลของคุณ" />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition shadow-lg hover:shadow-xl font-semibold tracking-wider transform hover:scale-[1.01]">
          ต่อไป
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        กลับไป <a href="/(auth)/login" className="text-blue-800 hover:underline font-medium ml-1">เข้าสู่ระบบ</a>
      </p>
    </div>
  );
}
