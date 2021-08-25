import AppBar from '@material-ui/core/AppBar';
import {
  Toolbar,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { AccountTreeSharp, FaceSharp } from '@material-ui/icons';
import SearchbarComponent from './SearchbarComponent';
import Link from "next/link";
import {useUser} from "@auth0/nextjs-auth0";

const useStyles = makeStyles({
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    background: "radial-gradient(circle, rgba(135,200,255,0.9669001389618347) 43%, rgba(141,214,255,1) 75%, rgba(102,209,255,1) 100%)"
  },
  logo: {
    display: 'flex',
    position: 'relative',
    color: '#FFFFFF',
    padding: '2px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  profile: {
    position: 'relative',
    color: 'white',
    marginTop: '0.2em',
  },
  right: {
    display: 'flex',
  },
  tag: {
    textDecoration: 'none',
    color: 'white',
  },
  logout: {
    color: '#ff3232',
  }
})

function NavbarComponent() {
  const {user} = useUser();
  const classes = useStyles();

  return (
    <div>
      <AppBar position='static' className={classes.navbar}>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <a>
              <AccountTreeSharp fontSize="large" className={classes.logo}/>
            </a>
          </Link>

          <Typography className={classes.logo} variant="h5">
            <Link href="/">
              <a className={classes.tag}>
                CBDragons
              </a>
            </Link>
          </Typography>
          <div className={classes.right}>
            {user ?
              // eslint-disable-next-line @next/next/no-html-link-for-pages
              <a href="/api/auth/logout" className={classes.tag}>
                <Typography>
                  Welcome, {user.name}. <span className={classes.logout}>Logout</span>
                </Typography>
              </a>
              :
              // eslint-disable-next-line @next/next/no-html-link-for-pages
              <a href="/api/auth/login">
                <FaceSharp className={classes.profile}/>
              </a>
            }
            <SearchbarComponent/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavbarComponent;
