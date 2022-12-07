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
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Response } from 'express';
import { handleException } from 'src/utils/exceptions/exceptionsHelper';
import { Game } from './entities/game.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async createGame(
    @Body() { name, descricao, year, autor, produtora, score }: CreateGameDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.gamesService.createGame({
        name,
        descricao,
        year,
        autor,
        produtora,
        score,
      });
      response.status(201).send(result);
    } catch (error) {
      handleException(error);
    }
  }

  @Get()
  async getAllGames(): Promise<Game[]> {
    return this.gamesService.getAllGames();
  }

  @Get(':id')
  async getGameById(@Param('id') gameId: string): Promise<Game> {
    try {
      return await this.gamesService.getGameById(gameId);
    } catch (error) {
      handleException(error);
    }
  }

  @Patch(':id')
  async updateGame(
    @Param('id') id: string,
    @Body() gameData: UpdateGameDto,
  ): Promise<UpdateGameDto> {
    try {
      return await this.gamesService.updateGame(id, gameData);
    } catch (error) {
      handleException(error);
    }
  }

  @Delete(':id')
  async DeleteGameById(@Param('id') gameId: string): Promise<string> {
    const gameIsDeleted = await this.gamesService.deleteGameById(gameId);
    if (gameIsDeleted) {
      return 'Game deletado com sucesso';
    } else {
      return 'Game não encontrado';
    }
  }
}
