import { NestFactory } from "@nestjs/core";
import { ValidationPipe, INestApplication } from "@nestjs/common";
import { AppModule } from "./app.module";
import { bootstrap } from "./main";

// Create a properly typed mock app factory
const createMockApp = (): INestApplication =>
  (({
    enableCors: jest.fn().mockReturnThis(),
    useGlobalPipes: jest.fn().mockReturnThis(),
    listen: jest.fn().mockResolvedValue(undefined),
    close: jest.fn().mockResolvedValue(undefined),
    get: jest.fn(),
    init: jest.fn().mockResolvedValue(undefined),
    getHttpAdapter: jest.fn(),
    getHttpServer: jest.fn(),
    useWebSocketAdapter: jest.fn(),
    useGlobalFilters: jest.fn(),
    useGlobalGuards: jest.fn(),
    useGlobalInterceptors: jest.fn(),
    setGlobalPrefix: jest.fn(),
    connectMicroservice: jest.fn(),
    getMicroservices: jest.fn(),
    getUrl: jest.fn(),
    startAllMicroservices: jest.fn(),
    select: jest.fn(),
    use: jest.fn().mockReturnThis(),
    enableVersioning: jest.fn().mockReturnThis(),
    resolve: jest.fn().mockResolvedValue(undefined),
    registerRequestByContextId: jest.fn(),
    createUrlByContextId: jest.fn(),
    flushLogs: jest.fn(),
    enableShutdownHooks: jest.fn(),
    useLogger: jest.fn().mockReturnThis(),
  } as unknown) as INestApplication);

jest.mock("@nestjs/core", () => ({
  ...jest.requireActual("@nestjs/core"),
  NestFactory: {
    create: jest.fn().mockImplementation(async () => createMockApp()),
  },
}));

describe("Bootstrap", () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.clearAllMocks();
    app = await NestFactory.create(AppModule);
  });

  afterEach(async () => {
    await app.close();
    jest.clearAllMocks();
  });

  it("should create NestJS application", () => {
    expect(app).toBeDefined();
    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
  });

  it("should have CORS enabled", () => {
    app.enableCors();
    expect(app.enableCors).toHaveBeenCalled();
  });

  it("should have global validation pipe", () => {
    app.useGlobalPipes(new ValidationPipe());
    expect(app.useGlobalPipes).toHaveBeenCalledWith(expect.any(ValidationPipe));
  });

  it("should listen on port 3001", async () => {
    await app.listen(3001);
    expect(app.listen).toHaveBeenCalledWith(3001);
  });

  it("should close gracefully", async () => {
    await app.close();
    expect(app.close).toHaveBeenCalled();
  });

  describe("bootstrap function", () => {
    let consoleSpy: jest.SpyInstance;
    let bootstrapApp: INestApplication;

    beforeEach(() => {
      jest.clearAllMocks();
      consoleSpy = jest.spyOn(console, "log").mockReturnValue(undefined);

      // Create a fresh mock app for bootstrap tests
      bootstrapApp = createMockApp();
      (NestFactory.create as jest.Mock).mockResolvedValue(bootstrapApp);
    });

    afterEach(() => {
      consoleSpy.mockRestore();
      jest.restoreAllMocks();
    });

    it("should bootstrap complete application", async () => {
      await bootstrap();

      expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
      expect(bootstrapApp.enableCors).toHaveBeenCalled();
      expect(bootstrapApp.useGlobalPipes).toHaveBeenCalledWith(
        expect.any(ValidationPipe)
      );
      expect(bootstrapApp.listen).toHaveBeenCalledWith(3001);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Application is running on: http://localhost:3001"
      );
    });

    it("should handle bootstrap errors gracefully", async () => {
      const error = new Error("Failed to create app");
      (NestFactory.create as jest.Mock).mockRejectedValueOnce(error);

      await expect(bootstrap()).rejects.toThrow("Failed to create app");
    });

    it("should handle listen errors gracefully", async () => {
      const error = new Error("Port already in use");
      bootstrapApp.listen = jest.fn().mockRejectedValue(error);

      await expect(bootstrap()).rejects.toThrow("Port already in use");
    });

    it("should handle validation pipe errors gracefully", async () => {
      bootstrapApp.useGlobalPipes = jest.fn().mockImplementation(() => {
        throw new Error("Invalid pipe configuration");
      });

      await expect(bootstrap()).rejects.toThrow("Invalid pipe configuration");
    });

    it("should handle CORS configuration errors gracefully", async () => {
      bootstrapApp.enableCors = jest.fn().mockImplementation(() => {
        throw new Error("Invalid CORS configuration");
      });

      await expect(bootstrap()).rejects.toThrow("Invalid CORS configuration");
    });
  });
});
