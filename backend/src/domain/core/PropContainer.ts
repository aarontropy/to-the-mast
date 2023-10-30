// import { DeepReadonly } from "./types";

// const isPlainObject = (obj: any) =>
//   obj != null && typeof obj == "object" && Object.getPrototypeOf(obj) == Object.prototype;

// function promoteProps<TObj, TProps>(target: TObj, obj: TProps): asserts target is TObj & TProps {
//   if (!isPlainObject(obj)) {
//     return;
//   }

//   for (const key in obj) {
//     Object.defineProperty(target, key, {
//       get() {
//         return obj[key];
//       },
//     });
//   }
// }

// type Constructor<T extends PropContainer<TProps>, TProps> = { new (): T };
// type FinalType<TProps> = PropContainer<TProps> & DeepReadonly<TProps>;

// class PropContainer<TProps = unknown> {
//   private readonly _props: DeepReadonly<TProps>;

//   // static create<TThis extends FinalType<TProps>, TProps>(this: Constructor<TThis>, props: TProps): TThis & DeepReadonly<TProps> {
//   //   const pc = new PropContainer(props);
//   //   promoteProps(pc, pc._props);
//   //   return pc;
//   // }

//   constructor(props: TProps) {
//     if (this.assertValidProps) {
//       this.assertValidProps(props);
//     }
//     this._props = props as DeepReadonly<TProps>;
//   }

//   get props(): DeepReadonly<TProps> {
//     return this._props;
//   }

//   get value(): TProps {
//     return this.toJSON();
//   }

//   toJSON(): TProps {
//     return JSON.parse(JSON.stringify(this.props));
//   }
// }

// interface PropContainer {
//   assertValidProps?(props: any): void;
// }

// export default PropContainer;
