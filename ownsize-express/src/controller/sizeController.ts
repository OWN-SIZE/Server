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
  const { topLength, shoulder, chest, isWidthOfTop, userId } = req.body;

  const data = await sizeService.inputTopSize(
    +topLength,
    +shoulder,
    +chest,
    isWidthOfTop,
    +userId
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
  const { bottomLength, waist, thigh, rise, hem, isWidthOfBottom, userId } =
    req.body;

  const data = await sizeService.inputBottomSize(
    +bottomLength,
    +waist,
    +thigh,
    +rise,
    +hem,
    isWidthOfBottom,
    +userId
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

const sizeController = {
  getMySize,
  inputTopSize,
  inputBottomSize,
};

export default sizeController;
