import type { Request, Response } from "express";
import { signupInputs } from "../middlewares/zodValidations.js";
import { prisma } from "../config/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

var JWT_SECRET = process.env.JWT_SECRET || "nothing"

export const createUser = async (req: Request, res: Response) => {
    const body = req.body
    const { success, error } = signupInputs.safeParse(body)
    if (!success) {
        console.log(error)
        return res.status(400).json({
            message: "Invalid inputs, please check the data"
        })
    }

    const userCheck = await prisma.users.findFirst({
        where: {
            email: body.email
        }
    })


    if (userCheck) {
        return res.status(409).json({
            message: "User alread exists."
        })
    }

    try {
        console.log(JWT_SECRET)
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const newUser = await prisma.users.create({
            data: {
                email: body.email,
                name: body.name,
                password: hashedPassword
            }
        })
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET)
        res.status(200).json({
            message: "User created Sucessfully",
            token
        })

    } catch (error) {
        res.status(500).json({
            message: "Error occured while creating user"
        })
    }



}


export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const allUsers = await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        })
        console.log(allUsers)
        res.status(200).json({
            message: "Fetch Successful",
            allUsers
        })
    } catch (error) {
        res.status(500).json({
            message: "Error occured during fetch process"
        })
    }



}

export const getUser = async (req: Request, res: Response) => {

    const id = req.params.id;
    if (!id) {
        return res.status(401).json({
            message: "Invalid inputs"
        })
    }

    try {
        const userDetails = await prisma.users.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                name: true,
                id: true,
                role: true,
                email: true
            }
        });
        if (!userDetails) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "Fetch Successfull",
            userDetails
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error occured during fetch",
        })
    }
}


export const deleteUser = async (req: Request, res: Response) => {

    const deletingUserId = req.params.id
    const adminId = (req as any).user.id

    if (adminId === Number(deletingUserId)) {
        res.status(409).json({
            message : "Self deletion is not allowed"
        })
        return
    }

    try {
        const userToDelete = await prisma.users.findFirst({
            where: {
                id: Number(deletingUserId)
            }
        })
        if (!userToDelete) {
            return res.status(404).json({
                message: "User not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error while searching for user"
        })
    }

    try {
        const deletedUser = await prisma.users.delete({
            where: {
                id: Number(deletingUserId)
            }
        });

        console.log("deletedUser", deletedUser)
        res.status(200).json({
            message: "User deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error occured during deletion"
        })
    }
}


export const makeUserAdmin = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const user = await prisma.users.findFirst({
            where: {
                id: Number(id)
            }
        })
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        if (user.role === "admin") {
            return res.status(409).json({
                message: "User is already an admin"
            })
        }

        const updatedUser = await prisma.users.update({
            where: {
                id: Number(id)
            },
            data: {
                role: "admin"
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        })

        res.status(200).json({
            message: "Updated role of the user successfully",
            updatedUser
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error while processing"
        })
    }
}

export const getUserDetails = async(req: Request, res:Response) =>{
    const userInfo = (req as any).user ;
    
    try {
        const user = await prisma.users.findFirst({
            where :{
                id : userInfo.id
            },
            select:{
                name : true,
                email : true,
                role : true,
                id : true
            }
        })

        if (!user) {
            res.status(404).json({
                message : "User not found"
            })
            return
        }

        res.status(200).json({
            message : "Fetch Successful",
            user
        })

    } catch (error) {
        res.status(500).json({
            message : "Error occured during fetch"
        })
    }

}
