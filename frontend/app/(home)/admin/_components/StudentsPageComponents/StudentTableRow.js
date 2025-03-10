import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";

export function StudentTableRow({ student, onEdit, onDelete }) {
  return (
    <TableRow key={student.id} className="group hover:bg-blue-50/50">
      <TableCell className="font-medium">{student.id}</TableCell>
      <TableCell>
        <div className="font-medium">{student.name}</div>
      </TableCell>
      <TableCell>{student.email}</TableCell>
      <TableCell>{student.educationAttainment}</TableCell>
      <TableCell>{student.level}</TableCell>
      <TableCell>{student.modality}</TableCell>
      <TableCell>
        <StatusBadge status={student.status} />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="opacity-70 group-hover:opacity-100"
            onClick={() => onEdit(student)}
            title="Edit student"
          >
            <Pencil size={16} className="text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-70 group-hover:opacity-100"
            onClick={() => onDelete(student)}
            title="Delete student"
          >
            <Trash2 size={16} className="text-red-600" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
