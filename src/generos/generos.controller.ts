import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { GenerosService } from './generos.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Response } from 'express';
import { handleException } from 'src/utils/exceptions/exceptionsHelper';
import { Genero } from './entities/genero.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Generos')
@Controller('generos')
export class GenerosController {
  constructor(private readonly generosService: GenerosService) {}

  @Post()
  async createGenero(
    @Body() { titulo }: CreateGeneroDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.generosService.createGenero({
        titulo,
      });
      response.status(201).send(result);
    } catch (error) {
      handleException(error);
    }
  }

  @Get()
  async getAllGeneros(): Promise<Genero[]> {
    return this.generosService.getAllGeneros();
  }

  @Get(':id')
  async getGeneroById(@Param('id') generoId: string): Promise<Genero> {
    try {
      return await this.generosService.getGeneroById(generoId);
    } catch (error) {
      handleException(error);
    }
  }

  @Patch(':id')
  async updateGenero(
    @Param('id') id: string,
    @Body() generoData: UpdateGeneroDto,
  ): Promise<UpdateGeneroDto> {
    try {
      return await this.generosService.updateGenero(id, generoData);
    } catch (error) {
      handleException(error);
    }
  }

  @Delete(':id')
  async DeleteGeneroById(@Param('id') generoId: string): Promise<string> {
    const generoIsDeleted = await this.generosService.deleteGeneroById(
      generoId,
    );
    if (generoIsDeleted) {
      return 'Genero deletado com sucesso';
    } else {
      return 'Genero não encontrado';
    }
  }
}
