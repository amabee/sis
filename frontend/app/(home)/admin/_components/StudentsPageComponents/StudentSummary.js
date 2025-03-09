import { Badge } from "@/components/ui/badge";

export function StudentSummary({ allStudents, filteredStudents }) {
  const activeCount = allStudents.filter((s) => s.status === "Active").length;
  const onLeaveCount = allStudents.filter(
    (s) => s.status === "On Leave"
  ).length;
  const inactiveCount = allStudents.filter(
    (s) => s.status === "Inactive"
  ).length;

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-2">
      <div className="text-sm text-gray-500">
        Showing {filteredStudents.length} of {allStudents.length} students
      </div>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="outline" className="bg-green-50">
          Active: {activeCount}
        </Badge>
        <Badge variant="outline" className="bg-amber-50">
          On Leave: {onLeaveCount}
        </Badge>
        <Badge variant="outline" className="bg-red-50">
          Inactive: {inactiveCount}
        </Badge>
      </div>
    </div>
  );
}
