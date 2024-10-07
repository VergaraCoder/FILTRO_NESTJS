import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class RoleService {
  
  constructor(
    @InjectRepository(Role)
    private roleRepository:Repository<Role>
  ){}

  async create(createRoleDto: CreateRoleDto) {
    const dataRole=this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(dataRole);
    return dataRole;
  }

  async findAll() {
    try{
      const roles=await this.roleRepository.find();
      if(roles.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"REGISTERS NOT FOUND"
        });
      }
      return roles;
    }catch(err:any){
      throw manageError.signedError(err.massage);
    }
  }

  async findOne(id: number) {
    try{
      const role=await this.roleRepository.findOneBy({id:id});
      if(!role){
        throw new manageError({
          type:"NOT_FOUND",
          message:"ROle NOT FOUND"
        });
      }
      return role;
    }catch(err:any){
      throw manageError.signedError(err.massage);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try{
      const {affected}=await this.roleRepository.update(id,updateRoleDto);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"REGISTERS NOT FOUND"
        });
      }
      return "perfect update";
    }catch(err:any){
      throw manageError.signedError(err.massage);
    }
  }

  async remove(id: number) {
    try{
      const {affected}=await this.roleRepository.delete(id);
      if(affected){
        throw new manageError({
          type:"NOT_FOUND",
          message:"REGISTERS NOT FOUND"
        });
      }
      return "perfect delete";

    }catch(err:any){
      throw manageError.signedError(err.massage);
    }
  }
}
