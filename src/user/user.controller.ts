import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/PartialUserInput.dto';
import { UserDto } from './services/dto/userinput.dto';
import { UserService } from './services/user.service';
import { Response } from 'express';
import { handleException } from 'src/utils/exceptions/exceptionsHelper';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  async getAllUsers(): Promise<IUserEntity[]> {
    return await this.service.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<IUserEntity> {
    try {
      return await this.service.getUserById(userId);
    } catch (error) {
      handleException(error);
    }
  }

  @Post()
  async createUser(
    @Body() { cpf, email, password, name, role }: UserDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.service.createUser({
        cpf,
        email,
        password,
        name,
        role,
      });
      response.status(201).send(result);
    } catch (error) {
      handleException(error);
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: PartialUserDto,
  ): Promise<IUserEntity> {
    try {
      return await this.service.updateUser(id, userData);
    } catch (error) {
      handleException(error);
    }
  }

  @Delete(':id')
  async DeleteUserById(@Param('id') userId: string): Promise<string> {
    const userIsDeleted = await this.service.deleteUserById(userId);
    if (userIsDeleted) {
      return 'Usuário deletado com sucesso';
    } else {
      return 'Usuário não encontrado';
    }
  }
}
