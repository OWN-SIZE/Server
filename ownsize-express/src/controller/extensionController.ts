import { Request, Response } from "express";
import { rm, sc } from "../constants";
import { success, fail } from "../constants/response";
import extensionService from "../service/extensionService";

//* 전체 옷장에 저장
const toAllCloset = async (req: Request, res: Response) => {
    const { productUrl, image, mallName, productName, size, isRecommend, faviconUrl } = req.body;
    
    const data = await extensionService
                        .toAllCloset(
                            productUrl, 
                            image, 
                            mallName, 
                            productName, 
                            size,
                            isRecommend, 
                            faviconUrl,
                            //userId
                        );

    if (!data) {
        return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.TOALLCLOSET_FAIL));
    }
    return res.status(sc.CREATED).send(success(sc.CREATED, rm.TOALLCLOSET_SUCCESS, data));
}

//* 사이즈 추천 결과 저장
const saveBest = async (req: Request, res: Response) => {
    const {userId, topOrBottom, url, topItemId, bottomItemId} = req.body;

    // if (!userId || !topOrBottom) {
    //     return res
    //     .status(sc.BAD_REQUEST)
    //     .send(fail(sc.BAD_REQUEST, rm.BESTSIZE_INFO_ERROR));
    //   }
    
    const data = await extensionService.saveBest(+userId, topOrBottom, url, +topItemId, +bottomItemId);
    
    if (!data) {
        return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.BESTSIZE_SAVE_FAIL));
      }

    return res
        .status(sc.CREATED)
        .send(success(sc.CREATED, rm.BESTSIZE_SAVE_SUCCESS, data));
}

//* 비교 사이즈 수동 입력
const inputSize = async (req: Request, res: Response) => {
    const {isManual, manualInputNum, topOrBottom, size, topLength, shoulder, chest, isWidthOfTop, bottomLength, waist, thigh, rise, hem, isWidthOfBottom} = req.body;

    const data = await extensionService
                        .inputSize(
                            isManual,
                            manualInputNum,
                            topOrBottom,
                            size, 
                            topLength, 
                            shoulder, 
                            chest, 
                            isWidthOfTop, 
                            bottomLength, 
                            waist, 
                            thigh, 
                            rise, 
                            hem, 
                            isWidthOfBottom
                        );

    if (!data) {
        return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.INPUT_MANUALLY_FAIL));
    }
    return res.status(sc.CREATED).send(success(sc.CREATED, rm.INPUT_MANUALLY_SUCCESS, data));
}

const extensionController = {
  toAllCloset,
  inputSize,
  saveBest,
};

export default extensionController;