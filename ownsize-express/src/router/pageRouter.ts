import { Router } from "express";
import { pageController } from "../controller";

const router: Router = Router();

//* 마이페이지 조회 GET /mypage
router.get("/:id", pageController.getMyPage);

export default router;
