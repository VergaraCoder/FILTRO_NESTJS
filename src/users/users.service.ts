import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>
  ){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async verifyUserByEmailAndPassword(email:string,password:string){
    try{
      const findUser=await this.userRepository.findOneBy({email:email});
      if(!findUser || (!await bcrypt.compare(password,findUser.password))){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THIS USER NOT EXIST"
        });
      }
      return findUser;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }
}
