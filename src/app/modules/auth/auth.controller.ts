import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SignUpService } from './auth.service';
export type ILoginResponse = {
  accessToken: string
  refreshToken?: string

}
const signUP = catchAsync(async (req: Request, res: Response) => {
  const result = await SignUpService.signUp(req.body);
  sendResponse(res, {
    success: true,
    message: 'User created successfully!',
    statusCode: httpStatus.OK,
    data: result,
  });
});
const logIn = catchAsync(async (req: Request, res: Response) => {
  const result = await SignUpService.login(req.body);
  const {accessToken}=result
  sendResponse<ILoginResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User signin successfully!",
    token: accessToken
  });
});

export const signUpController = {
  signUP,
  logIn
};
