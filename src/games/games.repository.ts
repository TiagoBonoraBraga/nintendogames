import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exception } from 'src/utils/exceptions/exception';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllGames(): Promise<Game[]> {
    try {
      const allGames = await this.prisma.game.findMany();
      return allGames;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async findGameById(id: string): Promise<Game> {
    try {
      const foundGame = await this.prisma.game.findUniqueOrThrow({
        where: { id: id },
      });
      return foundGame;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async createGame(game: Game): Promise<Game> {
    try {
      const CreatedGame = await this.prisma.game.create({
        data: game,
      });
      return CreatedGame;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException, 'Error ao criar: Game');
    }
  }

  async updateGame(id: string, game: UpdateGameDto): Promise<UpdateGameDto> {
    try {
      const UpdatedGame = await this.prisma.game.update({
        where: { id: id },
        data: game,
      });
      return UpdatedGame;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException);
    }
  }

  async deleteGame(id: string): Promise<Game> {
    try {
      const deletedGame = await this.prisma.game.delete({
        where: { id: id },
      });
      return deletedGame;
    } catch (error) {
      throw new Exception(Exceptions.DatabaseException, 'Game não encontrado.');
    }
  }
}
