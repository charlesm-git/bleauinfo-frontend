import { Button } from "~/components/ui/button";

export function BleauInfoButton({ link }: { link: string }) {
  return (
    <Button asChild>
      <a href={link} target="_blank" rel="noopener noreferrer">Check on Bleau.Info</a>
    </Button>
  );
}
