// app/search-room/page.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

type Room = { name: string; image: string };

export default function SearchRoomPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const rooms: Room[] = [
    { name: "ห้องประชุม A", image: "https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png" },
    { name: "ห้องประชุม B", image: "https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png" },
  ];

  const filtered = rooms.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--brand-to)] text-center">ค้นหาห้องประชุม</h1>

      <div className="brand-card max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="🔍 พิมพ์ชื่อห้องที่ต้องการค้นหา..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {filtered.length === 0 ? (
          <p className="brand-subtle text-center mt-6">ไม่พบห้องที่ค้นหา</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {filtered.map((room, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow">
                <div className="relative w-full h-44">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold mb-3">{room.name}</h3>
                  <Link href="/room" className="inline-block rounded-md px-4 py-2 text-white brand-gradient hover:opacity-90">
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/home" className="inline-block rounded-md px-4 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
