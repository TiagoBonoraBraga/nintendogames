import { Module } from '@nestjs/common';
import { GenerosService } from './generos.service';
import { GenerosController } from './generos.controller';
import { GeneroRepository } from './genero.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GenerosController],
  providers: [GenerosService, GeneroRepository, PrismaService],
})
export class GenerosModule {}
