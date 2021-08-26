import styles from '../../../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Octokit } from '@octokit/rest';
import RepoViewComponent from '../../../../Components/RepoViewComponent';
import {List, ListItem, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import {setFileStack} from '../../../../store/actions';
import { markdown } from 'markdown';
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles({
  userPaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20vw',
    minHeight: '10px',
    overflow: 'hidden',
    minWidth: '150px',
    margin: '1.5rem 0'
  },
  userAvatar: {
    verticalAlign: 'middle',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '5px',
    marginBottom: '5px',
  },
  repoPaper: {
    marginBottom: '1.5rem',
    maxWidth: '1000px',
    maxHeight: '50%',
    width: '75%',
    height: '60vh',
    overflow: 'auto',
  },
  list: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
});

function provisionalRepoView() {
  const router = useRouter();
  const userName = router.query.userName;
  const repoName = router.query.repoName;
  const [queryResults, setQueryResults] = useState([]);
  const historyStack = useSelector(state => state.fileLocation);
  const dispatch = useDispatch();
  const setHistoryStack = (payload) => dispatch(setFileStack(payload));
  const [userData, setUserData] = useState({});
  const [readme, setReadme] = useState('');
  const classes = useStyles();

  const constructPreviousEntry = (previousUrl) => ({
    path: '..',
    type: 'tree',
    url: previousUrl
  });

  const updateFileView = async (fileArray, previousUrl) => {
    fileArray.sort((a, b) => (a.type > b.type ? -1 : 1));
    if(previousUrl)
      fileArray.unshift(constructPreviousEntry(previousUrl));
    setQueryResults(fileArray);
  };

  const getNewFiles = async (name, url) => {
    const octokit = new Octokit();
    const files = await octokit.request(`GET ${url}`);
    const fileArray = files.data.tree;
    if (name === '..') {
      setHistoryStack(historyStack.slice(0, -1));
      updateFileView(fileArray, historyStack[historyStack.indexOf(url) - 1]);
    } else {
      updateFileView(fileArray, historyStack[historyStack.length - 1]);
      setHistoryStack([
        ...historyStack,
        url
      ]);
    }
  };

  const getReadme = async () => {
    const readmeFile = queryResults.find(file => file.path === "README.md");
    if(readmeFile){
        const octokit = new Octokit();
        const url = `https://api.github.com/repos/${userName}/${repoName}/git/blobs/${readmeFile.sha}`;
        const res = await octokit.request(`GET ${url}`);
        let markdowncontent = Buffer.from(res.data.content, 'base64').toString();
        setReadme(markdown.toHTML(markdowncontent));
    }
  }

  useEffect(() => {
    if (userName && repoName) {
      (async () => {
        const octokit = new Octokit();
        const user = await octokit.request(`GET /search/users`, {
          q: userName,
        });
        setUserData(user.data.items[0].avatar_url);
        const repo = await octokit.request(
            `GET /repos/${userName}/${repoName}/commits`
        );
        const repoContents = await octokit.request(
            `GET /repos/${userName}/${repoName}/commits/${repo.data[0]['sha']}`
        );
        await getNewFiles('', repoContents?.data.commit.tree.url)
      })();
    }
  }, [router.isReady]);

  useEffect(() => {
    if(queryResults.length > 0){
      getReadme();
    }
  }, [queryResults])

  return (
      <div
          className={styles.container}
          style={{display: 'flex', flexDirection: 'column'}}
      >
        <Paper className={classes.userPaper} elevation={3}>
          <img src={userData} className={classes.userAvatar}></img>
          <Typography variant="h5">{userName}</Typography>
          <Typography variant="h6">{repoName}</Typography>
        </Paper>
        <Paper className={classes.repoPaper} elevation={3}>
          <List component="nav" className={classes.list}>
            {queryResults.map((element, index) => {
              if (element.type === 'blob')
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
              else
                return (
                    <ListItem key={index} onClick={async () => await getNewFiles(element.path, element.url)} button
                              divider>
                      <RepoViewComponent
                          fileName={element.path}
                          fileType={element.type}
                      />
                    </ListItem>
                );
            })}
          </List>
        </Paper>
        {readme !== '' &&
         <Paper className={classes.repoPaper} elevation={3}>
           { ReactHtmlParser(readme) }
         </Paper>
        }
      </div>
  );
}

export default provisionalRepoView;
