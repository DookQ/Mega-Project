"use client";

import { useEffect, useState } from "react";

type Booking = { date: string|null; time: string|null; room: string|null };

export default function MyBookings(){
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(()=>{
    setBookings(JSON.parse(localStorage.getItem("bookings") || "[]"));
  },[]);

  const remove = (i:number) => {
    if (!confirm("ต้องการยกเลิกการจองนี้หรือไม่?")) return;
    const next = bookings.filter((_,idx)=>idx!==i);
    setBookings(next);
    localStorage.setItem("bookings", JSON.stringify(next));
  };

  return (
    <div className="space-y-6">
      <h1 className="title text-3xl">ข้อมูลการจองของฉัน</h1>

      {bookings.length === 0 ? (
        <div className="panel max-w-md text-muted">ยังไม่มีรายการจอง</div>
      ) : (
        <div className="grid gap-4 max-w-4xl">
          {bookings.map((b,i)=>(
            <div key={i} className="panel">
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-1">
                  <div className="font-semibold text-primary">{b.room ?? "ไม่ระบุห้อง"}</div>
                  <div className="text-sm text-muted">
                    วันที่: <b className="text-strong">{b.date ?? "-"}</b> · เวลา: <b className="text-strong">{b.time ?? "-"}</b>
                  </div>
                </div>
                <button onClick={()=>remove(i)} className="btn-brand">ยกเลิก</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
