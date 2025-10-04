// src/app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-bg min-h-svh flex items-center justify-center p-6">
      <div className="w-full max-w-xl">{children}</div>
    </div>
  );
}
