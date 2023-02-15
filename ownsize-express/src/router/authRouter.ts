import { Router } from "express";
import { authController } from "../controller";
import { auth } from "../middlewares";

const router: Router = Router();

//* 회원가입 및 로그인 POST /auth
router.post("/", authController.register);

//* 로그아웃 POST /auth/logout
router.post("/logout", authController.logout);

//* 회원 탈퇴 DELETE /auth
router.delete("/", authController.deleteUser);
//* 엑세스 토큰 재발급 GET /auth/token

router.get("/token", auth, authController.newToken);

export default router;
