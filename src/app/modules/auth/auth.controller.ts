import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SignUpService } from './auth.service';

const signUP = catchAsync(async (req: Request, res: Response) => {
  const result = await SignUpService.signUp(req.body);
  sendResponse(res, {
    success: true,
    message: 'User created successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const signUpController = {
  signUP,
};
