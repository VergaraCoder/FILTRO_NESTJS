import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { manageError } from 'src/common/errors/custom/manage.error';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const role = await this.roleService.findOneByName(createUserDto.roleName);
      const hasspassword = await bcrypt.hash(createUserDto.password, 10);

      delete createUserDto.password;
      delete createUserDto.roleName;

      const dataUser = this.userRepository.create({
        ...createUserDto,
        password: hasspassword,
        roleId: role.id,
      });

      await this.userRepository.save(dataUser);
      return dataUser;
    } catch (err: any) {
      throw err;
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      if (users.length == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'NOT FOUND REGISTERS',
        });
      }
      return users;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id: id });
      if (!user) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'NOT FOUND ',
        });
      }
      return user;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { affected } = await this.userRepository.update(id, updateUserDto);
      if (affected == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'FAILED TO UPDATE',
        });
      }
      return 'perfect update';
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: string) {
    try {
      const { affected } = await this.userRepository.delete(id);
      if (affected == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'FAILED TO DELETE',
        });
      }
      return 'perfect DELETE';
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async verifyUserByEmailAndPassword(email: string, password: string) {
    try {
      const findUser = await this.userRepository.findOneBy({ email: email });
      if (!findUser || !(await bcrypt.compare(password, findUser.password))) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'THIS USER NOT EXIST',
        });
      }
      return findUser;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }
}
