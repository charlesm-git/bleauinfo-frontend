import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Button } from "~/components/ui/button";

interface SliderButtonProps {
  data: Record<string, any>[];
  onDataChange: (newData: Record<string, any>[]) => void;
  buttonSize?: "sm" | "default" | "lg";
}

export default function SliderButton({
  data,
  onDataChange: setData,
  buttonSize = "lg",
}: SliderButtonProps) {
  const currentData = data;

  const slideData = (direction: "left" | "right") => {
    let newData: Record<string, any>[];

    if (direction === "right") {
      const last = currentData[currentData.length - 1];
      newData = [last, ...currentData.slice(0, -1)];
    } else {
      const [first, ...rest] = currentData;
      newData = [...rest, first];
    }

    setData(newData);
  };

  return (
    <div className="flex flex-1 justify-center gap-1 md:gap-3 lg:gap-8">
      <Button
        size={buttonSize}
        onClick={() => slideData("left")}
        disabled={currentData.length === 0}>
        <ArrowBigLeft />
      </Button>
      <Button
        size={buttonSize}
        onClick={() => slideData("right")}
        disabled={currentData.length === 0}>
        <ArrowBigRight />
      </Button>
    </div>
  );
}