import { Router } from "express";
import extensionController from "../controller/extensionController";

const router: Router = Router();

//* 전체 옷장에 저장 POST /extension/toAllCloset
router.post("/toAllCloset", extensionController.toAllCloset);

//* 비교 사이즈 수동 입력 POST /extension/inputSize
router.post("/inputSize", extensionController.inputSize);

export default router;
