import { Router } from "express";

const router = Router()

router.post("/borrow", ()=>{})
router.post("/return", ()=>{})
router.get("/all", ()=>{})
router.get("/user/:id", ()=>{})
router.get("/overdue", ()=>{})

export default router