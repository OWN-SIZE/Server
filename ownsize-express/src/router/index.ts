import { Router } from "express";
import userRouter from "./userRouter";
import closetRouter from "./closetRouter";
import pageRouter from "./pageRouter";
import sizeRouter from "./sizeRouter";
import categoryRouter from "./categoryRouter";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/allCloset", closetRouter);
router.use("/mypage", pageRouter);
router.use("/mySize", sizeRouter);
router.use("/category", categoryRouter);

export default router;
