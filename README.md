# Orders API - Clean Architecture Refactoring

## Project Goal

This project demonstrates the refactoring process from a **simple, monolithic implementation** to a **well-designed, maintainable architecture** following Clean Architecture principles and SOLID design patterns.

## What We're Refactoring

### Before: Simple Implementation

- Direct dependencies on AWS services
- Business logic mixed with infrastructure concerns
- Hard to test and maintain
- Tight coupling between components

### After: Clean Architecture

- **Separation of Concerns**: Business logic separated from infrastructure
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Interface Segregation**: Small, focused interfaces
- **Factory Pattern**: Centralized object creation
- **Testability**: Easy to mock dependencies

## Architecture Overview

```
src/
├── entities/           # Business entities (Order)
├── useCases/          # Business logic (PlaceOrder)
├── Interfaces/        # Contracts/Abstractions
│   ├── gateways/      # External service interfaces
│   └── repositories/  # Data access interfaces
├── gateways/          # External service implementations
├── repository/        # Data access implementations
├── factories/         # Object creation and dependency injection
└── main.ts           # Application entry point
```

## Key Design Patterns Applied

### 1. **Dependency Injection**

- Use cases receive their dependencies through constructor injection
- No direct instantiation of concrete classes in business logic

### 2. **Factory Pattern**

- `factories/` directory contains factory functions
- Centralized object creation with proper dependency wiring
- Easy to swap implementations

### 3. **Interface Segregation**

- Small, focused interfaces (`IEmailGateway`, `IQueueGateway`, `IOrdersRepository`)
- Clients depend only on methods they actually use

### 4. **Repository Pattern**

- Data access abstraction through `IOrdersRepository`
- Business logic doesn't know about DynamoDB specifics

### 5. **Gateway Pattern**

- External service abstractions (`IEmailGateway`, `IQueueGateway`)
- Business logic doesn't know about AWS SES/SQS specifics

## Benefits of This Architecture

### ✅ **Testability**

- Easy to mock dependencies for unit testing
- Business logic can be tested in isolation

### ✅ **Maintainability**

- Clear separation of concerns
- Easy to understand and modify

### ✅ **Flexibility**

- Easy to swap implementations (e.g., different email providers)
- Easy to add new features without breaking existing code

### ✅ **Scalability**

- Each component has a single responsibility
- Easy to scale individual parts

## Example: How Dependencies Flow

```typescript
// main.ts - Application layer
const placeOrder = makePlaceOrder(); // Factory creates wired dependencies

// makePlaceOrder.ts - Factory layer
export function makePlaceOrder() {
  return new PlaceOrder(
    makeDynamoOrderRepository(), // Infrastructure
    makeSQSGateway(), // Infrastructure
    makeSESGateway(), // Infrastructure
  );
}

// PlaceOrder.ts - Business logic layer
export class PlaceOrder {
  constructor(
    private readonly ordersRepository: IOrdersRepository, // Interface
    private readonly queueGateway: IQueueGateway, // Interface
    private readonly emailGateway: IEmailGateway, // Interface
  ) {}
}
```

## Technologies Used

- **TypeScript** - Type safety and better developer experience
- **Fastify** - Fast web framework
- **AWS SDK** - DynamoDB, SES, SQS integration
- **Clean Architecture** - Architectural pattern
- **SOLID Principles** - Design principles

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run tsc:watch
pnpm start

# Run linter
pnpm run lint
```

## API Endpoints

- `POST /checkout` - Place a new order

## Learning Objectives

This refactoring demonstrates:

1. **How to separate business logic from infrastructure**
2. **How to make code testable through dependency injection**
3. **How to apply SOLID principles in practice**
4. **How to create maintainable and scalable code**
5. **How to use design patterns effectively**

The goal is to transform a simple, working solution into a robust, maintainable, and scalable architecture that follows industry best practices.
