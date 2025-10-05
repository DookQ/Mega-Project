"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { localdb, Room } from "@/lib/localdb";
import { Boxes, Plus, Save, X, Edit2, Trash2 } from "lucide-react";

export default function ManageRoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [form, setForm] = useState({ name: "", capacity: "", price: "", type: "" });
  const [editId, setEditId] = useState<number | null>(null);

  // โหลดรายการจาก localdb
  const refresh = () => setRooms(localdb.listRooms());
  useEffect(() => { refresh(); }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addRoom = () => {
    if (!form.name || !form.capacity || !form.price || !form.type) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    localdb.addRoom({
      name: form.name,
      capacity: Number(form.capacity),
      price: Number(form.price),
      type: form.type,
    });
    setForm({ name: "", capacity: "", price: "", type: "" });
    refresh();
  };

  const startEdit = (room: Room) => {
    setEditId(room.id);
    setForm({
      name: room.name,
      capacity: String(room.capacity),
      price: String(room.price),
      type: room.type,
    });
  };

  const saveEdit = () => {
    if (!editId) return;
    if (!form.name || !form.capacity || !form.price || !form.type) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    localdb.patchRoom(editId, {
      name: form.name,
      capacity: Number(form.capacity),
      price: Number(form.price),
      type: form.type,
    });
    setEditId(null);
    setForm({ name: "", capacity: "", price: "", type: "" });
    refresh();
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ name: "", capacity: "", price: "", type: "" });
  };

  const deleteRoom = (id: number) => {
    if (!confirm("คุณต้องการลบห้องนี้หรือไม่?")) return;
    localdb.deleteRoom(id);
    refresh();
  };

  return (
    <div className="content-wrap space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="title text-3xl flex items-center gap-2">
          <Boxes size={24} /> จัดการห้อง
        </h1>
      </div>

      {/* Form */}
      <div className="brand-card">
        <div className="grid gap-3 md:grid-cols-5">
          <input className="input" name="name" placeholder="ชื่อห้อง" value={form.name} onChange={handleChange} />
          <input className="input" name="capacity" type="number" placeholder="ความจุ" value={form.capacity} onChange={handleChange} />
          <input className="input" name="price" type="number" placeholder="ราคา" value={form.price} onChange={handleChange} />
          <select className="input" name="type" value={form.type} onChange={handleChange}>
            <option value="">ประเภทห้อง</option>
            <option value="Single">เดี่ยว</option>
            <option value="Double">คู่</option>
            <option value="Suite">สวีท</option>
            <option value="Deluxe">ดีลักซ์</option>
          </select>

          {editId ? (
            <div className="flex gap-2">
              <button onClick={saveEdit} className="btn-brand flex-1 flex items-center justify-center gap-2">
                <Save size={16}/> บันทึก
              </button>
              <button onClick={cancelEdit} className="btn-brand flex-1 flex items-center justify-center gap-2" style={{backgroundImage:"none", backgroundColor:"#94a3b8"}}>
                <X size={16}/> ยกเลิก
              </button>
            </div>
          ) : (
            <button onClick={addRoom} className="btn-brand flex items-center justify-center gap-2">
              <Plus size={16}/> เพิ่มห้อง
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ชื่อห้อง</th>
                <th>ความจุ</th>
                <th>ราคา</th>
                <th>ประเภท</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
<tbody>
  {rooms.map((room, i) => (
    <tr key={`${room.id ?? "noid"}-${room.name ?? "noname"}-${i}`}>
                  <td>{room.id}</td>
                  <td className="text-primary">{room.name}</td>
                  <td>{room.capacity}</td>
                  <td>{room.price}</td>
                  <td>{room.type}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <button className="link-accent flex items-center gap-1" onClick={() => startEdit(room)}>
                        <Edit2 size={14}/> แก้ไข
                      </button>
                      <button className="link-danger flex items-center gap-1" onClick={() => deleteRoom(room.id)}>
                        <Trash2 size={14}/> ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rooms.length === 0 && (
                <tr><td colSpan={6} className="text-center text-muted py-6">ยังไม่มีรายการ</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
