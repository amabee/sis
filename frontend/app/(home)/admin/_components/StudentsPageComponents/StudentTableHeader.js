import { ArrowUpDown } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function StudentTableHeader({ onSort }) {
  return (
    <TableHeader>
      <TableRow className="hover:bg-gray-50">
        <TableHead className="w-[80px]">ID</TableHead>
        <TableHead className="cursor-pointer" onClick={() => onSort("name")}>
          <div className="flex items-center">
            Name
            <ArrowUpDown size={16} className="ml-1 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Program</TableHead>
        <TableHead>Level</TableHead>
        <TableHead>Modality</TableHead>
        <TableHead className="cursor-pointer" onClick={() => onSort("status")}>
          <div className="flex items-center">
            Status
            <ArrowUpDown size={16} className="ml-1 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
