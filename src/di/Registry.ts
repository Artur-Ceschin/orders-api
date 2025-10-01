

type Constructor<T> = new (...args: any[]) => T

export interface DIContainer {
  register<T>(token: string, implementation: Constructor<T>): void;
  resolve<T>(token: string): T;
}

export class Registry implements DIContainer {

  private static instance: Registry;

  static getInstance() {
    if(!Registry.instance) {
      Registry.instance = new Registry();
    }

    return Registry.instance;
  }


  private readonly services: Map<string, Constructor<any>> = new Map();

  private constructor() {}

  register<T>(token: string, implementation: Constructor<T>) {
    if(this.services.has(token)) {
      throw new Error(`${token} is already registered`);
    }

    this.services.set(token, implementation);
  }

  resolve<T>(token: string): T {

    const impl = this.services.get(token);

    if(!impl) {
      throw new Error(`${token} was not found in the registry`);
    }

    return new impl();
  }
}

