

import { NextFunction, Request, Response } from 'express';
 
function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error || 'Something went wrong';
  response
    .status(status)
    .send({
      status,
      message,
    })
}

class HttpException extends Error {
	status: number;
	message: string;
	constructor(status: number, message: string) {
	  super(message);
	  this.status = status;
	  this.message = message;
	}
}

export default errorMiddleware;