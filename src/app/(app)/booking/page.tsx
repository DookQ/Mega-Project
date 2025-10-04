// app/(app)/booking/page.tsx
import { Suspense } from "react";
import BookingClient from "./BookingClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">กำลังโหลด...</div>}>
      <BookingClient />
    </Suspense>
  );
}
