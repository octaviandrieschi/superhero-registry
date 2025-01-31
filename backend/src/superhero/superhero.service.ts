import { Injectable } from "@nestjs/common";
import { CreateSuperheroDto } from "./dto/create-superhero.dto";
import { Superhero } from "./interfaces/superhero.interface";

/**
 * Service handling the business logic for superhero operations
 * Manages an in-memory storage of superheroes and provides methods for CRUD operations
 */
@Injectable()
export class SuperheroService {
  /**
   * In-memory storage for superheroes
   * Marked as readonly to prevent reassignment of the array reference
   */
  private readonly superheroes: Superhero[] = [];

  /**
   * Counter for generating unique superhero IDs
   * Increments with each new superhero creation
   */
  private currentId = 1;

  /**
   * Creates a new superhero and adds it to the storage
   * @param createSuperheroDto - The data for creating a new superhero
   * @returns The created superhero with an assigned ID
   */
  create(createSuperheroDto: CreateSuperheroDto): Superhero {
    const superhero = {
      id: this.currentId++,
      ...createSuperheroDto,
    };
    this.superheroes.push(superhero);
    return superhero;
  }

  /**
   * Retrieves all superheroes sorted by humility score in descending order
   * @returns Array of superheroes
   */
  findAll(): Superhero[] {
    return [...this.superheroes].sort(
      (a, b) => b.humilityScore - a.humilityScore
    );
  }
}
