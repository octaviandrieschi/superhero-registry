import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

/**
 * Bootstrap function to initialize and configure the NestJS application
 */
export async function bootstrap() {
  // Create a new NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow frontend communication from different origin
  app.enableCors();

  // Enable validation pipes globally for automatic DTO validation
  app.useGlobalPipes(new ValidationPipe());

  // Start the server on port 3001
  await app.listen(3001);
  console.log("Application is running on: http://localhost:3001");
}

// Execute the bootstrap function if this is the main entry point
if (require.main === module) {
  bootstrap();
}
