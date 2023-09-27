import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';

const insertToDb = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const results = await BookService.insertToDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'book created successfuly',
    data: results,
  });
});

const getAllToDb = catchAsync(async (req: Request, res: Response) => {
  const results = await BookService.getAllToDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfuly',
    data: results,
  });
});

const getBookByCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const results = await BookService.getBookByCategory(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfuly',
    data: results,
  });
});

const getOneToDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const results = await BookService.getOneToDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book featch successfuly',
    data: results,
  });
});

const updateToDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const results = await BookService.updateToDb(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updateds successfuly',
    data: results,
  });
});

const deleteToDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const results = await BookService.deleteToDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted  successfuly',
    data: results,
  });
});

export const BookController = {
  insertToDb,
  getAllToDb,
  getBookByCategory,
  getOneToDb,
  updateToDb,
  deleteToDb,
};
