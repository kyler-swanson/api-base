import { ErrorRequestHandler } from "express";
import { CustomError } from "errors";
import { pick } from 'lodash';

export const handleErrors: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.log) console.error(err);

  const safeForClient = err instanceof CustomError;

  const clientErr = safeForClient 
    ? pick(err, ['message', 'code', 'status', 'data']) 
    : {
        message: 'Something went wrong!',
        code: 'INTERNAL_ERROR',
        status: 500,
      };

    res.status(clientErr.status).json({error: clientErr});
}