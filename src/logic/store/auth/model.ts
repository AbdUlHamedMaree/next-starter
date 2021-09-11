export type AuthModelState = {
  authenticated: boolean;
  user?: Record<string, unknown>;
};

export type AuthModelActions = {
  setAuthenticated: (auth: boolean) => void;
  setUser: (user?: Record<string, unknown>) => void;
};
