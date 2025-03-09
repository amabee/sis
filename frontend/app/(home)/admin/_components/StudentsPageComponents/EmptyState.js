import { TableCell, TableRow } from "@/components/ui/table";

export function EmptyState() {
  return (
    <TableRow>
      <TableCell colSpan={8} className="h-24 text-center">
        No students found.
      </TableCell>
    </TableRow>
  );
}
