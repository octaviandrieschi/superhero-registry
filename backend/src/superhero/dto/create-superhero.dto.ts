import { IsString, IsInt, Min, Max } from "class-validator";

/**
 * Data Transfer Object for creating a new superhero
 * Contains validation rules for each property using class-validator decorators
 */
export class CreateSuperheroDto {
  /**
   * The name of the superhero
   * Must be a string value
   */
  @IsString()
  name: string;

  /**
   * The superpower of the superhero
   * Must be a string value
   */
  @IsString()
  superpower: string;

  /**
   * A score representing how humble the superhero is
   * Must be an integer between 1 and 10
   */
  @IsInt()
  @Min(1)
  @Max(10)
  humilityScore: number;
}
