import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { BoulderWithAscentCount } from "~/types/boulder";

export function BoulderTable({ items }: { items: BoulderWithAscentCount[] }) {
  const navigate = useNavigate();
  return (
    <DataTable
      columns={columns}
      data={items}
      onRowClick={(item) => item.id && navigate(`/boulders/${item.id}`)}
    />
  );
}

export const columns: ColumnDef<BoulderWithAscentCount>[] = [
  {
    accessorKey: "boulder.name",
    header: ({ column }) => {
      return (
        <div className="flex gap-1 md:gap-2 items-center">
          <span>Name</span>
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            size="mobileicon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="whitespace-normal break-normal font-semibold">
          {row.original.name || "N/A"}
        </div>
      );
    },
  },
  {
    id: "grade",
    accessorFn: (row) => row.grade.value,
    header: ({ column }) => {
      return (
        <div className="flex gap-1 md:gap-2 items-center md:justify-start justify-center">
          <span className="hidden md:inline">Grade</span>
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
            size="mobileicon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const grade = row.original.grade;
      const slash_grade = row.original.slash_grade;
      return (
        <div className="italic text-center md:text-left">
          {grade && slash_grade ? `${grade.value} / ${slash_grade.value}` : grade?.value || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "boulder.rating",
    header: ({ column }) => {
      return (
        <div className="flex gap-1 md:gap-2 items-center">
          <span>Rating</span>
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
            size="mobileicon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) =>
      row.original.rating ? `${row.original.rating} / 5` : "Not rated",
  },
  {
    accessorKey: "ascents",
    size: 20,
    header: ({ column }) => {
      return (
        <div className="flex gap-1 md:gap-2 items-center">
          <span>Ascents</span>
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
            size="mobileicon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
