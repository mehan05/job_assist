import {z} from "zod"

export const UserSchema = z.object({
    name:z.string(),
    age:z.number(),
    email:z.string().email(),
    gender:z.string(),
    password:z.string().min(8).max(16),
    skills:z.array(z.string()),
    place:z.string(),
})

