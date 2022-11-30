import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Exception } from './IException';

export enum Exceptions {
  InvalidData,
  DatabaseException,
  NotFoundData,
  UnauthorizedException,
}

export function handleException({ message, exception }: Exception) {
  if (
    exception === Exceptions.InvalidData ||
    exception === Exceptions.NotFoundData
  ) {
    throw new BadRequestException(message ? message : 'Dados inválidos');
  }
  if (exception === Exceptions.DatabaseException) {
    throw new InternalServerErrorException(
      message ? message : 'Error in Database',
    );
  }
  if (exception === Exceptions.UnauthorizedException) {
    throw new UnauthorizedException(
      message ? message : 'Você não tem permissão para realizar essa ação',
    );
  }
}
