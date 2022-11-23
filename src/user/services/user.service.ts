import { IUserEntity } from '../entities/user.entity';
import { UserDto } from './dto/userinput.dto';
import { randomUUID } from 'node:crypto';
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
}
