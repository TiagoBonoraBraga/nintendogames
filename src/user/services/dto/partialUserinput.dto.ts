import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './userinput.dto';

export class PartialUserDto extends PartialType(UserDto) {
  id: string;
}
