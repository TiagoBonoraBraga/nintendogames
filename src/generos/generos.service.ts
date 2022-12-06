import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';
import { GeneroRepository } from './genero.repository';

@Injectable()
export class GenerosService {
  generoRepository: any;
  constructor(private readonly profileRepository: GeneroRepository) {}

  async createGenero(genero: CreateGeneroDto): Promise<CreateGeneroDto> {
    const generoEntity = { ...genero, id: randomUUID() };
    const createdGenero = await this.generoRepository.createGenero(
      generoEntity,
    );
    return createdGenero;
  }

  async getAllGeneros(): Promise<Genero[]> {
    return await this.generoRepository.findAllGeneros();
  }

  async getGeneroById(generoId: string): Promise<Genero> {
    const foundGenero = await this.profileRepository.findGeneroById(generoId);
    return foundGenero;
  }

  async updateGenero(
    id: string,
    generoData: UpdateGeneroDto,
  ): Promise<UpdateGeneroDto> {
    const updatedGenero = await this.generoRepository.updateGenero(
      id,
      generoData,
    );
    return updatedGenero;
  }

  async deleteGeneroById(generoId: string): Promise<boolean> {
    try {
      const existiGenero = await this.generoRepository.deleteGenero(generoId);
      if (existiGenero) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return true;
    }
  }
}
