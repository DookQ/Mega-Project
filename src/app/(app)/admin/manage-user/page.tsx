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
    setUsers((prev) => {
      const next: User[] = prev.map((u): User =>
        u.email === email
          ? { ...u, role: u.role === "admin" ? "user" : "admin" } // <- literal union
          : u
      );

      saveUsers(next);

      // อัปเดต currentUser ถ้าคนเดียวกัน
      if (current?.email === email) {
        const newRole: "user" | "admin" =
          current.role === "admin" ? "user" : "admin";
        localStorage.setItem(
          CURRENT_KEY,
          JSON.stringify({ ...current, role: newRole })
        );
      }

      return next; // <- ชัดเจนว่าเป็น User[]
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
    <div className="table-card card-tight">
      <div className="table-wrap overflow-x-auto">
        <table className="table compact min-w-[720px]">
          <thead>
            <tr>
              <th className="w-[140px]">ชื่อ</th>
              <th className="w-[220px]">อีเมล</th>
              <th className="w-[110px]">Role</th>
              <th className="w-[140px]">วันที่สมัคร</th>
              <th className="w-[160px]">การจัดการ</th>
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
                <td className="text-muted whitespace-nowrap">{u.createdAt ?? "-"}</td>
                <td>
                  <div className="flex items-center gap-3">
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

  );
}
