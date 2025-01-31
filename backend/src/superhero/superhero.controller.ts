import { Controller, Get, Post, Body } from "@nestjs/common";
import { SuperheroService } from "./superhero.service";
import { CreateSuperheroDto } from "./dto/create-superhero.dto";

/**
 * Controller handling HTTP requests for superhero operations
 * Provides endpoints for creating and retrieving superheroes
 */
@Controller("superheroes")
export class SuperheroController {
  /**
   * Constructor injection of the SuperheroService
   * @param superheroService - Service handling superhero business logic
   */
  constructor(private readonly superheroService: SuperheroService) {}

  /**
   * POST endpoint to create a new superhero
   * @param createSuperheroDto - Validated request body containing superhero data
   * @returns The created superhero object
   */
  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroService.create(createSuperheroDto);
  }

  /**
   * GET endpoint to retrieve all superheroes
   * @returns Array of superheroes sorted by humility score
   */
  @Get()
  findAll() {
    return this.superheroService.findAll();
  }
}
