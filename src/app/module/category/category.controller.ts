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
const getAllToDb = catchAsync(async (req: Request, res: Response) => {
  const results = await CategoryService.getAllToDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfuly',
    data: results,
  });
});
const getOneToDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const results = await CategoryService.getOneToDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfuly',
    data: results,
  });
});
const updateToDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const results = await CategoryService.updateToDb(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfuly',
    data: results,
  });
});
const deleteToDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const results = await CategoryService.deleteToDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfuly',
    data: results,
  });
});

export const CategoryController = {
  insertToDb,
  getAllToDb,
  getOneToDb,
  updateToDb,
  deleteToDb,
};
