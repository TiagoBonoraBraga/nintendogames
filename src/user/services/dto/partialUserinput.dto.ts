import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './userinput.dto';
//PartialType para poder fazer um pacth
export class PartialUserDto extends PartialType(UserDto) {
  //PartialType deixa os requisitos do UserDto nao obrigatorios para poder fazer um patch e nao ker atualizar td.
  id: string; //menos o id fica opcional
}
