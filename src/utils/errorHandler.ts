import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = 400;
  return res.status(statusCode).json({
    status: "error",
    message: err.message || "An error occurred"
  });
};
