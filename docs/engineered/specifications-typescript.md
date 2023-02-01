---
title: typescript
order: 1
debug:  true
group:
  title: specifications
---

```js
import { Dispatch, Reducer, ReducerAction, useReducer } from 'react';

// 1. 泛型
function Generics() {}
// 2.  keyof typeof extends
function keywordsInTS() {}

// 3. infer
function infer() {
  // 1. infer解包
  function inferConstructType() {
    type Ids = number[];-
    type Names = string[];

    // type Unpacked<T> = T extends Names ? string : T extends Ids ? number : T;
    // type idType = Unpacked<Ids>; // idType 类型为 number
    // type nameType = Unpacked<Names>; // nameType 类型为string

    type Unpacked<T> = T extends (infer R)[] ? R : T;

    type idType = Unpacked<Ids>;
    type nameType = Unpacked<Names>;
  }

  // 2. 推导联合类型
  function inferUnionType() {
    type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;

    type T10 = Foo<{ a: string; b: string }>;
    type T11 = Foo<{ a: string; b: number }>;
    return 'test' as T10 & T11;
  }

  // 3. React中infer的使用
  function inferInReact() {
    // infer推断
    type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
    // Reducer类型
    type Reducer<S, A> = (prevState: S, action: A) => S;

    function useReducer<R extends Reducer<any, any>, I>(
      reducer: R,
      // ReducerState 推断类型
      initializerArg: I & ReducerState<R>,
      initializer: (arg: I & ReducerState<R>) => ReducerState<R>
    ): [ReducerState<R>, Dispatch<ReducerAction<R>>];
  }
}

```
