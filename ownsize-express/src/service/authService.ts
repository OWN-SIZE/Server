import { PrismaClient } from "@prisma/client";
import jwtHandler from "../middlewares/jwtHandler";
import tokenType from "../constants/tokenType";
const prisma = new PrismaClient();
require("dotenv").config();

const jwt = require("jsonwebtoken");

//* 회원가입 및 로그인
const register = async (email: string, name: string, picture: string) => {
  const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  const accessToken = jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  console.log("accessToken: ", accessToken);

  // DB에 저장된 사람이라면 DB에 JWT token만 업데이트를 해주고,
  // DB에 없다면 JWT 토큰을 만들어주고 돌려준다.
  const user = await prisma.user.upsert({
    where: { email: email },
    update: { token: refreshToken, picture: picture }, //있으면 업데이트 (로그인시 구글 프로필 사진 업데이트)
    create: {
      name: name,
      email: email,
      picture: picture,
      token: refreshToken,
    }, //없으면 만듦
  });

  if (!user) {
    console.log("user error");
    return null;
  }

  // 생성된 토큰과 userId를 리턴
  const data = {
    userId: user.id,
    token: accessToken,
  };
  return data;
};

//* 로그아웃
const logout = async (userId: number) => {
  // refresh token 삭제
  const tokenDelete = await prisma.user.update({
    where: { id: userId },
    data: {
      token: null,
    },
  });
  //! 클라에서 응답 받으면 access token 지우고 리프레시
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

//* 엑세스 토큰 재발급 (access, refresh 둘다 만료됐을때는 실패 응답 보냄)
const newToken = async (userId: number) => {
  // DB에 저장된 refresh 토큰 확인
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    console.log("user error");
    return null;
  }
  if (!user.token) {
    console.log("user refresh token empty");
    return null;
  }

  const decodedRefresh = jwtHandler.verify(user.token);
  if (decodedRefresh === tokenType.TOKEN_EXPIRED) {
    //재로그인 필요한 경우
    return null;
  } else {
    //refresh token 유효하니까 access token 재발급
    const newAccessToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const data = {
      userId: user.id,
      token: newAccessToken,
    };
    return data;
  }
};

const authService = {
  register,
  logout,
  deleteUser,
  newToken,
};

export default authService;
