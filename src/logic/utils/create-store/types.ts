import { GetState, SetState, StoreApi } from 'zustand';
import { NamedSet } from 'zustand/middleware';

export type BaseState = Record<string, any>;

export type StateCreator<
  T extends BaseState,
  CustomSetState = SetState<T>,
  U extends BaseState = T
> = (set: CustomSetState, get: GetState<T & U>, api: StoreApi<T & U>) => U;

export type WithDevtools = (prefix: string) => <S extends BaseState>(
  fn: (set: NamedSet<S>, get: GetState<S>, api: StoreApi<S>) => S
) => (
  set: SetState<S>,
  get: GetState<S>,
  api: StoreApi<S> & {
    dispatch?: unknown;
    devtools?: any;
  }
) => S;
