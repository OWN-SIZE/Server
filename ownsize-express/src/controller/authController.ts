import { Request, Response } from "express";
import { authService } from "../service";
import { rm, sc } from "../constants";
import { success, fail } from "../constants/response";

const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

//* 회원가입 및 로그인
const register = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  const data = await authService.register(email, name);

  if (!data) {
    //JWT 토큰 안만들어진 경우
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SIGNIN_FAIL)); //로그인 실패
  }
  return res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, data)); // 로그인 성공
};

const authController = {
  register,
};

export default authController;
