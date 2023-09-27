import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllToDb = async (): Promise<User[]> => {
  const results = await prisma.user.findMany({});
  return results;
};

const getOneToDb = async (id: string): Promise<User | null> => {
  const results = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return results;
};

const updateToDb = async (
  id: string,
  payload: Partial<User>,
): Promise<Partial<User>> => {
  const results = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return results;
};

const deleteToDb = async (id: string): Promise<Partial<User>> => {
  const results = await prisma.user.delete({
    where: {
      id,
    },
  });
  return results;
};

export const UserService = {
  getOneToDb,
  getAllToDb,
  deleteToDb,
  updateToDb,
};
