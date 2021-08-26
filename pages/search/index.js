import styles from '../../styles/Home.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {Octokit} from '@octokit/rest';
import SearchItemComponent from '../../Components/SearchItemComponent';
import {setQueryString} from '../../store/actions';
import Link from 'next/link';

export default function Search() {
  const searchValue = useSelector(state => state.searchbar.queryString);
  const queryString = encodeURIComponent(`${searchValue}`);
  const [queryResults, setQueryResults] = useState([]);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (queryString === '') return;

    const octokit = new Octokit();
    const results = await octokit.request('GET /search/users', {
      q: queryString
    });
    setQueryResults(results.data.items);
    dispatch(setQueryString(''));
  }, []);

  return (
      <>
        <div className={styles.container}>
          {queryResults.map((result, index) => (
              <Link key={index} href={`search/${result.login}`}>
                <a style={{textDecoration: 'none'}}>
                  <SearchItemComponent key={index} result={result}/>
                </a>
              </Link>
          ))}
        </div>
      </>
  );
}
