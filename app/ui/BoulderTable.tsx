import { Button } from "~/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router";
import { DataTable } from "./DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useMediaQuery } from "~/lib/hook/useMediaQuery";

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
      return <div className="whitespace-normal break-normal font-semibold">{row.original.boulder.name}</div>;
    },
  },
  {
    id: "grade",
    accessorFn: (row) => row.boulder.grade.value,
    header: ({ column }) => {
      const { isMobile } = useMediaQuery();
      return (
        <div className={`flex gap-1 md:gap-2 items-center ${isMobile && 'justify-center'}`}>
          {!isMobile && <span>Grade</span>}
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
      const { grade, slash_grade } = row.original.boulder;
      const { isMobile } = useMediaQuery();
      return (
        <div className={`italic ${isMobile && 'text-center'}`}>
          {slash_grade ? `${grade.value} / ${slash_grade.value}` : grade.value}
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
      row.original.boulder.rating ? `${row.original.boulder.rating} / 5` : "Not rated",
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
