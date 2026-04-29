import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173', // Vite
      'https://trade2-fly-frontend.vercel.app', // produção
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();