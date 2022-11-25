import styled from 'styled-components';

import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmCode } from './pages/confirm-code';

export const App = () => {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-code" element={<ConfirmCode />} />
      </Routes>
      <ToastContainer />
    </StyledApp>
  );
};

const StyledApp = styled.div`
  // Your style here
`;
