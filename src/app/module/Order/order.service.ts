import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../Error/ApiError';
import prisma from '../../../shared/prisma';

const insertToDb = async (user: any, payload: any): Promise<any> => {
  console.log(user.id, user.role);
  const { orderedBooks } = payload;
  console.log(orderedBooks.length);

  if (user.role !== 'customer') {
    throw new ApiError(httpStatus.FORBIDDEN, 'only customer can create order');
  }

  const newCreatedOrder = await prisma.$transaction(async tx => {
    const createdorder = await prisma.order.create({
      data: {
        userId: user.id,
      },
    });

    for (let i = 0; i < orderedBooks.length; i++) {
      const createdData = await tx.orderdBook.create({
        data: {
          orderId: createdorder.id,
          bookId: orderedBooks[i].bookId,
          quantity: orderedBooks[i].quantity,
        },
      });

      console.log('orderdbook', createdData);
    }
    return createdorder;
  });

  if (newCreatedOrder) {
    const responseData = await prisma.order.findUnique({
      where: {
        id: newCreatedOrder.id,
      },
      include: {
        orderd_books: true,
      },
    });
    return responseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
};

const getAllToDb = async (): Promise<Order[]> => {
  const results = await prisma.order.findMany({
    include: {
      orderd_books: true,
    },
  });
  return results;
};

export const OrderService = {
  insertToDb,
  getAllToDb,
};
