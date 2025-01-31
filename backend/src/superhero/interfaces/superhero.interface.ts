import { CreateSuperheroDto } from "../dto/create-superhero.dto";

/**
 * Interface representing a Superhero entity
 * Extends the CreateSuperheroDto to include an id field
 * Used for type safety when working with superhero objects
 */
export interface Superhero extends CreateSuperheroDto {
  /**
   * Unique identifier for the superhero
   * Automatically generated when creating a new superhero
   */
  id: number;
}
