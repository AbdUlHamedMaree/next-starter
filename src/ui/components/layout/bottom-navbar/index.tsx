import { useGlobalStyles } from '@/styles';
import { Box } from '@material-ui/core';
import React from 'react';

interface Props {}

export const BottomNavbar: React.FC<Props> = () => {
  const gs = useGlobalStyles();
  return (
    <Box
      className={gs.responsiveContainer}
      sx={{
        borderTop: t => `1px solid ${t.palette.divider}`,
        py: 1,
        typography: 'body1',
        color: 'text.third',
      }}
    >
      2021 &copy; All right are reserved
    </Box>
  );
};
