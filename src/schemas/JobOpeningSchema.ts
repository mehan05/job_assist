import {number, z} from "zod"

export const JobOpeningSchema = z.object({
    title:z.string(),
    description:z.string().max(500,{"message":"Description must be less than 500 characters"}),
    location:z.string(),
    postById:number(),
    skillsRequired:z.array(z.string()),
    contactEmail:z.string().email(),
})

