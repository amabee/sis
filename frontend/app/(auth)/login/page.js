"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Script from "next/script";
import { faculty_login } from "@/actions/auth";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [hCaptchaToken, setHCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("student");

  // Student credentials state
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");

  // Faculty credentials state
  const [facultyId, setFacultyId] = useState("");
  const [facultyPassword, setFacultyPassword] = useState("");

  const studentCaptchaRef = useRef(null);
  const facultyCaptchaRef = useRef(null);
  const studentCaptchaId = useRef(null);
  const facultyCaptchaId = useRef(null);

  const onHCaptchaVerify = (token) => {
    setHCaptchaToken(token);
    setCaptchaError(false);
  };

  const onHCaptchaExpire = () => {
    setHCaptchaToken("");
  };

  const onHCaptchaError = (err) => {
    console.error("hCaptcha error:", err);
    setCaptchaError(true);
  };

  const handleScriptLoad = () => {
    setScriptLoaded(true);
    console.log("hCaptcha script loaded");
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (!scriptLoaded || !window.hcaptcha) return;

    const renderCaptcha = () => {
      try {
        const sitekey = process.env.NEXT_PUBLIC_CAPTCHA_KEY;

        if (studentCaptchaId.current) {
          window.hcaptcha.reset(studentCaptchaId.current);
          window.hcaptcha.remove(studentCaptchaId.current);
          studentCaptchaId.current = null;
        }

        if (facultyCaptchaId.current) {
          window.hcaptcha.reset(facultyCaptchaId.current);
          window.hcaptcha.remove(facultyCaptchaId.current);
          facultyCaptchaId.current = null;
        }

        if (activeTab === "student" && studentCaptchaRef.current) {
          studentCaptchaId.current = window.hcaptcha.render(
            studentCaptchaRef.current,
            {
              sitekey: sitekey,
              callback: onHCaptchaVerify,
              "expired-callback": onHCaptchaExpire,
              "error-callback": onHCaptchaError,
            }
          );
        } else if (activeTab === "faculty" && facultyCaptchaRef.current) {
          facultyCaptchaId.current = window.hcaptcha.render(
            facultyCaptchaRef.current,
            {
              sitekey: sitekey,
              callback: onHCaptchaVerify,
              "expired-callback": onHCaptchaExpire,
              "error-callback": onHCaptchaError,
            }
          );
        }
      } catch (error) {
        console.error("Error rendering hCaptcha:", error);
      }
    };

    const timer = setTimeout(renderCaptcha, 100);
    return () => clearTimeout(timer);
  }, [scriptLoaded, activeTab]);

  const handleStudentLogin = async (event) => {
    event.preventDefault();

    if (!hCaptchaToken) {
      setCaptchaError(true);
      return;
    }

    setIsLoading(true);

    try {
      // Assuming you'll create this function similar to faculty_login
      // const { success, message, data } = await student_login({
      //   email: studentEmail,
      //   password: studentPassword,
      //   captchaToken: hCaptchaToken
      // });

      console.log("Student login attempt:", {
        studentEmail,
        captchaToken: hCaptchaToken,
      });
      // Handle login response here
    } catch (error) {
      console.error("Student login error:", error);
    } finally {
      setIsLoading(false);
      if (window.hcaptcha && studentCaptchaId.current) {
        window.hcaptcha.reset(studentCaptchaId.current);
      }
      setHCaptchaToken("");
    }
  };

  // Faculty login handler
  const handleFacultyLogin = async (event) => {
    event.preventDefault();

    if (!hCaptchaToken) {
      setCaptchaError(true);
      return;
    }

    setIsLoading(true);

    try {
      const { success, message, data } = await faculty_login(
        facultyId,
        facultyPassword
      );

      if (!success) {
        return alert(message);
      }

      if (data.data.user?.RoleID === 1) {
        return (window.location.href = "/admin/dashboard");
      }

      if (data.data.user?.RoleID === 2) {
        return (window.location.href = "/faculty/dashboard");
      }

      console.log("Faculty login response:", { success, message, data });
    } catch (error) {
      console.error("Faculty login error:", error);
    } finally {
      setIsLoading(false);
      if (window.hcaptcha && facultyCaptchaId.current) {
        window.hcaptcha.reset(facultyCaptchaId.current);
      }
      setHCaptchaToken("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Load hCaptcha script */}
      <Script
        src="https://js.hcaptcha.com/1/api.js?render=explicit"
        onLoad={handleScriptLoad}
        strategy="afterInteractive"
      />

      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Student Information System
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="student"
              className="w-full"
              onValueChange={handleTabChange}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="faculty">Faculty</TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="space-y-4">
                <form onSubmit={handleStudentLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Student Email</Label>
                      <Input
                        id="student-email"
                        placeholder="student@university.edu"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password</Label>
                      <Input
                        id="student-password"
                        type="password"
                        value={studentPassword}
                        onChange={(e) => setStudentPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* hCaptcha Container */}
                    <div className="space-y-2">
                      <Label>Verify you're human</Label>
                      <div ref={studentCaptchaRef}></div>
                      {captchaError && (
                        <p className="text-red-500 text-xs mt-1">
                          Please complete the captcha before signing in.
                        </p>
                      )}
                    </div>

                    <Button
                      className="w-full"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="faculty" className="space-y-4">
                <form onSubmit={handleFacultyLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="faculty-id">Faculty ID</Label>
                      <Input
                        id="faculty-id"
                        placeholder="F12345"
                        value={facultyId}
                        onChange={(e) => setFacultyId(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="faculty-password">Password</Label>
                      <Input
                        id="faculty-password"
                        type="password"
                        value={facultyPassword}
                        onChange={(e) => setFacultyPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* hCaptcha Container */}
                    <div className="space-y-2">
                      <Label>Verify you're human</Label>
                      <div ref={facultyCaptchaRef}></div>
                      {captchaError && (
                        <p className="text-red-500 text-xs mt-1">
                          Please complete the captcha before signing in.
                        </p>
                      )}
                    </div>

                    <Button
                      className="w-full"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-xs text-center text-gray-500">
              By logging in, you agree to our Terms of Service and Privacy
              Policy
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
