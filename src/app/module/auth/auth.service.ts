import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertToDb = async (data: User): Promise<User> => {
  const results = await prisma.user.create({
    data,
  });
  return results;
};

export const AuthService = {
  insertToDb,
};
