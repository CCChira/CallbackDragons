import AppBar from '@material-ui/core/AppBar';
import {
  Toolbar,
  makeStyles,
  Typography, Button, Menu, MenuItem, withStyles,
} from '@material-ui/core';
import SearchbarComponent from './SearchbarComponent';
import Link from '@material-ui/core/Link';
import {useUser} from '@auth0/nextjs-auth0';
import {AccountTreeSharp, ExitToApp, FaceSharp} from '@material-ui/icons';
import {useRouter} from 'next/router';
import {useState} from 'react';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'radial-gradient(circle, rgba(135,200,255,0.9669001389618347) 43%, rgba(141,214,255,1) 75%, rgba(102,209,255,1) 100%)'
  },
  logo: {
    display: 'flex',
    position: 'relative',
    color: '#000000',
    padding: '2px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  profile: {
    position: 'relative',
    marginTop: '0.2em',
    marginRight: '0.5rem',
    color: '#000000',
  },
  right: {
    display: 'flex',
    alignItems: 'center'
  },
  tag: {
    textDecoration: 'none',
    color: 'white',
  },
  logout: {
    color: '#ff3232',
  }
});

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))(MenuItem);

function NavbarComponent() {
  const router = useRouter();
  const path = router.pathname;
  const {user} = useUser();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <div>
              <Link style={{display: 'flex', textDecoration: 'none'}} href="/">
                <AccountTreeSharp fontSize="large" className={classes.logo}/>
                <Typography className={classes.logo} variant="h5"> CBDragons </Typography>
              </Link>
            </div>
            <div className={classes.right}>
              {user ?
                  <>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                      Welcome, {user.name}.
                    </Button>
                    <StyledMenu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                      <Link style={{textDecoration: 'none', color: 'black'}} href="/">
                        <StyledMenuItem onClick={handleClose}><PersonIcon
                            style={{paddingRight: '0.3rem'}}/> Profile</StyledMenuItem>
                      </Link>
                      <Link style={{textDecoration: 'none', color: 'black'}} href="/api/auth/logout">
                        <StyledMenuItem color="primary" onClick={handleClose}> <MeetingRoomIcon
                            style={{paddingRight: '0.3rem'}}/> Logout</StyledMenuItem>
                      </Link>
                    </StyledMenu>
                  </>
                  :
                  // eslint-disable-next-line @next/next/no-html-link-for-pages
                  <a href="/api/auth/login">
                    <FaceSharp className={classes.profile}/>
                  </a>
              }
              {(!user && path === '/') ?
                  <></>
                  :
                  <SearchbarComponent/>
              }
            </div>
          </Toolbar>
        </AppBar>
      </div>
  );
}

export default NavbarComponent;
