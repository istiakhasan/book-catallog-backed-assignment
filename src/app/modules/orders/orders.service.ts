import { Order, Prisma, PrismaClient } from '@prisma/client';
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
  console.log(user, 'user');
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
const getSingleOrders = async (
  id: string,
  user: JwtPayload | null
): Promise<Order | undefined | null> => {
  let result;
   const isExist=await prisma.order.findUnique({
    where:{
      id
    }
   })
   if(!isExist){
    throw new ApiError(httpStatus.NOT_FOUND,"Data does not exist")
   }
  if (user && user.role === ENUM_USER_ROLE.ADMIN) {
    result = prisma.order.findUnique({
      where: {
        id: id,
      },
    });
  }

  if (user && user.role === ENUM_USER_ROLE.CUSTOMER) {
    result = prisma.order.findUnique({
      where: {
        id: id,
        userId: user.userId,
      },
    });
  }

  return result;
};


export const ordersService = {
  getSingleOrders,
  createOrders,
  getAllOrders,
};
