/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from '@prisma/client';
import { paginationHelpers } from '../../../helper/paginationHelper';
import { IPaginationOptions } from '../../../interface/paginationOption';
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

const getAllToDb = async (
  paginationOption: IPaginationOptions,
  filterOption: any,
): Promise<any> => {
  const { search, ...filterData } = filterOption;

  const { page, size, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: ['title', 'author', 'genre'].map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }
  console.log(filterData);

  const { maxPrice, minPrice, category } = filterData;
  const total = await await prisma.book.count();
  if (maxPrice) {
    const results = await prisma.book.findMany({
      where: {
        price: {
          lte: Number(maxPrice), // Less than or equal to maxPrice
        },
      },
      skip: skip,
      take: size,
      orderBy:
        sortBy && sortOrder
          ? { [sortBy]: sortOrder }
          : {
              createdAt: 'desc',
            },
      include: { category: true },
    });
    return {
      meta: {
        total,
        page,
        size,
      },
      data: results,
    };
  }
  if (minPrice) {
    const results = await prisma.book.findMany({
      where: {
        price: {
          gte: Number(minPrice), // Less than or equal to maxPrice
        },
      },
      skip: skip,
      take: size,
      orderBy:
        sortBy && sortOrder
          ? { [sortBy]: sortOrder }
          : {
              createdAt: 'desc',
            },
      include: { category: true },
    });
    return {
      meta: {
        total,
        page,
        size,
      },
      data: results,
    };
  }

  if (category) {
    const results = await prisma.book.findMany({
      where: {
        categoryId: category,
      },
      skip: skip,
      take: size,
      orderBy:
        sortBy && sortOrder
          ? { [sortBy]: sortOrder }
          : {
              createdAt: 'desc',
            },
      include: { category: true },
    });
    return {
      meta: {
        total,
        page,
        size,
      },
      data: results,
    };
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.log(whereConditions);
  const results = await prisma.book.findMany({
    where: whereConditions,
    skip: skip,
    take: size,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: 'desc',
          },
    include: { category: true },
  });

  return {
    meta: {
      total,
      page,
      size,
    },
    data: results,
  };
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
