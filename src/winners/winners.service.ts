import { Injectable } from '@nestjs/common';
import { CreateWinnerDto } from './dto/create-winner.dto';
import { UpdateWinnerDto } from './dto/update-winner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Winner } from './entities/winner.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class WinnersService {

  constructor(
    @InjectRepository(Winner)
    private winnerRepository:Repository<Winner>
  ){}

  async create(createWinnerDto: CreateWinnerDto) {
    const dataWinner=this.winnerRepository.create(createWinnerDto);
    await this.winnerRepository.save(dataWinner);
  }

  async findAll(querys?:any) {
    try{
      const allWinners=await this.winnerRepository.find();
      if(allWinners.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"NOT FOUND REGISTERS."
        });
      }
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const allWinner=await this.winnerRepository.findOneBy({id:id});
      if(!allWinner){
        throw new manageError({
          type:"NOT_FOUND",
          message:"NOT FOUND REGISTERS."
        });
      }
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async update(id: number, updateWinnerDto: UpdateWinnerDto) {
    try{
      const {affected}=await this.winnerRepository.update(id,updateWinnerDto);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATE."
        });
      }
      return "update perfectly";

    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected}=await this.winnerRepository.delete(id);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILED TO DELETE."
        });
      }
      return "delete perfectly";
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }
}
