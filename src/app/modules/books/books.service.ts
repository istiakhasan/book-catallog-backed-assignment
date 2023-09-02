import { Book, Category, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
type IBooksFilters = {
  search?: string;
  category?: string;
  maxPrice?: number;
  minPrice?: number;
};
const prisma = new PrismaClient();

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};
const getAllBooks = async (
  options: IPaginationOptions,
  filters: IBooksFilters
): Promise<IGenericResponse<Book[]>> => {
  // pagination
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  //   search and filter
  const { search, category, minPrice, maxPrice } = filters;
  const andConditions = [];

  if (minPrice) {
    const regx = /^(0|[1-9]\d*)$/;
    const isNumberValid = regx.test(minPrice.toString());

    if (!isNumberValid) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Min price must be a valid number'
      );
    }
    andConditions.push({
      price: {
        gte: Number(minPrice),
      },
    });
  }
  if (maxPrice) {
    const regx = /^(0|[1-9]\d*)$/;
    const isNumberValid = regx.test(maxPrice.toString());

    if (!isNumberValid) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Max price must be a valid number'
      );
    }
    andConditions.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  }
  if (category) {
    console.log(category);
    andConditions.push({
      AND: {
        categoryId: {
          equals: category,
        },
      },
    });
  }
  if (search) {
    andConditions.push({
      OR: ['title', 'author', 'genre'].map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.book.findMany({
    where: whereConditions,
    include: {
      category: true,
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            publicationDate: 'desc',
          },
  });
  const total = await prisma.book.count();
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};
const getByCategoryId = async (
  options: IPaginationOptions,
  filters: IBooksFilters,
  id: string
): Promise<IGenericResponse<Book[]>> => {
  // pagination
  const { size, page, skip } = paginationHelpers.calculatePagination(options);
  //   search and filter
  const { search, category, minPrice, maxPrice } = filters;
  const andConditions = [];
  andConditions.push({
    categoryId: {
      equals: id,
    },
  });
  if (minPrice) {
    const regx = /^(0|[1-9]\d*)$/;
    const isNumberValid = regx.test(minPrice.toString());

    if (!isNumberValid) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Min price must be a valid number'
      );
    }
    andConditions.push({
      price: {
        gte: Number(minPrice),
      },
    });
  }
  if (maxPrice) {
    const regx = /^(0|[1-9]\d*)$/;
    const isNumberValid = regx.test(maxPrice.toString());

    if (!isNumberValid) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Max price must be a valid number'
      );
    }
    andConditions.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  }
  if (category) {
    andConditions.push({
      AND: {
        categoryId: {
          equals: category,
        },
      },
    });
  }
  if (search) {
    andConditions.push({
      OR: ['title', 'author', 'genre'].map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }
  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.book.findMany({
    where: whereConditions,
    include: {
      category: true,
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            publicationDate: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: {
      categoryId: id,
    },
  });
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};
const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book is not exist!');
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

export const bookService = {
    getSingleBook,
  updateCategory,
  deleteCategory,
  createBook,
  getAllBooks,
  getByCategoryId,
};
