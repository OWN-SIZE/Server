import { Request, Response } from "express";
import { rm, sc } from "../constants";
import { success, fail } from "../constants/response";
import categoryService from "../service/categoryService";

//* 카테고리 전체 조회
const getAllCategory = async (req: Request, res: Response) => {
  const data = await categoryService.getAllCategory();

  return res.status(sc.OK).send(success(sc.OK, rm.READ_CATEGORY_SUCCESS, data));
}

const categoryController = {
  getAllCategory,
};

export default categoryController;