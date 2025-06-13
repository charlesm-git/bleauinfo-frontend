import { NavBar } from "./navBar";

export function MainLayout({ children }) {
  return (
    <body className="mb-24">
      <header className="bg-slate-700 mb-8">
        <div className="xl:max-w-4xl lg:max-w-2xl md:max-w-lg max-w-sm mx-auto">
          <NavBar />
        </div>
      </header>
      <main className="xl:max-w-6xl lg:max-w-3xl md:max-w-lg max-w-sm mx-auto">
        {children}
      </main>
    </body>
  );
}
