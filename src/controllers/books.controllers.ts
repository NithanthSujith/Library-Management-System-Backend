import { prisma } from "../config/db.js";
import type { Request, Response } from "express";
import { createBookInput, updateBookInput } from "../middlewares/zodValidations.js";


export const createBook = async (req : Request, res : Response)=>{
    const body = req.body;
    const {success, error}  = createBookInput.safeParse(body)

    
    if (!success) {
        res.status(400).json({
            message : "Invalid inputs "
        })
    }

    const doesBookExists = await prisma.book.findFirst({
        where :{
            isbn : body.isbn
        }
    })
    if (doesBookExists) {
        res.status(409).json({
            message : "The book alread exists"
        })
    }

    try {
        const createdBook = await prisma.book.create({
            data :{
                title : body.title,
                author : body.author,
                isbn : body.isbn,
                category: body.category,
                totalCopies : body.totalCopies,
                availableCopies : body.totalCopies
            }
        })
        res.status(200).json({
            message :"Book created successfully",
            createdBook
        })
    } catch (error) {
        res.status(500).json({
            message : "Error occured during creation"
        })
    }


}

export const getAllBooks = async(req:Request, res: Response)=>{
    try {
        const allBooks = await prisma.book.findMany({
            select:{
                id:true,
                title:true,
                author:true,
                availableCopies:true,
                totalCopies:true
            }
        })
        res.status(200).json({
            message : "Fetch Successful",
            allBooks
        })
    } catch (error) {
        res.status(500).json({
            message : "Error occured during fetch"
        })
    }
}

export const getBook = async(req:Request, res:Response)=>{
    const bookId = req.params.id;

    if (!bookId) {
        res.status(400).json({
            message : "Invalid inputs"
        })
    }

    try {
        const book = await prisma.book.findFirst({
            where:{
                id : Number(bookId)
            },
            select:{
                id:true,
                title: true,
                author:true,
                availableCopies:true,
                totalCopies:true,
                BorrowedRecords: true
            }
        })

        if (!book) {
            res.status(404).json({
                message : "Could not find the book"
            })
            return
        }

        res.status(200).json({
            message : "Fetch succesfull",
            book
        })
    } catch (error) {
        res.status(500).json({
            message : "Error occured during fetch"
        })
    }
}

export const updateBookDetails = async(req:Request, res:Response)=>{
    const body = req.body;

    const {success} = updateBookInput.safeParse(body);

    if (!success) {
        res.status(400).json({
            message : "Invalid inputs"
        })
        return
    }

    try {
        const updatedBook = await prisma.book.update({
            where:{
                id : body.id
            },
            data :{
                title : body.title,
                author : body.author,
                category : body.category,
                totalCopies : body.totalCopies
            },
            select :{
                title : true,
                author : true,
                category : true,
                totalCopies : true,
                availableCopies : true,
                id:true,
                BorrowedRecords:true
            }
        })

        if (!updatedBook) {
            res.status(400).json({
                message : "Error occured during updating the db"
            })
            return
        }

        res.status(200).json({
            message : "Update Successfull",
            updatedBook
        })
    } catch (error) {
        res.status(500).json({
            message : "Update Failed due to some error",
        })
    }
}

export const deleteBook = async(req:Request, res:Response)=>{
    const bookId = req.params.id;
    
    try {
        const deletingBook = await prisma.book.delete({
            where : {
                id : Number(bookId)
            }
        })

        if (!deletingBook) {
            res.status(400).json({
                message : "Error occured during deletion"
            })
            return
        }

        res.status(200).json({
            message : "Successfully deleted",
            deletingBook
        })
    } catch (error) {
        res.status(500).json({
            message : "Error occured during db call"
        })
    }
}

