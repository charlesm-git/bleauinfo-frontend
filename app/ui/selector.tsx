import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "~/components/ui/select";

export function GradeSelector({ onValueChange }: { onValueChange: (newData: string) => void }) {
  const GRADES = [
    "All",
    "9a",
    "8c+",
    "8c",
    "8b+",
    "8b",
    "8a+",
    "8a",
    "7c+",
    "7c",
    "7b+",
    "7b",
    "7a+",
    "7a",
    "6c+",
    "6c",
    "6b+",
    "6b",
    "6a+",
    "6a",
    "5+",
    "5",
    "5-",
    "4+",
    "4",
    "4-",
    "3+",
    "3",
    "3-",
    "2+",
    "2",
    "2-",
    "1+",
    "1",
  ];
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Grade" />
      </SelectTrigger>
      <SelectContent>
        {GRADES.map((grade) => (
          <SelectItem value={grade}>{grade}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
