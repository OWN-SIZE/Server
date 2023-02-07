import { Request, Response } from "express";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import { userService } from "../service";

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await userService.getUserById(+userId);

  if (!data) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }
  return res.status(200).json({ status: 200, message: "유저 조회 성공", data });
};

//* 수집한 이메일 조회
const getSavedEmail = async (req: Request, res: Response) => {

  const data = await userService.getSavedEmail();

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.READ_SAVED_EMAIL_FAIL));
  }
  return res
    .status(sc.OK)
    .send(success(sc.OK, rm.READ_SAVED_EMAIL_SUCCESS, data));
};

//* 이메일 수집
const saveEmail = async (req: Request, res: Response) => {
  const {email} = req.body;

  const data = await userService.saveEmail(email);

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(fail(sc.NOT_FOUND, rm.SAVE_EMAIL_FAIL));
  }
  return res
    .status(sc.CREATED)
    .send(success(sc.CREATED, rm.SAVE_EMAIL_SUCCESS, data));
}


const userController = {
  getUserById,
  saveEmail,
  getSavedEmail
};

export default userController;
