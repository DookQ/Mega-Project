"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

type Room = { name: string; image: string };

export default function SearchRoomPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const rooms: Room[] = [
    {
      name: "ห้องประชุม A",
      image:
        "https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png",
    },
    {
      name: "ห้องประชุม B",
      image:
        "https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png",
    },
  ];

  const filtered = rooms.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 px-6">
      <h1 className="text-3xl font-bold text-[var(--brand-to)] text-center">
        ค้นหาห้องประชุม
      </h1>

      {/* container เต็มความกว้าง */}
      <div className="brand-card w-full mx-auto">
        <input
          type="text"
          placeholder="🔍 พิมพ์ชื่อห้องที่ต้องการค้นหา..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {filtered.length === 0 ? (
          <p className="brand-subtle text-center mt-6">ไม่พบห้องที่ค้นหา</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filtered.map((room, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:scale-[1.02] transition-transform"
              >
                {/* รูปให้กว้างตามการ์ดและอัตราส่วนคงที่ */}
                <div className="relative w-full aspect-video">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-4">{room.name}</h3>
                  <Link
                    href={`/room?name=${encodeURIComponent(room.name)}`}
                    className="inline-block rounded-md px-6 py-3 text-white text-lg brand-gradient hover:opacity-90"
                  >
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/home"
            className="inline-block rounded-md px-6 py-3 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}
