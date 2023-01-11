import { PrismaClient } from "@prisma/client";
import { arrayBuffer } from "stream/consumers";
const prisma = new PrismaClient();

//* 카테고리 전체 조회
const getAllCategory = async () => {
  const data = await prisma.category.findMany();

  return data;
};

//* 카테고리 생성
const createCategory = async (
  categoryName: string,
  isPinCategory: boolean,
  image: string[]
) => {
  const data = await prisma.category.create({
    data: {
      categoryName: categoryName,
      isPinCategory: isPinCategory,
      image: image,
    },
  });

  return data;
};

//* 카테고리 삭제
const deleteCategory = async (categoryId: number) => {
  // category 삭제 전에 중계테이블에 참조된 값 같이 삭제해야함
  await prisma.allCloset_Category.deleteMany({
    where: {
      categoryId: categoryId,
    },
  });

  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
};

//* 카테고리 수정
const updateCategory = async (categoryId: number, categoryName: string, isPinCategory: boolean) => {
  const data = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      categoryName: categoryName,
      isPinCategory: isPinCategory
    },
  });
  return data;
};

//* 카테고리 상세 조회
const getCategoryById = async (categoryId: number) => {
  const ProductId = await prisma.allCloset_Category.findMany({
    where: {
      categoryId: categoryId,
    },
    select: {
      productId: true,
    },
  });

  const allClosetArr = [];

  for (var i = 0; i < ProductId.length; i++) {
    allClosetArr.push(Object.values(ProductId[i])[0]);
  }

  const data = await prisma.allCloset.findMany({
    where: {
      id: { in: allClosetArr },
    },
  });

  return data;
};

//* 카테고리 내 의류 핀 고정/해제
const pinItem = async (
  categoryId: number,
  productId: number,
  isInPin: boolean
) => {
  const ProductId = await prisma.allCloset_Category.findMany({
    where: {
      AND: [{ categoryId: categoryId }, { productId: productId }],
    },
    select: {
      productId: true,
    },
  });

  const data = await prisma.allCloset.update({
    where: {
      id: Object.values(ProductId[0])[0],
    },
    data: {
      isInPin: isInPin,
    },
  });

  return data;
};

//* 카테고리 내 의류 삭제
const deleteInCategory = async (categoryId: number, productId: number) => {
  await prisma.allCloset_Category.deleteMany({
    where: {
      AND: [{ categoryId: categoryId }, { productId: productId }],
    },
  });
};

const categoryService = {
  getAllCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
  pinItem,
  deleteInCategory,
};

export default categoryService;
