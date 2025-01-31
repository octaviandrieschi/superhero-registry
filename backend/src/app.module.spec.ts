import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "./app.module";
import { SuperheroController } from "./superhero/superhero.controller";
import { SuperheroService } from "./superhero/superhero.service";

describe("AppModule", () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it("should be defined", () => {
    expect(module).toBeDefined();
  });

  it("should have SuperheroController", () => {
    const controller = module.get<SuperheroController>(SuperheroController);
    expect(controller).toBeDefined();
  });

  it("should have SuperheroService", () => {
    const service = module.get<SuperheroService>(SuperheroService);
    expect(service).toBeDefined();
  });

  it("should have properly configured providers", () => {
    const service = module.get<SuperheroService>(SuperheroService);
    const controller = module.get<SuperheroController>(SuperheroController);

    // Verify service injection into controller
    expect((controller as any).superheroService).toBe(service);
  });
});
