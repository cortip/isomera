import React from 'react';
import { Logo } from '@isomera/ui-components';
import styled from 'styled-components';
import { shadow, spacing, themeConfig } from '../../config/theme';
import { Container } from '../layout/container';
import Link from 'next/link';

const TOP_NAVIGATION_PAGES = [{ href: '/', label: 'Home' }];

interface Props {
  isTransparent?: boolean;
}

export const TopNavigationComponent: React.FC<Props> = ({
  isTransparent = false,
}) => {
  return (
    <Wrapper isTransparent={isTransparent}>
      <Container>
        <InnerWrapper>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <NavWrapper>
            {TOP_NAVIGATION_PAGES.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </NavWrapper>
          <ActionsWrapper>
            <SignIn href="https://app.isomera.org">Sign In</SignIn>
            <SignUp href="https://app.isomera.org">Sign Up</SignUp>
          </ActionsWrapper>
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isTransparent?: boolean }>`
  ${(props) => (props.isTransparent ? '' : shadow())}
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: ${spacing(2)}px 0;
`;

const LogoWrapper = styled.div`
  flex-grow: 0;
`;

const NavWrapper = styled.div`
  padding: 0 ${spacing(4)}px;
  flex-grow: 1;
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacing(1)}px;
  flex-grow: 0;
`;

const SignIn = styled.a`
  background-color: ${themeConfig.color.bg.primary};
  color: white;
  padding: ${spacing(1)}px ${spacing(2)}px;
  font-size: 14px;
  line-height: 1;
  margin-top: -5px;
  border-radius: 5px;
`;

const SignUp = styled(SignIn)`
  background-color: ${themeConfig.color.bg.secondary};
  margin-left: 0;
`;
