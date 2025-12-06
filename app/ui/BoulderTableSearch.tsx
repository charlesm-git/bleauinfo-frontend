import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useMediaQuery } from "~/lib/hook/useMediaQuery";

export function BoulderTableSearch({ boulders }: { boulders: BoulderItem[] }) {
  const navigate = useNavigate();
  return (
    <DataTable
      columns={columns}
      data={boulders}
      onRowClick={(boulder) => navigate(`/boulders/${boulder.id}`)}
    />
  );
}

type BoulderItem = {
  id: string;
  name: string;
  grade: { value: string };
  area: { name: string };
  slash_grade?: { value: string };
  rating: number;
};

export const columns: ColumnDef<BoulderItem>[] = [
  {
    accessorKey: "name",
    size: 300,
    header: ({ column }) => {
      return (
        <div className="flex gap-1 md:gap-2 items-center">
          <span>Name</span>
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            size="mobileicon">
            <ArrowUpDown className="h-2 w-2 md:h-4 md:w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-normal break-normal font-semibold">{row.original.name}</div>
      );
    },
  },
  {
    id: "area",
    accessorFn: (row) => row.area.name,
    header: ({ column }) => {
      return (
        <div className="flex gap-1 md:gap-1 md:gap-2 items-center">
          <span>Area</span>
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            size="mobileicon">
            <ArrowUpDown className="h-2 w-2 md:h-4 md:w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="whitespace-normal break-normal">{row.original.area.name}</div>;
    },
  },
  {
    id: "grade",
    accessorFn: (row) => row.grade.value,
    header: ({ column }) => {
      const { isMobile } = useMediaQuery();
      return (
        <div className={`flex gap-1 md:gap-2 items-center ${isMobile && 'justify-center'}`}>
          {!isMobile && <span>Grade</span>}
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
            size="mobileicon">
            <ArrowUpDown className="h-2 w-2 md:h-4 md:w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const { isMobile } = useMediaQuery();
      return (
        <div className={`italic ${isMobile && 'text-center'}`}>
          {row.original.slash_grade
            ? `${row.original.grade.value} / ${row.original.slash_grade.value}`
            : row.original.grade.value}
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <div className="flex gap-1 md:gap-2 items-center">
          <span>Rating</span>
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
            size="mobileicon">
            <ArrowUpDown className="h-2 w-2 md:h-4 md:w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (row.original.rating ? `${row.original.rating} / 5` : "Not rated"),
  },
];
