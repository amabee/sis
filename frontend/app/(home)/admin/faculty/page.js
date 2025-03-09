"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Filter,
  RefreshCw,
  ArrowUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

// Mock data for faculty members
const mockFaculty = [
  {
    id: "FAC001",
    name: "Dr. Sarah Chen",
    email: "sarah.chen@example.com",
    department: "Computer Science",
    position: "Professor",
    employmentType: "Full-time",
    status: "Active",
    joinDate: "2020-08-15",
    specialization: "Artificial Intelligence",
  },
  {
    id: "FAC002",
    name: "Prof. Robert Garcia",
    email: "robert.garcia@example.com",
    department: "Business Administration",
    position: "Associate Professor",
    employmentType: "Full-time",
    status: "Active",
    joinDate: "2018-01-10",
    specialization: "Marketing Strategy",
  },
  {
    id: "FAC003",
    name: "Dr. Michelle Wong",
    email: "michelle.wong@example.com",
    department: "Psychology",
    position: "Assistant Professor",
    employmentType: "Part-time",
    status: "On Leave",
    joinDate: "2021-09-01",
    specialization: "Clinical Psychology",
  },
  {
    id: "FAC004",
    name: "Dr. James Wilson",
    email: "james.wilson@example.com",
    department: "Engineering",
    position: "Professor",
    employmentType: "Full-time",
    status: "Active",
    joinDate: "2015-08-15",
    specialization: "Electrical Engineering",
  },
  {
    id: "FAC005",
    name: "Dr. Priya Patel",
    email: "priya.patel@example.com",
    department: "Medicine",
    position: "Adjunct Professor",
    employmentType: "Part-time",
    status: "Inactive",
    joinDate: "2019-03-20",
    specialization: "Public Health",
  },
];

export default function ManageFacultyPage() {
  const [faculty, setFaculty] = useState(mockFaculty);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFacultyOpen, setIsAddFacultyOpen] = useState(false);
  const [isEditFacultyOpen, setIsEditFacultyOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [filterStatus, setFilterStatus] = useState("all");

  // New faculty form state
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    email: "",
    department: "",
    position: "Assistant Professor",
    employmentType: "Full-time",
    status: "Active",
    specialization: "",
  });

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted faculty
  const getSortedFaculty = () => {
    let sortableFaculty = [...faculty];

    // Apply filter
    if (filterStatus !== "all") {
      sortableFaculty = sortableFaculty.filter(
        (teacher) => teacher.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // Apply search
    if (searchTerm) {
      sortableFaculty = sortableFaculty.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sort
    if (sortConfig.key) {
      sortableFaculty.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableFaculty;
  };

  // Add new faculty
  const handleAddFaculty = (e) => {
    e?.preventDefault();

    // Form validation
    if (!newFaculty.name || !newFaculty.email || !newFaculty.department) {
      alert("Please fill in all required fields");
      return;
    }

    const newId = `FAC${String(faculty.length + 1).padStart(3, "0")}`;
    const today = new Date().toISOString().split("T")[0];

    setFaculty([
      ...faculty,
      {
        ...newFaculty,
        id: newId,
        joinDate: today,
      },
    ]);

    setNewFaculty({
      name: "",
      email: "",
      department: "",
      position: "Assistant Professor",
      employmentType: "Full-time",
      status: "Active",
      specialization: "",
    });

    setIsAddFacultyOpen(false);
  };

  // Update faculty
  const handleUpdateFaculty = (e) => {
    e?.preventDefault();

    if (!currentFaculty) return;

    // Form validation
    if (
      !currentFaculty.name ||
      !currentFaculty.email ||
      !currentFaculty.department
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setFaculty(
      faculty.map((teacher) =>
        teacher.id === currentFaculty.id ? currentFaculty : teacher
      )
    );

    setIsEditFacultyOpen(false);
  };

  // Delete faculty
  const handleDeleteFaculty = () => {
    if (!currentFaculty) return;

    setFaculty(faculty.filter((teacher) => teacher.id !== currentFaculty.id));
    setIsDeleteAlertOpen(false);
  };

  // Set up faculty for editing
  const editFaculty = (teacher) => {
    setCurrentFaculty({ ...teacher });
    setIsEditFacultyOpen(true);
  };

  // Set up faculty for deletion
  const deleteFaculty = (teacher) => {
    setCurrentFaculty(teacher);
    setIsDeleteAlertOpen(true);
  };

  const sortedFaculty = getSortedFaculty();

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

  // Employment type badge colors
  const getEmploymentTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "bg-blue-100 text-blue-800";
      case "part-time":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Common label style
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Manage Faculty</h1>
          <Dialog open={isAddFacultyOpen} onOpenChange={setIsAddFacultyOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Add New Faculty
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Faculty Member</DialogTitle>
                <DialogDescription>
                  Enter faculty details below. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddFaculty}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label htmlFor="name" className={labelStyle}>
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        placeholder="Dr. Full Name"
                        value={newFaculty.name}
                        onChange={(e) =>
                          setNewFaculty({ ...newFaculty, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="email" className={labelStyle}>
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        value={newFaculty.email}
                        onChange={(e) =>
                          setNewFaculty({
                            ...newFaculty,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="department" className={labelStyle}>
                        Department *
                      </label>
                      <Input
                        id="department"
                        placeholder="Department"
                        value={newFaculty.department}
                        onChange={(e) =>
                          setNewFaculty({
                            ...newFaculty,
                            department: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="position" className={labelStyle}>
                        Position
                      </label>
                      <Select
                        value={newFaculty.position}
                        onValueChange={(value) =>
                          setNewFaculty({ ...newFaculty, position: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Professor">Professor</SelectItem>
                          <SelectItem value="Associate Professor">
                            Associate Professor
                          </SelectItem>
                          <SelectItem value="Assistant Professor">
                            Assistant Professor
                          </SelectItem>
                          <SelectItem value="Adjunct Professor">
                            Adjunct Professor
                          </SelectItem>
                          <SelectItem value="Lecturer">Lecturer</SelectItem>
                          <SelectItem value="Instructor">Instructor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="employmentType" className={labelStyle}>
                        Employment Type
                      </label>
                      <Select
                        value={newFaculty.employmentType}
                        onValueChange={(value) =>
                          setNewFaculty({
                            ...newFaculty,
                            employmentType: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="specialization" className={labelStyle}>
                        Specialization
                      </label>
                      <Input
                        id="specialization"
                        placeholder="Area of specialization"
                        value={newFaculty.specialization}
                        onChange={(e) =>
                          setNewFaculty({
                            ...newFaculty,
                            specialization: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="status" className={labelStyle}>
                        Status
                      </label>
                      <Select
                        value={newFaculty.status}
                        onValueChange={(value) =>
                          setNewFaculty({ ...newFaculty, status: value })
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
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddFacultyOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Save Faculty
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10"
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
              title="Reset filters"
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
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => requestSort("department")}
                  >
                    <div className="flex items-center">
                      Department
                      <ArrowUpDown size={16} className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Employment</TableHead>
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
                {sortedFaculty.length > 0 ? (
                  sortedFaculty.map((teacher) => (
                    <TableRow
                      key={teacher.id}
                      className="group hover:bg-blue-50/50"
                    >
                      <TableCell className="font-medium">
                        {teacher.id}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{teacher.name}</div>
                        <div className="text-xs text-gray-500">
                          {teacher.specialization}
                        </div>
                      </TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>{teacher.position}</TableCell>
                      <TableCell>
                        <Badge
                          className={getEmploymentTypeColor(
                            teacher.employmentType
                          )}
                        >
                          {teacher.employmentType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(teacher.status)}>
                          {teacher.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-70 group-hover:opacity-100"
                            onClick={() => editFaculty(teacher)}
                            title="Edit faculty"
                          >
                            <Pencil size={16} className="text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-70 group-hover:opacity-100"
                            onClick={() => deleteFaculty(teacher)}
                            title="Delete faculty"
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
                      No faculty members found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Edit Faculty Dialog */}
      {currentFaculty && (
        <Dialog open={isEditFacultyOpen} onOpenChange={setIsEditFacultyOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Faculty Member</DialogTitle>
              <DialogDescription>
                Update faculty information. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdateFaculty}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="edit-name" className={labelStyle}>
                      Full Name *
                    </label>
                    <Input
                      id="edit-name"
                      placeholder="Dr. Full Name"
                      value={currentFaculty.name}
                      onChange={(e) =>
                        setCurrentFaculty({
                          ...currentFaculty,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="edit-email" className={labelStyle}>
                      Email Address *
                    </label>
                    <Input
                      id="edit-email"
                      type="email"
                      placeholder="Email Address"
                      value={currentFaculty.email}
                      onChange={(e) =>
                        setCurrentFaculty({
                          ...currentFaculty,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="edit-department" className={labelStyle}>
                      Department *
                    </label>
                    <Input
                      id="edit-department"
                      placeholder="Department"
                      value={currentFaculty.department}
                      onChange={(e) =>
                        setCurrentFaculty({
                          ...currentFaculty,
                          department: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-position" className={labelStyle}>
                      Position
                    </label>
                    <Select
                      value={currentFaculty.position}
                      onValueChange={(value) =>
                        setCurrentFaculty({
                          ...currentFaculty,
                          position: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Professor">Professor</SelectItem>
                        <SelectItem value="Associate Professor">
                          Associate Professor
                        </SelectItem>
                        <SelectItem value="Assistant Professor">
                          Assistant Professor
                        </SelectItem>
                        <SelectItem value="Adjunct Professor">
                          Adjunct Professor
                        </SelectItem>
                        <SelectItem value="Lecturer">Lecturer</SelectItem>
                        <SelectItem value="Instructor">Instructor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="edit-employmentType" className={labelStyle}>
                      Employment Type
                    </label>
                    <Select
                      value={currentFaculty.employmentType}
                      onValueChange={(value) =>
                        setCurrentFaculty({
                          ...currentFaculty,
                          employmentType: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="edit-specialization" className={labelStyle}>
                      Specialization
                    </label>
                    <Input
                      id="edit-specialization"
                      placeholder="Area of specialization"
                      value={currentFaculty.specialization}
                      onChange={(e) =>
                        setCurrentFaculty({
                          ...currentFaculty,
                          specialization: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="edit-status" className={labelStyle}>
                      Status
                    </label>
                    <Select
                      value={currentFaculty.status}
                      onValueChange={(value) =>
                        setCurrentFaculty({
                          ...currentFaculty,
                          status: value,
                        })
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
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditFacultyOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {currentFaculty?.name}'s record from
              the system. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteFaculty}
            >
              Delete Faculty
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
