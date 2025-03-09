import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { StudentTableHeader } from "./StudentTableHeader";
import { StudentTableRow } from "./StudentTableRow";
import { EmptyState } from "./EmptyState";

export function StudentTable({
  students,
  onSort,
  onEditStudent,
  onDeleteStudent,
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <StudentTableHeader onSort={onSort} />
          <TableBody>
            {students.length > 0 ? (
              students.map((student) => (
                <StudentTableRow
                  key={student.id}
                  student={student}
                  onEdit={onEditStudent}
                  onDelete={onDeleteStudent}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
