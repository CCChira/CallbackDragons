import styles from '../styles/Home.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';
import RepoViewComponent from '../Components/RepoViewComponent';
import { Avatar, List, ListItem, Paper, Typography } from '@material-ui/core';
function provisionalRepoView() {
  const userName = 'CCChira';
  const [queryResults, setQueryResults] = useState([]);
  const [repoInfo, setRepoInfo] = useState({});
  useEffect(() => {
    (async () => {
      const octokit = new Octokit();
      const repoDetails = await octokit.request(
        `GET /repos/HadaIonut/CallbackDragons`
      );
      const repo = await octokit.request(
        `GET /repos/HadaIonut/CallbackDragons/commits`
      );
      const repoContents = await octokit.request(
        `GET /repos/HadaIonut/CallbackDragons/commits/${repo.data[0]['sha']}`
      );
      setRepoInfo(repoDetails);
      const commitContents = repoContents?.data.commit.tree;
      const files = await octokit.request(`GET ${commitContents.url}`);
      const fileArray = files.data.tree;
      fileArray.sort((a, b) => (a.type > b.type ? -1 : 1));
      setQueryResults(fileArray);
    })();
  }, []);
  return (
    <div
      className={styles.container}
      style={{ display: 'flex', flexDirection: 'row' }}
    >
      <Paper
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '25%',
          height: '400px',
        }}
      >
        <Avatar></Avatar>
        <Typography variant='h5'>Cacamaca</Typography>
      </Paper>
      <Paper
        style={{
          margin: '20px',
          maxWidth: '500px',
          maxHeight: '50%',
          width: '40%',
          height: '60vh',
          overflow: 'auto',
        }}
        elevation={3}
      >
        <List
          component='nav'
          style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}
        >
          {queryResults.map((element) => {
            return (
              <ListItem button divider key={element.path}>
                <RepoViewComponent
                  fileName={element.path}
                  fileType={element.type}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}

export default provisionalRepoView;
