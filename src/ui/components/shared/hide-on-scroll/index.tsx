import * as React from 'react';
import { useScrollTrigger, Slide } from '@material-ui/core';

interface Props {
  children: React.ReactElement;
}

export const HideOnScroll: React.FC<Props> = ({ children }) => {
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
};
