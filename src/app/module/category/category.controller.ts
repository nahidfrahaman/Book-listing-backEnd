import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const insertToDb = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const results = await CategoryService.insertToDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfuly',
    data: results,
  });
});

export const CategoryController = {
  insertToDb,
};
