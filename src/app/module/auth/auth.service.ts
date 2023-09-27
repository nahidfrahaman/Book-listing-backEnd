/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../Error/ApiError';
import config from '../../../config';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import prisma from '../../../shared/prisma';
import { Ilogin } from './auth.interface';

const insertToDb = async (data: User): Promise<Partial<User> | null> => {
  const { password } = data;
  if (!password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'please give password');
  }
  console.log(config.bycrypt_salt_rounds);
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
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.FORBIDDEN, 'password not matched');
  }
  const { role, id } = isUserExist;
  console.log(
    config.jwt.secret,
    config.jwt.expires_in,
    config.jwt.refresh_secret,
  );

  const accessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  insertToDb,
  login,
};
