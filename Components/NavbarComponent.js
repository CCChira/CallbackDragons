import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, makeStyles, Typography , Badge, } from '@material-ui/core';
import { AccountTreeSharp } from '@material-ui/icons';
const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#FFFFFF',
    position: 'fixed',
  },
  logo: {
    color: '#440044',
    padding: '2px',
  }
})
function NavbarComponent() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position = 'static' className = {classes.navbar}>
        <Toolbar>
            <AccountTreeSharp fontSize = "large" className = {classes.logo}/>
            <Typography className = {classes.logo} variant= "h5">CBDragons</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavbarComponent
