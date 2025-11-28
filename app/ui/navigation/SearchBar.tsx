import { Search } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function SearchBar() {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current?.blur();
    if (text.trim()) {
      navigate(`/search?q=${encodeURIComponent(text)}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="placeholder:text-xs md:placeholder:text-sm placeholder:text-center md:placeholder:text-left placeholder:align-middle"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" size="icon">
          <Search />
        </Button>
      </div>
    </form>
  );
}
