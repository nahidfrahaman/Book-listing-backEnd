/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../Error/ApiError';
import config from '../../config';
import { IGenericErrorMessage } from '../../interface/error';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // config.env === 'development'
  //   ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
  //   : console.error(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.CONFLICT;
    const line = error.message.trim().split('\n');
    console.log(line[line.length - 1]);
    message = line[line.length - 1];
    console.log(message);
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = httpStatus.BAD_REQUEST;
    const line = error.message.trim().split('\n');
    message = line[line.length - 1];
  }
  // else if (error instanceof ZodError) {
  //   const simplifiedError = handleZodError(error);
  //   statusCode = simplifiedError.statusCode;
  //   message = simplifiedError.message;
  //   errorMessages = simplifiedError.errorMessages;
  // }
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
