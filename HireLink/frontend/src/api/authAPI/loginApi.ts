import { ms } from "zod/locales";

export const loginApi = async (data: { email: string; password: string }) => {
  const baseUrl = "http://localhost:3000";
  console.log(baseUrl);
  console.log(data);
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok)
      return { message: "Something went wrong. Try again later", role: "null" };

    const msg = await res.json();
    // console.log(token)

    if (msg) {
      localStorage.setItem("jwt", msg.token);
    }

    return { message: "success", role: msg.role };
  } catch (error) {
    console.log(error);
    return { message: "An error occured. Try again Later", role: "null" };
  }
};
