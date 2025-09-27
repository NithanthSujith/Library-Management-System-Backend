import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUser, getUserDetails, makeUserAdmin, } from "../controllers/users.controllers.js";
import { checkAuthorization, checkRole } from "../middlewares/authorizationMiddleware.js";

const router = Router()

router.post("/create", createUser)
router.get("/all", checkAuthorization, checkRole, getAllUsers)
router.get("/getmydetails", checkAuthorization, getUserDetails)
router.get("/:id", checkAuthorization, checkRole, getUser)
router.put("/updateAdmin/:id", checkAuthorization, checkRole, makeUserAdmin)
router.delete("/:id", checkAuthorization, checkRole, deleteUser)


export default router