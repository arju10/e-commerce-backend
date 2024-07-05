import { Response } from 'express';
import httpStatus from 'http-status';

export const handleNotFound = <T>(
  res: Response,
  data: T | null,
  message: string,
) => {
  if (!data) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: message,
      data: null || undefined,
    });
  }
};
