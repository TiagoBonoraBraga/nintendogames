import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';

@Injectable()
export class GeneroRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllGeneros(): Promise<Genero[]> {
    try {
      const allGeneros = await this.prisma.genero.findMany();
      return allGeneros;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findGeneroById(id: string): Promise<Genero> {
    try {
      const foundGenero = await this.prisma.genero.findUniqueOrThrow({
        where: { id: id },
      });
      return foundGenero;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async createGenero(genero: CreateGeneroDto): Promise<Genero> {
    try {
      const CreatedGenero = await this.prisma.genero.create({
        data: { ...genero, id: '' },
      });
      return CreatedGenero;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Error ao criar: Genero',
      );
    }
  }

  async updateGenero(
    id: string,
    genero: UpdateGeneroDto,
  ): Promise<UpdateGeneroDto> {
    try {
      const UpdatedGenero = await this.prisma.genero.update({
        where: { id: id },
        data: genero,
      });
      return UpdatedGenero;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteGenero(id: string): Promise<Genero> {
    try {
      const deletedGenero = await this.prisma.genero.delete({
        where: { id: id },
      });
      return deletedGenero;
    } catch (error) {
      throw new Exception(
        Exceptions.DatabaseException,
        'Genero não encontrado.',
      );
    }
  }
}
