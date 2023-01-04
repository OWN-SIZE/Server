import { Router } from "express";
import userRouter from "./userRouter";
import closetRouter from "./closetRouter";
import sizeRouter from "./sizeRouter";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/allCloset", closetRouter);
router.use("/mySize", sizeRouter);

export default router;
