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
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const AddSchoolYearDialog = ({ onAddSchoolYear }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    yearName: "",
    startDate: "",
    endDate: "",
    terms: "2",
    isActive: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (checked) => {
    setFormData({ ...formData, isActive: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate year name if not provided
    let yearName = formData.yearName;
    if (!yearName && formData.startDate && formData.endDate) {
      const startYear = new Date(formData.startDate).getFullYear();
      const endYear = new Date(formData.endDate).getFullYear();
      yearName = `${startYear}-${endYear}`;
    }

    // Create new school year object
    const newSchoolYear = {
      id: Math.random().toString(36).substring(2, 9),
      yearName: yearName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      terms: parseInt(formData.terms),
      isActive: formData.isActive,
      createdAt: new Date().toISOString(),
    };

    onAddSchoolYear(newSchoolYear);
    setFormData({
      yearName: "",
      startDate: "",
      endDate: "",
      terms: "2",
      isActive: false,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New School Year
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New School Year</DialogTitle>
          <DialogDescription>
            Set up a new academic year with start and end dates.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="yearName">Year Name (Optional)</Label>
            <Input
              id="yearName"
              name="yearName"
              value={formData.yearName}
              onChange={handleInputChange}
              placeholder="e.g. 2025-2026"
            />
            <p className="text-sm text-muted-foreground">
              If left blank, will be generated from start and end dates
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="terms">Number of Terms</Label>
            <Select
              name="terms"
              value={formData.terms}
              onValueChange={(value) => handleSelectChange("terms", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 (Annual)</SelectItem>
                <SelectItem value="2">2 (Semesters)</SelectItem>
                <SelectItem value="3">3 (Trimesters)</SelectItem>
                <SelectItem value="4">4 (Quarters)</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* <div className="flex items-center justify-between">
            <Label htmlFor="isActive" className="cursor-pointer">
              Set as Active School Year
            </Label>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={handleSwitchChange}
            />
          </div> */}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create School Year</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSchoolYearDialog;
