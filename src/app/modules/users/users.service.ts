import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};
const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const userService = {
  getAllUsers,
  getSingleUser,
};
