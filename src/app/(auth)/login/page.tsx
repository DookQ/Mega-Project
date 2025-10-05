// src/app/(auth)/login/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
});

type LoginForm = z.infer<typeof loginSchema>;
interface User { email: string; password: string; name?: string; }

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginForm) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === data.email && u.password === data.password);
    if (user) { alert(`เข้าสู่ระบบสำเร็จ! สวัสดี ${user.name ?? "ผู้ใช้"}`); router.push("/home"); }
    else { alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง"); }
  };

  return (
    // ปรับการจัดวางให้อยู่กึ่งกลางหน้าจอและเพิ่ม padding
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8"> 
      {/* เพิ่ม min-w-[320px] เพื่อให้มั่นใจว่าอย่างน้อยมีขนาดที่เหมาะสมบนมือถือ */}
      <div className="w-full max-w-[900px] min-w-[320px] bg-white shadow-xl rounded-xl overflow-hidden transform hover:shadow-2xl transition duration-300">
        <div className="flex flex-col md:flex-row">

          {/* ซ้าย: ส่วนแสดงข้อมูล */}
          {/* ใช้ w-full md:w-1/2 เหมือนเดิม แต่ **ลบคลาส flex-shrink-0** ออก เพื่อให้มันยืดหยุ่นมากขึ้น */}
          <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-200 to-white text-gray-800
                flex flex-col items-center justify-center p-8 sm:p-10
                border-b md:border-b-0 md:border-r border-gray-200 min-h-[200px] md:min-h-full"> {/* เพิ่ม min-h เพื่อป้องกันการบีบในแนวตั้งบนมือถือ */}
            <h1 className="text-xl font-bold mb-4 text-center tracking-wider text-gray-900">WELCOME TO THE LIBRARY</h1>
            <p className="text-center text-sm leading-6 text-gray-700 px-2">
              การอ่านคือการเดินทางของจิตใจ <br /> หนังสือพาเราไปได้ไกล แม้อยู่กับที่
            </p>
            <div className="mt-6 w-1/3 h-px bg-blue-400" />
          </div>

          {/* ขวา: ส่วนฟอร์ม Login */}
          {/* ใช้ w-full md:w-1/2 เหมือนเดิม และ **คง min-w-0** ไว้เพื่ออนุญาตให้เนื้อหาภายในสามารถถูกบีบได้หากจำเป็น (ในกรณีที่หน้าจอเล็กสุด ๆ) แต่เนื้อหาหลักก็ไม่ควรบีบถ้ามีพื้นที่ */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center min-w-0">
            <h2 className="text-2xl font-normal mb-8 text-gray-800 border-b border-gray-300 pb-2">เข้าสู่ระบบ</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
              {/* Input fields */}
              <input
                type="email" placeholder="อีเมล" {...register("email")}
                className="p-3 bg-white border-b border-gray-400 shadow-inner shadow-gray-50/50 rounded-none focus:outline-none focus:border-blue-800 focus:ring-0 transition placeholder-gray-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              <input
                type="password" placeholder="รหัสผ่าน" {...register("password")}
                className="p-3 bg-white border-b border-gray-400 shadow-inner shadow-gray-50/50 rounded-none focus:outline-none focus:border-blue-800 focus:ring-0 transition placeholder-gray-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

              {/* Links and Checkbox */}
              {/* ปรับขนาดข้อความบนมือถือเป็น text-xs เพื่อป้องกันข้อความชนกัน */}
              <div className="flex items-center justify-between text-sm text-gray-600 mt-1 flex-wrap gap-2 text-xs sm:text-sm">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="accent-blue-800 w-4 h-4" /> Remember me
                </label>
                <div className="flex gap-4"> {/* จัดกลุ่มลิงก์เข้าด้วยกัน */}
                    <Link href="/register" className="text-blue-800 hover:text-blue-900 transition text-xs hover:underline">
                      สร้างบัญชีใหม่
                    </Link>
                    <Link href="/forgot-password" className="text-blue-800 hover:text-blue-900 transition text-xs hover:underline">
                      ลืมรหัสผ่าน
                    </Link>
                </div>
              </div>

              <button type="submit"
                className="mt-6 bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition shadow-lg hover:shadow-xl font-semibold tracking-wider transform hover:scale-[1.01]">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}