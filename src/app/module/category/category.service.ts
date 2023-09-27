import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertToDb = async (data: Category): Promise<Category> => {
  const results = await prisma.category.create({
    data,
  });
  return results;
};

export const CategoryService = {
  insertToDb,
};
