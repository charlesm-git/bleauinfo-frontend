import { Button } from "~/components/ui/button";

export function BleauInfoButton({ link }: { link: string }) {
  return (
    <Button asChild className="text-xs md:text-sm px-3 py-1 md:px-4 md:py-2" size="sm">
      <a href={link} target="_blank" rel="noopener noreferrer">Check on Bleau.Info</a>
    </Button>
  );
}
