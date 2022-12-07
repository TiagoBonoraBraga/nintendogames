import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { GamesRepository } from './games.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GamesController],
  providers: [GamesService, GamesRepository, PrismaService],
})
export class GamesModule {}
