import { Router } from "express";
import { createBook, deleteBook, getAllBooks, getBook, updateBookDetails } from "../controllers/books.controllers.js";
import { checkAuthorization, checkRole } from "../middlewares/authorizationMiddleware.js";


const router = Router()

router.post('/create',checkAuthorization, checkRole,createBook)
router.get('/all',checkAuthorization, checkRole , getAllBooks)
router.get('/:id',checkAuthorization, getBook)
router.put('/:id',checkAuthorization, checkRole, updateBookDetails)
router.delete('/:id',checkAuthorization, checkRole, deleteBook)


export default router