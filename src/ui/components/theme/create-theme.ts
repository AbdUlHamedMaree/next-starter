import merge from 'lodash/merge';
import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
  Direction,
  Theme,
  ThemeOptions,
} from '@material-ui/core/styles';
import { Options } from '@material-ui/core';

declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    default: string;
    paper: string;
    primary: {
      main: string;
      hover: string;
      active: string;
    };
    secondary: {
      main: string;
      hover: string;
      active: string;
    };
  }
  interface TypeText {
    third: string;
  }
}
declare module '@material-ui/core' {
  function useMediaQuery<T = Theme>(
    query: string | ((theme: T) => string),
    options?: Options
  ): boolean;

  interface PaletteColor {
    darker?: string;
    hover?: string;
    active?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
    hover?: string;
    active?: string;
  }
}

declare module '@material-ui/styles' {
  interface DefaultTheme extends Theme {}
}

interface ThemeConfig {
  direction?: Direction;
}

const baseOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#13628C',
      hover: '#074B6E',
      active: '#053A55',
    },
    secondary: {
      main: '#FB7F0D',
      hover: '#FBA758',
      active: '#FFB048',
    },
    background: {
      primary: {
        main: '#F6F8FC',
        hover: '#DCE7EE',
        active: '#B8D0DD',
      },
      secondary: {
        main: '#FFF8ED',
        hover: '#FEE5CF',
        active: '#FED9B6',
      },
    },
    text: {
      primary: '#171C31',
      secondary: '#747783',
      third: '#9FABC2',
    },
  },
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  typography: {
    allVariants: {
      lineHeight: 1.8,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'inherit',
        },
        sizeLarge: {
          padding: '8px 40px',
        },
        outlinedSizeLarge: {
          borderWidth: 1,
        },
      },
    },
  },
};

export const createTheme = (config: ThemeConfig = {}): Theme => {
  let theme = createMuiTheme(
    merge({}, baseOptions, {
      direction: config.direction,
    })
  );
  theme = responsiveFontSizes(theme);

  return theme;
};
