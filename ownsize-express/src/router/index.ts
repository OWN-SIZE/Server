import { Router } from "express";
import userRouter from "./userRouter";
import closetRouter from "./closetRouter";
import categoryRouter from "./categoryRouter";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/allCloset", closetRouter);
router.use("/category", categoryRouter);

export default router;
