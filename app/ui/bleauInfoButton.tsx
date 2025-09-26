import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function BleauInfoButton({ link }: { link: string }) {
  return (
    <Button asChild>
      <Link to={link}>Check on Bleau.Info</Link>
    </Button>
  );
}
