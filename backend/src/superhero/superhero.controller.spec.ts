import { Test, TestingModule } from "@nestjs/testing";
import { SuperheroController } from "./superhero.controller";
import { SuperheroService } from "./superhero.service";
import { CreateSuperheroDto } from "./dto/create-superhero.dto";
import { Superhero } from "./interfaces/superhero.interface";

/**
 * Test suite for SuperheroController
 * Tests the HTTP layer of the application using mocked service
 */
describe("SuperheroController", () => {
  let controller: SuperheroController;
  let service: SuperheroService;

  // Sample superhero data for testing
  const sampleSuperhero: CreateSuperheroDto = {
    name: "Test Hero",
    superpower: "Unit Testing",
    humilityScore: 8,
  };

  // Mock superhero with ID
  const mockSuperhero: Superhero = {
    id: 1,
    ...sampleSuperhero,
  };

  // Set up before each test
  beforeEach(async () => {
    const mockService = {
      create: jest.fn(
        (dto: CreateSuperheroDto): Superhero => ({
          id: 1,
          ...dto,
        })
      ),
      findAll: jest.fn((): Superhero[] => [mockSuperhero]),
    };

    // Create a testing module with controller and mocked service
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroController],
      providers: [
        {
          provide: SuperheroService,
          useValue: mockService,
        },
      ],
    }).compile();

    // Get instances of controller and service
    controller = module.get<SuperheroController>(SuperheroController);
    service = module.get<SuperheroService>(SuperheroService);
  });

  // Test controller instantiation
  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new superhero", async () => {
      // Create a superhero and verify the service was called
      const result = await controller.create(sampleSuperhero);
      expect(service.create).toHaveBeenCalledWith(sampleSuperhero);
      expect(result).toEqual({
        id: 1,
        ...sampleSuperhero,
      });
    });

    it("should create multiple superheroes with unique IDs", async () => {
      // Mock service to return different IDs
      (service.create as jest.Mock)
        .mockImplementationOnce(
          (dto: CreateSuperheroDto): Superhero => ({
            id: 1,
            ...dto,
          })
        )
        .mockImplementationOnce(
          (dto: CreateSuperheroDto): Superhero => ({
            id: 2,
            ...dto,
          })
        );

      const hero1 = await controller.create(sampleSuperhero);
      const hero2 = await controller.create({
        ...sampleSuperhero,
        name: "Another Hero",
      });

      expect(hero1.id).not.toBe(hero2.id);
      expect(service.create).toHaveBeenCalledTimes(2);
    });
  });

  describe("findAll", () => {
    it("should return an empty array when no superheroes exist", async () => {
      // Mock service to return empty array
      (service.findAll as jest.Mock).mockResolvedValueOnce([]);

      const result = await controller.findAll();
      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it("should return all superheroes sorted by humility score", async () => {
      // Mock service to return sorted heroes
      const mockSortedHeroes: Superhero[] = [
        { id: 1, name: "Most Humble", superpower: "Wisdom", humilityScore: 10 },
        { id: 2, name: "Less Humble", superpower: "Power", humilityScore: 5 },
        {
          id: 3,
          name: "Least Humble",
          superpower: "Strength",
          humilityScore: 3,
        },
      ];
      (service.findAll as jest.Mock).mockResolvedValueOnce(mockSortedHeroes);

      const result = await controller.findAll();

      expect(result).toEqual(mockSortedHeroes);
      expect(service.findAll).toHaveBeenCalled();
    });

    it("should maintain superhero data between calls", async () => {
      // Mock service to return consistent data
      const mockHeroes: Superhero[] = [mockSuperhero];
      (service.findAll as jest.Mock).mockResolvedValue(mockHeroes);

      const firstCall = await controller.findAll();
      const secondCall = await controller.findAll();

      expect(firstCall).toEqual(secondCall);
      expect(service.findAll).toHaveBeenCalledTimes(2);
    });
  });

  describe("error handling", () => {
    it("should handle service errors gracefully", async () => {
      // Mock service to throw an error
      const testError = new Error("Service error");
      (service.create as jest.Mock).mockRejectedValueOnce(testError);

      await expect(controller.create(sampleSuperhero)).rejects.toThrow(
        testError
      );
    });

    it("should handle valid data correctly", async () => {
      const validHero: CreateSuperheroDto = {
        name: "Valid Hero",
        superpower: "Testing",
        humilityScore: 5,
      };

      const result = await controller.create(validHero);
      expect(service.create).toHaveBeenCalledWith(validHero);
      expect(result.humilityScore).toBe(validHero.humilityScore);
    });
  });

  describe("integration with service", () => {
    it("should coordinate between create and findAll", async () => {
      // Mock service behavior for create and findAll
      const createdHeroes: Superhero[] = [
        { id: 1, ...sampleSuperhero },
        {
          id: 2,
          name: "Second Hero",
          superpower: "Integration Testing",
          humilityScore: 9,
        },
      ];

      (service.create as jest.Mock)
        .mockImplementationOnce((): Superhero => createdHeroes[0])
        .mockImplementationOnce((): Superhero => createdHeroes[1]);

      (service.findAll as jest.Mock).mockResolvedValueOnce(createdHeroes);

      // Create heroes
      await controller.create(sampleSuperhero);
      await controller.create({
        name: "Second Hero",
        superpower: "Integration Testing",
        humilityScore: 9,
      });

      // Verify findAll results
      const allHeroes = await controller.findAll();
      expect(allHeroes).toEqual(createdHeroes);
      expect(service.create).toHaveBeenCalledTimes(2);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
