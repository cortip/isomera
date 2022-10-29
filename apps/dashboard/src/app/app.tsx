import styled from 'styled-components';

import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';

export const App = () => {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  // Your style here
`;
