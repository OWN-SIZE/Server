import { Request, Response } from "express";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router: Router = Router();

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client("구글 클라이언트 id");
//const connection = require("../db/mysql");
import jwt from "jsonwebtoken";

const JWT_SECRET = "secretKey121212";

router.post("/login", (req: Request, res: Response) => {
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.body.it,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"]; //21자리의 Google 회원 id 번호

    let token;
    const result = await prisma.user.findUnique({
      where: {
        id: userid,
      },
    });
    if (result) {
      console.log("DB에 있는 유저", result);
      token = updateToken(payload);
    } else {
      console.log("DB에 없는 유저");
      //새로 유저를 만들면 jwt 토큰값을 받아온다.
      token = insertUserIntoDB(payload);
    }
    res.send({
      token,
    });
  }
  verify()
    .then(() => {})
    .catch(console.error);
});

const updateToken = async (payload: { sub: any; name: any; email: any }) => {
  const { sub, name, email } = payload;
  console.log(`id: ${sub}\n name:${name}\n, email:${email}`);
  const token = jwt.sign(
    {
      id: sub,
      name,
      email,
    },
    JWT_SECRET
  );

  const data = await prisma.user.update({
    where: {
      id: sub,
    },
    data: {
      token: token,
    },
  });

  return token;
};

const insertUserIntoDB = async (payload: {
  sub: any;
  name: any;
  email: any;
}) => {
  const { sub, name, email } = payload;
  console.log(`id: ${sub}\n name:${name}\n, email:${email}`);
  const token = jwt.sign(
    {
      id: sub,
      name,
      email,
    },
    JWT_SECRET
  );

  const data = await prisma.user.create({
    data: {
      id: sub,
      email,
      name,
      token,
    },
  });

  return token;
};
