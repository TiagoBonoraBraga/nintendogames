import { UserDto } from '../services/dto/userinput.dto';

export interface IUserEntity extends UserDto {
  id: string;
}
