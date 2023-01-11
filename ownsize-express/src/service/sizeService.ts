import { PrismaClient, UnwrapTuple } from "@prisma/client";
//import { serialize } from "v8";
const prisma = new PrismaClient();

//* 마이 사이즈 조회
const getMySize = async (userId: number) => {
  const data = await prisma.mySize.findMany({
    where: {
      userId: userId,
    },
  });

  return data;
};

//* 내 상의 사이즈 정보 입력
const inputTopSize = async (
  topLength: number,
  shoulder: number,
  chest: number,
  isWidthOfTop: boolean,
  userId: number
) => {
  const data = await prisma.mySize.upsert({
    where: { userId: userId },
    update: {
      topLength: topLength,
      shoulder: shoulder,
      chest: chest,
      isWidthOfTop: isWidthOfTop,
    },
    create: {
      topLength: topLength,
      shoulder: shoulder,
      chest: chest,
      isWidthOfTop: isWidthOfTop,
    },
  });

  return data;
};

//* 내 하의 사이즈 정보 입력
const inputBottomSize = async (
  bottomLength: number,
  waist: number,
  thigh: number,
  rise: number,
  hem: number,
  isWidthOfBottom: boolean,
  userId: number
) => {
  const data = await prisma.mySize.upsert({
    where: { userId: userId },
    update: {
      bottomLength: bottomLength,
      waist: waist,
      thigh: thigh,
      rise: rise,
      hem: hem,
      isWidthOfBottom: isWidthOfBottom,
    },
    create: {
      bottomLength: bottomLength,
      waist: waist,
      thigh: thigh,
      rise: rise,
      hem: hem,
      isWidthOfBottom: isWidthOfBottom,
    },
  });

  return data;
};

const sizeService = {
  getMySize,
  inputTopSize,
  inputBottomSize,
};

export default sizeService;
