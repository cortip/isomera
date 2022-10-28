import styled from 'styled-components';

import { Route, Routes, Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

export const App = () => {
  return (
    <StyledApp>
      <Typography variant="h1">Welcome to Isomera!</Typography>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Button component={Link} to="/page-2" variant="outlined">
                Click here for page 2.
              </Button>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </StyledApp>
  );
};

const StyledApp = styled.div`
  // Your style here
`;
