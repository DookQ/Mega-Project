// src/app/(app)/profile/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User2, ShieldCheck, LayoutDashboard, Users, Boxes, ClipboardList } from "lucide-react";

type CurrentUser = { name: string; email: string; role?: "user" | "admin" };

export default function ProfilePage() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    try {
      const cu = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (cu) setUser(cu);
    } catch {}
  }, []);

  const isAdmin = user?.role === "admin";

  return (
    <div className="content-wrap space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="title text-3xl flex items-center gap-2">
          <User2 size={24} /> โปรไฟล์ผู้ใช้
        </h1>
        <Link href="/home" className="btn-brand">กลับหน้าหลัก</Link>
      </div>

      {/* User Card */}
      <div className="brand-card max-w-2xl">
        <div className="flex items-start gap-4">
          <div className="rounded-xl p-2 bg-white border border-[var(--border)]">
            <User2 size={22} />
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold text-primary">{user?.name ?? "-"}</div>
            <div className="text-muted text-sm">{user?.email ?? "-"}</div>
            <div className="text-sm">
              สถานะ: <span className="font-semibold">{user?.role ?? "user"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Shortcut (แสดงเฉพาะ admin) */}
      {isAdmin && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck size={18} />
            <span className="font-semibold">สำหรับผู้ดูแลระบบ</span>
          </div>

          {/* แผงลัดเข้า Admin */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Admin Dashboard */}
            <Link href="admin/dashboard" className="brand-card hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-3">
                <div className="rounded-xl p-2 bg-white border border-[var(--border)]">
                  <LayoutDashboard size={20} />
                </div>
                <div>
                  <div className="font-semibold">แอดมิน แดชบอร์ด</div>
                  <div className="text-muted text-sm">ภาพรวมสถิติ</div>
                </div>
              </div>
            </Link>

            {/* จัดการผู้ใช้ */}
            <Link href="admin/manage-user" className="brand-card hover:scale-[1.02] transition-transform">
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

            {/* จัดการห้อง
            <Link href="admin/rooms" className="brand-card hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-3">
                <div className="rounded-xl p-2 bg-white border border-[var(--border)]">
                  <Boxes size={20} />
                </div>
                <div>
                  <div className="font-semibold">จัดการห้อง</div>
                  <div className="text-muted text-sm">เพิ่ม/แก้ไข/ลบห้อง</div>
                </div>
              </div>
            </Link> */}

            {/* จัดการการจอง */}
            <Link href="admin/manage-booking" className="brand-card hover:scale-[1.02] transition-transform">
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
      )}

      {!isAdmin && (
        <div className="text-muted">ต้องการสิทธิ์ผู้ดูแลระบบเพื่อเข้าหน้า Admin</div>
      )}
    </div>
  );
}
