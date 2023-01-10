import { Router } from "express";
import userRouter from "./userRouter";
import closetRouter from "./closetRouter";
import pageRouter from "./pageRouter";
import sizeRouter from "./sizeRouter";
import categoryRouter from "./categoryRouter";
import authRouter from "./authRouter";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/allCloset", closetRouter);
router.use("/myPage", pageRouter);
router.use("/mySize", sizeRouter);
router.use("/category", categoryRouter);
router.use("/auth", authRouter);

export default router;
