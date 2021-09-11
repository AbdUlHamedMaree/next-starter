import create, { GetState, SetState, StoreApi } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce, { Draft } from 'immer';
import pipe from 'ramda/src/pipe';
import { StateCreator, BaseState, WithDevtools } from './types';

const immer =
  <TState extends BaseState, TActions extends BaseState>(
    config: StateCreator<
      TState,
      (fn: (draft: Draft<TState>) => void) => void,
      TActions
    >
  ): StateCreator<TState, SetState<TState>, TActions> =>
  (set, get, api) =>
    config(fn => set(produce(fn) as (state: TState) => TState), get, api);

const combine =
  <PrimaryState extends BaseState, SecondaryState extends BaseState>(
    initialState: PrimaryState,
    create: (
      set: SetState<PrimaryState>,
      get: GetState<PrimaryState & SecondaryState>,
      api: StoreApi<PrimaryState & SecondaryState>
    ) => SecondaryState
  ): StateCreator<PrimaryState & SecondaryState> =>
  (set, get, api) =>
    Object.assign(
      {},
      initialState,
      create(
        set as SetState<PrimaryState>,
        get as GetState<PrimaryState & SecondaryState>,
        api as StoreApi<PrimaryState & SecondaryState>
      )
    );

const combineAndImmer = <
  PrimaryState extends BaseState,
  SecondaryState extends BaseState
>(
  initialState: PrimaryState,
  config: StateCreator<
    PrimaryState,
    (fn: (draft: Draft<PrimaryState>) => void) => void,
    SecondaryState
  >
): StateCreator<PrimaryState & SecondaryState> => {
  return combine(initialState, immer(config));
};

const withDevtools: WithDevtools = name => config => devtools(config, name);

const withPersist =
  (name: string) =>
  <T extends BaseState>(config: StateCreator<T>) =>
    persist(config, { name });

export const createStore = (name: string) =>
  pipe(combineAndImmer, withPersist(name), withDevtools(name), create);

export const createStoreWithOutPersist = (name: string) =>
  pipe(combineAndImmer, withDevtools(name), create);
