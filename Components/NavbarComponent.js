import AppBar from '@material-ui/core/AppBar';
import {
  Toolbar,
  makeStyles,
  Typography
} from '@material-ui/core';
import SearchbarComponent from './SearchbarComponent';
import Link from '@material-ui/core/Link';
import {useUser} from '@auth0/nextjs-auth0';
import {AccountTreeSharp, FaceSharp} from '@material-ui/icons';
import {useRouter} from 'next/router';
import DropdownMenuComponent from './DropdownMenuComponent';

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

function NavbarComponent() {
  const router = useRouter();
  const path = router.pathname;
  const {user} = useUser();
  const classes = useStyles();


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
              <DropdownMenuComponent user={user}/>
              :
              <Link href="/api/auth/login">
                <FaceSharp className={classes.profile}/>
              </Link>
            }
            {(!user && path === '/') ? <></> : <SearchbarComponent/>}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavbarComponent;
