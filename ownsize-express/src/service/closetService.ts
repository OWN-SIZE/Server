import { PrismaClient } from "@prisma/client";
import { serialize } from "v8";
const prisma = new PrismaClient();

//* 전체 옷장 조회
const getAllCloset = async () => {
    const data = await prisma.allCloset.findMany();
  
    return data;
};

//* 전체 옷장 의류 정보 수정
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

//* 전체 옷장 의류 정보 삭제
const deleteCloset = async (productId: number) => {
    await prisma.allCloset.delete({
      where: {
        id: productId  
      }
    });
}


const closetService = {
    getAllCloset,
    updateCloset,
    deleteCloset,

};

export default closetService;