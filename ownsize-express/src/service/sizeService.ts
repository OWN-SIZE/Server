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
  chest: String
) => {
  const data = await prisma.mySize.create({
    data: {
      topLength,
      shoulder,
      chest,
    },
  });

  return data;
};

const sizeService = {
  getMySize,
  inputTopSize,
};

export default sizeService;
