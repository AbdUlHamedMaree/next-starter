import type { FC } from 'react';
import { Box } from '@material-ui/core';
import { Logo } from '../logo';

export const SplashScreen: FC = () => {
  return (
    <div>
      <Box
        sx={{
          position: 'fixed',
          display: 'grid',
          placeContent: 'center',
          placeItems: 'center',
          backgroundColor: 'background.paper',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 2000,
        }}
      >
        <Logo size={2} maxWidth='80vw' />
      </Box>
    </div>
  );
};
