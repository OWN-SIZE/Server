import { Router } from "express";
import userRouter from "./userRouter";
import closetRouter from "./closetRouter";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/allCloset", closetRouter);

export default router;
