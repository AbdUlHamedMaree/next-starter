import { Box, Grid, Stack, SvgIconProps, Typography } from '@material-ui/core';
import { Phone, Room } from '@material-ui/icons';
import { useGlobalStyles } from '@/styles';
import React from 'react';

import { Link, Logo } from '@/components';

interface Props {}

export const MainFooter: React.FC<Props> = () => {
  const gs = useGlobalStyles();
  return (
    <Box className={gs.responsiveContainer} sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6} xl={4}>
          <Logo />
          <Typography mt={2} sx={{ color: 'text.third' }}>
            Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6} xl={4}>
          <Typography variant='h6' mb={2} fontWeight='bold'>
            Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs>
              <Stack spacing={2}>
                {['Become a Seller', 'Careers', 'Contact'].map(el => (
                  <Link
                    key={el}
                    href='#'
                    underline='hover'
                    sx={{ color: 'text.third' }}
                  >
                    {el}
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid item xs>
              <Stack spacing={2}>
                {['Privacy Policy', 'Terms and Conditions'].map(el => (
                  <Link
                    key={el}
                    href='#'
                    underline='hover'
                    sx={{ color: 'text.third' }}
                  >
                    {el}
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12} xl={4}>
          <Typography variant='h6' mb={2} fontWeight='bold'>
            Our Contacts
          </Typography>
          <Stack spacing={2}>
            <IDC label='+ 4 (509) 120 6705' icon={Phone} />
            <IDC
              label='1418 Riverwood Drive, Suite 3245 Cottonwood, CA 96052, United State'
              icon={Room}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

const IDC: React.VFC<{
  icon: React.ComponentType<SvgIconProps>;
  label: string;
}> = ({ label, icon: Icon }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Icon
      color='primary'
      sx={{
        bgcolor: 'background.primary.hover',
        borderRadius: 1,
      }}
    />
    <Typography sx={{ ml: 2, color: 'text.third' }}>{label}</Typography>
  </Box>
);
