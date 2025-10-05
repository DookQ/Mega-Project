// src/app/(app)/rules/page.tsx
import {
  BookText, Shield, AlertTriangle, Clock, Users, FileText, Phone, Ban
} from "lucide-react";

function Section({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  items: React.ReactNode;
}) {
  return (
    <div className="brand-card">
      <div className="flex items-center gap-3 mb-3">
        <div className="rounded-xl p-2 bg-white/5 border border-[var(--border)]">
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-2 text-sm leading-6">{items}</div>
    </div>
  );
}

export default function RulesPage() {
  return (
    <div className="content-wrap space-y-8">
      {/* Header */}
      <h1 className="title text-3xl flex items-center gap-2">
        <BookText size={24} /> ข้อปฏิบัติการใช้ห้อง
      </h1>

      {/* Rules grid (ทุกอย่างแสดงอยู่แล้ว ไม่ต้องกด) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Section
          icon={Clock}
          title="เวลาการใช้งาน"
          items={
            <ul className="list-disc pl-5 space-y-1">
              <li>เปิดให้จอง <b>08:00–18:00 น.</b> ทุกวันทำการ</li>
              <li>จองต่อครั้งไม่เกิน <b>2 ชั่วโมง</b> และล่วงหน้าได้สูงสุด 7 วัน</li>
              <li>ไม่มาใช้ภายใน <b>15 นาทีแรก</b> ระบบจะยกเลิกอัตโนมัติ</li>
            </ul>
          }
        />

        <Section
          icon={Users}
          title="จำนวนผู้ใช้ & มารยาท"
          items={
            <ul className="list-disc pl-5 space-y-1">
              <li>จำกัดจำนวนผู้ใช้ตามความจุของห้อง</li>
              <li>พูดคุยในระดับเสียงที่เหมาะสม งดรบกวนผู้อื่น</li>
              <li>ดูแลความสะอาดและทรัพย์สินร่วมกัน</li>
            </ul>
          }
        />

        <Section
          icon={Shield}
          title="ความปลอดภัย"
          items={
            <ul className="list-disc pl-5 space-y-1">
              <li>ตรวจสอบอุปกรณ์ไฟฟ้าก่อนออกจากห้อง</li>
              <li>กรณีฉุกเฉิน ให้ติดต่อเจ้าหน้าที่ทันที</li>
              <li>ทรัพย์สินส่วนตัวเป็นความรับผิดชอบของผู้ใช้</li>
            </ul>
          }
        />

        <Section
          icon={Ban}
          title="ข้อห้าม"
          items={
            <ul className="list-disc pl-5 space-y-1">
              <li>ห้ามอาหาร/เครื่องดื่มที่อาจเลอะหรือมีกลิ่นแรง</li>
              <li>ห้ามเคลื่อนย้ายเฟอร์นิเจอร์ออกนอกตำแหน่ง</li>
              <li>ห้ามใช้กิจกรรมเชิงพาณิชย์ที่ไม่ได้รับอนุญาต</li>
            </ul>
          }
        />

        <Section
          icon={AlertTriangle}
          title="การละเมิด & โทษ"
          items={
            <ul className="list-disc pl-5 space-y-1">
              <li>ระงับสิทธิ์ชั่วคราว 7–30 วัน ตามความรุนแรง</li>
              <li>เรียกเก็บค่าเสียหายตามจริงหากทรัพย์สินชำรุด</li>
              <li>การรายงานเท็จอาจถูกระงับสิทธิ์การจอง</li>
            </ul>
          }
        />

        <Section
          icon={FileText}
          title="ข้อมูล & การบันทึก"
          items={
            <ul className="list-disc pl-5 space-y-1">
              <li>ระบบเก็บประวัติการจองเพื่อการตรวจสอบย้อนหลัง</li>
              <li>ข้อมูลส่วนบุคคลใช้เพื่อการให้บริการเท่านั้น</li>
              <li>ต้องการลบข้อมูลส่วนบุคคล โปรดติดต่อเจ้าหน้าที่</li>
            </ul>
          }
        />
      </div>

      {/* Contact */}
      <div className="brand-card">
        <div className="flex items-center gap-3 mb-3">
          <div className="rounded-xl p-2 bg-white/5 border border-[var(--border)]">
            <Phone size={20} />
          </div>
          <h3 className="text-lg font-semibold">ติดต่อเจ้าหน้าที่</h3>
        </div>
        <p className="text-sm text-muted">
          โทร 02-123-4567 • อีเมล support@library.local • เวลาให้บริการ 09:00–20:00 น. (จันทร์–ศุกร์)
        </p>
      </div>
    </div>
  );
}
