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

  resolve<T>(implementation: Constructor<T>): T {
    const token = implementation.name;
    const impl = this.services.get(token);

    if(!impl) {
      throw new Error(`${token} was not found in the registry`);
    }

    return this.createInstance(impl);
  }

  resolveByToken<T>(token: string): T {
    const impl = this.tokens.get(token);

    if(!impl) {
      throw new Error(`${token} was not found in the registry`);
    }

    return this.createInstance(impl);
  }

  private createInstance<T>(impl: Constructor<T>): T {
    const injectTokens: string[] = Reflect.getMetadata('inject:tokens', impl) || [];
    const paramTypes: Constructor<any>[] = Reflect.getMetadata('design:paramtypes', impl) || [];

    const dependencies = paramTypes.map((paramType, index) => {
      const injectToken = injectTokens[index];

      if (injectToken) {
        return this.resolveByToken(injectToken);
      }

      return this.resolve(paramType);
    });

    return new impl(...dependencies);
  }
}

