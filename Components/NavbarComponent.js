import AppBar from '@material-ui/core/AppBar';
import SearchbarComponent from './SearchbarComponent';
import {Toolbar, IconButton, makeStyles, Typography, Badge,} from '@material-ui/core';
import {useUser} from "@auth0/nextjs-auth0";
import {AccountTreeSharp, FaceSharp} from '@material-ui/icons';

const useStyles = makeStyles({
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    background: "rgb(135,200,255)",
    background: "radial-gradient(circle, rgba(135,200,255,0.9669001389618347) 43%, rgba(141,214,255,1) 75%, rgba(102,209,255,1) 100%)"
  },
  logo: {
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
    marginTop: '0.2em'
  },
  right: {
    display: 'flex',
  }
})

function NavbarComponent() {
    const {user} = useUser();
    const classes = useStyles();
    return (
        <div>
            <AppBar position='static' className={classes.navbar}>
                <Toolbar className={classes.toolbar}>
                    <AccountTreeSharp fontSize="large" className={classes.logo}/>
                    <Typography className={classes.logo} variant="h5">CBDragons</Typography>
                   <div className={classes.right}>
                       {user ? <a href="/api/auth/logout">Welcome {user.name}. Logout</a>
                        :
                        <a href="/api/auth/login">
                            <FaceSharp className={classes.profile}/>
                        </a>
                    }
                       <SearchbarComponent />
                   </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavbarComponent
