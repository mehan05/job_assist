import {z} from "zod";

export const WorkSpaceSchema = z.object({
    name:z.string(),
    description:z.string(),
     visibility:z.boolean(),
     inviteMembers:z.array(z.string()).optional(),
     category:z.array(z.string())
    
    })