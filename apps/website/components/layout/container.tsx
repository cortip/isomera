import React, { FC } from 'react';
import styled from 'styled-components';
import { spacing, themeConfig } from '../../config/theme';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  isWide?: boolean;
}

export const Container: FC<Props> = ({ children, isWide = false }) => {
  return <ContainerWrapper wide={isWide}>{children}</ContainerWrapper>;
};

const ContainerWrapper = styled.div<{ wide: boolean }>`
  display: block;
  margin: auto;
  padding: 0 ${spacing(2)}px;
  width: 100%;

  ${(props) =>
    props.wide
      ? `max-width: 100%; padding: 0 ${spacing(5)}px;`
      : `max-width: ${themeConfig.container.maxWidth}px`};

  @media only screen and (min-width: ${themeConfig.breakpoints.md}px) {
    //padding: 0;
  }
`;
