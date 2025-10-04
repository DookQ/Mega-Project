// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.truedigitalpark.com", pathname: "/public/uploads/meeting-room/**" },
      // เผื่อมีรูปจากโดเมนไม่มี www ด้วย
      { protocol: "https", hostname: "www.truedigitalpark.com", pathname: "/public/uploads/meeting-room/**" },
    ],
  },
};

export default nextConfig;
