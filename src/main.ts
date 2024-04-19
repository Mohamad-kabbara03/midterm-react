import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'; // Correct import statement

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configure CORS options
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  };
  
  // Enable CORS using the configured options
  app.enableCors(corsOptions);

  await app.listen(3001);
}
bootstrap();
