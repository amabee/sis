"use client";
import React, { useState } from "react";
import { Calendar, Eye, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const AttendanceManagement = () => {
  // State for school year and class
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [selectedClass, setSelectedClass] = useState("Class 9A");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fixed mock student data with predetermined attendance records
  const students = [
    {
      id: 1,
      name: "Emma Johnson",
      roll: "101",
      gender: "Female",
      attendance: {
        "2025-3-1": "present",
        "2025-3-2": "present",
        "2025-3-3": "present",
        "2025-3-4": "present",
        "2025-3-5": "absent",
        "2025-3-6": "present",
        "2025-3-7": "present",
        "2025-3-8": "late",
        "2025-3-9": "present",
      },
      stats: { present: 80, absent: 10, late: 10 },
    },
    {
      id: 2,
      name: "Liam Smith",
      roll: "102",
      gender: "Male",
      attendance: {
        "2025-3-1": "present",
        "2025-3-2": "present",
        "2025-3-3": "present",
        "2025-3-4": "present",
        "2025-3-5": "present",
        "2025-3-6": "present",
        "2025-3-7": "absent",
        "2025-3-8": "present",
        "2025-3-9": "late",
      },
      stats: { present: 90, absent: 5, late: 5 },
    },
    {
      id: 3,
      name: "Olivia Williams",
      roll: "103",
      gender: "Female",
      attendance: {
        "2025-3-1": "present",
        "2025-3-2": "absent",
        "2025-3-3": "present",
        "2025-3-4": "present",
        "2025-3-5": "absent",
        "2025-3-6": "present",
        "2025-3-7": "present",
        "2025-3-8": "late",
        "2025-3-9": "absent",
      },
      stats: { present: 75, absent: 20, late: 5 },
    },
    {
      id: 4,
      name: "Noah Brown",
      roll: "104",
      gender: "Male",
      attendance: {
        "2025-3-1": "present",
        "2025-3-2": "present",
        "2025-3-3": "late",
        "2025-3-4": "present",
        "2025-3-5": "present",
        "2025-3-6": "present",
        "2025-3-7": "absent",
        "2025-3-8": "present",
        "2025-3-9": "present",
      },
      stats: { present: 85, absent: 5, late: 10 },
    },
    {
      id: 5,
      name: "Ava Jones",
      roll: "105",
      gender: "Female",
      attendance: {
        "2025-3-1": "present",
        "2025-3-2": "present",
        "2025-3-3": "present",
        "2025-3-4": "present",
        "2025-3-5": "late",
        "2025-3-6": "present",
        "2025-3-7": "present",
        "2025-3-8": "present",
        "2025-3-9": "absent",
      },
      stats: { present: 95, absent: 2, late: 3 },
    },
    {
      id: 6,
      name: "Ethan Davis",
      roll: "106",
      gender: "Male",
      attendance: {
        "2025-3-1": "absent",
        "2025-3-2": "present",
        "2025-3-3": "late",
        "2025-3-4": "absent",
        "2025-3-5": "present",
        "2025-3-6": "late",
        "2025-3-7": "present",
        "2025-3-8": "present",
        "2025-3-9": "present",
      },
      stats: { present: 70, absent: 15, late: 15 },
    },
    {
      id: 7,
      name: "Sophia Miller",
      roll: "107",
      gender: "Female",
      attendance: {
        "2025-3-1": "present",
        "2025-3-2": "present",
        "2025-3-3": "present",
        "2025-3-4": "late",
        "2025-3-5": "present",
        "2025-3-6": "present",
        "2025-3-7": "absent",
        "2025-3-8": "present",
        "2025-3-9": "present",
      },
      stats: { present: 88, absent: 7, late: 5 },
    },
    {
      id: 8,
      name: "Jackson Wilson",
      roll: "108",
      gender: "Male",
      attendance: {
        "2025-3-1": "present",
        "2025-3-2": "present",
        "2025-3-3": "present",
        "2025-3-4": "present",
        "2025-3-5": "late",
        "2025-3-6": "present",
        "2025-3-7": "present",
        "2025-3-8": "absent",
        "2025-3-9": "present",
      },
      stats: { present: 92, absent: 3, late: 5 },
    },
    {
      id: 9,
      name: "Isabella Moore",
      roll: "109",
      gender: "Female",
      attendance: {
        "2025-3-1": "absent",
        "2025-3-2": "present",
        "2025-3-3": "late",
        "2025-3-4": "present",
        "2025-3-5": "present",
        "2025-3-6": "present",
        "2025-3-7": "absent",
        "2025-3-8": "late",
        "2025-3-9": "present",
      },
      stats: { present: 78, absent: 12, late: 10 },
    },
    {
      id: 10,
      name: "Lucas Taylor",
      roll: "110",
      gender: "Male",
      attendance: {
        "2025-3-1": "present",
        "2025-3-2": "late",
        "2025-3-3": "present",
        "2025-3-4": "present",
        "2025-3-5": "absent",
        "2025-3-6": "present",
        "2025-3-7": "present",
        "2025-3-8": "late",
        "2025-3-9": "present",
      },
      stats: { present: 83, absent: 10, late: 7 },
    },
  ];

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.roll.includes(searchQuery)
  );

  // Get status color for badges
  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-500";
      case "absent":
        return "bg-red-500";
      case "late":
        return "bg-yellow-500";
      default:
        return "bg-gray-300";
    }
  };

  // Open dialog with selected student
  const openStudentAttendance = (student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  // Generate calendar for the selected student
  const generateCalendar = () => {
    if (!selectedStudent) return null;

    // Use fixed month and year for consistent rendering
    const year = 2025;
    const month = 2; // March (0-indexed)
    const monthName = "March";

    // First day of month (0 = Sunday, 1 = Monday, etc.)
    // Hardcode this to avoid any Date inconsistencies
    const startingDay = 5; // March 1, 2025 is a Saturday, so we start with 5 empty cells

    // Days in month
    const daysInMonth = 31;

    // Create calendar grid
    const calendarDays = [];

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    return (
      <div>
        <div className="mb-4 text-lg font-medium">
          {monthName} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="p-2 font-bold text-sm">
              {day}
            </div>
          ))}

          {calendarDays.map((day, index) => {
            if (!day) return <div key={`empty-${index}`} className="p-2"></div>;

            const dateKey = `${year}-${month + 1}-${day}`;
            const status = selectedStudent.attendance[dateKey];
            const isWeekend = (index + 1) % 7 === 6 || (index + 1) % 7 === 0; // Sat or Sun
            const isToday = day === 9; // Let's assume today is March 9, 2025

            return (
              <div
                key={`day-${day}`}
                className={`p-2 border rounded-md ${
                  isWeekend
                    ? "bg-gray-100"
                    : isToday
                    ? "border-blue-500 border-2"
                    : ""
                }`}
              >
                <div>{day}</div>
                {status && !isWeekend && day <= 9 && (
                  <div
                    className={`mt-1 w-full h-2 rounded-full ${getStatusColor(
                      status
                    )}`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Present</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">Absent</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm">Late</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Calendar className="mr-2" size={24} />
                Attendance Management
              </CardTitle>
              <CardDescription>
                View and manage student attendance records
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024">2023-2024</SelectItem>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Class 9A">Class 9A</SelectItem>
                  <SelectItem value="Class 9B">Class 9B</SelectItem>
                  <SelectItem value="Class 10A">Class 10A</SelectItem>
                  <SelectItem value="Class 10B">Class 10B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Student List: {selectedClass}</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name or roll..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Present</TableHead>
                  <TableHead>Absent</TableHead>
                  <TableHead>Late</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.roll}
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">
                        {student.stats.present}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">
                        {student.stats.absent}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500">
                        {student.stats.late}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog
                        open={dialogOpen && selectedStudent?.id === student.id}
                        onOpenChange={setDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            onClick={() => openStudentAttendance(student)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>
                              Attendance Calendar: {student.name}
                            </DialogTitle>
                            <DialogDescription>
                              Roll: {student.roll} | Class: {selectedClass} |
                              School Year: {selectedYear}
                            </DialogDescription>
                          </DialogHeader>
                          {generateCalendar()}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceManagement;
