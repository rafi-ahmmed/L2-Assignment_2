import type { Response } from 'express';
import type { TResponse } from '../types/index.js';

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
   return res.status(data.statusCode).json({
      success: data.success,
      message: data.message,
      data: data.data,
      errors: data.errors,
   });
};

export default sendResponse;
