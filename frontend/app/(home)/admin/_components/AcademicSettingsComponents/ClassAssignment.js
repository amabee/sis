"use client";
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, UserPlus, Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ClassAssignment = ({ schoolYear }) => {
  const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);

  // Mock data for classes
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Math 101 - Section A",
      subject: "Basic Mathematics",
      teacher: "John Doe",
      modality: "Face to Face",
      students: 24,
    },
    {
      id: 2,
      name: "English 201 - Morning",
      subject: "English Literature",
      teacher: "Jane Smith",
      modality: "Blended",
      students: 18,
    },
    {
      id: 3,
      name: "Science 301 - Lab Group",
      subject: "General Science",
      teacher: "Patricia Brown",
      modality: "Modular",
      students: 12,
    },
    {
      id: 4,
      name: "History 101 - Afternoon",
      subject: "World History",
      teacher: "Maria Garcia",
      modality: "Face to Face",
      students: 30,
    },
  ]);

  // Mock data for subjects and teachers
  const subjects = [
    {
      id: 1,
      name: "Basic Mathematics",
      teachers: ["John Doe", "James Wilson"],
    },
    {
      id: 2,
      name: "English Literature",
      teachers: ["Jane Smith", "Robert Johnson"],
    },
    {
      id: 3,
      name: "General Science",
      teachers: ["Patricia Brown", "Michael Davis"],
    },
    {
      id: 4,
      name: "World History",
      teachers: ["Maria Garcia", "Elizabeth Miller"],
    },
  ];

  // Mock students
  const allStudents = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "Diana Prince",
    "Edward Norton",
    "Fiona Apple",
    "George Lucas",
    "Hannah Montana",
    "Ian McKellen",
    "Julia Roberts",
    "Kevin Hart",
    "Lisa Simpson",
    "Mike Tyson",
    "Nancy Drew",
    "Oscar Wilde",
    "Penny Lane",
    "Quincy Jones",
    "Rachel Green",
    "Steve Rogers",
    "Tina Turner",
  ];

  // Assign random students to each class
  const [selectedStudents, setSelectedStudents] = useState(
    allStudents.slice(0, 5)
  );

  const handleEditClass = (classItem) => {
    setCurrentClass(classItem);
    setIsClassDialogOpen(true);
  };

  const handleStudentAssignment = (classItem) => {
    setCurrentClass(classItem);
    setIsStudentDialogOpen(true);
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  const getModalityBadge = (modality) => {
    const variants = {
      "Face to Face": "default",
      Modular: "outline",
      Blended: "secondary",
    };

    return <Badge variant={variants[modality] || "default"}>{modality}</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Input placeholder="Search classes..." className="max-w-sm" />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Modality</TableHead>
              <TableHead>Students</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell className="font-medium">{classItem.name}</TableCell>
                <TableCell>{classItem.subject}</TableCell>
                <TableCell>{classItem.teacher}</TableCell>
                <TableCell>{getModalityBadge(classItem.modality)}</TableCell>
                <TableCell>{classItem.students}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleStudentAssignment(classItem)}
                    >
                      <Users className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditClass(classItem)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteClass(classItem.id)}
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

      {/* Edit/Create Class Dialog */}
      <Dialog open={isClassDialogOpen} onOpenChange={setIsClassDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentClass ? "Edit Class" : "Create New Class"}
            </DialogTitle>
            <DialogDescription>
              {currentClass ? "Update class details" : "Set up a new class"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="className"
                className="text-right text-sm font-medium"
              >
                Class Name
              </label>
              <Input
                id="className"
                defaultValue={currentClass?.name || ""}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="subject"
                className="text-right text-sm font-medium"
              >
                Subject
              </label>
              <div className="col-span-3">
                <Select defaultValue={currentClass?.subject || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.name}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="teacher"
                className="text-right text-sm font-medium"
              >
                Teacher
              </label>
              <div className="col-span-3">
                <Select defaultValue={currentClass?.teacher || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects
                      .find(
                        (s) =>
                          s.name === (currentClass?.subject || subjects[0].name)
                      )
                      ?.teachers.map((teacher, idx) => (
                        <SelectItem key={idx} value={teacher}>
                          {teacher}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <label className="text-right text-sm font-medium pt-2">
                Modality
              </label>
              <div className="col-span-3">
                <RadioGroup
                  defaultValue={currentClass?.modality || "Face to Face"}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Face to Face" id="face-to-face" />
                    <Label htmlFor="face-to-face">Face to Face</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Modular" id="modular" />
                    <Label htmlFor="modular">Modular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Blended" id="blended" />
                    <Label htmlFor="blended">Blended</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsClassDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button">Save Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Students Dialog */}
      <Dialog open={isStudentDialogOpen} onOpenChange={setIsStudentDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Students</DialogTitle>
            <DialogDescription>
              {currentClass
                ? `Assign students to ${currentClass.name}`
                : "Select students to assign to class"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Available Students</h3>
              <Input placeholder="Search students..." className="max-w-xs" />
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {allStudents.map((student, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <span>{student}</span>
                      {selectedStudents.includes(student) ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedStudents(
                              selectedStudents.filter((s) => s !== student)
                            );
                          }}
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedStudents([...selectedStudents, student]);
                          }}
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">
                Selected Students ({selectedStudents.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedStudents.map((student, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="flex items-center"
                  >
                    {student}
                    <button
                      className="ml-1 rounded-full bg-muted-foreground/20 p-1 hover:bg-muted-foreground/30"
                      onClick={() => {
                        setSelectedStudents(
                          selectedStudents.filter((s) => s !== student)
                        );
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedStudents.length === 0 && (
                  <span className="text-muted-foreground italic">
                    No students selected
                  </span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsStudentDialogOpen(false)}
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

export default ClassAssignment;
