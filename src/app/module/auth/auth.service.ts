import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../../../Error/ApiError';
import config from '../../../config';
import prisma from '../../../shared/prisma';
import { Ilogin } from './auth.interface';

const insertToDb = async (data: User): Promise<Partial<User> | null> => {
  const { password } = data;
  if (!password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'please give password');
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds),
  );

  data.password = hashedPassword;
  const results = await prisma.user.create({
    data,
  });

  const newUser = await prisma.user.findUnique({
    where: {
      id: results.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      password: false,
    },
  });

  return newUser;
};

const login = async (payload: Ilogin): Promise<any> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.FORBIDDEN, 'user not find');
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password,
  );
  console.log(isUserExist.password);
  if (isUserExist.password === password) {
    console.log(true);
  }
};

export const AuthService = {
  insertToDb,
  login,
};
