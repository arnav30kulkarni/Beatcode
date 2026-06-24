import { date, email, z } from "zod";
import bcrypt from "bcrypt";
const saltrounds = 10;
import jwt from "jsonwebtoken"
const secretpass = process.env.secretpass;

if (!secretpass) {
    throw new Error("Missing secretpass environment variable");
}

// Initialize Prisma Client
import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

const UserCreateSchema = z.object({
  firstname: z.string().trim(),
  lastName: z.string().trim(),
  email_id: z.string().email(),
  date_of_birth: z.date().optional(),
  Password: z.string().min(6),
});

const signUp = async (req:any,res:any) => {
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

    const hashpass = await bcrypt.hash(body.Password,saltrounds);

    const newUser = await prisma.user.create({
        data:{
            email_id: req.body.email_id,
            firstname: req.body.firstname,
            lastName: req.body.lastName,
            date_of_birth: req.body.date_of_birth,
            Password: hashpass
        }
    })

    try {

        const token = jwt.sign({
            id: newUser.id,
            email_id: newUser.email_id
        },secretpass,{
            expiresIn: "2d"
        })
        res.json({token, userId: newUser.id})

    } catch (error) {
        res.status(500).json({
            msg: "Interal Server error!"
        })
        console.error(error);
    }
} 


const signIn = async (req:any,res:any)=> {
    const signInSchema = z.object({
        email_id:z.string().email(),
        Password:z.string()
    })

    const body = req.body;
    
    const parsedBody = signInSchema.safeParse(body);

    if(!parsedBody.success){
        return res.status(401).json({
            msg:"Wrong Inputs"
        })
    }

    const loggedInUser = await prisma.user.findFirst({
        where:{
            email_id:body.email_id
        }
    })

    if(!loggedInUser){
        return res.status(404).json({
            msg:"The User Does Not exist!"
        })
    }

    const passwordMatches = await bcrypt.compare(body.Password, loggedInUser.Password);

    if(!passwordMatches){
        return res.status(403).json({
            msg:"Invalid Credentials, please verify!"
        })
    }


    try {

        const token = jwt.sign({
            email_id: loggedInUser.email_id
        },secretpass);
        console.log(loggedInUser.id,token);
         return res.status(200).json({
            msg:"user successfully logged in!"
        });
        
    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error!"
        })
    }
}

const updateProfile = async (req:any,res:any) => {

    const body = req.body

    const updateSchema = z.object({
        email_id: z.string().email(),
        firstname: z.string().trim().optional(),
        lastname: z.string().trim().optional(),
        date_of_birth: z.date().optional()
    })

    const parsedBody = updateSchema.safeParse(body);

    if(!parsedBody.success){
        return res.status(401).json({
            msg:"Wrong Input"
        })
    }

    try {
        const searchUser = await prisma.user.findFirst({
        where: {
            email_id: body.email_id
        }
        });
    
        if(!searchUser){
            return res.status(404).json({
                msg:"user not found!"
            })
        };

    } catch (error) {
        return res.status(500).json({
            msg:"Internal server Error"
        })
    }
    
    
    try {
        const updatedUser = await prisma.user.update({
        where:{
            email_id: body.email
        },
        data:{
            firstname: body.firstname,
            lastName: body.lastName,
            date_of_birth: body.date_of_birth
        }
    })

    return res.status(200).json({
        msg:"User information updated successfully!"
    });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg:"Error updating user!"
        })
    }
}

module.exports = {
    signUp,
    signIn,
    updateProfile
};