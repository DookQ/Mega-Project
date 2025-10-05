// app/page.tsx
"use client";

import Link from "next/link";
import {
  Search, CalendarDays, User2, BookText
} from "lucide-react";

type Card = {
  href: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

export default function Page() {
  const cards: Card[] = [
    { href: "/search-room", title: "ค้นหาห้อง",           subtitle: "Search room",         icon: Search },
    { href: "/room",        title: "การจองห้อง",          subtitle: "Booking a room",      icon: CalendarDays },
    { href: "/profile",     title: "โปรไฟล์",    subtitle: "Profile",             icon: User2 },
    { href: "/my-booking",       title: "ตรวจสอบการจอง", subtitle: "Room usage rules",    icon: BookText },
    { href: "/rules",       title: "ข้อปฏิบัติการใช้ห้อง", subtitle: "Room usage rules",    icon: BookText },
  ];

  return (
    <div className="space-y-6 content-wrap">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 justify-items-center">
        {cards.map(({ href, title, subtitle, icon: Icon }) => (
          <Link key={href} href={href} className="w-full max-w-[22rem]">
            <div className="brand-card hover:scale-[1.02] transition-transform duration-150">
              <div className="flex items-center gap-3">
                {/* วงกลมไอคอนนุ่ม ๆ */}
                <div className="rounded-xl p-2 bg-white/5 border border-[var(--border)]">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <div className="text-lg font-semibold truncate">{title}</div>
                  <p className="text-muted text-sm truncate">{subtitle}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
