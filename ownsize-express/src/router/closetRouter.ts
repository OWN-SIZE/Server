import { Router } from "express";
import { closetController } from "../controller";
import { auth } from "../middlewares";

const router: Router = Router();

//* 전체 옷장 조회 GET /allCloset
router.get("/", auth, closetController.getAllCloset);

//* 전체 옷장 내 의류 정보 수정 PUT /allCloset/:productId
router.put("/:productId", auth, closetController.updateCloset);

//* 전체 옷장 내 의류 정보 삭제 DELETE /allCloset/:productId
router.delete("/:productId", auth, closetController.deleteCloset);

//* 포함된 카테고리 id 조회 GET /allCloset/:productId
router.get("/:productId", auth, closetController.getIncludingId);

//* 카테고리에 의류 추가 POST /allCloset/toCategory
router.post("/toCategory", auth, closetController.toCategory);

export default router;
