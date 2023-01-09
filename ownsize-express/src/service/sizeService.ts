import { PrismaClient, UnwrapTuple } from "@prisma/client";
//import { serialize } from "v8";
const prisma = new PrismaClient();

//* 마이 사이즈 조회
const getMySize = async () => {
  const data = await prisma.mySize.findMany();

  return data;
};

//* 내 상의 사이즈 정보 입력
const inputTopSize = async (
  topLength: number,
  shoulder: number,
  chest: number,
  isWidthOfTop: boolean
) => {
  const data = await prisma.mySize.create({
    data: {
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
  hem: number
) => {
  const data = await prisma.mySize.create({
    data: {
      bottomLength,
      waist,
      thigh,
      rise,
      hem,
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
