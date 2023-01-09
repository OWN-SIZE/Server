import { Router } from "express";
import { pageController } from "../controller";

const router: Router = Router();

//* 마이페이지 조회 GET /myPage
router.get("/", pageController.getMyPage);

//* 사이즈 추천 기록 조회 GET /myPage/history
router.get("/history", pageController.getRecCount);

export default router;
