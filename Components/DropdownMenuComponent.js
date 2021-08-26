import {Button, Menu, MenuItem, withStyles} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import PersonIcon from '@material-ui/icons/Person';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import {useState} from 'react';

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
    minWidth: 'fit-content',
    width: '10vw'
  },
}))(MenuItem);

export default function DropdownMenuComponent({user}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
  )
}
