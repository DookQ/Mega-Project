// src/app/(app)/room/page.tsx
"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RoomPage() {
  // ✅ ครอบด้วย Suspense ภายในไฟล์เดียว (ไม่ต้องแยกไฟล์)
  return (
    <Suspense fallback={null}>
      <RoomInner />
    </Suspense>
  );
}

function RoomInner() {
  const router = useRouter();
  const params = useSearchParams();
  const roomName = params.get("name");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [saved, setSaved] = useState<{ date: string; time: string } | null>(null);

  const rooms = [
    { name: "ห้องประชุม A", image: "https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png" },
    { name: "ห้องประชุม B", image: "https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png" },
  ];

  const room = rooms.find((r) => r.name === roomName);

  useEffect(() => {
    const s = localStorage.getItem("savedTime");
    if (s) setSaved(JSON.parse(s));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { date, time };
    setSaved(data);
    localStorage.setItem("savedTime", JSON.stringify(data));
    alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
  };

  const book = () => {
    if (!room) return alert("ไม่พบห้องนี้");
    if (!date || !time) return alert("กรุณาเลือกวันที่และเวลา ก่อนจองห้อง");
    router.push(`/booking?room=${encodeURIComponent(room.name)}&date=${date}&time=${time}`);
  };

  if (!room) {
    return <p className="text-center mt-6">ไม่พบห้อง</p>;
  }

  return (
    <div className="space-y-6">
      {/* รายละเอียดห้อง */}
      <div className="panel">
        <h3 className="text-lg font-semibold mb-3">{room.name}</h3>
        <div className="rounded-xl overflow-hidden mb-4 border">
          <Image
            src={room.image}
            alt={room.name}
            width={1280}
            height={720}
            className="w-full h-56 object-cover"
          />
        </div>
        <button onClick={book} className="btn-brand">จอง {room.name}</button>
      </div>

      {/* ฟอร์มบันทึกเวลา */}
      <form onSubmit={handleSave} className="panel h-fit">
        <h2 className="title text-lg mb-4">บันทึกเวลา</h2>

        <label className="block text-sm text-primary mb-1">เลือกวันที่</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input mb-3"
        />

        <label className="block text-sm mb-1">เลือกเวลา</label>
        <input
          type="time"
          step={1800}
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="input mb-4"
        />

        <button type="submit" className="btn-brand w-full">บันทึก</button>

        {saved && (
          <div className="note">
            <p>วันที่บันทึก: <strong>{saved.date}</strong></p>
            <p>เวลา: <strong>{saved.time}</strong></p>
          </div>
        )}
      </form>
    </div>
  );
}
