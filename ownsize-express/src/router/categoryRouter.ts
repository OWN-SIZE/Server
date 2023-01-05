import { Router } from "express";
import { categoryController } from "../controller";

const router: Router = Router();

//* 카테고리 전체 조회 GET /category
router.get("/", categoryController.getAllCategory);

export default router;