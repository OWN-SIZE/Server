import { Router } from "express";
import { authController } from "../controller";
import { auth } from "../middlewares";

const router: Router = Router();

//* 회원가입 및 로그인 POST /auth
router.post("/", authController.register);

//* 엑세스 토큰 재발급 GET /auth/token
router.get("/token", auth, authController.newToken);

export default router;
