import { Router } from "express";
import { closetController } from "../controller";

const router: Router = Router();

//* 전체 옷장 조회 GET /allCloset
router.get("/", closetController.getAllCloset);

//* 전체 옷장 의류 정보 수정 PUT /allCloset/:productId
router.put("/:productId", closetController.updateCloset);

//* 전체 옷장 의류 정보 삭제 DELETE /allCloset/:productId
router.delete("/:productId", closetController.deleteCloset);

export default router;