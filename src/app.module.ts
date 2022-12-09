import { Module } from '@nestjs/common';
import { DatabaseModule } from './prisma/database.module';
import { UserService } from './user/services/user.service';
import { UserController } from './user/user.controller';
import { UserRepository } from './user/user.repository';
import { ProfileModule } from './profile/profile.module';
import { GamesModule } from './games/games.module';
import { GenerosModule } from './generos/generos.module';
// import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
// import { ProfileController } from './profile/profile.controller';
// import { ProfileRepository } from './profile/profile.repository';
// import { ProfileService } from './profile/profile.service';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ProfileModule,
    GamesModule,
    GenerosModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}
