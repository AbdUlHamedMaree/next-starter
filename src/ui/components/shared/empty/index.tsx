import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Inbox } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: theme.palette.secondary.main,
    fontSize: '5rem',
  },
}));
export const Empty: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Inbox className={classes.icon} />
      <Typography color='textPrimary' variant='h2'>
        There is no data
      </Typography>
    </div>
  );
};
