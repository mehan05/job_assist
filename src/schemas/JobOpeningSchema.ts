import { z} from "zod"

export const JobOpeningSchema = z.object({
    title:z.string(),
    description:z.string().max(500,{"message":"Description must be less than 500 characters"}),
    location:z.string(),
    employmentType:z.string(),
    salaryFrom:z.number(),
    salaryTo:z.number(),
    deadline:z.string().refine((val)=>!isNaN(Date.parse(val)),{message:"Enter valid date"}).transform((date)=> new Date(date)),
    skillsRequired:z.array(z.string()),
    contactEmail:z.string().email(),
})

