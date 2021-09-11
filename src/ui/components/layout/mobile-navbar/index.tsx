import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
} from '@material-ui/core';
import { Home, Menu } from '@material-ui/icons';
import React from 'react';
import { Logo } from 'src/ui/components';
import { useRouter } from 'next/router';
import _ListItemButton from '@material-ui/core/ListItemButton';
import { styled } from '@material-ui/styles';
import { isIOS } from '@/constants';
import { Link } from '../../shared';

const ListItemButton = styled(_ListItemButton)(({ theme }) => ({
  transition: '.3s',
  '&.Mui-selected': {
    borderLeft: `5px solid ${theme.palette.primary.light}`,
    // backgroundColor: hsla.fromString(theme.palette.primary.light, {
    //   alpha: 0.3,
    // }),
    // '&:hover': {
    //   backgroundColor: hsla.fromString(theme.palette.primary.dark, {
    //     alpha: 0.3,
    //   }),
    // },
    '& > .MuiListItemText-root > .MuiListItemText-primary': {
      fontWeight: 500,
    },
  },
  '& > .MuiListItemIcon-root': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    // backgroundColor: hsla.fromString(theme.palette.primary.main, {
    //   alpha: 0.3,
    // }),
  },
}));

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const baseNav: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: <Home />,
  },
];

export const MobileNavbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { pathname } = useRouter();

  return (
    <>
      <AppBar color='secondary'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            edge='start'
            color='primary'
            onClick={() => setOpen(true)}
          >
            <Menu />
          </IconButton>
          <Link href='/' underline='none'>
            <Logo size={0.8} />
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <SwipeableDrawer
        open={open}
        anchor='left'
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        disableBackdropTransition={!isIOS}
        disableDiscovery={isIOS}
      >
        <Box
          sx={{ width: 250 }}
          role='presentation'
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <Link href='/' underline='none'>
            <Logo p={1} size={1.4} />
          </Link>
          <List>
            {baseNav.map(({ icon, href, title }) => (
              <Link href={href} key={href} underline='hover'>
                <ListItemButton selected={pathname === href}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};
