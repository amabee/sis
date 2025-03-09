"use server";
import axios from "axios";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.SECRET_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_ROOT_URL;

export const faculty_login = async (user, password) => {
  const formData = new FormData();

  formData.append("operation", "faculty_login");
  formData.append(
    "json",
    JSON.stringify({
      user: user,
      password: password,
    })
  );

  formData.forEach((value, key) => {
    console.log(key, value);
  });

  try {
    const response = await axios({
      url: `${BASE_URL}auth/index.php`,
      method: "POST",
      data: formData,
      withCredentials: true,
      headers: {
        Authorization: SECRET_KEY,
      },
    });

    if (response.status !== 200) {
      return { success: false, message: "Status Error", data: [] };
    }

    if (response.data.success == false) {
      return { success: false, message: response.data.message, data: [] };
    }

    const cookieStore = await cookies();

    await cookieStore.set("session_id", response.data.data.session_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 86400,
    });

    await cookieStore.set("session_token", response.data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 86400,
    });

    return { success: true, message: "", data: response.data };
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred during login";

    return {
      success: false,
      message: errorMessage,
      data: [],
    };
  }
};

export const student_login = async () => {};
