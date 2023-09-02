import { PrismaClient } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
const prisma = new PrismaClient();
const getProfile = async (user: JwtPayload | null) => {
  let result;
  if (user) {
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
