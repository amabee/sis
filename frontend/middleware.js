import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("Processing request for path:", pathname);

  try {
    const session_id = request.cookies.get("session_id")?.value;
    const session_token = request.cookies.get("session_token")?.value;
    let userType = null;

    if (session_token) {
      try {
        const decoded = jwtDecode(session_token);
        userType = decoded.user?.role_id || null;
        console.log("Decoded user type:", userType);
      } catch (e) {
        console.error("Error decoding JWT:", e);
      }
    }

    const isAuthenticated = !!(session_id && session_token);
    console.log("Authentication status:", isAuthenticated);

    const session = isAuthenticated
      ? {
          isAuthenticated,
          userType,
        }
      : null;

    // Modified to use numeric role IDs instead of strings
    const routeConfig = {
      admin: {
        pattern: /^\/admin(\/.*)?$/,
        allowedTypes: [1], // Changed from "admin" to 1
        defaultRedirect: "/admin/",
      },
      faculty: {
        pattern: /^\/faculty(\/.*)?$/,
        allowedTypes: [2], // Changed from "faculty" to 2
        defaultRedirect: "/faculty/",
      },
    };

    // Handle unauthenticated users
    if (!session?.isAuthenticated) {
      console.log("User is not authenticated, checking if redirect needed");

      const isProtectedRoute =
        Object.values(routeConfig).some((config) =>
          config.pattern.test(pathname)
        ) || pathname === "/";

      if (isProtectedRoute && pathname !== "/login") {
        console.log("Redirecting unauthenticated user to login");
        const response = NextResponse.redirect(new URL("/login", request.url));

        response.cookies.set("clear-user-data", "true", {
          httpOnly: false,
          path: "/",
          maxAge: 10,
        });

        return response;
      }

      return NextResponse.next();
    }

    // Handle authenticated users
    if (pathname === "/login") {
      console.log("User is authenticated and on login page, redirecting");
      const redirectUrl = getRedirectUrlForUserType(session.userType);
      console.log("Redirecting to:", redirectUrl);
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Check route permissions for authenticated users
    for (const [key, config] of Object.entries(routeConfig)) {
      if (config.pattern.test(pathname)) {
        console.log("Checking permissions for route:", key);
        console.log(
          "User type:",
          session.userType,
          "Allowed types:",
          config.allowedTypes
        );

        if (!config.allowedTypes.includes(session.userType)) {
          console.log("User doesn't have permission, redirecting");
          const redirectUrl = getRedirectUrlForUserType(session.userType);
          console.log("Redirecting to:", redirectUrl);
          return NextResponse.redirect(new URL(redirectUrl, request.url));
        } else {
          console.log("User has permission for this route");
        }
      }
    }

    console.log("Proceeding with request");
    return NextResponse.next();
  } catch (e) {
    console.error("Middleware error:", e);
    if (pathname !== "/login") {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.set("clear-user-data", "true", {
        httpOnly: false,
        path: "/",
        maxAge: 10,
      });

      return response;
    }
    return NextResponse.next();
  }
}

function getRedirectUrlForUserType(userType) {
  console.log("Getting redirect URL for user type:", userType);
  switch (userType) {
    case 1:
      return "/admin/";
    case 2:
      return "/faculty/";
    case 3:
      return "/student/";
    default:
      return "/";
  }
}

export const config = {
  matcher: ["/", "/login", "/admin/:path*", "/faculty/:path*"],
};
