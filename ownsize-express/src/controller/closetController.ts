import { Request, Response } from "express";
import { closetService } from "../service";
import { rm, sc } from "../constants";
import { success, fail } from "../constants/response";

//* 전체 옷장 조회
const getAllCloset = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const data = await closetService.getAllCloset(+userId);

  return res
    .status(sc.OK)
    .send(success(sc.OK, rm.READ_ALLCLOSET_SUCCESS, data));
};

//* 전체 옷장 내 의류 정보 수정
const updateCloset = async (req: Request, res: Response) => {
  const { productName, size, memo, isPin, isRecommend, userId } = req.body;
  const { productId } = req.params;

  if (!productId && (! isRecommend || !productName || !size || !memo || !isPin)) {
    return res
      .status(sc.BAD_REQUEST)
      .send(fail(sc.BAD_REQUEST, rm.ALLCLOSET_INFO_ERROR));
  }

  const data = await closetService.updateCloset(
    +productId,
    +userId,
    productName,
    size,
    memo,
    isPin,
    isRecommend
  );

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.UPDATE_ALLCLOSET_FAIL));
  }

  return res
    .status(sc.CREATED)
    .send(success(sc.CREATED, rm.UPDATE_ALLCLOSET_SUCCESS, data));
};

//* 전체 옷장 내 의류 정보 삭제
const deleteCloset = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { userId } = req.body;

  await closetService.deleteCloset(+productId, +userId);

  return res.status(sc.OK).send(success(sc.OK, rm.DELETE_ALLCLOSET_SUCCESS));
};

//* 포함된 카테고리 id 조회
const getIncludingId = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { userId } = req.body;

  if (!productId) {
    return res
      .status(sc.BAD_REQUEST)
      .send(fail(sc.BAD_REQUEST, rm.PRODUCTID_INFO_ERROR));
  }

  const data = await closetService.getIncludingId(+productId, +userId);

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.READ_INCLUDINGID_FAIL));
  }

  return res
    .status(sc.OK)
    .send(success(sc.OK, rm.READ_INCLUDINGID_SUCCESS, data));
};

//* 카테고리에 의류 추가
const toCategory = async (req: Request, res: Response) => {
  const { productId, categoryId, userId } = req.body;

  if (!productId || !categoryId) {
    return res
      .status(sc.BAD_REQUEST)
      .send(fail(sc.BAD_REQUEST, rm.TOCATEGORY_INFO_ERROR));
  }

  const data = await closetService.toCategory(+productId, +categoryId, +userId);

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.TOCATEGORY_FAIL));
  }

  return res
    .status(sc.CREATED)
    .send(success(sc.CREATED, rm.TOCATEGORY_SUCCESS, data));
};

const closetController = {
  getAllCloset,
  updateCloset,
  deleteCloset,
  getIncludingId,
  toCategory,
};

export default closetController;
