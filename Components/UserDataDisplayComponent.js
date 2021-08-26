import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import {Box, Grid, Input, Paper, Typography} from '@material-ui/core';
import {useRouter} from 'next/router';

import {Octokit} from '@octokit/core';
import RepoCard from './RepoCard';
import styles from '../styles/Home.module.css';

const useStyles = makeStyles({
  UDDContainer: {
    width: '100%',
    height: '100%',
  },
  userDataBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
    margin: 30,
  },
  gridContainer: {
    width: '95%',
    margin: '2.5%',
  },
  avatar: {
    verticalAlign: 'middle',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '5px',
    marginBottom: '5px',
  },
  userDataElement: {
    margin: 5,
    fontSize: 18,
  },
  userName: {
    fontWeight: 600,
    fontSize: 18,
    fontStyle: 'italic',
  },
  searchBar: {
    marginLeft: '40vw',
    marginBottom: '2vh',
    width: '20vw',
  },
});

const initialData = {
  user: {
    avatar_url: 'https://avatars.githubusercontent.com/u/68700184?v=4',
    login: 'No user',
    followers: 0,
    following: 0
  },
  repos: [],
};

const UserDataDisplay = () => {
  const router = useRouter();
  const loginUser = useSelector((state) => state.setLoginUser);
  const userName = '' || router.query.userName || loginUser.userName;

  const [data, setData] = useState(initialData);
  const [displayedRepos, setDisplayedRepos] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      if (userName) {
        const octokit = new Octokit();
        const [data, user] = await Promise.all([
          octokit.request(`GET /users/${userName}/repos`),
          octokit.request(`GET /users/${userName}`),
        ]);

        setData({ user: user.data, repos: data.data });
        setDisplayedRepos(data.data);
      } else {
        setData(initialData);
      }
    })();
  }, [userName]);

  const handleInput = (event) =>
    setDisplayedRepos(
      data.repos.filter((repo) =>
        repo.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );

  return (
    <Box
      component='div'
      className={`${classes.UDDContainer}`}
    >
      <Paper elevation={4} className={classes.userDataBox}>
        <img
          src={data.user.avatar_url}
          alt='Avatar'
          className={classes.avatar}
        />
        <Typography
          className={`${classes.userDataElement} ${classes.userName}`}
        >
          {data.user.login}
        </Typography>
        <Typography className={classes.userDataElement}>
          Followers: {data.user.followers}
        </Typography>
        <Typography className={classes.userDataElement}>
          Following: {data.user.following}
        </Typography>
        <Typography className={classes.userDataElement}>
          Repos: {data.repos.length}
        </Typography>
      </Paper>
      <Input
        onChange={handleInput}
        className={classes.searchBar}
        placeholder='Search for repo'
      />
      <Grid
        className={classes.gridContainer}
        container
        spacing={4}
        columns={{ xs: 12, sm: 6, md: 4 }}
      >
        {displayedRepos.map((repo) => (
          <Grid item xs={12} sm={6} md={4} key={repo.id}>
            <RepoCard repo={repo} userName={userName} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserDataDisplay;
