import { StarRating } from "./StarRating";
import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";

export function BoulderTable({ items }: { items: BoulderItem[] }) {
  const navigate = useNavigate();
  return (
    <DataTable
      columns={columns}
      data={items}
      onRowClick={(item) => navigate(`/boulders/${item.boulder.id}`)}
    />
  );
}

type BoulderItem = {
  boulder: {
    id: string;
    name: string;
    grade: { value: string };
    slash_grade?: { value: string };
    rating: number;
  };
  ascents: number;
};

export const columns: ColumnDef<BoulderItem>[] = [
  {
    accessorKey: "boulder.name",
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
    cell: ({ row }) => row.original.boulder.name,
  },
  {
    id: "grade",
    accessorFn: (row) => row.boulder.grade.value,
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
      const { grade, slash_grade } = row.original.boulder;
      return slash_grade ? `${grade.value}/${slash_grade.value}` : grade.value;
    },
  },
  {
    accessorKey: "boulder.rating",
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
    cell: ({ row }) => <StarRating rating={row.original.boulder.rating} />,
  },
  {
    accessorKey: "ascents",
    header: ({ column }) => {
      return (
        <div className="flex gap-2 items-center">
          <span>Number of Ascents</span>
          <Button
            variant="sorting"
            onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
