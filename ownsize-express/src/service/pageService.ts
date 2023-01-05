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
  };
  return data;
};

const pageService = {
  getMyPage,
};

export default pageService;
