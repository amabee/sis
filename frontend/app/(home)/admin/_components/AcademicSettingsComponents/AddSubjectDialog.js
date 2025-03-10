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

const AddSubjectDialog = ({ onAddSubject, schoolYear }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    department: "",
    creditHours: "",
    isRequired: "false",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new subject object
    const newSubject = {
      id: Math.random().toString(36).substring(2, 9),
      ...formData,
      schoolYear,
      creditHours: parseInt(formData.creditHours) || 0,
      isRequired: formData.isRequired === "true",
      createdAt: new Date().toISOString(),
    };

    onAddSubject(newSubject);
    setFormData({
      name: "",
      code: "",
      description: "",
      department: "",
      creditHours: "",
      isRequired: "false",
    });
    setOpen(false);
  };

  const departments = [
    "Mathematics",
    "Science",
    "Language Arts",
    "Social Studies",
    "Fine Arts",
    "Physical Education",
    "Technology",
    "Foreign Languages",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Subject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
          <DialogDescription>
            Create a new subject for the {schoolYear} school year.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Advanced Algebra"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Subject Code</Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="e.g. MATH302"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide a brief description of this subject"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                name="department"
                value={formData.department}
                onValueChange={(value) =>
                  handleSelectChange("department", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditHours">Credit Hours</Label>
              <Input
                id="creditHours"
                name="creditHours"
                type="number"
                min="0"
                max="10"
                value={formData.creditHours}
                onChange={handleInputChange}
                placeholder="e.g. 3"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="isRequired">Required Subject</Label>
            <Select
              name="isRequired"
              value={formData.isRequired}
              onValueChange={(value) => handleSelectChange("isRequired", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Is this subject required?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes, required</SelectItem>
                <SelectItem value="false">No, elective</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Subject</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubjectDialog;
