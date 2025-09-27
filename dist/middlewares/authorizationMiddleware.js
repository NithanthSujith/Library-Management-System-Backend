import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
const JWT_SECRET = process.env.JWT_SECRET || "nothing";
export const checkAuthorization = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({
            message: "Authorization headers missing"
        });
    }
    const token = header?.split(" ")[1] || "";
    if (!token) {
        return res.status(401).json({
            message: "Authorziation token is missing"
        });
    }
    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Unauthorized access"
        });
    }
};
export const checkRole = async (req, res, next) => {
    try {
        const userInfo = req.user;
        const user = await prisma.users.findFirst({
            where: {
                id: userInfo.id
            },
            select: {
                role: true,
            }
        });
        if (!user || user.role !== "admin") {
            return res.status(401).json({
                message: "Unauthorized access, only admins can perform this action"
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: "Error validating user role"
        });
    }
};
//# sourceMappingURL=authorizationMiddleware.js.map