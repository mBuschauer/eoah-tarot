import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import SingleCard from './SingleCard';

export const Nav = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<SingleCard />} />
      </Routes>
    </>
  );
};

// Styled link wrapper
const StyledNavLink = ({ to, children }) => (
  <Link
    component={NavLink}
    to={to}
    sx={{
      color: 'whitesmoke',
      textDecoration: 'none',
      fontSize: '16px',
      // WebkitTextStroke: '0.5px black',
      '&.active': {
        fontWeight: 'bold',
        textDecoration: 'underline',
      },
    }}
  >
    {children}
  </Link>
);
