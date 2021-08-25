import {useDispatch, useSelector} from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {alpha, makeStyles} from '@material-ui/core/styles';

import {setQueryString} from '../store/actions';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '80%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '60%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchBarComponent = () => {
  const queryString = useSelector((state) => state.searchbar.queryString);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleInput = (event) => {
    if (event.code !== 'Enter') {
      dispatch(setQueryString(event.target.value));
    }
  };

  const navigate = (event) => {
    if (event.code === 'Enter') {
      location.assign("/search");
    }
  };

  return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon/>
        </div>
        <InputBase
            onChange={handleInput}
            onKeyDown={navigate}
            placeholder="Search…"
            value={queryString}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{'aria-label': 'search'}}
        />
      </div>
  );
};

export default SearchBarComponent;
