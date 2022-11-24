import { IUserEntity } from '../entities/user.entity';
import { UserDto } from './dto/userinput.dto';
import { randomUUID } from 'crypto';
import { PartialUserDto } from './dto/partialUserinput.dto';

export class UserService {
  private users: IUserEntity[] = [];

  async createUser(user: UserDto): Promise<IUserEntity> {
    const userEntity = { ...user, id: randomUUID() };
    this.users.push(userEntity);
    return userEntity;
  }

  async updateUser(userData: PartialUserDto): Promise<IUserEntity> {
    this.users.map((user, index) => {
      if (user.id === userData.id) {
        const UpdateUser = Object.assign(user, userData);
        this.users.splice(index, 1, UpdateUser);
      }
    });
    const updateUser = this.users.find((user) => user.id === userData.id);
    return updateUser;
  }

  async getAllUsers(): Promise<IUserEntity[]> {
    return this.users;
  }

  async deleteUserById(userId: string): Promise<boolean> {
    const existiUser = this.users.find((user) => user.id === userId);
    if (!existiUser) {
      return false;
    }
    this.users.map((user, index) => {
      if (user.id === userId) {
        this.users.splice(index, 1);
      }
    });
    return true;
  }

  async getUserById(userId: string): Promise<IUserEntity> {
    const existiUser = this.users.find((user) => user.id === userId);
    if (!existiUser) {
      throw new Error('Usuário não encontrado');
    }
    return existiUser;
  }
}
