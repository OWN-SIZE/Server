import { Router } from "express";
import { pageController } from "../controller";
import { auth } from "../middlwares";

const router: Router = Router();

//* 마이페이지 조회 GET /myPage
router.get("/", auth, pageController.getMyPage);

//* 사이즈 추천 기록 조회 GET /myPage/history
router.get("/history", auth, pageController.getRecCount);

export default router;
