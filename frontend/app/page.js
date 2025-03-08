import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Users, BarChart3 } from "lucide-react";

export default function SimpleStudentInformationSystem() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Image */}
      <header
        className="relative text-white py-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/api/placeholder/1920/1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <GraduationCap className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">
              Student Information System
            </h1>
            <p className="text-xl mb-8">
              A simple yet powerful solution to manage all your student data in
              one place
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Key Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <BookOpen className="h-10 w-10 mb-4 mx-auto text-blue-600" />
                <h3 className="font-semibold mb-2">Academic Records</h3>
                <p className="text-gray-600">
                  Manage grades, transcripts and courses
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Users className="h-10 w-10 mb-4 mx-auto text-blue-600" />
                <h3 className="font-semibold mb-2">User Management</h3>
                <p className="text-gray-600">
                  Student, teacher and admin roles
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <BarChart3 className="h-10 w-10 mb-4 mx-auto text-blue-600" />
                <h3 className="font-semibold mb-2">Performance Analytics</h3>
                <p className="text-gray-600">
                  Track and visualize student progress
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="p-0">
                <GraduationCap className="h-10 w-10 mb-4 mx-auto text-blue-600" />
                <h3 className="font-semibold mb-2">Enrollment</h3>
                <p className="text-gray-600">
                  Easy registration and class assignment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8">
            Try our Student Information System today and simplify your academic
            management
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Request a Demo
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} Student Information System
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
