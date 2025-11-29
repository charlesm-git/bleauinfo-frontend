import { useMediaQuery } from "~/lib/hook/useMediaQuery";
import { ModeToggle } from "./ModeToggle";
import NavMenuDesktop from "./NavMenuDesktop";
import NavMenuMobile from "./NavMenuMobile";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const { isMobile } = useMediaQuery();

  return (
    <>
      {!isMobile ? (
        <nav className="sticky top-0 z-[100] mb-3 py-4 bg-background">
          <div className="w-full md:w-2xl lg:w-3xl xl:w-5xl mx-auto">
            <div className="flex justify-between">
              <NavMenuDesktop />
              <div className="flex gap-4">
                <SearchBar />
                <ModeToggle />
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="sticky top-0 z-[100] mb-2 pt-4 pb-1 bg-background">
          <div className="px-4">
            <div className="flex justify-between items-center gap-4">
              <NavMenuMobile />
              <div className="flex gap-2 items-center flex-1 justify-end">
                <SearchBar />
                <ModeToggle />
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
