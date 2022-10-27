import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UiComponentsProps {}

const StyledUiComponents = styled.div`
  color: pink;
`;

export function UiComponents(props: UiComponentsProps) {
  console.log(props);
  return (
    <StyledUiComponents>
      <h1>Welcome to UiComponents!</h1>
    </StyledUiComponents>
  );
}

export default UiComponents;
