import AppBar from '@material-ui/core/AppBar';
import {
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
  Badge,
} from '@material-ui/core';
import { AccountTreeSharp, FaceSharp } from '@material-ui/icons';
const useStyles = makeStyles({
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'rgb(135,200,255)',
    background:
      'radial-gradient(circle, rgba(135,200,255,0.9669001389618347) 43%, rgba(141,214,255,1) 75%, rgba(102,209,255,1) 100%)',
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
  },
});
function NavbarComponent() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position='static' className={classes.navbar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logo}>
            <AccountTreeSharp fontSize='large' className={classes.logo} />
            <Typography className={classes.logo} variant='h5'>
              CBDragons
            </Typography>
          </div>
          <FaceSharp className={classes.profile} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavbarComponent;
