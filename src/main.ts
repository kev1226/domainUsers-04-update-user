import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Global API prefix
   * All routes will be prefixed with /api/users
   */
  app.setGlobalPrefix('api/users');

  /**
   * Global input validation using class-validator decorators
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /**
   * CORS configuration to allow cross-origin requests
   */
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  /**
   * Swagger documentation setup
   * Accessible at /api/users/docs
   */
  const config = new DocumentBuilder()
    .setTitle('Update User Service')
    .setDescription('API to update user data (admin only)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/users/docs', app, document);

  // Kafka setup (disabled for now)
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'update-user',
  //       brokers: ['3.232.44.31:9092'],
  //     },
  //     consumer: {
  //       groupId: 'update-user-group-client',
  //     },
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3004);
}
bootstrap();
