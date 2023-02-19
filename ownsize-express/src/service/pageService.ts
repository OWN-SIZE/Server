import { PrismaClient, UnwrapTuple } from "@prisma/client";
const prisma = new PrismaClient();

//* 마이페이지 조회
const getMyPage = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId, //jwt 토큰에 맞는 user찾음
    },
  });

  if (!user) {
    return null;
  }

  const data = {
    name: user.name,
    email: user.email,
    picture: user.picture,
    isAlreadyUser: user.isAlreadyUser,
  };
  return data;
};

//* 사이즈 추천 기록 조회
const getRecCount = async (userId: number) => {
  const recCount = await prisma.recommend.count({
    where: {
      userId: userId,
    },
  });

  // null값 - 으로 변환
  await prisma.recommend.updateMany({
    where: {
      AND: [{ recommendSize: null }, { userId: userId }],
    },
    data: {
      recommendSize: "-",
    },
  });

  const recData = await prisma.recommend.findMany({
    where: {
      userId: userId,
    },
    select: {
      userId: true,
      url: true,
      recommendSize: true,
    },
  });

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
