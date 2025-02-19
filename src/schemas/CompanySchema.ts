import {z} from "zod"

export const CompanySchema = z.object({
    name:z.string(),
    age:z.number(),
    email:z.string().email(),
    gender:z.string(),
    dob:z.string().refine((date)=>!isNaN(Date.parse(date)),{message: "Enter valid date"}).transform((date)=> new Date(date)),
    password:z.string(),
    place:z.string(),
    headlines:z.string(),
    bio:z.string(),
})

