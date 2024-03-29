import { Request, Response } from "express";
import { sizeService } from "../service";
import { rm, sc } from "../constants";
import { success, success2, fail } from "../constants/response";

//* 마이 사이즈 조회
const getMySize = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const data = await sizeService.getMySize(+userId);

  return res.status(sc.OK).send(success2(sc.OK, rm.READ_MYSIZE_SUCCESS, data));
};

//* 내 상의 사이즈 정보 입력
const inputTopSize = async (req: Request, res: Response) => {
  const { topLength, shoulder, chest, isWidthOfTop, userId, isAlreadyUser } = req.body;

  const data = await sizeService.inputTopSize(
    parseFloat(topLength),
    parseFloat(shoulder),
    parseFloat(chest),
    isWidthOfTop,
    parseFloat(userId),
    isAlreadyUser
  );

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.INSERT_MYTOPSIZE_FAIL));
  }
  return res
    .status(sc.CREATED)
    .send(success(sc.CREATED, rm.INSERT_MYTOPSIZE_SUCCESS, data));
};

//* 내 하의 사이즈 정보 입력
const inputBottomSize = async (req: Request, res: Response) => {
  const { bottomLength, waist, thigh, rise, hem, isWidthOfBottom, userId, isAlreadyUser } =
    req.body;

  const data = await sizeService.inputBottomSize(
    parseFloat(bottomLength),
    parseFloat(waist),
    parseFloat(thigh),
    parseFloat(rise),
    parseFloat(hem),
    isWidthOfBottom,
    parseFloat(userId),
    isAlreadyUser
  );

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.INSERT_MYBOTTOMSIZE_FAIL));
  }
  return res
    .status(sc.CREATED)
    .send(success(sc.CREATED, rm.INSERT_MYBOTTOMSIZE_SUCCESS, data));
};

//* 내 상의 사이즈 정보 수정
const fixTopSize = async (req: Request, res: Response) => {
  const { topLength, shoulder, chest, isWidthOfTop, userId } = req.body;

  const data = await sizeService.fixTopSize(
    parseFloat(topLength),
    parseFloat(shoulder),
    parseFloat(chest),
    isWidthOfTop,
    parseFloat(userId)
  );

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.UPDATE_MYTOPSIZE_FAIL));
  }
  return res
    .status(sc.CREATED)
    .send(success(sc.CREATED, rm.UPDATE_MYTOPSIZE_SUCCESS, data));
};

//* 내 하의 사이즈 정보 수정
const fixBottomSize = async (req: Request, res: Response) => {
  const { bottomLength, waist, thigh, rise, hem, isWidthOfBottom, userId } =
    req.body;

  const data = await sizeService.fixBottomSize(
    parseFloat(bottomLength),
    parseFloat(waist),
    parseFloat(thigh),
    parseFloat(rise),
    parseFloat(hem),
    isWidthOfBottom,
    parseFloat(userId)
  );

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.UPDATE_MYBOTTOMSIZE_FAIL));
  }
  return res
    .status(sc.CREATED)
    .send(success(sc.CREATED, rm.UPDATE_MYBOTTOMSIZE_SUCCESS, data));
};

const sizeController = {
  getMySize,
  inputTopSize,
  inputBottomSize,
  fixTopSize,
  fixBottomSize,
};

export default sizeController;
