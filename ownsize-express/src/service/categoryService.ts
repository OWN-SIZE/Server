import { PrismaClient } from "@prisma/client";
import { arrayBuffer } from "stream/consumers";
const prisma = new PrismaClient();

//* 카테고리 전체 조회
const getAllCategory = async (userId: number) => {

  const data = await prisma.category.findMany({
    where:{
      userId: userId
    }
  })

  return data;
};

//* 카테고리 생성
const createCategory = async (
  categoryName: string,
  isPinCategory: boolean,
  image: string[],
  userId: number
) => {
  const data = await prisma.category.create({
    data: {
      userId: userId,
      categoryName: categoryName,
      isPinCategory: isPinCategory,
      image: image,
    },
  });

  return data;
};

//* 카테고리 삭제
const deleteCategory = async (categoryId: number, userId: number) => {
  //userId에 해당하는 allCloset 정보 가져옴
  const allClosetData = await prisma.allCloset.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  const productIdArr = [];
  for (var i = 0; i < allClosetData.length; i++) {
    productIdArr.push(Object.values(allClosetData[i])[0]);
  }

  // category 삭제 전에 중계테이블에 참조된 값 같이 삭제해야함
  for (var i = 0; i < productIdArr.length; i++) {
    await prisma.allCloset_Category.deleteMany({
      where: {
        AND: [{ categoryId: categoryId }, { productId: productIdArr[i] }],
      },
    });
  }

  await prisma.category.deleteMany({
    where: {
      AND: [{ id: categoryId }, { userId: userId }],
    },
  });
};

//* 카테고리 수정
const updateCategory = async (
  categoryId: number,
  userId: number,
  categoryName?: string,
  isPinCategory?: boolean
) => {
  const data = await prisma.category.updateMany({
    where: {
      AND: [{ id: categoryId }, { userId: userId }],
    },
    data: {
      categoryName: categoryName,
      isPinCategory: isPinCategory,
    },
  });
  return data;
};

//* 카테고리 상세 조회
const getCategoryById = async (categoryId: number, userId: number) => {
  //userId에 해당하는 allCloset 정보 가져옴
  const allClosetData = await prisma.allCloset.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });
  const productIdArr = [];
  for (var i = 0; i < allClosetData.length; i++) {
    productIdArr.push(Object.values(allClosetData[i])[0]);
  }

  const ProductId = await prisma.allCloset_Category.findMany({
    //해당 userId가 가진 전체 product중 해당 categoryId에 해당하는것만 추림
    where: {
      productId: { in: productIdArr },
      categoryId: { in: categoryId },
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
  const data = await prisma.allCloset_Category.updateMany({
    where: {
      AND: [{ categoryId: categoryId }, { productId: productId }],
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
