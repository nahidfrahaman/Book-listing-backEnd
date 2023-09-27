/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertToDb = async (data: Book): Promise<Book | null> => {
  const results = await prisma.book.create({
    data,
  });
  const bookData = await prisma.book.findUnique({
    where: {
      id: results.id,
    },
    include: {
      category: true,
    },
  });
  return bookData;
};

const getAllToDb = async (): Promise<Book[]> => {
  const results = await prisma.book.findMany({
    include: { category: true },
  });
  return results;
};

const getBookByCategory = async (id: string): Promise<any> => {
  const results = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
    include: {
      category: true,
    },
  });
  return results;
};

const getOneToDb = async (id: string): Promise<Book | null> => {
  const results = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return results;
};

const updateToDb = async (
  id: string,
  payload: Partial<Book>,
): Promise<Partial<Book>> => {
  const results = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return results;
};

const deleteToDb = async (id: string): Promise<Partial<Book>> => {
  const results = await prisma.book.delete({
    where: {
      id,
    },
  });
  return results;
};

export const BookService = {
  insertToDb,
  getAllToDb,
  getBookByCategory,
  getOneToDb,
  updateToDb,
  deleteToDb,
};
