import { Constructor } from '../types/utils';


export class Registry {

  private static instance: Registry;

  private readonly services: Map<string, Constructor<any>> = new Map();

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

    this.services.set(implementation.name, implementation);
  }

  resolve<T>(implementation: Constructor<T>): T {
    const token = implementation.name;
    const impl = this.services.get(token);

    if(!impl) {
      throw new Error(`${token} was not found in the registry`);
    }

    return new impl();
  }
}

