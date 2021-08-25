import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core';
import { useState, useEffect } from 'react';
import {Octokit} from '@octokit/rest';
import Highlight from 'react-highlight';

const useStyle = makeStyles({
  hljs:{
    display: 'inline-block',
    overflowX: 'scroll',
    overflowY: 'scroll',
    padding: '0.5em',
    height: '80vh',
    width: '80vw',
  }
})

export default function FileViewer(){
  const classes = useStyle();
  const router = useRouter();
  const { userName, repoName, blobName } = router.query;
  const [fileContent, setFileContent] = useState('');

  useEffect(async () => {
    if(router.isReady){
        const octokit = new Octokit();
        const url = `https://api.github.com/repos/${userName}/${repoName}/git/blobs/${blobName}`;
        const res = await octokit.request(`GET ${url}`);
        console.log(res);
        setFileContent(Buffer.from(res.data.content, 'base64').toString());
    }
  },[router.isReady])

  return(
    <Highlight className={classes.hljs}>
      { fileContent }
    </Highlight>
  )
}
