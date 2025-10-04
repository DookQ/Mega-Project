// app/page.tsx
"use client";

import Link from "next/link";

export default function Page() {
  const cards = [
    { href: "/room/",        title: "การจองห้อง",        subtitle: "Booking a room" },
    { href: "/my-booking/",  title: "ข้อมูลการจองห้อง",   subtitle: "Room booking information" },
    { href: "/rules",        title: "ข้อปฏิบัติการใช้ห้อง", subtitle: "Room usage rules" },
  ];

  return (
    <div className="space-y-6 content-wrap">
      {/* แถบหัวเรื่องตรงกับสกรีนช็อต */}
      <div className="brand-gradient rounded-md px-4 py-3 text-white text-xl font-semibold">
        Library
      </div>

      {/* การ์ดลิงก์ */}
      <div className="flex justify-center gap-6 flex-wrap">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="hover:scale-105 transition">
            <div className="brand-card text-center w-[22rem]">
              <div className="text-2xl font-semibold">{c.title}</div>
              <p className="brand-subtle text-sm mt-1">{c.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
