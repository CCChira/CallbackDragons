import {useRouter} from 'next/router';
import {Button, Card, CardActions, CardContent, makeStyles, Typography} from '@material-ui/core';
import {useState, useEffect} from 'react';
import {Octokit} from '@octokit/rest';
import Highlight from 'react-highlight';
import styles from '../../../../styles/Home.module.css';
import {useSelector} from 'react-redux';
import Link from '@material-ui/core/Link';

const useStyle = makeStyles({
  hljs: {
    display: 'inline-block',
    overflowX: 'auto',
    overflowY: 'auto',
    height: '60vh',
    width: '80vw',
  }
});

export default function FileViewer() {
  const classes = useStyle();
  const router = useRouter();
  const {userName, repoName, blobName} = router.query;
  const [fileContent, setFileContent] = useState('');
  const historyStack = useSelector(state => state.fileLocation);
  const [fileName, setFileName] = useState('');

  useEffect(async () => {
    if (router.isReady) {
      const octokit = new Octokit();
      const url = `https://api.github.com/repos/${userName}/${repoName}/git/blobs/${blobName}`;
      const res = await octokit.request(`GET ${url}`);

      setFileContent(Buffer.from(res.data.content, 'base64').toString());
    }
  }, [router.isReady]);

  useEffect(async () => {
    const target = historyStack[historyStack.length - 1];
    if (!target) return;
    const octokit = new Octokit();
    const res = await octokit.request(`GET ${historyStack[historyStack.length - 1]}`)
    setFileName(res?.data?.tree?.filter?.(item => item.sha === blobName)?.[0]?.path);
  }, [historyStack])

  return (
    <div className={styles.container}>
      <Card style={{marginTop: '1.5 rem'}}>
        <CardContent style={{textAlign: 'center'}}>
          <Typography variant='h4'>{fileName}</Typography>
        </CardContent>
        <CardActions>
          <Link style={{textDecoration: 'none', color: 'black'}} href={`/search/${userName}/${repoName}`}><Button variant="contained" color="primary">Back to the repo</Button></Link>
        </CardActions>
      </Card>

      <Highlight style={{margin: 0}} className={classes.hljs}>
        {fileContent}
      </Highlight>
    </div>
  );
}
