export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

// type Primitive = string | number | boolean | bigint;
type NotAFunction<TVal, TRet> = TVal extends Function ? never : TRet;

type PojoOfObject<O> = {
  [K in keyof O as NotAFunction<O[K], K>]: PojoOf<O[K]>;
} & {};

export type PojoOf<T> = T extends Array<infer A> ? Array<A> : T extends Record<string, any> ? PojoOfObject<T> : T;
