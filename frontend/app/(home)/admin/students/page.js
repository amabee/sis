"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Filter,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock data for students
const mockStudents = [
  {
    id: "STU001",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    program: "Computer Science",
    level: "Undergraduate",
    modality: "Face to Face",
    status: "Active",
    enrollmentDate: "2023-09-01",
  },
  {
    id: "STU002",
    name: "Maya Rodriguez",
    email: "maya.rodriguez@example.com",
    program: "Business Administration",
    level: "Graduate",
    modality: "Modular",
    status: "Active",
    enrollmentDate: "2023-09-01",
  },
  {
    id: "STU003",
    name: "Tyler Zhang",
    email: "tyler.zhang@example.com",
    program: "Environmental Science",
    level: "Undergraduate",
    modality: "Blended",
    status: "On Leave",
    enrollmentDate: "2022-09-01",
  },
  {
    id: "STU004",
    name: "Sophia Williams",
    email: "sophia.williams@example.com",
    program: "Psychology",
    level: "Undergraduate",
    modality: "Face to Face",
    status: "Active",
    enrollmentDate: "2023-01-15",
  },
  {
    id: "STU005",
    name: "Ethan Patel",
    email: "ethan.patel@example.com",
    program: "Mechanical Engineering",
    level: "Graduate",
    modality: "Blended",
    status: "Inactive",
    enrollmentDate: "2022-01-15",
  },
];

export default function ManageStudentsPage() {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isEditStudentOpen, setIsEditStudentOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [filterStatus, setFilterStatus] = useState("all");

  // New student form state
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    program: "",
    level: "Undergraduate",
    modality: "Face to Face",
    status: "Active",
  });

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted students
  const getSortedStudents = () => {
    let sortableStudents = [...students];

    // Apply filter
    if (filterStatus !== "all") {
      sortableStudents = sortableStudents.filter(
        (student) => student.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // Apply search
    if (searchTerm) {
      sortableStudents = sortableStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sort
    if (sortConfig.key) {
      sortableStudents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableStudents;
  };

  // Add new student
  const handleAddStudent = () => {
    const newId = `STU${String(students.length + 1).padStart(3, "0")}`;
    const today = new Date().toISOString().split("T")[0];

    setStudents([
      ...students,
      {
        ...newStudent,
        id: newId,
        enrollmentDate: today,
      },
    ]);

    setNewStudent({
      name: "",
      email: "",
      program: "",
      level: "Undergraduate",
      modality: "Face to Face",
      status: "Active",
    });

    setIsAddStudentOpen(false);
  };

  // Update student
  const handleUpdateStudent = () => {
    if (!currentStudent) return;

    setStudents(
      students.map((student) =>
        student.id === currentStudent.id ? currentStudent : student
      )
    );

    setIsEditStudentOpen(false);
  };

  // Delete student
  const handleDeleteStudent = () => {
    if (!currentStudent) return;

    setStudents(students.filter((student) => student.id !== currentStudent.id));
    setIsDeleteAlertOpen(false);
  };

  // Set up student for editing
  const editStudent = (student) => {
    setCurrentStudent({ ...student });
    setIsEditStudentOpen(true);
  };

  // Set up student for deletion
  const deleteStudent = (student) => {
    setCurrentStudent(student);
    setIsDeleteAlertOpen(true);
  };

  const sortedStudents = getSortedStudents();

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "on leave":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Manage Students</h1>
          <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Add New Student
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter student details below. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <FormLabel htmlFor="name">Full Name</FormLabel>
                    <Input
                      id="name"
                      placeholder="Full Name"
                      value={newStudent.name}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      value={newStudent.email}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <FormLabel htmlFor="program">Program</FormLabel>
                    <Input
                      id="program"
                      placeholder="Program"
                      value={newStudent.program}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          program: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <FormLabel htmlFor="level">Program Level</FormLabel>
                    <Select
                      value={newStudent.level}
                      onValueChange={(value) =>
                        setNewStudent({ ...newStudent, level: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Undergraduate">
                          Undergraduate
                        </SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FormLabel htmlFor="modality">Modality</FormLabel>
                    <Select
                      value={newStudent.modality}
                      onValueChange={(value) =>
                        setNewStudent({ ...newStudent, modality: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select modality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Face to Face">
                          Face to Face
                        </SelectItem>
                        <SelectItem value="Modular">Modular</SelectItem>
                        <SelectItem value="Blended">Blended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <FormLabel htmlFor="status">Status</FormLabel>
                    <Select
                      value={newStudent.status}
                      onValueChange={(value) =>
                        setNewStudent({ ...newStudent, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddStudentOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddStudent}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Save Student
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="w-full md:w-64">
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              icon={Search}
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <span>Filter: {filterStatus}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on leave">On Leave</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
                setSortConfig({ key: "name", direction: "asc" });
              }}
            >
              <RefreshCw size={16} />
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-50">
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center">
                      Name
                      <ArrowUpDown size={16} className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Modality</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => requestSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown size={16} className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStudents.length > 0 ? (
                  sortedStudents.map((student) => (
                    <TableRow
                      key={student.id}
                      className="group hover:bg-blue-50/50"
                    >
                      <TableCell className="font-medium">
                        {student.id}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{student.name}</div>
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.program}</TableCell>
                      <TableCell>{student.level}</TableCell>
                      <TableCell>{student.modality}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-70 group-hover:opacity-100"
                            onClick={() => editStudent(student)}
                          >
                            <Pencil size={16} className="text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-70 group-hover:opacity-100"
                            onClick={() => deleteStudent(student)}
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No students found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Student count summary */}
        <div className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {sortedStudents.length} of {students.length} students
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50">
              Active: {students.filter((s) => s.status === "Active").length}
            </Badge>
            <Badge variant="outline" className="bg-amber-50">
              On Leave: {students.filter((s) => s.status === "On Leave").length}
            </Badge>
            <Badge variant="outline" className="bg-red-50">
              Inactive: {students.filter((s) => s.status === "Inactive").length}
            </Badge>
          </div>
        </div>
      </div>

      {/* Edit Student Dialog */}
      {currentStudent && (
        <Dialog open={isEditStudentOpen} onOpenChange={setIsEditStudentOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>
                Update student information. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <FormLabel htmlFor="edit-name">Full Name</FormLabel>
                  <Input
                    id="edit-name"
                    placeholder="Full Name"
                    value={currentStudent.name}
                    onChange={(e) =>
                      setCurrentStudent({
                        ...currentStudent,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-2">
                  <FormLabel htmlFor="edit-email">Email Address</FormLabel>
                  <Input
                    id="edit-email"
                    type="email"
                    placeholder="Email Address"
                    value={currentStudent.email}
                    onChange={(e) =>
                      setCurrentStudent({
                        ...currentStudent,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-span-2">
                  <FormLabel htmlFor="edit-program">Program</FormLabel>
                  <Input
                    id="edit-program"
                    placeholder="Program"
                    value={currentStudent.program}
                    onChange={(e) =>
                      setCurrentStudent({
                        ...currentStudent,
                        program: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <FormLabel htmlFor="edit-level">Program Level</FormLabel>
                  <Select
                    value={currentStudent.level}
                    onValueChange={(value) =>
                      setCurrentStudent({ ...currentStudent, level: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Undergraduate">
                        Undergraduate
                      </SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <FormLabel htmlFor="edit-modality">Modality</FormLabel>
                  <Select
                    value={currentStudent.modality}
                    onValueChange={(value) =>
                      setCurrentStudent({ ...currentStudent, modality: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select modality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Face to Face">Face to Face</SelectItem>
                      <SelectItem value="Modular">Modular</SelectItem>
                      <SelectItem value="Blended">Blended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <FormLabel htmlFor="edit-status">Status</FormLabel>
                  <Select
                    value={currentStudent.status}
                    onValueChange={(value) =>
                      setCurrentStudent({ ...currentStudent, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditStudentOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateStudent}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {currentStudent?.name}'s record from
              the system. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteStudent}
            >
              Delete Student
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
