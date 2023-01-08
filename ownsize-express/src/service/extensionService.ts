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

//* 비교 사이즈 수동 입력
const inputSize = async (
    size: string,

    topLength: number,
    shoulder: number,
    chest: number,
    isWidthOfTop: boolean,

    bottomLength: number,
    waist: number,
    thigh: number,
    rise: number,
    hem: number,
    isWidthOfBottom: boolean
) => {
    const data = prisma.mySize.create({
        data: {
            size: size,
            
            topLength: topLength,
            shoulder: shoulder,
            chest: chest,
            isWidthOfTop: isWidthOfTop,
        
            bottomLength: bottomLength,
            waist: waist,
            thigh: thigh,
            rise: rise,
            hem: hem,
            isWidthOfBottom: isWidthOfBottom,
        
            isManual: true
        }
    })

    return data;
}

const extensionService = {
    toAllCloset,
    inputSize,
};

export default extensionService;