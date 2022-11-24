import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserinput.dto';
import { UserDto } from './services/dto/userinput.dto';
import { UserService } from './services/user.service';

@Controller()
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  async getAllUsers(): Promise<IUserEntity[]> {
    return await this.service.getAllUsers();
  }

  @Post()
  async createUser(
    @Body() { cpf, email, password, name, role }: UserDto,
  ): Promise<IUserEntity> {
    try {
      return await this.service.createUser({
        cpf,
        email,
        password,
        name,
        role,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Patch()
  async updateUser(@Body() userData: PartialUserDto): Promise<IUserEntity> {
    try {
      return await this.service.updateUser(userData);
    } catch (error) {
      console.log(error);
    }
  }
}
