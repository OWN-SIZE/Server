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
  faviconUrl: string,
  userId: number
) => {
  const data = await prisma.allCloset.create({
    data: {
      userId: userId,
      productUrl: productUrl,
      image: image,
      mallName: mallName,
      productName: productName,
      size: size,
      isRecommend: isRecommend,
      faviconUrl: faviconUrl,
    },
  });

  if (isRecommend) {
    //isRecommend T이면 Recommend 테이블 내용 추가
    await prisma.recommend.create({
      data: {
        userId: userId,
        url: productUrl,
        recommendSize: size,
      },
    });
  }
  return data;
};

//* 비교 사이즈 수동 입력
const inputSize = async (
  isManual: boolean,
  manualInputNum: number,
  topOrBottom: number,
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
  if (topOrBottom === 0) {
    const data = prisma.allSizeTop.createMany({
      data: {
        isManual: isManual,
        manualInputNum: manualInputNum,
        size: size,
        topLength: topLength,
        shoulder: shoulder,
        chest: chest,
        isWidthOfTop: isWidthOfTop,
      },
    });
    return data;
  } else if (topOrBottom === 1) {
    const data = prisma.allSizeBottom.createMany({
      data: {
        isManual: isManual,
        manualInputNum: manualInputNum,
        size: size,
        bottomLength: bottomLength,
        waist: waist,
        thigh: thigh,
        rise: rise,
        hem: hem,
        isWidthOfBottom: isWidthOfBottom,
      },
    });
    return data;
  }
};

const extensionService = {
  toAllCloset,
  inputSize,
};

export default extensionService;
