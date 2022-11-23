import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // aki o NestFactory esta criando com os parametros do decorator@Module q esta sendo feito no app.module.ts atraves do AppModule q foi exportado do app.module
  await app.listen(3000);
}
bootstrap();
