import { Request, Response } from "express";
import { sizeService } from "../service";
import { rm, sc } from "../constants";
import { success, success2, fail } from "../constants/response";

//* 마이 사이즈 조회
const getMySize = async (req: Request, res: Response) => {
  const data = await sizeService.getMySize();

  return res.status(sc.OK).send(success2(sc.OK, rm.READ_MYSIZE_SUCCESS, data));
};

//* 내 상의 사이즈 정보 입력
const inputTopSize = async (req: Request, res: Response) => {
  const { topLength, shoulder, chest } = req.body;
  var chest1 = chest + "#";

  const data = await sizeService.inputTopSize(+topLength, +shoulder, chest1);

  if (!data) {
    return res
      .status(sc.OK)
      .send(success(sc.OK, rm.INSERT_MYTOPSIZE_SUCCESS, data));
  }
  return res
    .status(sc.OK)
    .send(success(sc.OK, rm.INSERT_MYTOPSIZE_SUCCESS, data)); //바꿔야함
};

const sizeController = {
  getMySize,
  inputTopSize,
};

export default sizeController;
