import { Router } from "express";
import { categoryController } from "../controller";
import { auth } from "../middlewares";

const router: Router = Router();

//* 카테고리 전체 조회 GET /category
router.get("/", auth, categoryController.getAllCategory);

//* 카테고리 생성 POST /category/createCategory
router.post("/createCategory", auth, categoryController.createCategory);

//* 카테고리 삭제 DELETE /category/:categoryId
router.delete("/:categoryId", auth, categoryController.deleteCategory);

//* 카테고리 수정 PUT /category/:categoryId
router.put("/:categoryId", auth, categoryController.updateCategory);

//* 카테고리 상세 조회 GET /category/:categoryId
router.get("/:categoryId", auth, categoryController.getCategoryById);

//* 카테고리 내 의류 핀 고정/해제 PUT /category/:categoryId/:productId
router.put("/:categoryId/:productId", auth, categoryController.pinItem);

//* 카테고리 내 의류 삭제 DELETE /category/:categoryId/:productId
router.delete(
  "/:categoryId/:productId",
  auth,
  categoryController.deleteInCategory
);

export default router;
