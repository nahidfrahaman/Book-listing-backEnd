import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const insertToDb = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  const user = req.user;

  const results = await OrderService.insertToDb(user, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfuly',
    data: results,
  });
});

const getAllToDb = catchAsync(async (req: Request, res: Response) => {
  const results = await OrderService.getAllToDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfuly',
    data: results,
  });
});

export const OrderController = {
  insertToDb,
  getAllToDb,
};
