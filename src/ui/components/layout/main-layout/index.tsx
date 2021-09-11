import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Box, useMediaQuery } from '@material-ui/core';

import { Header } from '../header';
import { MainFooter } from '../footer';
import { HideOnScroll } from '../../shared';
import { BottomNavbar } from '../bottom-navbar';
import { MobileNavbar } from '../mobile-navbar';
import { DesktopNavbar } from '../desktop-navbar';

const useStyles = makeStyles(() => ({
  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 5,
  },
  main: {},
  footer: {},
}));

export const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallScreens = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <HideOnScroll>
        <header className={classes.header}>
          {smallScreens ? (
            <MobileNavbar />
          ) : (
            <>
              <Header />
              <DesktopNavbar />
            </>
          )}
        </header>
      </HideOnScroll>

      <main className={classes.main}>{children}</main>

      <Box
        component='footer'
        className={classes.footer}
        sx={{ bgcolor: 'grey.100' }}
      >
        <MainFooter />
        <Box my={2} />
        <BottomNavbar />
      </Box>
    </>
  );
};
