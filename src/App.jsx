import React from 'react';
import { Nav } from './components/Navbar';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';

const TitleLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  color: 'whitesmoke',
  textDecoration: 'none',
  fontSize: '38px',
  justifyContent: 'center',
}));

function App() {
  return (
    <div>
      <TitleLink href="/">Tarot Spread App</TitleLink>
      <Nav />
      {/* <Header /> */}
      {/* <Social /> */}
    </div>
  );
}

export default App;