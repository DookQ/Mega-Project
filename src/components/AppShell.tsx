// src/components/AppShell.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home, CalendarDays, ClipboardList, Search, BookText,
  ChevronsLeft, ChevronsRight, User2, LayoutDashboard
} from "lucide-react";

const ICONS = { home: Home, calendar: CalendarDays, clipboard: ClipboardList, search: Search, book: BookText } as const;
type IconId = keyof typeof ICONS;
type NavItem = { href: string; label: string; iconId?: IconId };

export default function AppShell({
  children,
  title = "Library",
  nav = [
    { href: "/home", label: "หน้าหลัก", iconId: "home" },
    { href: "/search-room", label: "ค้นหาห้อง", iconId: "search" },
    { href: "/room", label: "การจองห้อง", iconId: "calendar" },
    { href: "/my-booking", label: "ตรวจสอบการจอง", iconId: "clipboard" },
    { href: "/rules", label: "ข้อปฏิบัติการใช้ห้อง", iconId: "book" },
  ] as NavItem[],
}: { children: React.ReactNode; title?: string; nav?: NavItem[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState("ผู้ใช้งานทั่วไป");
  const pathname = usePathname();

useEffect(() => {
  try {
    const u = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (u?.name) setUserName(u.name);
  } catch {}
}, []);

  // ชื่อหน้า (เปลี่ยนตาม route)
  const currentLabel = (() => {
    const matches = nav
      .filter(i => pathname === i.href || (i.href !== "/home" && pathname.startsWith(i.href)))
      .sort((a, b) => b.href.length - a.href.length);
    return matches[0]?.label ?? "Dashboard";
  })();

  useEffect(() => {
    document.title = `${currentLabel} • ${title}`;
  }, [currentLabel, title]);

  return (
    <div className="brand-page flex min-h-svh text-[var(--text)]">
      {/* Sidebar */}
<aside
  className={`${sidebarOpen ? "w-64" : "w-16"} transition-[width] duration-200
  bg-white text-slate-700 border-r border-[var(--border)] flex flex-col min-w-[4rem]`}
>
  <div className="h-14 brand-gradient flex items-center px-3 text-white font-semibold">
          <button
            aria-label="Toggle sidebar"
            className="rounded-md bg-black/10 px-2 py-1 hover:bg-black/20 flex items-center"
            onClick={() => setSidebarOpen(v => !v)}
          >
            {sidebarOpen ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
          </button>
          {sidebarOpen && (
            <span className="ml-3 flex items-center gap-2">
              <LayoutDashboard size={18} /> {title}
            </span>
          )}
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-2">
          {nav.map(({ href, label, iconId }) => {
            const active = pathname === href || (href !== "/home" && pathname?.startsWith(href));
            const IconComp = (iconId && ICONS[iconId]) || Home;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`brand-sidelink flex items-center gap-3 ${sidebarOpen ? "" : "justify-center"}`}
                title={label}
              >
                <IconComp size={20} strokeWidth={2} />
                {sidebarOpen && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
<section className="flex-1 flex min-w-0 flex-col">
  <header className="sticky top-0 z-30 w-full">
    <div className="brand-gradient h-14 flex items-center justify-between px-4 text-white shadow">
            <div className="font-medium flex items-center gap-2">
              <LayoutDashboard size={16} /> {currentLabel}
            </div>
            {/* ← ลบปุ่มสลับธีมออกแล้ว เหลือเฉพาะลิงก์โปรไฟล์ */}
            <Link href="/profile" className="text-sm hover:underline flex items-center gap-2">
              <User2 size={16} /> {userName}
            </Link>
          </div>
          <div className="h-px w-full bg-[var(--border)]" />
        </header>

        <main className="p-6 content-wrap">{children}</main>

        <footer className="mt-auto px-4 py-3 text-center text-sm text-[#9aa5b1]">
          © 2025 Library Room Booking System
        </footer>
      </section>
    </div>
  );
}
