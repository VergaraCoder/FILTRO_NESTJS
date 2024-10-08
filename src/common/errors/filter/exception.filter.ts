import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class FilterErrors implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse();

    let message;
    let status;
    const ifExist = exception.message.split(' :: ');
    console.log(ifExist);

    const ifExist2 = exception.response;

    console.log(exception);

    if (ifExist2 && ifExist2.message) {
      console.log('entramos a uno');

      message = ifExist2.error ? ifExist2.error : ifExist2.message;
      status = ifExist2.statusCode ? ifExist2.statusCode : 400;
    } else if (ifExist && ifExist.length == 2) {
      console.log('entramos a dos');

      message = ifExist[1];
      status = HttpStatus[ifExist[0]];
    } else {
      console.log('entramos a tres');

      message = 'Bad Request';
      status = 400;
    }
    console.log('enter to the exception');

    response.status(status).json({
      status: status,
      timestamp: new Date(),
      method: request.method,
      path: request.url,
      message: message,
    });
  }
}
