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
  userId: number,
  isAlreadyUser: string
) => {
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      isAlreadyUser: isAlreadyUser
    }
  })

  const data = await prisma.mySize.upsert({
    where: {
      userId: userId,
    },
    create: {
      userId: userId,
      topLength: topLength,
      shoulder: shoulder,
      chest: chest,
      isWidthOfTop: isWidthOfTop,
      bottomLength: null,
      waist: null,
      thigh: null,
      rise: null,
      hem: null,
      isWidthOfBottom: null,
    },
    update: {
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
  userId: number,
  isAlreadyUser: string
) => {
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      isAlreadyUser: isAlreadyUser
    }
  })

  const data = await prisma.mySize.upsert({
    where: {
      userId: userId,
    },
    create: {
      userId: userId,
      topLength: null,
      shoulder: null,
      chest: null,
      isWidthOfTop: null,
      bottomLength: bottomLength,
      waist: waist,
      thigh: thigh,
      rise: rise,
      hem: hem,
      isWidthOfBottom: isWidthOfBottom,
    },
    update: {
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

//* 내 상의 사이즈 정보 수정
const fixTopSize = async (
  topLength: number,
  shoulder: number,
  chest: number,
  isWidthOfTop: boolean,
  userId: number,
) => {
  const data = await prisma.mySize.update({
    where: {
      userId: userId,
    },
    data: {
      topLength: topLength,
      shoulder: shoulder,
      chest: chest,
      isWidthOfTop: isWidthOfTop,
    },
  });

  return data;
};

//* 내 하의 사이즈 정보 수정
const fixBottomSize = async (
  bottomLength: number,
  waist: number,
  thigh: number,
  rise: number,
  hem: number,
  isWidthOfBottom: boolean,
  userId: number,
) => {
  const data = await prisma.mySize.update({
    where: {
      userId: userId,
    },
    data: {
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
  fixTopSize,
  fixBottomSize,
};

export default sizeService;
