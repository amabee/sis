"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

const CreateClassDialog = ({
  onCreateClass,
  schoolYear,
  subjects = [],
  teachers = [],
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    className: "",
    subjectId: "",
    teacherId: "",
    roomNumber: "",
    schedule: "",
    maxStudents: "30",
    modality: "in-person",
    notes: "",
  });

  // Mock data for demo purposes if none provided
  const mockSubjects =
    subjects.length > 0
      ? subjects
      : [
          { id: "subj1", name: "Advanced Algebra", code: "MATH302" },
          { id: "subj2", name: "World History", code: "HIST201" },
          { id: "subj3", name: "Physics", code: "PHYS101" },
        ];

  const mockTeachers =
    teachers.length > 0
      ? teachers
      : [
          { id: "teach1", name: "Dr. Johnson" },
          { id: "teach2", name: "Ms. Martinez" },
          { id: "teach3", name: "Mr. Chen" },
        ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find the selected subject to include its name and code
    const selectedSubject = mockSubjects.find(
      (s) => s.id === formData.subjectId
    );
    const selectedTeacher = mockTeachers.find(
      (t) => t.id === formData.teacherId
    );

    // Create new class object
    const newClass = {
      id: Math.random().toString(36).substring(2, 9),
      ...formData,
      schoolYear,
      maxStudents: parseInt(formData.maxStudents) || 30,
      subjectName: selectedSubject?.name || "Unknown Subject",
      subjectCode: selectedSubject?.code || "N/A",
      teacherName: selectedTeacher?.name || "Unassigned",
      students: [],
      createdAt: new Date().toISOString(),
    };

    onCreateClass(newClass);
    setFormData({
      className: "",
      subjectId: "",
      teacherId: "",
      roomNumber: "",
      schedule: "",
      maxStudents: "30",
      modality: "in-person",
      notes: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Class</DialogTitle>
          <DialogDescription>
            Create a new class for the {schoolYear} school year.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="className">Class Name</Label>
              <Input
                id="className"
                name="className"
                value={formData.className}
                onChange={handleInputChange}
                placeholder="e.g. Algebra Section A"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subjectId">Subject</Label>
              <Select
                name="subjectId"
                value={formData.subjectId}
                onValueChange={(value) =>
                  handleSelectChange("subjectId", value)
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {mockSubjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name} ({subject.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teacherId">Teacher</Label>
              <Select
                name="teacherId"
                value={formData.teacherId}
                onValueChange={(value) =>
                  handleSelectChange("teacherId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Assign teacher" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input
                id="roomNumber"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleInputChange}
                placeholder="e.g. 101A"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Input
                id="schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleInputChange}
                placeholder="e.g. MWF 10:00-11:30AM"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxStudents">Maximum Students</Label>
              <Input
                id="maxStudents"
                name="maxStudents"
                type="number"
                min="1"
                max="100"
                value={formData.maxStudents}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modality">Class Modality</Label>
            <Select
              name="modality"
              value={formData.modality}
              onValueChange={(value) => handleSelectChange("modality", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select modality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-person">In-Person</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any additional information about this class"
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassDialog;
