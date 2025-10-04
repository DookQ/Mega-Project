"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Booking = { date: string|null; time: string|null; room: string|null };

export default function ProfilePage(){
  const [user, setUser] = useState<{name:string; email:string} | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(()=> {
    const cu = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (cu) setUser({ name: cu.name, email: cu.email });
    const b: Booking[] = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(b);
  }, []);

  const cancel = (i:number) => {
    if (!confirm("ยืนยันยกเลิกการจองนี้?")) return;
    const next = bookings.filter((_,idx)=>idx!==i);
    setBookings(next);
    localStorage.setItem("bookings", JSON.stringify(next));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <h1 className="title text-3xl">โปรไฟล์ของ {user?.name ?? "-"}</h1>
        <Link href="/home" className="btn-brand">กลับหน้าหลัก</Link>
      </div>

      {/* กล่องข้อมูลผู้ใช้ */}
      <div className="panel max-w-md">
        <p className="text-primary"><b>ชื่อ:</b> {user?.name ?? "-"}</p>
        <p className="text-primary"><b>อีเมล:</b> {user?.email ?? "-"}</p>
      </div>

      <h2 className="title text-2xl">การจองของฉัน</h2>

      {bookings.length === 0 ? (
        <div className="panel max-w-md text-muted">ยังไม่มีการจอง</div>
      ) : (
        <div className="grid gap-4 max-w-3xl">
          {bookings.map((b, i)=>(
            <div key={i} className="panel">
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-1">
                  <div className="font-semibold text-primary">{b.room ?? "ไม่ระบุห้อง"}</div>
                  <div className="text-sm text-muted">
                    วันที่: <b className="text-strong">{b.date ?? "-"}</b> · เวลา: <b className="text-strong">{b.time ?? "-"}</b>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>cancel(i)} className="btn-brand">ยกเลิก</button>
                  <Link href="/room" className="rounded-md px-4 py-2 border border-slate-300 dark:border-slate-700">
                    จองเพิ่ม
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
