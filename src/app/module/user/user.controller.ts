import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllToDb = catchAsync(async (req: Request, res: Response) => {
  const results = await UserService.getAllToDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' User featched successfuly',
    data: results,
  });
});

const getOneToDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const results = await UserService.getOneToDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User featched successfuly',
    data: results,
  });
});

const updateToDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const results = await UserService.updateToDb(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated successfuly',
    data: results,
  });
});

const deleteToDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const results = await UserService.deleteToDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted  successfuly',
    data: results,
  });
});
export const UserController = {
  deleteToDb,
  getAllToDb,
  getOneToDb,
  updateToDb,
};
