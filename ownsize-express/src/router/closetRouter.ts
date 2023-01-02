import { Router } from "express";
import { closetController } from "../controller";

const router: Router = Router();

router.get("/", closetController.getAllCloset);
router.put("/:productId", closetController.updateCloset);

export default router;