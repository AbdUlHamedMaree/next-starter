import { createStore } from '@/utils';
import { AuthModelActions, AuthModelState } from './model';

export const useAuth = createStore('auth')<AuthModelState, AuthModelActions>(
  {
    authenticated: false,
  },
  set => ({
    setAuthenticated: auth =>
      set(s => {
        s.authenticated = auth;
      }),
    setUser: user =>
      set(s => {
        s.user = user;
      }),
  })
);
