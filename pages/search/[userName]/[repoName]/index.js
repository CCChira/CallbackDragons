import styles from '../../../../styles/Home.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Octokit } from '@octokit/rest';
import RepoViewComponent from '../../../../Components/RepoViewComponent';
import { Avatar, List, ListItem, Paper, Typography } from '@material-ui/core';
import Link from 'next/link';
function provisionalRepoView() {
  const router = useRouter();
  const userName = router.query.userName;
  const repoName = router.query.repoName;
  console.log(userName, repoName);
  const [queryResults, setQueryResults] = useState([]);
  const [repoInfo, setRepoInfo] = useState({});
  useEffect(() => {
    if (userName && repoName) {
      (async () => {
        const octokit = new Octokit();
        const repoDetails = await octokit.request(
          `GET /repos/${userName}/${repoName}`
        );
        const repo = await octokit.request(
          `GET /repos/${userName}/${repoName}/commits`
        );
        const repoContents = await octokit.request(
          `GET /repos/${userName}/${repoName}/commits/${repo.data[0]['sha']}`
        );
        setRepoInfo(repoDetails);
        const commitContents = repoContents?.data.commit.tree;

        const files = await octokit.request(`GET ${commitContents.url}`);
        const fileArray = files.data.tree;
        console.log(fileArray);
        fileArray.sort((a, b) => (a.type > b.type ? -1 : 1));
        setQueryResults(fileArray);
      })();
    }
  }, [router.isReady]);
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
        <Typography variant='h5'>{userName}</Typography>
        <Typography variant='h6'>{repoName}</Typography>
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
          {queryResults.map((element, index) => {
            return (
              <Link
                href={`/search/${userName}/${repoName}/${element.sha}`}
                key={index}
              >
                <ListItem button divider>
                  <RepoViewComponent
                    fileName={element.path}
                    fileType={element.type}
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}

export default provisionalRepoView;
