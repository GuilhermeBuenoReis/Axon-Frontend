'use client';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen bg-foreground flex items-center justify-center">
      <main className="">{children}</main>
    </div>
  );
}
