import * as React from 'react';
import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { TopNavigationComponent } from '../components/TopNavigation/TopNavigation.component';

export function Index() {
  return (
    <>
      <Head>
        <title>Isomera - Headless CMS built by community!</title>
      </Head>
      <Container>
        <TopNavigationComponent />
        <Box sx={{ mt: 20, textAlign: 'center' }}>
          <Typography variant="h1">Isomera</Typography>
          <Typography variant="h2" mt={3}>
            Free Cloud Hosted Headless CMS{' '}
            <span style={{ color: 'red' }}>built by community</span>
          </Typography>
          <Typography variant="h3" mt={3}>
            Under Construction 🏗
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default Index;
