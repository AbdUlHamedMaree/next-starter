import React from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  '@keyframes sk-stretchdelay': {
    '0%, 40%, 100%': {
      transform: 'scaleY(0.4)',
    },
    '20%': {
      transform: 'scaleY(1.0)',
    },
  },
  root: {
    textAlign: 'center',
    fontSize: '1em',
    width: 'max-content',
    '& > div': {
      backgroundColor: theme.palette.secondary.main,
      height: '3em',
      width: '0.4em',
      margin: '0px 0.05em',
      display: 'inline-block',

      animation: '$sk-stretchdelay 1.2s infinite ease-in-out',
    },
    '& > div:nth-child(2)': {
      animationDelay: '-1.1s',
    },
    '& > div:nth-child(3)': {
      animationDelay: '-1s',
    },
    '& > div:nth-child(4)': {
      animationDelay: '-0.9s',
    },
    '& > div:nth-child(5)': {
      animationDelay: '-0.8s',
    },
  },
}));

type Props = {};

export const LoadingRect: React.FC<Props> = ({}) => {
  const cls = useStyles();
  return (
    <div className={cls.root}>
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
