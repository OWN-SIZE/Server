import { PrismaClient, UnwrapTuple } from "@prisma/client";
//import { serialize } from "v8";
const prisma = new PrismaClient();

//* 마이페이지 조회
const getMyPage = async () => {
  const user = await prisma.user.findMany();

  if (!user) {
    return null;
  }

  const data = {
    name: user[0].name,
    email: user[0].email,
    userImage: user[0].userImage,
  };
  return data;
};

//* 사이즈 추천 기록 조회
const getRecCount = async () => {
  const recCount = await prisma.recommend.count();

  const recData = await prisma.recommend.findMany();

  const data = {
    recCount,
    recData,
  };

  return data;
};

const pageService = {
  getMyPage,
  getRecCount,
};

export default pageService;
