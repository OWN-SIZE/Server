import { Request, Response } from "express";
import { pageService } from "../service";
import { rm, sc } from "../constants";
import { success, fail } from "../constants/response";

//* 마이페이지 조회 조회
const getMyPage = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await pageService.getMyPage(+id);

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.READ_MYPAGE_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.READ_MYPAGE_SUCCESS, data));
};

const pageController = {
  getMyPage,
};

export default pageController;
