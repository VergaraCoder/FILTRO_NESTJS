import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class AuthService {
    constructor(
        private jwtService:JwtService
    ){}

    async creationOfToken(data:any){
        const acces_token=this.jwtService.sign(data,{expiresIn:'10m'});
        const refresh_token=this.jwtService.sign(data,{expiresIn:'5d'});

        return {acces_token,refresh_token}
    }

    async renovateToken(refresh_token:string){
        try{
            await this.jwtService.verify(refresh_token);

            const decodeToken=await this.jwtService.decode(refresh_token);
            delete decodeToken.iat;
            delete decodeToken.exp;

            return {
                decodeToken,
                acces_token:this.jwtService.sign(decodeToken)

            }
        }catch(err:any){
            if(err instanceof jwt.TokenExpiredError){
                throw new manageError({
                    type:"UNAUTHORIZED",
                    message:"THE TOKEN HAVE EXPIRED"
                });
            }
            else if(err instanceof jwt.JsonWebTokenError || jwt.NotBeforeError){
                throw new manageError({
                    type:"UNAUTHORIZED",
                    message:"THE TOKEN IS NOT VALID"
                });
            }
            throw manageError.signedError(err.message);
        }
    }
}
