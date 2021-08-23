import {Button} from '@material-ui/core';
import styles from '../../styles/Home.module.css';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {Octokit} from '@octokit/rest';
import SearchItem from '../../Components/SearchItem';

export default function Search() {
  const searchValue = useSelector(state => state.searchQuerry) || 'abc';
  const queryString = encodeURIComponent(`${searchValue}`);
  const [queryResults, setQueryResults] = useState([]);

  useEffect(async () => {
    const octokit = new Octokit();
    const results = await octokit.request('GET /search/users', {
      q: queryString
    })
    setQueryResults(results.data.items);
  }, []);

  return (
      <>
        <div className={styles.container}>
          {queryResults.map((result, index) => <SearchItem key={index} result={result}/>)}
        </div>
      </>
  );
}
