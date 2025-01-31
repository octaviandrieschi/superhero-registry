import { Test, TestingModule } from "@nestjs/testing";
import { SuperheroService } from "./superhero.service";

/**
 * Test suite for SuperheroService
 * Demonstrates unit testing with Jest and NestJS Testing Module
 */
describe("SuperheroService", () => {
  let service: SuperheroService;

  // Set up before each test
  beforeEach(async () => {
    // Create a testing module with SuperheroService
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroService],
    }).compile();

    // Get an instance of the service
    service = module.get<SuperheroService>(SuperheroService);
  });

  // Test service instantiation
  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  // Test superhero creation
  it("should create a superhero with correct properties", () => {
    const superheroData = {
      name: "Test Hero",
      superpower: "Testing",
      humilityScore: 8,
    };

    const superhero = service.create(superheroData);

    // Verify all properties are set correctly
    expect(superhero).toEqual({
      id: 1,
      ...superheroData,
    });
  });

  // Test ID auto-increment
  it("should auto-increment superhero IDs", () => {
    const hero1 = service.create({
      name: "Hero 1",
      superpower: "Power 1",
      humilityScore: 5,
    });

    const hero2 = service.create({
      name: "Hero 2",
      superpower: "Power 2",
      humilityScore: 7,
    });

    expect(hero1.id).toBe(1);
    expect(hero2.id).toBe(2);
  });

  // Test sorting by humility score
  it("should return superheroes sorted by humility score in descending order", () => {
    // Create heroes with different humility scores
    service.create({
      name: "Less Humble Hero",
      superpower: "Flying",
      humilityScore: 5,
    });
    service.create({
      name: "Most Humble Hero",
      superpower: "Strength",
      humilityScore: 10,
    });
    service.create({
      name: "Least Humble Hero",
      superpower: "Speed",
      humilityScore: 3,
    });

    const heroes = service.findAll();

    // Verify sorting
    expect(heroes[0].humilityScore).toBe(10); // Most humble first
    expect(heroes[1].humilityScore).toBe(5);
    expect(heroes[2].humilityScore).toBe(3); // Least humble last
  });

  // Test empty list handling
  it("should return empty array when no superheroes exist", () => {
    const heroes = service.findAll();
    expect(heroes).toEqual([]);
  });

  // Test data persistence
  it("should maintain superhero list between operations", () => {
    service.create({
      name: "Hero 1",
      superpower: "Power 1",
      humilityScore: 7,
    });

    const heroes = service.findAll();
    expect(heroes).toHaveLength(1);
    expect(heroes[0].name).toBe("Hero 1");
  });
});
