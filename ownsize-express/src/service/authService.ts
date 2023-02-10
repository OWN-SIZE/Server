import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
require("dotenv").config();

const jwt = require("jsonwebtoken");

//* 회원가입 및 로그인
const register = async (email: string, name: string) => {
  const token = jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET
  );

  // DB에 저장된 사람이라면 DB에 JWT token만 업데이트를 해주고,
  // DB에 없다면 JWT 토큰을 만들어주고 돌려준다.
  const user = await prisma.user.upsert({
    where: { email: email },
    update: { token: token }, //있으면 업데이트
    create: {
      name: name,
      email: email,
      token: token,
    }, //없으면 만듦
  });

  if (!user) {
    console.log("user error");
    return null;
  }

  //유저 등록 시 해당 유저의 mysize 입력칸 생성
  // await prisma.mySize.create({
  //   data: {
  //     userId: user.id,
  //     topLength: null,
  //     shoulder: null,
  //     chest: null,
  //     isWidthOfTop: null,
  //     bottomLength: null,
  //     waist: null,
  //     thigh: null,
  //     rise: null,
  //     hem: null,
  //     isWidthOfBottom: null,
  //   },
  // });

  // 생성된 토큰과 userId를 리턴
  const data = {
    userId: user.id,
    token: token,
  };
  return data;
};

//* 로그아웃
const logout = async (userId: number) => {
  // const user = await prisma.user.findUnique({
  //   where: { id: userId },
  // });

  // if (!user) {
  //   console.log("user error");
  //   return null;
  // }

  // refresh token 삭제
  const tokenDelete = await prisma.user.update({
    where: { id: userId },
    data: {
      token: null,
    },
  });
  //! access token은 어떻게 지우지? 클라에서 응답 받으면 access token 지우는 방식?

  return tokenDelete;
};

//* 회원 탈퇴
const deleteUser = async (userId: number) => {
  await prisma.recommend.deleteMany({
    where: { id: userId },
  });

  await prisma.allSizeTop.deleteMany({
    where: { id: userId },
  });

  await prisma.allSizeBottom.deleteMany({
    where: { id: userId },
  });

  await prisma.allCloset_Category.deleteMany({
    where: { id: userId },
  });

  await prisma.allCloset.deleteMany({
    where: { id: userId },
  });

  await prisma.category.deleteMany({
    where: { id: userId },
  });

  await prisma.mySize.deleteMany({
    where: { id: userId },
  });

  const data = await prisma.user.delete({
    where: { id: userId },
  });

  return data;
};

const authService = {
  register,
  logout,
  deleteUser,
};

export default authService;
