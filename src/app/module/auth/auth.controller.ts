import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const insertToDb = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const results = await AuthService.insertToDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfuly',
    data: results,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const results = await AuthService.login(payload);

  const { refreshToken, ...others } = results;

  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category created successfuly',
    data: others,
  });
});

export const AuthController = {
  insertToDb,
  login,
};
