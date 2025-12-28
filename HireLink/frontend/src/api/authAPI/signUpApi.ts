export const signUpApi = async (data: any) => {
  const baseUrl = "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(res)
    return "Successful"
  } catch (error) {
    return "An Error Occured. Try again please"
  }
};
