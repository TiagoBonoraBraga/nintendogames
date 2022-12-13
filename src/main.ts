import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // aki o NestFactory esta criando com os parametros do decorator@Module q esta sendo feito no app.module.ts atraves do AppModule q foi exportado do app.module
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Nintendo Games')
    .setDescription('Api de jogos antigos NintedoGames')
    .setVersion('1.0')
    .addTag('Nintendo Games')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3344);
}
bootstrap();
