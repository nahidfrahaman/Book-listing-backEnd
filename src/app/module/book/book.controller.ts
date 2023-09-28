import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
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
  const paginationOption = pick(req.query, [
    'page',
    'size',
    'sortBy',
    'sortOrder',
  ]);

  const filterData = pick(req.query, [
    'minPrice',
    'maxPrice',
    'category',
    'search',
  ]);
  const results = await BookService.getAllToDb(paginationOption, filterData);

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
