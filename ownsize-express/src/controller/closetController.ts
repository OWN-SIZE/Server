import { Request, Response } from "express";
import { closetService }  from "../service";
import { rm, sc } from "../constants";
import { success, fail } from "../constants/response";

//* 전체 옷장 조회
const getAllCloset = async (req: Request, res: Response) => {
  const data = await closetService.getAllCloset();

  return res.status(sc.OK).send(success(sc.OK, rm.READ_ALLCLOSET_SUCCESS, data));
}

//* 전체 옷장 정보 수정
const updateCloset = async (req: Request, res: Response) => {
  const { productName, size, memo, isPin } = req.body;
  const { productId } = req.params;

  if (!productId || (!productName && !size && !memo && !isPin)) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.ALLCLOSET_INFO_ERROR));
  }

  const data = await closetService.updateCloset(+productId, productName, size, memo, isPin);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.UPDATE_ALLCLOSET_FAIL));
  }
  
  return res.status(sc.CREATED).send(success(sc.CREATED, rm.UPDATE_ALLCLOSET_SUCCESS, data));
}

const deleteCloset = async (req: Request, res: Response) => {
  const { productId } = req.params;

  await closetService.deleteCloset(+productId);

  return res.status(sc.OK).send(success(sc.OK, rm.DELETE_ALLCLOSET_SUCCESS));
}

const closetController = {
  getAllCloset,
  updateCloset,
  deleteCloset,
};

export default closetController;
