import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { randomUUID } from 'crypto';
import { GamesRepository } from './games.repository';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(private readonly gameRepository: GamesRepository) {}

  async createGame(game: CreateGameDto): Promise<CreateGameDto> {
    const gameEntity = { ...game, id: randomUUID() };
    const createdGame = await this.gameRepository.createGame(gameEntity);
    return createdGame;
  }

  async getAllGames(): Promise<Game[]> {
    return await this.gameRepository.findAllGames();
  }

  async getGameById(gameId: string): Promise<Game> {
    const foundGame = await this.gameRepository.findGameById(gameId);
    return foundGame;
  }

  async updateGame(
    id: string,
    gameData: UpdateGameDto,
  ): Promise<UpdateGameDto> {
    const updatedGame = await this.gameRepository.updateGame(id, gameData);
    return updatedGame;
  }

  async deleteGameById(gameId: string): Promise<boolean> {
    try {
      const existiGame = await this.gameRepository.deleteGame(gameId);
      if (existiGame) {
        return true;
      }
    } catch (error) {
      console.log(error);
      return true;
    }
  }
}
