import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { rm, sc } from "../constants";
import { fail } from "../constants/response";
import tokenType from "../constants/tokenType";
import jwtHandler from "./jwtHandler";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req: Request, res: Response, next: NextFunction) => {
  var token = req.header("Authorization");
  if (!token) {
    return res
      .status(sc.UNAUTHORIZED)
      .send(fail(sc.UNAUTHORIZED, rm.EMPTY_TOKEN));
  }
  const decoded = jwtHandler.verify(token); //? jwtHandler에서 만들어둔 verify로 토큰 검사

  //? 토큰 에러 분기 처리
  //401 응답->토큰재발급 API 올것
  if (decoded === tokenType.TOKEN_EXPIRED)
    return res
      .status(sc.UNAUTHORIZED)
      .send(fail(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN));
  if (decoded === tokenType.TOKEN_INVALID)
    return res
      .status(sc.UNAUTHORIZED)
      .send(fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));

  //? decode한 후 담겨있는 email을 꺼내옴
  const email: string = (decoded as JwtPayload).email;
  if (!email)
    return res
      .status(sc.UNAUTHORIZED)
      .send(fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));

  //? 얻어낸 email 을 Request Body 내 email 필드에 담고, 다음 미들웨어로 넘김( next() )
  const result = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!result) {
    //해당 email이 없는 경우
    return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.NO_USER));
  }
  req.body.userId = result.id;
  next();
};
