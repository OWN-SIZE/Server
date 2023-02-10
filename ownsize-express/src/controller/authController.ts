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

//* 로그아웃
const logout = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const data = await authService.logout(+userId);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.LOGOUT_FAIL)); //로그아웃 실패(유저가 없거나 update 실패)
  }
  return res.status(sc.OK).send(success(sc.OK, rm.LOGOUT_SUCCESS, data)); // 로그아웃 성공
};

//* 회원 탈퇴
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const data = await authService.deleteUser(+userId);

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.DELETE_USER_FAIL)); //회원탈퇴 실패(유저가 없거나 delete 실패)
  }
  return res.status(sc.OK).send(success(sc.OK, rm.DELETE_USER_SUCCESS, data)); // 회원탈퇴 성공
};

const authController = {
  register,
  logout,
  deleteUser,
};

export default authController;
