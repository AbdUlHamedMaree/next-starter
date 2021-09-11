import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'grid',
    placeContent: 'center',
    placeItems: 'center',
  },
}));
export const Loading: React.FC = () => {
  const cls = useStyles();
  return (
    <div className={cls.root}>
      <CircularProgress color='secondary' size='4rem' />
    </div>
  );
};
