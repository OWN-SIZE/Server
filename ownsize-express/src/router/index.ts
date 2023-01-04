import { Router } from "express";
import userRouter from "./userRouter";
import closetRouter from "./closetRouter";
import pageRouter from "./pageRouter";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/allCloset", closetRouter);
router.use("/mypage", pageRouter);

export default router;
