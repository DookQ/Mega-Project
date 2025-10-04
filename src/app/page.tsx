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
type User = { name: string; email: string; password: string };

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginForm) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") ?? "[]");
    const user = users.find((u) => u.email === data.email && u.password === data.password);

    if (user) {
      alert(`เข้าสู่ระบบสำเร็จ! สวัสดี ${user.name}`);
      router.push("/home");
    } else {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-[750px] bg-white shadow-xl rounded-xl overflow-hidden transform hover:shadow-2xl transition duration-300">
        {/* Left */}
        <div className="w-1/2 bg-gradient-to-b from-blue-200 to-white text-gray-800 flex flex-col items-center justify-center p-12 border-r border-gray-200">
          <h1 className="text-xl font-bold mb-4 text-center tracking-wider text-gray-900">
            WELCOME TO THE LIBRARY
          </h1>
          <p className="text-center text-sm leading-6 text-gray-700 px-2">
            การอ่านคือการเดินทางของจิตใจ
            <br />
            หนังสือเปรียบเสมือนสะพานที่พาเราเดินทางไปในโลกของผู้อื่น
            <br />
            โดยไม่ต้องก้าวขาออกจากที่นั่งของเราเลย
          </p>
          <div className="mt-6 w-1/3 h-px bg-blue-400" />
        </div>

        {/* Right */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-normal mb-8 text-gray-800 border-b border-gray-300 pb-2">
            เข้าสู่ระบบ
          </h2>

          {/* ✅ ผูก handleSubmit + onSubmit */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              {/* ✅ ใส่ {...register} */}
              <input
                type="email"
                placeholder="อีเมล"
                className="w-full p-3 bg-white border-b border-gray-400 shadow-inner rounded-none focus:outline-none focus:border-blue-800 focus:ring-0 placeholder-gray-500"
                {...register("email")}
              />
              {/* ✅ ใช้ errors เพื่อลด warning */}
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="รหัสผ่าน"
                className="w-full p-3 bg-white border-b border-gray-400 shadow-inner rounded-none focus:outline-none focus:border-blue-800 focus:ring-0 placeholder-gray-500"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="accent-blue-800 w-4 h-4" /> Remember me
              </label>
              <Link
                href="/register"
                className="text-blue-800 hover:text-blue-900 transition text-xs hover:underline"
              >
                สร้างบัญชีใหม่
              </Link>
            </div>

            <button
              type="submit"
              className="mt-6 bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition shadow-lg hover:shadow-xl font-semibold tracking-wider transform hover:scale-[1.01]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
