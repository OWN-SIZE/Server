import { Router } from "express";
import extensionController from "../controller/extensionController";
import { auth } from "../middlewares";

const router: Router = Router();

//* 전체 옷장에 저장 POST /extension/toAllCloset
router.post("/toAllCloset", auth, extensionController.toAllCloset);

//* 크롤링한 사이즈표 저장 POST /extension/saveCrawling
router.post("/saveCrawling", auth, extensionController.saveCrawling);

//* 사이즈 추천 결과 저장 POST /extension/saveBest
router.post("/saveBest", auth, extensionController.saveBest);

//* 비교 사이즈 수동 입력 POST /extension/inputSize
router.post("/inputSize", auth, extensionController.inputSize);

export default router;
