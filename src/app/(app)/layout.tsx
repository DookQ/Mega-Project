// src/app/(app)/layout.tsx
import AppShell from "@/components/AppShell";

export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  return <AppShell title="Library">{children}</AppShell>;
}
