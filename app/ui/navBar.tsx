export function NavBar() {
    const items = [
        { title: "Home", url: "/" },
        { title: "Best Rated", url: "/best-rated" },
        { title: "Most Repeats", url: "/most-repeats" },
        { title: "Statistics", url: "/statistics"}
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