import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
require("dotenv").config();

const jwt = require("jsonwebtoken");

//* 회원가입 및 로그인
const register = async (email: string, name: string) => {
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

  // DB에 저장된 사람이라면 DB에 JWT token만 업데이트를 해주고,
  // DB에 없다면 JWT 토큰을 만들어주고 돌려준다.
  const user = await prisma.user.upsert({
    where: { email: email },
    update: { token: refreshToken }, //있으면 업데이트
    create: {
      name: name,
      email: email,
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
    refreshToken: refreshToken,
    accessToken: accessToken,
  };
  return data;
};

const authService = {
  register,
};

export default authService;
