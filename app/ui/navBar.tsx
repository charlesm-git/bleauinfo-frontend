import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export function NavBar() {
    const items = [
        { title: "Home", url: "/" },
        { title: "Best Rated", url: "/best-rated" },
        { title: "Most Ascents", url: "/most-ascents" },
        { title: "Statistics", url: "/statistics" },
        { title: "Areas", url: "/areas" },
    ]
    const [searchText, setSearchText] = useState();

    return (
        <nav className="flex justify-between items-center text-white">
            <div className="flex justify-center">
                {items.map((item) => <NavBarItem key={item.url} title={item.title} url={item.url} />)}
            </div>
            <div>
                <SearchBar filterText={searchText} />
            </div>
        </nav>
    );
}

function NavBarItem({ title, url }) {
    return (
        <a href={url} className="p-4">{title}</a>
    );
}

function SearchBar() {
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const inputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        inputRef.current?.blur();
        if (text.trim()) {
            navigate(`/search/${encodeURIComponent(text)}`);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                className="w-40 text-sm placeholder-gray-100 border-1 ps-3 py-1 rounded-md focus:border-2 focus:border-white"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search..." />
            <button type="submit" className="ml-4">🔍</button>
        </form>
    );
}