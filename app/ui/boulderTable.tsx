import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { StarRating } from "./starRating";
import { useNavigate } from "react-router";

export function BoulderTable({ items }: { items: Record<string, any> }) {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Number of Ascents</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item: Record<string, any>) => (
          <TableRow
            onClick={() => navigate(`/boulders/${item.boulder.id}`)}
            className="cursor-pointer"
            key={item.boulder.id}>
            <TableCell>{item.boulder.name}</TableCell>
            <TableCell>
              {item.boulder.slash_grade
                ? `${item.boulder.grade.value}/${item.boulder.slash_grade.value}`
                : `${item.boulder.grade.value}`}
            </TableCell>
            <TableCell>
              <StarRating rating={item.boulder.rating} />
            </TableCell>
            <TableCell>{item.ascents}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function BoulderTableSearch({ boulders }: { boulders: Record<string, any> }) {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Area</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {boulders.map((boulder: Record<string, any>) => (
          <TableRow
            onClick={() => navigate(`/boulders/${boulder.id}`)}
            className="cursor-pointer"
            key={boulder.id}>
            <TableCell>{boulder.name}</TableCell>
            <TableCell>{boulder.area.name}</TableCell>
            <TableCell>
              {boulder.slash_grade
                ? `${boulder.grade.value}/${boulder.slash_grade.value}`
                : `${boulder.grade.value}`}
            </TableCell>
            <TableCell>
              <StarRating rating={boulder.rating} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
