import  type { postNewJobFormSchemaType } from "../../schemas/postNewJobFormSchema";

export const jobApi = async (data: postNewJobFormSchemaType) => {

  const baseUrl = "http://localhost:3000";
  console.log(baseUrl);
  console.log(data);
  try {
    const res = await fetch(`${baseUrl}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify(data),
    });

    if (!res.ok)
      return { message: "Something went wrong. Try again later", role: "null" };

    const msg = await res.json();
    return { message: "success", role: msg.role };
  } catch (error) {
    console.log(error);
    return { message: "An error occured. Try again Later", role: "null" };
  }
};
