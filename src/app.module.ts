import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { UserService } from './user/services/user.service';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';
import { ProfileModule } from './profile/profile.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [DatabaseModule, ProfileModule, GamesModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}
