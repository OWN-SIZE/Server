import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* 카테고리 전체 조회
const getAllCategory = async () => {
    const data = await prisma.category.findMany();
    
    return data;
};

//* 카테고리 생성
const createCategory = async (categoryName: string, isPinCategory: boolean, image: string[]) => {
    const data = await prisma.category.create({
        data: {
            categoryName: categoryName,
            isPinCategory: isPinCategory,
            image: image
        }
    });

    return data;
}

//* 카테고리 삭제
const deleteCategory = async (categoryId: number) => {
    await prisma.category.delete({
        where: {
            id: categoryId
        }
    });
}

const categoryService = {
    getAllCategory,
    createCategory,
    deleteCategory
};

export default categoryService;