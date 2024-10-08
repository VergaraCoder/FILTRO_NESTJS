import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/common/decorators/custom/auth.decorator';
import { ApiBody, ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth('admin')
  @ApiCookieAuth("cookie-token-cookie")
  @ApiCookieAuth("refresh-token-cookie")
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth('admin', 'client')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Auth('admin', 'client')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Auth('admin', 'client')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
