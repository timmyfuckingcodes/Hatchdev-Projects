
import z from "zod";

export const postNewJobFormSchema = z.object({
    title: z.string({message: "Please fill this field."}).trim().min(3, {message: "Minimum of 3 characters"}),
    location: z.string({message: "Please fill this field."}).trim(),
    job_type: z.enum(["Full-time", "Part-time", "Remote", "Contract","Internship","Temporary"], {message: "Please select a field"}),
    salary_min: z.string().optional(),
    salary_max: z.string().optional(),
    description: z.string({message: "Provide a brief JD"}),
    location_type: z.enum(["On-site", "Remote", "Hybrid"], {message: "Please select a field"}),
    requirements: z.string({message: "Provide requirements for the jub"}),
    isACTIVE :z.enum(["Open", "Closed"], {message: "Please select a field"}).optional()
})

export type postNewJobFormSchemaType = z.infer<typeof postNewJobFormSchema>