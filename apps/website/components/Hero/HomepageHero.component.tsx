import React from 'react';
import styled from 'styled-components';
import { Container } from '../layout/container';
import { desktop, shadow, spacing, themeConfig } from '../../config/theme';
import Illustration from '../../assets/illustrtation1.svg';

export const HomepageHeroComponent = () => {
  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          <ColumnContent>
            <Brand>Isomera - Headless CMS</Brand>
            <Headline>
              Free Cloud Hosted Headless CMS, built by users themselves
            </Headline>
            <CTAWrapper>
              <CTATryIt href="https://app.isomera.org">
                {"Try, it's free"}
              </CTATryIt>
              <CTAContribute
                href="https://github.com/cortip/isomera"
                target="_blank"
              >
                Contribute {'</>'}
              </CTAContribute>
            </CTAWrapper>
          </ColumnContent>
          <ColumnIllustration>
            <Illustration />
          </ColumnIllustration>
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const InnerWrapper = styled.div`
  padding: ${spacing(10)}px 0;

  ${desktop`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  `}
`;

const ColumnContent = styled.div`
  flex-grow: 1;
  width: 50%;
  padding-right: ${spacing(5)}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ColumnIllustration = styled.div`
  flex-grow: 1;
  width: 50%;
`;

const Brand = styled.h1`
  font-size: 64px;
  color: #515151;
  margin: 0;
`;

const Headline = styled.h2`
  font-weight: 200;
  font-size: 38px;
`;

const CTAWrapper = styled.div`
  display: flex;
  gap: ${spacing(3)}px;
  margin-top: ${spacing(3)}px;
`;

const CTATryIt = styled.a`
  background-color: ${themeConfig.color.bg.primary};
  color: white;
  padding: ${spacing(2)}px ${spacing(3)}px;
  font-size: 22px;
  line-height: 1;
  margin-top: -5px;
  border-radius: 8px;

  :hover {
    filter: brightness(95%);

    transform: scale(1.1, 1.1) rotate(5deg);
    transition: all 0.4s ease-in-out;

    z-index: 999;

    ${shadow()}
  }
`;

const CTAContribute = styled(CTATryIt)`
  background-color: black;
`;
