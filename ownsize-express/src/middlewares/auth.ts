import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { rm, sc } from "../constants";
import { fail } from "../constants/response";
import tokenType from "../constants/tokenType";
import jwtHandler from "./jwtHandler";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

export default async (req: Request, res: Response, next: NextFunction) => {
  var accessToken = req.header("Authorization");
  //var refreshToken = req.header("refreshToken");

  if (!accessToken) {
    // 로그인 안한 경우
    return res
      .status(sc.UNAUTHORIZED)
      .send(fail(sc.UNAUTHORIZED, rm.EMPTY_TOKEN));
  }
  const decoded = jwtHandler.verify(accessToken); //? jwtHandler에서 만들어둔 verify로 토큰 검사

  // refreshToken 디비에서 꺼내오는 코드 필요
  //? 토큰 에러 분기 처리
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
  var refreshToken = result.token;

  const decodedRefresh = jwtHandler.verify(refreshToken);

  if (decoded === tokenType.TOKEN_EXPIRED) {
    if (decodedRefresh === tokenType.TOKEN_EXPIRED) {
      // case1: access token과 refresh token 모두가 만료된 경우
      return res
        .status(sc.UNAUTHORIZED)
        .send(fail(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN));
    } else {
      // case2: access token은 만료됐지만, refresh token은 유효한 경우
      const userData = await prisma.user.findUnique({
        where: {
          token: refreshToken,
        },
      });
      if (!userData) {
        //해당 refreshToken 맞는 유저 없는 경우
        return res
          .status(sc.UNAUTHORIZED)
          .send(fail(sc.UNAUTHORIZED, rm.NO_USER));
      }

      const newAccessToken = jwt.sign(
        {
          email: userData.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      req.body.userId = userData.id;
      res.cookie("access", newAccessToken);
      req.cookies.access = newAccessToken;
      //next();
      //! 클라한테 어떻게 전해주지?
    }
  } else {
    // 여기부터는 access token 유효한 상태(만료되지 않음)
    if (decodedRefresh === tokenType.TOKEN_EXPIRED) {
      // case3: access token은 유효하지만, refresh token은 만료된 경우
      const newRefreshToken = jwt.sign({}, process.env.JWT_SECRET, {
        expiresIn: "14d",
      });
      /**
       * DB에 새로 발급된 refresh token 삽입하는 로직 (login과 유사)
       */
      //? decode한 후 담겨있는 email을 꺼내옴
      const email: string = (decoded as JwtPayload).email;
      if (!email)
        return res
          .status(sc.UNAUTHORIZED)
          .send(fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));

      const user = await prisma.user.update({
        where: { email: email },
        data: {
          token: refreshToken,
        },
      });
      req.body.userId = user.id;
      res.cookie("refresh", newRefreshToken);
      req.cookies.refresh = newRefreshToken;
      //next();
    } else {
      // case4: access token과 refresh token 모두가 유효한 경우

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
        return res
          .status(sc.UNAUTHORIZED)
          .send(fail(sc.UNAUTHORIZED, rm.NO_USER));
      }
      req.body.userId = result.id;
      next();
    }
  }
};
