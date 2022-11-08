import styled from 'styled-components';
import { TopNavigationComponent } from '../components/TopNavigation/TopNavigation.component';
import { GithubContributorInterface } from '@isomera/interfaces';
import { FC } from 'react';
import Head from 'next/head';
import * as React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { ContributorsComponent } from '../components/Contributors/Contributors.component';
import { HomepageHeroComponent } from '../components/Hero/HomepageHero.component';

interface Props {
  contributors: Array<GithubContributorInterface>;
}

export const Index: FC<Props> = ({ contributors }) => {
  return (
    <>
      <Head>
        <title>Isomera - Headless CMS built by community ❤️</title>
      </Head>
      <StyledPage>
        <TopNavigationComponent />
        <HomepageHeroComponent />
        <ContributorsComponent contributors={contributors} />
      </StyledPage>
    </>
  );
};

export default Index;

const StyledPage = styled.div`
  .page {
  }
`;

export const getServerSideProps: GetServerSideProps<{
  contributors: Array<GithubContributorInterface>;
}> = async () => {
  let data = [];
  try {
    // https://docs.github.com/en/rest/metrics/statistics#get-all-contributor-commit-activity
    const response = await axios.get(
      `https://api.github.com/repos/cortip/isomera/stats/contributors`
    );
    if (response && [200, 201].includes(response.status) && response.data) {
      data = response.data;
      console.log('xxx', data);
    }
  } catch (e) {
    console.error(e);
  }

  return { props: { contributors: data } };
};
