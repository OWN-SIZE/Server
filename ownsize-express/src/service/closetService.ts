import { PrismaClient } from "@prisma/client";
import { serialize } from "v8";
const prisma = new PrismaClient();

//* 전체 옷장 조회
const getAllCloset = async () => {
    const data = await prisma.allCloset.findMany();
  
    return data;
};

//* 전체 옷장 정보 수정
const updateCloset = async (productId: number, productName?: string, size?: string, memo?: string, isPin?: boolean) => {
    const data = await prisma.allCloset.update({
        where: {
            id: productId
        },
        data: {
            productName: productName,
            size: size,
            memo: memo,
            isPin: isPin
        }
    });

    return data;
}

const closetService = {
    getAllCloset,
    updateCloset,
};

export default closetService;