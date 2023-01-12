import { PrismaClient } from "@prisma/client";
import { ReadableStreamDefaultReader } from "node:stream/web";
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
  userId: number,
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
      createdAt: String(Date.now())
    }
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

//* 크롤링한 사이즈표 저장
const saveCrawling = async (
  sizes: [
    {
      isManual: boolean,
      manualInputNum: number,
      topOrBottom: number,
      size: string,
      topItemId: number,
      topLength: number,
      shoulder: number,
      chest: number,
      isWidthOfTop: boolean,
      bottomItemId: number,
      bottomLength: number,
      waist: number,
      thigh: number,
      rise: number,
      hem: number,
      isWidthOfBottom: boolean,
      userId: number
    }
  ]
) => {
  const data1 =[];
  
  for (var i = 0; i < sizes.length; i++){
    if (sizes[i].topOrBottom === 0) {
      const data = await prisma.allSizeTop.create({
        data: {
          userId: sizes[i].userId,
          isManual: sizes[i].isManual,
          manualInputNum: sizes[i].manualInputNum,
          topOrBottom: sizes[i].topOrBottom,
          size: sizes[i].size,
          topItemId: sizes[i].topItemId,
          topLength: sizes[i].topLength,
          shoulder: sizes[i].shoulder,
          chest: sizes[i].chest,
          isWidthOfTop: sizes[i].isWidthOfTop,
        }
      });
      data1.push(data)
    } 
    else if (sizes[i].topOrBottom === 1) {
      const data = await prisma.allSizeBottom.create({
        data: {
          userId: sizes[i].userId,
          isManual: sizes[i].isManual,
          manualInputNum: sizes[i].manualInputNum,
          topOrBottom: sizes[i].topOrBottom,
          size: sizes[i].size,
          bottomItemId: sizes[i].bottomItemId,
          bottomLength: sizes[i].bottomLength,
          waist: sizes[i].waist,
          thigh: sizes[i].thigh,
          rise: sizes[i].rise,
          hem: sizes[i].hem,
          isWidthOfBottom: sizes[i].isWidthOfBottom,
        },
      });
      data1.push(data)
    }
  }
  return data1
};

//* 사이즈 추천 결과 저장
const saveBest = async (
  userId: number,
  topOrBottom: number,
  url: string,
  topItemId: number,
  bottomItemId: number
) => {
  // 초기사이즈 배열에 넣기
  const MyTopSize = await prisma.mySize.findMany({
    where: {
      userId: userId,
    },
    select: {
      shoulder: true,
      chest: true,
    },
  });

  const MyBottomSize = await prisma.mySize.findMany({
    where: {
      userId: userId,
    },
    select: {
      bottomLength: true,
      waist: true,
      thigh: true,
      rise: true,
      hem: true,
    },
  });

  const MyTopArr = [];
  for (var i = 0; i < MyTopSize.length; i++) {
    MyTopArr.push(Object.values(MyTopSize[i]));
  }

  const MyBottomArr = [];
  for (var i = 0; i < MyBottomSize.length; i++) {
    MyBottomArr.push(Object.values(MyBottomSize[i]));
  }

  // 크롤링한 사이즈표 배열에 넣고 초기사이즈 배열과 비교(편차)
  const CompareTop = await prisma.allSizeTop.findMany({
    where: {
      AND: [
        { userId: userId },
        { topItemId: topItemId },
        { isManual: false },
        { manualInputNum: null },
        { topOrBottom: topOrBottom },
      ],
    },
    select: {
      size: true,
      shoulder: true,
      chest: true,
    },
  });

  const CompareBottom = await prisma.allSizeBottom.findMany({
    where: {
      AND: [
        { userId: userId },
        { bottomItemId: bottomItemId },
        { isManual: false },
        { manualInputNum: null },
        { topOrBottom: topOrBottom },
      ],
    },
    select: {
      size: true,
      bottomLength: true,
      waist: true,
      thigh: true,
      rise: true,
      hem: true,
    },
  });

  const TopArr = []; // 크롤링한 상의 사이즈표
  const TopSize: any[] = []; // 사이즈만
  const TopShoulder = []; //어깨만
  const TopChest = []; //가슴만
  for (var i = 0; i < CompareTop.length; i++) {
    TopArr.push(Object.values(CompareTop[i]));
    TopSize.push(TopArr[i][0]);
    TopShoulder.push(TopArr[i][1]);
    TopChest.push(TopArr[i][2]);
  }

  const BottomArr = []; // 크롤링한 하의 사이즈표
  const BottomSize = []; //사이즈만
  const BottomLength = []; //총장만
  const BottomWaist = []; //허리만
  const BottomThigh = []; //허벅지만
  const BottomRise = []; //밑위만
  const BottomHem = []; //밑단만
  for (var i = 0; i < CompareBottom.length; i++) {
    BottomArr.push(Object.values(CompareBottom[i]));
    BottomSize.push(BottomArr[i][0]);
    BottomLength.push(BottomArr[i][1]);
    BottomWaist.push(BottomArr[i][2]);
    BottomThigh.push(BottomArr[i][3]);
    BottomRise.push(BottomArr[i][4]);
    BottomHem.push(BottomArr[i][5]);
  }
  //편차절댓값의 최소값 구하기

  const resultTS: number[] = []; //어깨
  const resultAbsTS = []; //어깨 절대값
  const resultTC: number[] = []; //가슴
  const resultAbsTC = []; //가슴 절대값

  const resultBL: number[] = []; //총장(하의)
  const resultAbsBL = []; //하의총장 절대값
  const resultBW: number[] = []; //허리
  const resultAbsBW = []; //허리 절대값
  const resultBT: number[] = []; //허벅지
  const resultAbsBT = []; //허벅지 절대값
  const resultBR: number[] = []; //밑위
  const resultAbsBR = []; //밑위 절대값
  const resultBH: number[] = []; //밑단
  const resultAbsBH = []; //밑단 절대값

  const SIZE: { [key: string]: any } = {
    1: "XXS",
    2: "XS",
    3: "S",
    4: "M",
    5: "L",
    6: "XL",
    7: "XXL",
  };
  //value값으로 key값 탐색
  function getKeyByValue(object: { [x: string]: any }, value: any) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  if (topOrBottom === 0) {
    //편차절대값 배열 만들기
    for (var i = 0; i < TopShoulder.length; i++) {
      resultTS.push(Number(TopShoulder[i]) - Number(MyTopArr[0][0]));
      resultTC.push(Number(TopChest[i]) - Number(MyTopArr[0][1]));
    }
    //편차절대값 같을때는 편차가 음수인 쪽 선택(sort 쓰면 오름차순이라 조건문 쓸 필요 x)
    //편차절대값 배열 내 최솟값이 있는 index 구하기 위해
    // 오름차순 했을때 편차절댓값 1,2번째 비교
    for (var j = 0; j < resultTS.length; j++) {
      resultAbsTS[j] = Math.abs(resultTS[j]);
      resultAbsTC[j] = Math.abs(resultTC[j]);
    }

    const firTS = resultAbsTS.sort(function (a, b) {
      return a - b;
    })[0];
    const secTS = resultAbsTS.sort(function (a, b) {
      return a - b;
    })[1];

    let indexTS = 0;
    if (firTS == secTS) {
      indexTS = resultTS.indexOf(-1 * firTS);
    } else {
      indexTS = resultTS.indexOf(firTS);
    }

    const firTC = resultAbsTC.sort(function (a, b) {
      return a - b;
    })[0];
    const secTC = resultAbsTC.sort(function (a, b) {
      return a - b;
    })[1];

    let indexTC = 0;
    if (firTC == secTC) {
      indexTC = resultTC.indexOf(-1 * firTC);
    } else {
      indexTC = resultTC.indexOf(firTC);
    }

    //해당 인덱스의 사이즈들 중 큰 사이즈 선택
    const resultKey = Math.max(
      Number(getKeyByValue(SIZE, TopSize[indexTS])),
      Number(getKeyByValue(SIZE, TopSize[indexTC]))
    );

    const topBest = SIZE[resultKey];

    const data = await prisma.recommend.create({
      data: {
        userId: userId,
        url: url,
        recommendSize: topBest,
        topItemId: topItemId,
      },
    });

    return data;
  } else if (topOrBottom === 1) {
    //편차절대값 배열 만들기
    for (var i = 0; i < BottomLength.length; i++) {
      resultBL.push(
        Math.abs(Number(BottomLength[i]) - Number(MyBottomArr[0][0]))
      );
      resultBW.push(
        Math.abs(Number(BottomWaist[i]) - Number(MyBottomArr[0][1]))
      );
      resultBT.push(
        Math.abs(Number(BottomThigh[i]) - Number(MyBottomArr[0][2]))
      );
      resultBR.push(
        Math.abs(Number(BottomRise[i]) - Number(MyBottomArr[0][3]))
      );
      resultBH.push(Math.abs(Number(BottomHem[i]) - Number(MyBottomArr[0][4])));
    }

    for (var j = 0; j < resultBL.length; j++) {
      resultAbsBL[j] = Math.abs(resultBL[j]);
      resultAbsBW[j] = Math.abs(resultBW[j]);
      resultAbsBT[j] = Math.abs(resultBT[j]);
      resultAbsBR[j] = Math.abs(resultBR[j]);
      resultAbsBH[j] = Math.abs(resultBH[j]);
    }

    const firBL = resultAbsBL.sort(function (a, b) {
      return a - b;
    })[0];
    const secBL = resultAbsBL.sort(function (a, b) {
      return a - b;
    })[1];

    let indexBL = 0;
    if (firBL == secBL) {
      indexBL = resultBL.indexOf(-1 * firBL);
    } else {
      indexBL = resultBL.indexOf(firBL);
    }

    const firBW = resultAbsBW.sort(function (a, b) {
      return a - b;
    })[0];
    const secBW = resultAbsBW.sort(function (a, b) {
      return a - b;
    })[1];

    let indexBW = 0;
    if (firBW == secBW) {
      indexBW = resultBW.indexOf(-1 * firBW);
    } else {
      indexBW = resultBW.indexOf(firBW);
    }

    const firBT = resultAbsBT.sort(function (a, b) {
      return a - b;
    })[0];
    const secBT = resultAbsBT.sort(function (a, b) {
      return a - b;
    })[1];

    let indexBT = 0;
    if (firBT == secBT) {
      indexBT = resultBT.indexOf(-1 * firBT);
    } else {
      indexBT = resultBT.indexOf(firBT);
    }

    const firBR = resultAbsBR.sort(function (a, b) {
      return a - b;
    })[0];
    const secBR = resultAbsBR.sort(function (a, b) {
      return a - b;
    })[1];

    let indexBR = 0;
    if (firBR == secBR) {
      indexBR = resultBR.indexOf(-1 * firBR);
    } else {
      indexBR = resultBR.indexOf(firBR);
    }

    const firBH = resultAbsBH.sort(function (a, b) {
      return a - b;
    })[0];
    const secBH = resultAbsBH.sort(function (a, b) {
      return a - b;
    })[1];

    let indexBH = 0;
    if (firBH == secBH) {
      indexBH = resultBH.indexOf(-1 * firBH);
    } else {
      indexBH = resultBH.indexOf(firBH);
    }
    //해당 인덱스의 사이즈들 중 큰 사이즈 선택
    const bottomBest = Math.max(
      Number(BottomSize[indexBL]),
      Number(BottomSize[indexBW]),
      Number(BottomSize[indexBT]),
      Number(BottomSize[indexBR]),
      Number(BottomSize[indexBH])
    );

    const data = await prisma.recommend.create({
      data: {
        userId: userId,
        url: url,
        recommendSize: String(bottomBest),
        bottomItemId: bottomItemId,
      },
    });

    return data;
  }
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
  isWidthOfBottom: boolean,

  userId: number
) => {
  if (topOrBottom === 0) {
    const data = prisma.allSizeTop.createMany({
      data: {
        userId: userId,
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
        userId: userId,
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
  saveBest,
  saveCrawling,
};

export default extensionService;
