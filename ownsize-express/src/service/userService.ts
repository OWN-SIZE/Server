import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* userId로 유저 조회
const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

//* 수집한 이메일 리스트 조회
const getSavedEmail = async () => {
  const data = await prisma.user.findMany({
    where: {
      name: null,
      userImage: null,
      token: null,
      isUser: false
    },
  });

  return data;
};

//* 이메일 수집
const saveEmail = async (email: string) => {
  const data = await prisma.user.create({
    data: {
      name: null,
      email: email,
      userImage: null,
      token: null,
      isUser: false
    }
  });

  return data;
};

const userService = {
  getUserById,
  saveEmail,
  getSavedEmail
};

export default userService;
