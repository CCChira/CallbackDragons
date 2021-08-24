import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Grid, Input, Paper, Typography} from '@material-ui/core';
import {useRouter} from 'next/router';

import {Octokit} from '@octokit/core';
import RepoCard from './RepoCard';
import styles from '../styles/Home.module.css';

const useStyles = makeStyles({
  UDDContainer: {
    margin: 20,
    width: '90%'
  },
  userDataBox: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
    margin: 30,
  },
  avatar: {
    verticalAlign: 'middle',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '5px',
    marginBottom: '5px'
  },
  userDataElement: {
    margin: 5,
    fontSize: 18
  },
  userName: {
    fontWeight: 600,
    fontSize: 18,
    fontStyle: 'italic'
  },
  searchBar: {
    marginLeft: '35vw',
    marginBottom: '2vh',
    width: '20vw',
  }
});

const initialData = {
  user: {
    avatar_url: 'https://avatars.githubusercontent.com/u/68700184?v=4',
    login: 'octocat',
    followers: 12,
    following: 1
  },
  repos: []
};

const UserDataDisplay = () => {
  const router = useRouter();
  let userName = 'octocat';
  userName = router.query.userName;

  const [data, setData] = useState(initialData);
  const [displayedRepos, setDisplayedRepos] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const octokit = new Octokit();
        const [data, user] = await Promise.all([octokit.request(`GET /users/${userName}/repos`), octokit.request(`GET /users/${userName}`)]);

        setData({user: user.data, repos: data.data});
        setDisplayedRepos(data.data);
      } catch (err) {
        setData(initialData);
      }

    })();
  }, [userName]);

  const handleInput = (event) => setDisplayedRepos(data.repos.filter((repo) => repo.name.toLowerCase().includes(event.target.value.toLowerCase())));

  return (
      <Box component="div" className={`${classes.UDDContainer} ${styles.background}`}>

        <Paper elevation={4} className={classes.userDataBox}>
          <img src={data.user.avatar_url} alt="Avatar" className={classes.avatar}/>
          <Typography className={`${classes.userDataElement} ${classes.userName}`}>{data.user.login}</Typography>
          <Typography className={classes.userDataElement}>Followers: {data.user.followers}</Typography>
          <Typography className={classes.userDataElement}>Following: {data.user.following}</Typography>
          <Typography className={classes.userDataElement}>Repos: {data.repos.length}</Typography>
        </Paper>
        <Input onChange={handleInput} className={classes.searchBar} placeholder="Search for repo"/>
        <Grid container spacing={4} columns={{xs: 12, sm: 6, md: 4}}>
          {
            displayedRepos.map((repo) => (
                <Grid item xs={12} sm={6} md={4} key={repo.id}>
                  <RepoCard repo={repo} userName={userName}/>
                </Grid>
            ))
          }
        </Grid>
      </Box>
  );
};

export default UserDataDisplay;
