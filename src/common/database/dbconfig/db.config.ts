import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Player } from "src/players/entities/player.entity";
import { Role } from "src/role/entities/role.entity";
import { TournamentsPlayer } from "src/tournaments-players/entities/tournaments-player.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { User } from "src/users/entities/user.entity";
import { Winner } from "src/winners/entities/winner.entity";


@Injectable()
export class TypeOrmCredentials implements TypeOrmOptionsFactory{
    
    constructor(
        private configService:ConfigService
    ){}

    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return {
            type:"mysql",
            host:this.configService.get<string>("DB_HOST"),
            port:+this.configService.get<string>("DB_PORT"),
            username:this.configService.get<string>("DB_USERNAME"),
            password:this.configService.get<string>("DB_PASSWORD"),
            database:this.configService.get<string>("DB_DATABASE"),
            entities:[User,Role,Tournament,TournamentsPlayer,Player,Winner,Event],
            synchronize:true
        }
    }
}