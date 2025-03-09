import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageHeader({ onAddClick }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Manage Students</h1>
      <Button className="bg-blue-600 hover:bg-blue-700" onClick={onAddClick}>
        <Plus className="mr-2 h-4 w-4" /> Add New Student
      </Button>
    </div>
  );
}

