import { IUserEntity } from '../entities/user.entity';
import { UserDto } from './dto/userinput.dto';
import { randomUUID } from 'crypto';
import { PartialUserDto } from './dto/partialUserinput.dto';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

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
      throw new Error('enha inválida');
    }
    const createdUser = await this.userRepository.createUser(userEntity);
    return createdUser;
  }

  async updateUser(userData: PartialUserDto): Promise<IUserEntity> {
    const updatedUser = await this.userRepository.updateUser(userData);
    return updatedUser;
  }

  async deleteUserById(userId: string): Promise<boolean> {
    try {
      const existiUser = this.userRepository.deleteUser(userId);
      if (existiUser) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return true;
    }
  }
}
