import { Router } from "express";
import { sizeController } from "../controller";
import { auth } from "../middlewares";

const router: Router = Router();

//* 마이 사이즈 조회 GET /mySize
router.get("/", auth, sizeController.getMySize);

//* 내 상의 사이즈 정보 입력(회원가입시) POST /mySize/topSize
router.post("/topSize", auth, sizeController.inputTopSize);

//* 내 하의 사이즈 정보 입력(회원가입시) POST /mySize/bottomSize
router.post("/bottomSize", auth, sizeController.inputBottomSize);

//* 내 상의 사이즈 정보 수정 PUT /mySize/topSize
router.put("/top/:userId", auth, sizeController.fixTopSize);

//* 내 하의 사이즈 정보 수정 PUT /mySize/bottomSize
router.put("/bottom/:userId", auth, sizeController.fixBottomSize);

export default router;
