import { Category, Order, Prisma, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient();

const createOrders = async (
  data: Prisma.OrderCreateInput,
  user: JwtPayload | null
): Promise<Order | undefined> => {
  let result;
  if (user) {
    result = await prisma.order.create({
      data: { ...data, userId: user.userId },
    });
  }

  return result;
};
const getAllOrders = async (
  user: JwtPayload | null
): Promise<Order[] | undefined> => {
    console.log(user,"user");
  let result;
  if (user && user.role === ENUM_USER_ROLE.ADMIN) {
    result = await prisma.order.findMany();
  }

  if (user && user.role === ENUM_USER_ROLE.CUSTOMER) {
    result = await prisma.order.findMany({
      where: {
        userId: user.userId,
      },
    });
  }
  return result;
};
const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      Book: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User is not exist!');
  }
  return result;
};
const updateCategory = async (
  id: string,
  data: Partial<Category>
): Promise<Category | null> => {
  const isExist = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not exist ');
  }
  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
const deleteCategory = async (id: string): Promise<Category | null> => {
  const isExist = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Data not exist');
  }
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ordersService = {
  getSingleCategory,
  updateCategory,
  deleteCategory,
  createOrders,
  getAllOrders,
};
