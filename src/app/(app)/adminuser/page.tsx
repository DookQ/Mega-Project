// src/app/(app)/admin/users/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

type User = {
  name: string;
  email: string;
  password?: string;
  role?: "user" | "admin";
  createdAt?: string; // ISO string
};

const STORAGE_KEY = "users";
const CURRENT_KEY = "currentUser";

// ---- helpers ----
function loadUsers(): User[] {
  const raw = localStorage.getItem(STORAGE_KEY) || "[]";
  let list: User[] = [];
  try { list = JSON.parse(raw); } catch { list = []; }

  // migration: ใส่ role / createdAt ถ้าไม่มี (แก้ "Role ไม่ขึ้น")
  let mutated = false;
  const fixed = list.map(u => {
    const nu: User = { ...u };
    if (!nu.role) { nu.role = "user"; mutated = true; }
    if (!nu.createdAt) { nu.createdAt = "-"; mutated = true; }
    return nu;
  });
  if (mutated) localStorage.setItem(STORAGE_KEY, JSON.stringify(fixed));
  return fixed;
}

function saveUsers(list: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const current = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(CURRENT_KEY) || "null") as User | null; }
    catch { return null; }
  }, []);

  useEffect(() => {
    setUsers(loadUsers());
  }, []);

  const changeRole = (email: string) => {
    setUsers(prev => {
      const next = prev.map(u =>
        u.email === email ? { ...u, role: (u.role === "admin" ? "user" : "admin") } : u
      );
      saveUsers(next);

      // ถ้าเป็น user ปัจจุบัน อัปเดต currentUser ด้วย
      if (current?.email === email) {
        localStorage.setItem(CURRENT_KEY, JSON.stringify({
          ...current, role: (current.role === "admin" ? "user" : "admin")
        }));
      }
      return next;
    });
    alert("อัปเดต Role เรียบร้อย");
  };

  const removeUser = (email: string) => {
    if (!confirm("ต้องการลบผู้ใช้นี้หรือไม่?")) return;
    // กันลบตัวเอง (ถ้าอยากให้ลบตัวเองแล้ว logout ก็เปลี่ยนลอจิกตรงนี้ได้)
    if (current?.email === email) {
      alert("ไม่สามารถลบผู้ใช้ที่กำลังล็อกอินอยู่ได้");
      return;
    }
    setUsers(prev => {
      const next = prev.filter(u => u.email !== email);
      saveUsers(next);
      return next;
    });
    alert("ลบผู้ใช้เรียบร้อย");
  };

  return (
    <div className="content-wrap space-y-6">
      <h1 className="title text-3xl">จัดการผู้ใช้</h1>

      <div className="table-card">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ชื่อ</th>
                <th>อีเมล</th>
                <th>Role</th>
                <th>วันที่สมัคร</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.email}>
                  <td className="text-primary">{u.name || "-"}</td>
                  <td className="text-primary">{u.email}</td>
                  <td>
                    <span className="badge">{u.role ?? "user"}</span>
                  </td>
                  <td className="text-muted">{u.createdAt ?? "-"}</td>
                  <td>
                    <div className="flex items-center gap-4">
                      <button
                        className="link-accent"
                        onClick={() => changeRole(u.email)}
                        title="สลับระหว่าง admin / user"
                      >
                        เปลี่ยน Role
                      </button>
                      <button
                        className="link-danger"
                        onClick={() => removeUser(u.email)}
                      >
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-muted py-6">ยังไม่มีผู้ใช้</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
