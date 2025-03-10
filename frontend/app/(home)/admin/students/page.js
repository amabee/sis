"use client";

import { useState } from "react";
import { PageHeader } from "../_components/StudentsPageComponents/PageHeader";
import { SearchAndFilterBar } from "../_components/StudentsPageComponents/SearchAndFilter";
import { StudentTable } from "../_components/StudentsPageComponents/StudentTable";
import { AddStudentDialog } from "../_components/StudentsPageComponents/AddStudentDialog";
import { EditStudentDialog } from "../_components/StudentsPageComponents/EditStudentDialog";
import { DeleteConfirmationDialog } from "../_components/StudentsPageComponents/DeleteConfirmationDialog";
import { StudentSummary } from "../_components/StudentsPageComponents/StudentSummary";
import {
  getSortedAndFilteredStudents,
  generateStudentId,
  getTodayISOString,
} from "@/lib/adminUtils";

const mockStudents = [
  {
    id: "STU001",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    educationAttainment: "Computer Science",
    level: "Undergraduate",
    modality: "Face to Face",
    status: "Active",
    enrollmentDate: "2023-09-01",
  },
  // ... other students
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

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    educationAttainment: "",
    level: "elementary",
    modality: "Face to Face",
    status: "Active",
    lrn: "",
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleAddStudent = (e) => {
    e?.preventDefault();

    if (
      !newStudent.name ||
      !newStudent.email ||
      !newStudent.educationAttainment ||
      !newStudent.lrn
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setStudents([
      ...students,
      {
        ...newStudent,
        id: generateStudentId(students),
        enrollmentDate: getTodayISOString(),
      },
    ]);

    setNewStudent({
      name: "",
      email: "",
      educationAttainment: "",
      level: "elementary",
      modality: "Face to Face",
      status: "Active",
      lrn: "",
    });

    setIsAddStudentOpen(false);
  };

  // Update student
  const handleUpdateStudent = (e) => {
    e?.preventDefault();

    if (!currentStudent) return;

    // Form validation
    if (
      !currentStudent.name ||
      !currentStudent.email ||
      !currentStudent.educationAttainment
    ) {
      alert("Please fill in all required fields");
      return;
    }

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

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setSortConfig({ key: "name", direction: "asc" });
  };

  const sortedStudents = getSortedAndFilteredStudents(
    students,
    searchTerm,
    filterStatus,
    sortConfig
  );

  return (
    <>
      <div className="space-y-6">
        <PageHeader onAddClick={() => setIsAddStudentOpen(true)} />

        <SearchAndFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          onReset={resetFilters}
        />

        <StudentTable
          students={sortedStudents}
          onSort={requestSort}
          onEditStudent={editStudent}
          onDeleteStudent={deleteStudent}
        />

        <StudentSummary
          allStudents={students}
          filteredStudents={sortedStudents}
        />
      </div>

      <AddStudentDialog
        isOpen={isAddStudentOpen}
        onOpenChange={setIsAddStudentOpen}
        student={newStudent}
        onStudentChange={setNewStudent}
        onSave={handleAddStudent}
      />

      {currentStudent && (
        <>
          <EditStudentDialog
            isOpen={isEditStudentOpen}
            onOpenChange={setIsEditStudentOpen}
            student={currentStudent}
            onStudentChange={setCurrentStudent}
            onSave={handleUpdateStudent}
          />

          <DeleteConfirmationDialog
            isOpen={isDeleteAlertOpen}
            onOpenChange={setIsDeleteAlertOpen}
            student={currentStudent}
            onConfirmDelete={handleDeleteStudent}
          />
        </>
      )}
    </>
  );
}
