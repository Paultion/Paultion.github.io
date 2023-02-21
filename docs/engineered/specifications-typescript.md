---
title: typescript
order: 1
debug: true
group:
  title: specifications
---

##### 交叉类型(&)

```ts
type Mixin<T, X> = T & X;
```

##### 映射类型(in)

```ts
type InExample = 'a' | 'b' | 'c' | 'd';
type Obj = {
  [P in InExample]: string;
};
```

##### 类型约束(extends)

```ts
type MyExclude<T, U> = T extends U ? never : T;
type Type1 = string | number | object; // 联合类型
type TypeExclude = Exclude<Type1, string>; // number

/**
 * string extends string? => string
 * number extends string? => never
 * object extends string? => never
 */
```

##### 重映射(as)

```ts
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
```

##### 类型推导(infer)

> 1. infer 解包

```ts
type Ids = number[];
type Names = string[];
// type Unpacked<T> = T extends Names ? string : T extends Ids ? number : T;
type Unpacked<T> = T extends (infer R)[] ? R : T;

type idType = Unpacked<Ids>;
type nameType = Unpacked<Names>;
```

> 2. 推导联合类型

```ts
type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;

type T10 = Foo<{ a: string; b: string }>;
type T11 = Foo<{ a: string; b: number }>;
```

> 3. React 中 infer 的使用

```ts
import { Dispatch, ReducerAction, Reducer } from 'react';

type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any>
  ? S
  : never;
// Reducer类型
// type Reducer<S, A> = (prevState: S, action: A) => S;

// function useReducer<R extends Reducer<any, any>, I>(
//   reducer: R,
//   // ReducerState 推断类型
//   initializerArg: I & ReducerState<R>,
//   initializer: (arg: I & ReducerState<R>) => ReducerState<R>
// ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
```
