import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertToDb = async (data: Category): Promise<Category> => {
  const results = await prisma.category.create({
    data,
  });
  return results;
};

const getAllToDb = async (): Promise<Category[]> => {
  const results = await prisma.category.findMany({});
  return results;
};

const getOneToDb = async (id: string): Promise<Category | null> => {
  const results = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return results;
};

const updateToDb = async (
  id: string,
  payload: Partial<Category>,
): Promise<Partial<Category>> => {
  const results = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return results;
};

const deleteToDb = async (id: string): Promise<Partial<Category>> => {
  const results = await prisma.category.delete({
    where: {
      id,
    },
  });
  return results;
};

export const CategoryService = {
  insertToDb,
  getAllToDb,
  getOneToDb,
  updateToDb,
  deleteToDb,
};
