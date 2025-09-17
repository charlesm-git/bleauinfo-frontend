import { NavBar } from "./navBar";

export function MainLayout({ children }: {children: React.ReactNode}) {
  return (
    <body className="mb-24">
      <header className="bg-slate-700 mb-8">
        <div className="max-w-4xl mx-auto">
          <NavBar />
        </div>
      </header>
      <main className="max-w-5xl mx-auto">
        {children}
      </main>
    </body>
  );
}
