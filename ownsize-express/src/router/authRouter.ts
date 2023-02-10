import { Router } from "express";
import { authController } from "../controller";

const router: Router = Router();

//* 회원가입 및 로그인 POST /auth
router.post("/", authController.register);

//* 로그아웃 POST /auth/logout
router.post("/logout", authController.logout);

//* 회원 탈퇴 DELETE /auth
router.delete("/", authController.deleteUser);

export default router;
