import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import React from 'react';
import { Logo } from '@isomera/ui-components';
import Link from 'next/link';

const TOP_NAVIGATION_PAGES = [{ href: '/', label: 'Home' }];

export const TopNavigationComponent: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar color="default" position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link href={'/'}>
              <Logo />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {TOP_NAVIGATION_PAGES.map((page) => (
                <MenuItem key={page.href} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, mr: 1 }}>
            <Logo isBadge={false} width={140} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {TOP_NAVIGATION_PAGES.map((page) => (
              <Button
                key={page.href}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box
            sx={{ flexGrow: 0 }}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Button
              component="a"
              href="https://app.isomera.org"
              color="primary"
              variant="contained"
              sx={{ mr: 2 }}
              size="small"
            >
              Sign In
            </Button>
            <IconButton
              component="a"
              href="https://github.com/cortip/isomera"
              target="_blank"
            >
              <GitHubIcon sx={{ fill: 'black' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
