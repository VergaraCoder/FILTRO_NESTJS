import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";


@Catch()
export class FilterErrors implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const request:Request=host.switchToHttp().getRequest();
        const response:Response=host.switchToHttp().getResponse();

        let message;
        let status;
        const ifExist=exception.message.split(" :: ");
        const ifExist2=exception.response;
        
        if(ifExist2 && ifExist2.message){
            message= ifExist2.error ? ifExist2.error : ifExist2.message;
            status= ifExist2.statusCode ? ifExist2.statusCode : 400;
        }
        else if(ifExist){
            message=ifExist[1];
            status=ifExist[0];
        }else{
            message=ifExist2 ? "Bad Request" : "INTERNAL SERVER ERORR";
            status=ifExist2 ? 400 : 500;
        }

        response.status(status).json({
            status:status,
            timestamp:new Date(),
            method:request.method,
            path:request.url,
            message:message
        });

    }
}