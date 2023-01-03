import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* 카테고리 전체 조회
const getAllCategory = async () => {
    const data = await prisma.category.findMany();
    
    return data;
};

const categoryService = {
    getAllCategory,
};

export default categoryService;