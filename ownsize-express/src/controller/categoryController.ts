import { UnwrapTuple } from '@prisma/client';
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
  
  return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_CATEGORY_SUCCESS, data));
}

//* 카테고리 삭제
const deleteCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  await categoryService.deleteCategory(+categoryId);

  return res.status(sc.OK).send(success(sc.OK, rm.DELETE_CATEGORY_SUCCESS));
}

//* 카테고리 수정
const updateCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { categoryName } = req.body;

  if (!categoryId || !categoryName) {
    return res
      .status(sc.BAD_REQUEST)
      .send(fail(sc.BAD_REQUEST, rm.UPDATE_INFO_ERROR));
  }

  const data = await categoryService.updateCategory(+categoryId, categoryName);

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.CATEGORY_UPDATE_FAIL));
  }

  return res
    .status(sc.CREATED)
    .send(success(sc.CREATED, rm.CATEGORY_UPDATE_SUCCESS, data));

}

//* 카테고리 상세 조회
const getCategoryById = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  const data = await categoryService.getCategoryById(+categoryId);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.READ_CATEGORY_DETAIL_FAIL));
  }
  
  return res.status(sc.OK).send(success(sc.OK, rm.READ_CATEGORY_DETAIL_SUCCESS, data));
}

//* 카테고리 내 의류 삭제
const deleteInCategory = async (req: Request, res: Response) => {
  const {categoryId, productId} = req.params;

  await categoryService.deleteInCategory(+categoryId, +productId);

  return res.status(sc.OK).send(success(sc.OK, rm.DELETE_INCATEGORY_ITEM_SUCCESS));
}

const categoryController = {
  getAllCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
  deleteInCategory
};



export default categoryController;