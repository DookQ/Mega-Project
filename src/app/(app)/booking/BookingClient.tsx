// app/(app)/booking/BookingClient.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { localdb } from "@/lib/localdb"; // ✅ ใช้ localdb เหมือนหน้า manage-booking

export default function BookingClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [userName, setUserName] = useState<string>("ผู้ใช้งานทั่วไป");

  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const room = searchParams.get("room") || "-";

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (u?.name) setUserName(u.name);
    } catch {}
  }, []);

  const handleConfirm = () => {
    if (!date || !time) {
      alert("กรุณาระบุวันและเวลาให้ครบ");
      return;
    }

    localdb.addBooking({
      name: userName,
      date,
      time,
      room,
      status: "Pending",
    });

    alert("ยืนยันการจองเรียบร้อย ✅");
    router.push("/admin/manage-booking"); // ไปดูรายการที่เพิ่งเพิ่ม
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[var(--brand-to)]">รายละเอียดการจอง</h1>

      <div className="brand-card w-full max-w-lg">
        <div className="space-y-3 text-base">
          <p><strong className="text-[var(--brand-to)]">ผู้จอง:</strong> {userName}</p>
          <p><strong className="text-[var(--brand-to)]">ห้องที่จอง:</strong> {room}</p>
          <p><strong className="text-[var(--brand-to)]">วันที่:</strong> {date || "ไม่ระบุ"}</p>
          <p><strong className="text-[var(--brand-to)]">เวลา:</strong> {time || "ไม่ระบุ"}</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleConfirm}
            className="rounded-lg px-5 py-2 text-white btn-brand"
          >
            ยืนยันการจอง
          </button>
          <button
            onClick={() => router.back()}
            className="rounded-lg px-5 py-2 border border-slate-300/60 hover:bg-slate-50"
          >
            ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  );
}
