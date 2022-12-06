import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class CreateGameDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  descricao: string;

  @ApiProperty()
  @IsNumber()
  year: Date;

  @ApiProperty()
  @IsString()
  autor: string;

  @ApiProperty()
  @IsString()
  produtora: string;

  @ApiProperty()
  @IsNumber()
  score: number;
}
