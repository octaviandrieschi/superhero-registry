# Superhero Registry Application

This is a full-stack application that allows users to manage a registry of superheroes, including their names, superpowers, and humility scores.

## Project Structure

```
superhero-app/
├── backend/                     # NestJS backend application
│   ├── src/
│   │   ├── superhero/          # Superhero module
│   │   │   ├── dto/            # Data Transfer Objects
│   │   │   │   └── create-superhero.dto.ts  # Validation rules for superhero creation
│   │   │   ├── interfaces/     # TypeScript interfaces
│   │   │   │   └── superhero.interface.ts   # Superhero entity interface
│   │   │   ├── superhero.controller.ts      # API endpoints handling
│   │   │   ├── superhero.controller.spec.ts # Controller unit tests
│   │   │   ├── superhero.service.ts         # Business logic
│   │   │   └── superhero.service.spec.ts    # Service unit tests
│   │   ├── app.module.ts       # Main application module
│   │   ├── app.module.spec.ts  # Module unit tests
│   │   ├── main.ts            # Application entry point
│   │   └── main.spec.ts       # Bootstrap unit tests
│   ├── test/                  # E2E tests
│   ├── coverage/              # Test coverage reports
│   ├── jest.config.js        # Jest configuration
│   ├── package.json          # Backend dependencies
│   └── tsconfig.json         # TypeScript configuration
│
├── frontend/                  # React frontend application
│   ├── public/
│   │   └── index.html        # HTML entry point
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx          # Main React component
│   │   └── index.tsx        # React entry point
│   ├── package.json         # Frontend dependencies
│   └── tsconfig.json        # TypeScript configuration
```

## Key Components

### Backend

- **main.ts**: Bootstraps the NestJS application, configures CORS, and sets up global validation
- **app.module.ts**: Root module that imports and configures all application modules
- **superhero/**: Module containing all superhero-related functionality
  - **dto/**: Contains data validation rules using class-validator
  - **interfaces/**: TypeScript interfaces for type safety
  - **controller.ts**: Handles HTTP requests and routes
  - **service.ts**: Implements business logic and data storage
  - **\*.spec.ts**: Unit tests for components

### Frontend

- **App.tsx**: Main React component containing:
  - Form for adding new superheroes
  - Table display of all superheroes
  - Real-time updates and error handling
- **components/**: Reusable React components
- **hooks/**: Custom React hooks for shared logic
- **services/**: API integration and data fetching
- **types/**: TypeScript type definitions

## Setup and Running

### Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The backend server will run on http://localhost:3001

### Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend application will run on http://localhost:3000

## API Endpoints

### Superheroes

- `POST /superheroes`: Add a new superhero

  - Required fields:
    - name (string): The superhero's name
    - superpower (string): The superhero's special ability
    - humilityScore (number, 1-10): Rating of how humble they are
  - Returns: Created superhero object
  - Error responses:
    - 400: Invalid input data
    - 500: Server error

- `GET /superheroes`: Get all superheroes
  - Returns: Array of superheroes sorted by humility score in descending order
  - Each superhero object contains: id, name, superpower, and humilityScore
  - Error responses:
    - 500: Server error

## Features

- Add new superheroes with their name, superpower, and humility score
- View all superheroes in a table, sorted by their humility score
- Form validation for the humility score (must be between 1 and 10)
- Real-time updates when adding new superheroes
- Responsive design with modern UI
- Error handling and user feedback
- CORS enabled for frontend-backend communication

## Testing

### Backend Testing

The backend uses Jest as the testing framework with comprehensive test coverage:

1. **Unit Tests**:

```bash
cd backend
npm test                 # Run tests
npm run test:watch      # Run tests in watch mode
npm run test:cov        # Run tests with coverage
npm run test:debug      # Run tests in debug mode
```

Test files:

- `*.spec.ts`: Unit tests for individual components
- Test coverage for:
  - Controllers: API endpoint testing
  - Services: Business logic testing
  - DTOs: Validation testing
  - Modules: Configuration testing
  - Bootstrap: Application setup testing

2. **E2E Tests**:

```bash
npm run test:e2e       # Run end-to-end tests
```

3. **Test Coverage Requirements**:

- Minimum coverage thresholds:
  - Statements: 95%
  - Branches: 90%
  - Functions: 95%
  - Lines: 95%

### Frontend Testing (TODO)

- Unit tests for React components
- Integration tests for API services
- E2E tests with Cypress

## Code Quality

- ESLint for code linting
- Prettier for code formatting
- SonarLint for static code analysis

## Technologies Used

### Backend

- **Framework**:

  - NestJS: Modern Node.js framework
  - TypeScript: Type-safe JavaScript

- **Validation & Security**:

  - class-validator: Input validation
  - class-transformer: Object transformation
  - helmet: Security headers

- **Testing**:
  - Jest: Testing framework
  - SuperTest: HTTP testing
  - Test coverage reporting

### Frontend

- **Core**:

  - React: UI library
  - TypeScript: Type-safe JavaScript

- **State & Data Fetching**:

  - React Query: Server state management
  - Axios: HTTP client

- **UI & Styling**:
  - Modern CSS: Responsive design
  - CSS Modules: Scoped styling
