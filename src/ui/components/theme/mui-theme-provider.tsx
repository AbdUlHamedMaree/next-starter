import { ThemeProvider as StylesThemeProvider } from '@material-ui/styles';
import { ThemeProvider as CoreThemeProvider } from '@material-ui/core/styles';
import React from 'react';

import { useApp } from '@/zustand';
import { createTheme } from './create-theme';

export const MuiThemeProvider: React.FC = ({ children }) => {
  const [direction] = useApp(state => [state.direction]);

  const theme = React.useMemo(
    () =>
      createTheme({
        direction: direction,
      }),
    [direction]
  );
  return (
    <CoreThemeProvider theme={theme}>
      <StylesThemeProvider theme={theme}>{children}</StylesThemeProvider>
    </CoreThemeProvider>
  );
};
