import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './database/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('litly swagger')
    .setDescription(
      'The end points of litly to help developer integrate with the APIs',
    )
    .setVersion('0.1')
    .build();
  const documentBuilder = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentBuilder);

  // Seed database on startup
  const seedService = app.get(SeedService);
  await seedService.seedMovies();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
void bootstrap();
