import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const func =
  ({ spacing }: Theme, margin = false) =>
  (num: number) =>
    margin
      ? {
          marginRight: spacing(num),
          marginLeft: spacing(num),
        }
      : {
          paddingRight: spacing(num),
          paddingLeft: spacing(num),
        };

export const useGlobalStyles = makeStyles(theme => {
  const py = func(theme);
  const my = func(theme, true);
  return {
    responsiveContainer: {
      [theme.breakpoints.up('xl')]: py(12),
      [theme.breakpoints.down('xl')]: py(10),
      [theme.breakpoints.down('lg')]: py(6),
      [theme.breakpoints.down('md')]: py(4),
      [theme.breakpoints.down('sm')]: py(2),
    },
    responsiveContainerM: {
      [theme.breakpoints.up('xl')]: my(12),
      [theme.breakpoints.down('xl')]: my(10),
      [theme.breakpoints.down('lg')]: my(6),
      [theme.breakpoints.down('md')]: my(4),
      [theme.breakpoints.down('sm')]: my(2),
    },
    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gridCenter: {
      display: 'grid',
      placeContent: 'center',
    },
    fillImage: {
      position: 'absolute',
      objectFit: 'contain',
      height: '100%',
    },
  };
});
