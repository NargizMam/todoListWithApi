import { NavLink } from 'react-router-dom';
import { AppBar, styled, Toolbar, Typography } from '@mui/material';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <Link to="/">Todo list</Link>
        </Typography>
        <nav>
          <button> <a href="/tasks">Tasks</a></button>
          <button><a href="/users">User </a></button>

        </nav>
      </Toolbar>
    </AppBar>
  )
};

export default AppToolbar;