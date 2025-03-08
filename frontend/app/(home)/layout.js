"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  GraduationCap,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const isAdmin = pathname.includes("/admin");
  const userType = isAdmin ? "admin" : "faculty";

  const navigationItems = [
    {
      name: "Dashboard",
      href: `/${userType}/dashboard`,
      icon: BarChart3,
    },
    {
      name: "Students",
      href: `/${userType}/students`,
      icon: Users,
    },
    {
      name: "Faculty",
      href: `/${userType}/faculty`,
      icon: GraduationCap,
      showFor: ["admin"],
    },
    {
      name: "Schedule",
      href: `/${userType}/schedule`,
      icon: Calendar,
    },
    {
      name: "Results",
      href: `/${userType}/results`,
      icon: FileText,
    },
    {
      name: "Settings",
      href: `/${userType}/settings`,
      icon: Settings,
    },
  ];

  const filteredNavItems = navigationItems.filter(
    (item) => !item.showFor || item.showFor.includes(userType)
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={cn(
          " text-black transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center border-b border-gray-800 px-4",
            sidebarOpen ? "justify-between" : "justify-center"
          )}
        >
          {sidebarOpen && (
            <span className="text-xl font-bold">
              SIS {isAdmin ? "ADMIN" : "Faculty"}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            <Menu size={20} />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  sidebarOpen ? "space-x-3" : "justify-center",
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-black-400 hover:text-white hover:bg-gray-800"
                )}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="border-t border-gray-800 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full text-left p-0 h-auto",
                  sidebarOpen ? "flex items-center space-x-3" : "justify-center"
                )}
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>{isAdmin ? "AD" : "FA"}</AvatarFallback>
                </Avatar>
                {sidebarOpen && (
                  <div className="flex items-center justify-between flex-1">
                    <div className="text-sm">
                      <div className="font-medium text-white">
                        {isAdmin ? "Admin User" : "Faculty User"}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {isAdmin ? "Administrator" : "Faculty User"}
                      </div>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b flex items-center justify-between px-6 bg-white">
          <h1 className="text-lg font-semibold">Student Information System</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings size={20} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>{isAdmin ? "AD" : "FA"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">{children}</div>
      </main>
    </div>
  );
}
