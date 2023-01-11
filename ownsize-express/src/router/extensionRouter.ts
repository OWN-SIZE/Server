import { Router } from "express";
import extensionController from "../controller/extensionController";

const router: Router = Router();

//* 전체 옷장에 저장 POST /extension/toALlCloset
router.post("/toAllCloset", extensionController.toAllCloset);

//* 사이즈 추천 결과 조회 GET /extension/bestSize


//* 사이즈 추천 결과 저장 POST /extension/saveBest
router.post("/saveBest", extensionController.saveBest);

//* 비교 사이즈 수동 입력 POST /extension/inputSize
router.post("/inputSize", extensionController.inputSize);
 
export default router;
