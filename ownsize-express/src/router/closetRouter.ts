import { Router } from "express";
import { closetController } from "../controller";

const router: Router = Router();

router.get("/", closetController.getAllCloset);

export default router;