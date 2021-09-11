import type { FC } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    '::selection': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
    },
    body: {
      maxWidth: 2000,
      margin: '0 auto',
    },
    img: {
      width: '100%',
    },
    'img, svg, video, canvas, audio, iframe, embed, object': {
      display: 'block',
      verticalAlign: 'middle',
    },

    // styles for mui divider make it grid for iphone devices.
    '.MuiDivider-withChildren': {
      display: 'grid',
      gridTemplateRows: '1fr',
      gridTemplateColumns: '1fr auto 1fr',
      placeItems: 'center',
      '&::before': {
        top: 'auto',
        left: 'auto',
        height: 'auto',
        width: '100%',
      },
      '&::after': {
        top: 'auto',
        left: 'auto',
        height: 'auto',
        width: '100%',
      },
    },
    '.MuiDivider-withChildrenVertical': {
      gridTemplateRows: '1fr auto 1fr',
      gridTemplateColumns: '1fr',
      '&::before': {
        top: 'auto',
        left: 'auto',
        height: '100%',
        width: 'auto',
      },
      '&::after': {
        top: 'auto',
        left: 'auto',
        height: '100%',
        width: 'auto',
      },
    },
    // embla carousel styles
    '.embla': {
      overflow: 'hidden',
    },
    '.embla__container': {
      display: 'flex',
    },
    '.embla__slide': {
      position: 'relative',
      flex: '0 0 100%',
    },
  },
}));

export const GlobalStyles: FC = () => {
  useStyles();

  return null;
};
