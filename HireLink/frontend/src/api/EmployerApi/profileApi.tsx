// import { useQuery } from "@tanstack/react-query"

// export const employerProfile = ()=>{
//     const baseUrl = "http://localhost:3000/api"
//     const token = localStorage.getItem('jwt')
    
//     const {data, isLoading, error} = useQuery({
//         queryKey: ['employer_profile'],
//         queryFn: ()=>{
//             fetch(`${baseUrl}/api/employer/profile`, {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//         }
//     })

//     return {data, isLoading, error}
// }


export const EmployerApi:any = async (data: any) => {
  const baseUrl = "http://localhost:3000/";
  const token = localStorage.getItem('jwt')
    
  console.log(baseUrl);
  console.log(data);
  try {
    const res = await fetch(`${baseUrl}api/employer/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

     if (!res.ok) {
        console.log("Failed to fetch employer profile");
        return { message: "Something went wrong. Try again later", role: "null" };
    }

  
    const result = await res.json();
     if(result && result.employer){
      return { message: "success", role: result.employer.role || "employer" };
    } 

    console.log(result);
    return result;
   
  } catch (error) {
    console.log(error);
    return { message: "An error occured. Try again Later", role: "null" };
  }
};
