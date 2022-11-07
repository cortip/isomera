import React from 'react';
import { GithubContributorInterface } from '@isomera/interfaces';
import styled from 'styled-components';
import { Container } from '../layout/container';
import { shadow, spacing, themeConfig } from '../../config/theme';

interface Props {
  contributors: Array<GithubContributorInterface>;
}

export const ContributorsComponent: React.FC<Props> = ({ contributors }) => {
  return (
    <Wrapper>
      <Container>
        <Title>Code contributors</Title>
        <InnerWrapper>
          {contributors
            ?.filter((c) => c.author.type !== 'Bot')
            .sort((a, b) => b.total - a.total)
            .map((contributor) => (
              <ContributorWrapper
                href={`https://www.github.com/${contributor.author.login}`}
                target="_blank"
                image={contributor.author.avatar_url}
                key={contributor.author.id}
              >
                <Username>@{contributor.author.login}</Username>
                <Commits>
                  Commits:{' '}
                  {contributor.weeks.reduce((value, obj) => value + obj.c, 0)}
                </Commits>
                <CodeLines>
                  Lines added:{' '}
                  {contributor.weeks.reduce(
                    (value, obj) => value + (obj.a - obj.d),
                    0
                  )}
                </CodeLines>
              </ContributorWrapper>
            ))}
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${themeConfig.color.bg.secondary};
  padding: ${spacing(8)}px 0;
`;

const Title = styled.h2`
  color: white;
  margin-bottom: ${spacing(3)}px;
`;

const InnerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0;
`;

const ContributorWrapper = styled.a<{ image?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${spacing(1)}px;

  background-position: center;
  background-size: cover;
  ${(props) => (props.image ? `background-image: url(${props.image});` : '')};

  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);

  ::before {
    content: '';
    padding-bottom: 100%;
    display: block;
  }

  :hover {
    transform: scale(1.1, 1.1) rotate(5deg);
    transition: all 0.9s ease-in-out;

    -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
    filter: grayscale(0%);

    z-index: 999;

    ${shadow()}
  }
`;

const Username = styled.span`
  text-shadow: 1px 1px 4px #ffffff;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: ${spacing(1)}px;
`;

const Commits = styled.span`
  display: block;
  text-shadow: 1px 1px 1px #ffffff;
`;

const CodeLines = styled.span`
  display: block;
  text-shadow: 1px 1px 1px #ffffff;
`;
