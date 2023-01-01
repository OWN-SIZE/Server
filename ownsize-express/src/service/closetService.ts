import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* 전체 옷장 조회
const getAllCloset = async () => {
    const data = await prisma.allCloset.findMany();
  
    return data;
};

const closetService = {
    getAllCloset,
};

export default closetService;