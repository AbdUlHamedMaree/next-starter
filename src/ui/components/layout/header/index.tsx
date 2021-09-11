import { Link } from '@/components';
import { useGlobalStyles } from '@/styles';
import { Box, Button, Stack } from '@material-ui/core';
import React from 'react';

interface Props {}

export const Header: React.FC<Props> = () => {
  const gs = useGlobalStyles();
  return (
    <Box
      className={gs.responsiveContainer}
      sx={{
        bgcolor: 'background.primary.main',
        display: 'flex',
        justifyContent: 'flex-end',
        py: 2,
      }}
    >
      <Stack direction='row' spacing={2} alignItems='center'>
        <Box>
          <Stack direction='row' spacing={4} alignItems='center' px={2}>
            {['Products', 'Become a Seller', 'Careers', 'Contact Us'].map(
              el => (
                <Link
                  key={el}
                  href='#'
                  underline='hover'
                  fontWeight='medium'
                  sx={{ color: 'text.third' }}
                >
                  {el}
                </Link>
              )
            )}
          </Stack>
        </Box>
        <Button variant='outlined' size='large'>
          Register
        </Button>
        <Button variant='contained' size='large'>
          Login
        </Button>
      </Stack>
    </Box>
  );
};
