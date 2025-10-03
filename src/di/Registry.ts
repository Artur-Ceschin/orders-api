import { Constructor } from '../types/utils';
import 'reflect-metadata';

export class Registry {

  private static instance: Registry;

  private readonly services: Map<string, Constructor<any>> = new Map();
  private readonly tokens: Map<string, Constructor<any>> = new Map();

  private constructor() {}

  static getInstance() {
    if(!Registry.instance) {
      Registry.instance = new Registry();
    }

    return Registry.instance;
  }

  register<T>(implementation: Constructor<T>) {
    const token = implementation.name;

    if(this.services.has(token)) {
      throw new Error(`${token} is already registered`);
    }

    this.services.set(token, implementation);
  }

  registerToken<T>(token: string, implementation: Constructor<T>) {
    if(this.tokens.has(token)) {
      throw new Error(`${token} is already registered`);
    }

    this.tokens.set(token, implementation);
  }

  resolve<T>(token: string): T {
    const implementation = this.services.get(token);

    if (!implementation) {
      throw new Error(`${token} was not found in the registry`);
    }

    const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', implementation) ?? [];
    const dependencies = paramTypes.map((_, index) => {
      const dependencyToken = Reflect.getMetadata(`inject:${index}`, implementation);
      return this.resolve(dependencyToken);
    });

    return new implementation(...dependencies);
  }
}

