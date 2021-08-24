import styles from '../styles/Home.module.css';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {Octokit} from '@octokit/rest';
import RepoViewComponent from '../Components/RepoViewComponent';
import { List, ListItem, Paper } from '@material-ui/core';
function provisionalRepoView() {
  const userName = 'CCChira'
  const [queryResults, setQueryResults] = useState([]);
  useEffect(async () => {
    const octokit = new Octokit();
    const repo = await octokit.request(`GET /repos/CCChira/FQuentFinal/commits`);
    const repoContents = await octokit.request(`GET /repos/CCChira/FQuentFinal/commits/${repo.data[0]["sha"]}`)
    const commitContents = repoContents?.data.commit.tree;
    const files = await octokit.request(`GET ${commitContents.url}`);
    const fileArray = files.data.tree;
    fileArray.sort((a, b) => (a.type > b.type) ? -1 : 1);
    console.log(repoContents, files, fileArray);
    setQueryResults(fileArray);
  }, [])
  console.log(queryResults);
  return (
    <div className = {styles.container}>
      <Paper style= {{margin: "20px", maxWidth:'65%', maxHeight:'50%'}}>
        <List component="nav">
          {queryResults.map(element => {
            return (
              <ListItem button divider>
                <RepoViewComponent fileName = {element.path} fileType = {element.type}/>
              </ListItem>
            )
          })
          }
        </List>
      </Paper>
    </div>
  )
}

export default provisionalRepoView
