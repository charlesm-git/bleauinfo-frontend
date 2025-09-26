import { NavBar } from "./navBar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="max-w-5xl mx-auto mb-24">{children}</main>
    </div>
  );
}
