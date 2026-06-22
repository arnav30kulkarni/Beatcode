import { z } from "zod";
import { PrismaClient } from "../generated/prisma/client";
import type { Prisma } from "../generated/prisma/client";

const router = require("../router/userRoutes");

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define zod schemas with inferred types
const UserCreateSchema = z.object({
  firstname: z.string(),
  lastName: z.string(),
  email_id: z.string().email(),
  date_of_birth: z.date().optional(),
  Password: z.string().min(6),
});

// Infer TypeScript types from zodod schemas
type UserCreateInput = z.infer<typeof UserCreateSchema>;


router.post("/signup", async (req:Request,res:Response):Promise<undefined> => {
    const body = req.body

    const parsedBody = UserCreateSchema.safeParse(body);

    if(!parsedBody.success){
        return res.status(401).json({
            msg:"Invalid Inputs"
        })
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email_id: body.email_id
        }
    })

    if(existingUser){
        return res.status(400).json({
            msg:"The user already Exists"
        })
    }

})  