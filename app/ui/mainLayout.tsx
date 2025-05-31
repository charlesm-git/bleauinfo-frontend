import { NavBar } from "./navBar";

export function MainLayout({ children }) {
  return (
    <main className="">
      <header className="">
        <NavBar />
      </header>
      <main className="max-w-5xl mx-auto">
        { children }
      </main>
    </main>
  );
}
