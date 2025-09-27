import z, { email } from "zod"

export const signupInputs = z.object({
    name : z.string().min(4),
    email : z.email(),
    password : z.string().min(6)
})

export const signinInputs = z.object({
    email : z.email(),
    password : z.string().min(6)
})

export const createBookInput = z.object({
    title : z.string(),
    author : z.string(),
    isbn : z.string().length(10),
    category : z.string(),
    totalCopies : z.number().min(1),
})

export const updateBookInput = z.object({
    title : z.string(),
    author : z.string(),
    category : z.string(),
    id : z.number(),
    totalCopies : z.number().min(1)
})
 
