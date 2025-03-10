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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Pencil, Calendar, Lock, Unlock, AlertCircle } from "lucide-react";
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

const SchoolYearManagement = ({ selectedYear, setSelectedYear }) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCloseAlertOpen, setIsCloseAlertOpen] = useState(false);
  const [currentSchoolYear, setCurrentSchoolYear] = useState(null);

  // Mock school years data
  const [schoolYears, setSchoolYears] = useState([
    {
      id: 1,
      name: "2023-2024",
      startDate: "2023-06-15",
      endDate: "2024-03-31",
      status: "Closed",
      isActive: false,
    },
    {
      id: 2,
      name: "2024-2025",
      startDate: "2024-06-17",
      endDate: "2025-03-28",
      status: "Active",
      isActive: true,
    },
    {
      id: 3,
      name: "2025-2026",
      startDate: "2025-06-16",
      endDate: "2026-03-27",
      status: "Scheduled",
      isActive: false,
    },
    {
      id: 4,
      name: "2026-2027",
      startDate: "",
      endDate: "",
      status: "Draft",
      isActive: false,
    },
  ]);

  const handleEditSchoolYear = (year) => {
    setCurrentSchoolYear(year);
    setIsEditDialogOpen(true);
  };

  const handleToggleActive = (yearId) => {
    // Implementation would set the active year and update the selector
    setSchoolYears(
      schoolYears.map((year) => ({
        ...year,
        isActive: year.id === yearId,
      }))
    );

    // Update the selected year in the parent component
    const yearToActivate = schoolYears.find((y) => y.id === yearId);
    if (yearToActivate) {
      setSelectedYear(yearToActivate.name);
    }
  };

  const handleCloseSchoolYear = (year) => {
    setCurrentSchoolYear(year);
    setIsCloseAlertOpen(true);
  };

  const confirmCloseSchoolYear = () => {
    // Implementation would update the school year status
    setSchoolYears(
      schoolYears.map((year) =>
        year.id === currentSchoolYear.id
          ? { ...year, status: "Closed", isActive: false }
          : year
      )
    );

    setIsCloseAlertOpen(false);
  };

  const getStatusBadge = (status) => {
    const variants = {
      Active: { variant: "success", color: "bg-green-500 hover:bg-green-600" },
      Closed: { variant: "destructive", color: "bg-red-500 hover:bg-red-600" },
      Scheduled: { variant: "outline", color: "bg-blue-100 hover:bg-blue-200" },
      Draft: { variant: "secondary", color: "bg-gray-200 hover:bg-gray-300" },
    };

    const statusStyle = variants[status] || variants["Draft"];

    return <Badge className={statusStyle.color}>{status}</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>School Year</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schoolYears.map((year) => (
              <TableRow key={year.id}>
                <TableCell className="font-medium">{year.name}</TableCell>
                <TableCell>{year.startDate || "Not set"}</TableCell>
                <TableCell>{year.endDate || "Not set"}</TableCell>
                <TableCell>{getStatusBadge(year.status)}</TableCell>
                <TableCell>
                  <Switch
                    checked={year.isActive}
                    onCheckedChange={() => handleToggleActive(year.id)}
                    disabled={year.status === "Closed"}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditSchoolYear(year)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {year.status !== "Closed" && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCloseSchoolYear(year)}
                        disabled={year.status === "Draft"}
                      >
                        {year.status === "Active" ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Calendar className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create School Year Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New School Year</DialogTitle>
            <DialogDescription>
              Set up a new academic year in the system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="yearName"
                className="text-right text-sm font-medium"
              >
                School Year
              </label>
              <Input
                id="yearName"
                placeholder="e.g., 2027-2028"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="startDate"
                className="text-right text-sm font-medium"
              >
                Start Date
              </label>
              <Input id="startDate" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="endDate"
                className="text-right text-sm font-medium"
              >
                End Date
              </label>
              <Input id="endDate" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right text-sm font-medium">
                Set as Active
              </div>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="set-active" />
                <Label htmlFor="set-active">
                  Make this the active school year
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button">Create School Year</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit School Year Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit School Year</DialogTitle>
            <DialogDescription>
              {currentSchoolYear
                ? `Update details for ${currentSchoolYear.name}`
                : "Update school year details"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editYearName"
                className="text-right text-sm font-medium"
              >
                School Year
              </label>
              <Input
                id="editYearName"
                defaultValue={currentSchoolYear?.name || ""}
                className="col-span-3"
                disabled={currentSchoolYear?.status === "Closed"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editStartDate"
                className="text-right text-sm font-medium"
              >
                Start Date
              </label>
              <Input
                id="editStartDate"
                type="date"
                defaultValue={currentSchoolYear?.startDate || ""}
                className="col-span-3"
                disabled={currentSchoolYear?.status === "Closed"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="editEndDate"
                className="text-right text-sm font-medium"
              >
                End Date
              </label>
              <Input
                id="editEndDate"
                type="date"
                defaultValue={currentSchoolYear?.endDate || ""}
                className="col-span-3"
                disabled={currentSchoolYear?.status === "Closed"}
              />
            </div>
            {currentSchoolYear?.status !== "Closed" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right text-sm font-medium">
                  Set as Active
                </div>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="edit-set-active"
                    checked={currentSchoolYear?.isActive || false}
                  />
                  <Label htmlFor="edit-set-active">
                    Make this the active school year
                  </Label>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={currentSchoolYear?.status === "Closed"}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close School Year Alert Dialog */}
      <AlertDialog open={isCloseAlertOpen} onOpenChange={setIsCloseAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Close School Year
            </AlertDialogTitle>

            {currentSchoolYear && (
              <>
                <AlertDialogDescription>
                  Are you sure you want to close the school year{" "}
                  <strong>{currentSchoolYear.name}</strong>?
                  <br />
                  <br />
                  This action is permanent and will:
                </AlertDialogDescription>

                <ul className="list-disc ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Finalize all academic records for this year</li>
                  <li>Prevent further modifications to subjects and classes</li>
                  <li>Archive all data associated with this school year</li>
                </ul>
              </>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={confirmCloseSchoolYear}
            >
              Close School Year
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SchoolYearManagement;
