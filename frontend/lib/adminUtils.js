export const getStatusColor = (status) => {
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

export const getSortedAndFilteredStudents = (
  students,
  searchTerm,
  filterStatus,
  sortConfig
) => {
  let sortableStudents = [...students];

  if (filterStatus !== "all") {
    sortableStudents = sortableStudents.filter(
      (student) => student.status.toLowerCase() === filterStatus.toLowerCase()
    );
  }

  if (searchTerm) {
    sortableStudents = sortableStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

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

export const generateStudentId = (students) => {
  return `STU${String(students.length + 1).padStart(3, "0")}`;
};

export const getTodayISOString = () => {
  return new Date().toISOString().split("T")[0];
};
