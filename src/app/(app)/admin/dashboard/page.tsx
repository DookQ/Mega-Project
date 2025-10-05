// src/app/(app)/admin/page.tsx
"use client";

import { Users, Box, Receipt, type LucideIcon } from "lucide-react";

type StatProps = {
  icon: LucideIcon;          // ✅ แทน any
  label: string;
  value: string | number;
};

const Stat = ({ icon: Icon, label, value }: StatProps) => (
  <div className="stat-card">
    <div className="stat-head">
      <Icon size={18} />
      <span>{label}</span>
    </div>
    <div className="stat-value">{value}</div>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="content-wrap">
      <h1 className="title text-3xl mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Stat icon={Users} label="Total Users" value={120} />
        <Stat icon={Box} label="Products" value={45} />
        <Stat icon={Receipt} label="Orders" value={230} />
      </div>
    </div>
  );
}
