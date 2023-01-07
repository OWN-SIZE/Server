import { Request, Response } from "express";
import { pageService } from "../service";
import { rm, sc } from "../constants";
import { success, fail } from "../constants/response";

//* 마이페이지 조회
const getMyPage = async (req: Request, res: Response) => {
  const data = await pageService.getMyPage();

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.READ_MYPAGE_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.READ_MYPAGE_SUCCESS, data));
};

//* 사이즈 추천 기록 조회
const getRecCount = async (req: Request, res: Response) => {
  const data = await pageService.getRecCount();

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.READ_RECCOUNT_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.READ_RECCOUNT_SUCCESS, data));
};

const pageController = {
  getMyPage,
  getRecCount,
};

export default pageController;
