import { createStore } from '@/utils';

type Directions = 'ltr' | 'rtl';
type Languages = 'en' | 'ar';

export type AppState = {
  direction: Directions;
  lang: Languages;
};

type AppActions = {
  setDirection: (dir: Directions) => void;
  setLanguage: (lang: Languages) => void;
};

const initialState: AppState = {
  direction: 'ltr',
  lang: 'en',
};

export const useApp = createStore('App')<AppState, AppActions>(
  initialState,
  set => ({
    setDirection: dir =>
      set(state => {
        state.direction = dir;
      }),

    setLanguage: lang =>
      set(state => {
        state.lang = lang;
      }),
  })
);
