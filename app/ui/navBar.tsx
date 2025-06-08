export function NavBar() {
    const items = [
        { title: "Home", url: "/" },
        { title: "Best Rated", url: "/best-rated" },
        { title: "Most Repeats", url: "/most-ascents" },
        { title: "Statistics", url: "/statistics"},
        { title: "Areas", url: "/areas"},
    ]
    return (
        <nav className="flex justify-center">
            {items.map((item) => <NavBarItem key={item.url} title={item.title} url={item.url} />)}
        </nav>
    );
}

function NavBarItem({ title, url }) {
    return (
        <a href={url} className="p-4">{title}</a>
    );
  }