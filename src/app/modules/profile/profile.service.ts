import { PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
const prisma = new PrismaClient();
const getProfile = async (user: JwtPayload | null) => {
  let result;
 
  if (user) {
    const isExist =await prisma.user.findUnique({
      where:{
        id:user.userId
      }
    })
    if(!isExist){
      throw new ApiError(httpStatus.NOT_FOUND,'User does not exist')
    }
    result = await prisma.user.findUnique({
      where: {
        id: user.userId,
      },
    });
  }

  return result;
};

export const profileService = {
  getProfile,
};
