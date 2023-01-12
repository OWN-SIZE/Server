import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* 전체 옷장 조회
const getAllCloset = async (userId: number) => {
  const data = await prisma.allCloset.findMany({
    where: {
      userId: userId,
    },
  });

  return data;
};

//* 전체 옷장 정보 수정
const updateCloset = async (
  productId: number,
  userId: number,
  productName?: string,
  size?: string,
  memo?: string,
  isPin?: boolean
) => {
  await prisma.allCloset.updateMany({
    where: {
      AND: [{ id: productId }, { userId: userId }],
    },
    data: {
      productName: productName,
      size: size,
      memo: memo,
      isPin: isPin,
    },
  });
  const data = await prisma.allCloset.findMany({
    where: {
      AND: [{ id: productId }, { userId: userId }],
    },
    select: {
      id: true,
      productName: true,
      size: true,
      memo: true,
      mallName: true,
      isRecommend: true,
      isPin: true,
    },
  });

  return data;
};

//* 전체 옷장 의류 정보 삭제
const deleteCloset = async (productId: number, userId: number) => {
  await prisma.allCloset_Category.deleteMany({
    where: {
      productId: productId,
    },
  });
  await prisma.allCloset.deleteMany({
    where: {
      AND: [{ id: productId }, { userId: userId }],
    },
  });
};

//* 포함된 카테고리 id 조회
const getIncludingId = async (productId: number, userId: number) => {
  const data2 = await prisma.allCloset.findMany({
    where: {
      AND: [{ id: productId }, { userId: userId }],
    },
  });
  if (!data2) {
    return null;
  }

  const data = await prisma.allCloset_Category.findMany({
    where: {
      productId: productId,
    },
    select: {
      categoryId: true,
    },
  });

  const includeArr = [];

  for (var i = 0; i < data.length; i++) {
    includeArr.push(Object.values(data[i])[0]);
  }

  return includeArr;
};

//* 카테고리에 의류 추가
const toCategory = async (
  productId: number,
  categoryId: number,
  userId: number
) => {
  const data2 = await prisma.allCloset.findMany({
    where: {
      AND: [{ id: productId }, { userId: userId }],
    },
  });
  if (!data2) {
    return null;
  }
  const data = await prisma.allCloset_Category.create({
    data: {
      productId: productId,
      categoryId: categoryId,
    },
  });

  return data;
};

const closetService = {
  getAllCloset,
  updateCloset,
  deleteCloset,
  getIncludingId,
  toCategory,
};

export default closetService;
