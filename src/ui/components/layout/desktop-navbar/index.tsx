import { useGlobalStyles } from '@/styles';
import {
  Badge,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Image from 'next/image';
import { CompareOutlined } from '@/icons';
import { Search } from '@material-ui/icons';

interface Props {}

export const DesktopNavbar: React.FC<Props> = () => {
  const gs = useGlobalStyles();

  return (
    <Stack
      className={gs.responsiveContainer}
      direction='row'
      spacing={3}
      alignItems='center'
      sx={{
        bgcolor: 'primary.main',
        py: 2,
      }}
    >
      <Box sx={{ width: 150, height: 40, position: 'relative' }}>
        <Image
          src='/assets/images/layout/navbar/ep.png'
          layout='fill'
          objectFit='contain'
          alt='EP'
        />
      </Box>
      <TextField
        placeholder='Search goods or any other information'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Button
                variant='text'
                size='large'
                sx={{
                  bgcolor: 'background.primary.hover',
                  '&:hover': {
                    bgcolor: 'background.primary.active',
                  },
                }}
              >
                Search
              </Button>
            </InputAdornment>
          ),
          sx: { bgcolor: 'white' },
        }}
        sx={{ flex: 1 }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Badge
          badgeContent={4}
          color='secondary'
          sx={{
            '& span': {
              color: 'white',
            },
          }}
        >
          <CompareOutlined sx={{ fontSize: 40, color: 'white' }} />
        </Badge>
        <Typography color='white' ml={2}>
          Comparison
          <br />
          Table
        </Typography>
      </Box>
    </Stack>
  );
};
