import 'reflect-metadata';

export function Inject(token: string) {
  return function (target: any, _: string | symbol | undefined, parameterIndex: number) {
    Reflect.defineMetadata(`inject:${parameterIndex}`, token, target);
  };
}
