import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule , DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder().setTitle('My WebServices').
  setLicense('MIT','http://localhost:3000').
  setDescription('this is a web service').
  setVersion('!.0').addTag('My Custon App').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || 3000;
  console.log("successfully started")
  await app.listen(port);
}
bootstrap();
