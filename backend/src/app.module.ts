import { Module } from "@nestjs/common";
import { SuperheroController } from "./superhero/superhero.controller";
import { SuperheroService } from "./superhero/superhero.service";

/**
 * Root module of the application
 * Configures all controllers and providers needed for the superhero functionality
 */
@Module({
  imports: [], // No additional modules needed for this simple application
  controllers: [SuperheroController], // Register the superhero controller
  providers: [SuperheroService], // Register the superhero service as a provider
})
export class AppModule {}
