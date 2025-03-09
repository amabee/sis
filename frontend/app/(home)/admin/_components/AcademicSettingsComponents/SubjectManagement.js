import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SubjectManagement = ({ schoolYear }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTeacherDialogOpen, setIsTeacherDialogOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);

  // Mock data for subjects
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      code: "MATH101",
      name: "Basic Mathematics",
      description: "Fundamental math concepts",
      teachers: ["John Doe"],
    },
    {
      id: 2,
      code: "ENG201",
      name: "English Literature",
      description: "Study of literary works",
      teachers: ["Jane Smith", "Robert Johnson"],
    },
    {
      id: 3,
      code: "SCI301",
      name: "General Science",
      description: "Introduction to scientific principles",
      teachers: [],
    },
    {
      id: 4,
      code: "HIS101",
      name: "World History",
      description: "Overview of global historical events",
      teachers: ["Maria Garcia"],
    },
  ]);

  // Mock data for teachers
  const availableTeachers = [
    "John Doe",
    "Jane Smith",
    "Robert Johnson",
    "Maria Garcia",
    "James Wilson",
    "Patricia Brown",
    "Michael Davis",
    "Elizabeth Miller",
  ];

  const handleEditSubject = (subject) => {
    setCurrentSubject(subject);
    setIsDialogOpen(true);
  };

  const handleTeacherAssignment = (subject) => {
    setCurrentSubject(subject);
    setIsTeacherDialogOpen(true);
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Input placeholder="Search subjects..." className="max-w-sm" />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject Code</TableHead>
              <TableHead>Subject Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Assigned Teachers</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.code}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.description}</TableCell>
                <TableCell>
                  {subject.teachers.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {subject.teachers.map((teacher, idx) => (
                        <Badge key={idx} variant="secondary">
                          {teacher}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground italic">
                      No teachers assigned
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleTeacherAssignment(subject)}
                    >
                      <UserPlus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditSubject(subject)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteSubject(subject.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Subject Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentSubject ? "Edit Subject" : "Add New Subject"}
            </DialogTitle>
            <DialogDescription>
              {currentSubject
                ? "Update subject details"
                : "Create a new subject"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="code" className="text-right text-sm font-medium">
                Code
              </label>
              <Input
                id="code"
                defaultValue={currentSubject?.code || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                defaultValue={currentSubject?.name || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="description"
                className="text-right text-sm font-medium"
              >
                Description
              </label>
              <Input
                id="description"
                defaultValue={currentSubject?.description || ""}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Teachers Dialog */}
      <Dialog open={isTeacherDialogOpen} onOpenChange={setIsTeacherDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Teachers</DialogTitle>
            <DialogDescription>
              {currentSubject
                ? `Assign teachers to ${currentSubject.name}`
                : "Select teachers to assign"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Teachers</label>
              <div className="flex flex-wrap gap-2">
                {currentSubject?.teachers.map((teacher, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {teacher}
                    <button className="ml-1 rounded-full bg-muted-foreground/20 p-1 hover:bg-muted-foreground/30">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {!currentSubject?.teachers.length && (
                  <span className="text-muted-foreground italic">
                    No teachers assigned
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Add Teacher</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {availableTeachers
                    .filter(
                      (teacher) => !currentSubject?.teachers.includes(teacher)
                    )
                    .map((teacher, idx) => (
                      <SelectItem key={idx} value={teacher}>
                        {teacher}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button className="mt-2 w-full">Add Selected Teacher</Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsTeacherDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button">Save Assignments</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubjectManagement;
