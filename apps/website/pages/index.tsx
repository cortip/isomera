import * as React from 'react';
import Head from 'next/head';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { TopNavigationComponent } from '../components/TopNavigation/TopNavigation.component';
import axios from 'axios';
import { FC } from 'react';
import { GithubContributorInterface } from '@isomera/interfaces';
import { ContributorsComponent } from '../components/Contributors/Contributors.component';

interface Props {
  contributors: Array<GithubContributorInterface>;
}

export const Index: FC<Props> = ({ contributors }) => {
  const theme = useTheme();
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
      <Box mt={15} sx={{ background: theme.palette.grey.A700 }}>
        <Container sx={{ pt: 5, pb: 7 }}>
          <Typography variant="h2" color="white" mb={4}>
            🛠 Code contributors
          </Typography>
          <ContributorsComponent contributors={contributors} />
        </Container>
      </Box>
    </>
  );
};

export default Index;

export async function getServerSideProps({ res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  let data = [];
  try {
    // https://docs.github.com/en/rest/metrics/statistics#get-all-contributor-commit-activity
    const response = await axios.get(
      `https://api.github.com/repos/cortip/isomera/stats/contributors`
    );
    data = response.data;
  } catch (e) {
    console.error(e);
  }

  return { props: { contributors: data } };
}
