import { PrismaClient, UnwrapTuple } from "@prisma/client";
//import { serialize } from "v8";
const prisma = new PrismaClient();

//* 마이페이지 조회
const getMyPage = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return null;
  }

  const data = {
    name: user.name,
    email: user.email,
  };
  return data;
};

const pageService = {
  getMyPage,
};

export default pageService;
