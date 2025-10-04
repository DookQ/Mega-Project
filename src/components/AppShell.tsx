// components/AppShell.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home, CalendarDays, ClipboardList, Search, BookText,
  Sun, Moon, ChevronsLeft, ChevronsRight, User2, LayoutDashboard,
} from "lucide-react";

// ⬇️ map ไอคอนใช้เป็น "string id" (ไม่ส่ง component จาก server)
const ICONS = {
  home: Home,
  calendar: CalendarDays,
  clipboard: ClipboardList,
  search: Search,
  book: BookText,
} as const;
type IconId = keyof typeof ICONS;

type NavItem = { href: string; label: string; iconId?: IconId };

export default function AppShell({
  children,
  title = "Library",
  // ⬇️ ใส่ iconId ให้ครบ (ใช้ default นี้ได้เลย ไม่ต้องส่ง nav จาก layout ก็ได้)
  nav = [
    { href: "/home",        label: "หน้าหลัก",          iconId: "home" },
    { href: "/room",        label: "การจองห้อง",        iconId: "calendar" },
    { href: "/my-booking",  label: "ตรวจสอบการจอง",     iconId: "clipboard" },
    { href: "/search-room", label: "ค้นหาห้อง",         iconId: "search" },
    { href: "/rules",       label: "ข้อปฏิบัติ",         iconId: "book" },
  ] as NavItem[],
}: {
  children: React.ReactNode;
  title?: string;
  nav?: NavItem[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState("ผู้ใช้งานทั่วไป");
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (u?.name) setUserName(u.name);
      const saved = localStorage.getItem("theme");
      const prefersDark = saved ? saved === "dark"
        : window.matchMedia?.("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className="brand-page flex min-h-svh">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} transition-[width] duration-200
        bg-white/90 text-slate-700 border-r border-slate-200
        dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 flex flex-col`}>
        <div className="h-14 brand-gradient flex items-center px-3 text-white">
          <button
            aria-label="Toggle sidebar"
            className="rounded-md bg-white/10 px-2 py-1 hover:bg-white/20 flex items-center"
            onClick={() => setSidebarOpen(v => !v)}
          >
            {sidebarOpen ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
          </button>
          {sidebarOpen && (
            <span className="ml-3 font-semibold flex items-center gap-2">
              <LayoutDashboard size={18}/> {title}
            </span>
          )}
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-2">
          {nav.map(({ href, label, iconId }) => {
            const active = pathname === href || (href !== "/home" && pathname?.startsWith(href));
            const IconComp = (iconId && ICONS[iconId]) || Home; // fallback
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`brand-sidelink flex items-center gap-3 ${sidebarOpen ? "" : "justify-center"}`}
                title={label}
              >
                {/* ⬇️ ใช้ Lucide แทนอีโมจิ */}
                <IconComp size={20} strokeWidth={2} />
                {sidebarOpen && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <section className="flex-1 flex flex-col">
        <header className="h-14 brand-gradient flex items-center justify-between px-4 text-white shadow">
          <div className="font-medium flex items-center gap-2"><LayoutDashboard size={16}/> Dashboard</div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-md px-2 py-1 bg-white/20 hover:bg-white/30 transition"
              title={isDark ? "Dark" : "Light"}
            >
              {isDark ? <Moon size={16}/> : <Sun size={16}/>}
            </button>
            <Link href="/profile" className="text-sm hover:underline flex items-center gap-2">
              <User2 size={16}/> {userName}
            </Link>
          </div>
        </header>

        <main className="p-6 content-wrap">{children}</main>

        <footer className="mt-auto px-4 py-3 text-center text-sm text-slate-600 dark:text-slate-300">
          © 2025 Library Room Booking System
        </footer>
      </section>
    </div>
  );
}
