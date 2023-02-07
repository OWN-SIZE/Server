import { Router } from "express";
import { userController } from "../controller";

const router: Router = Router();

router.get("/:userId", userController.getUserById);

//* 수집한 이메일 조회 GET /user
router.get("/", userController.getSavedEmail);

//* 이메일 수집 (사전신청) POST /user
router.post("/", userController.saveEmail);

export default router;
