import express from "express";
import cors from "cors";
import userRouter from "./Routes/UserRouter.js";
import bookRouter from "./Routes/BookRouter.js";
import borrowRouter from "./Routes/BorrowRouter.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/transaction", borrowRouter);
export default app;
//# sourceMappingURL=app.js.map