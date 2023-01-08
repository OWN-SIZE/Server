import { Router } from "express";
import extensionController from "../controller/extensionController";

const router: Router = Router();

//* 전체 옷장에 저장 POST /extension/toALlCloset
router.post("/toAllCloset", extensionController.toAllCloset);

export default router;
