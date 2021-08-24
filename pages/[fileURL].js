import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {Octokit} from '@octokit/rest';

const BASE_URL='https://api.github.com/repos/CCChira/FQuentFinal/git/blobs/'

export default function FileViewer(){
  const router = useRouter();
  const { fileURL } = router.query;
  const [fileContent, setFileContent] = useState('');

  useEffect(async () => {
    if(router.isReady){
        const octokit = new Octokit();
        const url = BASE_URL + fileURL;
        console.log(url)
        const res = await octokit.request(`GET ${url}`);
        console.log(res);
        setFileContent(Buffer.from(res.data.content, 'base64').toString());
    }
  },[router.isReady])

  return(
    <pre>
        <code>
        { fileContent }
        </code>
    </pre>
  )
}
