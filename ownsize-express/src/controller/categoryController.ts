import { Request, Response } from "express";
import { rm, sc } from "../constants";
import { success, fail } from "../constants/response";
import categoryService from "../service/categoryService";

//* 카테고리 전체 조회
const getAllCategory = async (req: Request, res: Response) => {
  const data = await categoryService.getAllCategory();

  return res.status(sc.OK).send(success(sc.OK, rm.READ_CATEGORY_SUCCESS, data));
}

//* 카테고리 생성
const createCategory = async (req: Request, res: Response) => {
  const { categoryName, isPinCategory, image } = req.body;

  const data = await categoryService.createCategory(categoryName, isPinCategory, image);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.CREATE_CATEGORY_FAIL));
  }
  
  return res.status(sc.OK).send(success(sc.OK, rm.CREATE_CATEGORY_SUCCESS, data));
}

const categoryController = {
  getAllCategory,
  createCategory
};



export default categoryController;