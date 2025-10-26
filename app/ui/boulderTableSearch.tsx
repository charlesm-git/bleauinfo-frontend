import { StarRating } from "./starRating";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router";
import { DataTable } from "./dataTable";
import { ColumnDef } from "@tanstack/react-table";

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
    header: ({ column }) => {
      return (
        <div className="flex gap-2 items-center">
          <span>Name</span>
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => row.original.name,
  },
  {
    id: "area",
    accessorFn: (row) => row.area.name,
    header: ({ column }) => {
      return (
        <div className="flex gap-2 items-center">
          <span>Area</span>
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => row.original.area.name,
  },
  {
    id: "grade",
    accessorFn: (row) => row.grade.value,
    header: ({ column }) => {
      return (
        <div className="flex gap-2 items-center">
          <span>Grade</span>
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return row.original.slash_grade
        ? `${row.original.grade.value}/${row.original.slash_grade.value}`
        : row.original.grade.value;
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <div className="flex gap-2 items-center">
          <span>Rating</span>
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <StarRating rating={row.original.rating} />,
  },
];
