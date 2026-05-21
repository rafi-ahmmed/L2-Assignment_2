import type { Request, Response } from 'express';
import issueServices from './issue.service.js';
import type { TIssueReqBody, TIssueUpdateBody } from '../../types/index.js';
import type { JwtPayload } from 'jsonwebtoken';
import sendResponse from '../../utils/sendResponse.js';

const createIssue = async (req: Request, res: Response) => {
   try {
      const payload: TIssueReqBody = req.body;

      const result = await issueServices.storeIssueInDB(
         payload,
         req.user as JwtPayload
      );

      return sendResponse(res, {
         statusCode: 201,
         message: 'Issue created successfully',
         success: true,
         data: result,
      });
   } catch (error) {
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

const getAllIssues = async (req: Request, res: Response) => {
   try {
      const result = await issueServices.getAllIssuesFromDB(req.query);
      // console.log(req.query.sort);

      return sendResponse(res, {
         statusCode: 200,
         success: true,
         data: result,
      });
   } catch (error) {
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

const getSingleIssue = async (req: Request, res: Response) => {
   try {
      // console.log(typeof req.params.id);
      const result = await issueServices.getSingleIssueFromDB(
         req.params.id as string
      );

      return sendResponse(res, {
         statusCode: 200,
         success: true,
         data: result,
      });
   } catch (error) {
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

const updateIssue = async (req: Request, res: Response) => {
   try {
      const jwtData = req.user as JwtPayload;
      const userPayload: TIssueUpdateBody = req.body;

      const result = await issueServices.updateIssueInDB(
         req.params.id as string,
         userPayload,
         jwtData
      );

      return sendResponse(res, {
         statusCode: 200,
         success: true,
         message: 'Issue updated successfully',
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

const deleteIssue = async (req: Request, res: Response) => {
   try {
      const jwtData = req.user as JwtPayload;

      await issueServices.deleteIssueFromDB(req.params.id as string, jwtData);

      return sendResponse(res, {
         statusCode: 200,
         success: true,
         message: 'Issue deleted successfully',
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

const issueController = {
   createIssue,
   getAllIssues,
   getSingleIssue,
   updateIssue,
   deleteIssue,
};

export default issueController;
