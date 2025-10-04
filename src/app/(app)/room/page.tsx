// app/room/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoomPage() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");      // <-- string, ไม่ใช้ number แล้ว
  const [saved, setSaved] = useState<{ date: string; time: string } | null>(null);

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

  const book = (roomName: string) => {
    if (!date || !time) return alert("กรุณาเลือกวันที่และเวลา ก่อนจองห้อง");
    router.push(`/booking?room=${encodeURIComponent(roomName)}&date=${date}&time=${time}`);
  };

  return (
    <div className="grid lg:grid-cols-[360px,1fr,1fr] gap-6">
      {/* ฟอร์มด้านซ้าย */}
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
          step={1800} // 30 นาที (ปรับตามต้องการ)
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

      {/* ห้องประชุม A */}
      <div className="panel">
        <h3 className="text-lg font-semibold mb-3">ห้องประชุม A</h3>
        <div className="rounded-xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800">
          <img
            src="https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png"
            alt="Room A"
            className="w-full h-56 object-cover"
          />
        </div>
        <button onClick={() => book("ห้องประชุม A")} className="btn-brand">จองห้อง A</button>
      </div>

      {/* ห้องประชุม B */}
      <div className="panel">
        <h3 className="text-lg font-semibold mb-3">ห้องประชุม B</h3>
        <div className="rounded-xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800">
          <img
            src="https://www.truedigitalpark.com/public/uploads/meeting-room/m-67f29c5fdc598d38e65468ef1030b1af.png"
            alt="Room B"
            className="w-full h-56 object-cover"
          />
        </div>
        <button onClick={() => book("ห้องประชุม B")} className="btn-brand">จองห้อง B</button>
      </div>
    </div>
  );
}
