import { Request, Response } from "express";
import { closetService }  from "../service";

//* 전체 옷장 조회
const getAllCloset = async (req: Request, res: Response) => {
  const data = await closetService.getAllCloset();

  return res.status(200).json({ status: 200, message: "전체 옷장 조회 조회 성공", data });
};

const closetController = {
  getAllCloset,
};

export default closetController;
