import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';


const useStyles = makeStyles({
  root: {
    width: '70vw',
    marginTop: '0.5rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  avatar: {
    verticalAlign: 'middle',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '5px',
    marginBottom: '5px',
  },
});

export default function SearchItem({ result }) {
  const classes = useStyles();
  const [bio, setBio] = useState();

  useEffect(async () => {
    const octokit = new Octokit();
    const results = await octokit.request(`GET /users/${result.login}`, {
      username: result.login,
    });
    setBio(results.data.bio);
  });

  return (
    <Card className={classes.root}>
      <CardContent className={classes.root}>
        <img src={result.avatar_url} alt='Avatar' className={classes.avatar} />
          <Typography component='span' className={classes.text}>{result.login}</Typography>
        <Typography className={classes.text}>{bio}</Typography>
      </CardContent>
    </Card>
  );
}
