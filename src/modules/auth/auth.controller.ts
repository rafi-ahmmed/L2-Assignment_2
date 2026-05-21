import type { Request, Response } from 'express';
import authServices from './auth.service.js';
import type {
   IUser,
   TSigninPayload,
   TSignupPayload,
} from '../../types/index.js';
import sendResponse from '../../utils/sendResponse.js';

const signUpUser = async (req: Request, res: Response) => {
   try {
      const payload: TSignupPayload = req.body;

      const result: IUser = await authServices.createUserInDB(payload);
      return sendResponse(res, {
         statusCode: 201,
         success: true,
         message: 'User registered successfully',
         data: result,
      });
   } catch (error: unknown) {
      let message = 'Something went wrong';

      if (error instanceof Error) {
         message = error.message;
      }
      return sendResponse(res, {
         statusCode: 500,
         success: false,
         message: message,
         errors: error,
      });
   }
};

const signinUser = async (req: Request, res: Response) => {
   try {
      const payload: TSigninPayload = req.body;
      const result = await authServices.signInUserIntoDB(payload);
      // console.log(result);
      sendResponse(res, {
         statusCode: 200,
         message: 'Login successful',
         success: true,
         data: result,
      });
   } catch (error) {
      let message = 'Something went wrong';

      if (error instanceof Error) {
         message = error.message;
      }
      sendResponse(res, {
         statusCode: 500,
         success: false,
         message: message,
         errors: error,
      });
   }
};

const authController = {
   signUpUser,
   signinUser,
};
export default authController;
