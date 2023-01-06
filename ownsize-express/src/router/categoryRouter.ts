import { Router } from "express";
import { categoryController } from "../controller";

const router: Router = Router();

//* 카테고리 전체 조회 GET /category
router.get("/", categoryController.getAllCategory);

//* 카테고리 생성 POST /category/createCategory
router.post("/createCategory", categoryController.createCategory);

//* 카테고리 삭제 DELETE /category/:categoryId
router.delete("/:categoryId", categoryController.deleteCategory);

//* 카테고리 상세 조회 GET /category/:categoryId
router.get("/:categoryId", categoryController.getCategoryById);

export default router;