import {useRouter} from 'next/router';
import {Card, CardContent, makeStyles} from '@material-ui/core';
import {useState, useEffect} from 'react';
import {Octokit} from '@octokit/rest';
import Highlight from 'react-highlight';
import styles from '../../../../styles/Home.module.css';

const useStyle = makeStyles({
  hljs: {
    display: 'inline-block',
    overflowX: 'auto',
    overflowY: 'auto',
    padding: '0.5em',
    height: '60vh',
    width: '80vw',
  }
});

export default function FileViewer() {
  const classes = useStyle();
  const router = useRouter();
  const {userName, repoName, blobName} = router.query;
  const [fileContent, setFileContent] = useState('');

  useEffect(async () => {
    if (router.isReady) {
      const octokit = new Octokit();
      const url = `https://api.github.com/repos/${userName}/${repoName}/git/blobs/${blobName}`;
      const res = await octokit.request(`GET ${url}`);
      const repo = await octokit.request(
        `GET /repos/${userName}/${repoName}/commits`
      );
      const repoContents = await octokit.request(
        `GET /repos/${userName}/${repoName}/commits/${repo.data[0]['sha']}`
      );
      const files = await octokit.request(`GET ${repoContents?.data.commit.tree.url}`);
      console.log(files.data.tree);
      setFileContent(Buffer.from(res.data.content, 'base64').toString());
    }
  }, [router.isReady]);

  return (
    <div className={styles.container}>
      <Card>
        <CardContent>
          ceapa
        </CardContent>
      </Card>

      <Highlight className={classes.hljs}>
        {fileContent}
      </Highlight>
    </div>
  );
}
