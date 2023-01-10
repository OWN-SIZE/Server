import { Router } from "express";
import { authController } from "../controller";

const router: Router = Router();

//* 회원가입 및 로그인 POST /auth
router.post("/", authController.register);

export default router;
