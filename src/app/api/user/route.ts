import { db } from "@lib/db";
import { NextResponse } from "next/server";
import {hash} from 'bcrypt'
import  * as z  from "zod";


// Define a schema for input validation
const userSchema = z
.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })
  
  


export async function POST(req: Request) {
    try{
        const body = await req.json()
        const { email, password } = body


        console.log(email,password)

        // check if email already exits
        const existingUserByEmail = await db.user.findUnique({
            where: {email: email}
        })
        if(existingUserByEmail){
            return NextResponse.json({user: null, message: "User with this email already exists"}
            ,{status: 409})
        }

  
        const hashPassword = await  hash(password, 10)
        const newUser = await db.user.create({
            data: {
                email,
                password:hashPassword
                
            } 
        })


       
        const {password: newUserPassword, ...rest} = newUser

       

        return NextResponse.json({user: rest, message: "User created sucessfully"},{status: 201})

    }catch(error){
        return NextResponse.json({message: "Something went wrong!"},{status: 500})

    }
}