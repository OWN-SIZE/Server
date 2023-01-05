import { Router } from "express";
import { sizeController } from "../controller";

const router: Router = Router();

//* 마이 사이즈 조회 GET /mySize
router.get("/", sizeController.getMySize);

//* 내 상의 사이즈 정보 입력 POST /mySize/topSize
router.post("/topSize", sizeController.inputTopSize);

//* 내 하의 사이즈 정보 입력 POST /mySize/bottomSize
router.post("/bottomSize", sizeController.inputBottomSize);

export default router;
