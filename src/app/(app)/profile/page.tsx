// src/app/(app)/profile/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User2, ShieldCheck, Users, ClipboardList } from "lucide-react";

type Role = "user" | "admin";
type CurrentUser = { name: string; email: string; role?: Role };

export default function ProfilePage() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  // โหลดผู้ใช้ปัจจุบัน
  useEffect(() => {
    try {
      const cu = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (cu) setUser(cu);
    } catch {}
  }, []);

  const isAdmin = user?.role === "admin";

  // === ช่วยอัปเดต role ทั้ง currentUser และ users ===
  const applyRole = (role: Role) => {
    if (!user) return;

    // update currentUser
    const next = { ...user, role };
    localStorage.setItem("currentUser", JSON.stringify(next));
    setUser(next);

    // update users list ด้วย (ถ้ามี)
    try {
      const users: CurrentUser[] = JSON.parse(localStorage.getItem("users") || "[]");
      const i = users.findIndex((u) => u.email === user.email);
      if (i !== -1) {
        users[i] = { ...users[i], role };
        localStorage.setItem("users", JSON.stringify(users));
      }
    } catch {}

    // แจ้งเตือนสั้น ๆ
    alert(`เปลี่ยนสิทธิ์เป็น ${role === "admin" ? "ผู้ดูแล (admin)" : "ผู้ใช้ (user)"} แล้ว`);
  };

  // === UI ปุ่มสลับ Role สำหรับ Present ชั่วคราว ===
  const RoleSwitcher = () => (
    <div className="flex items-center gap-2">
      <span className="text-sm">สถานะ:</span>
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
          isAdmin
            ? "bg-blue-100 text-blue-700 border-blue-300"
            : "bg-slate-100 text-slate-700 border-slate-300"
        }`}
      >
        {user?.role ?? "user"}
      </span>

      {/* ปุ่มเล็กสลับ role */}
      <div className="ml-2 flex gap-2">
        <button
          onClick={() => applyRole("user")}
          className={`h-7 px-2 rounded-md border text-xs transition ${
            !isAdmin
              ? "bg-blue-800 text-white border-blue-800"
              : "border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
          title="ตั้งเป็นผู้ใช้ทั่วไป"
        >
          user
        </button>
        <button
          onClick={() => applyRole("admin")}
          className={`h-7 px-2 rounded-md border text-xs transition ${
            isAdmin
              ? "bg-blue-800 text-white border-blue-800"
              : "border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
          title="ตั้งเป็นผู้ดูแลระบบ"
        >
          admin
        </button>
      </div>
    </div>
  );

  return (
    <div className="content-wrap space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="title text-3xl flex items-center gap-2">
          <User2 size={24} /> โปรไฟล์ผู้ใช้
        </h1>
        <Link href="/home" className="btn-brand">
          กลับหน้าหลัก
        </Link>
      </div>

      {/* User Card */}
      <div className="brand-card max-w-2xl">
        <div className="flex items-start gap-4">
          <div className="rounded-xl p-2 bg-white border border-[var(--border)]">
            <User2 size={22} />
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold text-primary">{user?.name ?? "-"}</div>
            <div className="text-muted text-sm">{user?.email ?? "-"}</div>

            {/* สลับ Role ชั่วคราวสำหรับ Present */}
            <RoleSwitcher />
          </div>
        </div>
      </div>

      {/* Admin Shortcut (แสดงเฉพาะ admin) */}
      {isAdmin ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck size={18} />
            <span className="font-semibold">สำหรับผู้ดูแลระบบ</span>
          </div>

          {/* แผงลัดเข้า Admin */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* จัดการผู้ใช้ */}
            <Link href="/admin/manage-user" className="brand-card hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-3">
                <div className="rounded-xl p-2 bg-white border border-[var(--border)]">
                  <Users size={20} />
                </div>
                <div>
                  <div className="font-semibold">จัดการผู้ใช้</div>
                  <div className="text-muted text-sm">เปลี่ยนสิทธิ์/ลบผู้ใช้</div>
                </div>
              </div>
            </Link>

            {/* จัดการการจอง */}
            <Link href="/admin/manage-booking" className="brand-card hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-3">
                <div className="rounded-xl p-2 bg-white border border-[var(--border)]">
                  <ClipboardList size={20} />
                </div>
                <div>
                  <div className="font-semibold">จัดการการจอง</div>
                  <div className="text-muted text-sm">ค้นหา/แก้ไข/ยกเลิก</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-muted">ต้องการสิทธิ์ผู้ดูแลระบบเพื่อเข้าหน้า Admin</div>
      )}
    </div>
  );
}
