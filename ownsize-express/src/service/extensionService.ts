import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* 전체 옷장에 저장
const toAllCloset = async (
    productUrl: string,
    image: string,
    mallName: string,
    productName: string,
    size: string,
    isRecommend: boolean,
    topOrBottom: number,
    faviconUrl: string,
) => {
    const data = await prisma.allCloset.create({
        data: {
            //userId: userId,
            productUrl: productUrl,
            image: image,
            mallName: mallName,
            productName: productName,
            size: size,
            isRecommend: isRecommend,
            topOrBottom: topOrBottom,
            faviconUrl: faviconUrl
        }
    });
    return data;
};


const extensionService = {
    toAllCloset,
};

export default extensionService;