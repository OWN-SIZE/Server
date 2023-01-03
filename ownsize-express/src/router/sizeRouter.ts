import { Router } from "express";
import { sizeController } from "../controller";

const router: Router = Router();

//* 마이 사이즈 조회 GET /mysize
router.get("/", sizeController.getMySize);

//* 내 상의 사이즈 정보 입력 POST /mysize/topSize
router.get("/topSize", sizeController.inputTopSize);

export default router;
