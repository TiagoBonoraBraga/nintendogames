import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGeneroDto {
  @ApiProperty()
  @IsString()
  titulo: string;
}
