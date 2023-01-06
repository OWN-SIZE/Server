import { PrismaClient } from "@prisma/client";
import { arrayBuffer } from "stream/consumers";
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

//* 카테고리 상세 조회
const getCategoryById = async (categoryId: number) => {

    const AllClosetId = await prisma.allCloset_Category.findMany({
        where: {
            categoryId: categoryId
        },
        select: {
            allClosetId: true
        }
    })

    const allClosetArr = [];

    for (var i = 0; i < AllClosetId.length; i++){
       allClosetArr.push(Object.values(AllClosetId[i])[0])
    }
    
    const data = await prisma.allCloset.findMany({
        where: {
            id: {in: allClosetArr}
        }
    })
    
    return data;
}

//* 카테고리 내 의류 삭제
const deleteInCategory = async(categoryId: number, allClosetId: number) => {
    
    await prisma.allCloset_Category.deleteMany({
        where: {
            AND: [
                {categoryId: categoryId},
                {allClosetId: allClosetId}
            ]
        }
    })
}

const categoryService = {
    getAllCategory,
    createCategory,
    deleteCategory,
    getCategoryById,
    deleteInCategory
};

export default categoryService;