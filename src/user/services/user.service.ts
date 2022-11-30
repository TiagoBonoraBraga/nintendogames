import { IUserEntity } from '../entities/user.entity';
import { UserDto } from './dto/userinput.dto';
import { randomUUID } from 'crypto';
import { PartialUserDto } from './dto/partialUserinput.dto';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { Exception } from 'src/utils/exceptions/exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<IUserEntity[]> {
    return await this.userRepository.findAllUsers();
  }

  async getUserById(userId: string): Promise<IUserEntity> {
    const foundUser = await this.userRepository.findUserById(userId);
    return foundUser;
  }

  async createUser(user: UserDto): Promise<IUserEntity> {
    const userEntity = { ...user, id: randomUUID() };
    if (user.password.length <= 7) {
      throw new Exception(
        Exceptions.InvalidData,
        'Senha deve ter no mínio 7 characteres',
      );
    }
    const createdUser = await this.userRepository.createUser(userEntity);
    return createdUser;
  }

  async updateUser(id: string, userData: PartialUserDto): Promise<IUserEntity> {
    const updatedUser = await this.userRepository.updateUser(id, userData);
    return updatedUser;
  }

  async deleteUserById(userId: string): Promise<boolean> {
    try {
      const existiUser = await this.userRepository.deleteUser(userId);
      if (existiUser) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return true;
    }
  }
}
