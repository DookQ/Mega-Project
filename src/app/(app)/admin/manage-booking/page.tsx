"use client";

import { useEffect, useMemo, useState, ChangeEvent } from "react";
import { localdb, Booking } from "@/lib/localdb";
import { CalendarDays, Search as SearchIcon, ClipboardList } from "lucide-react";

export default function ManageBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [form, setForm] = useState({ name: "", date: "", time: "", room: "" });
  const [search, setSearch] = useState({ name: "", date: "" });

  const refresh = () => setBookings(localdb.listBookings());
  useEffect(() => { refresh(); }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch({ ...search, [e.target.name]: e.target.value });

  const addBooking = () => {
    if (!form.name || !form.date || !form.time) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    localdb.addBooking({
      name: form.name,
      date: form.date,
      time: form.time,
      room: form.room || "-",
    });
    setForm({ name: "", date: "", time: "", room: "" });
    refresh();
  };

  const editBooking = (id: number) => {
    const b = bookings.find(x => x.id === id);
    if (!b) return;
    const newName = prompt("แก้ไขชื่อผู้จอง:", b.name);
    if (newName && newName !== b.name) {
      localdb.patchBooking(id, { name: newName });
      refresh();
    }
  };

  const cancelBooking = (id: number) => {
    if (!confirm("ยืนยันยกเลิกการจองนี้?")) return;
    localdb.patchBooking(id, { status: "Cancelled" });
    refresh();
  };

  const removeBooking = (id: number) => {
    if (!confirm("ลบการจองนี้ถาวรหรือไม่?")) return;
    localdb.deleteBooking(id);
    refresh();
  };

  const resetSearch = () => setSearch({ name: "", date: "" });

  const filtered = useMemo(() => {
    return bookings.filter(b => {
      const matchName = search.name ? b.name.toLowerCase().includes(search.name.toLowerCase()) : true;
      const matchDate = search.date ? b.date === search.date : true;
      return matchName && matchDate;
    });
  }, [bookings, search]);

  return (
    <div className="content-wrap space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="title text-3xl flex items-center gap-2">
          <ClipboardList size={24} /> จัดการการจอง
        </h1>
      </div>

      {/* Search */}
      <div className="brand-card">
        <div className="flex items-center gap-2 mb-3 text-primary">
          <SearchIcon size={18} />
          <span className="font-semibold">ค้นหาการจอง</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            name="name"
            placeholder="ชื่อลูกค้า"
            value={search.name}
            onChange={handleSearchChange}
            className="input w-60"
          />
          <input
            name="date"
            type="date"
            value={search.date}
            onChange={handleSearchChange}
            className="input"
          />
          <button onClick={resetSearch} className="btn-brand px-4 py-2 w-28">รีเซ็ต</button>
        </div>
      </div>

      {/* Add Booking */}
      <div className="brand-card">
        <div className="flex items-center gap-2 mb-3 text-primary">
          <CalendarDays size={18} />
          <span className="font-semibold">เพิ่มการจอง</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <input className="input w-60" name="name" placeholder="ชื่อลูกค้า" value={form.name} onChange={handleChange} />
          <input className="input" name="room" placeholder="ห้อง (ถ้ามี)" value={form.room} onChange={handleChange} />
          <input className="input" name="date" type="date" value={form.date} onChange={handleChange} />
          <input className="input" name="time" type="time" value={form.time} onChange={handleChange} />
          <button onClick={addBooking} className="btn-brand px-4 py-2">เพิ่ม</button>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ชื่อลูกค้า</th>
                <th>ห้อง</th>
                <th>วันที่</th>
                <th>เวลา</th>
                <th>สถานะ</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
<tbody>
  {filtered.map((b, i) => (
    <tr key={`${b.id ?? "noid"}-${b.date ?? "nodate"}-${b.time ?? "notime"}-${i}`}>
      <td>{b.id}</td>
      <td className="text-primary">{b.name}</td>
      <td>{b.room ?? "-"}</td>
      <td>{b.date}</td>
      <td>{b.time}</td>
      <td>
        <span className={`badge ${b.status === "Cancelled" ? "!bg-red-100 !text-red-700 !border-red-300" : ""}`}>
          {b.status}
        </span>
      </td>
      <td>
                    <div className="flex items-center gap-4">
                      <button className="link-accent" onClick={() => editBooking(b.id)}>แก้ไข</button>
                      {b.status !== "Cancelled" ? (
                        <button className="link-danger" onClick={() => cancelBooking(b.id)}>ยกเลิก</button>
                      ) : (
                        <button className="link-danger" onClick={() => removeBooking(b.id)}>ลบ</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-muted py-6">ยังไม่มีรายการ</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
