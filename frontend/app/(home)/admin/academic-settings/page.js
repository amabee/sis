"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubjectManagement from "../_components/AcademicSettingsComponents/SubjectManagement";
import ClassAssignment from "../_components/AcademicSettingsComponents/ClassAssignment";
import SchoolYearManagement from "../_components/AcademicSettingsComponents/SchoolYearManagement";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw } from "lucide-react";

const AcademicSettingsPage = () => {
  const [selectedYear, setSelectedYear] = useState("2024-2025");

  // Mock school years for the selector
  const schoolYears = ["2023-2024", "2024-2025", "2025-2026", "2026-2027"];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Academic Settings
          </h1>
          <p className="text-muted-foreground">
            Manage school years, subjects, and classes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[210px] font-medium">
              <SelectValue placeholder="Select School Year" />
            </SelectTrigger>
            <SelectContent>
              {schoolYears.map((year) => (
                <SelectItem key={year} value={year}>
                  School Year: {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="school-years" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="school-years">School Years</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="school-years" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div>
                  <CardTitle>School Year Management</CardTitle>
                  <CardDescription>
                    Create new school years and manage active years
                  </CardDescription>
                </div>
                <Button className="w-full md:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New School Year
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <SchoolYearManagement
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div>
                  <CardTitle>Subject Management</CardTitle>
                  <CardDescription>
                    Create subjects and assign teachers for {selectedYear}
                  </CardDescription>
                </div>
                <Button className="w-full md:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Subject
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <SubjectManagement schoolYear={selectedYear} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div>
                  <CardTitle>Class Assignment</CardTitle>
                  <CardDescription>
                    Assign students to classes and set modalities for{" "}
                    {selectedYear}
                  </CardDescription>
                </div>
                <Button className="w-full md:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Class
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ClassAssignment schoolYear={selectedYear} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicSettingsPage;
