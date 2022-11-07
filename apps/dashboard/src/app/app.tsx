import styled from 'styled-components';

import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </StyledApp>
  );
};

const StyledApp = styled.div`
  // Your style here
`;
